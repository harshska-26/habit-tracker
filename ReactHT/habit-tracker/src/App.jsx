import { Route, Routes } from "react-router-dom";
import "./App.css"
import { Layout } from "./layout/layout";
import {Homepage} from "./pages/homepage.component"
import {Habitpage} from "./pages/habitpage.component"
import { EachHabit } from "./component/eachHabit/eachHabit.component";

const App = () => {
  return(
    <div id="root">
    <Routes >
      <Route path="/" element={<Layout />}>
      <Route path="/" element={<Homepage />}/>
      <Route path="/habits" element={<Habitpage/>}/>
      <Route path="/eachHabit" element={<EachHabit/>}/>
      </Route>
    </Routes>
    </div>
  )
}

export default App;