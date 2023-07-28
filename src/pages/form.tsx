import { useEffect, useState } from "react";
import axios from "axios";

interface UserData {
  id: number;
  nome: string;
  idade: number;
  email: string;
  cpf: string;
}

const UserForm: React.FC = () => {
  const [data, setData] = useState<UserData[]>([]);
  const [editingItem, setEditingItem] = useState<UserData | null>(null);
  const [formData, setFormData] = useState({
    nome: "",
    idade: "",
    email: "",
    cpf: "",
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:3000/clients");
      setData(response.data);
    } catch (error) {
      console.error("Erro ao buscar os dados da API:", error);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await axios.delete(`http://localhost:3000/clients/${data[id]?.email}`);
      setData((prevData) => prevData.filter((item) => item.id !== id));
    } catch (error) {
      console.error("Erro ao deletar o item:", error);
    }
  };

  const handleEdit = (item: UserData) => {
    setEditingItem(item);
  };

  const handleSaveEdit = async (editedItem: UserData) => {
    try {
      await axios.put(
        `http://localhost:3000/clients/${editedItem.email}`,
        editedItem
      );
      setData((prevData) =>
        prevData.map((item) => (item.id === editedItem.id ? editedItem : item))
      );
      setEditingItem(null);
    } catch (error) {
      console.error("Erro ao salvar as alterações:", error);
    }
  };

  const handleAddUser = async () => {
    try {
      await axios.post("http://localhost:3000/clients", formData);
      fetchData();
      setFormData({
        nome: "",
        idade: "",
        email: "",
        cpf: "",
      });
    } catch (error) {
      console.error("Erro ao adicionar usuário:", error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  return (
    <section className="flex items-center justify-center h-screen bg-gray-100">
      <div className="flex flex-col items-center bg-white rounded-lg p-8 shadow-lg text-black">
        <h2 className="text-3xl font-bold mb-4">Lista de Usuários</h2>
        <table className="w-full table-auto">
          <thead>
            <tr>
              <th className="px-4 py-2">Nome</th>
              <th className="px-4 py-2">Idade</th>
              <th className="px-4 py-2">Email</th>
              <th className="px-4 py-2">CPF</th>
              <th className="px-4 py-2">Ações</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr key={item.id}>
                <td className="border px-4 py-2">{item.nome}</td>
                <td className="border px-4 py-2">{item.idade}</td>
                <td className="border px-4 py-2">{item.email}</td>
                <td className="border px-4 py-2">{item.cpf}</td>
                <td className="border px-4 py-2">
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="bg-red-500 text-white px-2 py-1 rounded mr-2"
                  >
                    Apagar
                  </button>
                  <button
                    onClick={() => handleEdit(item)}
                    className="bg-green-500 text-white px-2 py-1 rounded"
                  >
                    Editar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {editingItem && (
          <div className="mt-4">
            <h2>Editando item:</h2>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSaveEdit(editingItem);
              }}
            >
              <div className="flex flex-col gap-2">
                <label htmlFor="nome">Nome:</label>
                <input
                  type="text"
                  id="nome"
                  name="nome"
                  value={editingItem.nome}
                  onChange={(e) =>
                    setEditingItem({ ...editingItem, nome: e.target.value })
                  }
                  className="border rounded-lg px-3 py-2"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="idade">Idade:</label>
                <input
                  type="number"
                  id="idade"
                  name="idade"
                  value={editingItem.idade}
                  onChange={(e) =>
                    setEditingItem({
                      ...editingItem,
                      idade: parseInt(e.target.value, 10),
                    })
                  }
                  className="border rounded-lg px-3 py-2"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="email">Email:</label>
                <input
                  type="text"
                  id="email"
                  name="email"
                  value={editingItem.email}
                  onChange={(e) =>
                    setEditingItem({ ...editingItem, email: e.target.value })
                  }
                  className="border rounded-lg px-3 py-2"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="cpf">CPF:</label>
                <input
                  type="text"
                  id="cpf"
                  name="cpf"
                  value={editingItem.cpf}
                  onChange={(e) =>
                    setEditingItem({ ...editingItem, cpf: e.target.value })
                  }
                  className="border rounded-lg px-3 py-2"
                />
              </div>
              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded"
              >
                Salvar
              </button>
              <button
                onClick={() => setEditingItem(null)}
                className="bg-gray-500 text-white px-4 py-2 rounded"
              >
                Cancelar
              </button>
            </form>
          </div>
        )}
        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-2">Adicionar Novo Usuário:</h2>
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
              type="submit"
              className="bg-green-500 text-white px-4 py-2 rounded"
            >
              Adicionar Usuário
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default UserForm;
