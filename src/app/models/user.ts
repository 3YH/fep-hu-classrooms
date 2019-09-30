import { Account } from './account';

export interface User extends Account {
    cloudMessagingTokens?: {
        [token: string]: boolean
    };
}
