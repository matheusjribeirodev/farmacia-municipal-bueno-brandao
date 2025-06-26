
import { useState, useMemo } from 'react';
import { Download, Filter, Grid, List, Info, AlertCircle, Clock } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import SearchBox from '../components/SearchBox';
import MedicationCard from '../components/MedicationCard';
import MedicationTable from '../components/MedicationTable';
import WhatsAppFloat from '../components/WhatsAppFloat';
import { medications, lastUpdated } from '../data/medications';

const Medications = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'available' | 'unavailable' | 'recent'>('all');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');

  const categories = useMemo(() => {
    const uniqueCategories = [...new Set(medications.map(med => med.category))];
    return uniqueCategories.sort();
  }, []);

  const filteredMedications = useMemo(() => {
    return medications.filter(med => {
      const matchesSearch = searchQuery === '' || 
        med.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        med.category.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesStatus = statusFilter === 'all' ||
        (statusFilter === 'available' && med.status === 'Disponível') ||
        (statusFilter === 'unavailable' && med.status === 'Em falta') ||
        (statusFilter === 'recent' && med.status === 'Recém-chegado');
      
      const matchesCategory = categoryFilter === 'all' || med.category === categoryFilter;
      
      return matchesSearch && matchesStatus && matchesCategory;
    });
      }, [searchQuery, statusFilter, categoryFilter]);

  const downloadPDF = () => {
    // Detectar se é mobile
    const isMobile = window.innerWidth <= 768;
    
    // Criar conteúdo HTML para impressão
    const printContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>Lista de Medicamentos - Farmácia Municipal de Bueno Brandão</title>
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <style>
            @page {
              margin: ${isMobile ? '0.3in' : '0.5in'};
              size: ${isMobile ? 'A4 portrait' : 'A4'};
            }
            
            * {
              box-sizing: border-box;
            }
            
            body { 
              font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; 
              margin: 0; 
              padding: 20px;
              line-height: 1.4;
              color: #2d3748;
              background: #fff;
            }
            
            .document-header {
              text-align: center;
              margin-bottom: 30px;
              border-bottom: 3px solid #047857;
              padding-bottom: 20px;
            }
            
            .logo-section {
              margin-bottom: 15px;
            }
            
            .main-title {
              color: #047857;
              font-size: ${isMobile ? '24px' : '28px'};
              font-weight: bold;
              margin: 0 0 5px 0;
              text-transform: uppercase;
              letter-spacing: ${isMobile ? '0.5px' : '1px'};
            }
            
            .subtitle {
              color: #6b7280;
              font-size: ${isMobile ? '16px' : '18px'};
              margin: 0 0 8px 0;
              font-weight: 500;
            }
            
            .document-title {
              color: #1f2937;
              font-size: ${isMobile ? '18px' : '20px'};
              font-weight: 600;
              margin: 15px 0 5px 0;
            }
            
            .update-info {
              background: linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%);
              padding: 12px 20px;
              border-radius: 8px;
              text-align: center;
              margin-bottom: 25px;
              border: 1px solid #0284c7;
            }
            
            .update-text {
              color: #0c4a6e;
              font-weight: 600;
              margin: 0;
              font-size: 14px;
            }
            
            .important-info {
              background: linear-gradient(135deg, #fef7ff 0%, #f3e8ff 100%);
              border: 2px solid #8b5cf6;
              border-radius: 12px;
              padding: 20px;
              margin-bottom: 30px;
              box-shadow: 0 2px 4px rgba(139, 92, 246, 0.1);
            }
            
            .important-title {
              color: #6b21a8;
              font-size: 16px;
              font-weight: 700;
              margin: 0 0 15px 0;
              display: flex;
              align-items: center;
            }
            
            .important-title::before {
              content: "⚠️";
              margin-right: 8px;
              font-size: 18px;
            }
            
            .important-info p {
              margin: 8px 0;
              color: #4c1d95;
              line-height: 1.5;
              font-size: 13px;
            }
            
            .highlight {
              font-weight: 700;
              color: #6b21a8;
            }
            
            .table-container {
              margin-top: 20px;
              box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
              border-radius: 12px;
              overflow: hidden;
            }
            
            table {
              width: 100%;
              border-collapse: collapse;
              background: white;
            }
            
            thead {
              background: linear-gradient(135deg, #047857 0%, #059669 100%);
            }
            
            th {
              color: white;
              font-weight: 700;
              padding: ${isMobile ? '10px 8px' : '15px 12px'};
              text-align: left;
              font-size: ${isMobile ? '12px' : '14px'};
              text-transform: uppercase;
              letter-spacing: 0.5px;
              border: none;
            }
            
            tbody tr {
              border-bottom: 1px solid #e5e7eb;
              transition: background-color 0.2s;
            }
            
            tbody tr:nth-child(even) {
              background-color: #f9fafb;
            }
            
            tbody tr:hover {
              background-color: #f0f9ff;
            }
            
            td {
              padding: ${isMobile ? '10px 8px' : '12px'};
              font-size: ${isMobile ? '11px' : '13px'};
              vertical-align: top;
              border: none;
              word-wrap: break-word;
              line-height: 1.4;
            }
            
            .med-name {
              font-weight: 600;
              color: #1f2937;
              font-size: ${isMobile ? '12px' : '14px'};
            }
            
            .med-concentration {
              font-weight: 500;
              color: #4b5563;
              font-size: ${isMobile ? '11px' : '13px'};
            }
            
            .med-form {
              color: #6b7280;
              font-style: italic;
              font-size: ${isMobile ? '11px' : '13px'};
            }
            
            .med-category {
              background: #f3f4f6;
              padding: ${isMobile ? '3px 6px' : '4px 8px'};
              border-radius: 4px;
              font-size: ${isMobile ? '10px' : '12px'};
              font-weight: 500;
              color: #374151;
              display: inline-block;
            }
            
            .status-badge {
              padding: ${isMobile ? '4px 8px' : '6px 12px'};
              border-radius: 20px;
              font-weight: 600;
              font-size: ${isMobile ? '10px' : '12px'};
              text-transform: uppercase;
              letter-spacing: 0.5px;
              display: inline-block;
            }
            
            .status-disponivel {
              background: #d1fae5;
              color: #065f46;
              border: 1px solid #10b981;
            }
            
            .status-recem-chegado {
              background: #dcfce7;
              color: #166534;
              border: 1px solid #22c55e;
              box-shadow: 0 0 0 2px rgba(34, 197, 94, 0.2);
            }
            
            .status-em-falta {
              background: #fee2e2;
              color: #991b1b;
              border: 1px solid #ef4444;
            }
            
            .footer {
              margin-top: 30px;
              text-align: center;
              padding-top: 20px;
              border-top: 2px solid #e5e7eb;
              color: #6b7280;
              font-size: 12px;
            }
            
            .contact-info {
              margin-top: 10px;
              font-weight: 600;
              color: #047857;
            }
            
            /* Estilos específicos para mobile */
            @media screen and (max-width: 768px) {
              body {
                padding: 8px;
                font-size: 12px;
              }
              
              .document-header {
                margin-bottom: 15px;
                padding-bottom: 10px;
              }
              
              .important-info {
                padding: 12px;
                margin-bottom: 15px;
              }
              
              .table-container {
                overflow-x: auto;
                -webkit-overflow-scrolling: touch;
              }
              
              table {
                min-width: 100%;
                font-size: 11px;
              }
              
              .med-name {
                font-size: 12px !important;
                font-weight: 600 !important;
              }
              
              .med-concentration {
                font-size: 11px !important;
              }
              
              .med-form {
                font-size: 11px !important;
              }
              
              .med-category {
                font-size: 10px !important;
                padding: 2px 4px !important;
              }
              
              .status-badge {
                padding: 3px 6px !important;
                font-size: 9px !important;
              }
            }
            
            @media print {
              body { 
                -webkit-print-color-adjust: exact;
                print-color-adjust: exact;
                font-size: ${isMobile ? '11px' : '13px'};
              }
              
              .table-container {
                box-shadow: none;
                overflow: visible;
              }
              
              table {
                font-size: ${isMobile ? '10px' : '12px'};
              }
              
              th {
                font-size: ${isMobile ? '9px' : '11px'} !important;
                padding: ${isMobile ? '6px 4px' : '8px 6px'} !important;
              }
              
              td {
                font-size: ${isMobile ? '9px' : '11px'} !important;
                padding: ${isMobile ? '6px 4px' : '8px 6px'} !important;
              }
              
              .med-name {
                font-size: ${isMobile ? '10px' : '12px'} !important;
                font-weight: 600 !important;
              }
              
              .med-concentration {
                font-size: ${isMobile ? '9px' : '11px'} !important;
              }
              
              .med-form {
                font-size: ${isMobile ? '9px' : '11px'} !important;
              }
              
              .med-category {
                font-size: ${isMobile ? '8px' : '10px'} !important;
                padding: ${isMobile ? '2px 3px' : '3px 5px'} !important;
              }
              
              .status-badge {
                font-size: ${isMobile ? '8px' : '10px'} !important;
                padding: ${isMobile ? '2px 4px' : '3px 6px'} !important;
              }
              
              tbody tr:hover {
                background-color: transparent !important;
              }
            }
          </style>
        </head>
        <body>
          <div class="document-header">
            <div class="logo-section">
              <h1 class="main-title">Farmácia Municipal</h1>
              <p class="subtitle">de Bueno Brandão</p>
              <p class="subtitle" style="font-style: italic;">Rede Farmácia de Minas</p>
            </div>
            <h2 class="document-title">Lista Completa de Medicamentos Disponíveis</h2>
          </div>
          
          <div class="update-info">
            <p class="update-text">📅 Última atualização: ${lastUpdated}</p>
          </div>
          
          <div class="important-info">
            <h3 class="important-title">Informações Importantes</h3>
            <p>📋 A lista é atualizada a cada <span class="highlight">15 dias</span>. Pode haver falta de medicamentos que constam como "Disponível" e só serão atualizados como "Em falta" na próxima atualização.</p>
            <p>🟢 <span class="highlight">Medicamentos em verde (Recém-chegado):</span> Não constavam na lista anterior e agora estão disponíveis em estoque.</p>
            <p>🔴 <span class="highlight">Medicamentos em vermelho (Em falta):</span> Constavam na lista anterior como disponíveis, mas agora estão em falta.</p>
          </div>
          
          <div class="table-container">
            <table>
              <thead>
                <tr>
                  <th style="width: 30%;">Nome do Medicamento</th>
                  <th style="width: 15%;">Concentração</th>
                  <th style="width: 20%;">Forma</th>
                  <th style="width: 20%;">Categoria</th>
                  <th style="width: 15%;">Status</th>
                </tr>
              </thead>
              <tbody>
                ${medications.map(med => `
                  <tr>
                    <td class="med-name">${med.name}</td>
                    <td class="med-concentration">${med.concentration}</td>
                    <td class="med-form">${med.form}</td>
                    <td><span class="med-category">${med.category}</span></td>
                    <td>
                      <span class="status-badge ${
                        med.status === 'Disponível' ? 'status-disponivel' : 
                        med.status === 'Recém-chegado' ? 'status-recem-chegado' : 
                        'status-em-falta'
                      }">
                        ${med.status}
                      </span>
                    </td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
          
          <div class="footer">
            <p>📄 Documento gerado automaticamente pelo sistema da Farmácia Municipal</p>
            <p class="contact-info">📞 Contato: (35) 99814-1693</p>
            <p>🏥 Rua Coronel Ramalho, 330 - Centro - Bueno Brandão - MG</p>
          </div>
        </body>
      </html>
    `;

    const printWindow = window.open('', '_blank');
    if (printWindow) {
      printWindow.document.write(printContent);
      printWindow.document.close();
      printWindow.focus();
      printWindow.print();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <Header />
      
      <div className="container mx-auto px-4 py-4 sm:py-8">
        {/* Page Header */}
        <div className="text-center mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-800 mb-3 sm:mb-4">
            Lista Completa de Medicamentos Disponíveis
          </h1>
          <p className="text-base sm:text-lg text-slate-600 mb-2">
            Farmácia Municipal de Bueno Brandão - Rede Farmácia de Minas
          </p>
          <p className="text-sm text-slate-500 mb-4 sm:mb-6">
            Última atualização: {lastUpdated}
          </p>
        </div>

        {/* Informações importantes */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 sm:p-6 mb-6 sm:mb-8">
          <div className="flex items-start space-x-3">
            <Info className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
            <div className="space-y-3">
              <h3 className="font-semibold text-blue-800 text-sm sm:text-base">Informações Importantes:</h3>
              
              <div className="flex items-start space-x-2">
                <Clock className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
                <p className="text-blue-700 text-xs sm:text-sm">
                  A lista é atualizada a cada 15 dias. Pode haver falta de medicamentos que constam como "Disponível" e só serão atualizados como "Em falta" na próxima atualização.
                </p>
              </div>
              
              <div className="flex items-start space-x-2">
                <AlertCircle className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
                <div className="text-blue-700 text-xs sm:text-sm">
                  <p className="mb-2"><strong>Medicamentos em verde (Recém-chegado):</strong> Não constavam na lista anterior e agora estão disponíveis em estoque.</p>
                  <p><strong>Medicamentos em vermelho (Em falta):</strong> Constavam na lista anterior como disponíveis, mas agora estão em falta.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Search Box */}
        <div className="mb-6 sm:mb-8">
          <SearchBox 
            onSearch={setSearchQuery}
            placeholder="Buscar por nome ou categoria..."
          />
        </div>

        {/* Filters and View Toggle */}
        <div className="bg-white rounded-lg border border-slate-200 p-4 sm:p-6 mb-6 sm:mb-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 gap-4 sm:gap-0">
            <div className="flex items-center space-x-2">
              <Filter className="h-5 w-5 text-slate-600" />
              <h3 className="font-medium text-slate-800">Filtros</h3>
            </div>
            
            {/* View Mode Toggle */}
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-lg transition-colors ${
                  viewMode === 'grid' 
                    ? 'bg-emerald-100 text-emerald-700' 
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                <Grid size={20} />
              </button>
              <button
                onClick={() => setViewMode('table')}
                className={`p-2 rounded-lg transition-colors ${
                  viewMode === 'table' 
                    ? 'bg-emerald-100 text-emerald-700' 
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                <List size={20} />
              </button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Status Filter */}
            <div className="col-span-1">
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Status
              </label>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value as any)}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:border-emerald-500 text-sm"
              >
                <option value="all">Todos</option>
                <option value="available">Disponível</option>
                <option value="recent">Recém-chegado</option>
                <option value="unavailable">Em Falta</option>
              </select>
            </div>

            {/* Category Filter */}
            <div className="col-span-1">
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Categoria
              </label>
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:border-emerald-500 text-sm"
              >
                <option value="all">Todas as categorias</option>
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>

            {/* Download Button */}
            <div className="col-span-1 sm:col-span-2 flex items-end">
              <button
                onClick={downloadPDF}
                className="w-full px-3 sm:px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors font-medium flex items-center justify-center space-x-2 text-xs sm:text-base"
              >
                <Download size={16} className="sm:w-[18px] sm:h-[18px]" />
                <span className="hidden sm:inline">Imprimir Lista (PDF)</span>
                <span className="sm:hidden">Lista PDF</span>
              </button>
            </div>

          </div>
        </div>

        {/* Results Info */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 sm:mb-6 gap-4 sm:gap-0">
          <p className="text-slate-600 text-sm sm:text-base">
            {filteredMedications.length} medicamento(s) encontrado(s)
          </p>
          
          <div className="flex flex-wrap gap-3 sm:gap-4 text-xs sm:text-sm">
            <span className="flex items-center space-x-1">
              <div className="w-3 h-3 bg-emerald-500 rounded-full"></div>
              <span className="text-slate-600">Disponível</span>
            </span>
            <span className="flex items-center space-x-1">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span className="text-slate-600">Recém-chegado</span>
            </span>
            <span className="flex items-center space-x-1">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <span className="text-slate-600">Em Falta</span>
            </span>
          </div>
        </div>

        {/* Medications Display */}
        {filteredMedications.length > 0 ? (
          viewMode === 'grid' ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {filteredMedications.map((medication) => (
                <MedicationCard key={medication.id} medication={medication} />
              ))}
            </div>
          ) : (
            <div className="overflow-x-auto">
              <MedicationTable medications={filteredMedications} />
            </div>
          )
        ) : (
          <div className="text-center py-8 sm:py-12">
            <div className="w-12 h-12 sm:w-16 sm:h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Filter className="h-6 w-6 sm:h-8 sm:w-8 text-slate-400" />
            </div>
            <h3 className="text-lg font-medium text-slate-800 mb-2">Nenhum medicamento encontrado</h3>
            <p className="text-slate-600 text-sm sm:text-base">Tente ajustar os filtros ou fazer uma nova busca.</p>
          </div>
        )}
      </div>

      <Footer />
      <WhatsAppFloat />
    </div>
  );
};

export default Medications;
