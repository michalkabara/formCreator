import { useContext } from "react";
import { RxTextAlignLeft } from "react-icons/rx";
import { AppContext } from "../../context/AppContext";

export const FieldTypesButtons = () => {
  const { handleAddField, fieldTypes } = useContext(AppContext);

  return (
    <div className="w-1/3 border-l px-3 border-zinc-600 flex flex-row gap-2 items-start">
      {fieldTypes.map((button, index) => (
        <button onClick={() => handleAddField(button)} key={`type-${index + 1}`}>
          <div className="flex flex-col gap-2 items-center size-[70px] border border-zinc-500 rounded-lg justify-center bg-zinc-700">
            <RxTextAlignLeft />
            <p className="text-xs">{button.label}</p>
          </div>
        </button>
      ))}
    </div>
  );
};
