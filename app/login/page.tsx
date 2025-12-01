"use client"; // Necessário para usar hooks e event handlers

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Login() {
    const router = useRouter();
    const [error, setError] = useState("");

    async function handleLogin(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setError("");

        const formData = new FormData(event.currentTarget);
        // Convertemos o FormData num objeto simples para enviar como JSON
        const data = Object.fromEntries(formData.entries());

        try {
            const response = await fetch("http://localhost:8080/api/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include", // Permite receber o cookie do backend
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                throw new Error("Falha no login");
            }

            // Sucesso: Redireciona para a Home
            router.push("/");
        } catch (err) {
            console.error(err);
            setError("Email ou senha inválidos.");
        }
    }

    return (
        <div className="flex h-screen items-center justify-center bg-[#f8f8f8] font-['Poppins']">
            <div className="flex w-[90%] max-w-[900px] h-auto min-h-[520px] flex-col overflow-hidden rounded-[20px] bg-white shadow-[0_0_20px_rgba(0,0,0,0.1)] md:flex-row">

                {/* Lado Esquerdo */}
                <div className="flex flex-1 items-center justify-center bg-[#450693] py-8 md:py-0">
                    <div className="text-center text-white">
                        <div className="mb-2 inline-block w-[140px] md:w-[180px] overflow-hidden rounded-full">
                            <img src="/orbi.svg" alt="Logo Orbi" className="w-full" />
                        </div>
                    </div>
                </div>

                {/* Lado Direito (Formulário) */}
                <div className="flex flex-1 items-center justify-center p-10">
                    <div className="w-full max-w-[320px]">
                        <h2 className="mb-5 text-center text-2xl font-bold text-black">LOGIN</h2>

                        {error && <p className="mb-4 text-center text-xs text-red-500">{error}</p>}

                        <form onSubmit={handleLogin}>
                            <label className="mb-1 block text-sm text-[#333]">Login</label>
                            <input
                                type="email"
                                name="email" // Adicionado name
                                placeholder="@email.com"
                                className="mb-4 w-full rounded-md border border-[#ccc] p-2.5 text-sm text-black outline-none focus:border-[#450693]"
                                required
                            />

                            <label className="mb-1 block text-sm text-[#333]">Password</label>
                            <input
                                type="password"
                                name="password" // Adicionado name
                                placeholder="password"
                                className="mb-4 w-full rounded-md border border-[#ccc] p-2.5 text-sm text-black outline-none focus:border-[#450693]"
                                required
                            />

                            <div className="mb-4 flex items-center justify-between text-xs md:text-sm text-[#333]">
                                <label className="flex items-center gap-1 cursor-pointer">
                                    <input type="checkbox" className="accent-[#450693]" /> Lembrar login
                                </label>
                                <a href="#" className="text-[#450693] hover:underline">Esqueceu a senha?</a>
                            </div>

                            <button
                                type="submit"
                                className="mt-2 w-full rounded-md bg-[#450693] p-2.5 text-base text-white transition hover:bg-[#0e86b5]"
                            >
                                Entrar
                            </button>

                            <p className="mt-4 text-center text-sm text-black">
                                Não tem uma conta? <Link href="/register" className="text-[#450693] font-medium hover:underline">Inscrever-se</Link>
                            </p>
                        </form>
                    </div>
                </div>

            </div>
        </div>
    );
}