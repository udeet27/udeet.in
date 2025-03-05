import Image from "next/image";

export default function NotFound() {
  return (
    <section>
      {/* <h1 className="mb-8 text-2xl font-semibold tracking-tighter">
        404 - Page Not Found
      </h1> */}
      <div className="relative w-60 h-40 mb-6 rounded-lg overflow-hidden transition-all duration-300 hover:blur-[2px]">
              <Image
                src="/404.png" // Ensure the image is in the public folder
                alt="404 not found"
                layout="fill"
                objectFit="cover"
              />
            </div>
    </section>
  )
}
