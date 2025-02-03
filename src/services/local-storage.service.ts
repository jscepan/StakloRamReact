export const LocalStorageService = {
  set: (key: string, value: any): void => {
    localStorage.setItem(key, JSON.stringify(value));
  },

  get: (key: string): any => {
    try {
      return JSON.parse(localStorage.getItem(key) ?? '');
    } catch {
      return localStorage.getItem(key);
    }
  },

  delete: (key: string): void => {
    localStorage.removeItem(key);
  },

  clearAll: (): void => {
    localStorage.clear();
  },
};
