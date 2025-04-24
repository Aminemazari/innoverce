import Image from "next/image"
import Link from "next/link"
import Footer from "../components/footer"
import Map from "../components/tramMap"
export default function SPMSPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-[#141c32] text-white py-4 px-6 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <Image src="/urbansphere-icon.svg" alt="UrbanSphere Logo" width={50} height={50} className="w-12 h-12" />
          <span className="text-2xl font-bold">UrbanSphere</span>
        </div>
        <Link href="/" className="text-white hover:text-gray-200 flex items-center">
          ← Go Back
        </Link>
      </header>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-6 py-10">
        {/* Title and Description */}
        <h1 className="text-4xl font-bold text-center text-[#141c32] mb-6">
          Smart Predictive Maintenance System (SPMS)
        </h1>

        <p className="text-lg text-center max-w-4xl mx-auto mb-10">
          SPMS is a proactive, AI-powered system designed to monitor the health of transport infrastructure across Oran.
          By combining real-time data from sensors and GPS, it detects early signs of wear or failure—triggering timely
          maintenance, minimizing disruptions, and keeping the city moving smoothly.
        </p>

        {/* Map */}
        <div className="mb-10">
          <div className="relative w-full h-[500px] border border-gray-300 rounded-lg overflow-hidden">
          <Map/>

            {/* Map Markers */}
            <div className="absolute top-1/4 left-1/4 w-6 h-6 rounded-full bg-red-600 border-2 border-white"></div>
            <div className="absolute top-1/3 left-1/3 w-6 h-6 rounded-full bg-yellow-500 border-2 border-white"></div>
            <div className="absolute top-1/2 left-1/2 w-6 h-6 rounded-full bg-green-600 border-2 border-white"></div>
            <div className="absolute top-2/3 left-1/4 w-6 h-6 rounded-full bg-gray-500 border-2 border-white"></div>

            {/* Tooltip */}
            <div className="absolute top-1/3 left-1/4 bg-white p-2 rounded-md shadow-md border border-gray-200">
              <p className="text-sm font-medium">Moulay Abdelkader</p>
            </div>
          </div>
        </div>

        {/* Station Details */}
        <div className="mb-10">
          <h2 className="text-3xl font-bold text-[#141c32] mb-6">Moulay Abdelkader station</h2>

          <ul className="list-disc pl-6 space-y-3 mb-8">
            <li className="text-lg">
              <span className="font-medium">Status : </span>
              <span className="text-red-600 font-medium">very bad</span>
            </li>
            <li className="text-lg">
              <span className="font-medium">Need of maintenance : </span>
              <span>as soon as possible</span>
            </li>
            <li className="text-lg">
              <span className="font-medium">Possible problems : </span>
              <span>Poor lighting in the station, Malfunctioning ticket machines</span>
            </li>
          </ul>
        </div>

        {/* Use Guide */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-[#141c32] mb-6">Use guide :</h2>

          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-red-600 flex-shrink-0"></div>
              <p className="text-lg">The path / station needs a maintenance in less than 1 year (2025)</p>
            </div>

            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-yellow-500 flex-shrink-0"></div>
              <p className="text-lg">The path / station needs a maintenance in less than 3 year (2027)</p>
            </div>

            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-green-600 flex-shrink-0"></div>
              <p className="text-lg">The path / station needs a maintenance in less than 5 year (2030)</p>
            </div>

            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-gray-500 flex-shrink-0"></div>
              <p className="text-lg">The path / station is out of service</p>
            </div>
          </div>
        </div>
      </div>

      <Footer/>
    </main>
  )
}
