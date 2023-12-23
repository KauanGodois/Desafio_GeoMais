// components/PersonList.js
import React from 'react';

const PersonList = ({ data, handleEdit, handleDelete }) => (
  <div>
    <h2>Listagem de Pessoas</h2>
    <table>
      <thead>
        <tr>
          <th>Nome</th>
          <th>CPF</th>
          <th>RG</th>
          <th>Data de Nascimento</th>
          <th>Sexo</th>
          <th>Ações</th>
        </tr>
      </thead>
      <tbody>
        {data.map(person => (
          <tr key={person.id}>
            <td>{person.nome}</td>
            <td>{person.cpf}</td>
            <td>{person.rg}</td>
            <td>{person.dataNascimento}</td>
            <td>{person.sexo}</td>
            <td>
              <button onClick={() => handleEdit(person)}>Editar</button>
              <button onClick={() => handleDelete(person.id)}>Excluir</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default PersonList;
