import { Link } from 'react-router-dom';

const CommentTable = (props) => {
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
				<div class="card shadow mb-4">
					<div class="card-header py-3 bg-xingcheng-dark border-bottom-xingcheng-light">
						<h6 class="m-0 font-weight-bold text-xingcheng-light">Comments Information</h6>
					</div>
					<div class="card-body">
						<div class="table-responsive">
							<table class="table table-bordered" id="dataTable" width="100%" cellspacing="0">
								<thead>
									<tr>
										<th>Product Name</th>
										<th>Username</th>
										<th>Content</th>
										<th>Function</th>
									</tr>
								</thead>
								<tfoot>
									<tr>
										<th>Product Name</th>
										<th>Username</th>
										<th>Content</th>
										<th>Function</th>
									</tr>
								</tfoot>
								<tbody>
									{props.comments.map((comment) => {
										console.log(comment);
										return (
											<tr>
												<td>{comment.productName}</td>
												<td>{comment.userName}</td>
												<td>{comment.content}</td>
												<td>
													<a href="#" class="link-property" to="/comments/detail/:id">
														<i class="fa fa-newspaper-o" style={styleicon}></i>
													</a>
													<a
														href="#"
														class="link-property"
														onClick={() => onDelete(comment.id)}
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
export default CommentTable;
