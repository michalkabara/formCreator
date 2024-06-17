import { useContext } from "react";
import { AppContext } from "../../context/AppContext";

export const FormPreviewButton = () => {
  const { setIsModalVisible } = useContext(AppContext);

  const showPreviewForm = () => {
    setIsModalVisible(true);
  };

  return (
    <button onClick={showPreviewForm} className="p-2 rounded-md px-4 text-sm">
      Preview Form
    </button>
  );
};
