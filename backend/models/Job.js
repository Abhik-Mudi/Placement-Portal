import mongoose from "mongoose";

const JobSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  company: {
    type: String,
    required: true
  },
  jobUrl: {
    type: String,
    required: true,
    unique: true 
  },
  status: {
    type: String,
    enum: ['Saved', 'Applied', 'Interviewing', 'Rejected'],
    default: 'Saved'
  },
  dateScraped: {
    type: Date,
    default: Date.now
  }
});

const Job = mongoose.model("Job", JobSchema);

export default Job;