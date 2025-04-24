"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Camera, Plus, Minus } from 'lucide-react'

export default function SimulationPage() {
  const [numCars, setNumCars] = useState(100)
  const [coefficientTime, setCoefficientTime] = useState(100)
  const [avgNumCars, setAvgNumCars] = useState(100)
  const [baseGreenTime, setBaseGreenTime] = useState(100)
  const [intersectionType, setIntersectionType] = useState("T")
  const [emergencyCase, setEmergencyCase] = useState(true)
  const [greenLightDuration, setGreenLightDuration] = useState(40)
  const [simulationRun, setSimulationRun] = useState(false)

  const handleRunSimulation = () => {
    // In a real app, this would calculate the green light duration based on inputs
    // For now, we'll just set it to 40 seconds as shown in the image
    setGreenLightDuration(40)
    setSimulationRun(true)
  }

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
        {/* Simulation Title */}
        <h1 className="text-4xl font-bold text-center text-[#141c32] mb-10">Simulation</h1>

        <p className="text-lg mb-8">
          See how ITSS transforms traffic management in real time by entering your inputs below :
        </p>

        <div className="grid md:grid-cols-2 gap-x-16 gap-y-8 mb-12">
          {/* Left Column - Input Form */}
          <div className="space-y-6">
            {/* Number of cars */}
            <div className="flex items-center justify-between">
              <label className="text-lg font-medium">Number of cars</label>
              <div className="flex items-center">
                <button
                  className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center"
                  onClick={() => setNumCars(Math.max(0, numCars - 1))}
                >
                  <Minus size={16} />
                </button>
                <input
                  type="text"
                  value={numCars}
                  onChange={(e) => setNumCars(Number(e.target.value))}
                  className="w-16 text-center mx-2 border border-gray-300 rounded py-1"
                />
                <button
                  className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center"
                  onClick={() => setNumCars(numCars + 1)}
                >
                  <Plus size={16} />
                </button>
              </div>
            </div>

            {/* Coefficient time */}
            <div className="flex items-center justify-between">
              <label className="text-lg font-medium">Coefficient time (seconds)</label>
              <div className="flex items-center">
                <button
                  className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center"
                  onClick={() => setCoefficientTime(Math.max(0, coefficientTime - 1))}
                >
                  <Minus size={16} />
                </button>
                <input
                  type="text"
                  value={coefficientTime}
                  onChange={(e) => setCoefficientTime(Number(e.target.value))}
                  className="w-16 text-center mx-2 border border-gray-300 rounded py-1"
                />
                <button
                  className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center"
                  onClick={() => setCoefficientTime(coefficientTime + 1)}
                >
                  <Plus size={16} />
                </button>
              </div>
            </div>

            {/* Average number of cars */}
            <div className="flex items-center justify-between">
              <label className="text-lg font-medium">Average number of cars</label>
              <div className="flex items-center">
                <button
                  className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center"
                  onClick={() => setAvgNumCars(Math.max(0, avgNumCars - 1))}
                >
                  <Minus size={16} />
                </button>
                <input
                  type="text"
                  value={avgNumCars}
                  onChange={(e) => setAvgNumCars(Number(e.target.value))}
                  className="w-16 text-center mx-2 border border-gray-300 rounded py-1"
                />
                <button
                  className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center"
                  onClick={() => setAvgNumCars(avgNumCars + 1)}
                >
                  <Plus size={16} />
                </button>
              </div>
            </div>

            {/* Base time for green light */}
            <div className="flex items-center justify-between">
              <label className="text-lg font-medium">Base time for the green light (seconds)</label>
              <div className="flex items-center">
                <button
                  className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center"
                  onClick={() => setBaseGreenTime(Math.max(0, baseGreenTime - 1))}
                >
                  <Minus size={16} />
                </button>
                <input
                  type="text"
                  value={baseGreenTime}
                  onChange={(e) => setBaseGreenTime(Number(e.target.value))}
                  className="w-16 text-center mx-2 border border-gray-300 rounded py-1"
                />
                <button
                  className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center"
                  onClick={() => setBaseGreenTime(baseGreenTime + 1)}
                >
                  <Plus size={16} />
                </button>
              </div>
            </div>

            {/* Intersection Type */}
            <div className="flex items-center justify-between">
              <label className="text-lg font-medium">Intersection Type</label>
              <div className="flex items-center space-x-4">
                <label className="flex items-center">
                  <input
                    type="radio"
                    checked={intersectionType === "T"}
                    onChange={() => setIntersectionType("T")}
                    className="mr-2"
                  />
                  T type
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    checked={intersectionType === "X"}
                    onChange={() => setIntersectionType("X")}
                    className="mr-2"
                  />
                  X type
                </label>
              </div>
            </div>

            {/* Emergency case */}
            <div className="flex items-center justify-between">
              <label className="text-lg font-medium">Emergency case</label>
              <div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={emergencyCase}
                    onChange={() => setEmergencyCase(!emergencyCase)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#3466af]"></div>
                </label>
              </div>
            </div>
          </div>

          {/* Right Column - Results */}
          <div className="flex flex-col items-center justify-center">
            <p className="text-lg mb-2">The green light duration will be</p>
            <p className="text-5xl font-bold mb-4">{greenLightDuration} Seconds</p>
          </div>
        </div>

        {/* Explanation */}
        <div className="mb-8">
          <p className="text-lg mb-4">You&apos;ll see two scenarios play out side by side:</p>
          <ul className="list-disc pl-6 space-y-2 mb-4">
            <li className="text-lg">Traditional System – traffic flow with regular signal timing.</li>
            <li className="text-lg">ITSS in Action – smart, adaptive traffic control powered by AI.</li>
          </ul>
          <p className="text-lg">
            Compare the results and discover how much smoother, faster, and safer Oran&apos;s roads can be with ITSS.
          </p>
        </div>

        {/* Run Simulation Button */}
        <div className="flex justify-center mb-12">
          <button
            onClick={handleRunSimulation}
            className="bg-[#3466af] text-white px-6 py-3 rounded font-medium uppercase text-lg"
          >
            RUN THE SIMULATION
          </button>
        </div>

        {/* Simulation Visualization */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {/* Traditional System */}
          <div className="flex flex-col items-center">
            <div className="w-full aspect-square bg-gray-100 mb-4 relative overflow-hidden">
              <Image
                src="/intersection-traditional.svg"
                alt="Traditional traffic system"
                width={400}
                height={400}
                className="w-full h-auto"
              />
            </div>
            <p className="text-lg font-medium">traditional system</p>
          </div>

          {/* ITSS in Action */}
          <div className="flex flex-col items-center">
            <div className="w-full aspect-square bg-gray-100 mb-4 relative overflow-hidden">
              <Image
                src="/intersection-itss.svg"
                alt="ITSS in action"
                width={400}
                height={400}
                className="w-full h-auto"
              />
            </div>
            <p className="text-lg font-medium">ITSS in action</p>
          </div>
        </div>

        {/* Results Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-[#141c32] mb-6">You see that ?</h2>
          <p className="text-lg mb-4">
            Wow! Look at the difference—traffic is flowing smoother, emergency vehicles aren&apos;t stuck, and delays have
            dropped dramatically.
          </p>
          <p className="text-lg mb-4">
            With ITSS, you&apos;ve just experienced how smart signals can truly transform city traffic.
          </p>
          <p className="text-lg">Imagine this running across all of Oran. Let&apos;s make it real.</p>
        </div>

        {/* Critical Response Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-[#141c32] mb-6">Critical Response Automation</h2>
          <p className="text-lg mb-6">
            In exceptional cases, ITSS activates advanced detection and alert mechanisms to handle incidents swiftly and
            effectively.
          </p>

          <ul className="space-y-6">
            <li className="flex">
              <div className="mr-4">
                <span className="font-bold text-lg">• Red Light Violations:</span>
              </div>
              <div>
                <p className="text-lg">
                  The system uses computer vision (CNN) to capture images of violating vehicles and extracts license
                  plate numbers via OCR. All data is securely sent to the police department for action.
                </p>
              </div>
            </li>
            <li className="flex">
              <div className="mr-4">
                <span className="font-bold text-lg">• Accidents:</span>
              </div>
              <div>
                <p className="text-lg">
                  ITSS detects collisions instantly, captures images of the scene, and notifies the appropriate emergency
                  and maintenance teams. The affected road is automatically marked with red warning lights to ensure
                  safety until the issue is resolved.
                </p>
              </div>
            </li>
          </ul>

          <p className="text-lg mt-6">
            Smart technology means faster response, better enforcement, and safer streets for everyone.
          </p>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-[#141c32] text-white py-8 px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0 flex flex-col items-center md:items-start">
            <div className="flex items-center gap-3 mb-2">
              <Image src="/urbansphere-icon.svg" alt="UrbanSphere Logo" width={40} height={40} className="w-10 h-10" />
              <span className="text-2xl font-bold">UrbanSphere</span>
            </div>
            <p className="text-sm">Let's make Oran a smart city !</p>
          </div>
          <div className="flex gap-8 items-center">
            <Image
              src="/placeholder.svg?height=60&width=120"
              alt="Innovers Logo"
              width={120}
              height={60}
              className="h-12 w-auto"
            />
            <Image
              src="/placeholder.svg?height=60&width=120"
              alt="Partner Logo"
              width={120}
              height={60}
              className="h-12 w-auto"
            />
            <Image
              src="/placeholder.svg?height=60&width=120"
              alt="ESG2E Logo"
              width={120}
              height={60}
              className="h-12 w-auto"
            />
          </div>
        </div>
      </footer>
    </main>
  )
}
  