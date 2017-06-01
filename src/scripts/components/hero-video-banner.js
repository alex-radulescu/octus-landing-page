import 'babel-polyfill';

import { View } from '../libs/as';
import Utils from '../libs/utils';


class HeroVideoBanner extends View {

	constructor(el) {
		super(el);

		this.player = null;
		this.hideButton = null;
		this.counter = null;
		this.heroPlayer = el.querySelector(".youtube-player");
		this.playerButton = el.querySelector(".youtube-player-button");
		this.article = document.querySelector(".article");

		window.onYouTubeIframeAPIReady = this.createVideoPlayer.bind(this);

		this.addListener("click", ".youtube-player-button", this.onPlayerButtonClick.bind(this));
		this.article.addEventListener("transitionend", this.playVideo.bind(this));
	}

	createVideoPlayer() {
		this.player = new YT.Player(document.querySelector(".youtube-player"), {
			height: '390',
			width: '640',
			videoId: this.heroPlayer.dataset.id,
			events: {
				'onStateChange': this.onStateChange.bind(this)
			},
			playerVars: {
				modestbranding: 1,
				showinfo: 0
			},
		});
	}

	onPlayerButtonClick() {
		this.article.classList.add("video-triggered");
	}

	playVideo() {
		this.player.playVideo();
	}

	onStateChange(event) {
		if (this.counter === true) { return }

		event.data === 2 || event.data === 0 ? this.hideButton = false : this.hideButton = true;
		this.togglePlayerButton();

		this.counter = true;
	}

	togglePlayerButton() {
			this.playerButton.classList.toggle("invisible", this.hideButton);
	}

	static init(selector = ".hero-banner.video", base = document.body) {
		Utils.query(base, selector).forEach(element => {
			new HeroVideoBanner(element);
		});
	}
};

export default HeroVideoBanner;