"use client"
import { UserStatus } from '@/components/UserStatus';
import styles from '../page.module.css'
import { PageLinks } from '@/components/AppLinks';
import { AuthGuard } from '@/components/AuthGuard';

export default function Profile() {
  return (
    <AuthGuard>
      <main className={styles.main}>
        <h1>Profile Page</h1>
        <UserStatus />
        <PageLinks />
      </main>
    </AuthGuard>
  )
}
