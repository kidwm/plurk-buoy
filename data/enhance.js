(function (window) {

	[].forEach.call(document.querySelectorAll('a.ex_link.pictureservices'), function (picture) {
		if (picture.querySelector('img')) {
			picture.querySelector('img').src = picture.href.match(/images.plurk.com\//i) ?
				picture.href.replace(/images.plurk.com\//i, "images.plurk.com/tx_").replace(/\.jpg$/i, ".gif") :
				picture.href;
			picture.querySelector('span.img_link') && picture.removeChild(picture.querySelector('span.img_link'));
		}
	});

	[].forEach.call(document.querySelectorAll('.plurk .info > a:first-child'), function (link) {
		var avatar = new Image();
		var name = link.pathname.split('/').pop();
		avatar.src = 'https://www.plurk.com/Users/avatar?nick_name=' + name + '&size=medium';
		link.appendChild(avatar);
	});

}(window || null));
