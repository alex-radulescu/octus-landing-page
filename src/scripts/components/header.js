import { View } from '../libs/as';
import Utils from '../libs/utils';
import jump from '../libs/jump';

class Header extends View {
	constructor(el) {
		super(el);

		this.onWindowScroll();
		//this.addListener("click", ".burger-menu", this.toggleMobileMenu.bind(this));
		this.addListener("scroll", document, this.onWindowScroll.bind(this));
		this.addListener("click", ".main-navigation-link", this.navigate.bind(this));
	}

	onWindowScroll() {
		if(window.pageYOffset > window.innerHeight/2) {
			this.el.classList.remove("is-invisible");
		} else {
			this.el.classList.add("is-invisible")
		}
	}

	navigate(e) {
		e.preventDefault();
		jump(e.target.getAttribute("href"));
		e.target.classList.add("is-active");
	}

	static init(selector = ".header", base = document.body) {
		Utils.query(base, selector).forEach(element => {	
			new Header(element);
		});
	}
};

export default Header;