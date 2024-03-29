import Head from "next/head"

/* eslint-disable @next/next/no-img-element */
export default function AccountsLayout({
    children,
  }: {
    children: React.ReactNode
  }) {
    return (
      <>
      <Head>
        <title>Accounts</title>
        <meta name="description" content="Track your calorie, track your progress." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/icon.ico" />
      </Head>
      <img src="/discord_bg.svg" alt="logo" className="absolute w-full h-full overflow-auto" />
      <div className="relative w-[100vw] h-[100vh] overflow-auto">
        {children}
      </div>
      </>
    )
  }