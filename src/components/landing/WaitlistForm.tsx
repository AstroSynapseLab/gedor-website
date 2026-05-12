// src/components/landing/WaitlistForm.tsx
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { z } from 'zod';

import { FieldError } from '@/components/FieldError';
import { ToggleGroup } from '@/components/ToggleGroup';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const FREE_DOMAINS = new Set([
  'gmail.com',
  'googlemail.com',
  'yahoo.com',
  'yahoo.co.uk',
  'yahoo.fr',
  'yahoo.de',
  'yahoo.es',
  'yahoo.it',
  'yahoo.com.au',
  'hotmail.com',
  'hotmail.co.uk',
  'hotmail.fr',
  'hotmail.de',
  'hotmail.es',
  'hotmail.it',
  'outlook.com',
  'outlook.co.uk',
  'outlook.fr',
  'outlook.de',
  'live.com',
  'live.co.uk',
  'live.fr',
  'msn.com',
  'icloud.com',
  'me.com',
  'mac.com',
  'aol.com',
  'aol.co.uk',
  'mail.com',
  'gmx.com',
  'gmx.net',
  'gmx.de',
  'web.de',
  'yandex.com',
  'yandex.ru',
  'yandex.ua',
  'protonmail.com',
  'proton.me',
  'pm.me',
  'tutanota.com',
  'tutanota.de',
  'tuta.io',
  'zohomail.com',
  'zoho.com',
  'fastmail.com',
  'fastmail.fm',
  'hey.com',
  'inbox.com',
  'rocketmail.com',
]);

const schema = z
  .object({
    email: z.string().email('Please enter a valid email address.'),
    useType: z.enum(['personal', 'company']),
    role: z.string().optional(),
    industry: z.string().optional(),
    country: z.string().min(1, 'Please select your country.'),
    usage: z.enum(['light', 'heavy']),
    gdpr: z.boolean().refine(v => v === true, {
      message: 'Please accept the data processing consent to continue.',
    }),
  })
  .superRefine((data, ctx) => {
    if (data.useType === 'personal' && !data.role) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Please select your role, or choose "Prefer not to say".',
        path: ['role'],
      });
    }
    if (data.useType === 'company') {
      if (!data.industry) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Please select your company's industry.",
          path: ['industry'],
        });
      }
      const domain = data.email.split('@')[1]?.toLowerCase();
      if (domain && FREE_DOMAINS.has(domain)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Please use your work email - personal mailboxes are not accepted for company sign-ups.',
          path: ['email'],
        });
      }
    }
  });

type FormData = z.infer<typeof schema>;

const ROLES = [
  'Software Developer / Engineer',
  'Data Scientist / ML Engineer',
  'DevOps / Platform Engineer',
  'Designer / UX',
  'Student',
  'Teacher / Educator',
  'Researcher / Academic',
  'Freelancer / Consultant',
  'Content Creator',
  'Other',
  'Prefer not to say',
] as const;

const INDUSTRIES = [
  'Software & Technology',
  'Finance & Banking',
  'Healthcare & Life Sciences',
  'Legal & Compliance',
  'E-commerce & Retail',
  'Manufacturing & Industry',
  'Government & Public Sector',
  'Education & Research',
  'Media & Entertainment',
  'Logistics & Supply Chain',
  'Other',
] as const;

const COUNTRIES = [
  'Croatia',
  'Germany',
  'France',
  'Netherlands',
  'Austria',
  'Slovenia',
  'Italy',
  'Spain',
  'Poland',
  'Sweden',
  'Denmark',
  'Finland',
  'Belgium',
  'Portugal',
  'Czech Republic',
  'Romania',
  'Hungary',
  'United Kingdom',
  'Switzerland',
  'Norway',
  'Other EU',
  'Outside EU',
] as const;

const STORAGE_KEY = 'gedorai_waitlist';

const getEntries = (): { email: string }[] => {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '[]');
  } catch {
    return [];
  }
};

const WaitlistForm = () => {
  const [success, setSuccess] = useState<boolean>(false);
  const [count, setCount] = useState<number>(247);

  const {
    register,
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { useType: 'personal', usage: 'light', gdpr: false },
  });

  const useType = watch('useType');
  const usage = watch('usage');

  useEffect(() => {
    setCount(247 + getEntries().length);
  }, []);

  const onSubmit = async (data: FormData) => {
    await new Promise(r => setTimeout(r, 700));
    const entries = getEntries();
    if (!entries.some(e => e.email === data.email)) {
      entries.push({ ...data, ts: Date.now() } as never);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
      setCount(247 + entries.length);
    }
    setSuccess(true);
  };

  if (success) {
    return (
      <div className='bg-gedor-teal/[0.06] border-gedor-teal/20 text-gedor-teal mt-3 animate-[fadeUp_0.4s_ease] rounded-xl border px-[18px] py-[18px] text-center font-mono text-[12px] leading-[1.7] backdrop-blur-xl'>
        ✓ You're on the list.
        <br />
        <span className='text-[11px] opacity-70'>We'll reach out before launch. No spam, ever.</span>
      </div>
    );
  }

  return (
    <>
      <form
        id='waitlist-form'
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        className='relative flex flex-col gap-4 rounded-xl border border-white/10 bg-white/4 px-7 pt-7 pb-6 shadow-[0_0_0_1px_rgba(255,255,255,0.04)_inset,0_12px_48px_rgba(0,0,0,0.5),0_0_80px_rgba(160,109,212,0.06)] backdrop-blur-2xl'
      >
        <div className='mb-4'>
          <ToggleGroup
            options={[
              { value: 'personal', label: 'Personal Use' },
              { value: 'company', label: 'Company Use' },
            ]}
            value={useType}
            onChange={v => setValue('useType', v as 'personal' | 'company', { shouldValidate: false })}
          />
        </div>

        <div className='flex flex-col items-start gap-2.5'>
          <Label className='text-foreground block font-mono text-sm uppercase'>Email</Label>
          <Input
            id='wl-email'
            type='email'
            placeholder='you@company.com'
            autoComplete='email'
            aria-invalid={!!errors.email}
            className='glass-input'
            {...register('email')}
          />
          <FieldError message={errors.email?.message} />
        </div>

        {useType === 'personal' && (
          <div className='flex flex-col items-start gap-2.5'>
            <Label className='text-foreground font-mono text-sm uppercase'>What best describes you?</Label>
            <Controller
              name='role'
              control={control}
              render={({ field }) => (
                <Select onValueChange={field.onChange} value={field.value ?? ''}>
                  <SelectTrigger aria-invalid={!!errors.role} className='glass-trigger'>
                    <SelectValue placeholder='Select your role' />
                  </SelectTrigger>
                  <SelectContent>
                    {ROLES.map(r => (
                      <SelectItem key={r} value={r}>
                        {r}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
            <FieldError message={errors.role?.message} />
          </div>
        )}

        {useType === 'company' && (
          <div className='flex flex-col items-start gap-2.5'>
            <Label className='text-foreground font-mono text-sm uppercase'>Company Industry</Label>
            <Controller
              name='industry'
              control={control}
              render={({ field }) => (
                <Select onValueChange={field.onChange} value={field.value ?? ''}>
                  <SelectTrigger aria-invalid={!!errors.industry} className='glass-trigger'>
                    <SelectValue placeholder='Select industry' />
                  </SelectTrigger>
                  <SelectContent>
                    {INDUSTRIES.map(i => (
                      <SelectItem key={i} value={i}>
                        {i}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
            <FieldError message={errors.industry?.message} />
          </div>
        )}

        <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
          <div className='flex flex-col gap-2.5'>
            <Label className='text-foreground font-mono text-sm uppercase'>Country</Label>
            <Controller
              name='country'
              control={control}
              render={({ field }) => (
                <Select onValueChange={field.onChange} value={field.value ?? ''}>
                  <SelectTrigger aria-invalid={!!errors.country} className='glass-trigger'>
                    <SelectValue placeholder='Select country' />
                  </SelectTrigger>
                  <SelectContent>
                    {COUNTRIES.map(c => (
                      <SelectItem key={c} value={c}>
                        {c}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
            <FieldError message={errors.country?.message} />
          </div>

          <div className='flex flex-col gap-2.5'>
            <Label className='text-foreground font-mono text-sm uppercase'>Expected Usage</Label>
            <ToggleGroup
              options={[
                { value: 'light', label: 'Light' },
                { value: 'heavy', label: 'Heavy' },
              ]}
              value={usage}
              onChange={v => setValue('usage', v as 'light' | 'heavy')}
              small
            />
          </div>
        </div>

        <div className='mt-4'>
          <label className='group flex cursor-pointer items-start gap-4'>
            <Controller
              name='gdpr'
              control={control}
              render={({ field }) => (
                <Checkbox
                  id='gdpr-consent'
                  checked={field.value}
                  onCheckedChange={field.onChange}
                  aria-invalid={!!errors.gdpr}
                  className='data-[state=checked]:bg-primary/15 data-[state=checked]:border-primary/50 group-hover:border-primary/35 mt-0.5 size-5 shrink-0 rounded border-white/10'
                />
              )}
            />
            <div className='text-foreground text-left text-sm'>
              I agree to gedor.ai storing and processing my information to manage my waitlist request. <br /> I can
              withdraw consent at any time by emailing{' '}
              <a
                href='mailto:privacy@gedor.ai'
                className='text-primary border-primary/30 hover:border-primary border-b no-underline transition-[border-color] duration-200'
              >
                privacy@gedor.ai
              </a>
              . See our{' '}
              <a
                href='/privacy-policy'
                className='text-primary border-primary/30 hover:border-primary border-b no-underline transition-[border-color] duration-200'
              >
                Privacy Policy
              </a>
              .
            </div>
          </label>
          <FieldError message={errors.gdpr?.message} />
        </div>

        <Button
          type='submit'
          disabled={isSubmitting}
          className='from-primary to-secondary relative mt-4 h-auto w-full cursor-pointer overflow-hidden rounded-[11px] border-0 bg-linear-to-br py-4 font-mono text-sm font-medium text-white shadow-[0_2px_20px_rgba(160,109,212,0.35)] transition-[transform,box-shadow,opacity] duration-150 hover:-translate-y-px hover:shadow-[0_4px_28px_rgba(160,109,212,0.55)] active:translate-y-0 disabled:cursor-default disabled:opacity-50'
        >
          <span className='pointer-events-none absolute inset-0 bg-linear-to-b from-white/18 to-transparent' />
          {isSubmitting ? 'SUBMITTING…' : 'REQUEST EARLY ACCESS'}
        </Button>
      </form>

      <div className='text-foreground mt-4 flex items-center justify-center gap-2 text-center font-mono text-sm font-bold'>
        <span className='text-primary text-base font-bold'>{count.toLocaleString()}</span> developers already waiting
      </div>
    </>
  );
};

export default WaitlistForm;
