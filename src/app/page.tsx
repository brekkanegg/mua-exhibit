import Gallery from "@/components/Gallery";
import Location from "@/components/Location";
import Poster from "@/components/Poster";

export default function Home() {
    return (
        <main className="min-h-screen bg-white">
            {/* Full-bleed poster first */}
            <section id="poster">
                <Poster />
            </section>

            {/* Content container appears after scrolling */}
            <div className="container mx-auto max-w-4xl px-4">
                <section id="gallery" className="py-8">
                    <Gallery />
                </section>

                {/* <hr className="border-t  border-gray-200" /> */}

                <section id="location" className="py-2">
                    <Location />
                </section>
            </div>
        </main>
    );
}
