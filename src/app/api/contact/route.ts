import { createServerClient } from '@/lib/supabase';
import { Resend } from 'resend';
import { NextRequest, NextResponse } from 'next/server';
import { contactSchema } from '@/lib/validations';

export async function POST(req: NextRequest) {
  const body = await req.json();

  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: 'Invalid form data' }, { status: 400 });
  }

  const { name, email, company, phone, service_interest, message } = parsed.data;

  const supabase = createServerClient();
  const { error } = await supabase.from('leads').insert({
    name,
    email,
    company: company ?? null,
    phone: phone ?? null,
    service_interest: service_interest ?? null,
    message: message ?? null,
  });

  if (error) {
    console.error('Supabase insert error:', error);
    return NextResponse.json({ error: 'Failed to save' }, { status: 500 });
  }

  const resend = new Resend(process.env.RESEND_API_KEY);
  await resend.emails.send({
    from: 'notifications@songocx.com',
    to: process.env.NOTIFICATION_EMAIL!,
    subject: `New Songo CX inquiry: ${name} — ${service_interest ?? 'General'}`,
    text: [
      `Name: ${name}`,
      `Email: ${email}`,
      `Company: ${company ?? 'N/A'}`,
      `Phone: ${phone ?? 'N/A'}`,
      `Service: ${service_interest ?? 'N/A'}`,
      ``,
      `Message:`,
      message ?? '(no message)',
    ].join('\n'),
  });

  return NextResponse.json({ success: true });
}
