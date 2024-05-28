import { useContext } from "react";
import { AppContext } from "../../context/AppContext";
import { BsCheck } from "react-icons/bs";
import { IoClose } from "react-icons/io5";

export const FormNameInput: React.FC<{
  updateFormName: () => void;
  cancelEditFormName: () => void;
}> = ({ updateFormName, cancelEditFormName }) => {
  const { temporaryForm, setnewFormName } = useContext(AppContext);

  return (
    <div className="flex flex-row gap-2">
      <input
        className="text-sm"
        type="text"
        onChange={(e) => setnewFormName(e.target.value)}
        defaultValue={temporaryForm.name}
      />
      <button onClick={updateFormName} className="text-xl text-green-500">
        <BsCheck />
      </button>
      <button onClick={cancelEditFormName} className="text-md text-green-500">
        <IoClose className="text-red-400" />
      </button>
    </div>
  );
};
