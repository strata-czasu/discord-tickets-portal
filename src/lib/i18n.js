export const importJSON = (...modules) => [
	modules[0].locale_id,
	[].concat(...modules.map((mod) => mod.json))
];

// Explicit imports keep translations bundled when built inside node_modules.
const locales = import.meta.glob('$lib/locales/*/*.json', { eager: true });

export const loadTranslations = (locale, ...names) => {
	const supported = getSupportedLocales().includes(locale) ? locale : 'en-GB';
	return importJSON(...names.map((name) => locales[`/src/lib/locales/${supported}/${name}.json`]));
};

export const getSupportedLocales = () => {
	const files = Object.keys(locales);
	return Array.from(
		new Set(
			files.map((file) => {
				const parts = file.split('/');
				return parts[parts.length - 2];
			})
		)
	);
};
