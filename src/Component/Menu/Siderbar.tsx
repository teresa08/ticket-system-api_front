import { Link } from "react-router-dom";
import { routes } from "../../Routes/route";
import { useContext } from "react";
import { UserContext } from "../../App";

type Props = {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

type itemSidebarType = {
  name: string,
  icon: string,
  route: string
}

export function Sidebar({ isOpen, setIsOpen }: Props) {


  const context = useContext(UserContext);

  if (!context) {
    throw new Error('Header must be used within a UserProvider');
  }
  const { userContext } = context;
  const itemSidebarAdmin: Array<itemSidebarType> = [
    {
      name: "Ticket",
      icon: "bi bi-stickies-fill",
      route: routes.ticket()
    },
    {
      name: "Departamentos",
      icon: "bi bi-bookshelf",
      route: routes.department()
    },
    {
      name: "Categoria",
      icon: "bi bi-bookshelf",
      route: routes.category()
    },
    {
      name: "Estadistica",
      icon: "bi bi-bar-chart-line",
      route: "/admin/ordenes"
    },
    {
      name: "Usuarios",
      icon: "bi bi-people-fill",
      route: routes.user()
    },
    {
      name: "Configuración",
      icon: "bi bi-nut-fill",
      route: "/admin/configuracion"
    }
  ];

  const itemSidebarUser: Array<itemSidebarType> = [
    {
      name: "Ticket",
      icon: "bi bi-stickies-fill",
      route: routes.ticket()
    },
    {
      name: "Estadistica",
      icon: "bi bi-bar-chart-line",
      route: "/admin/ordenes"
    },
    {
      name: "Configuración",
      icon: "bi bi-nut-fill",
      route: "/admin/configuracion"
    }
  ];

  const itemSidebar: Array<itemSidebarType> = userContext.role === "admin" ? itemSidebarAdmin : itemSidebarUser;
  return (
    <div className={`d-flex  flex-column ${isOpen ? 'w-30' : 'w-auto'} bg-dark vh-100 transition-all`}>
      <div className="d-flex align-items-center justify-content-between p-3 text-white">
        <h1 className={`h5 mb-0 me-4  ${isOpen ? 'd-block' : 'd-none'}`}>{userContext.department}</h1>
        {isOpen ? (
         <i className="bi bi-layout-sidebar-inset-reverse pointer-event"  onClick={() => setIsOpen(!isOpen)} />
        ) : (
          <i className="bi bi-layout-sidebar-inset pointer-event" onClick={() => setIsOpen(!isOpen)} />
        )}
      </div>
      <nav className="mt-3">
        {isOpen ?
          itemSidebar.map((item: itemSidebarType, i: number): JSX.Element => (
            <div className='d-flex px-3 py-2 align-items-center text-white sidebar-item' key={i}>
               <i className={item.icon}/>
              <Link to={item.route} className="ms-3 text-white text-decoration-none">
                {item.name}
              </Link>
            </div>
          )) :
          itemSidebar.map((item: itemSidebarType, i: number): JSX.Element => (
            <div className='d-flex px-3 py-2 align-items-center text-white sidebar-item' key={i}>
              <i className={item.icon}/>
            </div>
          ))
        }
      </nav>
    </div>
  );
}