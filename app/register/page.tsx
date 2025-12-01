"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Register() {
    const router = useRouter();
    const [error, setError] = useState("");

    async function handleRegister(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setError("");

        const formData = new FormData(event.currentTarget);
        const data = Object.fromEntries(formData.entries());

        // Validação simples no frontend antes de enviar
        if (data.password !== data.confirmPassword) {
            setError("As senhas não coincidem.");
            return;
        }

        try {
            const response = await fetch("http://localhost:8080/api/auth/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                // Corpo estritamente formatado conforme solicitado
                body: JSON.stringify({
                    name: data.name,
                    email: data.email,
                    password: data.password,
                    confirmPassword: data.confirmPassword,
                    phoneNumber: data.phoneNumber
                }),
            });

            if (!response.ok) {
                // Tenta pegar mensagem de erro do backend se existir
                const errorText = await response.text();
                throw new Error(errorText || "Erro ao cadastrar");
            }

            alert("Cadastro realizado com sucesso!");
            router.push("/login");
        } catch (err: unknown) {
            console.error(err);
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError("Erro desconhecido ao cadastrar.");
            }
        }
    }

    return (
        <div className="flex h-screen items-center justify-center bg-[#f8f8f8] font-['Poppins']">
            <div className="flex w-[90%] max-w-[900px] h-auto min-h-[520px] flex-col overflow-hidden rounded-[20px] bg-white shadow-[0_0_20px_rgba(0,0,0,0.1)] md:flex-row">

                {/* Lado Esquerdo */}
                <div className="flex flex-1 items-center justify-center bg-[#450693] py-8 md:py-0">
                    <div className="text-center text-white">
                        <div className="mb-2 inline-block w-[110px] md:w-[180px] overflow-hidden rounded-full">
                            <img src="/orbi.svg" alt="Logo Orbi" className="w-full" />
                        </div>
                    </div>
                </div>

                {/* Lado Direito (Formulário) */}
                <div className="flex flex-1 items-center justify-center p-6 md:p-10">
                    <div className="w-full max-w-[360px]">
                        <h2 className="mb-4 text-center text-xl font-bold text-black">CADASTRO</h2>
                        {error && <p className="mb-4 text-center text-xs text-red-500 font-medium">{error}</p>}

                        <form onSubmit={handleRegister}>
                            <div className="flex flex-col gap-3">
                                <div className="flex flex-col">
                                    <label className="mb-1 text-xs text-[#333]">Nome Completo</label>
                                    <input
                                        type="text"
                                        name="name"
                                        placeholder="Seu Nome Completo"
                                        className="rounded-md border border-[#ccc] p-2 text-xs outline-none focus:border-[#450693] text-black"
                                        required
                                    />
                                </div>

                                <div className="flex flex-col">
                                    <label className="mb-1 text-xs text-[#333]">Email</label>
                                    <input
                                        type="email"
                                        name="email"
                                        placeholder="exemplo@email.com"
                                        className="rounded-md border border-[#ccc] p-2 text-xs outline-none focus:border-[#450693] text-black"
                                        required
                                    />
                                </div>

                                <div className="flex flex-col">
                                    <label className="mb-1 text-xs text-[#333]">Telefone</label>
                                    <input
                                        type="tel"
                                        name="phoneNumber"
                                        placeholder="(XX) XXXXX-XXXX"
                                        className="rounded-md border border-[#ccc] p-2 text-xs outline-none focus:border-[#450693] text-black"
                                        required
                                    />
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                    <div className="flex flex-col">
                                        <label className="mb-1 text-xs text-[#333]">Senha</label>
                                        <input
                                            type="password"
                                            name="password"
                                            placeholder="Sua Senha"
                                            className="rounded-md border border-[#ccc] p-2 text-xs outline-none focus:border-[#450693] text-black"
                                            required
                                        />
                                    </div>
                                    <div className="flex flex-col">
                                        <label className="mb-1 text-xs text-[#333]">Confirmar Senha</label>
                                        <input
                                            type="password"
                                            name="confirmPassword"
                                            placeholder="Confirme a Sua Senha"
                                            className="rounded-md border border-[#ccc] p-2 text-xs outline-none focus:border-[#450693] text-black"
                                            required
                                        />
                                    </div>
                                </div>
                            </div>

                            <button
                                type="submit"
                                className="mt-6 w-full rounded-md bg-[#450693] p-2.5 text-sm text-white transition hover:bg-[#0e86b5]"
                            >
                                Cadastrar
                            </button>

                            <p className="mt-3 text-center text-xs text-black">
                                Já tem uma conta? <Link href="/login" className="text-[#450693] hover:underline">Entrar</Link>
                            </p>
                        </form>
                    </div>
                </div>

            </div>
        </div>
    );
}