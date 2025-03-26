"use client";

import { useEffect, useRef, useState } from "react";
import { CirclePlay } from "lucide-react";
import { CirclePause } from "lucide-react";

interface YouTubeAudioPlayerProps {
  videoId: string;
}

declare global {
  interface Window {
    onYouTubeIframeAPIReady: () => void;
    YT: any;
  }
}

const YouTubeAudioPlayer: React.FC<YouTubeAudioPlayerProps> = ({ videoId }) => {
  const playerRef = useRef<HTMLDivElement>(null);
  const [player, setPlayer] = useState<any>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    // Load the YouTube IFrame Player API
    const tag = document.createElement("script");
    tag.src = "https://www.youtube.com/iframe_api";
    const firstScriptTag = document.getElementsByTagName("script")[0];
    firstScriptTag?.parentNode?.insertBefore(tag, firstScriptTag);

    // Initialize the YouTube Player when API is ready
    window.onYouTubeIframeAPIReady = () => {
      if (playerRef.current) {
        const ytPlayer = new window.YT.Player(playerRef.current, {
          height: "0",
          width: "0",
          videoId: videoId,
          events: {
            onReady: () => {
              setPlayer(ytPlayer);
            },
            onStateChange: (event: any) => {
              if (event.data === window.YT.PlayerState.ENDED) {
                setIsPlaying(false);
              }
            },
          },
          playerVars: {
            autoplay: 0,
            controls: 0,
            disablekb: 1,
            fs: 0,
            modestbranding: 1,
            rel: 0,
          },
        });
      }
    };

    return () => {
      if (player) {
        player.destroy();
      }
    };
  }, [videoId]);

  const togglePlay = () => {
    if (player) {
      if (isPlaying) {
        player.pauseVideo();
      } else {
        player.playVideo();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <span
      onClick={(e) => {
        e.stopPropagation();
      }}
    >
      <span ref={playerRef} />
      <button
        onClick={(e) => {
          e.stopPropagation();
          e.preventDefault();
          togglePlay();
        }}
      >
        {isPlaying ? (
          <CirclePause
            size={24}
            strokeWidth={1.2}
            stroke="var(--play-icon-stroke)"
            fill="var(--play-icon-fill)"
            // strokeOpacity={0.7}
          />
        ) : (
          <CirclePlay
            size={24}
            strokeWidth={1.2}
            stroke="var(--play-icon-stroke)"
            fill="var(--play-icon-fill)"
            // strokeOpacity={0.5}
          />
        )}
      </button>
    </span>
  );
};

export default YouTubeAudioPlayer;
