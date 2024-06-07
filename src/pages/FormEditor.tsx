import { useContext, useEffect, useState } from "react";

import { RxTextAlignLeft } from "react-icons/rx";
import { DroppablePlace } from "../components/ui/DroppablePlace";
import { HiMiniCog8Tooth } from "react-icons/hi2";
import { EditFieldWindow } from "../components/ui/EditFieldWindow";
import { AppContext, Field, Form } from "../context/AppContext";
import { Link, useParams } from "react-router-dom";
import { FormNameInput } from "../components/FormEditor/FormNameInput";
import { FieldElement } from "../components/ui/FieldElement";

export const FormEditor = () => {
  const {
    isEditWindowVisible,
    formElements,
    fieldTypes,
    editFieldData,
    handleSubmitFieldChanges,
    handleAddField,
    temporaryForm,
    setTemporaryForm,
    handleSaveForm,
    newFormName,
    setNewFormName,
    savedForms,
    setFormElements,
    handleCreateForm,
  } = useContext(AppContext);

  const [editFormName, setEditFormName] = useState(false);

  //get form id z params
  const { formid } = useParams();
  // console.log(formid);
  //ustaw fieldy formu z id
  //ustaw nazwe
  useEffect(() => {
    const currentForm = savedForms.find((form: Form) => form.id === formid);

    if (currentForm) {
      setTemporaryForm(currentForm);
      setFormElements(currentForm.fields);
    } else {
      handleCreateForm();
    }
  }, [formid, savedForms, setTemporaryForm]);

  //Panie, weź w handleCreateForm id forma z URL'a, a nie generuj uuid POLICE

  const updateFormName = () => {
    if (newFormName.length < 3) return;
    else {
      setTemporaryForm({ ...temporaryForm, name: newFormName });
      setEditFormName(false);
    }
  };

  const cancelEditFormName = () => {
    setNewFormName(editFormName);
    setEditFormName(false);
  };

  return (
    <>
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
      <div className="flex-row flex gap-2 relative flex-1">
        {isEditWindowVisible ? (
          <EditFieldWindow fieldData={editFieldData} handleSubmitFieldChanges={handleSubmitFieldChanges} />
        ) : (
          <div className="w-full flex flex-col gap-2 pr-6">
            {temporaryForm.fields.length >= 1 ? (
              temporaryForm.fields.map((field: Field) => <FieldElement key={field.id} field={field} />)
            ) : (
              <DroppablePlace />
            )}
          </div>
        )}

        {!isEditWindowVisible && (
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
        )}
      </div>
      <div className="text-sm">
        <Link to="/">
          <button onClick={() => handleSaveForm(temporaryForm.id)} className="bg-blue-600 p-2 rounded-md px-4">
            Save
          </button>
        </Link>
        <button onClick={() => handleSaveForm(temporaryForm.id)} className=" p-2 rounded-md px-4">
          Preview Form
        </button>
      </div>
    </>
  );
};
