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
  formElements: Field[];
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
  setFormElements: Dispatch<SetStateAction<Field[]>>;
}

export const AppContext = createContext<AppContext>(undefined);

export const AppContextProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [formElements, setFormElements] = useState<Field[]>([]);
  const [isEditWindowVisible, setisEditWindowVisible] = useState<boolean>(false);
  const [editFieldData, setEditFieldData] = useState<Field>({});
  const [savedForms, setSavedForms] = useState<Form[]>([]);
  const [temporaryForm, setTemporaryForm] = useState<Form>({});
  const [newFormName, setNewFormName] = useState<string>("");

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

    const findField = formElements.find((field) => field.id === id);

    if (findField) {
      setEditFieldData(findField);
    }
  };

  const handleSubmitFieldChanges = (id: string) => {
    const updatedFields = formElements.map((field) => {
      if (field.id === id) {
        return {
          ...editFieldData,
        };
      }
      return field;
    });

    setFormElements(updatedFields);
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

    setFormElements([]);
    setTemporaryForm({ id: uuidv4(), name: "New Form", fields: [] });
  };

  return (
    <AppContext.Provider
      value={{
        isEditWindowVisible,
        formElements,
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
        setFormElements,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
