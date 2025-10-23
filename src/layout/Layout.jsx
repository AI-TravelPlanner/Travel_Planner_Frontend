import React from 'react'
import Navbar from './Navbar'
import { Footer7 } from './Footer';

const Layout = ({ children }) => {
    return (
        // <div className="flex flex-col min-h-screen">
        //     <Navbar />
        //     <main className="flex-grow">{children}</main>
        // </div>


        <div className="flex flex-col min-h-screen">
            <Navbar />
            <main>
                {children}
            </main>
            <Footer7 />
        </div>
    );
};

export default Layout