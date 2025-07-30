import { useState } from "react"; 
import { Route, Routes, useLocation } from "react-router"
import Signup from "./pages/Signup"
import Home from "./pages/Home"
import Onboard from "./pages/Onboard"
import ProtectRoute from "./components/Protect"
import Login from "./pages/Login"
import Workout from "./pages/Workout"
import WorkoutId from "./pages/WorkoutId"
import Workouts from "./pages/Workouts"
import Navbar from "./components/Navbar";
import Foodlog from "./pages/Foodlog";
import Nutrition from "./pages/Nutrition";
import ProgressPage from "./pages/ProgressPage";
import Profile from "./pages/Profile";
import Foods from "./pages/Foods";



function App() {

  const location=useLocation();
  const hidePanel=['/login','/signup','/onboard']
  const shouldHideNavbar=!hidePanel.includes(location.pathname);


  return (
    <>
      {shouldHideNavbar && <Navbar/>}

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

        <Route path="/food" element={
          <ProtectRoute>
            <Foodlog/>
          </ProtectRoute>
        } />

        <Route path="/nutrition" element={
          <ProtectRoute>
            <Nutrition/>
          </ProtectRoute>
        }/>

        <Route path="/progress" element={
          <ProtectRoute>
            <ProgressPage/>
          </ProtectRoute>
        }/>

        <Route path="/profile" element={
          <ProtectRoute>
            <Profile/>
          </ProtectRoute>
        }/>

        <Route path="/foods" element={
          <ProtectRoute>
            <Foods/>
          </ProtectRoute>
        }/>


      </Routes>
    </>
  )
}

export default App
