import { UserStatus } from '@/components/UserStatus'
import styles from '../page.module.css'
import { PageLinks } from '@/components/AppLinks';

export default function AboutUs() {
  return (
    <main className={styles.main}>
      <h1>About Us Page</h1>
      <h3>This page is accessible to everyone.</h3>
      <UserStatus />
      <PageLinks />
    </main>
  )
}
