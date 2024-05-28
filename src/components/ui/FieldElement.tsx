import { useContext } from "react";
import { AppContext, Field } from "../../context/AppContext";
import { HiMiniCog8Tooth } from "react-icons/hi2";
import { IoClose } from "react-icons/io5";

export const FieldElement: React.FC<{ field: Field }> = ({ field }) => {
  const { handleEditField, handleRemoveField } = useContext(AppContext);

  return (
    <div className="flex flex-row gap-2 p-3 border rounded-md border-zinc-600 justify-between" key={field.id}>
      <label className="text-xs">{field.label}</label>
      <div className="flex flex-row gap-2 items-center">
        <button onClick={() => handleEditField(field.id)} className="">
          <HiMiniCog8Tooth className="text-xs" />
        </button>
        <button onClick={() => handleRemoveField(field.id)}>
          <IoClose className="text-red-400" />
        </button>
      </div>
    </div>
  );
};
