import { useState, useEffect } from 'react';
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
		// console.log(`${Config.API_URL}${image}`);
		return `${Config.API_URL}${image}`;
	};
	const [filterproduct, setfilterproduct] = useState([]);
	useEffect(() => {
		if (props.products != null) {
			// console.log(filterproduct);
			// console.log(props.products);
			setfilterproduct(props.products);
		}
		// console.log(filterproduct);
	}, [setfilterproduct]);
	const filter = (list, searchkey) => {
		if (searchkey.length > 0) {
			console.log('have search key');
			console.log(list);
			return list.filter(
				(item) =>
					item.name.toLowerCase().includes(searchkey.toLowerCase()) ||
					item.brandName.toLowerCase().includes(searchkey.toLowerCase()) ||
					item.materialName.toLowerCase().includes(searchkey.toLowerCase()) ||
					item.productCategoryName.toLowerCase().includes(searchkey.toLowerCase())
			);
		} else {
			console.log('no search key');
			console.log(list);
			return list;
		}
	};
	const filterbysearchkey = (e) => {
		var target = e.target;
		var value = null;
		value = target.value;
		console.log(value);
		setfilterproduct(filter(props.products, value));
		console.log(filterproduct);
		console.log(props.products);
	};

	return (
		<div class="main-content">
			<div class="container-fluid content-top-gap">
				<div class="welcome-msg pt-3 pb-4">
					<div class="form-row">
						<div class="form-group col-md-122">
							<h1>
								<span class="text-primary ">Products </span>
							</h1>
						</div>
					</div>

					<div class="form-row">
						<div class="form-group col-md-8">
							<h1>
								<Link to="/products/add" type="submit" class="btn btn-primary btn-style ">
									Create
								</Link>
							</h1>
						</div>
						<div class="form-group col-md-4">
							<input
								onChange={filterbysearchkey}
								type="text"
								class="form-control input-style"
								name="searchkey"
								id="inputSearch"
								placeholder="Search"
							/>
						</div>
					</div>
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
									{filterproduct.map((product) => {
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
