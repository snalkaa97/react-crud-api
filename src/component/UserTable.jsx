import { useState, useEffect } from "react";

const UserTable = ({ users, setRow, editing, deleteUser }) => {
	const [id, setId] = useState("");
	useEffect(() => {
		if (!editing) {
			setId("");
		}
	}, [id, editing]);
	return (
		<div>
			<h1 className="font-mono md:font-mono text-2xl">List Pegawai</h1>
			<div className="bg-white py-5 sm:p-6">
				<table className="table-fixed">
					<thead className="bg-gray-800 text-gray-100">
						<tr className="px-2">
							<th width="10%" align="left">
								NIP
							</th>
							<th width="20%" align="left">
								Nama
							</th>
							<th width="20%" align="left">
								Email
							</th>
							<th width="10%" align="left">
								No. Hp
							</th>
							<th width="20%" align="left">
								Jabatan
							</th>
							<th width="25%" align="left">
								Unit Kerja
							</th>
							<th width="10%" align="center">
								Actions
							</th>
						</tr>
					</thead>
					<tbody>
						{
						users ? (
							users.map((user) => {
								return (
									<tr key={user.id}>
										<td>{user.nip}</td>
										<td>{user.nama}</td>
										<td>{user.email}</td>
										<td>{user.no_hp}</td>
										<td>{user.jabatan}</td>
										<td>{user.unit_kerja}</td>
										<td>
											<div className="flex gap-1 mt-2">
												<button
													onClick={() => {
														setRow(user);
														setId(user.id);
													}}
													className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-1 px-2.5 border border-blue-500 hover:border-transparent rounded-full"
												>
													Edit
												</button>
												{id !== user.id && (
													<button
														onClick={() => deleteUser(user.id)}
														className="bg-transparent hover:bg-red-500 text-red-700 font-semibold hover:text-white py-1 px-2.5 border border-red-500 hover:border-transparent rounded-full"
													>
														Delete
													</button>
												)}
											</div>
										</td>
									</tr>
								);
							}
						)
						) : <tr></tr>}
					</tbody>
				</table>
			</div>
		</div>
	);
};

export default UserTable;
