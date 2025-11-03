import { notFound, redirect } from "next/navigation";

export const runtime = "edge";

export default function LegacyTemplatePreviewPage({ searchParams }) {
  const slug = searchParams?.product;

  if (!slug || typeof slug !== "string") {
    notFound();
  }

  redirect(`/preview/${slug}`);
}
