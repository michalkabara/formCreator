import { RxTextAlignLeft } from "react-icons/rx";

export const TextFieldButton = () => {
  return (
    <div className="flex flex-col gap-2 items-center size-[70px] border border-zinc-500 rounded-lg justify-center bg-zinc-700">
      <RxTextAlignLeft />
      <p className="text-xs">TextField</p>
    </div>
  );
};
