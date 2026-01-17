import amqp from "amqplib";

/// RabbitMQ connection
export let channel, connection;

export async function connectRabbitMQwithRetry(retries = 5, delay = 3000) {
  while (retries) {
    try {
      connection = await amqp.connect("amqp://rabbitmq");
      channel = await connection.createChannel();
      await channel.assertQueue("task_created");
      console.log("Connection to RabbitMQ Sucessfull");
      break;
    } catch (error) {
      console.log("Connection to RabbitMQ Failed");
      console.log(error);
      retries--;
      console.log(`Retrying Again :: Remaing -- ${retries}`);
      await new Promise((res) => setTimeout(res, delay));
    }
  }
}
