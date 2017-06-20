(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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
			_this.sections[e.id] = e.offsetTop;
		});

		_this.onWindowScroll();
		//this.addListener("click", ".burger-menu", this.toggleMobileMenu.bind(this));
		_this.addListener("scroll", document, _this.onWindowScroll.bind(_this));
		_this.addListener("click", ".main-navigation-link", _this.navigate.bind(_this));
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
					document.querySelector('.main-navigation-link[href*=' + i + ']').classList.add('is-active');
				}
			}
		}
	}, {
		key: 'navigate',
		value: function navigate(e) {
			e.preventDefault();
			(0, _jump2.default)(e.target.getAttribute("href"));
			// document.querySelectorAll(".main-navigation-link").forEach(item =>  item.classList.remove("is-active"));
			// e.target.classList.add("is-active");
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

},{"../libs/as":3,"../libs/jump":6,"../libs/utils":7}],2:[function(require,module,exports){
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

},{}],3:[function(require,module,exports){
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

},{"./base":2,"./view":4}],4:[function(require,module,exports){
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

},{"./base":2}],5:[function(require,module,exports){
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

},{}],6:[function(require,module,exports){
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
    next = easing(timeElapsed, start, distance, duration);

    // scroll to it
    window.scrollTo(0, next);

    // check progress
    timeElapsed < duration ? window.requestAnimationFrame(loop) // continue scroll loop
    : done(); // scrolling is done
  }

  // scroll finished helper

  function done() {
    // account for rAF time rounding inaccuracies
    window.scrollTo(0, start + distance);

    // if scrolling to an element, and accessibility is enabled
    if (element && a11y) {
      // add tabindex indicating programmatic focus
      element.setAttribute('tabindex', '-1');

      // focus the element
      element.focus();
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
    start = location();

    // resolve target
    switch (typeof target === 'undefined' ? 'undefined' : _typeof(target)) {
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

},{"./easing":5}],7:[function(require,module,exports){
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

},{"./as":3}],8:[function(require,module,exports){
'use strict';

var _as = require('./libs/as');

var _utils = require('./libs/utils');

var _utils2 = _interopRequireDefault(_utils);

var _header = require('./components/header');

var _header2 = _interopRequireDefault(_header);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } // import 'babel-polyfill';
// import 'whatwg-fetch';

var App = function (_View) {
	_inherits(App, _View);

	function App(el) {
		_classCallCheck(this, App);

		var _this = _possibleConstructorReturn(this, (App.__proto__ || Object.getPrototypeOf(App)).call(this, el));

		_header2.default.init();
		return _this;
	}

	return App;
}(_as.View);

window.addEventListener('load', function () {
	new App(document.body);
});

},{"./components/header":1,"./libs/as":3,"./libs/utils":7}]},{},[8])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvc2NyaXB0cy9jb21wb25lbnRzL2hlYWRlci5qcyIsInNyYy9zY3JpcHRzL2xpYnMvYXMvYmFzZS5qcyIsInNyYy9zY3JpcHRzL2xpYnMvYXMvaW5kZXguanMiLCJzcmMvc2NyaXB0cy9saWJzL2FzL3ZpZXcuanMiLCJzcmMvc2NyaXB0cy9saWJzL2Vhc2luZy5qcyIsInNyYy9zY3JpcHRzL2xpYnMvanVtcC5qcyIsInNyYy9zY3JpcHRzL2xpYnMvdXRpbHMuanMiLCJzcmMvc2NyaXB0cy9zY3JpcHQuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7OztBQ0FDOztBQUNEOzs7O0FBQ0E7Ozs7Ozs7Ozs7OztJQUVNLE07OztBQUNMLGlCQUFZLEVBQVosRUFBZ0I7QUFBQTs7QUFBQSw4R0FDVCxFQURTOztBQUdmLE1BQU0sVUFBVSxTQUFTLGdCQUFULENBQTBCLFVBQTFCLENBQWhCO0FBQ0EsUUFBSyxRQUFMLEdBQWdCLEVBQWhCOztBQUVBLFFBQU0sU0FBTixDQUFnQixPQUFoQixDQUF3QixJQUF4QixDQUE2QixPQUE3QixFQUFzQyxhQUFLO0FBQzFDLFNBQUssUUFBTCxDQUFjLEVBQUUsRUFBaEIsSUFBc0IsRUFBRSxTQUF4QjtBQUNBLEdBRkQ7O0FBSUEsUUFBSyxjQUFMO0FBQ0E7QUFDQSxRQUFLLFdBQUwsQ0FBaUIsUUFBakIsRUFBMkIsUUFBM0IsRUFBcUMsTUFBSyxjQUFMLENBQW9CLElBQXBCLE9BQXJDO0FBQ0EsUUFBSyxXQUFMLENBQWlCLE9BQWpCLEVBQTBCLHVCQUExQixFQUFtRCxNQUFLLFFBQUwsQ0FBYyxJQUFkLE9BQW5EO0FBYmU7QUFjZjs7OzttQ0FFZ0I7QUFDaEIsT0FBRyxPQUFPLFdBQVAsR0FBcUIsT0FBTyxXQUFQLEdBQW1CLENBQTNDLEVBQThDO0FBQzdDLFNBQUssRUFBTCxDQUFRLFNBQVIsQ0FBa0IsTUFBbEIsQ0FBeUIsY0FB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SyxRQUFMO0FBQ0Usa0JBQVUsU0FBUyxhQUFULENBQXVCLE1BQXZCLENBQVY7QUFDQSxlQUFPLElBQUksT0FBSixDQUFQO0FBQ0E7QUFwQko7O0FBdUJBO0FBQ0EsZUFBVyxPQUFPLEtBQVAsR0FBZSxNQUExQjs7QUFFQTtBQUNBLG9CQUFlLFFBQVEsUUFBdkI7QUFDRTtBQUNBLFdBQUssUUFBTDtBQUNFLG1CQUFXLFFBQVEsUUFBbkI7QUFDQTs7QUFFRjtBQUNBLFdBQUssVUFBTDtBQUNFLG1CQUFXLFFBQVEsUUFBUixDQUFpQixRQUFqQixDQUFYO0FBQ0E7QUFUSjs7QUFZQTtBQUNBLFdBQU8scUJBQVAsQ0FBNkIsSUFBN0I7QUFDRDs7QUFFRDtBQUNBLFNBQU8sSUFBUDtBQUNELENBN0lEOztBQStJQTs7QUFFQSxJQUFNLFlBQVksUUFBbEI7O2tCQUVlLFM7Ozs7Ozs7Ozs7O0FDckpmOzs7Ozs7OztJQUVNLEs7Ozs7Ozs7Ozs7O3dCQUNRLEksRUFBTSxRLEVBQVU7QUFDNUIsVUFBTyxNQUFNLFNBQU4sQ0FBZ0IsS0FBaEIsQ0FBc0IsSUFBdEIsQ0FBMkIsQ0FBQyxZQUFZLElBQVosR0FBbUIsSUFBbkIsR0FBMEIsUUFBM0IsRUFBcUMsZ0JBQXJDLENBQXNELFdBQVcsUUFBWCxHQUFzQixJQUE1RSxDQUEzQixDQUFQO0FBQ0E7Ozs7OztrQkFHYSxLOzs7OztBQ0xmOztBQUNBOzs7O0FBQ0E7Ozs7Ozs7Ozs7K2VBTEE7QUFDQTs7SUFNTSxHOzs7QUFDTCxjQUFZLEVBQVosRUFBZ0I7QUFBQTs7QUFBQSx3R0FDVCxFQURTOztBQUVmLG1CQUFPLElBQVA7QUFGZTtBQUdmOzs7OztBQUdGLE9BQU8sZ0JBQVAsQ0FBd0IsTUFBeEIsRUFBZ0MsWUFBTTtBQUNyQyxLQUFJLEdBQUosQ0FBUSxTQUFTLElBQWpCO0FBQ0EsQ0FGRCIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCLvu79pbXBvcnQgeyBWaWV3IH0gZnJvbSAnLi4vbGlicy9hcyc7XHJcbmltcG9ydCBVdGlscyBmcm9tICcuLi9saWJzL3V0aWxzJztcclxuaW1wb3J0IGp1bXAgZnJvbSAnLi4vbGlicy9qdW1wJztcclxuXHJcbmNsYXNzIEhlYWRlciBleHRlbmRzIFZpZXcge1xyXG5cdGNvbnN0cnVjdG9yKGVsKSB7XHJcblx0XHRzdXBlcihlbCk7XHJcblxyXG5cdFx0Y29uc3Qgc2VjdGlvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIuc2VjdGlvblwiKTtcclxuXHRcdHRoaXMuc2VjdGlvbnMgPSB7fTtcclxuXHJcblx0XHRBcnJheS5wcm90b3R5cGUuZm9yRWFjaC5jYWxsKHNlY3Rpb24sIGUgPT4ge1xyXG5cdFx0XHR0aGlzLnNlY3Rpb25zW2UuaWRdID0gZS5vZmZzZXRUb3A7XHJcblx0XHR9KTtcclxuXHJcblx0XHR0aGlzLm9uV2luZG93U2Nyb2xsKCk7XHJcblx0XHQvL3RoaXMuYWRkTGlzdGVuZXIoXCJjbGlja1wiLCBcIi5idXJnZXItbWVudVwiLCB0aGlzLnRvZ2dsZU1vYmlsZU1lbnUuYmluZCh0aGlzKSk7XHJcblx0XHR0aGlzLmFkZExpc3RlbmVyKFwic2Nyb2xsXCIsIGRvY3VtZW50LCB0aGlzLm9uV2luZG93U2Nyb2xsLmJpbmQodGhpcykpO1xyXG5cdFx0dGhpcy5hZGRMaXN0ZW5lcihcImNsaWNrXCIsIFwiLm1haW4tbmF2aWdhdGlvbi1saW5rXCIsIHRoaXMubmF2aWdhdGUuYmluZCh0aGlzKSk7XHJcblx0fVxyXG5cclxuXHRvbldpbmRvd1Njcm9sbCgpIHtcclxuXHRcdGlmKHdpbmRvdy5wYWdlWU9mZnNldCA+IHdpbmRvdy5pbm5lckhlaWdodC8yKSB7XHJcblx0XHRcdHRoaXMuZWwuY2xhc3NMaXN0LnJlbW92ZShcImlzLWludmlzaWJsZVwiKTtcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdHRoaXMuZWwuY2xhc3NMaXN0LmFkZChcImlzLWludmlzaWJsZVwiKVxyXG5cdFx0fVxyXG5cclxuXHRcdGNvbnN0IHNjcm9sbFBvc2l0aW9uID0gZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnNjcm9sbFRvcCB8fCBkb2N1bWVudC5ib2R5LnNjcm9sbFRvcDtcclxuXHJcblx0XHRsZXQgaSA9IDA7XHJcblx0XHRmb3IgKGkgaW4gdGhpcy5zZWN0aW9ucykge1xyXG5cdFx0XHRpZiAodGhpcy5zZWN0aW9uc1tpXSA8PSBzY3JvbGxQb3NpdGlvbikge1xyXG5cdFx0XHRcdGlmIChkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubWFpbi1uYXZpZ2F0aW9uLWxpbmsuaXMtYWN0aXZlJykpIHtcclxuXHRcdFx0XHRcdGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5tYWluLW5hdmlnYXRpb24tbGluay5pcy1hY3RpdmUnKS5jbGFzc0xpc3QucmVtb3ZlKFwiaXMtYWN0aXZlXCIpO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHRkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubWFpbi1uYXZpZ2F0aW9uLWxpbmtbaHJlZio9JyArIGkgKyAnXScpLmNsYXNzTGlzdC5hZGQoJ2lzLWFjdGl2ZScpO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHRuYXZpZ2F0ZShlKSB7XHJcblx0XHRlLnByZXZlbnREZWZhdWx0KCk7XHJcblx0XHRqdW1wKGUudGFyZ2V0LmdldEF0dHJpYnV0ZShcImhyZWZcIikpO1xyXG5cdFx0Ly8gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5tYWluLW5hdmlnYXRpb24tbGlua1wiKS5mb3JFYWNoKGl0ZW0gPT4gIGl0ZW0uY2xhc3NMaXN0LnJlbW92ZShcImlzLWFjdGl2ZVwiKSk7XHJcblx0XHQvLyBlLnRhcmdldC5jbGFzc0xpc3QuYWRkKFwiaXMtYWN0aXZlXCIpO1xyXG5cdH1cclxuXHJcblx0c3RhdGljIGluaXQoc2VsZWN0b3IgPSBcIi5oZWFkZXJcIiwgYmFzZSA9IGRvY3VtZW50LmJvZHkpIHtcclxuXHRcdFV0aWxzLnF1ZXJ5KGJhc2UsIHNlbGVjdG9yKS5mb3JFYWNoKGVsZW1lbnQgPT4ge1x0XHJcblx0XHRcdG5ldyBIZWFkZXIoZWxlbWVudCk7XHJcblx0XHR9KTtcclxuXHR9XHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBIZWFkZXI7IiwiY2xhc3MgQmFzZSB7XHJcblx0Y29uc3RydWN0b3IoKSB7XHJcblx0XHR0aGlzLmxpc3RlbmVycyA9IHt9O1xyXG5cdH1cclxuXHJcblx0c3Vic2NyaWJlKGV2ZW50TmFtZSwgbGlzdGVuZXIsIGNvbnRleHQpIHtcclxuXHRcdCh0aGlzLmxpc3RlbmVyc1tldmVudE5hbWVdID0gdGhpcy5saXN0ZW5lcnNbZXZlbnROYW1lXSB8fCBbXSkucHVzaCh7XHJcblx0XHRcdGZ1bmM6IGxpc3RlbmVyLFxyXG5cdFx0XHRjb250ZXh0OiBjb250ZXh0XHJcblx0XHR9KTtcclxuXHR9XHJcblxyXG5cdGVtaXQoZXZlbnROYW1lLCAuLi5hcmcpIHtcclxuXHRcdGZvcihsZXQgbGlzdGVuZXIgb2YgKHRoaXMubGlzdGVuZXJzW2V2ZW50TmFtZV0gfHwgW10pKSB7XHJcblx0XHRcdGxpc3RlbmVyLmZ1bmMuYXBwbHkobGlzdGVuZXIuY29udGV4dCwgYXJnKTtcclxuXHRcdH1cclxuXHR9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IEJhc2U7XHJcbiIsImltcG9ydCBCYXNlIGZyb20gJy4vYmFzZSc7XHJcbmltcG9ydCBWaWV3IGZyb20gJy4vdmlldyc7XHJcblxyXG5leHBvcnQgeyBkZWZhdWx0IGFzIEJhc2V9IGZyb20gJy4vYmFzZSc7XHJcbmV4cG9ydCB7IGRlZmF1bHQgYXMgVmlld30gZnJvbSAnLi92aWV3JztcclxuXHJcbmV4cG9ydCBkZWZhdWx0IHtcclxuICBCYXNlLFxyXG4gIFZpZXdcclxufTtcclxuIiwiaW1wb3J0IEJhc2UgZnJvbSAnLi9iYXNlJztcclxuXHJcbmNsYXNzIFZpZXcgZXh0ZW5kcyBCYXNlIHtcclxuXHRjb25zdHJ1Y3RvciguLi5hcmdzKSB7XHJcblx0XHRzdXBlcigpO1xyXG5cdFx0aWYoYXJnc1swXS5jb25zdHJ1Y3RvciA9PT0gQXJyYXkpIHsgYXJncyA9IGFyZ3NbMF07IH1cclxuXHRcdHRoaXMuZWwgPSB0eXBlb2YoYXJnc1swXSk9PT1cInN0cmluZ1wiID8gdGhpcy5tYWtlRWxlbWVudC5hcHBseSh0aGlzLCBhcmd1bWVudHMpIDogYXJnc1swXTtcclxuXHR9XHJcblxyXG5cdHF1ZXJ5KHF1ZXJ5KSB7XHJcblx0XHRyZXR1cm4gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwodGhpcy5lbC5xdWVyeVNlbGVjdG9yQWxsKHF1ZXJ5KSk7XHJcblx0fVxyXG5cclxuXHRhZGRMaXN0ZW5lcih0eXBlLCBtYXRjaCwgbWV0aG9kKSB7XHJcblx0XHRpZih0eXBlLnNwbGl0KFwiIFwiKS5sZW5ndGggPiAxKSB7XHJcblx0XHRcdHR5cGUuc3BsaXQoXCIgXCIpLmZvckVhY2godCA9PiB0aGlzLmFkZExpc3RlbmVyKHQsIG1hdGNoLCBtZXRob2QpKTtcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdGxldCBlbGVtID0gdGhpcy5lbDtcclxuXHRcdFx0aWYodHlwZW9mKG1hdGNoKSA9PT0gXCJmdW5jdGlvblwiKSB7XHJcblx0XHRcdFx0bWV0aG9kID0gbWF0Y2g7XHJcblx0XHRcdFx0bWF0Y2ggPSBudWxsO1xyXG5cdFx0XHR9IGVsc2UgaWYobWF0Y2ggPT09IGRvY3VtZW50IHx8IG1hdGNoID09IHdpbmRvdyApIHtcclxuXHRcdFx0XHRlbGVtID0gbWF0Y2g7XHJcblx0XHRcdFx0bWF0Y2ggPSBudWxsO1xyXG5cdFx0XHR9IGVsc2UgaWYgKG1hdGNoID09PSAnYm9keScpIHtcclxuXHRcdFx0XHRlbGVtID0gZG9jdW1lbnQuYm9keTtcclxuXHRcdFx0XHRtYXRjaCA9IG51bGw7XHJcblx0XHRcdH1cclxuXHRcdFx0ZWxlbS5hZGRFdmVudExpc3RlbmVyKHR5cGUsIGUgPT4ge1xyXG5cdFx0XHRcdGlmICghbWF0Y2gpIHJldHVybiBtZXRob2QoZSk7XHJcblx0XHRcdFx0dmFyIGN1cnJlbnQgPSBlLnRhcmdldDtcclxuXHRcdFx0XHR3aGlsZSAoY3VycmVudC5wYXJlbnROb2RlKSB7XHJcblx0XHRcdFx0XHQvLyBJRTExIGlzIHdlaXJkLCBoYXMgaW1wbGVtZW50ZWQgdGhpcyBhcyBtc01hdGNoZXNTZWxlY3Rvci4uLlxyXG5cdFx0XHRcdFx0aWYgKChjdXJyZW50Lm1hdGNoZXMgfHwgY3VycmVudC5tc01hdGNoZXNTZWxlY3RvcikuY2FsbChjdXJyZW50LCBtYXRjaCkpIHtcclxuXHRcdFx0XHRcdFx0bWV0aG9kKGUsIGN1cnJlbnQpO1xyXG5cdFx0XHRcdFx0XHRicmVhaztcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdGN1cnJlbnQgPSBjdXJyZW50LnBhcmVudE5vZGU7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9KTtcclxuXHRcdH1cclxuXHR9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IFZpZXc7XHJcbiIsIi8vIFJvYmVydCBQZW5uZXIncyBlYXNlSW5PdXRRdWFkXG5cbi8vIGZpbmQgdGhlIHJlc3Qgb2YgaGlzIGVhc2luZyBmdW5jdGlvbnMgaGVyZTogaHR0cDovL3JvYmVydHBlbm5lci5jb20vZWFzaW5nL1xuLy8gZmluZCB0aGVtIGV4cG9ydGVkIGZvciBFUzYgY29uc3VtcHRpb24gaGVyZTogaHR0cHM6Ly9naXRodWIuY29tL2pheGdlbGxlci9lei5qc1xuXG5jb25zdCBlYXNlSW5PdXRRdWFkID0gKHQsIGIsIGMsIGQpID0+IHtcbiAgdCAvPSBkIC8gMlxuICBpZiAodCA8IDEpIHJldHVybiBjIC8gMiAqIHQgKiB0ICsgYlxuICB0LS1cbiAgcmV0dXJuIC1jIC8gMiAqICh0ICogKHQgLSAyKSAtIDEpICsgYlxufVxuXG5leHBvcnQgZGVmYXVsdCBlYXNlSW5PdXRRdWFkXG4iLCJpbXBvcnQgZWFzZUluT3V0UXVhZCBmcm9tICcuL2Vhc2luZydcblxuY29uc3QganVtcGVyID0gKCkgPT4ge1xuICAvLyBwcml2YXRlIHZhcmlhYmxlIGNhY2hlXG4gIC8vIG5vIHZhcmlhYmxlcyBhcmUgY3JlYXRlZCBkdXJpbmcgYSBqdW1wLCBwcmV2ZW50aW5nIG1lbW9yeSBsZWFrc1xuXG4gIGxldCBlbGVtZW50ICAgICAgICAgLy8gZWxlbWVudCB0byBzY3JvbGwgdG8gICAgICAgICAgICAgICAgICAgKG5vZGUpXG5cbiAgbGV0IHN0YXJ0ICAgICAgICAgICAvLyB3aGVyZSBzY3JvbGwgc3RhcnRzICAgICAgICAgICAgICAgICAgICAocHgpXG4gIGxldCBzdG9wICAgICAgICAgICAgLy8gd2hlcmUgc2Nyb2xsIHN0b3BzICAgICAgICAgICAgICAgICAgICAgKHB4KVxuXG4gIGxldCBvZmZzZXQgICAgICAgICAgLy8gYWRqdXN0bWVudCBmcm9tIHRoZSBzdG9wIHBvc2l0aW9uICAgICAgKHB4KVxuICBsZXQgZWFzaW5nICAgICAgICAgIC8vIGVhc2luZyBmdW5jdGlvbiAgICAgICAgICAgICAgICAgICAgICAgIChmdW5jdGlvbilcbiAgbGV0IGExMXkgICAgICAgICAgICAvLyBhY2Nlc3NpYmlsaXR5IHN1cHBvcnQgZmxhZyAgICAgICAgICAgICAoYm9vbGVhbilcblxuICBsZXQgZGlzdGFuY2UgICAgICAgIC8vIGRpc3RhbmNlIG9mIHNjcm9sbCAgICAgICAgICAgICAgICAgICAgIChweClcbiAgbGV0IGR1cmF0aW9uICAgICAgICAvLyBzY3JvbGwgZHVyYXRpb24gICAgICAgICAgICAgICAgICAgICAgICAobXMpXG5cbiAgbGV0IHRpbWVTdGFydCAgICAgICAvLyB0aW1lIHNjcm9sbCBzdGFydGVkICAgICAgICAgICAgICAgICAgICAobXMpXG4gIGxldCB0aW1lRWxhcHNlZCAgICAgLy8gdGltZSBzcGVudCBzY3JvbGxpbmcgdGh1cyBmYXIgICAgICAgICAgKG1zKVxuXG4gIGxldCBuZXh0ICAgICAgICAgICAgLy8gbmV4dCBzY3JvbGwgcG9zaXRpb24gICAgICAgICAgICAgICAgICAgKHB4KVxuXG4gIGxldCBjYWxsYmFjayAgICAgICAgLy8gdG8gY2FsbCB3aGVuIGRvbmUgc2Nyb2xsaW5nICAgICAgICAgICAgKGZ1bmN0aW9uKVxuXG4gIC8vIHNjcm9sbCBwb3NpdGlvbiBoZWxwZXJcblxuICBmdW5jdGlvbiBsb2NhdGlvbiAoKSB7XG4gICAgcmV0dXJuIHdpbmRvdy5zY3JvbGxZIHx8IHdpbmRvdy5wYWdlWU9mZnNldFxuICB9XG5cbiAgLy8gZWxlbWVudCBvZmZzZXQgaGVscGVyXG5cbiAgZnVuY3Rpb24gdG9wIChlbGVtZW50KSB7XG4gICAgcmV0dXJuIGVsZW1lbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkudG9wICsgc3RhcnRcbiAgfVxuXG4gIC8vIHJBRiBsb29wIGhlbHBlclxuXG4gIGZ1bmN0aW9uIGxvb3AgKHRpbWVDdXJyZW50KSB7XG4gICAgLy8gc3RvcmUgdGltZSBzY3JvbGwgc3RhcnRlZCwgaWYgbm90IHN0YXJ0ZWQgYWxyZWFkeVxuICAgIGlmICghdGltZVN0YXJ0KSB7XG4gICAgICB0aW1lU3RhcnQgPSB0aW1lQ3VycmVudFxuICAgIH1cblxuICAgIC8vIGRldGVybWluZSB0aW1lIHNwZW50IHNjcm9sbGluZyBzbyBmYXJcbiAgICB0aW1lRWxhcHNlZCA9IHRpbWVDdXJyZW50IC0gdGltZVN0YXJ0XG5cbiAgICAvLyBjYWxjdWxhdGUgbmV4dCBzY3JvbGwgcG9zaXRpb25cbiAgICBuZXh0ID0gZWFzaW5nKHRpbWVFbGFwc2VkLCBzdGFydCwgZGlzdGFuY2UsIGR1cmF0aW9uKVxuXG4gICAgLy8gc2Nyb2xsIHRvIGl0XG4gICAgd2luZG93LnNjcm9sbFRvKDAsIG5leHQpXG5cbiAgICAvLyBjaGVjayBwcm9ncmVzc1xuICAgIHRpbWVFbGFwc2VkIDwgZHVyYXRpb25cbiAgICAgID8gd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZShsb29wKSAgICAgICAvLyBjb250aW51ZSBzY3JvbGwgbG9vcFxuICAgICAgOiBkb25lKCkgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIHNjcm9sbGluZyBpcyBkb25lXG4gIH1cblxuICAvLyBzY3JvbGwgZmluaXNoZWQgaGVscGVyXG5cbiAgZnVuY3Rpb24gZG9uZSAoKSB7XG4gICAgLy8gYWNjb3VudCBmb3IgckFGIHRpbWUgcm91bmRpbmcgaW5hY2N1cmFjaWVzXG4gICAgd2luZG93LnNjcm9sbFRvKDAsIHN0YXJ0ICsgZGlzdGFuY2UpXG5cbiAgICAvLyBpZiBzY3JvbGxpbmcgdG8gYW4gZWxlbWVudCwgYW5kIGFjY2Vzc2liaWxpdHkgaXMgZW5hYmxlZFxuICAgIGlmIChlbGVtZW50ICYmIGExMXkpIHtcbiAgICAgIC8vIGFkZCB0YWJpbmRleCBpbmRpY2F0aW5nIHByb2dyYW1tYXRpYyBmb2N1c1xuICAgICAgZWxlbWVudC5zZXRBdHRyaWJ1dGUoJ3RhYmluZGV4JywgJy0xJylcblxuICAgICAgLy8gZm9jdXMgdGhlIGVsZW1lbnRcbiAgICAgIGVsZW1lbnQuZm9jdXMoKVxuICAgIH1cblxuICAgIC8vIGlmIGl0IGV4aXN0cywgZmlyZSB0aGUgY2FsbGJhY2tcbiAgICBpZiAodHlwZW9mIGNhbGxiYWNrID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICBjYWxsYmFjaygpXG4gICAgfVxuXG4gICAgLy8gcmVzZXQgdGltZSBmb3IgbmV4dCBqdW1wXG4gICAgdGltZVN0YXJ0ID0gZmFsc2VcbiAgfVxuXG4gIC8vIEFQSVxuXG4gIGZ1bmN0aW9uIGp1bXAgKHRhcmdldCwgb3B0aW9ucyA9IHt9KSB7XG4gICAgLy8gcmVzb2x2ZSBvcHRpb25zLCBvciB1c2UgZGVmYXVsdHNcbiAgICBkdXJhdGlvbiA9IG9wdGlvbnMuZHVyYXRpb24gfHwgMTAwMFxuICAgIG9mZnNldCA9IG9wdGlvbnMub2Zmc2V0IHx8IDBcbiAgICBjYWxsYmFjayA9IG9wdGlvbnMuY2FsbGJhY2sgICAgICAgICAgICAgICAgICAgICAgIC8vIFwidW5kZWZpbmVkXCIgaXMgYSBzdWl0YWJsZSBkZWZhdWx0LCBhbmQgd29uJ3QgYmUgY2FsbGVkXG4gICAgZWFzaW5nID0gb3B0aW9ucy5lYXNpbmcgfHwgZWFzZUluT3V0UXVhZFxuICAgIGExMXkgPSBvcHRpb25zLmExMXkgfHwgZmFsc2VcblxuICAgIC8vIGNhY2hlIHN0YXJ0aW5nIHBvc2l0aW9uXG4gICAgc3RhcnQgPSBsb2NhdGlvbigpXG5cbiAgICAvLyByZXNvbHZlIHRhcmdldFxuICAgIHN3aXRjaCAodHlwZW9mIHRhcmdldCkge1xuICAgICAgLy8gc2Nyb2xsIGZyb20gY3VycmVudCBwb3NpdGlvblxuICAgICAgY2FzZSAnbnVtYmVyJzpcbiAgICAgICAgZWxlbWVudCA9IHVuZGVmaW5lZCAgICAgICAgICAgLy8gbm8gZWxlbWVudCB0byBzY3JvbGwgdG9cbiAgICAgICAgYTExeSA9IGZhbHNlICAgICAgICAgICAgICAgICAgLy8gbWFrZSBzdXJlIGFjY2Vzc2liaWxpdHkgaXMgb2ZmXG4gICAgICAgIHN0b3AgPSBzdGFydCArIHRhcmdldFxuICAgICAgICBicmVha1xuXG4gICAgICAvLyBzY3JvbGwgdG8gZWxlbWVudCAobm9kZSlcbiAgICAgIC8vIGJvdW5kaW5nIHJlY3QgaXMgcmVsYXRpdmUgdG8gdGhlIHZpZXdwb3J0XG4gICAgICBjYXNlICdvYmplY3QnOlxuICAgICAgICBlbGVtZW50ID0gdGFyZ2V0XG4gICAgICAgIHN0b3AgPSB0b3AoZWxlbWVudClcbiAgICAgICAgYnJlYWtcblxuICAgICAgLy8gc2Nyb2xsIHRvIGVsZW1lbnQgKHNlbGVjdG9yKVxuICAgICAgLy8gYm91bmRpbmcgcmVjdCBpcyByZWxhdGl2ZSB0byB0aGUgdmlld3BvcnRcbiAgICAgIGNhc2UgJ3N0cmluZyc6XG4gICAgICAgIGVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHRhcmdldClcbiAgICAgICAgc3RvcCA9IHRvcChlbGVtZW50KVxuICAgICAgICBicmVha1xuICAgIH1cblxuICAgIC8vIHJlc29sdmUgc2Nyb2xsIGRpc3RhbmNlLCBhY2NvdW50aW5nIGZvciBvZmZzZXRcbiAgICBkaXN0YW5jZSA9IHN0b3AgLSBzdGFydCArIG9mZnNldFxuXG4gICAgLy8gcmVzb2x2ZSBkdXJhdGlvblxuICAgIHN3aXRjaCAodHlwZW9mIG9wdGlvbnMuZHVyYXRpb24pIHtcbiAgICAgIC8vIG51bWJlciBpbiBtc1xuICAgICAgY2FzZSAnbnVtYmVyJzpcbiAgICAgICAgZHVyYXRpb24gPSBvcHRpb25zLmR1cmF0aW9uXG4gICAgICAgIGJyZWFrXG5cbiAgICAgIC8vIGZ1bmN0aW9uIHBhc3NlZCB0aGUgZGlzdGFuY2Ugb2YgdGhlIHNjcm9sbFxuICAgICAgY2FzZSAnZnVuY3Rpb24nOlxuICAgICAgICBkdXJhdGlvbiA9IG9wdGlvbnMuZHVyYXRpb24oZGlzdGFuY2UpXG4gICAgICAgIGJyZWFrXG4gICAgfVxuXG4gICAgLy8gc3RhcnQgdGhlIGxvb3BcbiAgICB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lKGxvb3ApXG4gIH1cblxuICAvLyBleHBvc2Ugb25seSB0aGUganVtcCBtZXRob2RcbiAgcmV0dXJuIGp1bXBcbn1cblxuLy8gZXhwb3J0IHNpbmdsZXRvblxuXG5jb25zdCBzaW5nbGV0b24gPSBqdW1wZXIoKVxuXG5leHBvcnQgZGVmYXVsdCBzaW5nbGV0b25cbiIsImltcG9ydCB7IEJhc2UsIFZpZXcgfSBmcm9tIFwiLi9hc1wiO1xyXG5cclxuY2xhc3MgVXRpbHMgZXh0ZW5kcyBCYXNlIHtcclxuXHRzdGF0aWMgcXVlcnkoYmFzZSwgc2VsZWN0b3IpIHtcclxuXHRcdHJldHVybiBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbCgoc2VsZWN0b3IgJiYgYmFzZSA/IGJhc2UgOiBkb2N1bWVudCkucXVlcnlTZWxlY3RvckFsbChzZWxlY3RvciA/IHNlbGVjdG9yIDogYmFzZSkpO1xyXG5cdH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgVXRpbHM7XHJcbiIsIi8vIGltcG9ydCAnYmFiZWwtcG9seWZpbGwnO1xyXG4vLyBpbXBvcnQgJ3doYXR3Zy1mZXRjaCc7XHJcblxyXG5pbXBvcnQgeyBWaWV3IH0gZnJvbSAnLi9saWJzL2FzJztcclxuaW1wb3J0IFV0aWxzIGZyb20gJy4vbGlicy91dGlscyc7XHJcbmltcG9ydCBIZWFkZXIgZnJvbSAnLi9jb21wb25lbnRzL2hlYWRlcic7XHJcblxyXG5jbGFzcyBBcHAgZXh0ZW5kcyBWaWV3IHtcclxuXHRjb25zdHJ1Y3RvcihlbCkge1xyXG5cdFx0c3VwZXIoZWwpO1xyXG5cdFx0SGVhZGVyLmluaXQoKTtcclxuXHR9XHJcbn1cclxuXHJcbndpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdsb2FkJywgKCkgPT4ge1xyXG5cdG5ldyBBcHAoZG9jdW1lbnQuYm9keSk7XHJcbn0pOyJdfQ==
