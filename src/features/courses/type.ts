export type Course = {
  id: string;
  name: string;
  unit: number;
  theoUnit: number;
  pracUnit: number;
  amozeshyarCode: number;
  defaultTerm: string | null;
  required?: boolean;
  oneCoursePerTerm?: boolean;
  resources?: any[];
  unitRequisites?: number;
  preCourseRequisites?: { id: string; name: string; corequisite: boolean }[];
};
