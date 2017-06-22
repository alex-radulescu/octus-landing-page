import { View } from '../libs/as';
import Utils from '../libs/utils';

class Modal extends View {
	constructor(el) {
		super(el);

		this.addListener('click', '.modal-close', this.closeModal.bind(this));
		this.addListener('click', '.modal-overlay', this.closeModalFromBackground.bind(this));
	}

	closeModalFromBackground(e) {
		if (!e.target.closest('.modal') && e.target.closest('.modal-overlay')) {
			this.closeModal();
		}
	}

	closeModal() {
		this.el.classList.remove('is-active');
	}

	openModal() {
		this.el.classList.add('is-active');
	}
};

export default Modal;