import { useTranslations } from "next-intl";
import Link from "next/link";

export default function Aside() {
  const t = useTranslations("Aside");

  const links = [
    { name: t("board"), href: "board" },
    { name: t("todo"), href: "todo" },
  ];

  return (
    <aside
      id="sidebar"
      className=" transition-width w-fil fixed left-0 top-0 z-20 hidden h-full flex-shrink-0 flex-col pt-16 duration-75 lg:flex"
      aria-label="Sidebar"
    >
      <div className="relative flex min-h-0 min-w-44 flex-1 flex-col border-t-2 border-card bg-nav pt-0">
        <div className="flex flex-col overflow-y-auto pb-4 pt-5">
          <div className="flex-1 space-y-1 divide-y bg-nav px-3">
            <ul className="space-y-2 pb-2">
              {links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="group flex items-center rounded-lg p-2 text-base font-normal capitalize hover:text-violet-300"
                  >
                    <span className="ml-3">{link.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </aside>
  );
}
