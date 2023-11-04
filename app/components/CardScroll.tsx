"use client";
import {
  Divider,
  Image,
} from "@nextui-org/react";

import {
  Card,
  CardContent,
  CardDescription,
} from "./ui/card"


// export interface BeerProps {
//   beers: Beer[] | null;
// }

export function CardScroll({ beers }) {
  return (
    <>
      {beers ? (
        beers.map((beer) => (
          <Card key={beer.id} className="my-8">
            <CardDescription className="flex p-4 justify-between items-center bg-slate-800">
              <Image
                alt="nextui logo"
                isZoomed
                height={300}
                src={`/images/character/${beer.character}.jpg`}
                width={400}
              />
              <div className="flex flex-col w-full">
                <p className="text-5xl font-bold text-center">
                  {beer.character}  -  The &nbsp;
                  <span className="underline underline-offset-3 decoration-8 decoration-blue-400 dark:decoration-blue-600">{beer.position}</span></p>
              </div>
            </CardDescription>
            <Divider />
            <CardContent className="flex flex-col p-8 ">
              <p className="whitespace-pre-wrap">{beer.cover_letter}</p>
            </CardContent>
          </Card>
        ))
      ) : (
        <div className="text-xl font-bold">No beers available !! </div>
      )}
    </>
  );
}