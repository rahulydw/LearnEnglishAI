import User from '../../models/User.model.js';

const loginController = async (req, res) => {
  try {
    // 1: Agar user already login hai
    if (req.user) {
      return res.redirect(`${process.env.CLIENT_URL}/chat`);
    }

    // 2: Body valid check
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Email and password are required'
      });
    }

    // 3: User find by email
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    // 4: Password match check
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      });
    }

    // 5: Generate JWT (now includes id)
    const token = user.generateJWT();

    // 6: Cookie set — Google login ke SAME settings
    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'Lax',          // FIXED (was "strict")
      maxAge: 7 * 24 * 60 * 60 * 1000
    });

    // 7: Response
    return res.status(200).json({
      success: true,
      message: 'Login successful',
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        avatar: user.avatar
      }
    });

  } catch (error) {
    console.error('Login error:', error);
    return res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

export default loginController;
