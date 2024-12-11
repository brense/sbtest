import { ServiceBusClient, ServiceBusSender } from "@azure/service-bus";
import { fqn, queueName, credentials } from "./config";

async function main(): Promise<void> {
  const serviceBusClient = new ServiceBusClient(fqn, credentials);

  const serviceBusSender: ServiceBusSender =
    serviceBusClient.createSender(queueName);

  await serviceBusSender.sendMessages({ body: "Hallo Xander" });

  await serviceBusSender.close();
  await serviceBusClient.close();
}

main().catch((err: Error) => {
  console.log("Error occurred: ", err);
  process.exit(1);
});
