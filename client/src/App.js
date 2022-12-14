import "./App.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import LandingPage from "./components/LandingPage";
import Home from "./components/Home";
import Create from "./components/Create";
import Detail from "./components/Detail";



function App() {
  return (
    <BrowserRouter>
      <div className="App">
        
        <Switch>
          <Route exact path={"/"} component={LandingPage} />
          <Route exact path={"/home"} component={Home} />
          <Route exact path={'/details/:id'} component={Detail} />
          <Route exact path={'/create'} component={Create} />

        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
