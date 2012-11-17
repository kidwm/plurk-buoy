/*jslint browser: true, regexp: true */
/*global top, self*/

if (top !== self) { // in the iframe
	[].forEach.call(document.querySelectorAll('#header + .contents a'), function (link) {
		'use strict';
		// handle the YouTube link
		if (link.className === 'ogvideo meta') {
			var video = link.querySelector('img').dataset.video;
			if (/youtube.com\/v\//i.test(video)) {
				link.href = video.replace(/youtube.com\/v\/([0-9a-zA-Z\-\_]+).*/i, "youtube.com/embed/$1");
			}
		}
	});

}
