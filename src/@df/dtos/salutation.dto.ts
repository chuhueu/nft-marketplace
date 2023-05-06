import { AbstractItemDTO } from './abstract-item.dto';

export class SalutationDTO extends AbstractItemDTO {
	type?: string = 'SalutationDTO';
	name?: string;
	position?: number;
	colorCode?: string;
	countryIsoCode?: string;
	genderCode?: string;

	constructor(code: string) {
		super(code);
	}
}