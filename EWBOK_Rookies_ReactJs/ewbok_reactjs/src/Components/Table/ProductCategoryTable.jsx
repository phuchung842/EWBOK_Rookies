import { Link } from 'react-router-dom';

const ProductCategoryTable = (props) => {
	const styleicon = {
		fontSize: '20px',
		margin: '3px',
	};
	const onDelete = (id) => {
		if (window.confirm('Are you sure delete this item ?')) {
			props.onDelete(id);
		}
	};
	return (
		<div class="main-content">
			<div class="container-fluid content-top-gap">
				<div class="welcome-msg pt-3 pb-4">
					<h1>
						<span class="text-primary ">Product Categories </span>
						<br />
						<br />
						<Link to="/productcategories/add" type="submit" class="btn btn-primary btn-style ">
							Create
						</Link>
					</h1>
				</div>
				<div class="card shadow mb-4">
					<div class="card-header py-3 bg-xingcheng-dark border-bottom-xingcheng-light">
						<h6 class="m-0 font-weight-bold text-xingcheng-light">Product Categories Information</h6>
					</div>
					<div class="card-body">
						<div class="table-responsive">
							<table class="table table-bordered" id="dataTable" width="100%" cellspacing="0">
								<thead>
									<tr>
										<th>ID</th>
										<th>Name</th>
										<th>MetaTitle</th>
										<th>DisplayOrder</th>
										<th>Status</th>
										<th>ShowOnHome</th>
										<th>Function</th>
									</tr>
								</thead>
								<tfoot>
									<tr>
										<th>ID</th>
										<th>Name</th>
										<th>MetaTitle</th>
										<th>DisplayOrder</th>
										<th>Status</th>
										<th>ShowOnHome</th>
										<th>Function</th>
									</tr>
								</tfoot>
								<tbody>
									{props.productcategories.map((productcategory) => {
										return (
											<tr>
												<td>{productcategory.id}</td>
												<td>{productcategory.name}</td>
												<td>{productcategory.metatitle}</td>
												<td>{productcategory.displayorder}</td>
												<td>{productcategory.status}</td>
												<td>{productcategory.showonhome}</td>
												<td>
													<Link
														to={`/productcategories/edit/${productcategory.id}`}
														class="link-property"
													>
														<i class="fa fa-edit" style={styleicon}></i>
													</Link>
													<a
														href="#"
														class="link-property"
														to="/productcategories/detail/:id"
													>
														<i class="fa fa-newspaper-o" style={styleicon}></i>
													</a>
													<a
														href="#"
														class="link-property"
														onClick={() => onDelete(productcategory.id)}
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
export default ProductCategoryTable;
