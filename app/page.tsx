import { SitePlan } from "@/components/site-plan";

export default function Home() {
  return (
    <main className="min-h-screen p-4 md:p-8">
      <div className="mx-auto max-w-7xl">
        <header className="mb-6 text-center">
          <h1 className="text-2xl font-bold text-gray-900 md:text-3xl">
            Site Plan - 161 S Delaware Drive
          </h1>
          <p className="mt-2 text-gray-600">
            Apache Junction, AZ | 30,000 SF Retail Development
          </p>
        </header>
        <SitePlan />
      </div>
    </main>
  );
}
