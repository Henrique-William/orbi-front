// app/routes/create/page.tsx
'use client';

import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
// Importe a Server Action e a Interface corrigida
import { optimizeRouteServerAction, LocationType } from '@/app/actions/routeActions';

// Mock do ID do motorista (conforme seu exemplo)
const MOCK_DRIVER_ID = "00dc0d5e-7163-4b1f-ba2b-cef85ac7c639";

// --- Componente de Formulário (AddLocationForm) ---
const AddLocationForm = ({ onAddLocation }: { onAddLocation: (location: LocationType) => void }) => {
    // Estado inicial do formulário
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

        // Validação simples
        if (!formData.address || !formData.recipientName) {
            alert('Preencha os campos obrigatórios.');
            return;
        }

        // Cria o objeto LocationType com o DriverID
        const newLocation: LocationType = {
            ...formData,
            driverId: MOCK_DRIVER_ID,
        };

        onAddLocation(newLocation);

        // Limpa o form (mantendo lat/long para facilitar testes)
        setFormData(prev => ({
            ...prev,
            address: '',
            recipientName: '',
            recipientPhone: '',
            recipientEmail: '',
            packageDetails: '',
        }));
    };

    // Classes CSS reutilizáveis
    const inputClasses = "w-full rounded-md border border-[#ccc] p-2 text-sm outline-none focus:border-[#450693] text-black";
    const labelClasses = "mb-1 block text-xs text-[#333] font-medium";

    return (
        <form onSubmit={handleSubmit} className="p-6 space-y-4 bg-white rounded-lg shadow-lg h-full">
            <h2 className="text-2xl font-bold text-[#450693] mb-4 border-b pb-2">Adicionar Parada</h2>
            {/* Campos do formulário... */}
            <div>
                <label className={labelClasses}>Endereço *</label>
                <input type="text" name="address" value={formData.address} onChange={handleChange} className={inputClasses} required />
            </div>
            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className={labelClasses}>Latitude *</label>
                    <input type="number" step="any" name="latitude" value={formData.latitude} onChange={handleChange} className={inputClasses} required />
                </div>
                <div>
                    <label className={labelClasses}>Longitude *</label>
                    <input type="number" step="any" name="longitude" value={formData.longitude} onChange={handleChange} className={inputClasses} required />
                </div>
            </div>
            <div>
                <label className={labelClasses}>Nome do Destinatário *</label>
                <input type="text" name="recipientName" value={formData.recipientName} onChange={handleChange} className={inputClasses} required />
            </div>
            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className={labelClasses}>Telefone</label>
                    <input type="tel" name="recipientPhone" value={formData.recipientPhone} onChange={handleChange} className={inputClasses} />
                </div>
                <div>
                    <label className={labelClasses}>Email</label>
                    <input type="email" name="recipientEmail" value={formData.recipientEmail} onChange={handleChange} className={inputClasses} />
                </div>
            </div>
            <div>
                <label className={labelClasses}>Detalhes</label>
                <textarea name="packageDetails" rows={3} value={formData.packageDetails} onChange={handleChange as any} className={`${inputClasses} resize-none`} />
            </div>
            <button type="submit" className="w-full bg-green-600 text-white p-3 rounded-md hover:bg-green-700 font-bold transition">Adicionar à Lista</button>
        </form>
    );
};

// --- Componente Sidebar (RouteSidebar) ---
const RouteSidebar = ({ locations, onOptimize, onRemoveLocation, isOptimizing }: any) => {
    const router = useRouter();
    return (
        <div className="bg-white p-6 rounded-lg shadow-xl flex flex-col h-full sticky top-8">
            <h2 className="text-2xl font-bold text-[#450693] mb-4 border-b pb-2">Paradas ({locations.length})</h2>
            <div className="flex-grow overflow-y-auto pr-2 space-y-3 mb-6 max-h-[60vh]">
                {locations.map((loc: LocationType, index: number) => (
                    <div key={index} className="p-3 bg-gray-50 border-l-4 border-[#450693] rounded-md shadow-sm relative">
                        <button onClick={() => onRemoveLocation(index)} className="absolute top-1 right-1 text-red-500 font-bold">&times;</button>
                        <p className="text-sm font-bold text-black">Parada {index + 1}</p>
                        <p className="text-xs text-gray-700 truncate">{loc.address}</p>
                        <p className="text-xs text-gray-500">{loc.recipientName}</p>
                    </div>
                ))}
            </div>
            <div className="space-y-4 mt-auto pt-4 border-t">
                <button
                    onClick={onOptimize}
                    disabled={locations.length < 2 || isOptimizing}
                    className="w-full bg-blue-600 text-white p-3 rounded-md hover:bg-blue-700 font-bold disabled:bg-gray-400 transition flex justify-center"
                >
                    {isOptimizing ? 'Otimizando...' : 'Otimizar Rota'}
                </button>
                <button onClick={() => router.push('/routes')} className="w-full bg-red-600 text-white p-3 rounded-md hover:bg-red-700 font-bold transition">Cancelar</button>
            </div>
        </div>
    );
};

// --- Página Principal ---
export default function CreateRoutePage() {
    const [locations, setLocations] = useState<LocationType[]>([]);
    const [isOptimizing, setIsOptimizing] = useState(false);
    const router = useRouter();

    const handleAddLocation = (location: LocationType) => {
        setLocations(prev => [...prev, location]);
    };

    const handleRemoveLocation = (indexToRemove: number) => {
        setLocations(prev => prev.filter((_, index) => index !== indexToRemove));
    };

    const handleOptimizeRoute = async () => {
        if (locations.length < 2) {
            alert('Adicione pelo menos 2 paradas.');
            return;
        }

        setIsOptimizing(true);

        try {
            // Chama a Server Action corrigida
            const optimizedRoute = await optimizeRouteServerAction(locations);

            console.log("Rota Otimizada:", optimizedRoute);
            alert('Rota criada e otimizada com sucesso!');
            router.push('/routes');

        } catch (error) {
            console.error('Erro:', error);
            alert(`Falha na otimização: ${error instanceof Error ? error.message : 'Erro desconhecido'}`);
        } finally {
            setIsOptimizing(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#f8f8f8] p-8 font-['Poppins']">
            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                    <AddLocationForm onAddLocation={handleAddLocation} />
                </div>
                <div className="lg:col-span-1">
                    <RouteSidebar
                        locations={locations}
                        onOptimize={handleOptimizeRoute}
                        onRemoveLocation={handleRemoveLocation}
                        isOptimizing={isOptimizing}
                    />
                </div>
                {/* Debug Payload */}
                <div className="lg:col-span-3 mt-4 p-4 bg-gray-100 rounded-lg">
                    <h3 className="text-sm font-bold text-gray-700">Payload Preview:</h3>
                    <pre className="text-xs text-gray-600 overflow-x-auto mt-2">{JSON.stringify(locations, null, 2)}</pre>
                </div>
            </div>
        </div>
    );
}