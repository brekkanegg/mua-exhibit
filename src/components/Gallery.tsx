"use client";

import Image from "next/image";
import { useState } from "react";

const Gallery = () => {
    const [selectedImage, setSelectedImage] = useState(0);

    const images = [
        {
            src: "https://picsum.photos/800/600?random=1",
            alt: "Photo 1",
            title: "Exhibition Photo 1",
        },
        {
            src: "https://picsum.photos/800/600?random=2",
            alt: "Photo 2",
            title: "Exhibition Photo 2",
        },
        {
            src: "https://picsum.photos/800/600?random=3",
            alt: "Photo 3",
            title: "Exhibition Photo 3",
        },
        {
            src: "https://picsum.photos/800/600?random=4",
            alt: "Photo 4",
            title: "Exhibition Photo 4",
        },
        {
            src: "https://picsum.photos/800/600?random=5",
            alt: "Photo 5",
            title: "Exhibition Photo 5",
        },
    ];

    return (
        <div className="mt-4">
            <h2 className="text-2xl font-bold text-center text-gray-800 mb-8">
                Gallery
            </h2>

            {/* Main Image Display */}
            <div className="relative w-full h-96 bg-gray-200 overflow-hidden rounded-xl">
                <Image
                    src={images[selectedImage].src}
                    alt={images[selectedImage].alt}
                    fill
                    className="object-cover"
                    priority
                    onError={() => {
                        // Fallback to placeholder if image doesn't exist
                        console.log("Image not found, using placeholder");
                    }}
                />
            </div>

            {/* Thumbnail Navigation */}
            <div className="flex justify-center space-x-4 mt-6">
                {images.map((image, index) => (
                    <button
                        key={index}
                        onClick={() => setSelectedImage(index)}
                        className={`relative w-20 h-16 overflow-hidden transition-all rounded-md ${
                            selectedImage === index
                                ? "ring-2 ring-blue-500 transform scale-105"
                                : "opacity-70 hover:opacity-100"
                        }`}
                    >
                        <Image
                            src={image.src}
                            alt={`Thumbnail ${index + 1}`}
                            fill
                            className="object-cover rounded-md"
                            onError={() => {
                                console.log(`Thumbnail ${index + 1} not found`);
                            }}
                        />
                    </button>
                ))}
            </div>
        </div>
    );
};

export default Gallery;
