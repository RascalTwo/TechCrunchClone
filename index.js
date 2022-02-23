(() => {
	const html = document.querySelector('html')
	function themeHandler(initial, { currentTarget }) {
		const isDark = html.className ? html.className === 'dark-theme' : window.matchMedia('(prefers-color-scheme: dark)').matches;
		const [current, other, symbol] = isDark ? ['light', 'Light', '☾'] : ['dark', 'Dark', '☀'];

		if (!initial) html.className = `${current}-theme`;
		currentTarget.setAttribute('aria-label', `Switch to ${other} theme`);
		currentTarget.textContent = symbol;
	}
	const button = document.querySelector('#toggle-theme');
	button.addEventListener('click', themeHandler.bind(null, false));
	themeHandler(true, { currentTarget: button });
})();