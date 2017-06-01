import 'babel-polyfill';

import { View } from '../libs/as';
import Utils from '../libs/utils';


const NEXT_SLIDE_TIME = 3000;
const ANIMATION_TIME = 500;

class EventPicker extends View {
	constructor(el) {
		super(el);

		this.eventPicker = el;
		this.eventItems = el.querySelectorAll(".event-picker-item");
		this.activeItem = this.eventItems[0];
		this.activeIndex = 0;
		this.activeBarNavigation = this.activeItem.querySelector(".event-picker-navigation-bar");
		this.slidesTotal = el.querySelectorAll(".event-picker-numbers-total");

		this.eventItems[0].classList.add("active");
		this.slidesAutoplay = true;
		this.setAutoplay();


		this.addListener("mouseenter", ".event-picker", this.onMouseEnter.bind(this));
		this.addListener("mouseleave", ".event-picker", this.onMouseLeave.bind(this));

		this.addListener("click", ".event-picker-next", this.setNextItem.bind(this));
		this.addListener("click", ".event-picker-prev", this.setPrevItem.bind(this));
	}

	onMouseEnter() {
		this.slidesAutoplay = false;
		clearTimeout(this.timeout);
		clearTimeout(this.nextSlideTimeout);
		this.eventPicker.classList.add("paused");
	}

	onMouseLeave() {
		this.slidesAutoplay = true;
		this.setAutoplay();
		this.eventPicker.classList.remove("paused");
	}

	setAutoplay() {
		if (this.slidesAutoplay) {
			clearTimeout(this.nextSlideTimeout);
			this.nextSlideTimeout = setTimeout(this.setNextItem.bind(this), NEXT_SLIDE_TIME);
		}
	}

	setNextItem() {
		this.goToItem(this.activeIndex + 1);
	}

	setPrevItem() {
		this.goToItem(this.activeIndex - 1);
	}

	goToItem(index) {
		if (!this.showItemTimeout) {
			this.activeIndex = index;
			clearTimeout(this.nextSlideTimeout);
			this.activeItem.classList.add("fade-out");
			this.showItemTimeout = setTimeout(this.showItem.bind(this), ANIMATION_TIME);
		}
	}

	showItem() {
		this.activeItem.classList.remove("active")
		this.activeItem.classList.remove("fade-out");

		this.activeItem = this.eventItems[Math.abs(this.activeIndex % this.eventItems.length)];
		this.activeItem.classList.add("active");
		
		this.setAutoplay();
		this.showItemTimeout = null;
	}

	static init(selector = ".event-picker", base = document.body) {
		Utils.query(base, selector).forEach(element => {
			new EventPicker(element);
		});
	}
};

export default EventPicker;