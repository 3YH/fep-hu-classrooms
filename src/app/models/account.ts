export interface Account {
  uid: string;
  huEmail?: {
    email: string;
    validated: boolean;
  };
}
