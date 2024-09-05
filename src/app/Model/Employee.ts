export interface Employee {
    id: number;
    sarf_Id: string;
    fullName: string;
    nationalId: string;
    ta2meen_No: string;
    bankAcc_No: string;
    nationality: string;
    phoneNumber: string;
    selected?: boolean;
  }
  interface SelectableEmployee extends Employee {
    selected?: boolean;
  }
  