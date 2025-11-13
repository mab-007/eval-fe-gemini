const API_BASE_URL = 'http://localhost:3001/api';

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

export const apiService = {
  async getSubmissions(): Promise<SubmissionData[]> {
    try {
      const response = await fetch(`${API_BASE_URL}/submissions`);
      const result: ApiResponse<SubmissionData[]> = await response.json();

      if (result.success) {
        return result.data;
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
        return result.data;
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
      const response = await fetch(`${API_BASE_URL}/submissions/${id}/verify`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(verificationData),
      });

      const result: ApiResponse<SubmissionData> = await response.json();

      if (result.success) {
        return result.data;
      } else {
        throw new Error(result.message || 'Failed to verify submission');
      }
    } catch (error) {
      console.error(`Error verifying submission ${id}:`, error);
      throw error;
    }
  }
};
