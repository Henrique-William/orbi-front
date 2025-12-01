// app/routes/create/page.tsx
'use client';

import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

// Tipagem baseada em LocationDto.java
interface LocationType {
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
// Usando o driverId de exemplo: "00dc0d5e-7163-4b1f-ba2b-cef85ac7c639"
const MOCK_DRIVER_ID = "00dc0d5e-7163-4b1f-ba2b-cef85ac7c639";

// FUNÇÃO PARA LER O TOKEN DO COOKIE 'token'
const getTokenFromCookie = (): string | null => {
    if (typeof document === 'undefined') return null;
    const name = 'token=';
    const decodedCookie = decodeURIComponent(document.cookie);
    const ca = decodedCookie.split(';');
    for(let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) === ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) === 0) {
            return c.substring(name.length, c.length);
        }
    }
    return null;
};

// Componente do Formulário para adicionar uma parada
const AddLocationForm = ({ onAddLocation }: { onAddLocation: (location: LocationType) => void }) => {
    const [formData, setFormData] = useState<Omit<LocationType, 'driverId'>>({
        address: '',
        latitude: 0,
        longitude: 0,
        recipientName: '',
        recipientPhone: '',
        recipientEmail: '',
        packageDetails: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value, type } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'number' ? parseFloat(value) : value,
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!formData.address || !formData.recipientName || formData.latitude === null || formData.longitude === null) {
            alert('Preencha os campos obrigatórios: Endereço, Nome, Latitude e Longitude.');
            return;
        }

        const newLocation: LocationType = {
            ...formData,
            driverId: MOCK_DRIVER_ID,
        };

        onAddLocation(newLocation);

        // Opcional: Manter lat/lng para facilitar a entrada sequencial, mas limpar os outros
        setFormData(prev => ({
            ...prev,
            address: '',
            recipientName: '',
            recipientPhone: '',
            recipientEmail: '',
            packageDetails: '',
        }));
    };

    const inputClasses = "w-full rounded-md border border-[#ccc] p-2 text-sm outline-none focus:border-[#450693] text-black";
    const labelClasses = "mb-1 block text-xs text-[#333] font-medium";

    return (
        <form onSubmit={handleSubmit} className="p-6 space-y-4 bg-white rounded-lg shadow-lg h-full">
            <h2 className="text-2xl font-bold text-[#450693] mb-4 border-b pb-2">Adicionar Parada de Entrega</h2>

            <div>
                <label htmlFor="address" className={labelClasses}>Endereço *</label>
                <input type="text" id="address" name="address" value={formData.address} onChange={handleChange} className={inputClasses} placeholder="Rua, número e cidade" required />
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label htmlFor="latitude" className={labelClasses}>Latitude *</label>
                    <input type="number" step="any" id="latitude" name="latitude" value={formData.latitude} onChange={handleChange} className={inputClasses} required />
                </div>
                <div>
                    <label htmlFor="longitude" className={labelClasses}>Longitude *</label>
                    <input type="number" step="any" id="longitude" name="longitude" value={formData.longitude} onChange={handleChange} className={inputClasses} required />
                </div>
            </div>

            <div>
                <label htmlFor="recipientName" className={labelClasses}>Nome do Destinatário *</label>
                <input type="text" id="recipientName" name="recipientName" value={formData.recipientName} onChange={handleChange} className={inputClasses} required />
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label htmlFor="recipientPhone" className={labelClasses}>Telefone</label>
                    <input type="tel" id="recipientPhone" name="recipientPhone" value={formData.recipientPhone} onChange={handleChange} className={inputClasses} placeholder="(00) 00000-0000" />
                </div>
                <div>
                    <label htmlFor="recipientEmail" className={labelClasses}>Email</label>
                    <input type="email" id="recipientEmail" name="recipientEmail" value={formData.recipientEmail} onChange={handleChange} className={inputClasses} placeholder="email@exemplo.com" />
                </div>
            </div>

            <div>
                <label htmlFor="packageDetails" className={labelClasses}>Detalhes do Pacote</label>
                <textarea id="packageDetails" name="packageDetails" rows={3} value={formData.packageDetails} onChange={handleChange as any} className={`${inputClasses} resize-none`} placeholder="Conteúdo do pacote, notas de entrega, etc." />
            </div>

            <button type="submit" className="w-full bg-green-600 text-white p-3 rounded-md hover:bg-green-700 transition shadow-md font-bold">
                Adicionar Parada
            </button>
        </form>
    );
};

// Componente da Sidebar para exibir a lista e botões
const RouteSidebar = ({ locations, onOptimize, onRemoveLocation, isOptimizing }: {
    locations: LocationType[],
    onOptimize: () => void,
    onRemoveLocation: (index: number) => void,
    isOptimizing: boolean
}) => {
    const router = useRouter();
    const handleCancel = () => router.push('/routes');

    return (
        <div className="bg-white p-6 rounded-lg shadow-xl flex flex-col h-full sticky top-8">
            <h2 className="text-2xl font-bold text-[#450693] mb-4 border-b pb-2">Paradas ({locations.length})</h2>

            {locations.length === 0 ? (
                <p className="text-gray-500 italic text-sm py-4">Adicione paradas para otimizar sua rota.</p>
            ) : (
                <div className="flex-grow overflow-y-auto pr-2 space-y-3 mb-6 max-h-[60vh]">
                    {locations.map((loc, index) => (
                        <div key={index} className="p-3 bg-gray-50 border-l-4 border-[#450693] rounded-md shadow-sm relative">
                            <button
                                onClick={() => onRemoveLocation(index)}
                                className="absolute top-1 right-1 text-red-500 hover:text-red-700 text-lg font-bold leading-none"
                                title="Remover Parada"
                            >
                                &times;
                            </button>
                            <p className="text-sm font-bold text-black">Parada {index + 1}</p>
                            <p className="text-xs text-gray-700 truncate">{loc.address}</p>
                            <p className="text-xs text-gray-500 mt-1">Destinatário: {loc.recipientName}</p>
                        </div>
                    ))}
                </div>
            )}

            <div className="space-y-4 mt-auto pt-4 border-t">
                <button
                    onClick={onOptimize}
                    disabled={locations.length < 2 || isOptimizing}
                    className="w-full bg-blue-600 text-white p-3 rounded-md hover:bg-blue-700 transition shadow-lg disabled:bg-gray-400 font-bold flex items-center justify-center"
                    title={locations.length < 2 ? "Adicione pelo menos 2 paradas para otimizar" : "Otimizar Rota"}
                >
                    {isOptimizing ? 'Otimizando...' : 'Otimizar Rota'}
                </button>
                <button
                    onClick={handleCancel}
                    className="w-full bg-red-600 text-white p-3 rounded-md hover:bg-red-700 transition shadow-md font-bold"
                >
                    Cancelar
                </button>
            </div>
        </div>
    );
};

// Página principal de Criação de Rota
export default function CreateRoutePage() {
    const [locations, setLocations] = useState<LocationType[]>([]);
    const [isOptimizing, setIsOptimizing] = useState(false);
    const router = useRouter();

    const handleAddLocation = (location: LocationType) => {
        setLocations(prev => [...prev, location]);
        console.log("Parada Adicionada. Lista Atual:", [...locations, location]);
    };

    const handleRemoveLocation = (indexToRemove: number) => {
        setLocations(prev => prev.filter((_, index) => index !== indexToRemove));
    };


    const handleOptimizeRoute = async () => {
        if (locations.length < 2) {
            alert('É necessário adicionar pelo menos duas paradas para otimizar a rota.');
            return;
        }

        const token = getTokenFromCookie();
        if (!token) {
            alert('Acesso negado. Por favor, faça login.');
            return;
        }

        setIsOptimizing(true);

        try {
            // POST: {{baseURL}}/api/route/optimize?startIndex=0
            const response = await fetch(`${BASE_URL}/api/route/optimize?startIndex=0`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`, // TOKEN DINÂMICO APLICADO
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(locations),
            });

            if (response.status === 401 || response.status === 403) {
                // Caso o token tenha expirado ou não tenha a scope correta
                alert('Acesso negado (401/403). Token inválido ou permissão insuficiente.');
                throw new Error(`Authorization error! status: ${response.status}`);
            }

            if (!response.ok) {
                let errorDetails = `HTTP error! status: ${response.status}`;
                try {
                    const errorBody = await response.json();
                    errorDetails += ` - ${JSON.stringify(errorBody)}`;
                } catch {
                    // Ignora se não for JSON
                }
                throw new Error(errorDetails);
            }

            const optimizedRoute = await response.json() as LocationType[];
            console.log("Rota Otimizada Recebida:", optimizedRoute);
            alert(`Rota Otimizada com sucesso! A rota tem ${optimizedRoute.length} paradas. Redirecionando para a lista de rotas.`);
            router.push('/routes'); // Redireciona para a lista de rotas após o sucesso

        } catch (error) {
            console.error('Erro ao otimizar rota:', error);
            alert(`Falha na otimização da rota. Erro: ${error instanceof Error ? error.message : 'Erro desconhecido'}`);
        } finally {
            setIsOptimizing(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#f8f8f8] p-8 font-['Poppins']">
            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">

                {/* Coluna do Formulário */}
                <div className="lg:col-span-2">
                    <AddLocationForm onAddLocation={handleAddLocation} />
                </div>

                {/* Coluna da Sidebar */}
                <div className="lg:col-span-1">
                    <RouteSidebar
                        locations={locations}
                        onOptimize={handleOptimizeRoute}
                        onRemoveLocation={handleRemoveLocation}
                        isOptimizing={isOptimizing}
                    />
                </div>

                {/* Exemplo de Estrutura de Dados em JSON no console (Opcional, para debug) */}
                <div className="lg:col-span-3 mt-4 p-4 bg-gray-100 rounded-lg shadow-inner">
                    <h3 className="text-lg font-semibold text-gray-700">Payload de Exemplo:</h3>
                    <pre className="text-xs text-gray-800 bg-gray-200 p-3 rounded mt-2 overflow-x-auto">
                        {JSON.stringify(locations, null, 2)}
                    </pre>
                </div>
            </div>

        </div>
    );
}