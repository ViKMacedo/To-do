const Filter = ({filter, setFilter}) => {
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
            <button>Asc</button>
            <button>Desc</button>
        </div>
      </div>
    </div>
  );
};

export default Filter;
