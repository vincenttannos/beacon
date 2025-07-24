"use client"

import { redirect } from "next/navigation";
import { FC, ReactNode } from "react"

type LayoutProps = {
    children: ReactNode;
    name: string;
}

const Layout: FC<LayoutProps> = ({ children, name }) => {
    return (<section className="min-h-[100vh] bg-white">
        <header className="sticky top-0 h-[10vh] min-h-20 flex bg-[#165961] ">
            <div 
              className="h-16 m-3 ml-6 w-16 p-3 hover:bg-[#233436] rounded-full"
              onClick={() => redirect('/chats')}>
                <img src='https://uxwing.com/wp-content/themes/uxwing/download/arrow-direction/curved-arrow-back-white-icon.png'
                    className="h-10"></img>
            </div>
            
            <h1 className="grow-1 p-2 font-bold text-[3rem] text-center">
                {name || "hello"}
            </h1>
        </header>

        {children}
    </section>);
}

export default Layout;