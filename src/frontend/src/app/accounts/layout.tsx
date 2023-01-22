/* eslint-disable @next/next/no-img-element */
import Image from "next/image"

export default function AccountsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
    <img src="/discord_bg.svg" alt="logo" className="absolute w-full h-full overflow-auto" />
    <div className="relative w-[100vw] h-[100vh] overflow-auto">
      {children}
    </div>
    </>
  )
}