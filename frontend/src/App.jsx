import { useState } from "react"; 
import { Route, Routes } from "react-router"
import Signup from "./pages/Signup"
import Home from "./pages/Home"
import Onboard from "./pages/Onboard"
import ProtectRoute from "./components/Protect"
import Login from "./pages/Login"
import Workout from "./pages/Workout"
import WorkoutId from "./pages/WorkoutId"
import Workouts from "./pages/Workouts"
// import DailySummary from "./components/DailySummary"


function App() {

  // const [selectedDate,setSelectedDate]=useState(
  //     new Date().toISOString().split("T")[0]
  // )


  return (
    <>
    {/* <DailySummary selectedDate={selectedDate}/> */}
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

        <Route path="/workout/:id" element={
          <ProtectRoute>
            <WorkoutId/>
          </ProtectRoute>
        }/>

        <Route path="/workouts" element={
          <ProtectRoute>
            <Workouts/>
          </ProtectRoute>
        }/>


      </Routes>
    </>
  )
}

export default App
