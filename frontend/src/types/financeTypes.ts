export interface Expense {
    id: string;
    amount: number;
    category: string;
    date: string;
    description: string;
  }
  
  export interface Budget {
    category: string;
    limit: number;
    period: 'monthly' | 'weekly';
  }
  
  export interface Bill {
    id: string;
    name: string;
    amount: number;
    dueDate: string;
    recurring: boolean;
    frequency: 'monthly' | 'weekly' | 'yearly';
  }
  
  export interface SavingsGoal {
    id: string;
    name: string;
    targetAmount: number;
    currentAmount: number;
    deadline: string;
  }
  