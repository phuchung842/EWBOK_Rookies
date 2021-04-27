import { Route, Link, useParams } from 'react-router-dom';
import * as Config from '../../Constants/Config.js';

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

	const setImageUrl = (image) => {
		console.log(`${Config.API_URL}${image}`);
		return `${Config.API_URL}${image}`;
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
										<th>Image</th>
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
										<th>Image</th>
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
												<td>
													<img src={setImageUrl(product.image1)} width="50" />
												</td>
												<td className="align-middle">{product.name}</td>
												<td className="align-middle">{product.brandName}</td>
												<td className="align-middle">{product.materialName}</td>
												<td className="align-middle">{product.productCategoryName}</td>
												<td className="align-middle">{product.quantity}</td>
												<td className="text-primary align-middle">{product.price}</td>
												<td className="text-primary align-middle">{product.promotionPrice}</td>
												<td className="align-middle text-center">
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
