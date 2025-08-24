import Gallery from "@/components/Gallery";
import Location from "@/components/Location";
import Poster from "@/components/Poster";

export default function Home() {
    return (
        <main className="min-h-screen bg-white">
            <div className="container mx-auto max-w-4xl">
                {/* <header></header> */}

                <section id="poster" className="mb-4">
                    <Poster />
                </section>

                <section id="gallery" className="mb-4">
                    <Gallery />
                </section>

                <hr className="my-4 border-t border-gray-200" />

                <section id="location" className="mb-4">
                    <Location />
                </section>
            </div>
        </main>
    );
}
