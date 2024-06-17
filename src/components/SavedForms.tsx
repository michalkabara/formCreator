import { useContext } from "react";
import { Link } from "react-router-dom";
import { AppContext, Form } from "../context/AppContext";

export const SavedForms = () => {
  const { savedForms } = useContext(AppContext);

  return (
    <div className="flex gap-3 mt-5">
      {savedForms.map((form: Form) => (
        <Link className="p-3 border rounded-md text-xs" key={form.id} to={`form/${form.id}`}>
          <button>{form.name}</button>
        </Link>
      ))}
    </div>
  );
};
