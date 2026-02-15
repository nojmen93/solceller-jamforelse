import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <section className="bg-yellow-500 py-20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Jamfor Solcellspriser
          </h1>
          <p className="text-xl text-gray-800 mb-8">
            Sveriges mest transparenta prisjamforelse for solceller
          </p>
          <Link
            href="/kalkylator"
            className="inline-block bg-gray-900 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-800"
          >
            Starta kalkyl
          </Link>
        </div>
      </section>
    </div>
  );
}