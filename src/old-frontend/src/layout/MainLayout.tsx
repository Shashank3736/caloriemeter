import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

type Props = {
    darkMode: 'light' | 'dark'
    toggleDarkMode: () => void
    children: React.ReactNode
}

export default function MainLayout({ children, darkMode, toggleDarkMode }: Props) {
    return (
        <>
        <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
        {children}
        <Footer />
        </>
    )
}