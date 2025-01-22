import { apiConfig } from '../config/apiConfig'
import { IRequestOptions } from '../data/types/api.types'
import {
	IFormSubmitPayload,
	IFormSuccessResponse,
	IFormErrorResponse,
} from '../data/types/formSubmit.types'
import { RequestApi } from '../utils/apiClients/request'

export class FormSubmitApiClient {
	constructor(private request = new RequestApi()) {}

	async formSubmit(credentials: IFormSubmitPayload) {
		const options: IRequestOptions = {
			method: 'post',
			url: apiConfig.endpoints['Submit Form'],
			data: credentials,
			headers: { 'content-type': 'application/json' },
		}

		return await this.request.send<IFormSuccessResponse | IFormErrorResponse>(
			options
		)
	}
}
