import { test as base } from '@playwright/test'

import { FormSubmitApiService } from '../api/formSubmit.service'
import { HomeService } from '../ui/home.service'

interface IExamplePortalServices {
	homePageService: HomeService
	FormSubmitApiService: FormSubmitApiService
}

export const test = base.extend<IExamplePortalServices>({
	homePageService: async ({ page }, use) => {
		await use(new HomeService(page))
	},
	FormSubmitApiService: async ({}, use) => {
		await use(new FormSubmitApiService())
	},
})
