export interface Task {
  id: string;
  text: string;
  isCompleted: boolean;
  isImportant?: boolean;
  isUrgent?: boolean;
  createdAt: number;
}

export enum QuadrantType {
  DO = 'DO', // Important & Urgent
  SCHEDULE = 'SCHEDULE', // Important & Not Urgent
  DELEGATE = 'DELEGATE', // Not Important & Urgent
  DELETE = 'DELETE', // Not Important & Not Urgent
}

export type SortOption = 'createdAt_asc' | 'createdAt_desc' | 'text_asc' | 'text_desc';
