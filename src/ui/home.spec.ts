import { faker } from '@faker-js/faker'
import fs from 'fs'

import { test } from '../fixtures/services.fixture'

interface ContactFormData {
	testId: number
	name: string
	email: string
	phone: string
	subject: string
	message: string
}

const allGeneratedData: ContactFormData[] = []

function generateUniqueLogFileName(): string {
	const timestamp = new Date().toISOString().replace(/[:.]/g, '-')
	return `./logs/generatedTestData-${timestamp}.json`
}

function saveLogsInJson(logData: ContactFormData[], logFilePath: string): void {
	fs.writeFileSync(logFilePath, JSON.stringify(logData, null, 2), 'utf-8')
}

function generateContactFormData(testId: number): ContactFormData {
	return {
		testId,
		name: faker.person.firstName(), // Name (min. length 1 character)
		email: faker.internet.email(), // Valid email
		phone: faker.string.numeric(Math.floor(Math.random() * 11) + 11), // Phone number between 11 and 21 characters
		subject: faker.lorem.words(3).slice(5, 100), // Subject (5-100 characters)
		message: faker.lorem.sentences(3).slice(20, 2000), // Message (20-2000 characters)
	}
}

test.describe('UI / Contact form', () => {
	test.afterAll(async () => {
		const logFilePath = generateUniqueLogFileName()
		saveLogsInJson(allGeneratedData, logFilePath)
		console.log(`Logs saved to ${logFilePath}`)
	})

	// 24 tests for the contact form with different data
	for (let i = 1; i <= 24; i++) {
		test(`Test #${i}: Successfully submit`, async ({ homePageService }) => {
			const formData = generateContactFormData(i)
			allGeneratedData.push(formData) // Saving data

			await homePageService.openHomePage()
			await homePageService.fillAndSubmitContactForm(formData)
			await homePageService.verifyFormSubmission()
		})
	}
})
