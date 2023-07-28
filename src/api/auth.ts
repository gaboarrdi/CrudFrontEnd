import axios from "axios";

interface LoginResponse {
  id: number;
  name: string;
  email: string;
  accessToken: string;
}

const BASE_URL = "http://localhost:3000";

export async function login(
  email: string,
  password: string
): Promise<LoginResponse> {
  const data = { email, password };

  const response = await axios.post<LoginResponse>(
    `${BASE_URL}/auth/login`,
    data
  );
  return response.data;
}
