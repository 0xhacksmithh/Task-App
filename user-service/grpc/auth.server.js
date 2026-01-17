import { userModel } from "../database/user.model.js";

export const validateUser = async (call, callback) => {
  const { userId, role } = call.request;

  try {
    const user = await userModel.findById(userId);

    if (!user) {
      return callback(null, {
        valid: false,
        message: "User not found",
      });
    }

    if (user.type !== role) {
      return callback(null, {
        valid: false,
        message: "Role mismatch",
      });
    }

    return callback(null, {
      valid: true,
      message: "User validated",
    });
  } catch (err) {
    callback(err);
  }
};
