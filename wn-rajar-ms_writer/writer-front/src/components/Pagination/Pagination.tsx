import type { PaginationInfo } from "../../services/articleListService";
import styles from "./Pagination.module.css";

interface PaginationProps {
  pagination: PaginationInfo;
  onPageChange: (page: number) => void;
  onLimitChange: (limit: number) => void;
}

export default function Pagination({ pagination, onPageChange, onLimitChange }: PaginationProps) {
  const { page, limit, totalPages } = pagination;

  return (
    <nav className={styles.pagination} aria-label="Pagination des articles">
      <fieldset className={styles.limitControls}>
        <label htmlFor="limit">Afficher</label>
        <select
          id="limit"
          className={styles.select}
          value={limit}
          onChange={(e) => onLimitChange(Number(e.target.value))}
        >
          <option value={5}>5</option>
          <option value={10}>10</option>
        </select>
        <span className={styles.limitLabel}>articles</span>
      </fieldset>

      <menu className={styles.pageControls}>
        <li>
          <button
            className={styles.navButton}
            onClick={() => onPageChange(1)}
            disabled={page <= 1}
            aria-label="Première page"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <polyline points="11 17 6 12 11 7" />
              <polyline points="18 17 13 12 18 7" />
            </svg>
          </button>
        </li>
        <li>
          <button
            className={styles.navButton}
            onClick={() => onPageChange(page - 1)}
            disabled={page <= 1}
            aria-label="Page précédente"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>
        </li>

        <li className={styles.pageInfo} aria-current="page">
          <data className={styles.pageNumber} value={page}>{page}</data>
          <span className={styles.pageSeparator} aria-hidden="true">/</span>
          <data className={styles.pageTotal} value={totalPages}>{totalPages}</data>
        </li>

        <li>
          <button
            className={styles.navButton}
            onClick={() => onPageChange(page + 1)}
            disabled={page >= totalPages}
            aria-label="Page suivante"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>
        </li>
        <li>
          <button
            className={styles.navButton}
            onClick={() => onPageChange(totalPages)}
            disabled={page >= totalPages}
            aria-label="Dernière page"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <polyline points="13 17 18 12 13 7" />
              <polyline points="6 17 11 12 6 7" />
            </svg>
          </button>
        </li>
      </menu>
    </nav>
  );
}
