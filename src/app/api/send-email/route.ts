import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY ?? 're_xxxxxxxxx');

export async function POST(request: Request) {
  try {
    const { name, email, company, message } = (await request.json()) as {
      name: string;
      email: string;
      company?: string;
      message: string;
    };

    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Name, email, and message are required.' }, { status: 400 });
    }

    await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: 'bst.agullo@gmail.com',
      subject: `New message from ${name}`,
      html: `
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        ${company ? `<p><strong>Company:</strong> ${company}</p>` : ''}
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, '<br/>')}</p>
      `,
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error('Resend email error:', error);
    return NextResponse.json({ error: 'Failed to send email.' }, { status: 500 });
  }
}
