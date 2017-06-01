import 'babel-polyfill';

import { View } from '../libs/as';
import Utils from '../libs/utils';


class Cookie extends View {

	constructor(el) {
		super(el);

		this.cookie = el;

		this.addListener("click", ".cookie-close", this.closeCookie.bind(this));
	}

	closeCookie() {

		fetch('/umbraco/surface/Cookie/ManageTrackingCookie', {
			method: 'GET'
		}).then(function(response) {  
			if (response.status !== 200) {  
				console.log('Looks like there was a problem. Status Code: ' +  
				  response.status);  
				return;  
			}

			response.json().then(function (data) {
				if (data) {
					var cookie = data.split("=");
					if (cookie.length == 2) {
						var name = cookie[0]
						var value = cookie[1];
						var days = 365;
						if (days) {
							var date = new Date();
							date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
							var expires = "; expires=" + date.toGMTString();
						} else {
							var expires = "";
						}
						document.cookie = name + "=" + value + expires + "; path=/";
					}
				}
				return(data);  
			});   
		}) .catch(error => {
			console.log(error);
		}); 

		this.cookie.style.transform = "translateY(100%)";
	}

	static init(selector = ".cookie", base = document.body) {
		Utils.query(base, selector).forEach(element => {
			new Cookie(element);
		});
	}
};

export default Cookie;