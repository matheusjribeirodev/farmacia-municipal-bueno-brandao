
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import SearchBox from '../components/SearchBox';
import MedicationCard from '../components/MedicationCard';
import WhatsAppFloat from '../components/WhatsAppFloat';
import { medications, lastUpdated } from '../data/medications';

const Home = () => {
  const [searchResults, setSearchResults] = useState<typeof medications>([]);

  const handleSearch = (query: string) => {
    if (query.trim() === '') {
      setSearchResults([]);
    } else {
      const filtered = medications.filter(med =>
        med.name.toLowerCase().includes(query.toLowerCase()) ||
        med.category.toLowerCase().includes(query.toLowerCase())
      );
      setSearchResults(filtered);
    }
  };

  const availableCount = medications.filter(med => med.status === 'Disponível').length;
  const recentCount = medications.filter(med => med.status === 'Recém-chegado').length;
  const totalCount = medications.length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <Header />
      
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-800 mb-6">
            Medicamentos Disponíveis
            <br />
            <span className="text-emerald-600">Farmácia Municipal de Bueno Brandão</span>
          </h1>
          <p className="text-xl text-slate-600 mb-4 max-w-2xl mx-auto">
            Consulte aqui os medicamentos disponíveis em nossa farmácia.
            Informações atualizadas a cada 15 dias.
          </p>
          <p className="text-sm text-slate-500 mb-8">
            Última atualização: {lastUpdated}
          </p>
          
          {/* Search Box */}
          <SearchBox onSearch={handleSearch} />
        </div>

        {/* Quick Actions */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
          <Link
            to="/medicamentos"
            className="px-4 sm:px-8 py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors font-medium flex items-center justify-center space-x-2 text-sm sm:text-base"
          >
            <Search size={18} className="sm:w-5 sm:h-5 flex-shrink-0" />
            <span className="whitespace-nowrap overflow-hidden text-ellipsis">
              <span className="hidden sm:inline">Ver Lista Completa de Medicamentos Disponíveis</span>
              <span className="sm:hidden">Lista Completa</span>
            </span>
          </Link>
        </div>

        {/* Search Results */}
        {searchResults.length > 0 && (
          <div>
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-slate-800 mb-4">
                Resultados da Busca
              </h2>
              <p className="text-slate-600">
                {searchResults.length} medicamento(s) encontrado(s)
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {searchResults.slice(0, 9).map((medication) => (
                <MedicationCard key={medication.id} medication={medication} />
              ))}
            </div>

            {searchResults.length > 9 && (
              <div className="text-center">
                <Link
                  to="/medicamentos"
                  className="inline-flex items-center space-x-2 text-emerald-600 hover:text-emerald-700 font-medium"
                >
                  <span>Ver todos os resultados</span>
                  <Search size={16} />
                </Link>
              </div>
            )}
          </div>
        )}

        {searchResults.length === 0 && (
          <div className="text-center py-12">
            <div className="bg-white rounded-xl p-8 shadow-sm border border-slate-200 max-w-2xl mx-auto">
              <h2 className="text-2xl font-bold text-slate-800 mb-4">
                Como usar este sistema
              </h2>
              <div className="text-slate-600 space-y-3">
                <p>• Use o campo de busca acima para procurar medicamentos específicos</p>
                <p>• Clique em "Ver Lista Completa" para navegar por todos os medicamentos</p>
                <p>• As informações são atualizadas a cada 15 dias</p>
                <p>• Em caso de dúvidas, entre em contato conosco pelo telefone (35) 99814-1693</p>
              </div>
              
              <div className="mt-6 grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-emerald-600">{availableCount}</div>
                  <div className="text-sm text-slate-600">Disponíveis</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-green-600">{recentCount}</div>
                  <div className="text-sm text-slate-600">Recém-chegados</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-blue-600">{totalCount}</div>
                  <div className="text-sm text-slate-600">Total no Catálogo</div>
                </div>
              </div>
            </div>
          </div>
        )}
      </section>

      <Footer />
      <WhatsAppFloat />
    </div>
  );
};

export default Home;
