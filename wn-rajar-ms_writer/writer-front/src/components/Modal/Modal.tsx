import styles from "./Modal.module.css";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  message: string;
  type: "success" | "error" | "info";
}

export default function Modal({ isOpen, onClose, title, message, type }: ModalProps) {
  if (!isOpen) return null;

  return (
    <aside className={styles.overlay} onClick={onClose} role="dialog" aria-modal="true" aria-labelledby="modal-title">
      <dialog className={styles.modal} onClick={(e) => e.stopPropagation()} data-type={type} open>
        <header className={styles.header}>
          <h2 id="modal-title" className={styles.title}>{title}</h2>
        </header>
        <p className={styles.message}>{message}</p>
        <footer className={styles.footer}>
          <button className={styles.button} onClick={onClose} autoFocus>
            Compris
          </button>
        </footer>
      </dialog>
    </aside>
  );
}
