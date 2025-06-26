
import Header from '../components/Header';
import Footer from '../components/Footer';
import WhatsAppFloat from '../components/WhatsAppFloat';
import { Clock, MapPin, Phone, CheckCircle } from 'lucide-react';

const About = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">
            Sobre a Farmácia Municipal
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Conheça mais sobre nossos serviços e compromisso com a saúde pública
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          {/* Sobre */}
          <div className="bg-white rounded-lg border border-slate-200 p-8">
            <h2 className="text-2xl font-bold text-slate-800 mb-6">Nossa Missão</h2>
            <p className="text-slate-600 mb-4">
              A Farmácia Municipal tem como missão garantir o acesso gratuito e universal 
              aos medicamentos essenciais para toda a população, contribuindo para a 
              melhoria da qualidade de vida e saúde de nossos cidadãos.
            </p>
            <p className="text-slate-600 mb-6">
              Trabalhamos com transparência e eficiência, mantendo nosso estoque 
              atualizado e disponibilizando informações atualizadas a cada 15 dias sobre a 
              disponibilidade dos medicamentos.
            </p>

            <h3 className="text-lg font-semibold text-slate-800 mb-4">Nossos Valores</h3>
            <ul className="space-y-2">
              {[
                'Transparência nas informações',
                'Acesso universal aos medicamentos',
                'Qualidade no atendimento',
                'Responsabilidade social',
                'Eficiência na gestão'
              ].map((value, index) => (
                <li key={index} className="flex items-center space-x-2">
                  <CheckCircle className="h-5 w-5 text-emerald-600" />
                  <span className="text-slate-600">{value}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Informações */}
          <div className="space-y-6">
            <div className="bg-white rounded-lg border border-slate-200 p-6">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center">
                  <Clock className="h-5 w-5 text-emerald-600" />
                </div>
                <h3 className="text-lg font-semibold text-slate-800">Horário de Funcionamento</h3>
              </div>
              <div className="space-y-2 text-slate-600">
                <p><strong>Segunda a Sexta:</strong> 8h às 12h e 13h às 17h</p>
                <p className="text-sm text-slate-500 mt-2">
                  (fechado para almoço das 12h às 13h)
                </p>
                <p className="text-sm text-slate-500 mt-4">
                  * Fechado nos feriados municipais e nacionais
                </p>
              </div>
            </div>

            <div className="bg-white rounded-lg border border-slate-200 p-6">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <MapPin className="h-5 w-5 text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold text-slate-800">Localização</h3>
              </div>
              <div className="text-slate-600">
                <p>Rua Coronel Ramalho, 330</p>
                <p>Centro - Bueno Brandão - MG</p>
                <p>CEP: 37578-000</p>
              </div>
            </div>

            <div className="bg-white rounded-lg border border-slate-200 p-6">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center">
                  <Phone className="h-5 w-5 text-amber-600" />
                </div>
                <h3 className="text-lg font-semibold text-slate-800">Contato</h3>
              </div>
              <div className="text-slate-600">
                <p><strong>Telefone/WhatsApp:</strong> (35) 99814-1693</p>
              </div>
            </div>
          </div>
        </div>

        {/* Serviços */}
        <div className="bg-white rounded-lg border border-slate-200 p-8">
          <h2 className="text-2xl font-bold text-slate-800 mb-6 text-center">
            Nossos Serviços
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl text-emerald-600">💊</span>
              </div>
              <h3 className="font-semibold text-slate-800 mb-2">Medicamentos Gratuitos</h3>
              <p className="text-slate-600 text-sm">
                Distribuição gratuita de medicamentos essenciais conforme lista municipal
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl text-blue-600">📋</span>
              </div>
              <h3 className="font-semibold text-slate-800 mb-2">Consulta Online</h3>
              <p className="text-slate-600 text-sm">
                Verificação da disponibilidade de medicamentos atualizada a cada 15 dias
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl text-amber-600">📞</span>
              </div>
              <h3 className="font-semibold text-slate-800 mb-2">Atendimento</h3>
              <p className="text-slate-600 text-sm">
                Orientação farmacêutica e suporte aos pacientes
              </p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
      <WhatsAppFloat />
    </div>
  );
};

export default About;
