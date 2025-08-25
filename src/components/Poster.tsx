"use client";

import Image from "next/image";

type PosterProps = {
    src?: string;
    alt?: string;
};

const Poster = ({
    src = "/poster_4.png",
    alt = "Poster image",
}: PosterProps) => {
    return (
        <div className="relative w-screen h-svh overflow-hidden">
            <Image
                src={src}
                alt={alt}
                fill
                className="object-cover"
                sizes="100vw"
                priority
            />
        </div>
    );
};

export default Poster;
