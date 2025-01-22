import { Page } from '@playwright/test'

import { HomePage } from './home.page'
import { logStep } from 'utils/report/logStep'

export class HomeService {
	private homePage: HomePage

	constructor(protected page: Page) {
		this.homePage = new HomePage(page)
	}

	/**
	 * Opens the home page by navigating to the root URL.
	 */
	@logStep('Open home page')
	async openHomePage() {
		await this.homePage.openPage('/')
	}

	/**
	 * Fills out the contact form and submits it with the provided details.
	 * @param name User's name.
	 * @param email User's email address.
	 * @param phone User's phone number.
	 * @param subject The subject of the message.
	 * @param message The message content.
	 */
	@logStep('Fill and submit the contact form')
	async fillAndSubmitContactForm({
		name,
		email,
		phone,
		subject,
		message,
	}: {
		name: string
		email: string
		phone: string
		subject: string
		message: string
	}) {
		await this.homePage.fillContactForm({
			name,
			email,
			phone,
			subject,
			message,
		})

		await this.homePage.submitForm()
	}

	/**
	 * Verifies that the "Thank You" message is displayed after form submission.
	 * Throws an error if the message is not visible.
	 */
	@logStep('Verify success message')
	async verifyFormSubmission() {
		try {
			await this.homePage.waitForElement(
				this.homePage['Thank You Message'],
				'visible',
				20000
			)
		} catch (error) {
			throw new Error(
				'Thank you message is not visible after form submission. ' + error
			)
		}
	}
}
