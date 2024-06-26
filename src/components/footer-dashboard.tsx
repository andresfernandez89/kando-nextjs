import FbIcon from "@/icons/fbIcon";
import GitHubIcon from "@/icons/gitHubIcon";
import InstabramIcon from "@/icons/instagramIcon";
import { useTranslations } from "next-intl";
import Link from "next/link";

export default function Footer() {
  const t = useTranslations("Footer");

  return (
    <>
      <footer className="mx-4 mt-6 flex flex-col items-center justify-center rounded-lg bg-muted p-4 shadow md:flex md:flex-row md:items-center md:justify-between md:p-4 xl:p-6">
        <ul className="mb-6 flex flex-wrap items-center md:mb-0">
          <li>
            <Link
              href="#"
              className="mr-4 text-sm font-normal text-gray-400 hover:underline md:mr-6"
            >
              {t("licensing")}
            </Link>
          </li>
          <li>
            <Link
              href="#"
              className="mr-4 text-sm font-normal text-gray-400 hover:underline md:mr-6"
            >
              {t("cookie")}
            </Link>
          </li>
          <li>
            <Link
              href="#"
              className="text-sm font-normal text-gray-400 hover:underline"
            >
              {t("contact")}
            </Link>
          </li>
        </ul>
        <div className="flex space-x-6 sm:justify-center">
          <Link href="https://facebook.com" className="hover:text-violet-300">
            <FbIcon />
          </Link>
          <Link href="https://instagram.com" className="hover:text-violet-300">
            <InstabramIcon />
          </Link>
          <Link href="https://github.com" className="hover:text-violet-300">
            <GitHubIcon />
          </Link>
        </div>
      </footer>
      <p className="my-6 text-center text-sm text-violet-400">
        {`© ${new Date().getFullYear()} `}
        <Link href="#" className="hover:underline" target="_blank">
          Andres Fernandez - Sebastián Illa
        </Link>
      </p>
    </>
  );
}
