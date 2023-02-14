import './App.css';
import { BrowserRouter, Route , Switch } from "react-router-dom";
import LandingPage from "./components/LandingPage"
import Home from "./components/Home";
import Detail from "./components/Detail";
import CreatePage from "./components/CreatePage";


function App() {
  return (
    <BrowserRouter>
    <div className="App">
      <Switch>
        <Route exact path='/' component={LandingPage} />
        <Route exact path='/home' component={Home}/>
        <Route exact path="/home/:id" component={Detail}/>
        <Route  path='/create' component={CreatePage} />
      </Switch>
    </div>
    </BrowserRouter>
  );
}

export default App;