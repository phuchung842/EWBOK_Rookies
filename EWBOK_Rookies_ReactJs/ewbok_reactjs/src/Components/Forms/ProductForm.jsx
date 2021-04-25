import { useEffect, useState } from 'react';
import { Redirect, useHistory, useParams } from 'react-router-dom';
import callApi from '../../utils/apiCaller';

const ProductForm = (props) => {
	// const { id } = useParams();
	const [product, setproduct] = useState({
		id: '',
		name: '',
		quantity: '',
		publishYear: '',
		brandID: '1',
		materialID: '1',
		productCategoryID: '1',
		price: '',
		promotionPrice: '',
		gender: 'unisex',
		weight: '',
		size: '',
		decription: '',
		image1: '',
		image2: '',
		image3: '',
		image4: '',
		image5: '',
		image6: '',
		image7: '',
		image8: '',
		image9: '',
		image10: '',
	});
	const [brands, setbrands] = useState([]);
	const [materials, setmaterials] = useState([]);
	const [productcategories, setproductcategories] = useState([]);
	const genders = [
		{
			value: 'unisex',
			name: 'Unisex',
		},
		{
			value: 'male',
			name: 'Male',
		},
		{
			value: 'female',
			name: 'Female',
		},
	];
	const [typeform, settypeform] = useState({});
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
			settypeform({ title: 'Edit Product', button: 'Update' });
			var id = match.params.id;
			callApi(`products/${id}`, 'GET', null).then((res) => {
				var data = res.data;
				setproduct(data);
				console.log(data);
				console.log(product);
			});
		} else {
			settypeform({ title: 'Add Product', button: 'Create' });
		}
	}, [callApi, setproduct]);
	const onChange = (e) => {
		var target = e.target;
		var name = target.name;
		var value = target.type == 'checkbox' ? target.checked : target.value;
		console.log(name, value);
		setproduct({ ...product, [name]: value });
		console.log(product);
	};

	const ProductFormData = (product) => {
		let myFormData = new FormData();
		myFormData.append('name', product.name);
		myFormData.append('brandID', product.brandID);
		myFormData.append('materialID', product.materialID);
		myFormData.append('productCategoryID', product.productCategoryID);
		myFormData.append('gender', product.gender);
		myFormData.append('id', product.id);
		myFormData.append('quantity', product.quantity);
		myFormData.append('price', product.price);
		myFormData.append('promotionPrice', product.promotionPrice);
		myFormData.append('size', product.size);
		myFormData.append('weight', product.weight);
		myFormData.append('publishYear', product.publishYear);
		myFormData.append('decription', product.decription);
		return myFormData;
	};
	const requestConfig = {
		headers: {
			'Content-Type': 'multipart/form-data',
		},
	};
	let history = useHistory();
	const onSave = (e) => {
		e.preventDefault();
		if (product.id) {
			console.log(product);
			var data = ProductFormData(product);
			callApi(`products/${product.id}`, 'PUT', data, requestConfig).then((res) => {
				console.log(res);
				history.goBack();
			});
		} else {
			callApi('products', 'POST', product).then((res) => {
				console.log(res);
				if (res.config.data) {
					history.goBack();
				} else {
					history.push('/products/add');
				}
			});
		}
	};
	return (
		<div class="main-content">
			<div class="container-fluid content-top-gap">
				<div class="welcome-msg pt-3 pb-4">
					<h1>
						<span class="text-primary ">{typeform.title}</span>
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
											name="publishYear"
											value={product.publishYear}
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
											name="brandID"
											onChange={onChange}
											value={product.brandID}
											id="inputBrand"
											class="form-control input-style"
										>
											{brands.map((brand) => {
												if (product.brandID == brand.id) {
													// console.log(brand);
													// console.log(product.brandID, brand.id);
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
											name="materialID"
											onChange={onChange}
											value={product.materialID}
											id="inputMaterial"
											class="form-control input-style"
										>
											{materials.map((material) => {
												if (product.materialID === material.id) {
													return (
														<option selected value={material.id}>
															{material.name}
														</option>
													);
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
											name="productCategoryID"
											value={product.productCategoryID}
											onChange={onChange}
											id="inputProductCategory"
											class="form-control input-style"
										>
											{productcategories.map((procate) => {
												if (product.productCategoryID == procate.id) {
													return (
														<option selected value={procate.id}>
															{procate.name}
														</option>
													);
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
											name="promotionPrice"
											value={product.promotionPrice}
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
											{genders.map((gender) => {
												if (product.gender == gender.value) {
													return (
														<option selected value={gender.value}>
															{gender.name}
														</option>
													);
												} else {
													return <option value={gender.value}>{gender.name}</option>;
												}
											})}
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
								<div className="form-row">
									<div class="form-group col-md-6">
										<div class="custom-file">
											<input type="file" class="custom-file-input" id="validatedCustomFile" />
											<label class="custom-file-label" for="validatedCustomFile">
												Image 1 : {product.image1}
											</label>
											<div class="invalid-feedback">Example invalid custom file feedback</div>
										</div>
									</div>
									<div class="form-group col-md-6">
										<div class="custom-file">
											<input type="file" class="custom-file-input" id="validatedCustomFile" />
											<label class="custom-file-label" for="validatedCustomFile">
												Image 2 : {product.image2}
											</label>
											<div class="invalid-feedback">Example invalid custom file feedback</div>
										</div>
									</div>
								</div>
								<div className="form-row">
									<div class="form-group col-md-6">
										<div class="custom-file">
											<input type="file" class="custom-file-input" id="validatedCustomFile" />
											<label class="custom-file-label" for="validatedCustomFile">
												Image 3 : {product.image3}
											</label>
											<div class="invalid-feedback">Example invalid custom file feedback</div>
										</div>
									</div>
									<div class="form-group col-md-6">
										<div class="custom-file">
											<input type="file" class="custom-file-input" id="validatedCustomFile" />
											<label class="custom-file-label" for="validatedCustomFile">
												Image 4 : {product.image4}
											</label>
											<div class="invalid-feedback">Example invalid custom file feedback</div>
										</div>
									</div>
								</div>
								<div className="form-row">
									<div class="form-group col-md-6">
										<div class="custom-file">
											<input type="file" class="custom-file-input" id="validatedCustomFile" />
											<label class="custom-file-label" for="validatedCustomFile">
												Image 5 : {product.image5}
											</label>
											<div class="invalid-feedback">Example invalid custom file feedback</div>
										</div>
									</div>
									<div class="form-group col-md-6">
										<div class="custom-file">
											<input type="file" class="custom-file-input" id="validatedCustomFile" />
											<label class="custom-file-label" for="validatedCustomFile">
												Image 6 : {product.image6}
											</label>
											<div class="invalid-feedback">Example invalid custom file feedback</div>
										</div>
									</div>
								</div>
								<div className="form-row">
									<div class="form-group col-md-6">
										<div class="custom-file">
											<input type="file" class="custom-file-input" id="validatedCustomFile" />
											<label class="custom-file-label" for="validatedCustomFile">
												Image 7 : {product.image7}
											</label>
											<div class="invalid-feedback">Example invalid custom file feedback</div>
										</div>
									</div>
									<div class="form-group col-md-6">
										<div class="custom-file">
											<input type="file" class="custom-file-input" id="validatedCustomFile" />
											<label class="custom-file-label" for="validatedCustomFile">
												Image 8 : {product.image8}
											</label>
											<div class="invalid-feedback">Example invalid custom file feedback</div>
										</div>
									</div>
								</div>
								<div className="form-row">
									<div class="form-group col-md-6">
										<div class="custom-file">
											<input type="file" class="custom-file-input" id="validatedCustomFile" />
											<label class="custom-file-label" for="validatedCustomFile">
												Image 9 : {product.image9}
											</label>
											<div class="invalid-feedback">Example invalid custom file feedback</div>
										</div>
									</div>
									<div class="form-group col-md-6">
										<div class="custom-file">
											<input type="file" class="custom-file-input" id="validatedCustomFile" />
											<label class="custom-file-label" for="validatedCustomFile">
												Image 10 : {product.image10}
											</label>
											<div class="invalid-feedback">Example invalid custom file feedback</div>
										</div>
									</div>
								</div>
								<button type="submit" class="btn btn-primary btn-style mt-4">
									{typeform.button}
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
