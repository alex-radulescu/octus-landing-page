import 'babel-polyfill';

import { View } from '../libs/as';
import Utils from '../libs/utils';


class Breadcrumbs extends View {

	constructor(el) {
		super(el);

		this.utilityBar = el;
		this.article = document.querySelector(".article");

		this.addListener("scroll", window, this.toggleStickyBreadcrumbs.bind(this));
		this.addListener("click", ".pdf", this.triggerPdf.bind(this));
		this.addListener("click", ".excel", this.triggerExcel.bind(this));
		this.addListener("click", ".print", this.triggerPrint.bind(this));
	}

	toggleStickyBreadcrumbs(e, el) {
		let stickyBreadcrumb = this.article.getBoundingClientRect().top <= 0 ? 1 : 0;

		this.utilityBar.classList.toggle("sticky", stickyBreadcrumb);
	}

	triggerPdf() {
		console.log("pdf");

		const form = new FormData();
		form.append('url', window.location.href);

		fetch('/umbraco/surface/PdfPrinter/GetPdf', {
			method: 'POST',
			body: form
		}).catch(error => {
			console.log(error);
		}); 
	}

	triggerExcel() {
		console.log("excel");

		const form = new FormData();
		form.append('url', window.location.href);

		fetch('/umbraco/surface/PdfPrinter/GetExcel', {
			method: 'POST',
			body: form
		}).catch(error => {
			console.log(error);
		}); 
	}

	triggerPrint() {
		console.log("XXXX");
		window.print();
	}

	static init(selector = ".utility-bar", base = document.body) {
		Utils.query(base, selector).forEach(element => {
			new Breadcrumbs(element);
		});
	}
};

export default Breadcrumbs;