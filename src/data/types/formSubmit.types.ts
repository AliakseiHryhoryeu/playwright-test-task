import { IRequestOptions, IResponseFields } from './api.types'

export interface IFormSubmitPayload {
	name: string
	email: string
	phone: string
	subject: string
	description: string
}

export interface IFormSuccessResponse extends IResponseFields {
	messageid: string
	name: string
	email: string
	phone: string
	subject: string
	description: string
}

export interface IFormErrorResponse extends IResponseFields {
	errorCode: number
	error: string
	errorMessage: string
	fieldErrors: string[]
}
