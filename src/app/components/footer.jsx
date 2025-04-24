import Image from "next/image"
import Link from "next/link"
import ecolelogo from "../../../public/ecolelogo.svg"
import innovercelogo from "../../../public/innovercelogo.svg"
import phoenixlogo from "../../../public/phoenix.svg"
export default function footer(){
  return(
    <footer className="bg-[#141c32] text-white py-12 px-4 md:px-8 lg:px-16">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center">
          <div className="mb-8 md:mb-0">
            <Image src="/logo.svg" alt="UrbanSphere Logo" width={200} height={60} className="w-56" />
            <p className="text-lg mt-3">Let's make Oran a smart city !</p>
          </div>
          <div className="flex gap-50 items-center">
            <Image
              src={innovercelogo}
              alt="Innovers Logo"
              width={120}
              height={60}
              className="h-16 w-auto"
            />
            <Image
              src={phoenixlogo}
                alt="Partner Logo"
              width={120}
              height={60}
              className="h-16 w-auto"
            />
            <Image
              src={ecolelogo}
              alt="ESG2E Logo"
              width={120}
              height={60}
              className="h-16 w-auto"
            />
          </div>
        </div>
      </footer>
  )
}