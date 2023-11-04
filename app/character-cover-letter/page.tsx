import type { Metadata } from 'next'
import { InfiniteScroll } from "../components/InfiniteScroll";
import { CardScroll } from "../components/CardScroll";
import { fetchBeers, shuffle } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Character Cover letter - Movie Character Cover Letter ",
  description: "What if movie characters write cover letters for real life job?",
  keywords: [
    "cover letter bro",
    "character cover letter",
    "cover letter template",
    "AI cover letter generator",
    "AI cover letter",
    "cover letter resume job description",
    "cover letter resume job description AI",
    "Huang Yiqiu",
  ],
  openGraph: {
    title: "cover letter bro free ai cover letter generator",
    description:"cover letter bro free ai cover letter generator",
    siteName: "cover letter bro",
    locale: "en_US",
    type: "website",
  },
};



export default async function Home() {
  const beers = await fetchBeers(null);
  return (
    <main className="p-4">
      <h1 className="my-4 px-5 text-3xl font-extrabold text-gray-900 dark:text-white md:text-5xl lg:text-6xl">
        <span className="text-transparent bg-clip-text bg-gradient-to-r to-sky-400 from-emerald-600">Character . </span>
        <span className="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">Cover Letter</span>
      </h1>


      <div className="container mx-auto px-4 py-8 min-h-screen">
      <div className="">
        <CardScroll beers={shuffle(beers.map(doc => doc.data()))} />
        <InfiniteScroll />
      </div>
    </div>

    </main>
  )
}
