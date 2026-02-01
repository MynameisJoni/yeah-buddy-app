export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-dark-light border-t border-gray-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="text-center mb-4">
          <div className="flex items-center justify-center space-x-2 mb-2">
            <h3 className="text-xl font-bold text-white">Yeah Buddy App</h3>
          </div>
          <p className="text-gray-light text-sm">
            Tu compañero para gestionar rutinas y ejercicios. Lightweight, Baby!
          </p>
        </div>

        <div className="flex justify-center gap-6 mb-4">
          <a href="https://www.youtube.com/watch?v=9t5G5XwDzmk" target="_blank" className="text-gray-light hover:text-primary text-sm transition">Motivación</a>
          <a href="https://www.youtube.com/shorts/L5GVwVyikuw" target="_blank" className="text-gray-light hover:text-primary text-sm transition">Comprométete</a>
          <a href="https://github.com/MynameisJoni/yeah-buddy-app" target="_blank" className="text-gray-light hover:text-primary text-sm transition">Documentación</a>
        </div>

        <div className="border-t border-gray-dark pt-4">
          <p className="text-gray text-xs text-center">
            © {currentYear} Yeah Buddy App. Proyecto - Diseño de Interfaces
          </p>
        </div>
      </div>
    </footer>
  );
}