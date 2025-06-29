import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function sendEmail(payload: {
  email: string;
  message: string;
}) {
  const { data, error } = await resend.emails.send({
    from: 'Fishkido <onboarding@resend.dev>',
    to: payload.email,
    subject: `New message from Fishkido`,
    text: payload.message,
  });

  if (error) {
    throw error;
  }

  return data;
}
