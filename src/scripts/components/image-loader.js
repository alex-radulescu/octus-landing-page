import { View } from '../libs/as';
import Utils from '../libs/utils';

class ImageLoader extends View {
	constructor(el) {
		super(el);

		this.imageSource = this.el.getAttribute('data-source');

		this.loadImage();
	}

	loadImage() {
		const image = new Image();
		image.src = this.imageSource;
		
		image.onload = () => {
			this.mountImage();
		}
		image.onerror = () => {
			item.classList.add('lazy');
		}
	}

	mountImage() {
		this.el.style.backgroundImage = 'url(' + this.imageSource + ')';
	}

	static init(selector = ".image-loader", base = document.body) {
		Utils.query(base, selector).forEach(element => {	
			new ImageLoader(element);
		});
	}
};

export default ImageLoader;