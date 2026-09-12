import Link from "next/link";

export default function CreatorSignup() {
  return (
    <div className="min-h-screen flex items-center justify-center px-6 bg-paper">
      <div className="text-center max-w-md">
        <h1 className="font-display text-3xl mb-3">Creator signup</h1>
        <p className="text-muted mb-8">
          This page is being built next — creator accounts, niche selection,
          and social account connection will live here.
        </p>
        <Link href="/" className="text-amber font-medium underline">
          Back to home
        </Link>
      </div>
    </div>
  );
}
