
import PharmacyLogo from './PharmacyLogo';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-50 border-t border-slate-200 mt-16">
      <div className="container mx-auto px-4 py-8">
        <div className="grid md:grid-cols-3 gap-8">
          <div>
            <div className="mb-4">
              <PharmacyLogo size="sm" showText={true} />
            </div>
            <p className="text-slate-600 text-sm mb-2">
              Rede Farmácia de Minas
            </p>
            <p className="text-slate-600 text-sm">
              Consulte aqui os medicamentos disponíveis na nossa farmácia municipal.
              Informações atualizadas regularmente.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-slate-800 mb-4">Informações de Contato</h4>
            <div className="text-sm text-slate-600 space-y-2">
              <p><span className="font-medium">Endereço:</span></p>
              <p>Rua Coronel Ramalho, 330</p>
              <p>Bueno Brandão - MG</p>
              <p><span className="font-medium">Telefone/WhatsApp:</span></p>
              <p>(35) 99814-1693</p>
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-slate-800 mb-4">Horário de Funcionamento</h4>
            <div className="text-sm text-slate-600 space-y-1">
              <p><span className="font-medium">Segunda a Sexta:</span></p>
              <p>8h às 12h e 13h às 17h</p>
              <p className="text-xs text-slate-500">(fechado para almoço das 12h às 13h)</p>
              <p className="mt-2"><span className="font-medium">Sábado e Domingo:</span></p>
              <p>Fechado</p>
            </div>
          </div>
        </div>

        <div className="border-t border-slate-200 mt-8 pt-6 text-center text-sm text-slate-500">
          <p>&copy; {currentYear} Farmácia Municipal de Bueno Brandão. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
