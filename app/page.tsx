import Link from "next/link";

export default function Home() {
  return (
      <div className="flex h-screen items-center justify-center bg-[#f8f8f8] font-['Poppins']">
        <div className="flex w-[90%] max-w-[900px] flex-col overflow-hidden rounded-[20px] bg-white shadow-[0_0_20px_rgba(0,0,0,0.1)] md:flex-row md:h-[600px]">

          {/* Lado Esquerdo (Azul) */}
          <div className="flex flex-1 items-center justify-center bg-[#450693] p-6 text-center">
            <div className="text-white">
              {/* Imagem do Logo */}
              <div className="mb-2 inline-block w-[180px] overflow-hidden rounded-full md:w-[180px]">
                <img src="/orbi.svg" alt="Logo Orbi" className="w-full" />
              </div>
            </div>
          </div>

          {/* Lado Direito (Conteúdo) */}
          <div className="relative flex flex-[1.2] flex-col p-6 pb-20 md:pb-6">
            <div className="w-full">
              <h2 className="mb-4 text-center text-2xl font-bold text-black">Início</h2>

              {/* Campo Destino */}
              <div className="mb-3">
                <input
                    type="text"
                    placeholder="Para onde?"
                    className="w-full rounded-lg border border-[#ccc] p-3 text-sm outline-none focus:border-[#450693]"
                />
              </div>

              {/* Localização Atual */}
              <div className="mb-3 flex items-center gap-2 text-sm text-gray-700">
                <img src="https://cdn-icons-png.flaticon.com/512/684/684908.png" alt="Loc" className="w-[22px] opacity-80" />
                <span>Sua localização atual</span>
              </div>

              {/*/!* Sugestões *!/*/}
              {/*<div className="mb-4">*/}
              {/*  <p className="mb-2 font-bold text-gray-800">Sugestões:</p>*/}

              {/*  <div className="mb-1 flex cursor-pointer items-center gap-3 rounded-lg bg-[#f1f1f1] p-2.5 transition hover:bg-[#e2e2e2]">*/}
              {/*    <img src="https://cdn-icons-png.flaticon.com/512/854/854878.png" alt="Trabalho" className="w-[22px]" />*/}
              {/*    <span className="text-sm text-black">Trabalho</span>*/}
              {/*  </div>*/}

              {/*  <div className="mb-1 flex cursor-pointer items-center gap-3 rounded-lg bg-[#f1f1f1] p-2.5 transition hover:bg-[#e2e2e2]">*/}
              {/*    <img src="https://cdn-icons-png.flaticon.com/512/854/854892.png" alt="Casa" className="w-[22px]" />*/}
              {/*    <span className="text-sm text-black">Casa</span>*/}
              {/*  </div>*/}

              {/*  <div className="flex cursor-pointer items-center gap-3 rounded-lg bg-[#f1f1f1] p-2.5 transition hover:bg-[#e2e2e2]">*/}
              {/*    <img src="https://cdn-icons-png.flaticon.com/512/927/927567.png" alt="Salvo" className="w-[22px]" />*/}
              {/*    <span className="text-sm text-black">Local salvo</span>*/}
              {/*  </div>*/}
              {/*</div>*/}

              {/* Mapa */}
              <div className="h-[200px] w-full overflow-hidden rounded-lg border border-[#ccc]">
                <img src="/maps.webp" alt="Mapa" className="h-full w-full object-cover" />
              </div>
            </div>

            {/* Menu Inferior */}
            <div className="absolute bottom-4 left-1/2 flex w-[90%] -translate-x-1/2 justify-between rounded-[14px] bg-white px-6 py-3 shadow-[0px_0px_12px_rgba(0,0,0,0.15)]">
              <div className="flex cursor-pointer flex-col items-center opacity-100">
                <img src="https://cdn-icons-png.flaticon.com/512/1946/1946488.png" alt="Início" className="mb-1 w-[26px]" />
                <span className="text-xs font-medium text-black">Início</span>
              </div>

              <div className="flex cursor-pointer flex-col items-center opacity-60 hover:opacity-100 transition-opacity">
                <img src="https://cdn-icons-png.flaticon.com/512/1946/1946400.png" alt="Viagens" className="mb-1 w-[26px]" />
                <span className="text-xs font-medium text-black">Viagens</span>
              </div>

              {/* Link para login (como exemplo de Perfil) */}
              <Link href="/login" className="flex cursor-pointer flex-col items-center opacity-60 hover:opacity-100 transition-opacity">
                <img src="https://cdn-icons-png.flaticon.com/512/456/456212.png" alt="Perfil" className="mb-1 w-[26px]" />
                <span className="text-xs font-medium text-black">Perfil</span>
              </Link>
            </div>

          </div>
        </div>
      </div>
  );
}