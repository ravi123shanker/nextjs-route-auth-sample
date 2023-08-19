"use client";
import Link from "next/link";
import styles from "../app/page.module.css";

const links = [
  { text: "public", route: "/" },
  { text: "About Us", route: "/about" },
  { text: "Dashboard", route: "/dashboard" },
  { text: "Profile", route: "/profile" },
  { text: "NextJS Docs", route: "https://nextjs.org/docs" },
];
export function PageLinks() {
  return (
    <div className={styles.links}>
      <ul>
        {links.map((link) => (
          <li key={link.route}>
            <Link href={link.route}>{link.text}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
