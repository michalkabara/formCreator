import { useContext } from "react";
import { AppContext } from "../context/AppContext";
import { Link } from "react-router-dom";

export const CreateFormButton = () => {
  const { handleCreateForm } = useContext(AppContext);

  return (
    <Link to={`newform`}>
      <button onClick={handleCreateForm} className="bg-blue-600 p-2 rounded-md">
        Create form
      </button>
    </Link>
  );
};
