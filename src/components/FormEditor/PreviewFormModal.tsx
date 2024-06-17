import { useContext } from "react";
import { AppContext } from "../../context/AppContext";

export const PreviewFormModal = () => {
  const { setIsModalVisible, temporaryForm } = useContext(AppContext);

  return (
    <div className="bg-zinc-600 w-full">
      <div className="flex flex-row gap-5">
        <p>PreviewFormModal</p> <button onClick={() => setIsModalVisible(false)}>ddddd</button>
      </div>

      {temporaryForm.fields.map((field) => (
        <div key={field.id} className="flex flex-col gap-1">
          <label htmlFor={field.label}>{field.label}</label>
          {field.type === "select" ? <select></select> : <input type={field.type} />}
        </div>
      ))}
    </div>
  );
};
