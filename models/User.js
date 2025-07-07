import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide a name']
  },
  email: {
    type: String,
    required: [true, 'Please provide an email'],
    unique: true,
    match: [/.+\@.+\..+/, 'Please fill a valid email address']
  },
  password: {
    type: String,
    required: [true, 'Please provide a password'],
    minlength: 6,
    select: false
  },
  age: {
    type: Number,
  },
  gender: {
    type: String,
    enum: ['male', 'female', 'other'],
  },
  weight: {
    type: Number,
  },
  height: {
    type: Number,
  },
  targetCalories: {
    type: Number,
    default: 2000
  },
  targetProtein: {
    type: Number,
    default: 150
  },
  targetCarbs: {
    type: Number,
    default: 200
  },
  targetFat: {
    type: Number,
    default: 70
  },
  targetWater: {
    type: Number,
    default: 3000
  }
}, { timestamps: true })

UserSchema.pre('save', async function(next) {
  if (!this.isModified('password')) {
    next()
  }
  const salt = await bcrypt.genSalt(10)
  this.password = await bcrypt.hash(this.password, salt)
  next()
})

UserSchema.methods.comparePassword = async function(enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password)
}

export default mongoose.model('User', UserSchema)