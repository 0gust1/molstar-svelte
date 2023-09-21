export const load = async () => {
	const readmeComponentImporter = (await import.meta.glob('../../README.md')) as unknown as Record<
		string,
		App.MdsvexResolver
	>;
	const postResolver = await readmeComponentImporter['../../README.md']();
	const post = await postResolver.default;
	return { content: post };
};
