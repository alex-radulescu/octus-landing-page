import { View } from '../libs/as';
import Utils from '../libs/utils';


class EventsLoader extends View {

	constructor(el) {
		super(el);
		this.eventsLoader = this.el;
		this.pastEvents = this.query('.past-event');

		this.addListener('click', '.load-more', this.loadMore.bind(this));
	}

	loadMore() {
		this.pastEvents.map(pastEvent => {
			pastEvent.classList.add('show');
		});
	}

	static init(selector = '.events-library', base = document.body) {
		Utils.query(base, selector).forEach(element => {
			new EventsLoader(element);
		});
	}

	};

	export default EventsLoader;