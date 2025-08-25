"use client";

import { useEffect, useRef } from "react";

declare global {
    interface Window {
        naver?: {
            maps?: {
                LatLng: new (lat: number, lng: number) => unknown;
                Map: new (
                    element: HTMLElement,
                    options: Record<string, unknown>,
                ) => unknown;
                Marker: new (options: Record<string, unknown>) => unknown;
                InfoWindow?: new (options: Record<string, unknown>) => {
                    open: (map: unknown, marker: unknown) => void;
                    close: () => void;
                    getMap: () => unknown;
                };
                Event?: {
                    addListener: (
                        target: unknown,
                        event: string,
                        handler: () => void,
                    ) => void;
                };
                Animation?: {
                    DROP?: unknown;
                };
            };
        };
    }
}

const NAVER_CLIENT_ID = process.env.NEXT_PUBLIC_NAVER_MAPS_CLIENT_ID;

const Location = () => {
    // Yangjae Citizen's Forest Outdoor Wedding Venue
    const placeName = "양재시민의숲 야외예식장";
    const latitude = 37.4705198; // Google Maps 좌표
    const longitude = 127.0353278;
    const naverPlaceId = "31875178";

    const mapRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if (!NAVER_CLIENT_ID) {
            console.error("Naver Maps Client ID is not set");
            return;
        }

        // Create and load script
        const script = document.createElement("script");
        script.type = "text/javascript";
        script.src = `https://oapi.map.naver.com/openapi/v3/maps.js?ncpKeyId=${NAVER_CLIENT_ID}`;
        script.async = true;

        script.onload = () => {
            // Initialize map after script loads
            if (mapRef.current && window.naver && window.naver.maps) {
                const mapOptions = {
                    center: new window.naver.maps.LatLng(latitude, longitude),
                    zoom: 17, // 더 가까운 줌 레벨로 조정
                    mapTypeControl: true,
                    scaleControl: true,
                    zoomControl: true,
                };

                const map = new window.naver.maps.Map(
                    mapRef.current,
                    mapOptions,
                );

                // Add marker with more options
                const markerOptions: Record<string, unknown> = {
                    position: new window.naver.maps.LatLng(latitude, longitude),
                    map: map,
                    title: placeName,
                };

                // Add animation if available
                if (window.naver.maps.Animation?.DROP) {
                    markerOptions.animation = window.naver.maps.Animation.DROP;
                }

                const marker = new window.naver.maps.Marker(markerOptions);

                // Add info window if available
                if (window.naver.maps.InfoWindow && window.naver.maps.Event) {
                    const infoWindow = new window.naver.maps.InfoWindow({
                        content: `<div style="padding: 10px; min-width: 150px;">
                            <h4 style="margin: 0 0 5px 0;">${placeName}</h4>
                            <p style="margin: 0; font-size: 12px;">서울 서초구 매헌로 99</p>
                        </div>`,
                    });

                    // Show info window on marker click
                    window.naver.maps.Event.addListener(marker, "click", () => {
                        if (infoWindow.getMap()) {
                            infoWindow.close();
                        } else {
                            infoWindow.open(map, marker);
                        }
                    });
                }
            }
        };

        document.head.appendChild(script);

        // Cleanup
        return () => {
            if (document.head.contains(script)) {
                document.head.removeChild(script);
            }
        };
    }, []);

    const openInNaverMap = () => {
        const schemeUrl = `nmap://place?id=${naverPlaceId}`;
        const webUrl = `https://map.naver.com/p/entry/place/${naverPlaceId}`;

        // Try app scheme first; fallback to web
        const timeout = setTimeout(() => {
            window.open(webUrl, "_blank");
        }, 800);
        window.location.href = schemeUrl;
        // If app handled, navigation changes and timeout likely won't fire; best-effort approach
        setTimeout(() => clearTimeout(timeout), 1500);
    };

    const openInKakaoMap = () => {
        const schemeUrl = "kakaomap://place?id=24692652";
        const webUrl =
            "https://map.kakao.com/?map_type=TYPE_MAP&itemId=24692652&urlLevel=3&urlX=508602&urlY=1103020";

        const timeout = setTimeout(() => {
            window.open(webUrl, "_blank");
        }, 800);
        window.location.href = schemeUrl;
        setTimeout(() => clearTimeout(timeout), 1500);
    };

    return (
        <div className="space-y-12 mt-12">
            <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">
                Location
            </h2>

            {/* Naver Map */}
            <div className="relative w-full h-80 md:h-[420px] rounded-lg overflow-hidden border border-gray-200">
                {NAVER_CLIENT_ID ? (
                    <div ref={mapRef} className="w-full h-full" />
                ) : (
                    <div className="flex h-full items-center justify-center text-sm text-gray-500">
                        네이버 지도 키가 필요합니다
                        (NEXT_PUBLIC_NAVER_MAPS_CLIENT_ID)
                    </div>
                )}
            </div>

            {/* Controls */}
            <div className="flex justify-center gap-3">
                <button
                    onClick={openInNaverMap}
                    className="px-5 py-3 rounded-md bg-emerald-600 text-white hover:bg-emerald-700 transition-colors"
                >
                    네이버 지도에서 열기
                </button>
                <button
                    onClick={openInKakaoMap}
                    className="px-5 py-3 rounded-md bg-yellow-500 text-white hover:bg-yellow-600 transition-colors"
                >
                    카카오맵에서 열기
                </button>
            </div>
        </div>
    );
};

export default Location;
