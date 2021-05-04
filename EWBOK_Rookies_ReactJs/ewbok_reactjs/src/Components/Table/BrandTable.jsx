import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const BrandTable = (props) => {
	const styleicon = {
		fontSize: '20px',
		margin: '3px',
	};
	const onDelete = (id) => {
		if (window.confirm('Are you sure delete this item ?')) {
			props.onDelete(id);
		}
	};
	const showStatus = (status) => {
		if (status === true) {
			return <i class="fa fa-check"></i>;
		} else {
			return <i class="fa fa-lock"></i>;
		}
	};
	const [notify, setnotify] = useState({ name: '' });

	const shownotify = () => {
		// toast.success('test', { position: toast.POSITION.TOP_RIGHT });
	};

	return (
		<div class="main-content">
			<div class="container-fluid content-top-gap">
				<div class="welcome-msg pt-3 pb-4">
					<h1>
						<span class="text-primary ">Brands </span>
						<br />
						<br />
						<Link to="/brands/add" type="submit" class="btn btn-primary btn-style ">
							Create
						</Link>
					</h1>
				</div>
				<div class="card shadow mb-4">
					<div class="card-header py-3 bg-xingcheng-dark border-bottom-xingcheng-light">
						<h6 class="m-0 font-weight-bold text-xingcheng-light">Brands Information</h6>
					</div>
					<div class="card-body">
						<div class="table-responsive">
							<table class="table table-bordered" id="dataTable" width="100%" cellspacing="0">
								<thead>
									<tr>
										<th>ID</th>
										<th>Name</th>
										<th>Status</th>
										<th>Function</th>
									</tr>
								</thead>
								<tfoot>
									<tr>
										<th>ID</th>
										<th>Name</th>
										<th>Status</th>
										<th>Function</th>
									</tr>
								</tfoot>
								<tbody>
									{props.brands.map((brand) => {
										return (
											<tr>
												<td>{brand.id}</td>
												<td>{brand.name}</td>
												<td>{showStatus(brand.status)}</td>
												<td>
													<Link to={`/brands/edit/${brand.id}`} class="link-property">
														<i class="fa fa-edit" style={styleicon}></i>
													</Link>
													<a href="#" class="link-property" to="/brands/detail/:id">
														<i class="fa fa-newspaper-o" style={styleicon}></i>
													</a>
													<a
														href="#"
														class="link-property"
														onClick={() => onDelete(brand.id)}
													>
														<i class="fa fa-close" style={styleicon}></i>
													</a>
												</td>
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
export default BrandTable;
