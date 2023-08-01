import axios from "axios";

export interface UserData {
  id: number;
  nome: string;
  idade: number;
  email: string;
  cpf: string;
}

const BASE_URL = "http://localhost:3000";

export async function getAllClients() {
  try {
    const response = await axios.get(`${BASE_URL}/clients`);
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar os dados da API:", error);
  }
}

export const deleteClient = async (email: string) => {
  try {
    await axios.delete(`${BASE_URL}/clients/${email}`);
  } catch (error) {
    console.error("Erro ao deletar o item:", error);
  }
};

export const updateClient = async (email: string, data: UserData) => {
  try {
    await axios.put(`${BASE_URL}/clients/${email}`, data);
  } catch (error) {
    console.error("Erro ao salvar as alterações:", error);
  }
};

export const addClient = async (data: UserData) => {
  try {
    await axios.post(`${BASE_URL}/clients/`, data);
  } catch (error) {
    console.error("Erro ao adicionar usuário:", error);
  }
};
