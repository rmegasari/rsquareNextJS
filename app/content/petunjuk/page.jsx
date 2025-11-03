import { notFound, redirect } from "next/navigation";

export const runtime = "edge";

export default function LegacyInstructionsPage({ searchParams }) {
  const slug = searchParams?.product;

  if (!slug || typeof slug !== "string") {
    notFound();
  }

  redirect(`/instructions/${slug}`);
}
