import Image from "next/image"
import Link from "next/link"
import logo from "../../../public/logo.svg"
import group from "../../../public/group 1.svg"
import map from "../../../public/map.svg"
import vdetect from "../../../public/vdetect.svg"
import group2 from "../../../public/group2.svg"
import Footer from "../components/footer"
import minilog from "../../../public/minilogo.svg"
export default function ITSSPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-[#141c32] text-white py-4 px-6 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <Image src={minilog} alt="UrbanSphere Logo" width={50} height={50} className="w-12 h-12" />
          <span className="text-2xl font-bold">UrbanSphere</span>
        </div>
        <Link href="/" className="text-white hover:text-gray-200 flex items-center">
          ← Go Back
        </Link>
      </header>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-6 py-10">
        {/* Title and Description */}
        <h1 className="text-4xl font-bold text-center text-[#141c32] mb-6">Intelligent Traffic Signal System (ITSS)</h1>
        <p className="text-lg text-center max-w-4xl mx-auto mb-16">
          Our Intelligent Traffic Signal System (ITSS) uses AI to optimize traffic flow, reduce congestion, and enhance
          road safety in Oran through dynamic, data-driven traffic lights.
        </p>

        {/* Interactive Map Section */}
        <div className="grid md:grid-cols-2 gap-8 items-center mb-20">
          <div>
            <h2 className="text-3xl font-bold text-[#141c32] mb-4">Interactive Map</h2>
            <p className="text-lg mb-6">
              Explore all the traffic light intersections in Oran through an interactive map. Click on each intersection
              to view detailed information about the traffic signals and their operations in real time.
            </p>
            <Link href="/itss/visualisation" className="bg-[#3466af] text-white px-6 py-2 rounded font-medium uppercase">CLICK HERE</Link>
          </div>
          <div>
            <Image
              src={map}
              alt="Interactive Map of Oran Traffic System"
              width={500}
              height={400}
              className="w-full h-auto rounded-lg border border-gray-200"
            />
          </div>
        </div>

        {/* Simulation Section */}
        <div className="grid md:grid-cols-2 gap-8 items-center mb-20">
          <div>
            <h2 className="text-3xl font-bold text-[#141c32] mb-4">Simulation</h2>
            <p className="text-lg mb-6">
              Our simulation demonstrates the real-world impact of ITSS, showcasing how our system improves traffic
              efficiency and safety compared to traditional traffic management methods.
            </p>
            <Link href="/itss/simulation" className="bg-[#3466af] text-white px-6 py-2 rounded font-medium uppercase " >CLICK HERE</Link>
          </div>
          <div>
            <Image
              src={vdetect}
              alt="ITSS Simulation"
              width={500}
              height={400}
              className="w-full h-auto rounded-lg border border-gray-200"
            />
          </div>
        </div>

        {/* Other Aspects Section */}
        <h2 className="text-3xl font-bold text-center text-[#141c32] mb-10">Some other aspects</h2>

        <div className="grid md:grid-cols-2 gap-12 mb-16">
          {/* Smart Violation Monitoring */}
          <div>
            <Image
              src={group}
              alt="Smart Violation Monitoring"
              width={450}
              height={300}
              className="w-full h-auto rounded-lg border border-gray-200 mb-6"
            />
            <h3 className="text-2xl font-bold text-[#141c32] mb-3">Smart Violation Monitoring</h3>
            <p className="text-lg">
              Using AI and OCR, the system detects red-light violations as they happen—improving law enforcement
              efficiency and promoting safer driving behavior across the city.
            </p>
          </div>

          {/* Accident Detection */}
          <div>
            <Image
              src={group2}
              alt="Accident Detection & Instant Alerts"
              width={450}
              height={300}
              className="w-full h-auto rounded-lg border border-gray-200 mb-6"
            />
            <h3 className="text-2xl font-bold text-[#141c32] mb-3">Accident Detection & Instant Alerts</h3>
            <p className="text-lg">
              The system identifies accidents in real time using AI, immediately triggering visual warnings and
              notifying relevant authorities for a faster response and improved road safety.
            </p>
          </div>
        </div>
      </div>

      {/* Footer */}

        <Footer/>
    </main>
  )
}
