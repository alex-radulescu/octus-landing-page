import { View } from '../libs/as';
import Utils from '../libs/utils';


class Filter extends View {

	constructor(el) {
		super(el);

		//this.filter = el; 
		//this.filterInput = el.querySelector(".filter-active-category");
		//this.filterItems = this.filter.querySelector(".filter-items")
		//this.activeItem = this.filterItems.querySelector(".active")
		//this.isActive = null;

		//this.addListener("click", ".filter-active-category", this.onFilterInputClick.bind(this));
		//this.addListener("click", ".filter-item", this.onFilterItemClick.bind(this));

		//this.setActiveText();
	}

	//onFilterInputClick() {
	//	this.filter.classList.toggle("active");

	//	if (!this.isActive) {
	//		this.filter.style.height = this.filterItems.offsetHeight + this.filterInput.offsetHeight + "px";
	//		this.isActive = true;
	//	}
	//	else {
	//		this.filter.style.height = 0 + "px";
	//		this.isActive = false;
	//	}
	//}

	//onFilterItemClick(e, target) {
	//	this.activeItem = target;

	//	this.setActiveText();
	//	this.onFilterInputClick();

	//	this.activeItem.classList.add("hidden");
	//}

	//setActiveText() {
	//	this.filterInput.innerHTML = this.activeItem.innerHTML;

	//	this.activeItem.style.display = "none";
	//}

	static init(selector = ".filter", base = document.body) {
		Utils.query(base, selector).forEach(element => {
			new Filter(element);
		});
	}
};

export default Filter;