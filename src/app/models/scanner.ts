import { Account } from './account';

export interface Scanner extends Account {
  beheerdeRuimtes?: string[];
}
