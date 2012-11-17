/*jslint browser: true, regexp: true */
/*global localStorage*/

(function (window) {
	'use strict';

	if (window.location !== window.parent.location) {
		return;
	}

	var frame = document.createElement("IFRAME"),
	    space = document.querySelector('#header + .contents > div.space'),
	    video,
	    settingButton,
	    options,
	    addonOptions,
	    settingPanel,
	    overlay;

	/** setting  **/

	settingButton = document.createElement('a');
	settingButton.innerText = 'Setting';
	settingButton.setAttribute('id', 'addon-setting-button');
	settingButton.setAttribute('href', '#');
	document.querySelector('#header .tabbar').appendChild(settingButton);
	settingPanel = document.createElement('div');
	overlay = document.createElement('div');
	overlay.setAttribute('id', 'addon-overlay');
	overlay.setAttribute('class', 'hide');
	settingPanel.setAttribute('id', 'addon-setting-panel');
	document.body.appendChild(overlay);
	overlay.appendChild(settingPanel);

	settingButton.addEventListener('click', function (event) {
		var target = event.target;
		overlay.setAttribute('class', 'show');
		event.preventDefault();
		event.stopPropagation();
	});

	settingPanel.addEventListener('click', function (event) {
		event.preventDefault();
		event.stopPropagation();
	});

	overlay.addEventListener('click', function (event) {
		overlay.setAttribute('class', 'hide');
		location.reload();
	});

	options = {
		'switchSide': {
			text: 'Plurk home page: ',
			fc: function (ao, i) {
				var value = ao.item(i),
				    ele = document.createElement('select');
				value = value === 1 || value === '1';
				ele.innerHTML = '<option value="0"' + (value ? '' : 'selected') + '>Left</option><option value="1"' + (value ? 'selected' : '') + '>Right</option>';
				
				ele.addEventListener('change', function () {
					ao.item(i, ele.value);
				});

				if (value) {
					document.body.setAttribute('class', 'right');
				}

				return ele;
			}
		},
		'width': {
			text: 'Change layout width (%): ',
			fc: function (ao, i) {
				var ele = document.createElement('input');
				ele.value = ao.item(i) || 40;
				ele.addEventListener('change', function () {
					ao.item(i, ele.value > 100 ? 100 : (ele.value < 0 ? 0 : ele.value));
				});
				document.body.style.width = ele.value + '%';
				frame.style.width = (100 - ele.value) + '%';
				document.querySelector('#header').style.width = ele.value + '%';
				return ele;
			}
		}
	};

	addonOptions = (function (o) {
		var opts = {}, i, that, tmp;
		
		that = {
			item: function (key, val) {
				if (typeof key !== 'string') {
					return;
				}

				switch (arguments.length) {
				case 1:
					return localStorage[key] || null;
				case 2:
					localStorage[key] = val;
					break;
				}
			}
		};


		for (i in o) {
			if (typeof o[i] === 'object') {
				if (typeof o[i].text === 'string' && typeof o[i].fc === 'function') {
					opts[i] = o[i];
					tmp = document.createElement('p');
					tmp.innerHTML = '<label>' + opts[i].text + '</label>';
					tmp.appendChild(opts[i].fc(that, i));
					settingPanel.appendChild(tmp);
				}
			}
		}

		return that;
	}(options));
	
	/** main **/

	document.body.appendChild(frame);
	frame.id = "viewer";
	frame.style.zindex = 999;
	frame.src = "http://www.plurk.com/m/t";

	space.addEventListener("click", function (event) {
		var target = event.target;
		if ((target.nodeName === 'IMG' || target.nodeName === 'SPAN') && target.parentNode.nodeName === 'A') {
			event.preventDefault();
			frame.src = target.parentNode.href;
			return;
		}
		if (target.className === 'plurk') {
			frame.src = target.querySelector('.meta a.r').href;
			return;
		}
		// bypass navigation button
		if (target.nodeName !== 'A' || target.className === 'orange-but') {
			return;
		}
		// bypass user page link
		if (target.nodeName === 'A' && /plurk\.com\/m\/u\/.*/i.test(target.href)) {
			return;
		}
		// bypass message actions
		if (target.nodeName === 'A' && target.className !== 'r' && target.parentNode.className === 'meta') {
			return;
		}

		event.preventDefault();
		if (target.className === 'ogvideo meta') {
			video = target.querySelector('img').dataset.video;
			if (/youtube.com\/v\//i.test(video)) {
				frame.src = video.replace(/youtube.com\/v\/([0-9a-zA-Z\-\_]+).*/i, "youtube.com/embed/$1");
			}
		} else {
			frame.src = target.href;
		}
	});

	[].forEach.call(document.querySelectorAll('a.ex_link.pictureservices'), function (picture) {
		//picture.childNodes[1].textContent = '';
		if (picture.getAttribute('rel') !== 'nofollow') {
			picture.querySelector('img').src = picture.href.replace(/images.plurk.com\//i, "images.plurk.com/tn_").replace(/\.jpg$/i, ".gif");
		}
	});

}(window || null));
