import { createContext, useState } from "react";
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
  savedForms: Form[];
  temporaryForm: Form;
  fieldTypes: { type: string; label: string }[];
  newFormName: string;
}

export const AppContext = createContext<AppContext | undefined>(undefined);

export const AppContextProvider = ({ children }) => {
  const [formElements, setFormElements] = useState<Field[]>([]);
  const [isEditWindowVisible, setisEditWindowVisible] = useState<boolean>(false);
  const [editFieldData, setEditFieldData] = useState<Field>({});
  const [savedForms, setSavedForms] = useState<Form[]>([]);
  const [temporaryForm, setTemporaryForm] = useState<Form>({});
  const [newFormName, setnewFormName] = useState<string>("");

  const fieldTypes = [
    {
      type: "text",
      label: "Text field",
    },
    { type: "number", label: "Number field" },
    { type: "select", label: "Select field" },
  ];

  const handleAddField = (markup: Element) => {
    setFormElements((prev) => [...prev, { ...markup, id: uuidv4(), isRequired: false }]);
    // pushnij form elementsy do objektu forma
    setTemporaryForm({ ...temporaryForm, fields: formElements });
  };

  const handleEditField = (id) => {
    //show Edit UI
    setisEditWindowVisible((prev) => !prev);
    //take formElements array
    const findField = formElements.find((field) => field.id === id);
    // console.log(findField);

    setEditFieldData(findField);
  };

  const handleSubmitFieldChanges = (id) => {
    //update item properties
    const updatedFields = formElements.map((field) => {
      if (field.id === id) {
        return {
          ...editFieldData,
        };
      }
      return field;
    });
    //update formElements array
    setFormElements(updatedFields);
    setisEditWindowVisible(false);
  };

  const handleRemoveField = (id) => {
    const arrayAfterUpdate = formElements.filter((item) => item.id !== id);

    setFormElements(arrayAfterUpdate);
  };

  const handleCreateForm = () => {
    //stworz objekt z nowym id
    setTemporaryForm({ id: uuidv4(), name: "New Form", fields: [] });
    //przenies na strone edycji formularza
  };

  const handleSaveForm = () => {
    //sprawdz czy savedforms zawiera form o tym ID
    //jeśli zawiera to aktualizuj tylko ten form
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

    // setTemporaryForm({});
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
        setnewFormName,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
