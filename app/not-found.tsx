import Link from "next/link";

export default function NotFound() {
  return (
    <main className="mx-auto flex min-h-[60vh] max-w-lg flex-col items-center justify-center px-4 py-16 text-center">
      <h1 className="text-3xl font-bold text-stone-900">Sidan hittades inte</h1>
      <p className="mt-2 text-stone-600">
        Den sidan du söker finns inte eller har flyttats.
      </p>
      <Link
        href="/"
        className="mt-8 rounded-xl bg-yellow-500 px-5 py-2.5 font-semibold text-stone-900 hover:bg-yellow-600"
      >
        Till startsidan
      </Link>
    </main>
  );
}
