export abstract class AbstractItemDTO {	
	code?: string;
	slug?: string;
	active?: boolean;
	description?: string;

	protected constructor(code: string) {
		this.code = code || '';
	}
}