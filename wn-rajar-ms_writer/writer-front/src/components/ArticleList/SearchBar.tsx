import "./SearchBar.css";

export type SearchBarType = {
  query: string;
};

type SearchBarProps = {
  searchBar: SearchBarType;
  onQueryChange: (newQuery: string) => void;
  onSearch: () => void;
};

export default function SearchBar({
  searchBar,
  onQueryChange,
  onSearch,
}: SearchBarProps) {
  const handleClear = () => {
    onQueryChange("");
    onSearch();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch();
  };

  return (
    <search>
      <form className="search-bar-container" onSubmit={handleSubmit} role="search">
        <svg
          className="search-bar-icon"
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <circle cx="11" cy="11" r="8" />
          <path d="m21 21-4.3-4.3" />
        </svg>
        <input
          type="search"
          value={searchBar.query}
          onChange={(e) => onQueryChange(e.target.value)}
          placeholder="Rechercher un article..."
          className="search-bar-input"
          aria-label="Rechercher un article"
        />
        {searchBar.query && (
          <button
            type="button"
            className="search-bar-clear"
            onClick={handleClear}
            aria-label="Effacer la recherche"
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M18 6 6 18M6 6l12 12" />
            </svg>
          </button>
        )}
        <button type="submit" className="search-bar-button">
          Rechercher
        </button>
      </form>
    </search>
  );
}
