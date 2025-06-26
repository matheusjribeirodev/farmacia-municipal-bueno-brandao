
export interface Medication {
  id: string;
  name: string;
  concentration: string;
  form: string;
  status: 'Disponível' | 'Em falta' | 'Recém-chegado';
  category: string;
}
