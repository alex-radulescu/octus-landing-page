// import 'babel-polyfill';
// import 'whatwg-fetch';

import { View } from './libs/as';
import Utils from './libs/utils';
import Header from './components/header';
import DemoForm from './components/demo-form';

class App extends View {
	constructor(el) {
		super(el);
		Header.init();
		DemoForm.init();
	}
}

window.addEventListener('load', () => {
	new App(document.body);
});