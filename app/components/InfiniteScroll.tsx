"use client";

import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import {Spinner} from "@nextui-org/react";
import { fetchBeers, shuffle } from "../../lib/utils";
import { CardScroll } from "./CardScroll";

export function InfiniteScroll() {
  const [beers, setBeers] = useState([]);
  const [lastVisible, setLastVisible] = useState(null);
  const { ref, inView } = useInView();

  const delay = (ms: number) =>
    new Promise((resolve) => setTimeout(resolve, ms));

  const loadMoreBeers = async () => {
    const newProducts = (await fetchBeers(lastVisible)) ?? [];
    setBeers((prevProducts) => [...prevProducts, ...newProducts]);
  };

  useEffect(() => {
    setLastVisible(beers[beers.length - 1]);

    if (inView) {
        loadMoreBeers();
    }
  }, [inView]);

  return (
    <>
      <CardScroll beers={shuffle(beers.map(doc => doc.data()))} />
      <div
        className="flex justify-center items-center p-4 col-span-1 sm:col-span-2 md:col-span-3"
        ref={ref}
      >
        {inView && <Spinner />}
      </div>
    </>
  );
}