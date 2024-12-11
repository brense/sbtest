import { ClientSecretCredential } from "@azure/identity";
import "dotenv/config";

export const credentials = new ClientSecretCredential(
  process.env.LSIS_TENANT_ID,
  process.env.CLIENT_ID,
  process.env.CLIENT_SECRET
);
export const fqn = process.env.FQN;
export const queueName: string = process.env.QUEUE_NAME;
