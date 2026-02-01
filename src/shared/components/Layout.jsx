import Navbar from "./NavBar";

// Componente que envuelve la aplicación con el NavBar y un contenedor principal
export default function Layout({children}){
    return(
        <div className="min-h-screen bg-dark">
            <Navbar />
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {children}
            </main>
        </div>
    );
}