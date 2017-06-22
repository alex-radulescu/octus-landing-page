(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _as = require('../libs/as');

var _utils = require('../libs/utils');

var _utils2 = _interopRequireDefault(_utils);

var _modal = require('./modal');

var _modal2 = _interopRequireDefault(_modal);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var DemoForm = function (_View) {
	_inherits(DemoForm, _View);

	function DemoForm(el) {
		_classCallCheck(this, DemoForm);

		var _this = _possibleConstructorReturn(this, (DemoForm.__proto__ || Object.getPrototypeOf(DemoForm)).call(this, el));

		_this.modal = new _modal2.default(document.querySelector("#demo-request-registered"));

		_this.addListener("submit", _this.submitForm.bind(_this));
		return _this;
	}

	_createClass(DemoForm, [{
		key: 'submitForm',
		value: function submitForm(event) {
			var _this2 = this;

			event.preventDefault();

			this.el.classList.add("is-loading");

			var targetUrl = event.target.action;
			var data = { email: this.el.querySelector(".input-field").value };
			var encodedDataToSend = Object.keys(data).map(function (k) {
				return encodeURIComponent(k) + '=' + encodeURIComponent(data[k]);
			}).join('&');

			fetch(targetUrl, {
				method: 'post',
				headers: {
					"Content-type": "application/x-www-form-urlencoded"
				},
				body: encodedDataToSend
			}).then(function (response) {
				return response.json();
			}).then(function (data) {
				if (data.result == "success") {
					_this2.modal.openModal();
					_this2.el.querySelector('.input-field').value = '';
					_this2.el.classList.remove("is-loading");
				}
			}).catch(function (error) {
				console.error('Failed', error);
			});
		}
	}], [{
		key: 'init',
		value: function init() {
			var selector = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : ".get-demo-form";
			var base = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : document.body;

			_utils2.default.query(base, selector).forEach(function (element) {
				new DemoForm(element);
			});
		}
	}]);

	return DemoForm;
}(_as.View);

;

exports.default = DemoForm;

},{"../libs/as":6,"../libs/utils":10,"./modal":4}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _as = require('../libs/as');

var _utils = require('../libs/utils');

var _utils2 = _interopRequireDefault(_utils);

var _jump = require('../libs/jump');

var _jump2 = _interopRequireDefault(_jump);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Header = function (_View) {
	_inherits(Header, _View);

	function Header(el) {
		_classCallCheck(this, Header);

		var _this = _possibleConstructorReturn(this, (Header.__proto__ || Object.getPrototypeOf(Header)).call(this, el));

		var section = document.querySelectorAll(".section");
		_this.sections = {};

		Array.prototype.forEach.call(section, function (e) {
			_this.sections[e.id] = e.offsetTop - 65;
		});

		_this.onWindowScroll();
		_this.addListener("click", ".menu-toggle", _this.toggleMobileMenu.bind(_this));
		_this.addListener("scroll", document, _this.onWindowScroll.bind(_this));
		_this.addListener("click", ".main-navigation-link.is-internal", _this.navigate.bind(_this));
		return _this;
	}

	_createClass(Header, [{
		key: 'onWindowScroll',
		value: function onWindowScroll() {
			if (window.pageYOffset > window.innerHeight / 2) {
				this.el.classList.remove("is-invisible");
			} else {
				this.el.classList.add("is-invisible");
			}

			var scrollPosition = document.documentElement.scrollTop || document.body.scrollTop;

			var i = 0;
			for (i in this.sections) {
				if (this.sections[i] <= scrollPosition) {
					if (document.querySelector('.main-navigation-link.is-active')) {
						document.querySelector('.main-navigation-link.is-active').classList.remove("is-active");
					}
					if (document.querySelector('.main-navigation-link[href*=' + i + ']')) {
						document.querySelector('.main-navigation-link[href*=' + i + ']').classList.add('is-active');
					}
				}
			}
		}
	}, {
		key: 'navigate',
		value: function navigate(e) {
			e.preventDefault();
			(0, _jump2.default)(e.target.getAttribute("href"), {
				offset: -65
			});
			this.closeMobileMenu();
		}
	}, {
		key: 'toggleMobileMenu',
		value: function toggleMobileMenu() {
			this.el.classList.toggle("is-menu-open");
		}
	}, {
		key: 'closeMobileMenu',
		value: function closeMobileMenu() {
			this.el.classList.remove("is-menu-open");
		}
	}], [{
		key: 'init',
		value: function init() {
			var selector = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : ".header";
			var base = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : document.body;

			_utils2.default.query(base, selector).forEach(function (element) {
				new Header(element);
			});
		}
	}]);

	return Header;
}(_as.View);

;

exports.default = Header;

},{"../libs/as":6,"../libs/jump":9,"../libs/utils":10}],3:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _as = require('../libs/as');

var _utils = require('../libs/utils');

var _utils2 = _interopRequireDefault(_utils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ImageLoader = function (_View) {
	_inherits(ImageLoader, _View);

	function ImageLoader(el) {
		_classCallCheck(this, ImageLoader);

		var _this = _possibleConstructorReturn(this, (ImageLoader.__proto__ || Object.getPrototypeOf(ImageLoader)).call(this, el));

		_this.imageSource = _this.el.getAttribute('data-source');

		_this.loadImage();
		return _this;
	}

	_createClass(ImageLoader, [{
		key: 'loadImage',
		value: function loadImage() {
			var _this2 = this;

			var image = new Image();
			image.src = this.imageSource;

			image.onload = function () {
				_this2.mountImage();
			};
			image.onerror = function () {
				item.classList.add('lazy');
			};
		}
	}, {
		key: 'mountImage',
		value: function mountImage() {
			this.el.style.backgroundImage = 'url(' + this.imageSource + ')';
		}
	}], [{
		key: 'init',
		value: function init() {
			var selector = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : ".image-loader";
			var base = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : document.body;

			_utils2.default.query(base, selector).forEach(function (element) {
				new ImageLoader(element);
			});
		}
	}]);

	return ImageLoader;
}(_as.View);

;

exports.default = ImageLoader;

},{"../libs/as":6,"../libs/utils":10}],4:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _as = require('../libs/as');

var _utils = require('../libs/utils');

var _utils2 = _interopRequireDefault(_utils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Modal = function (_View) {
	_inherits(Modal, _View);

	function Modal(el) {
		_classCallCheck(this, Modal);

		var _this = _possibleConstructorReturn(this, (Modal.__proto__ || Object.getPrototypeOf(Modal)).call(this, el));

		_this.addListener('click', '.modal-close', _this.closeModal.bind(_this));
		_this.addListener('click', '.modal-overlay', _this.closeModalFromBackground.bind(_this));
		return _this;
	}

	_createClass(Modal, [{
		key: 'closeModalFromBackground',
		value: function closeModalFromBackground(e) {
			if (!e.target.closest('.modal') && e.target.closest('.modal-overlay')) {
				this.closeModal();
			}
		}
	}, {
		key: 'closeModal',
		value: function closeModal() {
			this.el.classList.remove('is-active');
		}
	}, {
		key: 'openModal',
		value: function openModal() {
			this.el.classList.add('is-active');
		}
	}]);

	return Modal;
}(_as.View);

;

exports.default = Modal;

},{"../libs/as":6,"../libs/utils":10}],5:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Base = function () {
	function Base() {
		_classCallCheck(this, Base);

		this.listeners = {};
	}

	_createClass(Base, [{
		key: "subscribe",
		value: function subscribe(eventName, listener, context) {
			(this.listeners[eventName] = this.listeners[eventName] || []).push({
				func: listener,
				context: context
			});
		}
	}, {
		key: "emit",
		value: function emit(eventName) {
			for (var _len = arguments.length, arg = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
				arg[_key - 1] = arguments[_key];
			}

			var _iteratorNormalCompletion = true;
			var _didIteratorError = false;
			var _iteratorError = undefined;

			try {
				for (var _iterator = (this.listeners[eventName] || [])[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
					var listener = _step.value;

					listener.func.apply(listener.context, arg);
				}
			} catch (err) {
				_didIteratorError = true;
				_iteratorError = err;
			} finally {
				try {
					if (!_iteratorNormalCompletion && _iterator.return) {
						_iterator.return();
					}
				} finally {
					if (_didIteratorError) {
						throw _iteratorError;
					}
				}
			}
		}
	}]);

	return Base;
}();

exports.default = Base;

},{}],6:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.View = exports.Base = undefined;

var _base = require('./base');

Object.defineProperty(exports, 'Base', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_base).default;
  }
});

var _view = require('./view');

Object.defineProperty(exports, 'View', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_view).default;
  }
});

var _base2 = _interopRequireDefault(_base);

var _view2 = _interopRequireDefault(_view);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  Base: _base2.default,
  View: _view2.default
};

},{"./base":5,"./view":7}],7:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _base = require("./base");

var _base2 = _interopRequireDefault(_base);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var View = function (_Base) {
	_inherits(View, _Base);

	function View() {
		for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
			args[_key] = arguments[_key];
		}

		_classCallCheck(this, View);

		var _this = _possibleConstructorReturn(this, (View.__proto__ || Object.getPrototypeOf(View)).call(this));

		if (args[0].constructor === Array) {
			args = args[0];
		}
		_this.el = typeof args[0] === "string" ? _this.makeElement.apply(_this, arguments) : args[0];
		return _this;
	}

	_createClass(View, [{
		key: "query",
		value: function query(_query) {
			return Array.prototype.slice.call(this.el.querySelectorAll(_query));
		}
	}, {
		key: "addListener",
		value: function addListener(type, match, method) {
			var _this2 = this;

			if (type.split(" ").length > 1) {
				type.split(" ").forEach(function (t) {
					return _this2.addListener(t, match, method);
				});
			} else {
				var elem = this.el;
				if (typeof match === "function") {
					method = match;
					match = null;
				} else if (match === document || match == window) {
					elem = match;
					match = null;
				} else if (match === 'body') {
					elem = document.body;
					match = null;
				}
				elem.addEventListener(type, function (e) {
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
	}]);

	return View;
}(_base2.default);

exports.default = View;

},{"./base":5}],8:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
// Robert Penner's easeInOutQuad

// find the rest of his easing functions here: http://robertpenner.com/easing/
// find them exported for ES6 consumption here: https://github.com/jaxgeller/ez.js

var easeInOutQuad = function easeInOutQuad(t, b, c, d) {
  t /= d / 2;
  if (t < 1) return c / 2 * t * t + b;
  t--;
  return -c / 2 * (t * (t - 2) - 1) + b;
};

exports.default = easeInOutQuad;

},{}],9:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _easing = require('./easing');

var _easing2 = _interopRequireDefault(_easing);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var jumper = function jumper() {
  // private variable cache
  // no variables are created during a jump, preventing memory leaks

  var element = void 0; // element to scroll to                   (node)

  var start = void 0; // where scroll starts                    (px)
  var stop = void 0; // where scroll stops                     (px)

  var offset = void 0; // adjustment from the stop position      (px)
  var easing = void 0; // easing function                        (function)
  var a11y = void 0; // accessibility support flag             (boolean)

  var distance = void 0; // distance of scroll                     (px)
  var duration = void 0; // scroll duration                        (ms)

  var timeStart = void 0; // time scroll started                    (ms)
  var timeElapsed = void 0; // time spent scrolling thus far          (ms)

  var next = void 0; // next scroll position                   (px)

  var callback = void 0; // to call when done scrolling            (function)

  // scroll position helper

  function location() {
    return window.scrollY || window.pageYOffset;
  }

  // element offset helper

  function top(element) {
    return element.getBoundingClientRect().top + start;
  }

  // rAF loop helper

  function loop(timeCurrent) {
    // store time scroll started, if not started already
    if (!timeStart) {
      timeStart = timeCurrent;
    }

    // determine time spent scrolling so far
    timeElapsed = timeCurrent - timeStart;

    // calculate next scroll position
    next = easing(timeElapsed, start, distance, duration

    // scroll to it
    );window.scrollTo(0, next

    // check progress
    );timeElapsed < duration ? window.requestAnimationFrame(loop // continue scroll loop
    ) : done // scrolling is done
    ();
  }

  // scroll finished helper

  function done() {
    // account for rAF time rounding inaccuracies
    window.scrollTo(0, start + distance

    // if scrolling to an element, and accessibility is enabled
    );if (element && a11y) {
      // add tabindex indicating programmatic focus
      element.setAttribute('tabindex', '-1'

      // focus the element
      );element.focus();
    }

    // if it exists, fire the callback
    if (typeof callback === 'function') {
      callback();
    }

    // reset time for next jump
    timeStart = false;
  }

  // API

  function jump(target) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    // resolve options, or use defaults
    duration = options.duration || 1000;
    offset = options.offset || 0;
    callback = options.callback; // "undefined" is a suitable default, and won't be called
    easing = options.easing || _easing2.default;
    a11y = options.a11y || false;

    // cache starting position
    start = location

    // resolve target
    ();switch (typeof target === 'undefined' ? 'undefined' : _typeof(target)) {
      // scroll from current position
      case 'number':
        element = undefined; // no element to scroll to
        a11y = false; // make sure accessibility is off
        stop = start + target;
        break;

      // scroll to element (node)
      // bounding rect is relative to the viewport
      case 'object':
        element = target;
        stop = top(element);
        break;

      // scroll to element (selector)
      // bounding rect is relative to the viewport
      case 'string':
        element = document.querySelector(target);
        stop = top(element);
        break;
    }

    // resolve scroll distance, accounting for offset
    distance = stop - start + offset;

    // resolve duration
    switch (_typeof(options.duration)) {
      // number in ms
      case 'number':
        duration = options.duration;
        break;

      // function passed the distance of the scroll
      case 'function':
        duration = options.duration(distance);
        break;
    }

    // start the loop
    window.requestAnimationFrame(loop);
  }

  // expose only the jump method
  return jump;
};

// export singleton

var singleton = jumper();

exports.default = singleton;

},{"./easing":8}],10:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _as = require("./as");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Utils = function (_Base) {
	_inherits(Utils, _Base);

	function Utils() {
		_classCallCheck(this, Utils);

		return _possibleConstructorReturn(this, (Utils.__proto__ || Object.getPrototypeOf(Utils)).apply(this, arguments));
	}

	_createClass(Utils, null, [{
		key: "query",
		value: function query(base, selector) {
			return Array.prototype.slice.call((selector && base ? base : document).querySelectorAll(selector ? selector : base));
		}
	}]);

	return Utils;
}(_as.Base);

exports.default = Utils;

},{"./as":6}],11:[function(require,module,exports){
'use strict';

var _as = require('./libs/as');

var _header = require('./components/header');

var _header2 = _interopRequireDefault(_header);

var _demoForm = require('./components/demo-form');

var _demoForm2 = _interopRequireDefault(_demoForm);

var _imageLoader = require('./components/image-loader');

var _imageLoader2 = _interopRequireDefault(_imageLoader);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var App = function (_View) {
	_inherits(App, _View);

	function App(el) {
		_classCallCheck(this, App);

		var _this = _possibleConstructorReturn(this, (App.__proto__ || Object.getPrototypeOf(App)).call(this, el));

		_header2.default.init();
		_demoForm2.default.init();
		_imageLoader2.default.init();
		return _this;
	}

	return App;
}(_as.View);

window.addEventListener('load', function () {
	new App(document.body);
});

},{"./components/demo-form":1,"./components/header":2,"./components/image-loader":3,"./libs/as":6}]},{},[11])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvc2NyaXB0cy9jb21wb25lbnRzL2RlbW8tZm9ybS5qcyIsInNyYy9zY3JpcHRzL2NvbXBvbmVudHMvaGVhZGVyLmpzIiwic3JjL3NjcmlwdHMvY29tcG9uZW50cy9pbWFnZS1sb2FkZXIuanMiLCJzcmMvc2NyaXB0cy9jb21wb25lbnRzL21vZGFsLmpzIiwic3JjL3NjcmlwdHMvbGlicy9hcy9iYXNlLmpzIiwic3JjL3NjcmlwdHMvbGlicy9hcy9pbmRleC5qcyIsInNyYy9zY3JpcHRzL2xpYnMvYXMvdmlldy5qcyIsInNyYy9zY3JpcHRzL2xpYnMvZWFzaW5nLmpzIiwic3JjL3NjcmlwdHMvbGlicy9qdW1wLmpzIiwic3JjL3NjcmlwdHMvbGlicy91dGlscy5qcyIsInNyYy9zY3JpcHRzL3NjcmlwdC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7O0FDQUM7O0FBQ0Q7Ozs7QUFDQTs7Ozs7Ozs7Ozs7O0lBRU0sUTs7O0FBQ0wsbUJBQVksRUFBWixFQUFnQjtBQUFBOztBQUFBLGtIQUNULEVBRFM7O0FBR2YsUUFBSyxLQUFMLEdBQWEsb0JBQVUsU0FBUyxhQUFULENBQXVCLDBCQUF2QixDQUFWLENBQWI7O0FBRUEsUUFBSyxXQUFMLENBQWlCLFFBQWpCLEVBQTJCLE1BQUssVUFBTCxDQUFnQixJQUFoQixPQUEzQjtBQUxlO0FBTWY7Ozs7NkJBRVUsSyxFQUFPO0FBQUE7O0FBQ2pCLFNBQU0sY0FBTjs7QUFFQSxRQUFLLEVBQUwsQ0FBUSxTQUFSLENBQWtCLEdBQWxCLENBQXNCLFlBQXRCOztBQUVBLE9BQU0sWUFBWSxNQUFNLE1BQU4sQ0FBYSxNQUEvQjtBQUNBLE9BQU0sT0FBTyxFQUFFLE9BQU8sS0FBSyxFQUFMLENBQVEsYUFBUixDQUFzQixjQUF0QixFQUFzQyxLQUEvQyxFQUFiO0FBQ0EsT0FBTSxvQkFB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QUFKZTtBQUtmOzs7OztBQUdGLE9BQU8sZ0JBQVAsQ0FBd0IsTUFBeEIsRUFBZ0MsWUFBTTtBQUNyQyxLQUFJLEdBQUosQ0FBUSxTQUFTLElBQWpCO0FBQ0EsQ0FGRCIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCLvu79pbXBvcnQgeyBWaWV3IH0gZnJvbSAnLi4vbGlicy9hcyc7XHJcbmltcG9ydCBVdGlscyBmcm9tICcuLi9saWJzL3V0aWxzJztcclxuaW1wb3J0IE1vZGFsIGZyb20gJy4vbW9kYWwnO1xyXG5cclxuY2xhc3MgRGVtb0Zvcm0gZXh0ZW5kcyBWaWV3IHtcclxuXHRjb25zdHJ1Y3RvcihlbCkge1xyXG5cdFx0c3VwZXIoZWwpO1xyXG5cclxuXHRcdHRoaXMubW9kYWwgPSBuZXcgTW9kYWwoZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNkZW1vLXJlcXVlc3QtcmVnaXN0ZXJlZFwiKSk7XHJcblxyXG5cdFx0dGhpcy5hZGRMaXN0ZW5lcihcInN1Ym1pdFwiLCB0aGlzLnN1Ym1pdEZvcm0uYmluZCh0aGlzKSk7XHJcblx0fVxyXG5cclxuXHRzdWJtaXRGb3JtKGV2ZW50KSB7XHJcblx0XHRldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cclxuXHRcdHRoaXMuZWwuY2xhc3NMaXN0LmFkZChcImlzLWxvYWRpbmdcIik7XHJcblx0XHRcclxuXHRcdGNvbnN0IHRhcmdldFVybCA9IGV2ZW50LnRhcmdldC5hY3Rpb247XHJcblx0XHRjb25zdCBkYXRhID0geyBlbWFpbDogdGhpcy5lbC5xdWVyeVNlbGVjdG9yKFwiLmlucHV0LWZpZWxkXCIpLnZhbHVlIH07XHJcblx0XHRjb25zdCBlbmNvZGVkRGF0YVRvU2VuZCA9IE9iamVjdC5rZXlzKGRhdGEpLm1hcChrID0+IHtcclxuXHRcdFx0cmV0dXJuIGVuY29kZVVSSUNvbXBvbmVudChrKSArICc9JyArIGVuY29kZVVSSUNvbXBvbmVudChkYXRhW2tdKVxyXG5cdFx0fSkuam9pbignJicpO1xyXG5cclxuXHRcdGZldGNoKHRhcmdldFVybCwgeyAgXHJcblx0XHRcdG1ldGhvZDogJ3Bvc3QnLCAgXHJcblx0XHRcdGhlYWRlcnM6IHsgIFxyXG5cdFx0XHRcIkNvbnRlbnQtdHlwZVwiOiBcImFwcGxpY2F0aW9uL3gtd3d3LWZvcm0tdXJsZW5jb2RlZFwiICBcclxuXHRcdFx0fSwgIFxyXG5cdFx0XHRib2R5OiBlbmNvZGVkRGF0YVRvU2VuZCAgXHJcblx0XHR9KVxyXG5cdFx0LnRoZW4ocmVzcG9uc2UgPT4gcmVzcG9uc2UuanNvbigpKSAgXHJcblx0XHQudGhlbihkYXRhID0+IHsgIFxyXG5cdFx0XHRpZiAoZGF0YS5yZXN1bHQgPT0gXCJzdWNjZXNzXCIpIHtcclxuXHRcdFx0XHR0aGlzLm1vZGFsLm9wZW5Nb2RhbCgpO1xyXG5cdFx0XHRcdHRoaXMuZWwucXVlcnlTZWxlY3RvcignLmlucHV0LWZpZWxkJykudmFsdWUgPSAnJztcclxuXHRcdFx0XHR0aGlzLmVsLmNsYXNzTGlzdC5yZW1vdmUoXCJpcy1sb2FkaW5nXCIpO1xyXG5cdFx0XHR9XHJcblx0XHR9KSAgXHJcblx0XHQuY2F0Y2goZXJyb3IgPT4geyAgXHJcblx0XHRcdGNvbnNvbGUuZXJyb3IoJ0ZhaWxlZCcsIGVycm9yKTsgIFxyXG5cdFx0fSk7XHJcblx0fVxyXG5cclxuXHRzdGF0aWMgaW5pdChzZWxlY3RvciA9IFwiLmdldC1kZW1vLWZvcm1cIiwgYmFzZSA9IGRvY3VtZW50LmJvZHkpIHtcclxuXHRcdFV0aWxzLnF1ZXJ5KGJhc2UsIHNlbGVjdG9yKS5mb3JFYWNoKGVsZW1lbnQgPT4ge1x0XHJcblx0XHRcdG5ldyBEZW1vRm9ybShlbGVtZW50KTtcclxuXHRcdH0pO1xyXG5cdH1cclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IERlbW9Gb3JtOyIsIu+7v2ltcG9ydCB7IFZpZXcgfSBmcm9tICcuLi9saWJzL2FzJztcclxuaW1wb3J0IFV0aWxzIGZyb20gJy4uL2xpYnMvdXRpbHMnO1xyXG5pbXBvcnQganVtcCBmcm9tICcuLi9saWJzL2p1bXAnO1xyXG5cclxuY2xhc3MgSGVhZGVyIGV4dGVuZHMgVmlldyB7XHJcblx0Y29uc3RydWN0b3IoZWwpIHtcclxuXHRcdHN1cGVyKGVsKTtcclxuXHJcblx0XHRjb25zdCBzZWN0aW9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5zZWN0aW9uXCIpO1xyXG5cdFx0dGhpcy5zZWN0aW9ucyA9IHt9O1xyXG5cclxuXHRcdEFycmF5LnByb3RvdHlwZS5mb3JFYWNoLmNhbGwoc2VjdGlvbiwgZSA9PiB7XHJcblx0XHRcdHRoaXMuc2VjdGlvbnNbZS5pZF0gPSBlLm9mZnNldFRvcCAtIDY1O1xyXG5cdFx0fSk7XHJcblxyXG5cdFx0dGhpcy5vbldpbmRvd1Njcm9sbCgpO1xyXG5cdFx0dGhpcy5hZGRMaXN0ZW5lcihcImNsaWNrXCIsIFwiLm1lbnUtdG9nZ2xlXCIsIHRoaXMudG9nZ2xlTW9iaWxlTWVudS5iaW5kKHRoaXMpKTtcclxuXHRcdHRoaXMuYWRkTGlzdGVuZXIoXCJzY3JvbGxcIiwgZG9jdW1lbnQsIHRoaXMub25XaW5kb3dTY3JvbGwuYmluZCh0aGlzKSk7XHJcblx0XHR0aGlzLmFkZExpc3RlbmVyKFwiY2xpY2tcIiwgXCIubWFpbi1uYXZpZ2F0aW9uLWxpbmsuaXMtaW50ZXJuYWxcIiwgdGhpcy5uYXZpZ2F0ZS5iaW5kKHRoaXMpKTtcclxuXHR9XHJcblxyXG5cdG9uV2luZG93U2Nyb2xsKCkge1xyXG5cdFx0aWYod2luZG93LnBhZ2VZT2Zmc2V0ID4gd2luZG93LmlubmVySGVpZ2h0LzIpIHtcclxuXHRcdFx0dGhpcy5lbC5jbGFzc0xpc3QucmVtb3ZlKFwiaXMtaW52aXNpYmxlXCIpO1xyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0dGhpcy5lbC5jbGFzc0xpc3QuYWRkKFwiaXMtaW52aXNpYmxlXCIpXHJcblx0XHR9XHJcblxyXG5cdFx0Y29uc3Qgc2Nyb2xsUG9zaXRpb24gPSBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuc2Nyb2xsVG9wIHx8IGRvY3VtZW50LmJvZHkuc2Nyb2xsVG9wO1xyXG5cclxuXHRcdGxldCBpID0gMDtcclxuXHRcdGZvciAoaSBpbiB0aGlzLnNlY3Rpb25zKSB7XHJcblx0XHRcdGlmICh0aGlzLnNlY3Rpb25zW2ldIDw9IHNjcm9sbFBvc2l0aW9uKSB7XHJcblx0XHRcdFx0aWYgKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5tYWluLW5hdmlnYXRpb24tbGluay5pcy1hY3RpdmUnKSkge1xyXG5cdFx0XHRcdFx0ZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm1haW4tbmF2aWdhdGlvbi1saW5rLmlzLWFjdGl2ZScpLmNsYXNzTGlzdC5yZW1vdmUoXCJpcy1hY3RpdmVcIik7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHRcdGlmKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5tYWluLW5hdmlnYXRpb24tbGlua1tocmVmKj0nICsgaSArICddJykpIHtcclxuXHRcdFx0XHRcdGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5tYWluLW5hdmlnYXRpb24tbGlua1tocmVmKj0nICsgaSArICddJykuY2xhc3NMaXN0LmFkZCgnaXMtYWN0aXZlJyk7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHRuYXZpZ2F0ZShlKSB7XHJcblx0XHRlLnByZXZlbnREZWZhdWx0KCk7XHJcblx0XHRqdW1wKGUudGFyZ2V0LmdldEF0dHJpYnV0ZShcImhyZWZcIiksIHtcclxuXHRcdFx0b2Zmc2V0OiAtNjVcclxuXHRcdH0pO1xyXG5cdFx0dGhpcy5jbG9zZU1vYmlsZU1lbnUoKTtcclxuXHR9XHJcblxyXG5cdHRvZ2dsZU1vYmlsZU1lbnUoKSB7XHJcblx0XHR0aGlzLmVsLmNsYXNzTGlzdC50b2dnbGUoXCJpcy1tZW51LW9wZW5cIik7XHJcblx0fVxyXG5cclxuXHRjbG9zZU1vYmlsZU1lbnUoKSB7XHJcblx0XHR0aGlzLmVsLmNsYXNzTGlzdC5yZW1vdmUoXCJpcy1tZW51LW9wZW5cIik7XHJcblx0fVxyXG5cclxuXHRzdGF0aWMgaW5pdChzZWxlY3RvciA9IFwiLmhlYWRlclwiLCBiYXNlID0gZG9jdW1lbnQuYm9keSkge1xyXG5cdFx0VXRpbHMucXVlcnkoYmFzZSwgc2VsZWN0b3IpLmZvckVhY2goZWxlbWVudCA9PiB7XHRcclxuXHRcdFx0bmV3IEhlYWRlcihlbGVtZW50KTtcclxuXHRcdH0pO1xyXG5cdH1cclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IEhlYWRlcjsiLCLvu79pbXBvcnQgeyBWaWV3IH0gZnJvbSAnLi4vbGlicy9hcyc7XHJcbmltcG9ydCBVdGlscyBmcm9tICcuLi9saWJzL3V0aWxzJztcclxuXHJcbmNsYXNzIEltYWdlTG9hZGVyIGV4dGVuZHMgVmlldyB7XHJcblx0Y29uc3RydWN0b3IoZWwpIHtcclxuXHRcdHN1cGVyKGVsKTtcclxuXHJcblx0XHR0aGlzLmltYWdlU291cmNlID0gdGhpcy5lbC5nZXRBdHRyaWJ1dGUoJ2RhdGEtc291cmNlJyk7XHJcblxyXG5cdFx0dGhpcy5sb2FkSW1hZ2UoKTtcclxuXHR9XHJcblxyXG5cdGxvYWRJbWFnZSgpIHtcclxuXHRcdGNvbnN0IGltYWdlID0gbmV3IEltYWdlKCk7XHJcblx0XHRpbWFnZS5zcmMgPSB0aGlzLmltYWdlU291cmNlO1xyXG5cdFx0XHJcblx0XHRpbWFnZS5vbmxvYWQgPSAoKSA9PiB7XHJcblx0XHRcdHRoaXMubW91bnRJbWFnZSgpO1xyXG5cdFx0fVxyXG5cdFx0aW1hZ2Uub25lcnJvciA9ICgpID0+IHtcclxuXHRcdFx0aXRlbS5jbGFzc0xpc3QuYWRkKCdsYXp5Jyk7XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHRtb3VudEltYWdlKCkge1xyXG5cdFx0dGhpcy5lbC5zdHlsZS5iYWNrZ3JvdW5kSW1hZ2UgPSAndXJsKCcgKyB0aGlzLmltYWdlU291cmNlICsgJyknO1xyXG5cdH1cclxuXHJcblx0XHJcblxyXG5cdHN0YXRpYyBpbml0KHNlbGVjdG9yID0gXCIuaW1hZ2UtbG9hZGVyXCIsIGJhc2UgPSBkb2N1bWVudC5ib2R5KSB7XHJcblx0XHRVdGlscy5xdWVyeShiYXNlLCBzZWxlY3RvcikuZm9yRWFjaChlbGVtZW50ID0+IHtcdFxyXG5cdFx0XHRuZXcgSW1hZ2VMb2FkZXIoZWxlbWVudCk7XHJcblx0XHR9KTtcclxuXHR9XHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBJbWFnZUxvYWRlcjsiLCLvu79pbXBvcnQgeyBWaWV3IH0gZnJvbSAnLi4vbGlicy9hcyc7XHJcbmltcG9ydCBVdGlscyBmcm9tICcuLi9saWJzL3V0aWxzJztcclxuXHJcbmNsYXNzIE1vZGFsIGV4dGVuZHMgVmlldyB7XHJcblx0Y29uc3RydWN0b3IoZWwpIHtcclxuXHRcdHN1cGVyKGVsKTtcclxuXHJcblx0XHR0aGlzLmFkZExpc3RlbmVyKCdjbGljaycsICcubW9kYWwtY2xvc2UnLCB0aGlzLmNsb3NlTW9kYWwuYmluZCh0aGlzKSk7XHJcblx0XHR0aGlzLmFkZExpc3RlbmVyKCdjbGljaycsICcubW9kYWwtb3ZlcmxheScsIHRoaXMuY2xvc2VNb2RhbEZyb21CYWNrZ3JvdW5kLmJpbmQodGhpcykpO1xyXG5cdH1cclxuXHJcblx0Y2xvc2VNb2RhbEZyb21CYWNrZ3JvdW5kKGUpIHtcclxuXHRcdGlmICghZS50YXJnZXQuY2xvc2VzdCgnLm1vZGFsJykgJiYgZS50YXJnZXQuY2xvc2VzdCgnLm1vZGFsLW92ZXJsYXknKSkge1xyXG5cdFx0XHR0aGlzLmNsb3NlTW9kYWwoKTtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdGNsb3NlTW9kYWwoKSB7XHJcblx0XHR0aGlzLmVsLmNsYXNzTGlzdC5yZW1vdmUoJ2lzLWFjdGl2ZScpO1xyXG5cdH1cclxuXHJcblx0b3Blbk1vZGFsKCkge1xyXG5cdFx0dGhpcy5lbC5jbGFzc0xpc3QuYWRkKCdpcy1hY3RpdmUnKTtcclxuXHR9XHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBNb2RhbDsiLCJjbGFzcyBCYXNlIHtcclxuXHRjb25zdHJ1Y3RvcigpIHtcclxuXHRcdHRoaXMubGlzdGVuZXJzID0ge307XHJcblx0fVxyXG5cclxuXHRzdWJzY3JpYmUoZXZlbnROYW1lLCBsaXN0ZW5lciwgY29udGV4dCkge1xyXG5cdFx0KHRoaXMubGlzdGVuZXJzW2V2ZW50TmFtZV0gPSB0aGlzLmxpc3RlbmVyc1tldmVudE5hbWVdIHx8IFtdKS5wdXNoKHtcclxuXHRcdFx0ZnVuYzogbGlzdGVuZXIsXHJcblx0XHRcdGNvbnRleHQ6IGNvbnRleHRcclxuXHRcdH0pO1xyXG5cdH1cclxuXHJcblx0ZW1pdChldmVudE5hbWUsIC4uLmFyZykge1xyXG5cdFx0Zm9yKGxldCBsaXN0ZW5lciBvZiAodGhpcy5saXN0ZW5lcnNbZXZlbnROYW1lXSB8fCBbXSkpIHtcclxuXHRcdFx0bGlzdGVuZXIuZnVuYy5hcHBseShsaXN0ZW5lci5jb250ZXh0LCBhcmcpO1xyXG5cdFx0fVxyXG5cdH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgQmFzZTtcclxuIiwiaW1wb3J0IEJhc2UgZnJvbSAnLi9iYXNlJztcclxuaW1wb3J0IFZpZXcgZnJvbSAnLi92aWV3JztcclxuXHJcbmV4cG9ydCB7IGRlZmF1bHQgYXMgQmFzZX0gZnJvbSAnLi9iYXNlJztcclxuZXhwb3J0IHsgZGVmYXVsdCBhcyBWaWV3fSBmcm9tICcuL3ZpZXcnO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQge1xyXG4gIEJhc2UsXHJcbiAgVmlld1xyXG59O1xyXG4iLCJpbXBvcnQgQmFzZSBmcm9tICcuL2Jhc2UnO1xyXG5cclxuY2xhc3MgVmlldyBleHRlbmRzIEJhc2Uge1xyXG5cdGNvbnN0cnVjdG9yKC4uLmFyZ3MpIHtcclxuXHRcdHN1cGVyKCk7XHJcblx0XHRpZihhcmdzWzBdLmNvbnN0cnVjdG9yID09PSBBcnJheSkgeyBhcmdzID0gYXJnc1swXTsgfVxyXG5cdFx0dGhpcy5lbCA9IHR5cGVvZihhcmdzWzBdKT09PVwic3RyaW5nXCIgPyB0aGlzLm1ha2VFbGVtZW50LmFwcGx5KHRoaXMsIGFyZ3VtZW50cykgOiBhcmdzWzBdO1xyXG5cdH1cclxuXHJcblx0cXVlcnkocXVlcnkpIHtcclxuXHRcdHJldHVybiBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbCh0aGlzLmVsLnF1ZXJ5U2VsZWN0b3JBbGwocXVlcnkpKTtcclxuXHR9XHJcblxyXG5cdGFkZExpc3RlbmVyKHR5cGUsIG1hdGNoLCBtZXRob2QpIHtcclxuXHRcdGlmKHR5cGUuc3BsaXQoXCIgXCIpLmxlbmd0aCA+IDEpIHtcclxuXHRcdFx0dHlwZS5zcGxpdChcIiBcIikuZm9yRWFjaCh0ID0+IHRoaXMuYWRkTGlzdGVuZXIodCwgbWF0Y2gsIG1ldGhvZCkpO1xyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0bGV0IGVsZW0gPSB0aGlzLmVsO1xyXG5cdFx0XHRpZih0eXBlb2YobWF0Y2gpID09PSBcImZ1bmN0aW9uXCIpIHtcclxuXHRcdFx0XHRtZXRob2QgPSBtYXRjaDtcclxuXHRcdFx0XHRtYXRjaCA9IG51bGw7XHJcblx0XHRcdH0gZWxzZSBpZihtYXRjaCA9PT0gZG9jdW1lbnQgfHwgbWF0Y2ggPT0gd2luZG93ICkge1xyXG5cdFx0XHRcdGVsZW0gPSBtYXRjaDtcclxuXHRcdFx0XHRtYXRjaCA9IG51bGw7XHJcblx0XHRcdH0gZWxzZSBpZiAobWF0Y2ggPT09ICdib2R5Jykge1xyXG5cdFx0XHRcdGVsZW0gPSBkb2N1bWVudC5ib2R5O1xyXG5cdFx0XHRcdG1hdGNoID0gbnVsbDtcclxuXHRcdFx0fVxyXG5cdFx0XHRlbGVtLmFkZEV2ZW50TGlzdGVuZXIodHlwZSwgZSA9PiB7XHJcblx0XHRcdFx0aWYgKCFtYXRjaCkgcmV0dXJuIG1ldGhvZChlKTtcclxuXHRcdFx0XHR2YXIgY3VycmVudCA9IGUudGFyZ2V0O1xyXG5cdFx0XHRcdHdoaWxlIChjdXJyZW50LnBhcmVudE5vZGUpIHtcclxuXHRcdFx0XHRcdC8vIElFMTEgaXMgd2VpcmQsIGhhcyBpbXBsZW1lbnRlZCB0aGlzIGFzIG1zTWF0Y2hlc1NlbGVjdG9yLi4uXHJcblx0XHRcdFx0XHRpZiAoKGN1cnJlbnQubWF0Y2hlcyB8fCBjdXJyZW50Lm1zTWF0Y2hlc1NlbGVjdG9yKS5jYWxsKGN1cnJlbnQsIG1hdGNoKSkge1xyXG5cdFx0XHRcdFx0XHRtZXRob2QoZSwgY3VycmVudCk7XHJcblx0XHRcdFx0XHRcdGJyZWFrO1xyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0Y3VycmVudCA9IGN1cnJlbnQucGFyZW50Tm9kZTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH0pO1xyXG5cdFx0fVxyXG5cdH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgVmlldztcclxuIiwiLy8gUm9iZXJ0IFBlbm5lcidzIGVhc2VJbk91dFF1YWRcblxuLy8gZmluZCB0aGUgcmVzdCBvZiBoaXMgZWFzaW5nIGZ1bmN0aW9ucyBoZXJlOiBodHRwOi8vcm9iZXJ0cGVubmVyLmNvbS9lYXNpbmcvXG4vLyBmaW5kIHRoZW0gZXhwb3J0ZWQgZm9yIEVTNiBjb25zdW1wdGlvbiBoZXJlOiBodHRwczovL2dpdGh1Yi5jb20vamF4Z2VsbGVyL2V6LmpzXG5cbmNvbnN0IGVhc2VJbk91dFF1YWQgPSAodCwgYiwgYywgZCkgPT4ge1xuICB0IC89IGQgLyAyXG4gIGlmICh0IDwgMSkgcmV0dXJuIGMgLyAyICogdCAqIHQgKyBiXG4gIHQtLVxuICByZXR1cm4gLWMgLyAyICogKHQgKiAodCAtIDIpIC0gMSkgKyBiXG59XG5cbmV4cG9ydCBkZWZhdWx0IGVhc2VJbk91dFF1YWRcbiIsImltcG9ydCBlYXNlSW5PdXRRdWFkIGZyb20gJy4vZWFzaW5nJ1xuXG5jb25zdCBqdW1wZXIgPSAoKSA9PiB7XG4gIC8vIHByaXZhdGUgdmFyaWFibGUgY2FjaGVcbiAgLy8gbm8gdmFyaWFibGVzIGFyZSBjcmVhdGVkIGR1cmluZyBhIGp1bXAsIHByZXZlbnRpbmcgbWVtb3J5IGxlYWtzXG5cbiAgbGV0IGVsZW1lbnQgICAgICAgICAvLyBlbGVtZW50IHRvIHNjcm9sbCB0byAgICAgICAgICAgICAgICAgICAobm9kZSlcblxuICBsZXQgc3RhcnQgICAgICAgICAgIC8vIHdoZXJlIHNjcm9sbCBzdGFydHMgICAgICAgICAgICAgICAgICAgIChweClcbiAgbGV0IHN0b3AgICAgICAgICAgICAvLyB3aGVyZSBzY3JvbGwgc3RvcHMgICAgICAgICAgICAgICAgICAgICAocHgpXG5cbiAgbGV0IG9mZnNldCAgICAgICAgICAvLyBhZGp1c3RtZW50IGZyb20gdGhlIHN0b3AgcG9zaXRpb24gICAgICAocHgpXG4gIGxldCBlYXNpbmcgICAgICAgICAgLy8gZWFzaW5nIGZ1bmN0aW9uICAgICAgICAgICAgICAgICAgICAgICAgKGZ1bmN0aW9uKVxuICBsZXQgYTExeSAgICAgICAgICAgIC8vIGFjY2Vzc2liaWxpdHkgc3VwcG9ydCBmbGFnICAgICAgICAgICAgIChib29sZWFuKVxuXG4gIGxldCBkaXN0YW5jZSAgICAgICAgLy8gZGlzdGFuY2Ugb2Ygc2Nyb2xsICAgICAgICAgICAgICAgICAgICAgKHB4KVxuICBsZXQgZHVyYXRpb24gICAgICAgIC8vIHNjcm9sbCBkdXJhdGlvbiAgICAgICAgICAgICAgICAgICAgICAgIChtcylcblxuICBsZXQgdGltZVN0YXJ0ICAgICAgIC8vIHRpbWUgc2Nyb2xsIHN0YXJ0ZWQgICAgICAgICAgICAgICAgICAgIChtcylcbiAgbGV0IHRpbWVFbGFwc2VkICAgICAvLyB0aW1lIHNwZW50IHNjcm9sbGluZyB0aHVzIGZhciAgICAgICAgICAobXMpXG5cbiAgbGV0IG5leHQgICAgICAgICAgICAvLyBuZXh0IHNjcm9sbCBwb3NpdGlvbiAgICAgICAgICAgICAgICAgICAocHgpXG5cbiAgbGV0IGNhbGxiYWNrICAgICAgICAvLyB0byBjYWxsIHdoZW4gZG9uZSBzY3JvbGxpbmcgICAgICAgICAgICAoZnVuY3Rpb24pXG5cbiAgLy8gc2Nyb2xsIHBvc2l0aW9uIGhlbHBlclxuXG4gIGZ1bmN0aW9uIGxvY2F0aW9uICgpIHtcbiAgICByZXR1cm4gd2luZG93LnNjcm9sbFkgfHwgd2luZG93LnBhZ2VZT2Zmc2V0XG4gIH1cblxuICAvLyBlbGVtZW50IG9mZnNldCBoZWxwZXJcblxuICBmdW5jdGlvbiB0b3AgKGVsZW1lbnQpIHtcbiAgICByZXR1cm4gZWxlbWVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS50b3AgKyBzdGFydFxuICB9XG5cbiAgLy8gckFGIGxvb3AgaGVscGVyXG5cbiAgZnVuY3Rpb24gbG9vcCAodGltZUN1cnJlbnQpIHtcbiAgICAvLyBzdG9yZSB0aW1lIHNjcm9sbCBzdGFydGVkLCBpZiBub3Qgc3RhcnRlZCBhbHJlYWR5XG4gICAgaWYgKCF0aW1lU3RhcnQpIHtcbiAgICAgIHRpbWVTdGFydCA9IHRpbWVDdXJyZW50XG4gICAgfVxuXG4gICAgLy8gZGV0ZXJtaW5lIHRpbWUgc3BlbnQgc2Nyb2xsaW5nIHNvIGZhclxuICAgIHRpbWVFbGFwc2VkID0gdGltZUN1cnJlbnQgLSB0aW1lU3RhcnRcblxuICAgIC8vIGNhbGN1bGF0ZSBuZXh0IHNjcm9sbCBwb3NpdGlvblxuICAgIG5leHQgPSBlYXNpbmcodGltZUVsYXBzZWQsIHN0YXJ0LCBkaXN0YW5jZSwgZHVyYXRpb24pXG5cbiAgICAvLyBzY3JvbGwgdG8gaXRcbiAgICB3aW5kb3cuc2Nyb2xsVG8oMCwgbmV4dClcblxuICAgIC8vIGNoZWNrIHByb2dyZXNzXG4gICAgdGltZUVsYXBzZWQgPCBkdXJhdGlvblxuICAgICAgPyB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lKGxvb3ApICAgICAgIC8vIGNvbnRpbnVlIHNjcm9sbCBsb29wXG4gICAgICA6IGRvbmUoKSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gc2Nyb2xsaW5nIGlzIGRvbmVcbiAgfVxuXG4gIC8vIHNjcm9sbCBmaW5pc2hlZCBoZWxwZXJcblxuICBmdW5jdGlvbiBkb25lICgpIHtcbiAgICAvLyBhY2NvdW50IGZvciByQUYgdGltZSByb3VuZGluZyBpbmFjY3VyYWNpZXNcbiAgICB3aW5kb3cuc2Nyb2xsVG8oMCwgc3RhcnQgKyBkaXN0YW5jZSlcblxuICAgIC8vIGlmIHNjcm9sbGluZyB0byBhbiBlbGVtZW50LCBhbmQgYWNjZXNzaWJpbGl0eSBpcyBlbmFibGVkXG4gICAgaWYgKGVsZW1lbnQgJiYgYTExeSkge1xuICAgICAgLy8gYWRkIHRhYmluZGV4IGluZGljYXRpbmcgcHJvZ3JhbW1hdGljIGZvY3VzXG4gICAgICBlbGVtZW50LnNldEF0dHJpYnV0ZSgndGFiaW5kZXgnLCAnLTEnKVxuXG4gICAgICAvLyBmb2N1cyB0aGUgZWxlbWVudFxuICAgICAgZWxlbWVudC5mb2N1cygpXG4gICAgfVxuXG4gICAgLy8gaWYgaXQgZXhpc3RzLCBmaXJlIHRoZSBjYWxsYmFja1xuICAgIGlmICh0eXBlb2YgY2FsbGJhY2sgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIGNhbGxiYWNrKClcbiAgICB9XG5cbiAgICAvLyByZXNldCB0aW1lIGZvciBuZXh0IGp1bXBcbiAgICB0aW1lU3RhcnQgPSBmYWxzZVxuICB9XG5cbiAgLy8gQVBJXG5cbiAgZnVuY3Rpb24ganVtcCAodGFyZ2V0LCBvcHRpb25zID0ge30pIHtcbiAgICAvLyByZXNvbHZlIG9wdGlvbnMsIG9yIHVzZSBkZWZhdWx0c1xuICAgIGR1cmF0aW9uID0gb3B0aW9ucy5kdXJhdGlvbiB8fCAxMDAwXG4gICAgb2Zmc2V0ID0gb3B0aW9ucy5vZmZzZXQgfHwgMFxuICAgIGNhbGxiYWNrID0gb3B0aW9ucy5jYWxsYmFjayAgICAgICAgICAgICAgICAgICAgICAgLy8gXCJ1bmRlZmluZWRcIiBpcyBhIHN1aXRhYmxlIGRlZmF1bHQsIGFuZCB3b24ndCBiZSBjYWxsZWRcbiAgICBlYXNpbmcgPSBvcHRpb25zLmVhc2luZyB8fCBlYXNlSW5PdXRRdWFkXG4gICAgYTExeSA9IG9wdGlvbnMuYTExeSB8fCBmYWxzZVxuXG4gICAgLy8gY2FjaGUgc3RhcnRpbmcgcG9zaXRpb25cbiAgICBzdGFydCA9IGxvY2F0aW9uKClcblxuICAgIC8vIHJlc29sdmUgdGFyZ2V0XG4gICAgc3dpdGNoICh0eXBlb2YgdGFyZ2V0KSB7XG4gICAgICAvLyBzY3JvbGwgZnJvbSBjdXJyZW50IHBvc2l0aW9uXG4gICAgICBjYXNlICdudW1iZXInOlxuICAgICAgICBlbGVtZW50ID0gdW5kZWZpbmVkICAgICAgICAgICAvLyBubyBlbGVtZW50IHRvIHNjcm9sbCB0b1xuICAgICAgICBhMTF5ID0gZmFsc2UgICAgICAgICAgICAgICAgICAvLyBtYWtlIHN1cmUgYWNjZXNzaWJpbGl0eSBpcyBvZmZcbiAgICAgICAgc3RvcCA9IHN0YXJ0ICsgdGFyZ2V0XG4gICAgICAgIGJyZWFrXG5cbiAgICAgIC8vIHNjcm9sbCB0byBlbGVtZW50IChub2RlKVxuICAgICAgLy8gYm91bmRpbmcgcmVjdCBpcyByZWxhdGl2ZSB0byB0aGUgdmlld3BvcnRcbiAgICAgIGNhc2UgJ29iamVjdCc6XG4gICAgICAgIGVsZW1lbnQgPSB0YXJnZXRcbiAgICAgICAgc3RvcCA9IHRvcChlbGVtZW50KVxuICAgICAgICBicmVha1xuXG4gICAgICAvLyBzY3JvbGwgdG8gZWxlbWVudCAoc2VsZWN0b3IpXG4gICAgICAvLyBib3VuZGluZyByZWN0IGlzIHJlbGF0aXZlIHRvIHRoZSB2aWV3cG9ydFxuICAgICAgY2FzZSAnc3RyaW5nJzpcbiAgICAgICAgZWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IodGFyZ2V0KVxuICAgICAgICBzdG9wID0gdG9wKGVsZW1lbnQpXG4gICAgICAgIGJyZWFrXG4gICAgfVxuXG4gICAgLy8gcmVzb2x2ZSBzY3JvbGwgZGlzdGFuY2UsIGFjY291bnRpbmcgZm9yIG9mZnNldFxuICAgIGRpc3RhbmNlID0gc3RvcCAtIHN0YXJ0ICsgb2Zmc2V0XG5cbiAgICAvLyByZXNvbHZlIGR1cmF0aW9uXG4gICAgc3dpdGNoICh0eXBlb2Ygb3B0aW9ucy5kdXJhdGlvbikge1xuICAgICAgLy8gbnVtYmVyIGluIG1zXG4gICAgICBjYXNlICdudW1iZXInOlxuICAgICAgICBkdXJhdGlvbiA9IG9wdGlvbnMuZHVyYXRpb25cbiAgICAgICAgYnJlYWtcblxuICAgICAgLy8gZnVuY3Rpb24gcGFzc2VkIHRoZSBkaXN0YW5jZSBvZiB0aGUgc2Nyb2xsXG4gICAgICBjYXNlICdmdW5jdGlvbic6XG4gICAgICAgIGR1cmF0aW9uID0gb3B0aW9ucy5kdXJhdGlvbihkaXN0YW5jZSlcbiAgICAgICAgYnJlYWtcbiAgICB9XG5cbiAgICAvLyBzdGFydCB0aGUgbG9vcFxuICAgIHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUobG9vcClcbiAgfVxuXG4gIC8vIGV4cG9zZSBvbmx5IHRoZSBqdW1wIG1ldGhvZFxuICByZXR1cm4ganVtcFxufVxuXG4vLyBleHBvcnQgc2luZ2xldG9uXG5cbmNvbnN0IHNpbmdsZXRvbiA9IGp1bXBlcigpXG5cbmV4cG9ydCBkZWZhdWx0IHNpbmdsZXRvblxuIiwiaW1wb3J0IHsgQmFzZSwgVmlldyB9IGZyb20gXCIuL2FzXCI7XHJcblxyXG5jbGFzcyBVdGlscyBleHRlbmRzIEJhc2Uge1xyXG5cdHN0YXRpYyBxdWVyeShiYXNlLCBzZWxlY3Rvcikge1xyXG5cdFx0cmV0dXJuIEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKChzZWxlY3RvciAmJiBiYXNlID8gYmFzZSA6IGRvY3VtZW50KS5xdWVyeVNlbGVjdG9yQWxsKHNlbGVjdG9yID8gc2VsZWN0b3IgOiBiYXNlKSk7XHJcblx0fVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBVdGlscztcclxuIiwiaW1wb3J0IHsgVmlldyB9IGZyb20gJy4vbGlicy9hcyc7XHJcbmltcG9ydCBIZWFkZXIgZnJvbSAnLi9jb21wb25lbnRzL2hlYWRlcic7XHJcbmltcG9ydCBEZW1vRm9ybSBmcm9tICcuL2NvbXBvbmVudHMvZGVtby1mb3JtJztcclxuaW1wb3J0IEltYWdlTG9hZGVyIGZyb20gJy4vY29tcG9uZW50cy9pbWFnZS1sb2FkZXInO1xyXG5cclxuY2xhc3MgQXBwIGV4dGVuZHMgVmlldyB7XHJcblx0Y29uc3RydWN0b3IoZWwpIHtcclxuXHRcdHN1cGVyKGVsKTtcclxuXHRcdEhlYWRlci5pbml0KCk7XHJcblx0XHREZW1vRm9ybS5pbml0KCk7XHJcblx0XHRJbWFnZUxvYWRlci5pbml0KCk7XHJcblx0fVxyXG59XHJcblxyXG53aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignbG9hZCcsICgpID0+IHtcclxuXHRuZXcgQXBwKGRvY3VtZW50LmJvZHkpO1xyXG59KTsiXX0=
