import { FC, ReactNode } from "react"

type LayoutProps = {
    children: ReactNode;
}

const Layout: FC<LayoutProps> = ({ children }) => {
    return <section className="min-h-[100vh] bg-white">
        <h1 className="sticky top-0 h-[10vh] bg-[#165961] p-2 min-h-20 font-bold text-[3rem] text-center">
            Chats
        </h1>
        {children}
    </section>
}

export default Layout;