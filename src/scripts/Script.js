import { View } from './libs/as';
import Header from './components/header';
import DemoForm from './components/demo-form';
import ImageLoader from './components/image-loader';

class App extends View {
	constructor(el) {
		super(el);
		Header.init();
		DemoForm.init();
		ImageLoader.init();
	}
}

window.addEventListener('load', () => {
	new App(document.body);
});