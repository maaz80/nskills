import { useEffect, useState } from "react"
import HeroSection from "../../components/home/HeroSection"
import JourneyToEarnings from "../../components/home/JourneyToEarnings"
import Navbar from "../../components/home/Navbar"
import Programs from "../../components/home/Programs"
import StreamCard from "../../components/home/StreamCard"
import Footer from "../../components/home/Footer"

const Home = () => {

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }, [])
  return (
    <div className="bg-primary">
      <Navbar />
      {/* <JourneyToEarnings/> */}
      <HeroSection />
      <div id="programs" className="px-4 lg:px-12 py-4">
        <h1 className="page-heading pb-8">OUR EXCLUSIVE PROGRAMS WITH 100% PLACEMENT ASSURENCE*</h1>
        <Programs />
      </div>
      <div className="px-4 lg:px-12 py-4 mb-10">
        <h1 className="page-heading pb-8">STREAMS FOR YOU FOR NEW ERA OF AI</h1>
        <div className="flex items-center justify-between gap-3  overflow-x-auto flex-wrap">
          <StreamCard />
          <StreamCard />
          <StreamCard />
          <StreamCard />
        </div>
      </div>
      <Footer/>
    </div>
  )
}

export default Home