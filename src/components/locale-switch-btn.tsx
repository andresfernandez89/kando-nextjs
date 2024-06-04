"use client";

import { useLocale, useTranslations } from "next-intl";
import { Link, usePathname } from "@/navigation";

export default function LocaleSwitchBtn() {
  const t = useTranslations("LocaleSwitcher");
  const locale = useLocale();
  const otherLocale = locale === "en" ? "es" : "en";
  const pathname = usePathname();

  return (
    <div>
      <Link
        href={pathname}
        locale={otherLocale}
        className="flex w-full max-w-md justify-end gap-2"
      >
        <p className="text-sm">{t("switch")}</p>
        {t("switchLocale", { locale: otherLocale })}
      </Link>
    </div>
  );
}