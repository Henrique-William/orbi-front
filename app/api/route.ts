// src/api/route.ts (ou defina diretamente no seu componente)

/**
 * Interface que representa o DTO de localização esperado pela API de otimização.
 * Baseado em com.tech.orbi.dto.LocationDto.
 */
export interface LocationData {
    address: string;
    latitude: number;
    longitude: number;
    recipientName: string;
    recipientPhone: string;
    recipientEmail: string;
    packageDetails: string;
    driverId: string; // Representa o UUID do Driver
}

const API_BASE_URL = 'http://localhost:8080/api';

/**
 * Envia a lista de locais para o endpoint de otimização de rota.
 * O endpoint do backend é POST /api/route/optimize.
 * @param locations Lista de objetos LocationData.
 * @param startIndex Índice do local de partida (opcional, padrão 0).
 * @returns A rota otimizada (lista de LocationData) ou null em caso de erro.
 */
export async function optimizeRoute(
    locations: LocationData[],
    startIndex: number = 0
): Promise<LocationData[] | null> {
    // Nota: O driverId deve ser o mesmo para todos os locais em uma única rota.
    const url = `${API_BASE_URL}/route/optimize?startIndex=${startIndex}`;

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                // Se a rota for protegida (e.g., com hasAuthority('SCOPE_BASIC')),
                // adicione o token JWT aqui:
                // 'Authorization': `Bearer ${seuTokenJwt}`,
            },
            body: JSON.stringify(locations),
        });

        if (!response.ok) {
            if (response.status === 404) {
                throw new Error('Motorista não encontrado (404). Verifique o ID do motorista.');
            }
            const errorText = await response.text();
            console.error(`Erro na requisição: ${response.status} - ${response.statusText}`, errorText);
            throw new Error(`Erro ao otimizar rota: ${response.statusText}`);
        }

        const optimizedRoute: LocationData[] = await response.json();
        return optimizedRoute;

    } catch (error) {
        console.error('Erro de rede ou processamento:', error);
        // Propaga o erro para ser tratado no componente
        throw error;
    }
}