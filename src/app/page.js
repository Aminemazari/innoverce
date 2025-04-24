import Image from "next/image"
import Link from "next/link"
import logo from "../../public/logo.svg"
import qrcode from "../../public/qrcode.svg"
import tram from "../../public/tram.svg"
import detection from  "../../public/detection.svg"
import Footer from "./components/footer"
export default function Home() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-[#141c32] text-white min-h-screen flex items-center px-4 md:px-8 lg:px-16">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-8 items-center py-16">
          <div>
            <div className="mb-8">
              <Image src={logo} alt="UrbanSphere Logo" width={300} height={100} className="w-80" />
            </div>
          </div>
          <div>
            <h1 className="text-5xl font-bold mb-6">Let&apos;s Make Oran a Smart City !</h1>
            <p className="mb-6 text-xl">
              In a rapidly evolving world, the city of Oran is embracing the future with cutting-edge technology to
              create a smarter, safer, and more efficient urban environment.{" "}
              <span className="italic">Urban Sphere</span> is at the heart of this transformation, committed to
              enhancing the quality of life for citizens and improving urban infrastructure through three innovative
              solutions.
            </p>
            <p className="text-xl">
              From optimizing traffic flow with intelligent systems, ensuring the long-term sustainability of our
              infrastructure with satellite technology, to providing real-time support for public transport users and
              drivers, Urban Sphere is dedicated to making Oran a shining example of smart city innovation. Join us in
              building a future where technology and community thrive together.
            </p>
          </div>
        </div>
      </section>

      {/* ITSS Section */}
      <section className="py-16 px-4 md:px-8 lg:px-16 bg-white min-h-screen flex items-center">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold mb-10 text-[#141c32]">Intelligent Traffic Signal System (ITSS)</h2>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <p className="mb-6 text-lg text-[#141c32]">
                The Intelligent Traffic Signal System (ITSS) brings smart, AI-powered control to Oran&apos;s
                intersections. It adapts traffic light timings in real time based on traffic flow, easing congestion and
                improving overall mobility in the city.
              </p>
              <p className="mb-8 text-lg text-[#141c32]">
                With features like emergency vehicle prioritization, violation detection, accident alerts, and dynamic
                signal control, ITSS enhances both safety and efficiency on the roads—making every journey faster,
                safer, and smarter.
              </p>
              <Link
                href="/itss"
                className="inline-block bg-[#3466af] text-white px-8 py-3 rounded font-medium uppercase text-lg"
              >
                GET DEMO HERE
              </Link>
            </div>
            <div>
              <Image
                src={detection}
                alt="Intelligent Traffic Signal System"
                width={600}
                height={400}
                className="rounded-lg w-full h-auto"
              />
            </div>
          </div>
        </div>
      </section>

      {/* SPMS Section */}
      <section className="py-16 px-4 md:px-8 lg:px-16 bg-[#f9f9f9] min-h-screen flex items-center">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold mb-10 text-[#141c32]">Smart Predictive Maintenance System (SPMS)</h2>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <p className="mb-6 text-lg text-[#141c32]">
                The Smart Predictive Maintenance System (SPMS) uses AI and sensors to continuously monitor the condition
                of critical infrastructure like roads and railways. By detecting early signs of wear or damage, the
                system can trigger timely maintenance, helping prevent breakdowns and disruptions before they happen.
              </p>
              <p className="mb-8 text-lg text-[#141c32]">
                SPMS also improves transparency and communication through automated alerts and public updates. When
                issues are detected, warning signs and online announcements are instantly deployed, keeping both
                operators and citizens informed and safe.
              </p>
              <Link
                href="/spms"
                className="inline-block bg-[#3466af] text-white px-8 py-3 rounded font-medium uppercase text-lg"
              >
                GET DEMO HERE
              </Link>
            </div>
            <div>
              <Image
                src={tram}
                alt="Smart Predictive Maintenance System"
                width={600}
                height={400}
                className="rounded-lg w-full h-auto"
              />
            </div>
          </div>
        </div>
      </section>

      {/* SMCS Section */}
      <section className="py-16 px-4 md:px-8 lg:px-16 bg-white min-h-screen flex items-center">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold mb-10 text-[#141c32]">Smart Mobility Companion System (SMCS) : NAVIUM</h2>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <p className="mb-6 text-lg text-[#141c32]">
                The Smart Mobility Companion System (SMCS) is a user-centered platform designed to enhance the daily
                commute for both public transport users and drivers in Oran. Accessible via a mobile app and web
                dashboard, it delivers real-time updates and seamless communication between passengers, operators, and
                city infrastructure.
              </p>
              <p className="mb-8 text-lg text-[#141c32]">
                SMCS provides live bus tracking, capacity updates, and instant alerts on delays or rerouting. For
                drivers, the system also detects and displays available parking spots nearby, reducing the time spent
                searching for parking. By connecting people, vehicles, and city systems, SMCS transforms urban travel
                into a smoother, faster, and more intelligent experience.
              </p>
            </div>
            <div className="flex flex-col items-center">
              <div className="bg-[#c8ff62] p-6 rounded-lg mb-6 flex items-center">
              <span className="text-5xl font-bold text-[#141c32] mr-6">Navium</span>
                <Image
                  src={qrcode}
                  alt="QR Code"
                  width={200}
                  height={200}
                  className="w-40 h-40"
                />
              </div>
              <p className="text-center font-medium text-[#141c32] text-xl">SCAN THE QR CODE TO GET THE APPLICATION</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer/>
    </main>
  )
}
