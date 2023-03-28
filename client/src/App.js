import { Route, Routes, Navigate } from "react-router-dom";
import Main from "./components/Main";
import Signup from "./components/Signup";
import Login from "./components/Login";
import { useEffect, useState } from 'react'
import jwt_decode from "jwt-decode";

function App() {
	
	
	const user = localStorage.getItem("token");


	return (
	<div className="App">
		<div>
			<title>NASA's Astronomy Picture of the Day</title>

		</div>
		<Routes>
			{user && <Route path="/" exact element={<Main />} />}
			<Route path="/signup" exact element={<Signup />} />
			<Route path="/login" exact element={<Login />} />
			<Route path="/" element={<Navigate replace to="/login" />} />
		</Routes>
            
			
        </div>
        );
    }
    


export default App;
