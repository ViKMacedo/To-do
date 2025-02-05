interface FilterProps {
    filter: any;
    setFilter: React.Dispatch<React.SetStateAction<string>>;
    setSort: React.Dispatch<React.SetStateAction<string>>;
  }

const Filter: React.FC<FilterProps> = ({filter, setFilter, setSort}) => {
  return (
    <div className="filter">
      <h2>Filter</h2>
      <div className="filter-option">
        <div>
            <p>Status</p>
            <select value={filter} onChange={(e) => setFilter(e.target.value)}>
                <option value="All">Todos</option>
                <option value="Completed">Completas</option>    
                <option value="Incomplete">Incompletas</option>
            </select>
        </div>
        <div>
            <p>Ordem alfabética:</p>
            <button onClick={() => setSort("Asc")}>Asc</button>
            <button onClick={() => setSort("Desc")}>Desc</button>
        </div>
      </div>
    </div>
  );
};

export default Filter;
