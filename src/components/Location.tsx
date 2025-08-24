"use client";

const Location = () => {
    const coordinates = {
        x: 128.617083,
        y: 35.860009,
    };

    const handleOpenMap = () => {
        // Open in Google Maps (works on both mobile and desktop)
        const googleMapsUrl = `https://www.google.com/maps?q=${coordinates.y},${coordinates.x}`;
        window.open(googleMapsUrl, "_blank");
    };

    const handleOpenKakaoMap = () => {
        // Open in Kakao Map (primarily for Korean users)
        const kakaoMapUrl = `https://map.kakao.com/link/map/Exhibition Location,${coordinates.y},${coordinates.x}`;
        window.open(kakaoMapUrl, "_blank");
    };

    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-bold text-center text-gray-800 mb-8">
                Location
            </h2>

            {/* Map Placeholder */}
            <div className="relative w-full h-64 bg-gray-200 rounded-lg border-2 border-gray-300 flex items-center justify-center">
                <div className="text-center">
                    <div className="text-4xl mb-4">📍</div>
                    <p className="text-gray-600 mb-2">Exhibition Location</p>
                    <p className="text-sm text-gray-500">
                        Coordinates: {coordinates.y}, {coordinates.x}
                    </p>
                </div>
            </div>

            {/* Map Controls */}
            <div className="flex justify-center space-x-4">
                <button
                    onClick={handleOpenMap}
                    className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
                >
                    <span>🗺️</span>
                    <span>Open in Google Maps</span>
                </button>

                <button
                    onClick={handleOpenKakaoMap}
                    className="px-6 py-3 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-colors flex items-center space-x-2"
                >
                    <span>🗺️</span>
                    <span>Open in Kakao Map</span>
                </button>
            </div>

            {/* Location Details */}
            {/* <div className="text-center bg-gray-50 rounded-lg p-4">
        <h3 className="font-semibold text-gray-800 mb-2">Exhibition Venue</h3>
        <p className="text-gray-600 text-sm">
          Visit the location to experience the full photo exhibition
        </p>
      </div> */}
        </div>
    );
};

export default Location;
