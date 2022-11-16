// import { useEffect} from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./component/Dashboard";
import Login from "./component/Login";
const App = () => {
	const setToken = (userToken) => {
		sessionStorage.setItem("token", JSON.stringify(userToken));
		// navigate("/dashboard");
	};

	const getToken = () => {
		const tokenString = sessionStorage.getItem("token");
		const userToken = JSON.parse(tokenString);
		return userToken?.access_token;
	};

	const token = getToken();
	if (!token) {
		return <Login setToken={setToken} />;
	}
	return (
		<Router>
			<Routes>
				<Route path="/dashboard" element={<Dashboard />} />
				<Route path="/" element={<Dashboard />} />
			</Routes>
		</Router>
	);
};
export default App;
