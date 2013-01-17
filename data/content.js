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

[].forEach.call(document.querySelectorAll('.bigplurk > a:first-child'), function (link) {
	var avatar = new Image();
	var name = link.pathname.split('/').pop();
	avatar.src = 'http://www.plurk.com/Users/avatar?nick_name=' + name + '&size=medium';
	link.appendChild(avatar);
});

[].forEach.call(document.querySelectorAll('.response > a:first-child'), function (link) {
	var avatar = new Image();
	var name = link.pathname.split('/').pop();
	avatar.src = 'http://www.plurk.com/Users/avatar?nick_name=' + name + '&size=small';
	link.appendChild(avatar);
});
