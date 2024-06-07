import { useContext } from "react";
import { AppContext, Form } from "../context/AppContext";
import { Link } from "react-router-dom";

export const Homepage = () => {
  const { savedForms, temporaryForm, handleCreateForm } = useContext(AppContext);

  return (
    <div>
      {savedForms.length < 1 ? (
        <div className="flex flex-col items-center gap-4">
          <p>Create your first form</p>

          <Link to={`form/${temporaryForm.id}`}>
            <button onClick={handleCreateForm} className="bg-blue-600 p-2 rounded-md">
              Create form
            </button>
          </Link>
        </div>
      ) : (
        <div>
          <Link to={`form/${temporaryForm.id}`}>
            <button onClick={handleCreateForm} className="bg-blue-600 p-2 rounded-md">
              Create form
            </button>
          </Link>
          <div className="flex gap-3 mt-5">
            {savedForms.map((form: Form) => (
              <Link className="p-3 border rounded-md text-xs" key={form.id} to={`form/${form.id}`}>
                <button>{form.name}</button>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
