import React from 'react'
import { Bokor } from 'next/font/google'
import Hero from '@/compo/Hero'
import DualScoreComparison from '@/compo/DualScoreComparison'
import RevenuePartnerFlow from '@/compo/RevenuePartnerFlow'
import DualScoreIPEcosystem from '@/compo/DualScoreIPEcosystem'
import DualScoreChase from '@/compo/DualScoreChase'
import Footer from '@/compo/Footer'
import Navbar from '@/compo/Navbar'


const bokor = Bokor({ subsets: ['latin'],weight:'400' })

const page = () => {
  return (
    <div className='bg-zinc-900 relative'>
             <div className="absolute inset-0 opacity-20 bg-[linear-gradient(to_right,#bc6c25_1px,transparent_1px),linear-gradient(to_bottom,#bc6c25_1px,transparent_1px)] bg-[size:40px_40px]" />
       
      <Navbar/>
      <Hero/>
     
      <DualScoreComparison/>
      <RevenuePartnerFlow/>
      <DualScoreIPEcosystem/>
      <Footer/>
    </div>
  )
}

export default page