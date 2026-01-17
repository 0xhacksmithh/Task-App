import { Task } from "../database/blogPost.model.js";
import { channel } from "../rabbitmq/connectRabbitMQ.js";

export const createPosts = async (req, res) => {
  // try {
  //   const { title, body, userId } = req.body;
  //   const newTask = new Task({ title, body, userId });
  //   await newTask.save();
  //   const rabbitMSG = { taskId: newTask._id, userId, title };
  //   if (!channel) {
  //     return res.status(503).json({
  //       error: "RabbitMQ Not Connected....",
  //     });
  //   }
  //   channel.sendToQueue("task_created", Buffer.from(JSON.stringify(rabbitMSG)));
  //   res.status(201).json(newTask);
  // } catch (error) {
  //   console.log(error);
  //   res.status(500).json({
  //     message: "Internal Server Error",
  //   });
  // }
};

export const fetchPosts = async (req, res) => {};

export const fetchPostsById = async (req, res) => {};

export const likeOnPost = async (req, res) => {};

export const commmentOnPost = async (req, res) => {};
