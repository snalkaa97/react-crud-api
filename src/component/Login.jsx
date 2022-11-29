import { useState } from "react";
import apiClient from '../services/api'

// import axios from 'axios';
export default function Login(props) {
	const initialState = {
		email: "",
		password: "",
	};
	const [data, setData] = useState(initialState);
	const [refresh, setRefresh] = useState(false);
	const eventChanger = (e) => {
		setData({ ...data, [e.target.name]: e.target.value });
	};
	async function loginUser(credentials) {
		await apiClient.get('/sanctum/csrf-cookie').then(response => {
			// Login...
			return apiClient.post('/api/login',credentials)
			.then((data) => {
				console.log(data);
				if(data.status===200){
					props.login(data.data);
					setRefresh(true);
				}
			})
		});
	}
	const handleSubmit = async (e) => {
		e.preventDefault();
		loginUser(data);
	};
	return (
		<div className="md:container m-5">
			<div className="flex justify-center">
				<div>
					<h1 className="font-mono md:font-mono text-2xl">Login</h1>
					<form onSubmit={handleSubmit}>
					<div className="bg-white py-5 sm:p-6 mt-3">
						<div className="grid grid-cols-1 sm:grid-cols-2">
							<div>
								<label
									htmlFor="first-name"
									className="block text-sm font-medium text-gray-700"
								>
									Email
								</label>
								<input
									type="text"
									name="email"
									value={data.email}
									onChange={eventChanger}
									className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
								/>
							</div>

							<div className="ml-5">
								<label
									htmlFor="last-name"
									className="block text-sm font-medium text-gray-700"
								>
									Password
								</label>
								<input
									type="password"
									name="password"
									value={data.password}
									onChange={eventChanger}
									className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
								/>
							</div>
						</div>
					</div>
					<div className="py-3 text-right sm:px-6">
						<button
							type="submit"
							className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
						>
							Login
						</button>
						{refresh&&(
							<a href="/dashboard"
								className="inline-flex justify-center rounded-md border border-transparent bg-gray-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
							>
								Reresh
							</a>
						)}
					</div>
					</form>
				</div>
			</div>
		</div>
	);
}
