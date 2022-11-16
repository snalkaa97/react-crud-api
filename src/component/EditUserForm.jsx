import { useState, useEffect } from "react";
const EditUserForm = (props) => {
	const [user, setUser] = useState(props.currentUser);
	const eventHandler = (e) => {
		setUser({ ...user, [e.target.name]: e.target.value });
	};
	const submitUser = () => {
		if (!user.nama || !user.email) return;
		props.updateUser(user);
	};
	useEffect(() => {
		setUser(props.currentUser);
	}, [props]);
	return (
		<div>
			<h1 className="font-mono md:font-mono text-2xl">Edit Pegawai</h1>
			<div className="bg-white py-5 sm:p-6 mt-3">
			<div className="grid grid-cols-1 sm:grid-cols-2">
					<div>
						<label
							htmlFor="first-name"
							className="block text-sm font-medium text-gray-700"
						>
							Nama
						</label>
						<input
							type="text"
							name="nama"
							value={user.nama}
							onChange={eventHandler}
							className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
						/>
					</div>
					<div>
						<label
							htmlFor="first-name"
							className="block text-sm font-medium text-gray-700"
						>
							NIP
						</label>
						<input
							type="text"
							name="nip"
							value={user.nip}
							onChange={eventHandler}
							className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
						/>
					</div>
					<div className="mt-5">
						<label
							htmlFor="last-name"
							className="block text-sm font-medium text-gray-700"
						>
							Email
						</label>
						<input
							type="text"
							name="email"
							value={user.email}
							onChange={eventHandler}
							className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
						/>
					</div>
					<div className="mt-5">
						<label
							htmlFor="last-name"
							className="block text-sm font-medium text-gray-700"
						>
							No. Hp
						</label>
						<input
							type="text"
							name="no_hp"
							value={user.no_hp}
							onChange={eventHandler}
							className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
						/>
					</div>
					<div className="mt-5">
						<label
							htmlFor="last-name"
							className="block text-sm font-medium text-gray-700"
						>
							Jabatan
						</label>
						<input
							type="text"
							name="jabatan"
							value={user.jabatan}
							onChange={eventHandler}
							className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
						/>
					</div>
					<div className="mt-5">
						<label
							htmlFor="last-name"
							className="block text-sm font-medium text-gray-700"
						>
							Unit Kerja
						</label>
						<input
							type="text"
							name="unit_kerja"
							value={user.unit_kerja}
							onChange={eventHandler}
							className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
						/>
					</div>
				</div>
			</div>
			<div className="py-3 text-right sm:px-6">
				<button
					onClick={() => submitUser()}
					type="submit"
					className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
				>
					Save
				</button>
				<button
					onClick={() => props.setEditing(false)}
					className="ml-2 border border-gray-400 inline-flex justify-center rounded-md border border-transparent py-2 px-4 text-sm font-medium text-white shadow-sm bg-gray-400 hover:bg-gray-500 hover:b0rder-gray-500 focus:ring-offset-2"
				>
					Cancel
				</button>
			</div>
		</div>
	);
};
export default EditUserForm;
