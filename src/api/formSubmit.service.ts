import { FormSubmitApiClient } from './formSubmit.client'
import { logStep } from '../utils/report/logStep'
import {
	IFormErrorResponse,
	IFormSubmitPayload,
	IFormSuccessResponse,
} from '../data/types/formSubmit.types'

export class FormSubmitApiService {
	private formSubmitClient: FormSubmitApiClient

	constructor(client: FormSubmitApiClient = new FormSubmitApiClient()) {
		this.formSubmitClient = client
	}

	@logStep('Submitting form data')
	async submitForm(
		payload: IFormSubmitPayload
	): Promise<IFormSuccessResponse | IFormErrorResponse> {
		const response = await this.formSubmitClient.formSubmit(payload)

		if (response.status === 201) {
			return response.body as IFormSuccessResponse
		} else if (response.status === 400) {
			return response.body as IFormErrorResponse
		} else {
			throw new Error(
				response.body.ErrorMessage ||
					'Unexpected status code: ' + response.status
			)
		}
	}
}
