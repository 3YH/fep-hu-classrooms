import { User } from './user';

export interface Docent extends User {
    beheerdeRuimtes?: string[];
}
