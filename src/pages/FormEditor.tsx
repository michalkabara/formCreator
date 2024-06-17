import { useContext, useEffect, useState } from "react";

import { DroppablePlace } from "../components/ui/DroppablePlace";
import { EditFieldWindow } from "../components/ui/EditFieldWindow";
import { AppContext, Form } from "../context/AppContext";
import { useParams } from "react-router-dom";
import { PreviewFormModal } from "../components/FormEditor/PreviewFormModal";
import { FormName } from "../components/FormEditor/FormName";
import { FormFields } from "../components/FormEditor/FormFields";
import { FieldTypesButtons } from "../components/FormEditor/FieldTypesButtons";
import { FormSaveButton } from "../components/FormEditor/FormSaveButton";
import { FormPreviewButton } from "../components/FormEditor/FormPreviewButton";

export const FormEditor = () => {
  const {
    isEditWindowVisible,
    editFieldData,
    temporaryForm,
    setTemporaryForm,
    savedForms,
    handleCreateForm,
    isModalVisible,
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
    } else {
      handleCreateForm();
    }
  }, [formid, savedForms, setTemporaryForm]);

  //Panie, weź w handleCreateForm id forma z URL'a, a nie generuj uuid POLICE

  return (
    <>
      {isModalVisible && (
        <div className="absolute z-30">
          <PreviewFormModal />
        </div>
      )}

      <FormName editFormName={editFormName} setEditFormName={setEditFormName} />

      <div className="flex-row flex gap-2 relative flex-1">
        {isEditWindowVisible ? (
          <EditFieldWindow fieldData={editFieldData} />
        ) : (
          <div className="w-full flex flex-col gap-2 pr-6">
            {temporaryForm.fields.length >= 1 ? <FormFields /> : <DroppablePlace />}
          </div>
        )}

        {!isEditWindowVisible && <FieldTypesButtons />}
      </div>
      <div className="text-sm">
        <FormSaveButton />
        <FormPreviewButton />
      </div>
    </>
  );
};
