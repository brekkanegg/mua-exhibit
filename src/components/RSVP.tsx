"use client";

import type { RSVP } from "@/lib/supabase";
import * as Dialog from "@radix-ui/react-dialog";
import * as Label from "@radix-ui/react-label";
import * as RadioGroup from "@radix-ui/react-radio-group";
import { Calendar, Check, MessageSquare, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";

export default function RSVP() {
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const sectionRef = useRef<HTMLDivElement>(null);

    const [formData, setFormData] = useState<Partial<RSVP>>({
        side: "신랑측",
        attendance: "참석",
        meal: true,
        party_size: 1,
        message: "",
        phone: "",
        name: "",
    });

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

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await fetch("/api/rsvp", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                setSuccess(true);
                setTimeout(() => {
                    setOpen(false);
                    setSuccess(false);
                    // Reset form
                    setFormData({
                        side: "신랑측",
                        attendance: "참석",
                        meal: true,
                        party_size: 1,
                        message: "",
                        phone: "",
                        name: "",
                    });
                }, 2000);
            } else {
                alert("전송 중 오류가 발생했습니다. 다시 시도해주세요.");
            }
        } catch (error) {
            console.error("Error submitting RSVP:", error);
            alert("전송 중 오류가 발생했습니다. 다시 시도해주세요.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div ref={sectionRef} className="py-12 md:py-16">
            <div className="max-w-2xl mx-auto text-center">
                {/* Title Section */}
                <div className="animate-on-scroll opacity-0 mb-12">
                    <h2 className="text-xs md:text-sm font-light text-gray-500 tracking-[0.3em] mb-2">
                        SAVE THE DATE
                    </h2>
                    <h3 className="text-2xl md:text-3xl font-light text-gray-700 mb-6">
                        참석 여부를 전달해주세요
                    </h3>
                    <div className="w-16 h-0.5 bg-gradient-to-r from-transparent via-gray-300 to-transparent mx-auto"></div>
                </div>

                {/* Message */}
                <div className="animate-on-scroll opacity-0 space-y-4 mb-12 text-gray-600">
                    <p className="text-base md:text-lg leading-relaxed">
                        결혼식 참석 전 참석여부를 응답해주시면
                    </p>
                    <p className="text-base md:text-lg leading-relaxed">
                        결혼식 준비에 있어 큰 도움이 됩니다.
                    </p>
                    <p className="text-base md:text-lg leading-relaxed">
                        한 분 한 분 더욱 귀하게 모실 수 있도록
                    </p>
                    <p className="text-base md:text-lg leading-relaxed">
                        아래 버튼을 클릭하여 참석여부를
                    </p>
                    <p className="text-base md:text-lg leading-relaxed">
                        전달 부탁드립니다.
                    </p>
                </div>

                {/* Wedding Info */}
                <div className="animate-on-scroll opacity-0 mb-12">
                    <div className="inline-block border-t border-b border-dashed border-gray-300 py-6 px-8">
                        <div className="flex items-center justify-center gap-2 mb-3">
                            <Calendar className="w-5 h-5 text-gray-500" />
                            <span className="text-gray-700 font-medium">
                                10월 12일 일요일 낮 12시 - 3시
                            </span>
                        </div>
                        <div className="flex items-center justify-center gap-2">
                            <svg
                                className="w-5 h-5 text-gray-500"
                                fill="none"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                                <path d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                            </svg>
                            <span className="text-gray-700 font-medium">
                                양재시민의숲 야외예식장
                            </span>
                        </div>
                    </div>
                </div>

                {/* RSVP Button */}
                <div className="animate-on-scroll opacity-0">
                    <Dialog.Root open={open} onOpenChange={setOpen}>
                        <Dialog.Trigger asChild>
                            <button className="inline-flex items-center gap-2 bg-gradient-to-r from-gray-700 to-gray-800 text-white px-8 py-4 rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all font-medium">
                                <MessageSquare className="w-5 h-5" />
                                참석여부 전달하기
                            </button>
                        </Dialog.Trigger>

                        <Dialog.Portal>
                            <Dialog.Overlay className="fixed inset-0 bg-black/60 backdrop-blur-sm animate-in fade-in" />
                            <Dialog.Content className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-2xl p-8 w-[90vw] max-w-lg max-h-[85vh] overflow-y-auto shadow-2xl animate-in fade-in zoom-in-95">
                                {success ? (
                                    <div className="text-center py-8">
                                        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                            <Check className="w-8 h-8 text-green-600" />
                                        </div>
                                        <h3 className="text-xl font-medium mb-2">
                                            감사합니다!
                                        </h3>
                                        <p className="text-gray-600">
                                            참석 여부가 전달되었습니다.
                                        </p>
                                    </div>
                                ) : (
                                    <>
                                        <Dialog.Title className="text-xl font-medium mb-6 text-center">
                                            참석여부 전달하기
                                        </Dialog.Title>
                                        <Dialog.Close asChild>
                                            <button
                                                className="absolute right-4 top-4 rounded-full p-1 hover:bg-gray-100 transition-colors"
                                                aria-label="Close"
                                            >
                                                <X className="h-5 w-5 text-gray-500" />
                                            </button>
                                        </Dialog.Close>

                                        <form
                                            onSubmit={handleSubmit}
                                            className="space-y-6"
                                        >
                                            {/* Name */}
                                            <div>
                                                <Label.Root
                                                    htmlFor="name"
                                                    className="text-sm font-medium text-gray-700 block mb-2"
                                                >
                                                    성함 *
                                                </Label.Root>
                                                <input
                                                    type="text"
                                                    id="name"
                                                    value={formData.name}
                                                    onChange={(e) =>
                                                        setFormData({
                                                            ...formData,
                                                            name: e.target
                                                                .value,
                                                        })
                                                    }
                                                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent transition-all"
                                                    placeholder="홍길동"
                                                    required
                                                />
                                            </div>

                                            {/* 신랑측/신부측 */}
                                            <div>
                                                <Label.Root
                                                    htmlFor="side"
                                                    className="text-sm font-medium text-gray-700 block mb-3"
                                                >
                                                    구분 *
                                                </Label.Root>
                                                <RadioGroup.Root
                                                    id="side"
                                                    value={formData.side}
                                                    onValueChange={(value) =>
                                                        setFormData({
                                                            ...formData,
                                                            side: value as
                                                                | "신랑측"
                                                                | "신부측",
                                                        })
                                                    }
                                                    className="grid grid-cols-2 gap-3"
                                                >
                                                    <div className="relative">
                                                        <RadioGroup.Item
                                                            value="신랑측"
                                                            id="groom"
                                                            className="peer sr-only"
                                                        />
                                                        <Label.Root
                                                            htmlFor="groom"
                                                            className="flex items-center justify-center px-4 py-3 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50 peer-data-[state=checked]:bg-gray-800 peer-data-[state=checked]:text-white peer-data-[state=checked]:border-gray-800 transition-all"
                                                        >
                                                            정민기 측
                                                        </Label.Root>
                                                    </div>
                                                    <div className="relative">
                                                        <RadioGroup.Item
                                                            value="신부측"
                                                            id="bride"
                                                            className="peer sr-only"
                                                        />
                                                        <Label.Root
                                                            htmlFor="bride"
                                                            className="flex items-center justify-center px-4 py-3 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50 peer-data-[state=checked]:bg-gray-800 peer-data-[state=checked]:text-white peer-data-[state=checked]:border-gray-800 transition-all"
                                                        >
                                                            임소연 측
                                                        </Label.Root>
                                                    </div>
                                                </RadioGroup.Root>
                                            </div>

                                            {/* 참석/불참 */}
                                            <div>
                                                <Label.Root
                                                    htmlFor="attendance"
                                                    className="text-sm font-medium text-gray-700 block mb-3"
                                                >
                                                    참석 여부 *
                                                </Label.Root>
                                                <RadioGroup.Root
                                                    id="attendance"
                                                    value={formData.attendance}
                                                    onValueChange={(value) =>
                                                        setFormData({
                                                            ...formData,
                                                            attendance:
                                                                value as
                                                                    | "참석"
                                                                    | "불참",
                                                        })
                                                    }
                                                    className="grid grid-cols-2 gap-3"
                                                >
                                                    <div className="relative">
                                                        <RadioGroup.Item
                                                            value="참석"
                                                            id="attend"
                                                            className="peer sr-only"
                                                        />
                                                        <Label.Root
                                                            htmlFor="attend"
                                                            className="flex items-center justify-center px-4 py-3 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50 peer-data-[state=checked]:bg-gray-800 peer-data-[state=checked]:text-white peer-data-[state=checked]:border-gray-800 transition-all"
                                                        >
                                                            참석
                                                        </Label.Root>
                                                    </div>
                                                    <div className="relative">
                                                        <RadioGroup.Item
                                                            value="불참"
                                                            id="absent"
                                                            className="peer sr-only"
                                                        />
                                                        <Label.Root
                                                            htmlFor="absent"
                                                            className="flex items-center justify-center px-4 py-3 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50 peer-data-[state=checked]:bg-gray-800 peer-data-[state=checked]:text-white peer-data-[state=checked]:border-gray-800 transition-all"
                                                        >
                                                            불참
                                                        </Label.Root>
                                                    </div>
                                                </RadioGroup.Root>
                                            </div>

                                            {/* Show additional fields only if attending */}
                                            {formData.attendance === "참석" && (
                                                <>
                                                    {/* 식사 여부 */}
                                                    <div>
                                                        <Label.Root
                                                            htmlFor="meal"
                                                            className="text-sm font-medium text-gray-700 block mb-3"
                                                        >
                                                            식사 여부 *
                                                        </Label.Root>
                                                        <RadioGroup.Root
                                                            id="meal"
                                                            value={
                                                                formData.meal
                                                                    ? "yes"
                                                                    : "no"
                                                            }
                                                            onValueChange={(
                                                                value,
                                                            ) =>
                                                                setFormData({
                                                                    ...formData,
                                                                    meal:
                                                                        value ===
                                                                        "yes",
                                                                })
                                                            }
                                                            className="grid grid-cols-2 gap-3"
                                                        >
                                                            <div className="relative">
                                                                <RadioGroup.Item
                                                                    value="yes"
                                                                    id="meal-yes"
                                                                    className="peer sr-only"
                                                                />
                                                                <Label.Root
                                                                    htmlFor="meal-yes"
                                                                    className="flex items-center justify-center px-4 py-3 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50 peer-data-[state=checked]:bg-gray-800 peer-data-[state=checked]:text-white peer-data-[state=checked]:border-gray-800 transition-all"
                                                                >
                                                                    식사 예정
                                                                </Label.Root>
                                                            </div>
                                                            <div className="relative">
                                                                <RadioGroup.Item
                                                                    value="no"
                                                                    id="meal-no"
                                                                    className="peer sr-only"
                                                                />
                                                                <Label.Root
                                                                    htmlFor="meal-no"
                                                                    className="flex items-center justify-center px-4 py-3 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50 peer-data-[state=checked]:bg-gray-800 peer-data-[state=checked]:text-white peer-data-[state=checked]:border-gray-800 transition-all"
                                                                >
                                                                    식사 안함
                                                                </Label.Root>
                                                            </div>
                                                        </RadioGroup.Root>
                                                    </div>

                                                    {/* 총 인원 */}
                                                    <div>
                                                        <Label.Root
                                                            htmlFor="party_size"
                                                            className="text-sm font-medium text-gray-700 block mb-2 "
                                                        >
                                                            총 참석 인원 (본인
                                                            포함) *
                                                        </Label.Root>
                                                        <div className="flex items-center gap-3 justify-center">
                                                            <button
                                                                type="button"
                                                                onClick={() =>
                                                                    setFormData(
                                                                        {
                                                                            ...formData,
                                                                            party_size:
                                                                                Math.max(
                                                                                    1,
                                                                                    (formData.party_size ||
                                                                                        1) -
                                                                                        1,
                                                                                ),
                                                                        },
                                                                    )
                                                                }
                                                                className="w-10 h-10 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors flex items-center justify-center"
                                                            >
                                                                -
                                                            </button>
                                                            <input
                                                                type="number"
                                                                id="party_size"
                                                                min="1"
                                                                value={
                                                                    formData.party_size
                                                                }
                                                                onChange={(e) =>
                                                                    setFormData(
                                                                        {
                                                                            ...formData,
                                                                            party_size:
                                                                                parseInt(
                                                                                    e
                                                                                        .target
                                                                                        .value,
                                                                                ) ||
                                                                                1,
                                                                        },
                                                                    )
                                                                }
                                                                className="w-20 px-3 py-2 border border-gray-200 rounded-lg text-center focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent"
                                                                required
                                                            />
                                                            <button
                                                                type="button"
                                                                onClick={() =>
                                                                    setFormData(
                                                                        {
                                                                            ...formData,
                                                                            party_size:
                                                                                (formData.party_size ||
                                                                                    1) +
                                                                                1,
                                                                        },
                                                                    )
                                                                }
                                                                className="w-10 h-10 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors flex items-center justify-center"
                                                            >
                                                                +
                                                            </button>
                                                            <span className="text-sm text-gray-500">
                                                                명
                                                            </span>
                                                        </div>
                                                    </div>
                                                </>
                                            )}

                                            {/* 연락처 */}
                                            <div>
                                                <Label.Root
                                                    htmlFor="phone"
                                                    className="text-sm font-medium text-gray-700 block mb-2"
                                                >
                                                    연락처 (선택사항)
                                                </Label.Root>
                                                <input
                                                    type="tel"
                                                    id="phone"
                                                    value={formData.phone}
                                                    onChange={(e) =>
                                                        setFormData({
                                                            ...formData,
                                                            phone: e.target
                                                                .value,
                                                        })
                                                    }
                                                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent transition-all"
                                                    placeholder="010-0000-0000"
                                                />
                                            </div>

                                            {/* 메시지 */}
                                            <div>
                                                <Label.Root
                                                    htmlFor="message"
                                                    className="text-sm font-medium text-gray-700 block mb-2"
                                                >
                                                    한마디 (선택 사항)
                                                </Label.Root>
                                                <textarea
                                                    id="message"
                                                    value={formData.message}
                                                    onChange={(e) =>
                                                        setFormData({
                                                            ...formData,
                                                            message:
                                                                e.target.value,
                                                        })
                                                    }
                                                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent transition-all resize-none"
                                                    rows={4}
                                                    placeholder="축하의 마음을 전해주세요"
                                                />
                                            </div>

                                            {/* Submit Button */}
                                            <button
                                                type="submit"
                                                disabled={
                                                    loading || !formData.name
                                                }
                                                className="w-full bg-gradient-to-r from-gray-700 to-gray-800 text-white py-3 px-6 rounded-lg hover:shadow-lg transform hover:scale-[1.02] transition-all font-medium disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-2"
                                            >
                                                {loading ? (
                                                    <>
                                                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                                        전송 중...
                                                    </>
                                                ) : (
                                                    <>
                                                        <Check className="w-5 h-5" />
                                                        전송하기
                                                    </>
                                                )}
                                            </button>
                                        </form>
                                    </>
                                )}
                            </Dialog.Content>
                        </Dialog.Portal>
                    </Dialog.Root>
                </div>

                {/* Decorative bottom element */}
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
            `}</style>
        </div>
    );
}
