# Dumbledore AI - Exam Evaluation Platform

Dumbledore AI is a modern, AI-powered web application designed for educators to streamline the exam evaluation process. It provides a clean, intuitive interface to manage, review, and analyze AI-graded answer sheets.

## ✨ Features

- **AI-Powered Evaluation:** Leverages AI to grade exam papers, providing detailed feedback and scores.
- **Document Upload:** Easily upload question papers, answer sheets, and marking schemes in PDF format.
- **Dashboard Overview:** At-a-glance statistics on total papers, average scores, and items pending review.
- **Flexible Views:** View evaluations in either a detailed list or a visual grid layout.
- **Detailed Analysis:** Dive into a specific evaluation to see the answer sheet PDF side-by-side with a question-by-question breakdown of AI feedback.
- **Responsive Design:** A fully responsive UI that works seamlessly on different screen sizes.
- **Modern Tech Stack:** Built with React, TypeScript, and Tailwind CSS, powered by Vite.

## 🚀 Getting Started

This project is set up to run in a local development environment using Vite.

### Prerequisites

- [Node.js](https://nodejs.org/) (version 18.x or later recommended)
- [npm](https://www.npmjs.com/) (usually comes with Node.js)

### Installation & Setup

1.  **Clone the repository (if you haven't already).**

2.  **Install dependencies:**
    Run the following command in the project's root directory:
    ```bash
    npm install
    ```

3.  **Add a sample PDF:**
    Create a `public` directory in the root of the project. Place a sample PDF file inside it and name it `sample.pdf`. This file will be used for the PDF viewer in the evaluation detail view.

4.  **Run the development server:**
    Once the dependencies are installed, you can start the development server:
    ```bash
    npm run dev
    ```
    This will start the Vite development server, typically on `http://localhost:5173`. Open this URL in your browser to see the application.

## 📂 Project Structure

The project is organized into the following main directories:

```
/
├── public/           # Static assets (e.g., sample.pdf)
├── src/              # All application source code
│   ├── components/   # Reusable UI components
│   ├── constants.ts  # Mock data
│   ├── types.ts      # TypeScript type definitions
│   ├── App.tsx       # Main application component
│   └── index.tsx     # Application entry point
├── package.json      # Project dependencies and scripts
└── vite.config.ts    # Vite configuration
```