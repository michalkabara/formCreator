import React, { SetStateAction, useContext } from "react";
import { FormNameInput } from "./FormNameInput";
import { HiMiniCog8Tooth } from "react-icons/hi2";
import { AppContext } from "../../context/AppContext";

export const FormName: React.FC<{
  editFormName: boolean;
  setEditFormName: (value: SetStateAction<boolean>) => void;
}> = ({ editFormName, setEditFormName }) => {
  const { newFormName, setTemporaryForm, temporaryForm, setNewFormName } = useContext(AppContext);

  const updateFormName = () => {
    if (newFormName.length < 3) return;
    else {
      setTemporaryForm({ ...temporaryForm, name: newFormName });
      setEditFormName(false);
    }
  };

  const cancelEditFormName = () => {
    setNewFormName(temporaryForm.name);
    setEditFormName(false);
  };

  return (
    <div>
      {editFormName ? (
        <FormNameInput updateFormName={updateFormName} cancelEditFormName={cancelEditFormName} />
      ) : (
        <div className="flex flex-row text-sm gap-3">
          <p>{temporaryForm.name}</p>
          <button onClick={() => setEditFormName(true)}>
            <HiMiniCog8Tooth className="text-xs" />
          </button>
        </div>
      )}
    </div>
  );
};
