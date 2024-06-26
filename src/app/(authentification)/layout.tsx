'use client'
import './globals.css'
import { useEffect, useState } from "react";

//import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Footer from "@/components/Home components/footer";
import HeaderLogedIn from '@/components/Home components/header_loged_in';
import HeaderLogedOut from '@/components/Home components/header_loget_out'
 
const inter = Inter({ subsets: ['latin'] })

/* export const metadata: Metadata = {
  title: 'Educa',
  description: 'Generated by create next app',
  manifest: '/manifest.json',
  icons:{apple : '/icon.pnj',},
  themeColor : "#fff"
} */

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) { 

  //if (typeof window !==  "undefined") { 
      return (
     
            <div className="bg-white-100 ">
                <br></br><br></br><br></br> 
                {children}
            </div>
       
      )
}//}





