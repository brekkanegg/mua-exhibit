"use client";

import Image from "next/image";

type PosterProps = {
    src?: string;
    alt?: string;
};

const Poster = ({ src = "/poster.png", alt = "Poster image" }: PosterProps) => {
    return (
        <div className="relative w-full h-[70vh] rounded-lg overflow-hidden">
            <Image
                src={src}
                alt={alt}
                fill
                className="object-contain"
                priority
            />
        </div>
    );
};

export default Poster;
