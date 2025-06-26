
interface PharmacyLogoProps {
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
}

const PharmacyLogo = ({ size = 'md', showText = true }: PharmacyLogoProps) => {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-16 h-16'
  };

  const textSizeClasses = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-xl'
  };

  return (
    <div className="flex items-center space-x-3">
      {/* Logo oficial da Farmácia */}
      <img 
        src="/lovable-uploads/29c5f3c9-b602-46ac-86c4-102485a3f245.png" 
        alt="Logo Farmácia Municipal de Bueno Brandão" 
        className={`${sizeClasses[size]} object-contain`}
      />
      
      {/* Logo Text */}
      {showText && (
        <div className="flex flex-col">
          <span className={`font-bold text-slate-800 ${textSizeClasses[size]} leading-tight`}>
            Farmácia Municipal
          </span>
          <span className={`text-slate-600 ${size === 'lg' ? 'text-sm' : 'text-xs'} leading-tight`}>
            de Bueno Brandão
          </span>
        </div>
      )}
    </div>
  );
};

export default PharmacyLogo;
