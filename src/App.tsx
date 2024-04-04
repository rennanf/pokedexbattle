import React, { useEffect } from "react";
import Navbar from "./sections/Navbar";
import Footer from "./sections/Footer";
import Wrapper from "./sections/Wrapper";
import Background from "./components/Background";
import {BrowserRouter,Routes,Route,Navigate} from 'react-router-dom'
import "./scss/index.scss";
import Search from "./pages/Search";
import MyList from "./pages/MyList";
import About from "./pages/About";
import Compare from "./pages/Compare";
import Pokemon from "./pages/Pokemon";
import { ToastContainer, ToastOptions, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAppSelector } from "./app/hooks";
import { useDispatch } from "react-redux";
import { clearToasts, setUserStatus } from "./app/slices/AppSlice";
import { onAuthStateChanged } from "firebase/auth";
import { firebaseAuth } from "./utils/FirebaseConfig";


function App() {

  const {toasts} = useAppSelector(({app})=>app);
  const dispatch = useDispatch();
  useEffect(()=>{
    onAuthStateChanged(firebaseAuth,(currentUser)=>{
      if(currentUser) {
        dispatch(setUserStatus({email:currentUser.email}))
      }
    })
  },[dispatch])

  useEffect(()=>{
    if(toasts.length){
      const toastOptions:ToastOptions= {
        position: "bottom-right",
        autoClose: 2000,
        pauseOnHover:true,
        draggable:true,
        theme: "dark",
      };
      toasts.forEach((message:string)=>{
        toast(message, toastOptions);
      });
      dispatch(clearToasts());
    }
  },[toasts,dispatch])

  return (<div className="main-container">
    <Background />
    <BrowserRouter>
    <div className="app">
      <Navbar />
      <Routes>
        <Route element={<Search />} path="/search" />
        <Route element={<MyList />} path="/list" />
        <Route element={<About />} path="/About" />
        <Route element={<Compare />} path="/compare" />
        <Route element={<Pokemon />} path="/pokemon/:id" />
        <Route element={<Navigate to="/pokemon/1"/>} path="*"/>
      </Routes>
      <Footer />
    </div>
      <ToastContainer />
    </BrowserRouter>
  </div>
  );
}
export default App;