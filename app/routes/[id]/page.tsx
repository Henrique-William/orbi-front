'use client';

import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Link from 'next/link';

// Tipagem alinhada com o RouteResponseDto.java e DeliveryDto.java
interface DeliveryDto {
    id: number;
    order: number;
    status: 'REQUESTED' | 'ACCEPTED' | 'AT_PICKUP' | 'IN_TRANSIT' | 'DELIVERED' | 'CANCELLED';
    recipientName: string;
    dropoffAddress: string;
    packageDetails: string;
    recipientPhone?: string;
    recipientEmail?: string;
}

interface RouteDetailDto {
    id: number;
    driverId: string | null;
    driverName: string;
    deliveries: DeliveryDto[];
}

const BASE_URL = 'http://localhost:8080';

export default function RouteDetailsPage() {
    const params = useParams(); // Hook para pegar o ID da URL
    const router = useRouter();
    const routeId = params.id;

    const [route, setRoute] = useState<RouteDetailDto | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!routeId) return;

        const fetchRouteDetails = async () => {
            try {
                // Busca os dados atualizados do backend usando o ID
                const response = await fetch(`${BASE_URL}/api/route/${routeId}`, {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    credentials: 'include', // Essencial para passar o cookie de sessão
                });

                if (response.status === 401 || response.status === 403) {
                    router.push('/login');
                    return;
                }

                if (!response.ok) {
                    throw new Error('Erro ao buscar detalhes da rota');
                }

                const data = await response.json();

                // Ordena as entregas pela ordem definida no backend
                if(data.deliveries) {
                    data.deliveries.sort((a: DeliveryDto, b: DeliveryDto) => a.order - b.order);
                }

                setRoute(data);
            } catch (err) {
                console.error(err);
                setError('Não foi possível carregar a rota.');
            } finally {
                setLoading(false);
            }
        };

        fetchRouteDetails();
    }, [routeId, router]);

    if (loading) return <div className="flex h-screen items-center justify-center bg-[#f8f8f8] text-[#450693]">Carregando detalhes...</div>;
    if (error) return <div className="p-8 text-center text-red-500">{error}</div>;
    if (!route) return <div className="p-8 text-center text-gray-500">Rota não encontrada.</div>;

    return (
        <div className="min-h-screen bg-[#f8f8f8] p-8 font-['Poppins']">
            <div className="max-w-4xl mx-auto">
                {/* Header da Página */}
                <div className="mb-6 flex items-center justify-between">
                    <div>
                        <Link href="/routes" className="text-sm text-gray-500 hover:text-[#450693] transition mb-2 block">
                            ← Voltar para Rotas
                        </Link>
                        <h1 className="text-3xl font-bold text-[#450693]">Detalhes da Rota #{route.id}</h1>
                        <p className="text-gray-600 mt-1">
                            Motorista: <span className="font-semibold">{route.driverName ?? 'Não atribuído'}</span>
                        </p>
                    </div>
                    <div className="text-right">
                        <span className="bg-blue-100 text-blue-800 text-sm font-medium px-4 py-2 rounded-full">
                            {route.deliveries.length} Paradas
                        </span>
                    </div>
                </div>

                {/* Lista de Entregas (Timeline) */}
                <div className="space-y-6">
                    {route.deliveries.map((delivery, index) => (
                        <div key={delivery.id} className="relative pl-8 sm:pl-32 py-2 group">
                            {/* Linha vertical da timeline */}
                            <div className="flex flex-col sm:flex-row items-start mb-1 group-last:before:hidden before:absolute before:left-2 sm:before:left-0 before:h-full before:px-px before:bg-slate-200 sm:before:ml-[6.5rem] before:self-start before:-translate-x-1/2 before:translate-y-3 after:absolute after:left-2 sm:after:left-0 after:w-2 after:h-2 after:bg-[#450693] after:border-4 after:box-content after:border-slate-50 after:rounded-full sm:after:ml-[6.5rem] after:-translate-x-1/2 after:translate-y-1.5">

                                {/* Número da Ordem (Lado Esquerdo em Desktop) */}
                                <div className="sm:absolute left-0 top-1 text-xl font-bold text-gray-400 w-20 text-right pr-6 hidden sm:block">
                                    #{delivery.order}
                                </div>

                                {/* Card de Conteúdo */}
                                <div className="bg-white p-5 rounded-xl shadow-md border border-gray-100 w-full hover:shadow-lg transition-shadow">
                                    <div className="flex justify-between items-start mb-2">
                                        <h3 className="text-lg font-bold text-gray-800">{delivery.recipientName}</h3>
                                        <span className={`text-xs font-semibold px-2 py-1 rounded border ${getStatusColor(delivery.status)}`}>
                                            {delivery.status}
                                        </span>
                                    </div>

                                    <p className="text-sm text-gray-600 mb-2 flex items-center gap-2">
                                        <img src="https://cdn-icons-png.flaticon.com/512/684/684908.png" className="w-4 h-4 opacity-60" alt="pin" />
                                        {delivery.dropoffAddress}
                                    </p>

                                    {delivery.packageDetails && (
                                        <div className="bg-gray-50 p-3 rounded-lg mt-3 text-xs text-gray-600 border border-gray-200">
                                            <strong>Detalhes do pacote:</strong> {delivery.packageDetails}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

// Função auxiliar para cores dos status
function getStatusColor(status: string) {
    switch (status) {
        case 'DELIVERED': return 'bg-green-100 text-green-700 border-green-200';
        case 'CANCELLED': return 'bg-red-100 text-red-700 border-red-200';
        case 'IN_TRANSIT': return 'bg-blue-100 text-blue-700 border-blue-200';
        case 'AT_PICKUP': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
        default: return 'bg-gray-100 text-gray-600 border-gray-200';
    }
}