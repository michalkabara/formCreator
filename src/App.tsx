import { Link } from "react-router-dom";
import { AppContainer } from "./components/AppContainer";
import { AiFillHome } from "react-icons/ai";
import { AppContext } from "./context/AppContext";
import { useContext } from "react";

function App() {
  const { isModalVisible } = useContext(AppContext);

  return (
    <>
      {isModalVisible && <div className="bg-black opacity-20 w-full z-20 h-full absolute"></div>}
      <p className="text-black text-center mb-8 text-2xl">kodzimy kreator formularza</p>
      <div className="w-[850px] m-auto">
        <Link to="/">
          <button className="p-2 mb-1 bg-zinc-600 rounded-md">
            <AiFillHome />
          </button>
        </Link>
      </div>

      <AppContainer />
    </>
  );
}

export default App;
