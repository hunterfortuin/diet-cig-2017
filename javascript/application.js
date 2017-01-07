$(document).ready(function() {
	redirectToSplashPage();
	initializeDropdown();
	initializeResizeListener();
});

function redirectToSplashPage() {
	try {
		if (sessionStorage.getItem('splash') !== 'true') {
			sessionStorage.setItem('splash','true');

			if (window.location.hostname === 'localhost') {
				window.location = "/splash";
			} else {
				window.location = "/diet-cig-2017/splash";
			}
		}
	} catch (e) {
		console.log('REDIRECT FAILED');
		console.log(e);
	}
}

function initializeResizeListener() {
	if ($(window).width() >= 768) {
		$('.desktop').removeClass('hidden');
		$('.mobile').addClass('hidden');
	} else {
		$('.desktop').addClass('hidden');
		$('.mobile').removeClass('hidden');
	}

	$(window).resize(function() {
		if ($(window).width() >= 768) {
			$('.desktop').removeClass('hidden');
			$('.mobile').addClass('hidden');
		} else {
			$('.desktop').addClass('hidden');
			$('.mobile').removeClass('hidden');
		}
	});
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
