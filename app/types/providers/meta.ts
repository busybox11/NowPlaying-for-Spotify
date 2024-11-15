export interface ProviderMeta {
  name: string;
  id: string;
  auth: (callback?: (token: any) => void) => any;
  callback: (callback?: (token: any) => void) => any;
}
