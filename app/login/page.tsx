import Link from "next/link";

export default function Login() {
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

                        <form>
                            <label className="mb-1 block text-sm text-[#333]">Login</label>
                            <input
                                type="email"
                                placeholder="@email.com"
                                className="mb-4 w-full rounded-md border border-[#ccc] p-2.5 text-sm text-black outline-none focus:border-[#450693]"
                                required
                            />

                            <label className="mb-1 block text-sm text-[#333]">Password</label>
                            <input
                                type="password"
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

                            <div className="mt-6 text-center">
                                <p className="mb-2 text-sm text-black">Logar com</p>
                                <div className="flex justify-center gap-4">
                                    <i className="fab fa-facebook-f cursor-pointer text-xl text-[#333] transition hover:text-[#450693]"></i>
                                    <i className="fab fa-google cursor-pointer text-xl text-[#333] transition hover:text-[#450693]"></i>
                                    <i className="fab fa-apple cursor-pointer text-xl text-[#333] transition hover:text-[#450693]"></i>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>

            </div>
        </div>
    );
}