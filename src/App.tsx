import { Link } from "react-router-dom";
import { AppContainer } from "./components/AppContainer";
import { AiFillHome } from "react-icons/ai";

function App() {
  return (
    <>
      <p className="text-black text-center mb-8 text-2xl">kodzimy kreator formularza</p>
      <Link to="/">
        <button className="p-2 mb-1 bg-zinc-600 rounded-md">
          <AiFillHome />
        </button>
      </Link>
      <AppContainer />
    </>
  );
}

export default App;
