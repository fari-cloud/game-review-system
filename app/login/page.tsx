import { getSessionUser } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { LoginForm } from '@/components/LoginForm';

export default function LoginPage({
  searchParams,
}: {
  searchParams?: { next?: string };
}) {
  const session = getSessionUser();

  if (session) {
    redirect(searchParams?.next || '/');
  }

  return <LoginForm next={searchParams?.next || '/'} />;
}
