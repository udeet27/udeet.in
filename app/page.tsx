import Image from "next/legacy/image";
import { BlogPosts } from "app/components/posts";
import VisitorCounter from "app/components/VisitorCounter";
import WeatherWidget from "./components/WeatherWidget";
import TimeDisplay from "./components/TimeDisplay";
import CommentSection from "./components/CommentSection";
import Footer from "./components/footer";
import SpotifyTrack from "./components/now-playing";
import { MapPin } from "lucide-react";
import { BadgeCheck } from "lucide-react";
import YTSearch from "./components/YTSearch";

export default function Page() {
  return (
    <>
      <section>
        <span className="relative group inline-flex items-center gap-1 mb-4 text-xl font-semibold tracking-tighter">
          Udeet Mittal
          <BadgeCheck
            size={16}
            strokeWidth={2}
            fill="#1D9BF0"
            className="stroke-[#fffaf1d0] dark:stroke-[#070707c4]"
          />
          <span className="absolute left-1/2 -translate-x-1/2 bottom-full mb-1 opacity-0 group-hover:opacity-100 group-hover:translate-y-[-4px] items-center justify-center text-[#0f0f0f] bg-[#D1E5F4] text-xs px-3 py-1 rounded shadow-md whitespace-nowrap transition-all duration-300 ease-in-out">
            meaning 'the rising sun'
          </span>
        </span>

        {/* Image with mesh blur on hover */}
        <div className="relative w-40 h-40 mb-6 rounded-lg overflow-hidden">
          <Image
            src="/udeet-bw.jpeg" // Black and white image
            alt="Profile Picture"
            layout="fill"
            objectFit="cover"
            className="transition-opacity duration-400"
          />
          <Image
            src="/udeet-color.jpeg" // Color image
            alt="Profile Picture"
            layout="fill"
            objectFit="cover"
            className="opacity-0 hover:opacity-100 transition-opacity duration-400"
          />
        </div>

        <p className="mb-4">
          {/* {`I'm `} */}
          {/* <span className="relative group inline-block">
            <span
              className="font-semibold px-1 rounded-md"
              style={{
                backgroundColor: "#9eff9e", // Light green background color
                color: "#0f0f0f", // Text color
                padding: "0 4px", // Add padding for better appearance
                borderRadius: "4px", // Rounded edges similar to the image
              }}
            >
              Udeet
            </span> */}

          {/* Tooltip */}
          {/* </span> */}
          {`Welcome to my place on the internet.
         Your typical software engineer by profession, but a not-so-typical one by passion.
        I believe my laziness drives me to automate things, my curiosity drives me to learn new things, all at a fast pace with an intense focus on `}
          <span
            className="font-medium tracking-tighter"
            style={{
              backgroundColor: "#9eff9ec0", // Light green background color
              color: "#0f0f0f", // Text color
              padding: "0 4px", // Add padding for better appearance
              borderRadius: "4px", // Rounded edges similar to the image
            }}
          >
            attention to detail
          </span>
          {` and I think this is what sets me apart from the crowd.`}
        </p>
        <p className="mb-4">
          {`I'm a CS grad from MIT Manipal with nearly `}
          <span
            className="font-medium tracking-tighter"
            style={{
              backgroundColor: "#add8e6", // Light green background color
              color: "#0f0f0f", // Text color
              padding: "0 4px", // Add padding for better appearance
              borderRadius: "4px", // Rounded edges similar to the image
            }}
          >
            2 years
          </span>
          {` of industry experience across diverse domains, including Web Development, Quality Assurance, Automation, and Data Analytics. My passion lies in continuously improving processes and finding innovative solutions
           - I never settle for `}
          <em>{`'it's just how it is.' `}</em>
          {`Adaptable and quick to learn, I thrive in environments that challenge me and offer opportunities to grow. I am always eager to tackle new problems and contribute meaningfully to any project I'm a part of.`}
        </p>
        <p className="mb-4">
          {`I'm currently looking for my next role as a `}
          <span
            className="font-medium tracking-tighter"
            style={{
              backgroundColor: "#FFC78F", // Light green background color
              color: "#0f0f0f", // Keep the text color unchanged
              padding: "0 4px", // Add padding for better appearance
              borderRadius: "4px", // Rounded edges similar to the image
            }}
          >
            SDE / SDET
          </span>
          {`. If you think I'd be a good fit for your team, let's connect!`}
        </p>

        {/* <div className="my-8">
        <BlogPosts />
      </div> */}
        {/* <span className="text-left text-sm text-gray-600 mt-4">currently in📍Pune</span>
      <VisitorCounter /> */}
        <span className="text-sm text-gray-500 mt-4 flex items-center justify-between">
          <span className="text-left flex items-center gap-1">
            <MapPin size={15} strokeWidth={1.5} />
            {process.env.NEXT_PUBLIC_CITY}
            <WeatherWidget />
          </span>
          <span className="text-right">
            <VisitorCounter />
          </span>
        </span>
        <TimeDisplay />
      </section>
      <Footer />
      <div className="relative">
        <SpotifyTrack /> {/* Spotify Widget */}
        <div className="absolute top-[3.5rem] right-2 z-10">
          <YTSearch />
        </div>
      </div>
      <div className="flex dark:bg-[#070707]">
        <CommentSection />
      </div>
    </>
  );
}
