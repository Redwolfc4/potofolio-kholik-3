type ContactApiResponse = {
  success: boolean;
  statusCode: number;
  timestamp: string;
  path: string;
  method: string;
  requestId: string;
  message: string;
  error?: string;
};

export const emailService = {
  sendEmail: async (data: {
    name: string;
    email: string;
    subject: string;
    message: string;
  }): Promise<ContactApiResponse> => {
    const response = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    const payload = (await response.json()) as ContactApiResponse;

    if (!response.ok) {
      return payload;
    }

    return payload;
  },
};
