export const emailService = {
  sendEmail: async (data: { name: string; email: string; subject: string; message: string }): Promise<{ success: boolean }> => {
    const response = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      return { success: false };
    }
    return response.json();
  },
};
