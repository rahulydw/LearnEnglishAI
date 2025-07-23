import User from '../../models/User.model.js';

const loginController = async (req, res) => {
  try {
    // ✅ Step 1: Agar user already authenticated hai (passport ke through)
    if (req.user) {
      return res.redirect(`${process.env.CLIENT_URL}/chat`);
    }

    // ✅ Step 2: Get credentials from request body
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'Email and password are required' });
    }

    // ✅ Step 3: Check if user exists
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    // ✅ Step 4: Compare password (using model method)
    const isMatch = await user.comparePassword(password);

    if (!isMatch) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }

    // ✅ Step 5: Generate JWT token
    const token = user.generateJWT();

    // ✅ Step 6: Set token in cookie
    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
    });

    // ✅ Step 7: Success response
    res.status(200).json({
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
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

export default loginController;
