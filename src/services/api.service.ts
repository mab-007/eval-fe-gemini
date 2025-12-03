const API_BASE_URL = 'http://13.232.188.124:3001/api';

export interface SubmissionData {
  id: number;
  student_name: string;
  subject: string;
  status: string;
  roll: string;
  download_url: string;
  description: string;
  score_awarded: number;
  total_marks: number;
  questions: any[];
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  count?: number;
  message?: string;
}

// Helper function to convert relative PDF paths to public folder paths
const getAbsolutePdfUrl = (relativePath: string): string => {
  // If already an absolute URL, return as-is
  if (relativePath.startsWith('http://') || relativePath.startsWith('https://')) {
    return relativePath;
  }

  // Remove leading ./ if present
  const cleanPath = relativePath.startsWith('./') ? relativePath.slice(2) : relativePath;

  // Return path relative to public folder
  // Vite serves files from public folder at root level
  return `/${cleanPath}`;
};

export const apiService = {
  async getSubmissions(): Promise<SubmissionData[]> {
    try {
      const response = await fetch(`${API_BASE_URL}/submissions`);
      const result: ApiResponse<SubmissionData[]> = await response.json();

      if (result.success) {
        // Convert relative PDF paths to absolute URLs
        return result.data.map(submission => ({
          ...submission,
          download_url: getAbsolutePdfUrl(submission.download_url)
        }));
      } else {
        throw new Error('Failed to fetch submissions');
      }
    } catch (error) {
      console.error('Error fetching submissions:', error);
      throw error;
    }
  },

  async getSubmissionById(id: number): Promise<SubmissionData> {
    try {
      const response = await fetch(`${API_BASE_URL}/submissions/${id}`);
      const result: ApiResponse<SubmissionData> = await response.json();

      if (result.success) {
        // Convert relative PDF path to absolute URL
        return {
          ...result.data,
          download_url: getAbsolutePdfUrl(result.data.download_url)
        };
      } else {
        throw new Error(result.message || 'Submission not found');
      }
    } catch (error) {
      console.error(`Error fetching submission ${id}:`, error);
      throw error;
    }
  },

  async verifySubmission(id: number, verificationData: {
    questions: any[];
    status: string;
    score_awarded: number;
    total_marks: number;
    description?: string;
  }): Promise<SubmissionData> {
    try {
      console.log('Verifying submission:', verificationData);
      console.log('Submission ID:', id);
      const response = await fetch(`${API_BASE_URL}/submissions/${id}/verify`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(verificationData),
      });

      const result: ApiResponse<SubmissionData> = await response.json();

      if (result.success) {
        // Convert relative PDF path to absolute URL
        return {
          ...result.data,
          download_url: getAbsolutePdfUrl(result.data.download_url)
        };
      } else {
        throw new Error(result.message || 'Failed to verify submission');
      }
    } catch (error) {
      console.error(`Error verifying submission ${id}:`, error);
      throw error;
    }
  }
};
