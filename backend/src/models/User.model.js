import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const userSchema = new mongoose.Schema({
  googleId: {
    type: String,
    unique: true,
    sparse: true // optional field ke liye use hota hai
  },
  name: String,
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
  }
}, { timestamps: true });


// 🔐 1. MIDDLEWARE - Password Hash Before Save
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next(); // Agar password change nahi hua to skip
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// 🔐 2. METHOD - Compare Raw Password with Hashed
userSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

// 🔐 3. METHOD - Generate JWT Token
userSchema.methods.generateJWT = function () {
  const payload = {
    id: this._id,
    name: this.name,
    email: this.email,
    avatar: this.avatar
  };

  return jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: '7d'
  });
};

const User = mongoose.model('User', userSchema);
export default User;
