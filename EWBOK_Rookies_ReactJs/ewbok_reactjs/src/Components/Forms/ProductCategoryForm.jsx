import callApi from '../../utils/apiCaller';
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

const ProductCategoryForm = (props) => {
	const [productcategory, setproductcategory] = useState({
		id: '',
		name: '',
		displayOrder: '',
		status: false,
		showOnHome: false,
	});
	const [typeform, settypeform] = useState({});
	useEffect(() => {
		// console.log(id);
		var { match } = props;
		if (match) {
			settypeform({ title: 'Edit Product Category', button: 'Update' });
			var id = match.params.id;
			callApi(`productcategories/${id}`, 'GET', null).then((res) => {
				var data = res.data;
				setproductcategory(data);
				console.log(data);
				console.log(productcategory);
			});
		} else {
			settypeform({ title: 'Add Product Category', button: 'Create' });
		}
	}, [callApi, setproductcategory]);
	const onChange = (e) => {
		var target = e.target;
		var name = target.name;
		var value = target.type == 'checkbox' ? target.checked : target.value;
		console.log(name, value);
		setproductcategory({ ...productcategory, [name]: value });
		console.log(productcategory);
	};
	let history = useHistory();
	const onSave = (e) => {
		e.preventDefault();
		if (productcategory.id) {
			console.log(productcategory);
			callApi(`productcategories/${productcategory.id}`, 'PUT', productcategory).then((res) => {
				console.log(res);
				history.goBack();
			});
		} else {
			console.log(productcategory);
			callApi('productcategories', 'POST', productcategory).then((res) => {
				console.log(res);
				if (res.config.data) {
					history.goBack();
				} else {
					history.push('/productcategories/add');
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
									<div class="form-group col-md-9">
										<label for="inputName" class="input__label">
											Name
										</label>
										<input
											type="text"
											class="form-control input-style"
											id="inputName"
											placeholder="Name"
											name="name"
											value={productcategory.name}
											onChange={onChange}
										/>
									</div>
									<div class="form-group col-md-3">
										<label for="inputDisplayOrder" class="input__label">
											Display Order
										</label>
										<input
											type="number"
											class="form-control input-style"
											id="inputDisplayOrder"
											placeholder="Display Order"
											name="displayOrder"
											value={productcategory.displayOrder}
											onChange={onChange}
										/>
									</div>
								</div>
								<div class="form-check check-remember check-me-out">
									<input
										class="form-check-input checkbox"
										type="checkbox"
										name="status"
										value={productcategory.status}
										checked={productcategory.status}
										onChange={onChange}
										id="statusCheck"
									/>
									<label class="form-check-label checkmark" for="statusCheck">
										Status
									</label>
								</div>
								<div class="form-check check-remember check-me-out">
									<input
										class="form-check-input checkbox"
										type="checkbox"
										name="showOnHome"
										value={productcategory.showOnHome}
										checked={productcategory.showOnHome}
										onChange={onChange}
										id="showonhomeCheck"
									/>
									<label class="form-check-label checkmark" for="showonhomeCheck">
										Show On Home
									</label>
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
export default ProductCategoryForm;
