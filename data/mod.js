/*jslint browser: true, regexp: true */
/*global localStorage*/

(function (window) {
	'use strict';

	if (window.location !== window.parent.location) {
		return;
	}

	var frame = document.createElement("IFRAME"),
	    space = document.querySelector('#header + .contents > div.space'),
	    video;

	document.body.appendChild(frame);
	frame.id = "viewer";
	frame.style.zindex = 999;
	frame.src = "http://www.plurk.com/m/t";

	space.addEventListener("mouseup", function (event) {
		event.stopImmediatePropagation();
	});

	space.addEventListener("click", function (event) {
		var target = event.target;
		if (event.which && event.which != 1 || event.button == 1) return;
		if ((target.nodeName === 'IMG' || target.nodeName === 'SPAN') && target.parentNode.nodeName === 'A') {
			event.preventDefault();
			frame.src = target.parentNode.href;
			return;
		}

		// On click plurk content.
		if (target.parentNode.getAttribute('data-pid')) {
			event.preventDefault();
			frame.src = "http://www.plurk.com/m/p/" + target.parentNode.getAttribute('data-pid');
			return;
		}

		// bypass navigation button
		if (target.parentNode.className.indexOf('pagination') >= 0) {
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
		} else if (target.href) {
			frame.src = target.href;
		}
	});

}(window || null));
