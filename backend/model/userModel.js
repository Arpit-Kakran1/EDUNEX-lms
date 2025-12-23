import mongoose, { Mongoose } from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
  },
  role: {
    type: String,
    emum: ["student", "educator"],
    required: true
  },
  photoUrl: {
    type: String,
    default: ""
  },
  enrolledCourses: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course'
  }]
}, { timestamps: true });

const User = mongoose.model("User", userSchema);

export default User;