import Base from './base';

class View extends Base {
	constructor(...args) {
		super();
		if(args[0].constructor === Array) { args = args[0]; }
		this.el = typeof(args[0])==="string" ? this.makeElement.apply(this, arguments) : args[0];
	}

	query(query) {
		return Array.prototype.slice.call(this.el.querySelectorAll(query));
	}

	addListener(type, match, method) {
		if(type.split(" ").length > 1) {
			type.split(" ").forEach(t => this.addListener(t, match, method));
		} else {
			let elem = this.el;
			if(typeof(match) === "function") {
				method = match;
				match = null;
			} else if(match === document || match == window ) {
				elem = match;
				match = null;
			} else if (match === 'body') {
				elem = document.body;
				match = null;
			}
			elem.addEventListener(type, e => {
				if (!match) return method(e);
				var current = e.target;
				while (current.parentNode) {
					// IE11 is weird, has implemented this as msMatchesSelector...
					if ((current.matches || current.msMatchesSelector).call(current, match)) {
						method(e, current);
						break;
					}
					current = current.parentNode;
				}
			});
		}
	}
}

export default View;
