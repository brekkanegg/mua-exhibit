import Gallery from "@/components/Gallery";
import Greeting from "@/components/Greeting";
import Location from "@/components/Location";
import Poster from "@/components/Poster";
import RSVP from "@/components/RSVP";

export default function Home() {
    return (
        <main className="min-h-screen">
            {/* Full-bleed poster first - White BG */}
            <section id="poster" className="bg-white">
                <Poster />
            </section>

            {/* Greeting section - Light Gray BG */}
            <section id="greeting" className="bg-gray-50">
                <div className="container mx-auto max-w-4xl px-4">
                    <Greeting />
                </div>
            </section>

            {/* Gallery section - White BG */}
            <section id="gallery" className="bg-white ">
                <div className="container mx-auto max-w-4xl px-4">
                    <Gallery />
                </div>
            </section>

            {/* Location section - Light Gray BG */}
            <section
                id="location"
                className="bg-gray-50 "
            >
                <div className="container mx-auto max-w-4xl px-4">
                    <Location />
                </div>
            </section>

            {/* RSVP Section - White BG */}
            <section id="rsvp" className="bg-white ">
                <div className="container mx-auto max-w-4xl px-4">
                    <RSVP />
                </div>
            </section>
        </main>
    );
}
