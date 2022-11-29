import AddUserFom from "./AddUserForm";
import UserTable from "./UserTable";
import EditUserForm from "./EditUserForm";
import { useState, useEffect } from "react";
import apiClient from '../services/api'
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
			await apiClient.get(`/api/pegawai`,{
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
		apiClient.post(`/api/pegawai`,user,{
			headers:{
				"Authorization": `Bearer ${getToken()}`
			}
		})
		.then((response)=>{
			if(response.data.status === "success"){
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
		apiClient.put(`/api/pegawai/${updatedUser.id}`,updatedUser,{
			headers:{
				"Authorization": `Bearer ${getToken()}`
			}
		})
		.then((response)=>{
			if(response.data.status==="success"){
				setUsers(
					users.map((user) => (user.id === updatedUser.id ? updatedUser : user))
				);
			}
		})
		setEditing(false);
	};
	const deleteUser = (id) => {
		apiClient.delete(`/api/pegawai/${id}`,{
			headers:{
				"Authorization": `Bearer ${getToken()}`
			}
		})
		.then((response)=>{
			if(response.data.status==="success"){
				setUsers(users.filter((user) => user.id !== id));
			}
		})
	};
	useEffect(() => {
	}, [users]);
	return (
		<div>
			<nav className="bg-gray-800 p-10">
				<div className="md:container md:mx-auto">
					<h1 className="font-sans md:font-mono text-4xl text-gray-100">
						CRUD App
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
