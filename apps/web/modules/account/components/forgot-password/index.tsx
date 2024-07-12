'use client';

import { useState } from 'react';

import { ForgotPasswordForm } from './ForgotPasswordForm';
import { ResetPasswordForm } from './ResetPasswordForm';

export function ForgotAndResetPasswordForm() {
  const [email, setEmail] = useState<string>();

  if (!email) {
    return <ForgotPasswordForm onCompleted={(email) => setEmail(email)} />;
  }

  return <ResetPasswordForm email={email} />;
}
