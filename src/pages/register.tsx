import { useState } from "react";
import axios from "axios";

const FormPage: React.FC = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:3000/user", formData);

      setFormData({
        email: "",
        password: "",
        name: "",
      });
      window.alert("Usuário cadastrado com sucesso!");
    } catch (error) {
      window.alert("Erro ao cadastrar o usuário. Tente novamente mais tarde.");
    }
  };

  return (
    <section className="flex items-center justify-center h-[100vh]">
      <div className="bg-white rounded-lg p-8 shadow-lg">
        <h2 className="text-2xl font-semibold mb-6">Formulário de Cadastro</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block font-medium mb-1">
              E-mail:
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="border border-gray-300 rounded-lg px-3 py-2 w-full"
            />
          </div>
          <div>
            <label htmlFor="password" className="block font-medium mb-1">
              Senha:
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="border border-gray-300 rounded-lg px-3 py-2 w-full"
            />
          </div>
          <div>
            <label htmlFor="name" className="block font-medium mb-1">
              Nome:
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="border border-gray-300 rounded-lg px-3 py-2 w-full"
            />
          </div>
          <button
            type="submit"
            className="bg-green-500 hover:bg-green-600 text-white font-medium rounded-lg px-4 py-2"
          >
            Cadastrar
          </button>
        </form>
      </div>
    </section>
  );
};

export default FormPage;
