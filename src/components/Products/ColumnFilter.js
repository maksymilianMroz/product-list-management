const ColumnFilter = ({ column }) => {
  const { filterValue, setFilter } = column;

  return (
    <span className="column-filter">
      Search{" "}
      <input
        value={filterValue || ""}
        onChange={(e) => setFilter(e.target.value)}
        className="column-filter-input"
      />
    </span>
  );
};

export default ColumnFilter;
