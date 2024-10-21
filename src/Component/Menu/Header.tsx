import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext } from "react";
import { UserContext } from "../../App";

export function Header() {
  const context = useContext(UserContext);

  if (!context) {
    throw new Error('Header must be used within a UserProvider');
  }

  const { userContext } = context;
  return (
    <div className="d-flex position-fixed w-100 top-0 p-3 bg-white shadow-sm z-index-3">
      <h1 className="h4 mb-0">{userContext.name}</h1>
      <div className="ms-auto">
      <FontAwesomeIcon icon={'home'}/>
      </div>
    </div>
  );

  }