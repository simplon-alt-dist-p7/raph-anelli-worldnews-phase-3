import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContent}>
        <p>World News</p>
        <p>Raphaël A, Alexis, Jules, Aline, Raphaël E</p>
      </div>
    </footer>
  );
}
