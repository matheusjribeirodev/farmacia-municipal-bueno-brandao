import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import Header from '../components/Header';
import Footer from '../components/Footer';
import WhatsAppFloat from '../components/WhatsAppFloat';

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <Header />
      <div className="flex-1 flex items-center justify-center px-4 py-16">
        <div className="text-center">
          <h1 className="text-6xl font-bold text-slate-800 mb-4">404</h1>
          <p className="text-xl text-slate-600 mb-8">Página não encontrada</p>
          <Link 
            to="/" 
            className="inline-block px-6 py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
          >
            Voltar ao Início
          </Link>
        </div>
      </div>
      <Footer />
      <WhatsAppFloat />
    </div>
  );
};

export default NotFound;
