const ProductCategoryTable = (props) => {
	return (
		<div class="main-content">
			<div class="container-fluid content-top-gap">
				<div class="card shadow mb-4">
					<div class="card-header py-3 bg-xingcheng-dark border-bottom-xingcheng-light">
						<h6 class="m-0 font-weight-bold text-xingcheng-light">Users Information</h6>
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
												<td>test</td>
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
