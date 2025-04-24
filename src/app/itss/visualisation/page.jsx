"use client";
import Image from "next/image"
import Link from "next/link"
import Footer from "@/app/components/footer"
import noted from "../../../../public/noed.png"
import notnoted from "../../../../public/notnoted.png"
import TrafficMap from "@/app/components/trafficmap"
import minilogo from "../../../../public/minilogo.svg"
import locationimage from "../../../../public/minilogo.svg"
export default function InteractiveMapPage() {
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

          {/* Map Markers */}
          

         
        

          {/* Tooltip */}
     
        </div>

        {/* Oran museum traffic light */}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          {/* First camera */}
          <div>
            <h3 className="text-xl font-medium mb-3">First camera</h3>
            <div className="bg-gray-200 rounded-lg h-48 flex items-center justify-center">
              <div className="text-[#3466af]">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="48"
                  height="48"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z" />
                  <circle cx="12" cy="13" r="3" />
                </svg>
              </div>
            </div>
          </div>

          {/* Second camera */}
          <div>
            <h3 className="text-xl font-medium mb-3">Second camera</h3>
            <div className="bg-gray-200 rounded-lg h-48 flex items-center justify-center">
              <div className="text-[#3466af]">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="48"
                  height="48"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z" />
                  <circle cx="12" cy="13" r="3" />
                </svg>
              </div>
            </div>
          </div>

          {/* Third camera */}
          <div>
            <h3 className="text-xl font-medium mb-3">Third camera</h3>
            <div className="bg-gray-200 rounded-lg h-48 flex items-center justify-center">
              <div className="text-[#3466af]">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="48"
                  height="48"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z" />
                  <circle cx="12" cy="13" r="3" />
                </svg>
              </div>
            </div>
          </div>

          {/* Fourth camera */}
          <div>
            <h3 className="text-xl font-medium mb-3">Fourth camera</h3>
            <div className="bg-gray-200 rounded-lg h-48 flex items-center justify-center">
              <div className="text-[#3466af]">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="48"
                  height="48"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z" />
                  <circle cx="12" cy="13" r="3" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Perfect Scenario */}
        <h2 className="text-3xl font-bold text-[#141c32] mb-8">Perfect Scénario</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          <div>
            <Image
              src={notnoted}
              alt="Normal traffic image"
              width={500}
              height={300}
              className="w-full h-auto rounded-lg border border-gray-200 mb-3"
            />
          
          </div>

          <div>
            <Image
              src={noted}
              alt="Annotated traffic image"
              width={500}
              height={300}
              className="w-full h-auto rounded-lg border border-gray-200 mb-3"
            />
          
          </div>
        </div>

        <div className="mb-16">
        </div>
      </div>

      {/* Footer */}
    <Footer></Footer>
    </main>
  )
}
