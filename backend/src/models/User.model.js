import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const userSchema = new mongoose.Schema({
  googleId: {
    type: String,
    unique: true,
    sparse: true 
  },
  name: String,
  username: {
    type: String,
    lowercase: true,
    unique: true,
    required: true
  },
  email: {
    type: String,
    unique: true,
    lowercase: true,
    required: true
  },
  avatar: String,
  password: {
    type: String,
    required: true
  },
  friends: [
    {
      user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      since: { type: Date, default: Date.now }
    }
  ],

  // friend requests
  friendRequests: [
    {
      from: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      status: { type: String, enum: ['pending', 'accepted', 'declined'], default: 'pending' },
      sentAt: { type: Date, default: Date.now }
    }
  ]
}, { timestamps: true });


// 1. MIDDLEWARE - Password Hash Before Save
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// 2. METHOD - Compare Raw Password with Hashed
userSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

// 3. METHOD - Generate JWT Token
userSchema.methods.generateJWT = function () {
  const payload = {
    id: this._id,
    googleId: this.googleId,
    name: this.name,
    username: this.username,
    email: this.email,
    avatar: this.avatar
  };

  return jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: '7d'
  });
};


const User = mongoose.model('User', userSchema);
export default User;
