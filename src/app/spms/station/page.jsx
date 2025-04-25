import Image from "next/image"
import Link from "next/link"

const getStationData = () => {
   
   console.log(data)
  if (id === "moulay-abdelkader") {
    return {
      id: "moulay-abdelkader",
      name: "Moulay Abdelkader",
      status: "very-bad",
      maintenanceNeeded: "as soon as possible",
      lastInspection: "2024-03-15",
      nextScheduledMaintenance: "2024-06-10",
      problems: [
        "Poor lighting in the station",
        "Malfunctioning ticket machines",
        "Damaged platform edges",
        "Leaking roof in waiting area",
      ],
      sensorData: {
        temperature: "24°C",
        humidity: "65%",
        vibration: "High",
        noise: "72dB",
      },
      maintenanceHistory: [
        { date: "2023-11-10", work: "Minor repairs to ticket machines", technician: "Ahmed B." },
        { date: "2023-08-22", work: "Lighting system inspection", technician: "Karim M." },
        { date: "2023-05-05", work: "Platform safety assessment", technician: "Leila Z." },
      ],
    }
  }

  // Default data for other stations
  return {
    id: id,
    name: "Station " + id,
    status: "unknown",
    maintenanceNeeded: "to be determined",
    lastInspection: "N/A",
    nextScheduledMaintenance: "N/A",
    problems: ["Data not available"],
    sensorData: {
      temperature: "N/A",
      humidity: "N/A",
      vibration: "N/A",
      noise: "N/A",
    },
    maintenanceHistory: [],
  }
}

export default function StationDetailPage({ params }) {
  const { id } = params;
    const station = getStationData(params.id)

  return (
    <main className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-[#141c32] text-white py-4 px-6 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <Image src="/urbansphere-icon.svg" alt="UrbanSphere Logo" width={50} height={50} className="w-12 h-12" />
          <span className="text-2xl font-bold">UrbanSphere</span>
        </div>
        <Link href="/spms" className="text-white hover:text-gray-200 flex items-center">
          ← Go Back
        </Link>
      </header>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-6 py-10">
        <h1 className="text-4xl font-bold text-[#141c32] mb-2">{station.name} station</h1>
        <p className="text-lg text-gray-500 mb-8">Detailed maintenance report</p>

        {/* Station Overview */}
        <div className="grid md:grid-cols-2 gap-8 mb-10">
          <div>
            <div className="bg-gray-100 rounded-lg p-6 h-full">
              <h2 className="text-2xl font-bold text-[#141c32] mb-4">Station Status</h2>

              <div className="space-y-4">
                <div>
                  <p className="font-medium text-gray-600">Current Status:</p>
                  <p className="text-xl font-bold text-red-600">{station.status}</p>
                </div>

                <div>
                  <p className="font-medium text-gray-600">Maintenance Required:</p>
                  <p className="text-xl font-bold">{station.maintenanceNeeded}</p>
                </div>

                <div>
                  <p className="font-medium text-gray-600">Last Inspection:</p>
                  <p>{station.lastInspection}</p>
                </div>

                <div>
                  <p className="font-medium text-gray-600">Next Scheduled Maintenance:</p>
                  <p>{station.nextScheduledMaintenance}</p>
                </div>
              </div>
            </div>
          </div>

          <div>
            <div className="bg-gray-100 rounded-lg overflow-hidden h-full">
              <Image
                src="/placeholder.svg?height=300&width=500"
                alt={`${station.name} station`}
                width={500}
                height={300}
                className="w-full h-64 object-cover"
              />
              <div className="p-6">
                <h2 className="text-2xl font-bold text-[#141c32] mb-4">Identified Issues</h2>
                <ul className="list-disc pl-5 space-y-2">
                  {station.problems.map((problem, index) => (
                    <li key={index}>{problem}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Sensor Data */}
        <div className="mb-10">
          <h2 className="text-2xl font-bold text-[#141c32] mb-6">Real-time Sensor Data</h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-white border border-gray-200 rounded-lg p-4 text-center">
              <p className="text-gray-600 mb-1">Temperature</p>
              <p className="text-2xl font-bold">{station.sensorData.temperature}</p>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg p-4 text-center">
              <p className="text-gray-600 mb-1">Humidity</p>
              <p className="text-2xl font-bold">{station.sensorData.humidity}</p>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg p-4 text-center">
              <p className="text-gray-600 mb-1">Vibration</p>
              <p className="text-2xl font-bold">{station.sensorData.vibration}</p>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg p-4 text-center">
              <p className="text-gray-600 mb-1">Noise Level</p>
              <p className="text-2xl font-bold">{station.sensorData.noise}</p>
            </div>
          </div>
        </div>

        {/* Maintenance History */}
        <div className="mb-10">
          <h2 className="text-2xl font-bold text-[#141c32] mb-6">Maintenance History</h2>

          {station.maintenanceHistory.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white border border-gray-200">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="py-3 px-4 text-left border-b">Date</th>
                    <th className="py-3 px-4 text-left border-b">Work Performed</th>
                    <th className="py-3 px-4 text-left border-b">Technician</th>
                  </tr>
                </thead>
                <tbody>
                  {station.maintenanceHistory.map((record, index) => (
                    <tr key={index} className={index % 2 === 0 ? "bg-gray-50" : ""}>
                      <td className="py-3 px-4 border-b">{record.date}</td>
                      <td className="py-3 px-4 border-b">{record.work}</td>
                      <td className="py-3 px-4 border-b">{record.technician}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p>No maintenance history available.</p>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-4 justify-center">
          <button className="bg-[#3466af] text-white px-6 py-3 rounded font-medium">Schedule Urgent Maintenance</button>
          <button className="bg-white border border-[#3466af] text-[#3466af] px-6 py-3 rounded font-medium">
            Download Full Report
          </button>
          <button className="bg-white border border-[#3466af] text-[#3466af] px-6 py-3 rounded font-medium">
            View Historical Data
          </button>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-[#141c32] text-white py-8 px-6 mt-16">
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
