import { useEffect } from 'react';
import { Route, Link, useParams } from 'react-router-dom';
import callApi from '../../utils/apiCaller';

const ProductTable = (props) => {
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
						<span class="text-primary ">Products </span>
						<br />
						<br />
						<Link to="/products/add" type="submit" class="btn btn-primary btn-style ">
							Create
						</Link>
					</h1>
				</div>
				<div class="card shadow mb-4">
					<div class="card-header py-3 bg-xingcheng-dark border-bottom-xingcheng-light">
						<h6 class="m-0 font-weight-bold text-xingcheng-light">Products Information</h6>
					</div>
					<div class="card-body">
						<div class="table-responsive">
							<table class="table table-bordered" id="dataTable" width="100%" cellspacing="0">
								<thead>
									<tr>
										<th>ID</th>
										<th>Name</th>
										<th>Brand</th>
										<th>Material</th>
										<th>Category</th>
										<th>Quantity</th>
										<th>Price</th>
										<th>Promotion Price</th>
										<th>Function</th>
									</tr>
								</thead>
								<tfoot>
									<tr>
										<th>ID</th>
										<th>Name</th>
										<th>Brand</th>
										<th>Material</th>
										<th>Category</th>
										<th>Quantity</th>
										<th>Price</th>
										<th>Promotion Price</th>
										<th>Function</th>
									</tr>
								</tfoot>
								<tbody>
									{props.products.map((product) => {
										return (
											<tr>
												<td>{product.id}</td>
												<td>{product.name}</td>
												<td>{product.brandName}</td>
												<td>{product.materialName}</td>
												<td>{product.productCategoryName}</td>
												<td>{product.quantity}</td>
												<td className="text-primary">{product.price}</td>
												<td className="text-primary">{product.promotionPrice}</td>
												<td>
													<Link to={`/products/edit/${product.id}`} class="link-property">
														<i class="fa fa-edit" style={styleicon}></i>
													</Link>
													<a href="#" class="link-property" to="/product/detail/:id">
														<i class="fa fa-newspaper-o" style={styleicon}></i>
													</a>
													<a
														href="#"
														class="link-property"
														onClick={() => onDelete(product.id)}
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
export default ProductTable;
