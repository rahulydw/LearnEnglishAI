import User from "../../models/User.model.js";
import ResponseHandler from "../../utils/ResponseHandler.js";

const loginController = async (req, res) => {
  try {
    // 1: Already logged in
    if (req.user) {
      return res.redirect(`${process.env.CLIENT_URL}/chat`);
    }

    // 2: Validate body
    const { email, password } = req.body;

    if (!email || !password) {
      return new ResponseHandler({
        success: false,
        statusCode: 400,
        message: "Email and password are required",
      }).send(res);
    }

    // 3: Find user
    const user = await User.findOne({ email });

    if (!user) {
      return new ResponseHandler({
        success: false,
        statusCode: 404,
        message: "User not found",
      }).send(res);
    }

    // 4: Password check
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return new ResponseHandler({
        success: false,
        statusCode: 401,
        message: "Invalid credentials",
      }).send(res);
    }

    // 5: Generate JWT (contains id)
    const token = user.generateJWT();

    // 6: Cookie (same as Google OAuth)
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "None", // VERY IMPORTANT for cross-domain cookies
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    // 7: Success Response
    return new ResponseHandler({
      success: true,
      statusCode: 200,
      message: "Login successful",
      data: {
        id: user._id,
        name: user.name,
        email: user.email,
        avatar: user.avatar,
      },
    }).send(res);
  } catch (error) {
    console.error("Login error:", error);

    return new ResponseHandler({
      success: false,
      statusCode: 500,
      message: "Server error",
      errors: [error.message],
    }).send(res);
  }
};

export default loginController;
