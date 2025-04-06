// import react from "react";
import "./App.css";
import SideBar from "./components/SideBar";
import Home from "./routes/Home";
import Login from "./routes/Login";

function App() {
  return (
    <>
      <div className="flex bg-gray-800">
        <SideBar />
        <Home />
        {/* <Login /> */}
      </div>
    </>
  );
}

export default App;
