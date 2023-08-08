import AddHabit from "./Components/AddHabit";
import AllHabits from "./Components/AllHabits";
import NavBar from "./Components/NavBar";
import SignIn from "./Components/SignIn";
import SignUp from "./Components/SignUp";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import WeeklyHabit from "./Components/WeeklyHabit";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {

  const BrowserRouter = createBrowserRouter([
    {
      path: '/', element: <NavBar />, children: [
        { path: "/", element: <AllHabits /> },
        { path: "weeklyView", element: <WeeklyHabit /> },
        { path: "addHabit", element: <AddHabit /> },
        { path: "signIn", element: <SignIn /> },
        { path: "SignUp", element: <SignUp /> },
      ]
    }
  ])
  return (
    <>
      <RouterProvider router={BrowserRouter} />
      <ToastContainer />
    </>
  );
}

export default App;
