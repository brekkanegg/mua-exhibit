"use client";

import Script from "next/script";
import { useEffect, useRef, useState } from "react";

type NaverMapsNamespace = {
    LatLng: new (lat: number, lng: number) => unknown;
    Map: new (
        element: HTMLElement,
        options: Record<string, unknown>,
    ) => unknown;
    Marker: new (options: Record<string, unknown>) => unknown;
};

declare global {
    interface Window {
        naver?: {
            maps?: NaverMapsNamespace;
        };
    }
}

const NAVER_CLIENT_ID = process.env.NEXT_PUBLIC_NAVER_MAPS_CLIENT_ID;

const Location = () => {
    // Yangjae Citizen's Forest Outdoor Wedding Venue
    const placeName = "양재시민의숲 야외예식장";
    const latitude = 37.4703;
    const longitude = 127.0389;
    const naverPlaceId = "31875178";

    const mapRef = useRef<HTMLDivElement | null>(null);
    const [scriptReady, setScriptReady] = useState(false);

    useEffect(() => {
        if (!scriptReady) return;
        if (!mapRef.current) return;
        const maps = window.naver?.maps;
        if (!maps) return;

        const center = new maps.LatLng(latitude, longitude) as unknown as {
            y: number;
            x: number;
        };
        const map = new maps.Map(mapRef.current, {
            center,
            zoom: 16,
            zoomControl: true,
            mapDataControl: false,
            scaleControl: false,
        });

        // marker
        new maps.Marker({
            position: center,
            map,
            title: placeName,
        });
    }, [scriptReady]);

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
        <div className="space-y-6">
            <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">
                Location
            </h2>

            {/* Naver Map */}
            <div className="relative w-full h-80 md:h-[420px] rounded-lg overflow-hidden border border-gray-200">
                {NAVER_CLIENT_ID ? (
                    <>
                        <Script
                            src={`https://oapi.map.naver.com/openapi/v3/maps.js?ncpClientId=${NAVER_CLIENT_ID}`}
                            strategy="afterInteractive"
                            onReady={() => setScriptReady(true)}
                        />
                        <div ref={mapRef} className="absolute inset-0" />
                    </>
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
