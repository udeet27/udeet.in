import Image from "next/image";
import { BlogPosts } from "app/components/posts";

export default function Page() {
  return (
    <section>
      <h1 className="mb-4 text-2xl font-semibold tracking-tighter">Hey!</h1>

      {/* Image with mesh blur on hover */}
      <div className="relative w-40 h-40 mb-6 rounded-lg overflow-hidden transition-all duration-300 hover:blur-[2px]">
        <Image
          src="/udeet.jpg" // Ensure the image is in the public folder
          alt="Profile Picture"
          layout="fill"
          objectFit="cover"
        />
      </div>


      <p className="mb-4">
        {`I'm `}
        <span className="font-semibold">Udeet Mittal</span>
        {`, and this is my place on the internet.
         Your typical Indian software engineer by profession, but a not-so-typical one by passion.
        I believe my laziness drives me to automate things, my curiosity drives me to learn new things, all at a fast pace that comes naturally to me,
    and I think this is what sets me apart from the crowd. `}
      </p>
      <p className="mb-4">
        {`I've come to realise that the domain I work in doesn't really matter,
     the problem statement in front of me and the people I work with do.`}
      </p>
      <p className="mb-4">
        {`I'm currently looking for my next role as a`}
        <span className="font-semibold"> Software Engineer in Pune</span>
        {`, having industry experience through 4 internships + 1 full-time role.
        Feel free to reach out at any of the socials below.`}
      </p>

      {/* <div className="my-8">
        <BlogPosts />
      </div> */}
    </section>
  );
}
