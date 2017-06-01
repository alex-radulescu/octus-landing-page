import { View } from '../libs/as';
import Utils from '../libs/utils';


class Newsletter extends View {

	constructor(el) {
		super(el);
		this.newsletter = this.el;
		this.newsletterToggle = document.querySelector('.newsletter-toggle');

		this.newsletterToggle.addEventListener('click', this.showNewsletter.bind(this));
		this.addListener('click', '.newsletter-input-button',this.subsribe);
		
		this.addListener('click', this.closeNewsletter.bind(this));
	}

	subsribe(e) {
		e.preventDefault();
		var value = document.getElementById("newsletter-email").value;
		const form = new FormData();
		form.append('email', value);

		fetch('/umbraco/surface/NewsLetter/Subsribe', {
			method: 'POST',
			body: form
		}).then(function(response) {  
			if (response.status !== 200) {  
				console.log('Looks like there was a problem. Status Code: ' +  
				  response.status);  
				document.getElementById("newsletter-label").style.display = 'none';
				document.getElementById("newsletter-label-ok").style.display = 'none';
				document.getElementById("newsletter-label-fail").style.display = 'block';
				return;  
			}

			response.json().then(function(data) {  
				document.getElementById("newsletter-label-ok").style.display = 'block';
				document.getElementById("newsletter-label-fail").style.display = 'none';
				document.getElementById("newsletter-label").style.display = 'none';
				return(data);  
			});   
		}) .catch(error => {
			console.log(error);
		}); 
		
	}

	showNewsletter() {
		this.newsletter.classList.add('active');
		document.body.classList.add('with-newsletter');
		document.getElementById("newsletter-label").style.display = 'block';
		document.getElementById("newsletter-label-ok").style.display = 'none';
		document.getElementById("newsletter-label-fail").style.display = 'none';
	}

	closeNewsletter(e) {
		if(e.target.classList.contains('newsletter')){
			this.newsletter.classList.remove('active');
			document.body.classList.remove('with-newsletter');
		} else {
			let current = e.target;
			let match = '.newsletter-close-button';
			while (current.parentNode) {
				if ((current.matches || current.msMatchesSelector).call(current, match)) {
					this.newsletter.classList.remove('active');
					document.body.classList.remove('with-newsletter');
					break;
				}
				current = current.parentNode;
			}
		}
	}

	static init(selector = '.newsletter', base = document.body) {
		Utils.query(base, selector).forEach(element => {
			new Newsletter(element);
		});
	}

	};

	export default Newsletter;