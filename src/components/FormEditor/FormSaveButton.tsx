import { useContext } from "react";
import { Link } from "react-router-dom";
import { AppContext } from "../../context/AppContext";

export const FormSaveButton = () => {
  const { handleSaveForm, temporaryForm } = useContext(AppContext);

  return (
    <Link to="/" className="text-sm">
      <button onClick={() => handleSaveForm(temporaryForm.id)} className="bg-blue-600 p-2 rounded-md px-4">
        Save
      </button>
    </Link>
  );
};
