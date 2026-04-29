import { Route, Routes } from "react-router-dom";
import "./App.css"
import { Layout } from "./layout/layout";
import { Homepage } from "../pages/homepage.component";
import { Habitpage } from "../pages/habitpage.component";

const App = () => {
  return(
    <div id="root">
    <Routes >
      <Route path="/" element={<Layout />}>
      <Route path="/" element={<Homepage />}/>
      <Route path="/habits" element={<Habitpage/>}/>
      </Route>
    </Routes>
    </div>
  )
}

export default App;