import { MessageCircle } from 'lucide-react';

const WhatsAppFloat = () => {
  const phoneNumber = "5535998141693"; // Número do WhatsApp da farmácia
  const message = "Olá! Gostaria de obter informações sobre medicamentos disponíveis na Farmácia Municipal de Bueno Brandão.";
  
  const handleWhatsAppClick = () => {
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <button
      onClick={handleWhatsAppClick}
      className="fixed bottom-6 right-6 bg-green-500 hover:bg-green-600 text-white rounded-full p-4 shadow-lg hover:shadow-xl transition-all duration-300 z-50 group"
      aria-label="Falar no WhatsApp"
    >
      <MessageCircle size={24} />
      
      {/* Tooltip */}
      <div className="absolute bottom-full right-0 mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
        <div className="bg-gray-800 text-white text-sm rounded-lg px-3 py-2 whitespace-nowrap">
          Falar no WhatsApp
          <div className="absolute top-full right-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-800"></div>
        </div>
      </div>
    </button>
  );
};

export default WhatsAppFloat; 