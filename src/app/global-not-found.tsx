import Link from 'next/link'
import './(frontend)/styles.css'

export const metadata = {
  title: 'Página não encontrada | Boulevard Garibaldi',
}

export default function NotFound() {
  return (
    <html lang="pt-BR">
      <body className="min-h-screen bg-[radial-gradient(circle_at_20%_20%,rgba(255,214,120,0.20),transparent_28rem),linear-gradient(135deg,#07140f_0%,#0f2a1f_48%,#1e1710_100%)] font-sans text-[#fff8ea]">
        <main className="grid min-h-screen place-items-center px-6 py-8 max-[560px]:items-end">
          <section className="w-full max-w-[720px]" aria-labelledby="not-found-title">
            <p className="mb-5 mt-0 text-sm font-bold uppercase leading-tight tracking-[0.12em] text-[#f3c969]">
              Erro 404
            </p>
            <h1
              id="not-found-title"
              className="m-0 max-w-[12ch] text-5xl font-extrabold leading-[0.95] tracking-normal min-[560px]:text-7xl lg:text-[7.5rem]"
            >
              Página não encontrada
            </h1>
            <p className="mb-0 mt-6 max-w-[38rem] text-base leading-[1.55] text-[#fff8ead1] min-[560px]:text-xl">
              O endereço acessado não existe ou pode ter sido movido. Volte para a página inicial do
              Boulevard Garibaldi.
            </p>
            <div className="mt-9 flex flex-col gap-3 min-[560px]:flex-row min-[560px]:flex-wrap">
              <Link
                className="inline-flex min-h-12 w-full items-center justify-center rounded-md border border-[#fff8ea47] px-[18px] py-3 text-base font-bold leading-tight text-[#fff8ea] no-underline transition-colors hover:border-[#fff8ea] hover:bg-[#fff8ea] hover:text-[#07140f] focus-visible:border-[#fff8ea] focus-visible:bg-[#fff8ea] focus-visible:text-[#07140f] focus-visible:outline-none min-[560px]:w-auto"
                href="/"
              >
                Voltar para o início
              </Link>
            </div>
          </section>
        </main>
      </body>
    </html>
  )
}
