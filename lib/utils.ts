import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { collection, query, orderBy, startAfter, limit, getDocs } from "firebase/firestore";  
import { db } from "@/app/firebase";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getPrompt(resume: string, positionDescription: string): string {
  const prompt = 
    `Write a persuasive cover letter about why the person is a good fit for the position, given the person's resume and the position information below. Follow the structure instructions of the cover letter:
    1. Write a strong introduction to match position requirement
    2. Highlight relevant technical skills and soft skills
    3. Identify notable projects or achievements

    Resume:
    ${resume}

    Position Description:
    ${positionDescription}`
  return prompt;
}

// safely access local storage
export function getLocalStorage(key: string): string {
  if (typeof window !== "undefined") {
    return localStorage.getItem(key) ?? "";
  }
  return "";
}

//shuffle array
export const shuffle = (array: any) => { 
  for (let i = array.length - 1; i > 0; i--) { 
    const j = Math.floor(Math.random() * (i + 1)); 
    [array[i], array[j]] = [array[j], array[i]]; 
  } 
  return array; 
}; 

export async function fetchBeers(lastVisible) {
    // if lastVisible is null, then we are fetching the first page with out startAfter
    const next = lastVisible ? 
                  query(collection(db, "character cover letter"), startAfter(lastVisible), limit(5)) : 
                  query(collection(db, "character cover letter"), limit(5));
    const documentSnapshots = await getDocs(next);
    return documentSnapshots.docs;
    
  }