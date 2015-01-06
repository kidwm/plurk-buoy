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
		if (event.which && event.which != 1 || event.button == 1) return;
		if ((target.nodeName === 'IMG' || target.nodeName === 'SPAN') && target.parentNode.nodeName === 'A') {
			event.preventDefault();
			frame.src = target.parentNode.href;
			return;
		}

		// On click plurk content.
		if (target.className.indexOf('plurk_content')>=0) {
			var pid = target.parentNode.getAttribute('data-pid')
			if ( pid == null) {
				pid = target.parentNode.getAttribute("pid");
			}
			var threadUrl = "http://www.plurk.com/m/p/" + pid;
			event.preventDefault();
			frame.src = threadUrl;
			return;
		}

		// bypass navigation button
		if (target.parentNode.className.indexOf('pagination')>=0) {
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
		if (picture.getAttribute('rel') !== 'nofollow') {
			picture.querySelector('img').src = picture.href.replace(/images.plurk.com\//i, "images.plurk.com/tx_").replace(/\.jpg$/i, ".gif");
		}
	});
	
	[].forEach.call(document.querySelectorAll('.plurk > a:first-child'), function (link) {
		var avatar = new Image();
		var name = link.pathname.split('/').pop();
		avatar.src = 'http://www.plurk.com/Users/avatar?nick_name=' + name + '&size=medium';
		link.appendChild(avatar);
	});

	// Dirty patch for disabling javascript in plurk mobile.
	[].forEach.call(document.querySelectorAll('div.row.feed'), function(elem) {
		var data_pid = elem.getAttribute("data-pid");
		elem.removeAttribute("data-pid");
		elem.setAttribute("pid", data_pid);
	});

}(window || null));
