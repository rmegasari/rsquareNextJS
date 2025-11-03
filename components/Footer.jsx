"use client";

import Image from "next/image";
import Link from "next/link";
import { useSite } from "../contexts/SiteContext";
import { t } from "../locales/site";

const socialLinks = [
  {
    name: "YouTube",
    href: "https://www.youtube.com/@RSQUAREIDEA",
    icon: (
      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path
          fillRule="evenodd"
          d="M19.812 5.418c.861.23 1.538.908 1.768 1.768C21.998 8.78 22 12 22 12s0 3.22-.418 4.814a2.506 2.506 0 0 1-1.768 1.768c-1.56.419-7.814.419-7.814.419s-6.254 0-7.814-.419a2.505 2.505 0 0 1-1.768-1.768C2 15.22 2 12 2 12s0-3.22.418-4.814a2.507 2.507 0 0 1 1.768-1.768C5.746 5 12 5 12 5s6.254 0 7.812.418zM9.996 15.002l5.207-3.002-5.207-3.002v6.004z"
          clipRule="evenodd"
        />
      </svg>
    ),
  },
  {
    name: "Facebook",
    href: "https://www.facebook.com/profile.php?id=61576967790844",
    icon: (
      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path
          fillRule="evenodd"
          d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
          clipRule="evenodd"
        />
      </svg>
    ),
  },
  {
    name: "TikTok",
    href: "https://www.tiktok.com/@rsquareidea?_t=ZS-8wWydvIjmGG&_r=1",
    icon: (
      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.04-5.36-.01-4.03-.01-8.05.02-12.07z" />
      </svg>
    ),
  },
  {
    name: "Instagram",
    href: "https://www.instagram.com/rsquareidea/",
    icon: (
      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path
          fillRule="evenodd"
          d="M12.001 2.5c-3.235 0-3.666.012-4.945.071C5.78 2.64 4.887 3.04 4.157 3.77a4.996 4.996 0 00-7.398 5.485c-.058 1.28-.07 1.71-.07 4.945s.012 3.666.071 4.945c.06 1.28.46 2.173 1.19 2.903a4.996 4.996 0 005.485 7.398c1.28.058 1.71.07 4.945.07s3.666-.012 4.945-.071c1.28-.06 2.173-.46 2.903-1.19a4.996 4.996 0 007.398-5.485c.058-1.28.07-1.71.07-4.945s-.012-3.666-.071-4.945c-.06-1.28-.46-2.173-1.19-2.903a4.996 4.996 0 00-5.485-7.398c-1.28-.058-1.71-.07-4.945-.07zm0 1.996c3.125 0 3.528.012 4.773.069 1.05.047 1.63.35 2.02.74s.693.97.74 2.02c.057 1.245.069 1.648.069 4.773s-.012 3.528-.069 4.773c-.047 1.05-.35 1.63-.74 2.02s-.97.693-2.02.74c-1.245.057-1.648.069-4.773.069s-3.528-.012-4.773-.069c-1.05-.047-1.63-.35-2.02-.74s-.693-.97-.74-2.02c-.057-1.245-.069-1.648-.069-4.773s.012-3.528.069-4.773c.047-1.05.35-1.63.74-2.02s.97-.693 2.02-.74c1.245-.057 1.648-.069 4.773-.069zm0 2.5a4.5 4.5 0 100 9 4.5 4.5 0 000-9zm0 2a2.5 2.5 0 110 5 2.5 2.5 0 010-5zm6.5-5a1.5 1.5 0 100 3 1.5 1.5 0 000-3z"
          clipRule="evenodd"
        />
      </svg>
    ),
  },
  {
    name: "X",
    href: "https://x.com/rsquareidea",
    icon: (
      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
];

export default function Footer() {
  const { language } = useSite();

  const quickLinks = [
    { href: "/", label: t("footerHome", language) },
    { href: "/templates", label: t("footerTemplates", language) },
    { href: "/kontak", label: t("footerContact", language) },
    { href: "/feedback", label: t("footerFeedback", language) },
  ];

  const legalLinks = [
    { href: "/kebijakan-privasi", label: t("footerPrivacy", language) },
    { href: "/syarat-ketentuan", label: t("footerTerms", language) },
  ];

  return (
    <footer className="pt-20 pb-12 px-6 footer-gradient dark:bg-gray-900 dark:border-t dark:border-gray-800">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
        <div>
          <Link href="/" className="inline-block mb-4">
            <Image
              src="/photos/RSQUARE-LOGO.png"
              alt="RSQUARE Logo"
              width={160}
              height={48}
              className="h-12 w-auto mx-auto md:mx-0"
            />
          </Link>
          <p className="text-gray-500 dark:text-gray-400 text-sm mb-4">
            {t("footerTagline", language)}
          </p>
          <div className="flex space-x-5 justify-center md:justify-start">
            {socialLinks.map((social) => (
              <a
                key={social.name}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition"
              >
                <span className="sr-only">{social.name}</span>
                {social.icon}
              </a>
            ))}
          </div>
        </div>
        <div>
          <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-4">{t("footerQuickLinks", language)}</h3>
          <ul className="space-y-2">
            {quickLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="text-gray-600 dark:text-gray-400 hover:text-orange-600 dark:hover:text-orange-500 transition">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-4">{t("footerLegal", language)}</h3>
          <ul className="space-y-2">
            {legalLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="text-gray-600 dark:text-gray-400 hover:text-orange-600 dark:hover:text-orange-500 transition">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="container mx-auto text-center text-gray-500 dark:text-gray-400 mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
        <div className="flex justify-center mb-4">
          <a
            href="https://startupfa.me/s/rsquare?utm_source=rsquareidea.my.id"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              src="https://startupfa.me/badges/featured/dark-rounded.webp"
              alt="Featured on Startup Fame"
              width={150}
              height={48}
            />
          </a>
        </div>
        <p>&copy; {new Date().getFullYear()} {t("footerCopyright", language)}</p>
      </div>
    </footer>
  );
}
