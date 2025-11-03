"use client";

import Link from "next/link";
import { useSite } from "../contexts/SiteContext";
import { t } from "../locales/site";

export default function AnnouncementBar() {
  const { language } = useSite();

  return (
    <div className="bg-gradient-to-r from-orange-600 to-orange-500 text-white py-3 px-6 text-center text-sm font-medium shadow-lg">
      <p>
        🔥 {t("announcementVoucher", language)}{" "}
        <span className="font-bold tracking-wider">SEPTEMBEST</span> {t("announcementMessage", language)}
        <Link href="/templates" className="ml-2 underline hover:text-white/80">
          {t("announcementClaim", language)}
        </Link>
      </p>
    </div>
  );
}
