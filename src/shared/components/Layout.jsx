import Footer from "./Footer";
import Navbar from "./NavBar";

// Componente que envuelve la aplicación con el NavBar y un contenedor principal
export default function Layout({children}){
    return(
        <div className="min-h-screen bg-dark flex flex-col">
            <Navbar />
            <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full flex items-center">
                <div className="w-full">
                    {children}
                </div>
            </main>
            <Footer />
        </div>
    );
}