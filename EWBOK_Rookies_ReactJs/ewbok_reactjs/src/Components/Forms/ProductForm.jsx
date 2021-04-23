import { useEffect, useState } from 'react';
import { Redirect, useHistory, useParams } from 'react-router-dom';
import callApi from '../../utils/apiCaller';

const ProductForm = (props) => {
	// const { id } = useParams();
	const [product, setproduct] = useState({
		name: '',
		quantity: '',
		publishyear: '',
		brandid: '1',
		materialid: '1',
		productcategoryid: '1',
		price: '',
		promotionprice: '',
		gender: 'unisex',
		weight: '',
		size: '',
		decription: '',
	});
	const [brands, setbrands] = useState([]);
	const [materials, setmaterials] = useState([]);
	const [productcategories, setproductcategories] = useState([]);
	useEffect(() => {
		callApi('brands', 'GET', null).then((res) => {
			setbrands(res.data);
		});
	}, [callApi, setbrands]);
	useEffect(() => {
		callApi('materials', 'GET', null).then((res) => {
			setmaterials(res.data);
		});
	}, [callApi, setmaterials]);
	useEffect(() => {
		callApi('productcategories', 'GET', null).then((res) => {
			setproductcategories(res.data);
		});
	}, [callApi, setproductcategories]);
	useEffect(() => {
		// console.log(id);
		var { match } = props;
		if (match) {
			var id = match.params.id;
			callApi(`products/${id}`, 'GET', null).then((res) => {
				var data = res.data;
				setproduct(data);
				console.log(product);
			});
		}
	}, [callApi, setproduct]);
	const onChange = (e) => {
		var target = e.target;
		var name = target.name;
		var value = target.type == 'checkbox' ? target.checked : target.value;
		setproduct({ ...product, [name]: value });
	};
	let history = useHistory();
	const onSave = (e) => {
		e.preventDefault();
		console.log(product);

		callApi('products', 'POST', product).then((res) => {
			console.log(res);
			if (res.config.data) {
				history.push('/products');
			} else {
				history.push('/products/add');
			}
		});
	};
	return (
		<div class="main-content">
			<div class="container-fluid content-top-gap">
				<div class="welcome-msg pt-3 pb-4">
					<h1>
						<span class="text-primary ">Add Product</span>
					</h1>
				</div>
				<section class="forms">
					<div class="card card_border py-2 mb-4">
						<div class="card-body">
							<form onSubmit={onSave} action="#" method="post">
								<div class="form-row">
									<div class="form-group col-md-6">
										<label for="inputName" class="input__label">
											Name
										</label>
										<input
											type="text"
											class="form-control input-style"
											id="inputName"
											placeholder="Name"
											name="name"
											value={product.name}
											onChange={onChange}
										/>
									</div>
									<div class="form-group col-md-3">
										<label for="inputQuantity" class="input__label">
											Quantity
										</label>
										<input
											type="number"
											class="form-control input-style"
											id="inputQuantity"
											placeholder="Quantity"
											name="quantity"
											value={product.quantity}
											onChange={onChange}
										/>
									</div>
									<div class="form-group col-md-3">
										<label for="inputPublishYear" class="input__label">
											Publish Year
										</label>
										<input
											type="number"
											class="form-control input-style"
											id="inputPublishYear"
											placeholder="Publish Year"
											name="publishyear"
											value={product.publishyear}
											onChange={onChange}
										/>
									</div>
								</div>
								<div class="form-row">
									<div class="form-group col-md-4">
										<label for="inputBrand" class="input__label">
											Brand
										</label>
										<select
											name="brandid"
											onChange={onChange}
											value={product.brandID}
											id="inputBrand"
											class="form-control input-style"
										>
											{brands.map((brand) => {
												if (product.brandID == brand.id) {
													console.log(brand);
													console.log(product.brandID, brand.id);
													return (
														<option selected value={brand.id}>
															{brand.name}
														</option>
													);
												} else {
													return <option value={brand.id}>{brand.name}</option>;
												}
											})}
										</select>
									</div>
									<div class="form-group col-md-4">
										<label for="inputMaterial" class="input__label">
											Material
										</label>
										<select
											name="materialid"
											onChange={onChange}
											value={product.materialID}
											id="inputMaterial"
											class="form-control input-style"
										>
											{materials.map((material) => {
												if (product.materialID === material.id) {
													return <option defaultValue={material.id}>{material.name}</option>;
												} else {
													return <option value={material.id}>{material.name}</option>;
												}
											})}
										</select>
									</div>
									<div class="form-group col-md-4">
										<label for="inputProductCategory" class="input__label">
											ProductCategory
										</label>
										<select
											name="productcategoryid"
											value={product.productcategoryID}
											onChange={onChange}
											id="inputProductCategory"
											class="form-control input-style"
										>
											{productcategories.map((procate) => {
												if (product.productcategoryID == procate.id) {
													// alert(procate.name);
													return <option defaultValue={procate.id}>{procate.name}</option>;
												} else {
													return <option value={procate.id}>{procate.name}</option>;
												}
											})}
										</select>
									</div>
								</div>
								<div className="form-row">
									<div class="form-group col-md-6">
										<label for="inputPrice" class="input__label">
											Price
										</label>
										<input
											name="price"
											value={product.price}
											onChange={onChange}
											type="number"
											class="form-control input-style"
											id="inputPrice"
										/>
									</div>
									<div class="form-group col-md-6">
										<label for="inputPromotionPrice" class="input__label">
											Promotion Price
										</label>
										<input
											name="promotionprice"
											value={product.promotionprice}
											onChange={onChange}
											type="number"
											class="form-control input-style"
											id="inputPromotionPrice"
										/>
									</div>
								</div>
								<div className="form-row">
									<div class="form-group col-md-4">
										<label for="inputGender" class="input__label">
											Gender
										</label>
										<select
											name="gender"
											value={product.gender}
											onChange={onChange}
											id="inputGender"
											class="form-control input-style"
										>
											<option selected value="unisex">
												Unisex
											</option>
											<option value="male">Male</option>
											<option value="female">Female</option>
										</select>
									</div>
									<div className="form-group col-md-4">
										<label for="inputWeight" class="input__label">
											Weight
										</label>
										<input
											name="weight"
											value={product.weight}
											onChange={onChange}
											type="number"
											class="form-control input-style"
											id="inputWeight"
										/>
									</div>
									<div className="form-group col-md-4">
										<label for="inputSize" class="input__label">
											Size
										</label>
										<input
											name="size"
											value={product.size}
											onChange={onChange}
											type="number"
											class="form-control input-style"
											id="inputSize"
										/>
									</div>
								</div>
								<div class="form-row">
									<div class="form-group col-md-12">
										<label for="inputDecription" class="input__label">
											Decription
										</label>
										<textarea
											name="decription"
											value={product.decription}
											onChange={onChange}
											style={{ height: '150px' }}
											id="inputDecription"
											class="form-control input-style"
										></textarea>
									</div>
								</div>
								<button type="submit" class="btn btn-primary btn-style mt-4">
									Create
								</button>
							</form>
						</div>
					</div>
				</section>
			</div>
		</div>
	);
};
export default ProductForm;
