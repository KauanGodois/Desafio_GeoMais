// components/FilterButton.js
import React from 'react';

const FilterButton = ({ searchTerm, handleSearch, fetchData }) => (
  <div>
    <label>
      Pesquisar por Nome ou CPF:
      <input
        type="text"
        value={searchTerm}
        onChange={e => handleSearch(e.target.value)}
      />
    </label>
    <button onClick={fetchData}>Filtrar</button>
  </div>
);

export default FilterButton;
