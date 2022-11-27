import { Account } from "./Account.interface";

export interface User {
    id?: number;
    username?: string;
    password?: string;
    account?: Account;
}