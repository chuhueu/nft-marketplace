import { AbstractItemDTO } from './abstract-item.dto';

export class TitleDTO extends AbstractItemDTO {
	type?: string = 'TitleDTO';
	name?: string;
	position?: number;
	colorCode?: string;
	countryIsoCode?: string;
	genderCode?: string;

	constructor(code: string) {
		super(code);
	}
}