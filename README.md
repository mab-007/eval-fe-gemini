# Dumbledore AI - Exam Evaluation Platform

Dumbledore AI is a modern, AI-powered web application designed for educators to streamline the exam evaluation process. It provides a clean, intuitive interface to manage, review, and analyze AI-graded answer sheets.

## ✨ Features

- **AI-Powered Evaluation:** Leverages AI to grade exam papers, providing detailed feedback and scores.
- **Document Upload:** Easily upload question papers, answer sheets, and marking schemes in PDF format.
- **Dashboard Overview:** At-a-glance statistics on total papers, average scores, and items pending review.
- **Flexible Views:** View evaluations in either a detailed list or a visual grid layout.
- **Detailed Analysis:** Dive into a specific evaluation to see the answer sheet PDF side-by-side with a question-by-question breakdown of AI feedback.
- **Responsive Design:** A fully responsive UI that works seamlessly on different screen sizes.
- **Zero Installation:** Runs directly in the browser using CDN-hosted libraries, with no build step required.

## 🚀 Getting Started

This project is a zero-configuration application that runs directly in your web browser without needing a local development server or any installation steps.

### How to Run

1.  Make sure all the project files are in the same directory structure.
2.  Open the `index.html` file in a modern web browser that supports ES modules (like Chrome, Firefox, Safari, or Edge).

That's it! The application will load all necessary libraries (React, Tailwind CSS) from a CDN and run.

## 📂 Project Structure

The project is organized into the following main directories:

```
/
├── src/              # All application source code
│   ├── components/   # Reusable UI components
│   ├── constants.ts  # Mock data
│   ├── types.ts      # TypeScript type definitions
│   ├── App.tsx       # Main application component
│   └── index.tsx     # Application entry point
└── index.html        # Main HTML file
```