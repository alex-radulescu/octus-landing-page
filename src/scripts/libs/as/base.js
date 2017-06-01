class Base {
	constructor() {
		this.listeners = {};
	}

	subscribe(eventName, listener, context) {
		(this.listeners[eventName] = this.listeners[eventName] || []).push({
			func: listener,
			context: context
		});
	}

	emit(eventName, ...arg) {
		for(let listener of (this.listeners[eventName] || [])) {
			listener.func.apply(listener.context, arg);
		}
	}
}

export default Base;
