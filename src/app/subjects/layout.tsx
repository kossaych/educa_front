
import type { Metadata } from 'next'
import { Inter } from 'next/font/google' 
import Subject from '@/components/Home components/subjects';

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'subjects',
  description: '',
  manifest: '/manifest.json',
  icons:{apple : '/icon.pnj',},
  themeColor : "#fff"
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      {children}<Subject/></>
  )
}



