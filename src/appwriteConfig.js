import { Client, Databases, Account } from 'appwrite';

export const PROJECT_ID = '6567a4db5173029ca6db';
export const DATABASE_ID = '6567a5ece8c24aa5b409';
export const COLLECTION_ID_MESSAGES = '6567a60283d0d7ed9256';

const client = new Client();

client
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject('6567a4db5173029ca6db');

export const databases = new Databases(client);
export const account = new Account(client);

export default client;