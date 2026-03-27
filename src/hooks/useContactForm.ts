import { useState, useCallback } from 'react';

export interface ContactFormData {
  name: string;
  email: string;
  company: string;
  subject: string;
  message: string;
}

export interface ContactFormErrors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateContactForm(
  data: ContactFormData,
  t: (key: string) => string
): ContactFormErrors {
  const errors: ContactFormErrors = {};

  if (!data.name.trim()) {
    errors.name = t('contactPage.validation.nameRequired');
  } else if (data.name.trim().length < 2) {
    errors.name = t('contactPage.validation.nameMin');
  }

  if (!data.email.trim()) {
    errors.email = t('contactPage.validation.emailRequired');
  } else if (!EMAIL_REGEX.test(data.email)) {
    errors.email = t('contactPage.validation.emailInvalid');
  }

  if (!data.subject) {
    errors.subject = t('contactPage.validation.subjectRequired');
  }

  if (!data.message.trim()) {
    errors.message = t('contactPage.validation.messageRequired');
  } else if (data.message.trim().length < 10) {
    errors.message = t('contactPage.validation.messageMin');
  }

  return errors;
}

const initialData: ContactFormData = {
  name: '',
  email: '',
  company: '',
  subject: '',
  message: '',
};

export function useContactForm(t: (key: string) => string) {
  const [data, setData] = useState<ContactFormData>(initialData);
  const [errors, setErrors] = useState<ContactFormErrors>({});
  const [touched, setTouched] = useState<Set<string>>(new Set());
  const [submitted, setSubmitted] = useState(false);

  const setField = useCallback(
    (field: keyof ContactFormData, value: string) => {
      setData((prev) => ({ ...prev, [field]: value }));
      if (touched.has(field)) {
        setErrors((prev) => {
          const next = { ...prev };
          delete next[field as keyof ContactFormErrors];
          return next;
        });
      }
    },
    [touched]
  );

  const touchField = useCallback((field: string) => {
    setTouched((prev) => new Set(prev).add(field));
  }, []);

  const handleSubmit = useCallback(() => {
    const validationErrors = validateContactForm(data, t);
    setErrors(validationErrors);
    setTouched(new Set(['name', 'email', 'subject', 'message']));

    if (Object.keys(validationErrors).length === 0) {
      console.log('Contact form submitted:', data);
      setSubmitted(true);
      return true;
    }
    return false;
  }, [data, t]);

  const reset = useCallback(() => {
    setData(initialData);
    setErrors({});
    setTouched(new Set());
    setSubmitted(false);
  }, []);

  return { data, errors, touched, submitted, setField, touchField, handleSubmit, reset };
}
