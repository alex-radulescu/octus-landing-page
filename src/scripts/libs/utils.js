import { Base, View } from "./as";

class Utils extends Base {
	static query(base, selector) {
		return Array.prototype.slice.call((selector && base ? base : document).querySelectorAll(selector ? selector : base));
	}
}

export default Utils;
