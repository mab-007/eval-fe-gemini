const mongoose = require('mongoose');
const Submission = require('./models/Submission');
const submissionsData = require('./data/submissions.json');

const MONGODB_URI = 'mongodb+srv://admin:dG7UPyfjurPaRUxB@ragim.l0t1l.mongodb.net/von_db?retryWrites=true&w=majority&appName=ragim';

async function migrate() {
  try {
    // Connect to MongoDB
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB successfully');

    // Clear existing data
    await Submission.deleteMany({});
    console.log('Cleared existing submissions');

    // Insert new data
    const result = await Submission.insertMany(submissionsData);
    console.log(`Successfully inserted ${result.length} submissions`);

    // Display inserted data
    console.log('\nInserted submissions:');
    result.forEach(sub => {
      console.log(`- ID: ${sub.id}, Student: ${sub.student_name}, Status: ${sub.status}`);
    });

    // Close connection
    await mongoose.connection.close();
    console.log('\nMigration completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Migration failed:', error);
    process.exit(1);
  }
}

// Run migration
migrate();
