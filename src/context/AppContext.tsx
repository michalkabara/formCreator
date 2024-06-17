import { Dispatch, ReactNode, SetStateAction, createContext, useState } from "react";
import { v4 as uuidv4 } from "uuid";

export interface Field {
  type: string;
  id: string;
  label: string;
  isRequired: boolean;
}

export interface Form {
  id: string;
  name: string;
  fields: Field[];
}

export interface AppContext {
  isEditWindowVisible: boolean;
  editFieldData: Field;
  setEditFieldData: Dispatch<SetStateAction<Field>>;
  savedForms: Form[];
  temporaryForm: Form;
  setTemporaryForm: Dispatch<SetStateAction<Form>>;
  fieldTypes: { type: string; label: string }[];
  newFormName: string;
  setNewFormName: Dispatch<SetStateAction<string>>;
  handleSubmitFieldChanges: (id: string) => void;
  handleAddField: (markup: { type: string; label: string }) => void;
  handleEditField: (id: string) => void;
  handleRemoveField: (id: string) => void;
  handleCreateForm: () => void;
  handleSaveForm: (id: string) => void;
  isModalVisible: boolean;
  setIsModalVisible: Dispatch<SetStateAction<boolean>>;
}

export const AppContext = createContext<AppContext>(undefined);

export const AppContextProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isEditWindowVisible, setisEditWindowVisible] = useState<boolean>(false);
  const [editFieldData, setEditFieldData] = useState<Field>({});
  const [savedForms, setSavedForms] = useState<Form[]>([]);
  const [temporaryForm, setTemporaryForm] = useState<Form>({});
  const [newFormName, setNewFormName] = useState<string>("");
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

  const fieldTypes = [
    {
      type: "text",
      label: "Text field",
    },
    { type: "number", label: "Number field" },
    { type: "select", label: "Select field" },
  ];

  const handleAddField = (markup: { type: string; label: string }) => {
    setTemporaryForm((prev) => ({
      ...prev,
      fields: [...prev.fields, { ...markup, id: uuidv4(), isRequired: false }],
    }));
  };

  const handleEditField = (id: string) => {
    setisEditWindowVisible((prev) => !prev);

    const findTemporaryField = temporaryForm.fields.find((field) => field.id === id);

    if (findTemporaryField) {
      setEditFieldData(findTemporaryField);
    }
  };

  const handleSubmitFieldChanges = (id: string) => {
    const updatedFields = temporaryForm.fields.map((field) => {
      if (field.id === id) {
        return {
          ...editFieldData,
        };
      }
      return field;
    });

    setTemporaryForm((prev) => ({ ...prev, fields: updatedFields }));
    setisEditWindowVisible(false);
  };

  const handleRemoveField = (id: string) => {
    const arrayAfterUpdate = temporaryForm.fields.filter((item) => item.id !== id);

    setTemporaryForm((prev) => ({
      ...prev,
      fields: arrayAfterUpdate,
    }));
  };

  const handleCreateForm = () => {
    setTemporaryForm({ id: uuidv4(), name: "New Form", fields: [] });
  };

  const handleSaveForm = () => {
    const updatedForms = savedForms.map((form) => {
      if (form.id === temporaryForm.id) {
        return {
          ...temporaryForm,
        };
      }
      return form;
    });

    if (savedForms.find((form) => form.id === temporaryForm.id)) {
      setSavedForms(updatedForms);
    } else setSavedForms((prev) => [...prev, temporaryForm]);

    setTemporaryForm({ id: uuidv4(), name: "New Form", fields: [] });
  };

  return (
    <AppContext.Provider
      value={{
        isEditWindowVisible,
        fieldTypes,
        editFieldData,
        setEditFieldData,
        handleSubmitFieldChanges,
        handleAddField,
        handleEditField,
        handleRemoveField,
        handleCreateForm,
        handleSaveForm,
        temporaryForm,
        setTemporaryForm,
        savedForms,
        newFormName,
        setNewFormName,
        isModalVisible,
        setIsModalVisible,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
