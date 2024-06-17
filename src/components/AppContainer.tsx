import { Outlet } from "react-router-dom";

export const AppContainer = () => {
  return (
    <div className="w-[850px] min-h-96 bg-zinc-800 rounded-xl border border-zinc-600 p-6 flex-col flex gap-5 m-auto">
      <Outlet />
    </div>
  );
};
