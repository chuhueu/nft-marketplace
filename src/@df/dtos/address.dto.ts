import { Validators } from '@angular/forms';

import { AbstractItemDTO } from './abstract-item.dto';

export class AddressDTO extends AbstractItemDTO {
	type?: string = 'AddressDTO';
	locationName?: string;
	streetName?: string;
	streetNumber?: string;
	postalcode?: string;
	ward?: string;
	district?: string;
	city?: string;
	state?: string;
	country?: string;

	constructor(code: string) {
		super(code);
	}

	/**
     * Create address dto from form object
     *
     * @returns {AddressDTO}
     */
	static createDTOFromForm(form: any): AddressDTO {
		var dto = new AddressDTO(form.code);

		dto.slug = form.slug;
		dto.active = form.active;
		dto.description = form.description;

		dto.locationName = form.locationName;
		dto.streetName = form.streetName;
		dto.streetNumber = form.streetNumber;
		dto.postalcode = form.postalcode;
		dto.ward = form.ward;
		dto.district = form.district;
		dto.city = form.city;
		dto.state = form.state;
		dto.country = form.country;

		return dto;
	}

	/**
     * Create address form object
     *
     * @returns {FormGroup}
     */
	static createForm(entity: any): any {
		var formGroupInstance = {
			code: [entity?.code] || '',
			slug: [entity?.slug] || '',
			active: [entity?.active] || '',
			description: [entity?.description] || '',
			locationName: [
				{
					value: entity?.locationName,
					disabled: false
				}, Validators.required
			] || '',
			streetName: [entity?.streetName] || '',
			streetNumber: [entity?.streetNumber] || '',
			postalcode: [entity?.postalcode] || '',
			ward: [entity?.ward],
			district: [entity?.district] || '',
			city: [
				{
					value: entity?.city,
					disabled: false
				}, Validators.required
			] || '',
			state: [entity?.state] || '',
			country: [
				{
					value: entity?.country,
					disabled: false
				}, Validators.required
			] || '',
		};
		return formGroupInstance;
	}
}