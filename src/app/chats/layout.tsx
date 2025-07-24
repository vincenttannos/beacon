import { FC, ReactNode } from "react"

type LayoutProps = {
    children: ReactNode;
}

const Layout: FC<LayoutProps> = ({ children }) => {
    return <>
        <h1 className="h-[10vh] bg-[#165961] min-h-20 font-bold text-[3rem] text-center">
            Chats
        </h1>
        {children}
    </>
}

export default Layout;