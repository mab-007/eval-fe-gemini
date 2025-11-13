# Final Results Export Feature

## Overview
When a teacher completes the verification of all questions in an answer sheet, the application automatically generates and downloads a comprehensive JSON file containing all evaluation data and updates.

## When It Triggers
The final results are automatically saved when:
1. All questions have been verified (checked with the green checkmark)
2. The celebration modal appears

## File Output

### File Name Format
```
final-result-{student-name}-{timestamp}.json
```

Example: `final-result-test-student-1699876543210.json`

### File Location
The file is automatically downloaded to the user's default downloads folder.

## JSON Structure

The exported JSON file contains the following structure:

```json
{
  "student_name": "Student Name",
  "evaluation_date": "ISO 8601 timestamp",
  "total_questions": 16,
  "verified_questions": 16,
  "questions": [
    {
      "question_number": 1,
      "score_awarded": 5,
      "marks_available": 5,
      "parts_breakdown": [
        {
          "part": "a",
          "marks": 2
        },
        {
          "part": "b",
          "marks": 3
        }
      ],
      "question_text": "Question text...",
      "student_answer": "Student's answer...",
      "feedback": "Teacher's feedback...",
      "mistakes_made": [...],
      "scoring_breakdown": [...],
      "is_verified": true
    }
  ],
  "total_score": 85,
  "total_marks_available": 100,
  "percentage": 85
}
```

## Fields Description

### Top-Level Fields
- **student_name**: Name of the student
- **evaluation_date**: ISO 8601 formatted timestamp of when the evaluation was completed
- **total_questions**: Total number of questions in the evaluation
- **verified_questions**: Number of questions verified by the teacher
- **total_score**: Sum of all scores awarded across all questions
- **total_marks_available**: Sum of all available marks across all questions
- **percentage**: Overall percentage score (rounded to nearest integer)

### Question Fields
Each question object contains:
- **question_number**: Question identifier
- **score_awarded**: Marks awarded to student (can be modified by teacher)
- **marks_available**: Total marks available for this question (can be modified by teacher)
- **parts_breakdown**: Array of sub-parts with individual marks
  - **part**: Part identifier (a, b, c, etc.)
  - **marks**: Marks for this specific part
- **question_text**: The original question text
- **student_answer**: Student's submitted answer
- **feedback**: AI-generated or teacher-added feedback
- **mistakes_made**: Array of identified mistakes with details
- **scoring_breakdown**: Detailed breakdown of how marks were awarded
- **is_verified**: Boolean indicating if teacher verified this question

## Manual Download

Teachers can also manually download the results by:
1. Clicking the "Download Results (JSON)" button in the celebration modal
2. This allows re-downloading if the automatic download was missed

## Use Cases

### 1. Record Keeping
Store evaluation results for institutional records and future reference.

### 2. Analytics
Process the JSON data to generate:
- Class performance reports
- Question difficulty analysis
- Common mistake patterns
- Grade distributions

### 3. System Integration
Import the data into:
- Learning Management Systems (LMS)
- Student Information Systems (SIS)
- Grade books
- Analytics dashboards

### 4. Audit Trail
Maintain a complete record of:
- Original AI evaluation
- Teacher modifications
- Parts breakdown updates
- Verification status

## Example Usage in Code

The `saveFinalResults()` function is automatically called when all questions are verified:

```typescript
const saveFinalResults = () => {
  const finalResults = {
    student_name: studentName,
    evaluation_date: new Date().toISOString(),
    total_questions: questions.length,
    verified_questions: verifiedQuestions.size,
    questions: questions.map(q => ({
      question_number: q.question_number,
      score_awarded: q.score_awarded,
      marks_available: q.marks_available,
      parts_breakdown: q.parts_breakdown || [],
      question_text: q.question_text,
      student_answer: q.student_answer,
      feedback: q.feedback,
      mistakes_made: q.mistakes_made,
      scoring_breakdown: q.scoring_breakdown,
      is_verified: verifiedQuestions.has(q.question_number)
    })),
    total_score: questions.reduce((sum, q) => sum + q.score_awarded, 0),
    total_marks_available: questions.reduce((sum, q) => sum + q.marks_available, 0),
    percentage: Math.round((questions.reduce((sum, q) => sum + q.score_awarded, 0) /
                           questions.reduce((sum, q) => sum + q.marks_available, 0)) * 100)
  };

  // Create and download file
  const blob = new Blob([JSON.stringify(finalResults, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `final-result-${studentName.replace(/\s+/g, '-').toLowerCase()}-${Date.now()}.json`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};
```

## Sample Output

See `sample-final-result-data.json` for a complete example of the exported data structure.

## Benefits

1. **Traceability**: Complete record of all evaluation changes
2. **Transparency**: Shows both AI assessment and teacher modifications
3. **Flexibility**: JSON format allows easy parsing and integration
4. **Completeness**: Includes all relevant data in one file
5. **Automation**: No manual export needed - happens automatically on completion
