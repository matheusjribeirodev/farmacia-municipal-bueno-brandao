
import { useState, useMemo } from 'react';
import { Medication } from '../types/medication';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Badge } from './ui/badge';

interface MedicationTableProps {
  medications: Medication[];
}

const MedicationTable = ({ medications }: MedicationTableProps) => {
  const [sortBy, setSortBy] = useState<'name' | 'category' | 'status'>('name');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  const sortedMedications = useMemo(() => {
    return [...medications].sort((a, b) => {
      let aValue = a[sortBy];
      let bValue = b[sortBy];
      
      if (sortOrder === 'asc') {
        return aValue.localeCompare(bValue);
      } else {
        return bValue.localeCompare(aValue);
      }
    });
  }, [medications, sortBy, sortOrder]);

  const handleSort = (column: 'name' | 'category' | 'status') => {
    if (sortBy === column) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(column);
      setSortOrder('asc');
    }
  };

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case 'Disponível':
        return 'outline';
      case 'Recém-chegado':
        return 'secondary';
      case 'Em falta':
        return 'destructive';
      default:
        return 'outline';
    }
  };

  const getTextStyle = (status: string) => {
    switch (status) {
      case 'Disponível':
        return 'text-slate-800';
      case 'Recém-chegado':
        return 'text-green-600 font-medium';
      case 'Em falta':
        return 'text-red-600';
      default:
        return 'text-slate-800';
    }
  };

  return (
    <div className="bg-white rounded-lg border border-slate-200 overflow-hidden">
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead 
                className="cursor-pointer hover:bg-slate-50 transition-colors min-w-[200px] sm:min-w-0"
                onClick={() => handleSort('name')}
              >
                <div className="flex items-center">
                  <span className="text-xs sm:text-sm">Nome do Medicamento</span>
                  {sortBy === 'name' && (
                    <span className="ml-2">
                      {sortOrder === 'asc' ? '↑' : '↓'}
                    </span>
                  )}
                </div>
              </TableHead>
              <TableHead className="hidden sm:table-cell text-xs sm:text-sm">Concentração</TableHead>
              <TableHead className="hidden md:table-cell text-xs sm:text-sm">Forma</TableHead>
              <TableHead 
                className="cursor-pointer hover:bg-slate-50 transition-colors text-xs sm:text-sm"
                onClick={() => handleSort('category')}
              >
                <div className="flex items-center">
                  <span>Categoria</span>
                  {sortBy === 'category' && (
                    <span className="ml-2">
                      {sortOrder === 'asc' ? '↑' : '↓'}
                    </span>
                  )}
                </div>
              </TableHead>
              <TableHead 
                className="cursor-pointer hover:bg-slate-50 transition-colors text-xs sm:text-sm"
                onClick={() => handleSort('status')}
              >
                <div className="flex items-center">
                  <span>Status</span>
                  {sortBy === 'status' && (
                    <span className="ml-2">
                      {sortOrder === 'asc' ? '↑' : '↓'}
                    </span>
                  )}
                </div>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedMedications.map((medication) => (
              <TableRow key={medication.id} className="hover:bg-slate-50">
                <TableCell className={`font-medium ${getTextStyle(medication.status)} text-xs sm:text-sm`}>
                  <div>
                    <div>{medication.name}</div>
                    {/* Show concentration and form on mobile */}
                    <div className="sm:hidden text-xs text-slate-500 mt-1">
                      {medication.concentration} • {medication.form}
                    </div>
                  </div>
                </TableCell>
                <TableCell className={`hidden sm:table-cell ${getTextStyle(medication.status)} text-xs sm:text-sm`}>
                  {medication.concentration}
                </TableCell>
                <TableCell className={`hidden md:table-cell ${getTextStyle(medication.status)} text-xs sm:text-sm`}>
                  {medication.form}
                </TableCell>
                <TableCell className="text-slate-600 text-xs sm:text-sm">
                  {medication.category}
                </TableCell>
                <TableCell>
                  <Badge variant={getStatusBadgeVariant(medication.status)} className="text-xs">
                    {medication.status}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default MedicationTable;
