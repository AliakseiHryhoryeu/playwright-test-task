import { BasePage } from './base.page'

export class HomePage extends BasePage {
	uniqueElement = '#submitContact'

	// Locators for form
	readonly 'Contact Name Input' = this.findElement(
		'[data-testid="ContactName"]'
	)
	readonly 'Contact Email Input' = this.findElement(
		'[data-testid="ContactEmail"]'
	)
	readonly 'Contact Phone Input' = this.findElement(
		'[data-testid="ContactPhone"]'
	)
	readonly 'Contact Subject Input' = this.findElement(
		'[data-testid="ContactSubject"]'
	)
	readonly 'Contact Message Input' = this.findElement(
		'[data-testid="ContactDescription"]'
	)
	readonly 'Submit Button' = this.findElement('#submitContact')

	// Подтверждения отправки формы
	readonly 'Thank You Message' = this.findElement(
		'//h2[contains(text(), "Thanks for getting in touch")]'
	)

	// Company info
	readonly 'Company Name' = this.findElement('p:has(.fa-home)')
	readonly 'Company Address' = this.findElement('p:nth-of-type(2)')
	readonly 'Company Phone' = this.findElement('p:has(.fa-phone)')
	readonly 'Company Email' = this.findElement('p:has(.fa-envelope)')

	/**
	 * Fills out the contact form with the provided details and submits it.
	 * @param name User's name.
	 * @param email User's email address.
	 * @param phone User's phone number.
	 * @param subject The subject of the message.
	 * @param message The message content.
	 */
	async fillContactForm({
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
		await this.setValue(this['Contact Name Input'], name)
		await this.setValue(this['Contact Email Input'], email)
		await this.setValue(this['Contact Phone Input'], phone)
		await this.setValue(this['Contact Subject Input'], subject)
		await this.setValue(this['Contact Message Input'], message)
	}

	/**
	 * Submits the contact form.
	 */
	async submitForm() {
		await this.click(this['Submit Button'])
	}

	/**
	 * Checks if the "Thank You" message is displayed after form submission.
	 * @returns A promise that resolves to `true` if the message is visible, otherwise `false`.
	 */
	async isThankYouMessageDisplayed(): Promise<boolean> {
		return await this['Thank You Message'].isVisible()
	}
}
