import Link from "next/link";

const navItems = {
  "/": {
    name: "home",
    isExternal: false,
  },
  "/projects": {
    name: "projects",
    isExternal: false,
  },
  "/blog": {
    name: "blog",
    isExternal: false,
  },
  "https://github.com/udeet27/udeet.in": {
    name: "<source/>",
    isExternal: true,
  },
};
export function Navbar() {
  return (
    <aside className="-ml-[8px] mb-16 tracking-tight">
      <div className="lg:sticky lg:top-20">
        <nav
          className="flex flex-row items-start relative px-0 pb-0 fade md:overflow-auto scroll-pr-6 md:relative"
          id="nav"
        >
          {/* Left-aligned links */}
          <div className="flex flex-row space-x-0 pr-4">
            {Object.entries(navItems)
              .filter(([_, item]) => !item.isExternal)
              .map(([path, { name }]) => (
                <Link
                  key={path}
                  href={path}
                  className="transition-all hover:text-neutral-500 dark:hover:text-neutral-200 flex align-middle relative py-1 px-2 m-1"
                >
                  {name}
                </Link>
              ))}
          </div>

          {/* Right-aligned external link */}
          <div className="ml-auto">
            {Object.entries(navItems)
              .filter(([_, item]) => item.isExternal)
              .map(([path, { name }]) => (
                <a
                  key={path}
                  href={path}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-all text-gray-500 hover:text-gray-400 dark:hover:text-neutral-200 flex align-middle relative py-1 px-2 mt-2 text-xs font-mono"
                >
                  {name}
                </a>
              ))}
          </div>
        </nav>
      </div>
    </aside>
  );
}
