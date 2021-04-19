const ProductTable = (props) => {
	console.log(props.products);
	return (
		<div className="content">
			<div className="container-fluid">
				<div className="row">
					<div className="col-md-12">
						<div className="card">
							<div className="card-header card-header-primary">
								<h4 className="card-title ">Products</h4>
								<p className="card-category">
									<a className="btn btn-primary">Create</a>
								</p>
							</div>
							<div className="card-body">
								<div className="table-responsive">
									<table id="myTable" className="table datatb">
										<thead className=" text-primary">
											<th>ID</th>
											<th>Name</th>
											<th>Brand</th>
											<th>Material</th>
											<th>Category</th>
											<th>Quantity</th>
											<th>Price</th>
											<th>Promotion Price</th>
											<th>Function</th>
										</thead>
										<tbody>
											{props.products.map((product) => {
												return (
													<tr>
														<td>{product.id}</td>
														<td>{product.name}</td>
														<td>{product.brandName}</td>
														<td>{product.materialName}</td>
														<td>{product.productCategoryName}</td>
														<td className="text-primary">{product.price}</td>
														<td className="text-primary">{product.promotionPrice}</td>
														<td></td>
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
			</div>
		</div>
	);
};
export default ProductTable;
