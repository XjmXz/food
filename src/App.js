import "./App.css";
import RouteMap from "./router";
import { BrowserRouter } from "react-router-dom";
import ToggleNav from "./components/togglenav/ToggleNav";
import ToggleBar from "./components/togglebar/ToggleBar";

function App() {
  return (
    <BrowserRouter>
      <ToggleNav> </ToggleNav>
      <RouteMap> </RouteMap>
      <ToggleBar> </ToggleBar>
    </BrowserRouter>
  );
}

export default App;
