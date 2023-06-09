import { Client, Account, ID, Storage, Databases } from "appwrite";

const client = new Client()
  .setEndpoint("https://cloud.appwrite.io/v1")
  .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID!);

const account = new Account(client);
const storage = new Storage(client);
const databases = new Databases(client);

export { client, account, storage, databases, ID };
