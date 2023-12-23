import React, { useState, useEffect } from 'react';
import './App.css';
import PersonForm from './components/PersonForm';
import PersonList from './components/PersonList';

function App() {
  const [data, setData] = useState([]);
  const [formData, setFormData] = useState({
    nome: '',
    cpf: '',
    rg: '',
    dataNascimento: '',
    sexo: 'Masculino',
  });
  const [editingPerson, setEditingPerson] = useState(null);
  const [totalPeople, setTotalPeople] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchData();
  }, [searchTerm]);

  const fetchData = () => {
    let endpoint = 'http://localhost:8081/pessoas';

    if (searchTerm) {
      endpoint += `?q=${searchTerm}`;
    }

    fetch(endpoint)
      .then(response => response.json())
      .then(data => {
        setData(data);
        setTotalPeople(data.length); // Atualiza o total de pessoas
      })
      .catch(error => {
        console.error('Erro ao buscar dados da API:', error);
      });
  };

  const handleDelete = id => {
    fetch(`http://localhost:8081/pessoas/${id}`, {
      method: 'DELETE',
    })
      .then(() => {
        fetchData(); // Atualiza a lista após a exclusão
      })
      .catch(error => {
        console.error('Erro ao excluir pessoa:', error);
      });
  };

  const handleInputChange = e => {
    const { name, value } = e.target;

    // Aplica a máscara aos campos CPF e RG
    if (name === 'cpf') {
      setFormData({
        ...formData,
        [name]: formatCPF(value),
      });
    } else if (name === 'rg') {
      setFormData({
        ...formData,
        [name]: formatRG(value),
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const formatCPF = cpf => {
    cpf = cpf.replace(/\D/g, ''); // Remove caracteres não numéricos
    cpf = cpf.slice(0, 11); // Limita o CPF a no máximo 11 dígitos
    cpf = cpf.replace(/(\d{3})(\d)/, '$1.$2');
    cpf = cpf.replace(/(\d{3})(\d)/, '$1.$2');
    cpf = cpf.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
    return cpf;
  };

  const formatRG = rg => {
    rg = rg.replace(/\D/g, ''); // Remove caracteres não numéricos
    rg = rg.slice(0, 7); // Limita o RG a no máximo 7 dígitos
    rg = rg.replace(/(\d{2})(\d)/, '$1.$2');
    rg = rg.replace(/(\d{3})(\d)/, '$1.$2');
    rg = rg.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
    return rg;
  };

  const handleFormSubmit = e => {
    e.preventDefault();
  
    // Verifica se os campos obrigatórios estão preenchidos
    if (!formData.nome || !formData.cpf || !formData.rg || !formData.dataNascimento || !formData.sexo) {
      alert('Todos os campos são obrigatórios. Preencha todos os campos antes de cadastrar.');
      return;
    }
  
    if (editingPerson) {
      fetch(`http://localhost:8081/pessoas/${editingPerson}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })
        .then(response => response.json())
        .then(() => {
          setEditingPerson(null);
          setFormData({
            nome: '',
            cpf: '',
            rg: '',
            dataNascimento: '',
            sexo: '',
          });
          fetchData(); // Atualiza a lista após a edição
        })
        .catch(error => {
          console.error('Erro ao editar pessoa:', error);
        });
    } else {
      fetch('http://localhost:8081/pessoas', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })
        .then(response => response.json())
        .then(() => {
          setFormData({
            nome: '',
            cpf: '',
            rg: '',
            dataNascimento: '',
            sexo: '',
          });
          fetchData(); // Atualiza a lista após o cadastro
        })
        .catch(error => {
          console.error('Erro ao cadastrar pessoa:', error);
        });
    }
  };

  const handleEdit = person => {
    // Preenche o formulário com os dados da pessoa a ser editada
    setEditingPerson(person.id);
    setFormData({
      nome: person.nome,
      cpf: person.cpf,
      rg: person.rg,
      dataNascimento: person.dataNascimento,
      sexo: person.sexo,
    });
  };

  const handleCancelEdit = () => {
    // Cancela a edição e limpa o formulário
    setEditingPerson(null);
    setFormData({
      nome: '',
      cpf: '',
      rg: '',
      dataNascimento: '',
      sexo: '',
    });
  };

  return (
    <div>
      <h1>Cadastro de Pessoas</h1>
      <PersonForm
        formData={formData}
        handleInputChange={handleInputChange}
        handleFormSubmit={handleFormSubmit}
        editingPerson={editingPerson}
        handleCancelEdit={handleCancelEdit}
      />
      <p>Total de Pessoas Cadastradas: {totalPeople}</p>
      <PersonList data={data} handleEdit={handleEdit} handleDelete={handleDelete} />
      
    </div>
  );
}

export default App;
