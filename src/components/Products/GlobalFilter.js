const GlobalFilter = ({ filter, setFilter }) => {
  return (
    <span className="global-filter">
      Search{" "}
      <input
        value={filter || ""}
        onChange={(e) => setFilter(e.target.value)}
        className="global-filter-input"
      />
    </span>
  );
};

export default GlobalFilter;
