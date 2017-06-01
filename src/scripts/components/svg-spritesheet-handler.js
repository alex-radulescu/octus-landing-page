class SVGSpritesheetHandler {
	constructor() {
		this.existingSvgs = [];

		const body = document.querySelector('body');

		const containerFragment = document.createDocumentFragment();

		this.container = document.createElement("div");
		this.container.setAttribute("style", "display: none;");
		this.container.classList.add("svg-auto-include-container");

		this.overrideStyle = document.createElement("style");
		this.overrideStyle.innerHTML = "use { display: inline; }";

		const refNode = body.childNodes[0];
		body.insertBefore(this.overrideStyle, refNode);
		body.insertBefore(this.container, this.overrideStyle);

		const observer = new MutationObserver(this.observeMutations.bind(this));
		const config = { childList: true, subtree: true };

		observer.observe(document, config);

		this.useReplacements(body);
	}
	useReplacements(node) {
		const useTags = node.getElementsByTagName('use');
		Array.prototype.forEach.call(useTags, useTag => {
			const xlink = useTag.getAttribute("xlink:href") || useTag.getAttribute("href") || "";
			const hrefType = useTag.getAttribute("xlink:href") ? "xlink:href" : "href";
			if (xlink && xlink !== "" && xlink.substr(0, 1) !== '#') {
				const xlinkUrl = xlink.split("#")[0];
				const indexOf = this.existingSvgs.indexOf(xlinkUrl);
				const xlinkParts = xlink.split(".svg")[0].split("/");
				const fileName = xlinkParts[xlinkParts.length - 1];
				let xlinkId = fileName;
				if (xlink.split("#").length > 1) {
					xlinkId = "#" + xlink.split("#")[1];
				}
				if (indexOf === -1) {
					this.requestSvgDocument(xlink, (err, res) => {
						if (!err) {
							if (this.existingSvgs.indexOf(xlinkUrl) === -1) {
								this.existingSvgs.push(xlinkUrl);
								const parser = new DOMParser();
								const doc = parser.parseFromString(res, "image/svg+xml");
								const ele = document.adoptNode(doc.documentElement);
								ele.setAttribute("id", fileName);
								this.container.appendChild(ele);
							};
							useTag.setAttribute(hrefType, xlinkId);
						}
					});
				} else {
					useTag.setAttribute(hrefType, xlinkId);
				}
			};
		});
	}
	requestSvgDocument(url, callback) {
		const request = new XMLHttpRequest();
		request.open("GET", url, true);
		request.onload = request.onerror = e => {
			const error = request.readyState === 4 && request.status === 200 ? null : request.statusText;
			callback(error, request.responseText);
		};
		request.send(null);
	}
	observeMutations(mutations) {
		mutations.forEach(mutation => {
			Array.prototype.filter.call(mutation.addedNodes, node => node.nodeType === 1 ).forEach(node => {
				this.useReplacements(node);
			});
		});
	}
	static init() {
		new SVGSpritesheetHandler();
	}
}

export default SVGSpritesheetHandler;
