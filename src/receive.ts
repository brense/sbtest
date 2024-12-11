import {
  delay,
  ProcessErrorArgs,
  ServiceBusClient,
  ServiceBusMessage,
  ServiceBusReceiver,
} from "@azure/service-bus";
import { fqn, queueName, credentials } from "./config";

async function main(): Promise<void> {
  const serviceBusClient = new ServiceBusClient(fqn, credentials);

  const serviceBusReceiver: ServiceBusReceiver =
    serviceBusClient.createReceiver(queueName);

  const myMessageHandler = async (
    messageReceived: ServiceBusMessage
  ): Promise<void> => {
    console.log(`Received message: ${messageReceived.body}`);
  };

  const myErrorHandler = async (error: ProcessErrorArgs): Promise<void> => {
    console.log(error);
  };

  serviceBusReceiver.subscribe({
    processMessage: myMessageHandler,
    processError: myErrorHandler,
  });

  await delay(20000);

  await serviceBusReceiver.close();
  await serviceBusClient.close();
}

main().catch((err: Error) => {
  console.log("Error occurred: ", err);
  process.exit(1);
});
