import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import amqp from "amqplib";

const app = express();

app.use(bodyParser.json());

const connectDB = async () => {
  try {
    // await mongoose.connect("mongodb://localhost:27017/tasks");
    await mongoose.connect("mongodb://taskAppDB:27017/tasks");
    console.log("DB Connection Sucessful");
  } catch (error) {
    console.log("DB Connection Failed");
  }
};

const TaskSchema = new mongoose.Schema({
  title: String,
  body: String,
  userId: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Task = mongoose.model("Task", TaskSchema);

/// RabbitMQ connection
let channel, connection;

async function connectRabbitMQwithRetry(retries = 5, delay = 3000) {
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

app.get("/tasks", async (req, res) => {
  const tasks = await Task.find();
  res.json(tasks);
});

app.post("/tasks", async (req, res) => {
  try {
    const { title, body, userId } = req.body;
    const newTask = new Task({ title, body, userId });
    await newTask.save();

    const rabbitMSG = { taskId: newTask._id, userId, title };
    if (!channel) {
      return res.status(503).json({
        error: "RabbitMQ Not Connected....",
      });
    }
    channel.sendToQueue("task_created", Buffer.from(JSON.stringify(rabbitMSG)));

    res.status(201).json(newTask);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
});

app.listen(3001, () => {
  console.log(`Server is running on port :: 3001`);
});

connectDB();
connectRabbitMQwithRetry();
