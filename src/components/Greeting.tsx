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
                    <h4 className="text-xl md:text-3xl font-light text-gray-700 mb-2">
                        누가 여행가면 놀고 먹는다고 했나요...?
                    </h4>
                    <div className="w-16 h-0.5 bg-gradient-to-r from-transparent via-gray-300 to-transparent mx-auto"></div>
                </div>

                {/* Main greeting message */}
                <div className="space-y-6 text-gray-600 font-light leading-relaxed">
                    <div className="animate-on-scroll opacity-0 space-y-4">
                        <p className="text-base md:text-lg">
                            물론 놀고 먹었지만, 그 외에
                        </p>
                        <p className="text-base md:text-lg">
                            짐풀고 짐싸고 걷고 기다리고 또 기다리고
                        </p>
                        <p className="text-base md:text-lg">
                            검색하고 계획하고 확인하고 물어보고
                        </p>
                        <p className="text-base md:text-lg">
                            사기 당하고 앞뒤 살피고 옆도 살피고
                        </p>
                        <p className="text-base md:text-lg">
                            오늘은 뭐할지, 내일은 또 뭐할지,
                        </p>
                        <p className="text-base md:text-lg">
                            이 다음엔 어디 갈지, 오늘 저녁은 뭘 해먹을지...
                        </p>
                        <p className="text-base md:text-lg">
                            등 고민할 게 많았습니다.
                        </p>
                    </div>

                    {/* Divider */}
                    <div className="animate-on-scroll opacity-0">
                        <span className="text-2xl text-gray-300">·</span>
                    </div>

                    <div className="animate-on-scroll opacity-0 space-y-4">
                        <p className="text-base md:text-lg">
                            재밌고 지루하고 설레고 화나고 신나고
                        </p>
                        <p className="text-base md:text-lg">
                            슬프고 반성하고를 반복하는 동안
                        </p>
                        <p className="text-base md:text-lg">
                            어느새 242일이 지났습니다.
                        </p>
                    </div>

                    {/* Divider */}
                    <div className="animate-on-scroll opacity-0">
                        <span className="text-2xl text-gray-300">·</span>
                    </div>

                    <div className="animate-on-scroll opacity-0 space-y-4">
                        <p className="text-base md:text-lg mb-3">
                            &quot;여행 다녀온 얘기 좀 해봐&quot;란
                        </p>
                        <p className="text-base md:text-lg mb-3">
                            질문에 재밌게 답을 잘 못했습니다.
                        </p>
                        <p className="text-base md:text-lg mb-3">
                            대신 여행 동안 매일 사진일기를 적었는데요.
                        </p>
                        <p className="text-base md:text-lg mb-3">
                            그 일기의 일부를 공개합니다!
                        </p>
                    </div>
                </div>
            </div>

            <style jsx>{`
                @import url("https://fonts.googleapis.com/css2?family=Noto+Serif+KR:wght@200;300;400&family=Pretendard:wght@100;200;300;400&display=swap");

                h1,
                h2,
                h3,
                h4,
                h5,
                h6,
                p,
                span,
                div {
                    font-family: "Pretendard", "Noto Serif KR",
                        "Apple SD Gothic Neo", -apple-system, BlinkMacSystemFont,
                        "Segoe UI", sans-serif;
                    -webkit-font-smoothing: antialiased;
                    -moz-osx-font-smoothing: grayscale;
                }

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
