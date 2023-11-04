'use client';
import React from "react";
import {Card, CardFooter, Image, Button, CardBody} from "@nextui-org/react";
import {Popover, PopoverTrigger, PopoverContent} from "@nextui-org/react";

export default function Why() {
    return (
        <>
            <div className="flex justify-center py-5 mb-3">
                <h1 className="my-4 px-5 text-3xl font-extrabold text-gray-900 dark:text-white md:text-5xl lg:text-6xl">Why 
                <span className="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400"> Cover Letter</span> Bro?
                </h1>
            </div>

            <div className="flex justify-around">
                <Card
                    isFooterBlurred
                    className=""
                    >
                    <Image
                        alt="Woman listing to music"
                        className="object-cover"
                        src="/images/stand-out-chess.jpg"
                        width={500}
                    />
                    <CardFooter className="flex justify-center before:bg-white/10 border-white/20 border-1 py-2 absolute before:rounded-xl rounded-large bottom-1 shadow-small ml-1 z-10">
                        <Popover className="w-full">
                            <PopoverTrigger>
                                <Button className="w-full text-white bg-black/20 text-xl font-extrabold text-white/80" variant="flat" color="default" radius="lg">Stand out from the crowd</Button>
                            </PopoverTrigger>
                            <PopoverContent>
                                <div className="px-1 py-2">
                                <div className="text-small font-bold">Stand Out from the Crowd with a Punctual and Precise Cover Letter</div>
                                </div>
                            </PopoverContent>
                        </Popover>
                    </CardFooter>
                </Card>
                <Card
                    isFooterBlurred
                    className=""
                    >
                    <Image
                        alt="Woman listing to music"
                        className="object-cover"
                        src="/images/chatgpt.jpg"
                        width={500}
                    />
                    <CardFooter className="flex justify-center before:bg-white/10 border-white/20 border-1 py-2 absolute before:rounded-xl rounded-large bottom-1 shadow-small ml-1 z-10">
                        <Popover className="w-full">
                            <PopoverTrigger>
                                <Button className="w-full text-white bg-black/20 text-xl font-extrabold text-white/80" variant="flat" color="default" radius="lg">
                                The "Cover Letter GPT"
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent>
                                <div className="px-1 py-2">
                                <   div className="text-small font-bold">Bro will find the best prompt and fine-tune ChatGPT for you!</div>
                                </div>
                            </PopoverContent>
                        </Popover>
                    </CardFooter>
                </Card>
                
            </div>
        </>
    )
}