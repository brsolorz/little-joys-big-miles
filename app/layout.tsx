import type { Metadata } from "next";
import "./globals.css";
export const metadata:Metadata={title:"Little Joys, Big Miles | Bri runs London",description:"Little joys for a big cause. Support Bri’s London Marathon fundraiser for USA for UNHCR with runner goodies, local meetups, and more.",icons:{icon:"/favicon.svg"}};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="en"><body>{children}</body></html>}
