"use client";

import Link from 'next/link';
import { useEffect, useState } from 'react';
import ProtectedRoute from "@/app/component/ProtectedRoute"; // Mantém a proteção da rota

// Tipagem baseada em RouteResponseDto.java e DeliveryDto.java
interface DeliveryDto {
  id: number;
  order: number;
  status: 'REQUESTED' | 'ACCEPTED' | 'AT_PICKUP' | 'IN_TRANSIT' | 'DELIVERED' | 'CANCELLED';
  recipientName: string;
  dropoffAddress: string;
  packageDetails: string;
}

interface RouteResponseDto {
  id: number;
  driverId: string | null;
  driverName: string;
  deliveries: DeliveryDto[];
}

const BASE_URL = 'http://localhost:8080';

export default function Home() {
  const [routes, setRoutes] = useState<RouteResponseDto[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRoutes = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${BASE_URL}/api/route`, {
          headers: {
            'Content-Type': 'application/json',
          },
          // Força o navegador a incluir cookies HttpOnly na requisição
          credentials: 'include',
        });

        if (response.status === 401 || response.status === 403) {
          setError('Acesso negado. Por favor, faça login novamente.');
          console.error(`HTTP error! status: ${response.status}`);
          return;
        }

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json() as RouteResponseDto[];
        setRoutes(data);
        setError(null);

      } catch (e) {
        console.error("Falha ao carregar rotas:", e);
        if (!error) {
          setError('Falha ao carregar as rotas. Verifique o servidor e a conexão.');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchRoutes();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // O conteúdo da página extraído do seu código
  const content = (
      <div className="min-h-screen bg-[#f8f8f8] p-8 font-['Poppins']">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold text-black">Rotas Salvas</h1>
            <Link href="/routes/create" passHref>
              <button className="bg-[#450693] text-white px-4 py-2 rounded-lg hover:bg-[#0e86b5] transition shadow-md">
                Criar Nova Rota
              </button>
            </Link>
          </div>

          {/* Mensagens de Erro */}
          {!loading && error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
                {error}
              </div>
          )}

          {/* Loading State */}
          {loading && (
              <div className="flex h-64 items-center justify-center text-gray-500">
                Carregando Rotas...
              </div>
          )}

          {/* Lista Vazia */}
          {!loading && !error && routes.length === 0 && (
              <div className="text-center p-10 bg-white rounded-xl shadow-lg">
                <p className="text-lg text-gray-500">Nenhuma rota encontrada.</p>
              </div>
          )}

          {/* Lista de Rotas */}
          {!loading && !error && routes.length > 0 && (
              <div className="space-y-4">
                {routes.map((route) => (
                    // Envolvemos o card com o Link para a página de detalhes dinâmica
                    <Link href={`/routes/${route.id}`} key={route.id} className="block group">
                      <div className="bg-white p-4 rounded-xl shadow-lg border border-gray-100 group-hover:border-[#450693] transition-all cursor-pointer hover:shadow-xl">
                        <div className="flex justify-between items-center">
                          <h2 className="text-xl font-semibold text-[#450693] group-hover:text-[#6a1cb3]">Rota #{route.id}</h2>
                          <span className="text-sm font-medium px-3 py-1 rounded-full bg-yellow-100 text-yellow-800">
                                            {route.deliveries.filter(d => d.status === 'DELIVERED').length} / {route.deliveries.length} Entregues
                                        </span>
                        </div>
                        <p className="text-sm text-gray-600 mt-1">Motorista: {route.driverName ?? 'Não atribuído'}</p>
                        <div className="mt-3 space-y-2">
                          <h3 className="text-md font-medium text-gray-700">Próximas Paradas:</h3>
                          <ul className="list-disc list-inside ml-4 space-y-1 text-sm text-gray-600">
                            {/* Exibe apenas as 2 primeiras paradas como prévia */}
                            {route.deliveries.slice(0, 2).map((delivery, index) => (
                                <li key={delivery.id} className="truncate">
                                  {index + 1}. {delivery.dropoffAddress} ({delivery.status})
                                </li>
                            ))}
                            {route.deliveries.length > 2 && (
                                <li className="text-[#450693] font-medium text-xs pt-1 list-none">
                                  + {route.deliveries.length - 2} outras paradas (clique para ver detalhes)
                                </li>
                            )}
                          </ul>
                        </div>
                      </div>
                    </Link>
                ))}
              </div>
          )}
        </div>
      </div>
  );

  // Retorna o conteúdo protegido
  return (
      <ProtectedRoute>
        {content}
      </ProtectedRoute>
  );
}