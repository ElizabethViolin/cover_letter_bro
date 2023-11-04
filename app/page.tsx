import Resume from "./components/Resume";
import type { Metadata } from 'next'
import Why from "./components/why";

export const metadata: Metadata = {
  title: "Cover letter bro - Free AI cover letter generator",
  description: "Cover letter bro Free AI cover letter generator",
  keywords: [
    "cover letter",
    "cover letter bro",
    "resume job description generate cover letter",
    "AI cover letter generator",
    "AI cover letter",
    "cover letter resume job description",
    "cover letter resume job description AI",
    "Huang Yiqiu",
    "hyq",
    "hyqshr",
    "hyq github"
  ],
  openGraph: {
    title: "cover letter bro free ai cover letter generator",
    description:"cover letter bro free ai cover letter generator",
    siteName: "cover letter bro",
    locale: "en_US",
    type: "website",
  },
};



export default function Home() {
  return (
    <main className="p-4">
      <h1 className="my-4 px-5 text-3xl font-extrabold text-gray-900 dark:text-white md:text-5xl lg:text-6xl"><span className="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">Cover Letter</span> Bro</h1>
      <h1 className="my-4 px-5 text-2xl tracking-tight text-gray-900 dark:text-white">
        Copy paste, and get your &nbsp;  
        <mark className="px-2 text-white bg-blue-600 rounded dark:bg-blue-500">customized</mark> 
        &nbsp; cover letter for 
        <mark className="text-transparent font-extrabold bg-clip-text rounded bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">&nbsp;FREE</mark>
      </h1>
      <div className="py-10">
        <Resume />
      </div>

      <div className="py-10">
        <Why />
      </div>

    </main>
  )
}
