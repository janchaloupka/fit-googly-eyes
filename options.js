document.addEventListener('DOMContentLoaded', () => {
	const everywhere = document.getElementById('everywhere');
	const main = document.getElementById('main');
	const em = document.getElementById('em');
	const wis = document.getElementById('wis');
	const merlin = document.getElementById('merlin');
	const eva = document.getElementById('eva');

	const status = document.getElementById('status');

	// Saves options to chrome.storage
	document.getElementById('save').addEventListener('click', () => {
		chrome.storage.local.set({
			everywhere: everywhere.checked,
			main: main.checked,
			em: em.checked,
			wis: wis.checked,
			merlin: merlin.checked,
			eva: eva.checked
		}, () => {
			// Update status to let user know options were saved.
			status.textContent = 'Nastavení uloženo.';
			setTimeout(() => status.textContent = '', 3000);
		});
	});

	everywhere.addEventListener("change", () => {
		main.disabled = everywhere.checked;
		em.disabled = everywhere.checked || main.checked;
		wis.disabled = everywhere.checked;
		merlin.disabled = everywhere.checked;
		eva.disabled = everywhere.checked;

		if(!everywhere.checked) return;

		main.checked = true;
		em.checked = true;
		wis.checked = true;
		merlin.checked = true;
		eva.checked = true;
	});

	main.addEventListener("change", () => {
		em.disabled = main.checked;

		if(main.checked) em.checked = true;
	});

	// Restores checkbox state using the preferences
	// stored in chrome.storage.
	chrome.storage.local.get({
		everywhere: false,
		main: false,
		em: true,
		wis: true,
		merlin: false,
		eva: false
	}, items => {
		everywhere.checked = items.everywhere;
		main.checked = items.main;
		em.checked = items.em;
		wis.checked = items.wis;
		merlin.checked = items.merlin;
		eva.checked = items.eva;

		main.disabled = everywhere.checked;
		em.disabled = everywhere.checked || main.checked;
		wis.disabled = everywhere.checked;
		merlin.disabled = everywhere.checked;
		eva.disabled = everywhere.checked;
	});
});
