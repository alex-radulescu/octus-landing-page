import { View } from '../libs/as';
import Utils from '../libs/utils';
import jump from '../libs/jump';

class Header extends View {
	constructor(el) {
		super(el);

		const section = document.querySelectorAll(".section");
		this.sections = {};

		Array.prototype.forEach.call(section, e => {
			this.sections[e.id] = e.offsetTop;
		});

		this.onWindowScroll();
		this.addListener("click", ".menu-toggle", this.toggleMobileMenu.bind(this));
		this.addListener("scroll", document, this.onWindowScroll.bind(this));
		this.addListener("click", ".main-navigation-link", this.navigate.bind(this));
	}

	onWindowScroll() {
		if(window.pageYOffset > window.innerHeight/2) {
			this.el.classList.remove("is-invisible");
		} else {
			this.el.classList.add("is-invisible")
		}

		const scrollPosition = document.documentElement.scrollTop || document.body.scrollTop;

		let i = 0;
		for (i in this.sections) {
			if (this.sections[i] <= scrollPosition) {
				if (document.querySelector('.main-navigation-link.is-active')) {
					document.querySelector('.main-navigation-link.is-active').classList.remove("is-active");
				}
				if(document.querySelector('.main-navigation-link[href*=' + i + ']')) {
					document.querySelector('.main-navigation-link[href*=' + i + ']').classList.add('is-active');
				}
			}
		}
	}

	navigate(e) {
		e.preventDefault();
		jump(e.target.getAttribute("href"));
	}

	toggleMobileMenu() {
		this.el.classList.toggle("is-menu-open");
	}

	static init(selector = ".header", base = document.body) {
		Utils.query(base, selector).forEach(element => {	
			new Header(element);
		});
	}
};

export default Header;