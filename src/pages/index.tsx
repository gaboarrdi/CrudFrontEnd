import { Inter } from "next/font/google";
import LoginPage from "./login";
import FormPage from "./form";
import Register from "./register";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <main>
      <LoginPage></LoginPage>
      <FormPage></FormPage>
      <Register></Register>
    </main>
  );
}
