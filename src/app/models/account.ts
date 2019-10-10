export interface Account {
    uid: string;
    role: 'student' | 'docent' | 'scanner',
    huEmail?: {
        email: string,
        validated: boolean,
    };
}
