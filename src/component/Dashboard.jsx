import AddUserFom from "./AddUserForm";
import UserTable from "./UserTable";
import EditUserForm from "./EditUserForm";
import { useState, useEffect } from "react";
import axios from "axios";
export default function Dashboard() {
	const [users, setUsers] = useState([]);
	// const [users, setUsers] = useState();
	const getToken = () => {
		const tokenString = sessionStorage.getItem("token");
		const userToken = JSON.parse(tokenString);
		return userToken?.access_token;
	};
	useEffect(() => {
		(async ()=>{
			await axios.get(`http://127.0.0.1:8000/api/pegawai`,{
				headers: {
					"Authorization": `Bearer ${getToken()}`
				}
			})
			.then((response)=>{
				setUsers(response.data.data);
			})
		})();
	},[])
	const [editing, setEditing] = useState(false);
	const [currentUser, SetUser] = useState("");
	const addUser = (user) => {
		console.log(users);
		axios.post(`http://127.0.0.1:8000/api/pegawai`,user,{
			headers:{
				"Authorization": `Bearer ${getToken()}`
			}
		})
		.then((response)=>{
			if(response.data.status=="success"){
				console.log(response.data.data);
				setUsers([...users, response.data.data])
			}
		})
		// setUsers([...users, user]);
	};
	const setRow = (user) => {
		SetUser(user);
		setEditing(true);
	};
	const updateUser = (updatedUser) => {
		axios.put(`http://127.0.0.1:8000/api/pegawai/${updatedUser.id}`,updatedUser,{
			headers:{
				"Authorization": `Bearer ${getToken()}`
			}
		})
		.then((response)=>{
			if(response.data.status=="success"){
				setUsers(
					users.map((user) => (user.id === updatedUser.id ? updatedUser : user))
				);
			}
		})
		setEditing(false);
	};
	const deleteUser = (id) => {
		axios.delete(`http://127.0.0.1:8000/api/pegawai/${id}`,{
			headers:{
				"Authorization": `Bearer ${getToken()}`
			}
		})
		.then((response)=>{
			if(response.data.status=="success"){
				setUsers(users.filter((user) => user.id !== id));
			}
		})
	};
	useEffect(() => {
		console.log(users.data);
	}, [users]);
	return (
		<div>
			<nav className="bg-gray-800 p-10">
				<div className="md:container md:mx-auto">
					<h1 className="font-sans md:font-mono text-4xl text-gray-100">
						CRUD App BPAD DKI Jakarta
					</h1>
				</div>
			</nav>
			<div className="md:container m-5">
				<div className="grid grid-cols-1 sm:grid-cols-2">
					{!editing ? (
						<AddUserFom addUser={addUser} />
					) : (
						<EditUserForm
							currentUser={currentUser}
							updateUser={updateUser}
							setEditing={setEditing}
						/>
					)}

					<UserTable
						users={users}
						setRow={setRow}
						currentUser={currentUser}
						editing={setEditing}
						deleteUser={deleteUser}
					/>
				</div>
			</div>
		</div>
	);
}
