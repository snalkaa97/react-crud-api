// import { useEffect} from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./component/Dashboard";
import Login from "./component/Login";
import { useState, useEffect } from "react";
import apiClient from "./services/api";
import store from "./redux/store";
import { Provider } from 'react-redux';


const App = () => {
	const [loggedIn, setLoggedIn] = useState(false);
	const [token, setToken] = useState();
	useEffect(() =>{
		if(sessionStorage.getItem('loggedIn')==='true'){
			setToken(JSON.parse(sessionStorage.getItem('token'))?.access_token);
			setLoggedIn(true);
		} else {
			setLoggedIn(false);
			setToken();
		}
	},[])


	const login = (userToken) => {
		setLoggedIn(true);
		setToken(userToken.access_token)
		sessionStorage.setItem("token", JSON.stringify(userToken));
		sessionStorage.setItem('loggedIn', true);
	}

	const logout = async () => {
		await apiClient.post('/api/logout',{},{
			headers:{
				"Authorization": `Bearer ${token}`
			}
		})
		.then((response)=>{
			if(response.status===200){
				sessionStorage.removeItem("token");
				sessionStorage.setItem("loggedIn", false);
				setToken('');
				setLoggedIn(false);
			}
		})
	}

	const authLink = loggedIn ? <button onClick={logout}>Logout</button> : '';

	useEffect(()=>{
		console.log(loggedIn);
	},[loggedIn, token]);

	if (!loggedIn) {
		return <Login login={login} />;
	} else{
		return (
			<Provider store={store}>
				<Router>
					{authLink}
					<Routes>
						<Route path="/dashboard" element={<Dashboard />} />
						<Route path="/" element={<Dashboard />} />
					</Routes>
				</Router>
			</Provider>
		);

	}
};
export default App;
