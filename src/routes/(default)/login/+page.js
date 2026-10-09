import { loadTranslations } from '$lib/i18n';

/** @type {import('./$types').PageLoad} */
export async function load({ parent, url }) {
	const { locale } = await parent();
	return {
		translations: loadTranslations(locale, '_common', 'misc'),
		query: url.search
	};
}
