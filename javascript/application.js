$(document).ready(function() {
	redirectToTourPage();
	initializeDropdown();
});

function redirectToTourPage() {
	try {
		if (sessionStorage.getItem('tour') !== 'true') {
			sessionStorage.setItem('tour','true');

			window.location = "/tour";
		}
	} catch (e) {
		console.log('REDIRECT FAILED');
		console.log(e);
	}
}

function initializeDropdown() {
	var menu = document.getElementById('menu'),
		WINDOW_CHANGE_EVENT = ('onorientationchange' in window) ? 'orientationchange':'resize';

	function toggleHorizontal() {
		[].forEach.call(
			document.getElementById('menu').querySelectorAll('.custom-can-transform'),
			function(el){
				el.classList.toggle('pure-menu-horizontal');
			}
		);
	};

	function toggleMenu() {
		// set timeout so that the panel has a chance to roll up
		// before the menu switches states
		if (menu.classList.contains('open')) {
			setTimeout(toggleHorizontal, 500);
		}
		else {
			toggleHorizontal();
		}
		menu.classList.toggle('open');
		document.getElementById('toggle').classList.toggle('x');
	};

	function closeMenu() {
			if (menu.classList.contains('open')) {
					toggleMenu();
			}
	}

	document.getElementById('toggle').addEventListener('click', function (e) {
			toggleMenu();
			e.preventDefault();
	});

	window.addEventListener(WINDOW_CHANGE_EVENT, closeMenu);
}
