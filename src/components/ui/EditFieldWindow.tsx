import { useContext, useRef } from "react";
import { AppContext, Field } from "../../context/AppContext";

export const EditFieldWindow: React.FC<{
  fieldData: Field;
}> = ({ fieldData }) => {
  const { editFieldData, setEditFieldData, handleSubmitFieldChanges } = useContext(AppContext);

  const labelInputRef = useRef(null);

  return (
    <div className="bg-zinc-800 border border-blue-400 p-6 rounded-xl w-full">
      <form
        action=""
        className="flex flex-col gap-3 text-xs"
        onSubmit={(e) => {
          e.preventDefault();
          if (labelInputRef.current.value.length < 3) return;
          handleSubmitFieldChanges(editFieldData.id);
        }}
      >
        <div className="w-full flex flex-col gap-2">
          <label htmlFor="">Change label</label>
          <input
            type="text"
            ref={labelInputRef}
            className="rounded-md text-sm p-2"
            defaultValue={fieldData.label}
            onChange={(e) => setEditFieldData({ ...editFieldData, label: e.target.value })}
          />
        </div>
        <div className="w-full flex flex-row gap-2">
          <label htmlFor="">Required</label>

          <input
            type="checkbox"
            className="rounded-md text-sm p-2"
            checked={editFieldData.isRequired}
            onChange={() => {
              setEditFieldData((prev: Field) => ({ ...editFieldData, isRequired: !prev.isRequired }));
            }}
          />
        </div>

        <button className="bg-blue-600 p-2 rounded-md">Save</button>
      </form>
    </div>
  );
};
