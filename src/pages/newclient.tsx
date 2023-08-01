import React, { useState } from "react";
import { addClient } from "@/api/client";
import router from "next/router";

let currentId = 1;

const initialFormData = {
  id: currentId,
  nome: "",
  idade: 0,
  email: "",
  cpf: "",
};

const AddClientForm: React.FC = () => {
  const [formData, setFormData] = useState(initialFormData);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      const { name, value } = e.target;
      console.log(value);

      let newValue: string | number = value;
      if (name === "idade") {
        newValue = parseInt(value, 10) || 0;
      }

      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: newValue,
      }));
      console.log(formData);
    } catch (error) {
      console.error("Erro ao atualizar formulário:", error);
    }
  };

  const handleAddUser = async () => {
    try {
      currentId++;
      formData.id = currentId;

      await addClient(formData);

      console.log("Arquivo JSON enviado:", formData);

      setFormData(initialFormData);
      alert("Usuário adicionado com sucesso!");
    } catch (error) {
      console.error("Erro ao adicionar usuário:", error);
      alert("Erro ao adicionar usuário. Por favor, tente novamente.");
    }
  };
  const backform = () => {
    router.push("/form");
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="flex flex-col items-center bg-white rounded-lg p-8 shadow-lg text-black">
        <h2 className="text-2xl font-bold mb-4">Adicionar Novo Usuário:</h2>
        <form onSubmit={handleAddUser} className="flex flex-col gap-2">
          <div className="flex flex-col gap-2">
            <label htmlFor="nome">Nome:</label>
            <input
              type="text"
              id="nome"
              name="nome"
              value={formData.nome}
              onChange={handleChange}
              className="border rounded-lg px-3 py-2"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="idade">Idade:</label>
            <input
              type="number"
              id="idade"
              name="idade"
              value={formData.idade}
              onChange={handleChange}
              className="border rounded-lg px-3 py-2"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="email">Email:</label>
            <input
              type="text"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="border rounded-lg px-3 py-2"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="cpf">CPF:</label>
            <input
              type="text"
              id="cpf"
              name="cpf"
              value={formData.cpf}
              onChange={handleChange}
              className="border rounded-lg px-3 py-2"
            />
          </div>
          <button
            onClick={handleAddUser}
            type="submit"
            className="bg-green-500 text-white px-4 py-2 rounded"
          >
            Adicionar Usuário
          </button>
        </form>
        <div className="mt-4">
          <button
            onClick={backform}
            className="bg-blue-300 text-white px-4 py-2 rounded"
          >
            Voltar
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddClientForm;
