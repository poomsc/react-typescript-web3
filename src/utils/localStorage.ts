export const lcsSetItem = (variable: string, data: any): void => {
  localStorage.setItem(variable, data);
};

export const lcsGetItem = (variable: string): string | null => {
  return localStorage.getItem(variable);
};

export const lcsRemoveItem = (variable: string): void => {
  if (lcsGetItem(variable)) {
    localStorage.removeItem(variable);
  }
};
