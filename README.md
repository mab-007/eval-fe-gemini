# Dumbledore AI - Exam Evaluation Platform

Dumbledore AI is a modern, AI-powered web application designed for educators to streamline the exam evaluation process. It provides a clean, intuitive interface to manage, review, and analyze AI-graded answer sheets.

## ✨ Features

- **AI-Powered Evaluation:** Leverages AI to grade exam papers, providing detailed feedback and scores.
- **Document Upload:** Easily upload question papers, answer sheets, and marking schemes in PDF format.
- **Dashboard Overview:** At-a-glance statistics on total papers, average scores, and items pending review.
- **Flexible Views:** View evaluations in either a detailed list or a visual grid layout.
- **Detailed Analysis:** Dive into a specific evaluation to see the answer sheet PDF side-by-side with a question-by-question breakdown of AI feedback.
- **Responsive Design:** A fully responsive UI that works seamlessly on different screen sizes.
- **Modern Tech Stack:** Built with React, TypeScript, and Vite for a fast and efficient development experience.

## 🛠️ Tech Stack

- **Frontend:** [React](https://react.dev/) & [TypeScript](https://www.typescriptlang.org/)
- **Build Tool:** [Vite](https://vitejs.dev/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **Icons:** [Lucide React](https://lucide.dev/)

## 🚀 Getting Started

This project uses [Vite](https://vitejs.dev/) for a fast, modern local development experience.

### Prerequisites

- [Node.js](https://nodejs.org/) (version 18 or newer recommended)
- [npm](https://www.npmjs.com/) (which comes bundled with Node.js)

### Running Locally

1.  **Clone the repository:**
    ```bash
    git clone <repository-url>
    cd <project-directory>
    ```

2.  **Install dependencies:**
    This command will download all the required packages defined in `package.json`.
    ```bash
    npm install
    ```

3.  **Add the sample PDF:**
    For the detail view to work, create a `public` folder in the project's root directory. Then, place a PDF file named `science-exam-paper.pdf` inside this `/public` folder.

4.  **Start the development server:**
    ```bash
    npm run dev
    ```
    This command will start the Vite development server and open the application in your default browser, usually at `http://localhost:5173`. The server supports Hot Module Replacement (HMR), so changes to your code will be reflected in the browser instantly.

## 📂 Project Structure

The project is organized into the following main directories:

```
/
├── public/           # Static assets (e.g., PDFs, images)
├── src/              # All application source code
│   ├── components/   # Reusable UI components
│   ├── types.ts      # TypeScript type definitions
│   ├── index.css     # Global styles and Tailwind imports
│   └── ...           # Other source files
├── index.html        # The main HTML entry point for Vite
├── package.json      # Project dependencies and scripts
├── vite.config.ts    # Vite configuration
└── README.md         # This file
```
