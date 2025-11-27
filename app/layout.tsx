import type { Metadata } from "next";
import { Poppins } from "next/font/google"; // 1. Importe a Poppins
import "./globals.css";

// 2. Configure a fonte Poppins
const poppins = Poppins({
    subsets: ["latin"],
    weight: ["300", "400", "500", "600", "700"], // Pesos usados no design
    variable: "--font-poppins", // Nome da variável CSS
});

export const metadata: Metadata = {
    title: "Orbi App",
    description: "Mobilidade Urbana",
};

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="pt-BR">
        <head>
            {/*<script src="https://kit.fontawesome.com/a2e0b6c6e3.js" crossOrigin="anonymous" async></script>*/}
            <title>Orbi App</title>
        </head>
        {/* 3. Aplique a variável da fonte no body */}
        <body className={`${poppins.variable} antialiased bg-[#f8f8f8]`}>
        {children}
        </body>
        </html>
    );
}