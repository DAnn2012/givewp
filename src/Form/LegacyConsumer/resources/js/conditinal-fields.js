window.addEventListener('load', () => {
	/**
	 * Handle fields visibility
	 * @unreleased
	 */
	function handleVisibility(donationForm) {
		donationForm.querySelectorAll('[data-field-visibility-conditions]').forEach(function (field) {
			const fieldWrapper = field.closest('.form-row');
			const visibilityConditions = JSON.parse(field.getAttribute('data-field-visibility-conditions'));
			let visible = false;
			let hasAtleastOneFieldController = false;
			for (const {field, value} of visibilityConditions) {
				const inputs = donationForm.querySelectorAll(`[name="${field}"]`);
				hasAtleastOneFieldController = hasAtleastOneFieldController ? hasAtleastOneFieldController : !! inputs.length;

				if (inputs) {
					inputs.forEach((input) => {
						const fieldType = input.getAttribute('type');

						if (fieldType && (fieldType === 'radio' || fieldType === 'checkbox')) {
							if (input.checked && input.value === value) {
								visible = true;
							}
						} else if (input.value === value) {
							visible = true;
						}
					});
				}
			}

			if( ! hasAtleastOneFieldController ) {
				return;
			}

			visible ?
				fieldWrapper.classList.remove('give-hidden') :
				fieldWrapper.classList.add('give-hidden');
		});
	}

	/**
	 * @unreleased
	 * @param event
	 */
	function handleVisibilityOnChangeHandler(event) {
		handleVisibility(event.target.closest('.give-form') );
	}

	document.querySelectorAll('form.give-form')
		.forEach(function (donationForm) {
			handleVisibility(donationForm);
			donationForm.querySelectorAll('input, select, textarea')
				.forEach(field => field.addEventListener('change', handleVisibilityOnChangeHandler));
		});
});
// @todo: attach event when form reload on gateway switch.
