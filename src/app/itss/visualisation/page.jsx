
"use client";
import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import Footer from "../../components/footer"
import minilogo from "../../../../public/minilogo.svg";

const TrafficMap = dynamic(() => import("../../components/trafficmap"), {
  ssr: false, // Disable server-side rendering
});

export default function InteractiveMapPage() {
  const [trafficData, setTrafficData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch traffic data from API
  useEffect(() => {
    const fetchTrafficData = async () => {
      try {
        const response = await fetch("https://innoverce.onrender.com/itss/traffic", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
          },
          body: JSON.stringify({
            url: "",
            Tb: 20,
            k: 2,
            n_avr: 9
          })
        });

        if (!response.ok) {
          throw new Error(`API request failed: ${response.status}`);
        }

        const data = await response.json();
        if (data.status === "success") {
          setTrafficData(data);
        } else {
          throw new Error(data.error || "API returned unsuccessful status");
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTrafficData();
  }, []);

  return (
    <main className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-[#141c32] text-white py-4 px-6 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <Image src={minilogo} alt="UrbanSphere Logo" width={50} height={50} className="w-12 h-12" />
          <span className="text-2xl font-bold">UrbanSphere</span>
        </div>
        <Link href="/" className="text-white hover:text-gray-200 flex items-center">
          ← Go Back
        </Link>
      </header>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-6 py-10">
        {/* Interactive Map */}
        <h1 className="text-4xl font-bold text-center text-[#141c32] mb-10">Interactive Map</h1>

        <div className="mb-16 relative">
          <TrafficMap />
        </div>

        {/* Oran museum traffic light */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          {/* First camera */}
          <div>
            <h3 className="text-xl font-medium mb-3">First Camera</h3>
            <video
              src="/v1.mp4"
              controls
              autoPlay
              muted
              loop
              className="w-full h-72 object-cover rounded-lg border border-gray-200"
            />
          </div>

          {/* Second camera */}
          <div>
            <h3 className="text-xl font-medium mb-3">Second Camera</h3>
            <video
              src="/v2.mp4"
              controls
              autoPlay
              muted
              loop
              className="w-full h-72 object-cover rounded-lg border border-gray-200"
            />
          </div>

          {/* Third camera */}
          <div>
            <h3 className="text-xl font-medium mb-3">Third Camera</h3>
            <video
              src="/v3.mp4"
              controls
              autoPlay
              muted
              loop
              className="w-full h-72 object-cover rounded-lg border border-gray-200"
            />
          </div>

          {/* Fourth camera */}
          <div>
            <h3 className="text-xl font-medium mb-3">Fourth Camera</h3>
            <video
              src="/v4.mp4"
              controls
              autoPlay
              muted
              loop
              className="w-full h-72 object-cover rounded-lg border border-gray-200"
            />
          </div>
        </div>

        {/* Perfect Scenario */}
        <h2 className="text-3xl font-bold text-[#141c32] mb-8">Perfect Scenario</h2>

        {loading && <p className="text-center text-gray-500 mb-6">Loading traffic data...</p>}
        {error && <p className="text-center text-red-500 mb-6">Error: {error}</p>}

        {trafficData && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
              <div>
                {trafficData.image_url ? (
                  <Image
                    src={trafficData.image_url}
                    alt="Input traffic image"
                    width={500}
                    height={300}
                    className="w-full h-auto rounded-lg border border-gray-200 mb-3"
                    onError={(e) => (e.target.src = "/traffic.jpg")}
                  />
                ) : (
                  <div className="w-full h-[300px] bg-gray-200 rounded-lg flex items-center justify-center mb-3">
                    <p className="text-gray-600">Fallback Image (traffic.jpg)</p>
                  </div>
                )}
                <p className="text-sm text-gray-600">
                  {trafficData.image_url ? "Input Traffic Image" : "Fallback Traffic Image"}
                </p>
              </div>

              <div>
                <Image
                  src={trafficData.annotated_image}
                  alt="Annotated traffic image"
                  width={500}
                  height={300}
                  className="w-full h-auto rounded-lg border border-gray-200 mb-3"
                  onError={(e) => (e.target.src = "/annotated_traffic.jpg")}
                />
                <p className="text-sm text-gray-600">
                  Annotated Traffic Image (Vehicles: {trafficData.result.n_cars})
                </p>
              </div>
            </div>

            {/* Traffic Parameters */}
            <div className="mb-16">
              <h3 className="text-xl font-medium text-[#141c32] mb-4">Traffic Light Parameters</h3>
              <div className="bg-gray-100 p-6 rounded-lg">
                <dl className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Green Light Duration (Tg)</dt>
                    <dd className="text-lg text-[#141c32]">{trafficData.result.Tg} seconds</dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Base Time (Tb)</dt>
                    <dd className="text-lg text-[#141c32]">{trafficData.result.Tb} seconds</dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Scaling Factor (k)</dt>
                    <dd className="text-lg text-[#141c32]">{trafficData.result.k}</dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Average Vehicles (n_avr)</dt>
                    <dd className="text-lg text-[#141c32]">{trafficData.result.n_avr}</dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Detected Vehicles (n_cars)</dt>
                    <dd className="text-lg text-[#141c32]">{trafficData.result.n_cars}</dd>
                  </div>
                </dl>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Footer */}
      <Footer />
    </main>
  );
}
