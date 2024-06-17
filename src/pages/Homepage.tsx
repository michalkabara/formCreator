import { useContext } from "react";
import { AppContext } from "../context/AppContext";

import { CreateFormButton } from "../components/CreateFormButton";
import { SavedForms } from "../components/SavedForms";

export const Homepage = () => {
  const { savedForms } = useContext(AppContext);

  return (
    <div>
      {savedForms.length < 1 ? (
        <div className="flex flex-col items-center gap-4">
          <p>Create your first form</p>
          <CreateFormButton />
        </div>
      ) : (
        <div className="flex flex-col items-center gap-4">
          <CreateFormButton />
          <SavedForms />
        </div>
      )}
    </div>
  );
};
