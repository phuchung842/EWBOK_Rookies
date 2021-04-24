import { Link } from 'react-router-dom';

const UserTable = (props) => {
	return (
		<div class="main-content">
			<div class="container-fluid content-top-gap">
				<div class="welcome-msg pt-3 pb-4">
					<h1>
						<span class="text-primary ">Users </span>
						<br />
						<br />
						<Link to="/users/add" type="submit" class="btn btn-primary btn-style ">
							Create
						</Link>
					</h1>
				</div>
				<div class="card shadow mb-4">
					<div class="card-header py-3 bg-xingcheng-dark border-bottom-xingcheng-light">
						<h6 class="m-0 font-weight-bold text-xingcheng-light">Users Information</h6>
					</div>
					<div class="card-body">
						<div class="table-responsive">
							<table class="table table-bordered" id="dataTable" width="100%" cellspacing="0">
								<thead>
									<tr>
										<th>Username</th>
										<th>Full Name</th>
										<th>Email</th>
										<th>Phone</th>
									</tr>
								</thead>
								<tfoot>
									<tr>
										<th>Username</th>
										<th>Full Name</th>
										<th>Email</th>
										<th>Phone</th>
									</tr>
								</tfoot>
								<tbody>
									{props.users.map((user) => {
										return (
											<tr>
												<td>{user.userName}</td>
												<td>{user.fullName}</td>
												<td>{user.email}</td>
												<td>{user.phoneNumber}</td>
											</tr>
										);
									})}
								</tbody>
							</table>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
export default UserTable;
