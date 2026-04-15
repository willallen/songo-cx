'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { contactSchema, type ContactFormData } from '@/lib/validations';

const serviceOptions = [
  { value: '', label: 'Select a service (optional)' },
  { value: 'Migration', label: 'PureConnect Migration' },
  { value: 'Carrier/BYOC', label: 'Carrier Connectivity & BYOC' },
  { value: 'Flows & Bots', label: 'Architect Flows & Bots' },
  { value: 'Integrations', label: 'Data Actions & Integrations' },
  { value: 'WFM', label: 'WFM & Analytics' },
  { value: 'Other', label: 'Other / Not Sure' },
];

export default function ContactForm() {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    setStatus('submitting');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error('Failed');
      setStatus('success');
      reset();
    } catch {
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <div className="bg-cx-lighter border border-cx/20 rounded-2xl p-10 text-center">
        <div className="w-16 h-16 rounded-full bg-cx/10 flex items-center justify-center mx-auto mb-6">
          <svg className="w-8 h-8 text-cx" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
          </svg>
        </div>
        <h3 className="text-navy font-bold text-xl mb-3 tracking-tight">Message received.</h3>
        <p className="text-body">We&apos;ll be in touch within one business day.</p>
      </div>
    );
  }

  const inputBase =
    'w-full px-4 py-3.5 rounded-xl border text-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-cx/20 focus:border-cx bg-white';
  const inputClass = `${inputBase} border-gray-200 text-body placeholder:text-gray-400`;
  const inputErrorClass = `${inputBase} border-red-300 text-body placeholder:text-gray-400`;
  const labelClass = 'block text-sm font-medium text-navy mb-1.5';
  const errorClass = 'text-red-500 text-xs mt-1.5';

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <label htmlFor="name" className={labelClass}>
            Name <span className="text-red-400">*</span>
          </label>
          <input
            id="name"
            {...register('name')}
            className={errors.name ? inputErrorClass : inputClass}
            placeholder="Your name"
          />
          {errors.name && <p className={errorClass}>{errors.name.message}</p>}
        </div>
        <div>
          <label htmlFor="email" className={labelClass}>
            Email <span className="text-red-400">*</span>
          </label>
          <input
            id="email"
            type="email"
            {...register('email')}
            className={errors.email ? inputErrorClass : inputClass}
            placeholder="you@company.com"
          />
          {errors.email && <p className={errorClass}>{errors.email.message}</p>}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <label htmlFor="company" className={labelClass}>
            Company
          </label>
          <input
            id="company"
            {...register('company')}
            className={inputClass}
            placeholder="Company name"
          />
        </div>
        <div>
          <label htmlFor="phone" className={labelClass}>
            Phone
          </label>
          <input
            id="phone"
            type="tel"
            {...register('phone')}
            className={inputClass}
            placeholder="(555) 000-0000"
          />
        </div>
      </div>

      <div>
        <label htmlFor="service_interest" className={labelClass}>
          Service Interest
        </label>
        <select id="service_interest" {...register('service_interest')} className={inputClass}>
          {serviceOptions.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="message" className={labelClass}>
          Message
        </label>
        <textarea
          id="message"
          {...register('message')}
          className={`${inputClass} resize-none`}
          rows={5}
          placeholder="Tell us about your project or what you're trying to solve..."
        />
      </div>

      {status === 'error' && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-5 text-sm text-red-700 flex items-start gap-3">
          <svg className="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
          </svg>
          <div>
            Something went wrong. Please email us directly at{' '}
            <a href="mailto:hello@songocx.com" className="font-medium underline">
              hello@songocx.com
            </a>
          </div>
        </div>
      )}

      <button
        type="submit"
        disabled={status === 'submitting'}
        className="group w-full py-4 px-6 rounded-xl font-semibold bg-navy text-white hover:bg-cx transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed shadow-lg shadow-navy/10 hover:shadow-cx/20"
      >
        {status === 'submitting' ? (
          <span className="flex items-center justify-center gap-2">
            <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
            Sending...
          </span>
        ) : (
          'Send Message'
        )}
      </button>
    </form>
  );
}
