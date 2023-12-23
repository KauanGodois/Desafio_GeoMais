// components/PersonForm.js
import React from 'react';

const PersonForm = ({ formData, handleInputChange, handleFormSubmit, editingPerson, handleCancelEdit }) => (
  <form onSubmit={handleFormSubmit}>
    <label>
      Nome:
      <input type="text" name="nome" value={formData.nome} onChange={handleInputChange} />
    </label>
    <label>
      CPF:
      <input type="text" name="cpf" value={formData.cpf} onChange={handleInputChange} />
    </label>
    <label>
      RG:
      <input type="text" name="rg" value={formData.rg} onChange={handleInputChange} />
    </label>
    <label>
      Data de Nascimento:
      <input
        type="text"
        name="dataNascimento"
        value={formData.dataNascimento}
        onChange={handleInputChange}
      />
    </label>
    <label>
      Sexo:
      <select name="sexo" value={formData.sexo} onChange={handleInputChange}>
        <option value="Masculino">Masculino</option>
        <option value="Feminino">Feminino</option>
      </select>
    </label>
    <button type="submit">{editingPerson ? 'Editar' : 'Cadastrar'}</button>
    {editingPerson && <button type="button" onClick={handleCancelEdit}>Cancelar Edição</button>}
  </form>
);

export default PersonForm;
