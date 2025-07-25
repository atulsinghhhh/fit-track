import { Route, Routes } from "react-router"
import Signup from "./pages/Signup"
import Home from "./pages/Home"
import Onboard from "./pages/Onboard"
import ProtectRoute from "./components/Protect"
import Login from "./pages/Login"
import Workout from "./pages/Workout"


function App() {


  return (
    <>
      <Routes>
        <Route path="/signup" element={<Signup/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/" element={<Home/>}/>
        <Route path="/onboard" element={<Onboard/>}/>

        {/* Protect Routes */}
        <Route path="/workout" element={
          <ProtectRoute>
            <Workout/>
          </ProtectRoute>
        }/>


      </Routes>
    </>
  )
}

export default App
