import callApi from '../../utils/apiCaller';
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

const MaterialForm = (props) => {
	const [material, setmaterial] = useState({
		id: '',
		name: '',
		status: false,
	});
	const [typeform, settypeform] = useState({});
	useEffect(() => {
		// console.log(id);
		var { match } = props;
		if (match) {
			settypeform({ title: 'Edit Material', button: 'Update' });
			var id = match.params.id;
			callApi(`materials/${id}`, 'GET', null).then((res) => {
				var data = res.data;
				setmaterial(data);
				console.log(data);
				console.log(material);
			});
		} else {
			settypeform({ title: 'Add Material', button: 'Create' });
		}
	}, [callApi, setmaterial]);
	const onChange = (e) => {
		var target = e.target;
		var name = target.name;
		var value = target.type == 'checkbox' ? target.checked : target.value;
		console.log(name, value);
		setmaterial({ ...material, [name]: value });
		console.log(material);
	};
	let history = useHistory();
	const onSave = (e) => {
		e.preventDefault();
		if (material.id) {
			console.log(material);
			callApi(`materials/${material.id}`, 'PUT', material).then((res) => {
				console.log(res);
				history.goBack();
			});
		} else {
			console.log(material);
			callApi('materials', 'POST', material).then((res) => {
				console.log(res);
				if (res.config.data) {
					history.goBack();
				} else {
					history.push('/materials/add');
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
									<div class="form-group col-md-12">
										<label for="inputName" class="input__label">
											Name
										</label>
										<input
											type="text"
											class="form-control input-style"
											id="inputName"
											placeholder="Name"
											name="name"
											value={material.name}
											onChange={onChange}
										/>
									</div>
								</div>
								<div class="form-check check-remember check-me-out">
									<input
										class="form-check-input checkbox"
										type="checkbox"
										name="status"
										value={material.status}
										checked={material.status}
										onChange={onChange}
										id="statusCheck"
									/>
									<label class="form-check-label checkmark" for="statusCheck">
										Status
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
export default MaterialForm;
