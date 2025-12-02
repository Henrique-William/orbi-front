// app/actions/routeActions.ts
'use server';

import { cookies } from 'next/headers';

// Definição da tipagem exata que o Java espera (LocationDto)
export interface LocationType {
    address: string;
    latitude: number;
    longitude: number;
    recipientName: string;
    recipientPhone: string;
    recipientEmail: string;
    packageDetails: string;
    driverId: string;
}

const BASE_URL = 'http://localhost:8080';

export async function optimizeRouteServerAction(locations: LocationType[]): Promise<LocationType[]> {

    // 1. CORREÇÃO CRÍTICA: Em Next.js 15/16, cookies() é uma Promise.
    // É necessário usar 'await' antes de acessar .get()
    const cookieStore = await cookies();
    const token = cookieStore.get('token')?.value;

    if (!token) {
        throw new Error("Sessão expirada. Por favor, faça login novamente.");
    }

    try {
        console.log("Enviando payload para Spring Boot:", JSON.stringify(locations, null, 2));

        // 2. Envia para o Spring Boot
        const response = await fetch(`${BASE_URL}/api/route/optimize?startIndex=0`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`, // Repassa o token seguro
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(locations),
        });

        // 3. Tratamento de Erros
        if (response.status === 401 || response.status === 403) {
            throw new Error('Acesso negado. Token inválido ou permissão insuficiente.');
        }

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Erro no Back-end (${response.status}): ${errorText}`);
        }

        // 4. Retorna o JSON (Lista de LocationType otimizada)
        const optimizedRoute: LocationType[] = await response.json();
        return optimizedRoute;

    } catch (e) {
        console.error("Erro na Server Action:", e);
        throw e; // Repassa o erro para o front exibir o alert
    }
}