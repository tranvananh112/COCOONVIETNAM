import { Header } from "@/components/header"

export default function ArticlesLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div className="min-h-screen bg-white">
            <Header />
            <main className="pt-0">{children}</main>
        </div>
    )
}