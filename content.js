/**
 * Watching Eyes script - By Kurt (kurt.grigg@virgin.net)
 * Script featured on Dynamic Drive
 * Visit http://www.dynamicdrive.com for this script and more
 *
 * Updated for modern browsers by Jan Chaloupka <osobni@janchaloupka.cz>
 */

function enable(){
	/**
	 * Eyeballs element
	 * @type {HTMLImageElement}
	 */
	const eyeball = document.createElement("img");
	eyeball.src = "data:image/gif;base64,R0lGODlhRQAiAKIAAAAAAAAA/97e3uTk5Onp6e3t7fPz8/r6+iH5BAkAAAEALAAAAABFACIAAAj+AAMIHEhwIICDCA8WXMiwYYCECR1KJIjQgMWLBQognCix4kWLGTdyLHjwwMeTGQsQUDjSIACTJzFmXAmg5cMDOHPGTKlypc2XOXHuTEnA58SSQXWinFmUpUOkSWF+JNq0ZkOgUZXK7Fl0gFWGWLNKBcm061eSYoMu5er1aVqtZNmeNfgWrgGqBAa0XRg27dqiefcaNFBX6NSyegULBEC48N+ues/2fXuYa+C5k/1uBXx5cOO6jwNH9lx47F3Eia0y/ky5MuDEgleXDg1btcXZriGPXnzbcW7RbVf31rz5dWIBNYWzzhoaOHLly9U2P4784UnixXULeB6T+Vq21JP+d486FLXe7QdjXjT923l16B/ZZ3d/sID6+3EtU39vH796npztV19//m2ln4APZVRgZQeehx4APBXIU4MDbIdegilJCKBxDj44IYEMlqVbhRYm9+F/E3Lm3oUQfugiXiNaWN1iL9aoImwyqlZUjRsGiGOJBu3Io4gjknjhQyq6qCKHHR6JJGdKLgmckU4CIOWVRVI5Y5BYSglbk1s+2aWPP+ZI0pg3fimjk4sNMOaX+wHJl5tdwglmmAZ9OSWca7JJkp52lmkmWIHa2aechBaq5qF4UgSAolrmOBdfjyrK6HMcVbropZM+ZeiljT4FAKiS2rTYqKQ+aOqpqPYp0qoPrDL6KqysQkTrVRA5JVFAADs=";
	eyeball.style.cssText = `
		position: fixed;
		z-index: 100000;
		top: 0;
		left: 0;
		pointer-events: none;
		opacity: 0;
		transition: opacity 500ms;
	`;

	/**
	 * Left pupil element
	 * @type {HTMLImageElement}
	 */
	const leftPupil = document.createElement("img");
	leftPupil.src = "data:image/gif;base64,R0lGODlhDQANAKIAAAAAAAUFBRQUFD8/P52dnb29vf///+3t7SH5BAkAAAYALAAAAAANAA0AAAhHAA0INACgYMGBAw0qPCgQwIACAwQsBCBwgMACEhcaCHDAwAECGRcK6EhgQICJAAIQKInSoAABJ1vKVEhwZkObN1EizMlQYEAAOw==";
	leftPupil.style.cssText = `
		position: fixed;
		z-index: 100000;
		top: 0;
		left: 0;
		pointer-events: none;
		opacity: 0;
		transition: opacity 500ms;
	`;

	/**
	 * Right pupil element
	 * @type {HTMLImageElement}
	 */
	const rightPupil = leftPupil.cloneNode();

	document.body.appendChild(eyeball);
	document.body.appendChild(leftPupil);
	document.body.appendChild(rightPupil);

	// Main logic starts here -----------------------------------------------------

	let mouseX = 0;
	let mouseY = 0;
	let targetEyeX = 0;
	let targetEyeY = 0;
	let firstTime = true;

	/**
	 * Calculate new pupil position
	 *
	 * @param {HTMLElement} pupilEl Image of pupil
	 * @param {number} centerX Horizontal center of eyeball
	 * @param {number} centerY Vertical center of eyeball
	 */
	function updatePupilPos(pupilEl, centerX, centerY){
		const dx = mouseX - centerX;
		const dy = mouseY - centerY;

		const angle = Math.atan2(dy, dx) * 180 / Math.PI;
		const centerDist = Math.min(Math.sqrt(dy * dy + dx * dx), 17);
		const dv = 1.7;

		const pupilX = centerX - 6 + centerDist / dv * Math.cos(angle * Math.PI / 180);
		const pupilY = centerY - 6 + centerDist / dv * Math.sin(angle * Math.PI / 180);

		pupilEl.style.transform = `translate(${pupilX}px, ${pupilY}px)`;
	}

	/**
	 * Calculate new eye and pupils positions
	 */
	function updateEyePos() {
		if(firstTime){
			targetEyeX = mouseX;
			targetEyeY = mouseY;
			firstTime = false;
			eyeball.style.opacity = 1;
			leftPupil.style.opacity = 1;
			rightPupil.style.opacity = 1;
		}else{
			targetEyeX += (mouseX - targetEyeX) * 0.12;
			targetEyeY += (mouseY - targetEyeY) * 0.12 - 2;
		}

		const wx = window.innerWidth;
		const wy = window.innerHeight;

		// Restrict eye pos to browser window and center
		let eyeX = Math.floor(targetEyeX - 34);
		if(eyeX <= 0) eyeX = 0;
		else if(eyeX >= wx - 69) eyeX = wx - 69;

		let eyeY = Math.floor(targetEyeY - 34);
		if(eyeY <= 0) eyeY = 0;
		else if(eyeY >= wy - 34) eyeY = wy - 34;

		eyeball.style.transform = `translate(${eyeX}px, ${eyeY}px)`;

		updatePupilPos(leftPupil, eyeX + 17, eyeY + 17);
		updatePupilPos(rightPupil, eyeX + 52, eyeY + 17);

		requestAnimationFrame(updateEyePos);
	}

	window.addEventListener("mousemove", e => {
		mouseX = e.clientX;
		mouseY = e.clientY;
		if(firstTime) updateEyePos();
	});
}

// Test whether eyes should be enabled on this page ---------------------------

const mainMatch = /^https?:\/\/www\.fit\.vut(br)?\.cz/;
const emMatch = /^https?:\/\/www\.fit\.vut(br)?\.cz\/~eysselt/;
const wisMatch = /^https?:\/\/wis\.fit\.vut(br)?\.cz/;
const merlinMatch = /^https?:\/\/merlin\.fit\.vut(br)?\.cz/;
const evaMatch = /^https?:\/\/eva\.fit\.vut(br)?\.cz/;

chrome.storage.local.get({
	everywhere: false,
	main: false,
	em: true,
	wis: true,
	merlin: false,
	eva: false
}, items => {
	if(	(items.everywhere) ||
		(items.main && mainMatch.test(location.href)) ||
		(items.em && emMatch.test(location.href)) ||
		(items.wis && wisMatch.test(location.href)) ||
		(items.merlin && merlinMatch.test(location.href)) ||
		(items.eva && evaMatch.test(location.href))
	) enable();
});
