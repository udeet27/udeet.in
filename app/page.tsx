import Image from "next/legacy/image";
import { BlogPosts } from "app/components/posts";
import VisitorCounter from "app/components/VisitorCounter";
import WeatherWidget from "./components/WeatherWidget";
import TimeDisplay from "./components/TimeDisplay";
import CommentSection from "./components/CommentSection";
import Footer from "./components/footer";
import SpotifyTrack from "./components/now-playing";
import Lyrics from "./components/Lyrics";

export default function Page() {
  return (
    <>
      <section>
        <h1 className="mb-4 text-2xl font-semibold tracking-tighter">Hey!</h1>

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
          {`I'm `}
          <span className="relative group inline-block">
            <span
              className="font-semibold px-1 rounded-md"
              style={{
                backgroundColor: "#9eff9e", // Light green background color
                color: "#0f0f0f", // Text color
                padding: "0 4px", // Add padding for better appearance
                borderRadius: "4px", // Rounded edges similar to the image
              }}
            >
              Udeet Mittal
            </span>

            {/* Tooltip */}
            <span className="absolute left-1/2 -translate-x-1/2 bottom-full mb-1 opacity-0 group-hover:opacity-100 group-hover:translate-y-[-4px] items-center justify-center text-[#0f0f0f] bg-[#D1E5F4] text-xs px-3 py-1 rounded shadow-md whitespace-nowrap transition-all duration-300 ease-in-out">
              meaning 'the rising sun'
            </span>
          </span>
          {`, and this is my place on the internet.
         Your typical software engineer by profession, but a not-so-typical one by passion.
        I believe my laziness drives me to automate things, my curiosity drives me to learn new things, all at a fast pace with an intense focus on attention to detail,
    and I think this is what sets me apart from the crowd. `}
        </p>
        <p className="mb-4">
          {`Though having worked most extensively in full stack development and data analytics, I've come to realise that the domain and specific technologies I work in don't really matter—the problem statement in front of me and the people I work with do.`}
        </p>
        <p className="mb-4">
          {`I'm currently looking for my next role as a `}
          <span
            className="font-semibold"
            style={{
              backgroundColor: "#FFC78F", // Light green background color
              color: "#0f0f0f", // Keep the text color unchanged
              padding: "0 4px", // Add padding for better appearance
              borderRadius: "4px", // Rounded edges similar to the image
            }}
          >
            Software Engineer
          </span>
          {`, having industry experience through 4 internships + 1 full-time role.
        Feel free to reach out at any of the socials below.`}
        </p>

        {/* <div className="my-8">
        <BlogPosts />
      </div> */}
        {/* <span className="text-left text-sm text-gray-600 mt-4">currently in📍Pune</span>
      <VisitorCounter /> */}
        <span className="text-sm text-gray-500 mt-4 flex items-center justify-between">
          <span className="text-left">
            currently in📍{process.env.NEXT_PUBLIC_CITY}
            <WeatherWidget />
          </span>
          <span className="text-right">
            <VisitorCounter />
          </span>
        </span>
        <TimeDisplay />
      </section>
      <Footer />
      <SpotifyTrack />
      <Lyrics />
      <div className="flex dark:bg-[#070707]">
        <CommentSection />
      </div>
    </>
  );
}
