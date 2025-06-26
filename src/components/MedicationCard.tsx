
import { Medication } from '../types/medication';

interface MedicationCardProps {
  medication: Medication;
}

const MedicationCard = ({ medication }: MedicationCardProps) => {
  const getStatusStyle = (status: string) => {
    switch (status) {
      case 'Disponível':
        return 'bg-emerald-100 text-emerald-700';
      case 'Recém-chegado':
        return 'bg-green-100 text-green-700';
      case 'Em falta':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const getTextStyle = (status: string) => {
    switch (status) {
      case 'Disponível':
        return 'text-slate-800';
      case 'Recém-chegado':
        return 'text-green-600';
      case 'Em falta':
        return 'text-red-600';
      default:
        return 'text-slate-800';
    }
  };

  return (
    <div className="bg-white rounded-lg border border-slate-200 p-6 hover:shadow-md transition-all duration-200 hover:border-emerald-200">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className={`font-semibold text-lg mb-1 ${getTextStyle(medication.status)}`}>
            {medication.name}
          </h3>
          <p className="text-sm text-slate-500 mb-2">
            {medication.category}
          </p>
        </div>
        <div className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusStyle(medication.status)}`}>
          {medication.status}
        </div>
      </div>
      
      <div className="space-y-2">
        <div className="flex justify-between">
          <span className="text-slate-600">Concentração:</span>
          <span className={`font-medium ${getTextStyle(medication.status)}`}>{medication.concentration}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-slate-600">Forma:</span>
          <span className={`font-medium ${getTextStyle(medication.status)}`}>{medication.form}</span>
        </div>
      </div>
    </div>
  );
};

export default MedicationCard;
