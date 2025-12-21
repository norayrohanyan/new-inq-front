export interface IErrorState {
  errors: IError[];
}

export interface IError {
  id: string;
  message: string;
  type: 'error' | 'success' | 'info' | 'warning';
  timestamp: number;
}

