const mongoose = require('mongoose');

const QuestionSchema = new mongoose.Schema({
  score_awarded: { type: Number, required: true },
  y_coordinate: { type: Number },
  student_answer: { type: String },
  scoring_breakdown: [{ type: mongoose.Schema.Types.Mixed }],
  feedback: { type: String },
  mistakes_made: [{ type: mongoose.Schema.Types.Mixed }],
  student_approach: { type: String },
  question_summary: { type: String },
  question_number: { type: Number },
  question_text: { type: String },
  marks_available: { type: Number },
  is_optional: { type: Boolean },
  sub_part: { type: String }
}, { _id: false });

const SubmissionHistorySchema = new mongoose.Schema({
  original_submission_id: { type: Number, required: true },
  student_name: { type: String, required: true },
  subject: { type: String, required: true },
  status: {
    type: String,
    required: true,
    enum: ['Graded', 'Needs Review', 'Processing']
  },
  roll: { type: String, required: true },
  download_url: { type: String, required: true },
  description: { type: String },
  score_awarded: { type: Number, required: true },
  total_marks: { type: Number, required: true },
  questions: [QuestionSchema],
  archived_at: { type: Date, default: Date.now },
  archived_reason: { type: String, default: 'Verification completed' }
}, {
  timestamps: true,
  collection: 'submission_history'
});

module.exports = mongoose.model('SubmissionHistory', SubmissionHistorySchema);
