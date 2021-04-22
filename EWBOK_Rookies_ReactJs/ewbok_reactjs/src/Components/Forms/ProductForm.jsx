const ProductForm = () => {
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
							<form action="#" method="post">
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
										/>
									</div>
								</div>
								<div class="form-row">
									<div class="form-group col-md-4">
										<label for="inputBrand" class="input__label">
											Brand
										</label>
										<select id="inputBrand" class="form-control input-style">
											<option selected>Choose...</option>
											<option>...</option>
										</select>
									</div>
									<div class="form-group col-md-4">
										<label for="inputMaterial" class="input__label">
											Material
										</label>
										<select id="inputMaterial" class="form-control input-style">
											<option selected>Choose...</option>
											<option>...</option>
										</select>
									</div>
									<div class="form-group col-md-4">
										<label for="inputProductCategory" class="input__label">
											ProductCategory
										</label>
										<select id="inputProductCategory" class="form-control input-style">
											<option selected>Choose...</option>
											<option>...</option>
										</select>
									</div>
								</div>
								<div className="form-row">
									<div class="form-group col-md-6">
										<label for="inputPrice" class="input__label">
											Price
										</label>
										<input type="number" class="form-control input-style" id="inputPrice" />
									</div>
									<div class="form-group col-md-6">
										<label for="inputPromotionPrice" class="input__label">
											Promotion Price
										</label>
										<input
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
										<select id="inputGender" class="form-control input-style">
											<option selected>Choose...</option>
											<option>...</option>
										</select>
									</div>
									<div className="form-group col-md-4">
										<label for="inputWeight" class="input__label">
											Weight
										</label>
										<input type="number" class="form-control input-style" id="inputWeight" />
									</div>
									<div className="form-group col-md-4">
										<label for="inputSize" class="input__label">
											Size
										</label>
										<input type="number" class="form-control input-style" id="inputSize" />
									</div>
								</div>
								<div class="form-row">
									<div class="form-group col-md-12">
										<label for="inputDecription" class="input__label">
											Decription
										</label>
										<textarea
											style={{ height: '150px' }}
											id="inputDecription"
											class="form-control input-style"
										></textarea>
									</div>
								</div>
								<div class="form-check check-remember check-me-out">
									<input class="form-check-input checkbox" type="checkbox" id="gridCheck" />
									<label class="form-check-label checkmark" for="gridCheck">
										Check me out
									</label>
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
