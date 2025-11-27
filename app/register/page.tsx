import Link from "next/link";

export default function Register() {
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

                        <form>
                            <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                                <div className="flex flex-col">
                                    <label className="mb-1 text-xs text-[#333]">Nome</label>
                                    <input type="text" placeholder="Seu nome completo" className="rounded-md border border-[#ccc] p-2 text-xs outline-none focus:border-[#450693] text-black" required />
                                </div>
                                <div className="flex flex-col">
                                    <label className="mb-1 text-xs text-[#333]">Gênero</label>
                                    <select className="rounded-md border border-[#ccc] p-2 text-xs outline-none focus:border-[#450693] text-black" required>
                                        <option value="">Selecione</option>
                                        <option value="feminino">Feminino</option>
                                        <option value="masculino">Masculino</option>
                                        <option value="outro">Outro</option>
                                    </select>
                                </div>
                                <div className="flex flex-col">
                                    <label className="mb-1 text-xs text-[#333]">Identidade (RG)</label>
                                    <input type="text" placeholder="Número do RG" className="rounded-md border border-[#ccc] p-2 text-xs outline-none focus:border-[#450693] text-black" required />
                                </div>
                                <div className="flex flex-col">
                                    <label className="mb-1 text-xs text-[#333]">Telefone</label>
                                    <input type="tel" placeholder="(00) 00000-0000" className="rounded-md border border-[#ccc] p-2 text-xs outline-none focus:border-[#450693] text-black" required />
                                </div>
                                <div className="flex flex-col">
                                    <label className="mb-1 text-xs text-[#333]">Idade</label>
                                    <input type="number" placeholder="Sua idade" min="18" className="rounded-md border border-[#ccc] p-2 text-xs outline-none focus:border-[#450693] text-black" required />
                                </div>
                                <div className="flex flex-col">
                                    <label className="mb-1 text-xs text-[#333]">Tipo de veículo</label>
                                    <input type="text" placeholder="Ex: Carro, Moto" className="rounded-md border border-[#ccc] p-2 text-xs outline-none focus:border-[#450693] text-black" required />
                                </div>
                                <div className="flex flex-col">
                                    <label className="mb-1 text-xs text-[#333]">Placa</label>
                                    <input type="text" placeholder="ABC-1234" className="rounded-md border border-[#ccc] p-2 text-xs outline-none focus:border-[#450693] text-black" required />
                                </div>
                                <div className="flex flex-col">
                                    <label className="mb-1 text-xs text-[#333]">Cor</label>
                                    <input type="text" placeholder="Cor" className="rounded-md border border-[#ccc] p-2 text-xs outline-none focus:border-[#450693] text-black" required />
                                </div>
                            </div>

                            <button
                                type="submit"
                                className="mt-4 w-full rounded-md bg-[#450693] p-2.5 text-sm text-white transition hover:bg-[#0e86b5]"
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