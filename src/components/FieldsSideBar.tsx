// import { SelectField } from "./Fields/SelectField";

import { TextFieldButton } from "./Fields/TextFieldButton";
import { SelectFieldButton } from "./Fields/SelectFieldButton";

export const FieldsSideBar = () => {
  return (
    <div className="flex gap-2">
      <TextFieldButton />
      <SelectFieldButton />
    </div>
  );
};
