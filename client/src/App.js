import React from "react";
import { Switch, Route } from "react-router-dom";

// APP PRINCIPALE
import Home from "./pages/Home/Home";
import Mappa from "./pages/Mappa/Mappa";
import Lista from "./pages/Lista/Lista";
import Consegnala from "./pages/Consegnala/Consegnala";

// EXTRA
import Contatta from "./pages/Contatta/Contatta";
import Privacy from "./pages/Privacy/Privacy";
import Statistiche from "./pages/Statistiche/Statistiche";

// DEVELOPMENT
import CRUD from "./pages/CRUD/CRUD";

// ERRORI
import NotFound from "./pages/NotFound";

function App() {
  return (
    <Switch>
      {/* APP PRINCIPALE */}
      <Route exact path="/" component={Home}></Route>
      <Route exact path="/mappa" component={Mappa}></Route>
      <Route exact path="/lista" component={Lista}></Route>
      <Route path="/consegna/:ordine" component={Consegnala}></Route>

      {/* EXTRA */}
      <Route exact path="/contatta" component={Contatta}></Route>
      <Route exact path="/privacy" component={Privacy}></Route>
      <Route exact path="/statistiche" component={Statistiche}></Route>

      {/* DEVELOPMENT */}
      <Route exact path="/crud" component={CRUD}></Route>

      {/* ERRORI */}
      <Route component={NotFound}></Route>
    </Switch>
  );
}

export default App;
