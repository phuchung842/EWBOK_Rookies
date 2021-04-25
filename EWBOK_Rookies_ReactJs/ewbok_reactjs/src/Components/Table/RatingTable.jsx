const RatingTable = (props) => {
	const styleicon = {
		fontSize: '20px',
		margin: '3px',
	};
	const onDelete = (userid, productid) => {
		if (window.confirm('Are you sure delete this item ?')) {
			props.onDelete(userid, productid);
		}
	};
	return (
		<div class="main-content">
			<div class="container-fluid content-top-gap">
				<div class="card shadow mb-4">
					<div class="card-header py-3 bg-xingcheng-dark border-bottom-xingcheng-light">
						<h6 class="m-0 font-weight-bold text-xingcheng-light">Ratings Information</h6>
					</div>
					<div class="card-body">
						<div class="table-responsive">
							<table class="table table-bordered" id="dataTable" width="100%" cellspacing="0">
								<thead>
									<tr>
										<th>Product Name</th>
										<th>Username</th>
										<th>Star</th>
										<th>Function</th>
									</tr>
								</thead>
								<tfoot>
									<tr>
										<th>Product Name</th>
										<th>Username</th>
										<th>Star</th>
										<th>Function</th>
									</tr>
								</tfoot>
								<tbody>
									{props.ratings.map((rating) => {
										return (
											<tr>
												<td>{rating.productName}</td>
												<td>{rating.username}</td>
												<td>{rating.star}</td>
												<td>
													<a href="#" class="link-property" to="/rating/detail/:id">
														<i class="fa fa-newspaper-o" style={styleicon}></i>
													</a>
													<a
														href="#"
														class="link-property"
														onClick={() => onDelete(rating.userID, rating.productID)}
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
export default RatingTable;
