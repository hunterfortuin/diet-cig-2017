$(document).ready(function() {
	redirectToSplashPage();
	initializeDropdown();
	determineStoreLink();
});

function redirectToSplashPage() {
	try {
		if (sessionStorage.getItem('splash') !== 'true') {
			sessionStorage.setItem('splash','true');

			window.location = "/splash";
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

function determineStoreLink() {
	$.ajax('http://ip-api.com/json')
	.then(
		function success(response) {
			console.log(response.countryCode);
			var eu_country_codes = [
				// -----[ EU 28 ]-----
				"AT", // Austria
				"BE", // Belgium
				"BG", // Bulgaria
				"HR", // Croatia
				"CY", // Cyprus
				"CZ", // Czech Republic
				"DK", // Denmark
				"EE", // Estonia
				"FI", // Finland
				"FR", // France
				"DE", // Germany
				"GR", // Greece
				"HU", // Hungary
				"IE", // Ireland, Republic of (EIRE)
				"IT", // Italy
				"LV", // Latvia
				"LT", // Lithuania
				"LU", // Luxembourg
				"MT", // Malta
				"NL", // Netherlands
				"PL", // Poland
				"PT", // Portugal
				"RO", // Romania
				"SK", // Slovakia
				"SI", // Slovenia
				"ES", // Spain
				"SE", // Sweden
				"GB", // United Kingdom (Great Britain)
			
				// -----[ Outermost Regions (OMR) ]------
				"GF", // French Guiana
				"GP", // Guadeloupe
				"MQ", // Martinique
				"ME", // Montenegro
				"YT", // Mayotte
				"RE", // Réunion
				"MF", // Saint Martin
			
				// -----[ Special Cases: Part of EU ]-----
				"GI", // Gibraltar
				"AX", // Åland Islands
			
				// -----[ Overseas Countries and Territories (OCT) ]-----
				// Ommitting Overseas Countries
				// "PM", // Saint Pierre and Miquelon
				// "GL", // Greenland
				// "BL", // Saint Bartelemey
				// "SX", // Sint Maarten
				// "AW", // Aruba
				// "CW", // Curacao
				// "WF", // Wallis and Futuna
				// "PF", // French Polynesia
				// "NC", // New Caledonia
				// "TF", // French Southern Territories
				// "AI", // Anguilla
				// "BM", // Bermuda
				// "IO", // British Indian Ocean Territory
				// "VG", // Virgin Islands, British
				// "KY", // Cayman Islands
				// "FK", // Falkland Islands (Malvinas)
				// "MS", // Montserrat
				// "PN", // Pitcairn
				// "SH", // Saint Helena
				// "GS", // South Georgia and the South Sandwich Islands
				// "TC", // Turks and Caicos Islands
			
				// -----[ Microstates ]-----
				"AD", // Andorra
				"LI", // Liechtenstein
				"MC", // Monaco
				"SM", // San Marino
				"VA", // Vatican City
			
				// -----[ Other ]-----
				"JE", // Jersey
				"GG", // Guernsey
			];

			if (eu_country_codes.includes(response.countryCode))
			{
				var uk_store_link = "https://dietcig.terriblemerch.com/";
				$("#js-store-link").attr("href", uk_store_link);
				$("#js-store-link").attr("target", "_blank");

				if (window.location.pathname.indexOf("/store") != -1) { // we are on the wtore page
					window.location = uk_store_link;
				}
			}
		},
		function fail(data, status) {
			console.log('Request failed. Returned status of', status);
		}
	);
}