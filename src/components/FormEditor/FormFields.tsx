import { useContext } from "react";
import { AppContext, Field } from "../../context/AppContext";
import { FieldElement } from "../ui/FieldElement";

export const FormFields = () => {
  const { temporaryForm } = useContext(AppContext);

  return (
    <>
      {temporaryForm.fields.map((field: Field) => (
        <FieldElement key={field.id} field={field} />
      ))}
    </>
  );
};
