"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
    const router = useRouter();

    useEffect(() => {
        // Verifica a sessão com o backend
        fetch("http://localhost:8080/api/auth/validate", {
            method: "GET",
            credentials: "include", // Importante para enviar cookies de sessão
        })
            .then((res) => {
                if (res.ok) {
                    setIsAuthenticated(true);
                } else {
                    throw new Error("Não autenticado");
                }
            })
            .catch(() => {
                setIsAuthenticated(false);
                router.push("/login"); // Redireciona para login no Next.js
            });
    }, [router]);

    if (isAuthenticated === null) {
        // Podes substituir isto por um componente de Loading bonito do Orbi
        return (
            <div className="flex h-screen items-center justify-center bg-[#f8f8f8]">
                <p className="text-[#450693] font-bold">Verificando login...</p>
            </div>
        );
    }

    if (!isAuthenticated) return null; // O router.push já vai tratar do redirecionamento

    return <>{children}</>;
}