import { View } from '../libs/as';
import Utils from '../libs/utils';
import Modal from './modal';

class DemoForm extends View {
	constructor(el) {
		super(el);

		this.modal = new Modal(document.querySelector("#demo-request-registered"));

		this.addListener("submit", this.submitForm.bind(this));
	}

	submitForm(event) {
		event.preventDefault();

		this.el.classList.add("is-loading");
		
		const targetUrl = event.target.action;
		const data = { email: this.el.querySelector(".input-field").value };
		const encodedDataToSend = Object.keys(data).map(k => {
			return encodeURIComponent(k) + '=' + encodeURIComponent(data[k])
		}).join('&');

		fetch(targetUrl, {  
			method: 'post',  
			headers: {  
			"Content-type": "application/x-www-form-urlencoded"  
			},  
			body: encodedDataToSend  
		})
		.then(response => response.json())  
		.then(data => {  
			if (data.result == "success") {
				this.modal.openModal();
				this.el.querySelector('.input-field').value = '';
				this.el.classList.remove("is-loading");
			}
		})  
		.catch(error => {  
			console.error('Failed', error);  
		});
	}

	static init(selector = ".get-demo-form", base = document.body) {
		Utils.query(base, selector).forEach(element => {	
			new DemoForm(element);
		});
	}
};

export default DemoForm;