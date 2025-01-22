import { test, expect } from '@playwright/test'
import { faker } from '@faker-js/faker'

import { FormSubmitApiService } from './formSubmit.service'
import {
	IFormErrorResponse,
	IFormSubmitPayload,
	IFormSuccessResponse,
} from '../data/types/formSubmit.types'

test.describe('API / Form Submit', () => {
	let formSubmitService: FormSubmitApiService

	test.beforeEach(() => {
		formSubmitService = new FormSubmitApiService()
	})

	test('Successfully submit form', async () => {
		const payload: IFormSubmitPayload = {
			name: faker.person.firstName(),
			email: faker.internet.email(),
			phone: faker.string.numeric(Math.floor(Math.random() * 11) + 11),
			subject: faker.lorem.words(3).slice(5, 100),
			description: faker.lorem.sentences(3).slice(20, 2000),
		}

		const response = await formSubmitService.submitForm(payload)

		// Проверяем успешный ответ
		if ('messageid' in response) {
			const successResponse = response as IFormSuccessResponse
			expect(successResponse.messageid).toBeDefined()
			expect(successResponse.name).toBe(payload.name)
			expect(successResponse.email).toBe(payload.email)
			expect(successResponse.phone).toBe(payload.phone)
			expect(successResponse.subject).toBe(payload.subject)
			expect(successResponse.description).toBe(payload.description)
		} else {
			throw new Error('Expected success response, but got error response.')
		}
	})

	test('Should return 400 for invalid payload', async () => {
		const invalidPayload: IFormSubmitPayload = {
			name: '',
			email: '',
			phone: '',
			subject: '',
			description: '',
		}

		const response = await formSubmitService.submitForm(invalidPayload)

		if ('errorCode' in response) {
			const errorResponse = response as IFormErrorResponse
			expect(errorResponse.errorCode).toBe(400)
			expect(errorResponse.error).toBe('BAD_REQUEST')
			expect(errorResponse.fieldErrors).toContain('Name may not be blank')
			expect(errorResponse.fieldErrors).toContain('Email may not be blank')
		} else {
			throw new Error('Expected error response, but got success response.')
		}
	})
})
