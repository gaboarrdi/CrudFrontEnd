import { useState } from "react";
import { login } from "../api/auth";
import { useRouter } from "next/router";

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = async () => {
    try {
      const response = await login(email, password);
      localStorage.setItem("accessToken", response.accessToken);
      router.push("/form");
    } catch (error) {
      window.alert("Erro ao fazer login. Verifique suas credenciais.");
    }
  };

  const handleRegisterClick = () => {
    router.push("/register");
  };

  return (
    <section className="flex items-center justify-center h-[100vh]">
      <div className="flex flex-col items-center">
        <h2 className="m-[1rem] font-extrabold text-[30px] text-white">
          Faça seu Login
        </h2>
        <form
          action=""
          method="post"
          className="flex flex-col gap-2 w-[100%] max-w-[100%]"
        >
          <div className="flex flex-col gap-2 text-white">
            <label htmlFor="email">E-mail</label>
            <input
              type="text"
              name="email"
              onChange={(e) => setEmail(e.target.value)}
              className="p-[10px] bg-slate-500 outline-none rounded"
            />
          </div>
          <div className="flex flex-col gap-2 text-white ">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              onChange={(e) => setPassword(e.target.value)}
              className="p-[10px] bg-slate-500 outline-none rounded"
            />
          </div>
          <div className="text-white cursor-pointer">
            <p>
              Não tem conta?{" "}
              <span onClick={handleRegisterClick}>Cadastre-se!</span>
            </p>
          </div>
          <button
            type="button"
            onClick={handleLogin}
            className="bg-green-400 hover:bg-green-600 p-[10px] rounded text-white"
          >
            Entrar
          </button>

          <fieldset className=" text-white border-t border-slate-50 mt-[10px]">
            <legend className="mx-auto px-4 text-1xl italic">ou</legend>
            <div className="pt-4">
              <p>Acesse com o seu:</p>
            </div>
          </fieldset>
          <button className="bg-slate-500 p-[10px] rounded text-white">
            GitHub
          </button>
        </form>
      </div>
    </section>
  );
};

export default LoginPage;
