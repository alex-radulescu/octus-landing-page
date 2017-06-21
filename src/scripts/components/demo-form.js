import { View } from '../libs/as';
import Utils from '../libs/utils';

class DemoForm extends View {
	constructor(el) {
		super(el);

		this.addListener("submit", this.submitForm.bind(this));
	}

	submitForm(event) {
		event.preventDefault();           // we are submitting via xhr below
		const data = {
			email: this.el.querySelector(".input-field").value
		};         // get the values submitted in the form
		
		const url = event.target.action;  //
		var xhr = new XMLHttpRequest();
		xhr.open('POST', url);
		xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
		xhr.onreadystatechange = function() {
			console.log(xhr.status, xhr.statusText);
			console.log(xhr.responseText);
			alert("Thank you");
			this.el.querySelector(".input-field").value = "";
			return;
		};
		// url encode form data for sending as post data
		var encoded = Object.keys(data).map(function(k) {
			return encodeURIComponent(k) + '=' + encodeURIComponent(data[k])
		}).join('&')
		xhr.send(encoded);
	}

	static init(selector = ".get-demo-form", base = document.body) {
		Utils.query(base, selector).forEach(element => {	
			new DemoForm(element);
		});
	}
};

export default DemoForm;