import './globals.css'

import { Cabin, Montserrat } from 'next/font/google'

import Navbar from "@/components/Navbar"
import { ApiProvider } from "./context/ApiContext"

const cabin = Cabin({
  subsets: ['latin'],
  variable: '--font-cabin',
})

const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--font-montserrat'
})

export const metadata = {
  title: 'MyTrip - Planeje suas viajens!',
  description: 'Desenvolvido por Arthur',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-br" className={`${cabin.variable} ${montserrat.variable} font-sans`}>
      <body>
        <ApiProvider>
          <Navbar />
          <main>
            {children}
          </main>
        </ApiProvider>
      </body>
    </html>
  )
}
