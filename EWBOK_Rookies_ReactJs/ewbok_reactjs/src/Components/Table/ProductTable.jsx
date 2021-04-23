import { Route, Link } from 'react-router-dom';

const ProductTable = (props) => {
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
													<Link class="link-property" to="/product/edit/:id">
														<i class="fa fa-edit" style="font-size:20px; "></i>
													</Link>
													<Link class="link-property" href="/Admin/Product/Detail/@item.ID">
														<i class="fa fa-newspaper-o" style="font-size:20px;"></i>
													</Link>
													<Link class="link-property" href="/Admin/Product/Delete/@item.ID">
														<i class="fa fa-close" style="font-size:20px"></i>
													</Link>
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
