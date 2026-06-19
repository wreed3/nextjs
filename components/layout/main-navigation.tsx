import Link from 'next/link';
import Logo from './logo';
import ThemeToggle from '../ui/theme-toggle';
import { ROUTES } from '@/lib/constants';
import styles from './main-navigation.module.css';

export default function MainNavigation() {
  return (
    <header className={styles.header}>
      <Link href={ROUTES.home}>
        <Logo />
      </Link>
      <nav className={styles.nav}>
        <ul>
          <li>
            <Link href={ROUTES.posts}>Posts</Link>
          </li>
          <li>
            <Link href={ROUTES.contact}>Contact</Link>
          </li>
          <li>
            <ThemeToggle />
          </li>
        </ul>
      </nav>
    </header>
  );
}