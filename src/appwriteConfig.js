import { Client, Databases, Account } from 'appwrite';

export const PROJECT_ID = '656605dcc84c7463d76a';
export const DATABASE_ID = '65660e64d4788da3adeb';
export const COLLECTION_ID_MESSAGES = '65660e6f9b77e812169c';

const client = new Client();

client
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject('656605dcc84c7463d76a');

export const databases = new Databases(client);
export const account = new Account(client);

export default client;