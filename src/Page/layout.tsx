import {useState } from 'react';
import { Sidebar } from '../Component/Menu/Siderbar';
import { Header } from '../Component/Menu/Header';
import { Outlet } from 'react-router-dom';



export default function Layout() {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    
    return (
        <div className="d-flex">
          <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
          <div className="d-flex flex-column flex-grow-1 transition-all" style={{ marginLeft: isSidebarOpen ? '0rem' : '0rem' }}>
            <Header />
            <main className="p-4 vh-100 mt-5">
              <div className="bg-white p-3 ">
                <Outlet/>
              </div>
            </main>
          </div>
        </div>
      );
};
