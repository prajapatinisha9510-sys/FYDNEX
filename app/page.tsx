import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-6">
      <h1 className="text-4xl font-bold mb-3">Fydnex</h1>
      <p className="text-gray-600 mb-8 text-center max-w-md">
        A full-funnel campaign marketplace for brands and creators.
      </p>
      <Link
        href="/brand/signup"
        className="bg-blue-600 text-white px-5 py-2.5 rounded-lg hover:bg-blue-700 transition"
      >
        Create a brand account
      </Link>
    </main>
  );
}
