"use client";

import { useEffect, useRef } from "react";

export default function Greeting() {
    const sectionRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("animate-fade-in-up");
                    }
                });
            },
            { threshold: 0.1 },
        );

        const elements =
            sectionRef.current?.querySelectorAll(".animate-on-scroll");
        elements?.forEach((el) => observer.observe(el));

        return () => observer.disconnect();
    }, []);

    return (
        <div ref={sectionRef} className="py-12 md:py-16">
            <div className="max-w-2xl mx-auto text-center">
                {/* Decorative flourish */}
                {/* <div className="animate-on-scroll opacity-0 mb-8">
                    <svg
                        className="w-48 h-12 mx-auto text-gray-400"
                        viewBox="0 0 200 50"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M20 25 Q50 10, 80 25 T140 25 T200 25"
                            stroke="currentColor"
                            strokeWidth="1"
                            strokeLinecap="round"
                            fill="none"
                            opacity="0.5"
                        />
                        <circle
                            cx="100"
                            cy="25"
                            r="3"
                            fill="currentColor"
                            opacity="0.4"
                        />
                        <circle
                            cx="85"
                            cy="25"
                            r="2"
                            fill="currentColor"
                            opacity="0.3"
                        />
                        <circle
                            cx="115"
                            cy="25"
                            r="2"
                            fill="currentColor"
                            opacity="0.3"
                        />
                    </svg>
                </div> */}

                {/* Title */}
                <div className="animate-on-scroll opacity-0 mb-12">
                    <h3 className="text-2xl md:text-3xl font-light text-gray-700 mb-2">
                        두둔
                    </h3>
                    <div className="w-16 h-0.5 bg-gradient-to-r from-transparent via-gray-300 to-transparent mx-auto"></div>
                </div>

                {/* Main greeting message */}
                <div className="space-y-2 text-gray-600 font-light leading-relaxed">
                    <div className="animate-on-scroll opacity-0">
                        <p className="text-base md:text-lg mb-3">
                            각자 서로 다른 길을
                        </p>
                        <p className="text-base md:text-lg mb-3">
                            걸어온 저희가 이제 부부의 연으로
                        </p>
                        <p className="text-base md:text-lg">
                            한 길을 걸어가고자 합니다.
                        </p>
                    </div>

                    {/* Divider */}
                    <div className="animate-on-scroll opacity-0 py-4">
                        <span className="text-2xl text-gray-300">·</span>
                    </div>

                    <div className="animate-on-scroll opacity-0">
                        <p className="text-base md:text-lg mb-3">
                            항상 서로를 생각하며,
                        </p>
                        <p className="text-base md:text-lg">
                            서로 아껴주고 사랑하며 살겠습니다.
                        </p>
                    </div>

                    {/* Divider */}
                    <div className="animate-on-scroll opacity-0 py-4">
                        <span className="text-2xl text-gray-300">·</span>
                    </div>

                    <div className="animate-on-scroll opacity-0">
                        <p className="text-base md:text-lg mb-3">
                            부디 참석해 주시어 저희의 약속을
                        </p>
                        <p className="text-base md:text-lg">
                            따뜻한 격려로 축복해 주시기 바랍니다.
                        </p>
                    </div>
                </div>

                {/* Names section */}
                <div className="animate-on-scroll opacity-0 mt-16">
                    <div className="space-y-6 text-gray-600">
                        <div className="flex items-center justify-center space-x-8">
                            <div className="text-right">
                                <p className="text-sm md:text-base mb-1 text-gray-500">
                                    <span className="font-light">정찬종</span>
                                    <span className="mx-1 text-gray-400">
                                        ·
                                    </span>
                                    <span className="font-light">박정실</span>
                                    <span className="text-gray-500 ml-2 text-xs">
                                        의
                                    </span>
                                </p>
                                <p className="text-lg md:text-xl font-normal">
                                    <span className="text-sm text-gray-500 mr-2">
                                        차남
                                    </span>
                                    민기
                                </p>
                            </div>

                            <div className="text-2xl text-gray-300 font-light">
                                &
                            </div>

                            <div className="text-left">
                                <p className="text-sm md:text-base mb-1 text-gray-500">
                                    <span className="font-light">임정근</span>
                                    <span className="mx-1 text-gray-400">
                                        ·
                                    </span>
                                    <span className="font-light">김정자</span>
                                    <span className="text-gray-500 ml-2 text-xs">
                                        의
                                    </span>
                                </p>
                                <p className="text-lg md:text-xl font-normal">
                                    <span className="text-sm text-gray-500 mr-2">
                                        장녀
                                    </span>
                                    소연
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Decorative bottom flourish */}
                <div className="animate-on-scroll opacity-0 mt-12">
                    <svg
                        className="w-32 h-8 mx-auto text-gray-300"
                        viewBox="0 0 200 30"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M50 15 Q100 5, 150 15"
                            stroke="currentColor"
                            strokeWidth="1"
                            strokeLinecap="round"
                            fill="none"
                            opacity="0.4"
                        />
                    </svg>
                </div>
            </div>

            <style jsx>{`
                @keyframes fade-in-up {
                    from {
                        opacity: 0;
                        transform: translateY(20px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }

                :global(.animate-fade-in-up) {
                    animation: fade-in-up 0.8s ease-out forwards;
                }

                :global(.animate-on-scroll) {
                    transition: all 0.8s ease-out;
                }

                :global(.animate-on-scroll:nth-child(1)) {
                    transition-delay: 0ms;
                }
                :global(.animate-on-scroll:nth-child(2)) {
                    transition-delay: 100ms;
                }
                :global(.animate-on-scroll:nth-child(3)) {
                    transition-delay: 200ms;
                }
                :global(.animate-on-scroll:nth-child(4)) {
                    transition-delay: 300ms;
                }
                :global(.animate-on-scroll:nth-child(5)) {
                    transition-delay: 400ms;
                }
                :global(.animate-on-scroll:nth-child(6)) {
                    transition-delay: 500ms;
                }
                :global(.animate-on-scroll:nth-child(7)) {
                    transition-delay: 600ms;
                }
                :global(.animate-on-scroll:nth-child(8)) {
                    transition-delay: 700ms;
                }
                :global(.animate-on-scroll:nth-child(9)) {
                    transition-delay: 800ms;
                }
            `}</style>
        </div>
    );
}
