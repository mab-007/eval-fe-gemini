const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const Submission = require('./models/Submission');
const SubmissionHistory = require('./models/SubmissionHistory');

const app = express();
const PORT = 3001;

// MongoDB connection string
const MONGODB_URI = 'mongodb+srv://admin:dG7UPyfjurPaRUxB@ragim.l0t1l.mongodb.net/von_db?retryWrites=true&w=majority&appName=ragim';

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log('Connected to MongoDB successfully');
  })
  .catch((error) => {
    console.error('MongoDB connection error:', error);
  });

// Routes
app.get('/api/submissions', async (req, res) => {
  try {
    const submissions = await Submission.find().sort({ id: 1 });
    res.json({
      success: true,
      data: submissions,
      count: submissions.length
    });
  } catch (error) {
    console.error('Error fetching submissions:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch submissions',
      error: error.message
    });
  }
});

app.get('/api/submissions/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const submission = await Submission.findOne({ id });

    if (submission) {
      res.json({
        success: true,
        data: submission
      });
    } else {
      res.status(404).json({
        success: false,
        message: 'Submission not found'
      });
    }
  } catch (error) {
    console.error('Error fetching submission:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch submission',
      error: error.message
    });
  }
});

// Verify submission - moves old to history and updates with verified data
app.post('/api/submissions/:id/verify', async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const { questions, status, score_awarded, total_marks, description } = req.body;
    // Find the existing submission
    const existingSubmission = await Submission.findOne({ id });

    if (!existingSubmission) {
      return res.status(404).json({
        success: false,
        message: 'Submission not found'
      });
    }

    // Move old submission to history
    const historyEntry = new SubmissionHistory({
      original_submission_id: existingSubmission.id,
      student_name: existingSubmission.student_name,
      subject: existingSubmission.subject,
      status: existingSubmission.status,
      roll: existingSubmission.roll,
      download_url: existingSubmission.download_url,
      description: existingSubmission.description,
      score_awarded: existingSubmission?.score_awarded || 0,
      total_marks: existingSubmission.total_marks,
      questions: existingSubmission.questions,
      archived_reason: 'Verification completed'
    });

    await historyEntry.save();
    console.log(`Moved submission ${id} to history`);

    // Update the submission with verified data
    existingSubmission.questions = questions;
    existingSubmission.status = status || 'Graded';
    existingSubmission.score_awarded = score_awarded;
    existingSubmission.total_marks = total_marks;
    if (description) {
      existingSubmission.description = description;
    }

    await existingSubmission.save();
    console.log(`Updated submission ${id} with verified data`);

    res.json({
      success: true,
      message: 'Submission verified successfully',
      data: existingSubmission
    });

  } catch (error) {
    console.error('Error verifying submission:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to verify submission',
      error: error.message
    });
  }
});

// Health check
app.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    message: 'Server is running',
    database: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected'
  });
});

app.listen(PORT, () => {
  console.log(`Backend server running on http://localhost:${PORT}`);
});
