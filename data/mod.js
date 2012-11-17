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
