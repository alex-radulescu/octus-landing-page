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
		}
	}, {
		key: 'navigate',
		value: function navigate(e) {
			e.preventDefault();
			(0, _jump2.default)(e.target.getAttribute("href"));
			document.querySelectorAll(".main-navigation-link").forEach(function (item) {
				return item.classList.remove("is-active");
			});
			e.target.classList.add("is-active");
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvc2NyaXB0cy9jb21wb25lbnRzL2hlYWRlci5qcyIsInNyYy9zY3JpcHRzL2xpYnMvYXMvYmFzZS5qcyIsInNyYy9zY3JpcHRzL2xpYnMvYXMvaW5kZXguanMiLCJzcmMvc2NyaXB0cy9saWJzL2FzL3ZpZXcuanMiLCJzcmMvc2NyaXB0cy9saWJzL2Vhc2luZy5qcyIsInNyYy9zY3JpcHRzL2xpYnMvanVtcC5qcyIsInNyYy9zY3JpcHRzL2xpYnMvdXRpbHMuanMiLCJzcmMvc2NyaXB0cy9zY3JpcHQuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7OztBQ0FDOztBQUNEOzs7O0FBQ0E7Ozs7Ozs7Ozs7OztJQUVNLE07OztBQUNMLGlCQUFZLEVBQVosRUFBZ0I7QUFBQTs7QUFBQSw4R0FDVCxFQURTOztBQUdmLFFBQUssY0FBTDtBQUNBO0FBQ0EsUUFBSyxXQUFMLENBQWlCLFFBQWpCLEVBQTJCLFFBQTNCLEVBQXFDLE1BQUssY0FBTCxDQUFvQixJQUFwQixPQUFyQztBQUNBLFFBQUssV0FBTCxDQUFpQixPQUFqQixFQUEwQix1QkFBMUIsRUFBbUQsTUFBSyxRQUFMLENBQWMsSUFBZCxPQUFuRDtBQU5lO0FBT2Y7Ozs7bUNBRWdCO0FBQ2hCLE9BQUcsT0FBTyxXQUFQLEdBQXFCLE9BQU8sV0FBUCxHQUFtQixDQUEzQyxFQUE4QztBQUM3QyxTQUFLLEVBQUwsQ0FBUSxTQUFSLENBQWtCLE1BQWxCLENBQXlCLGNBQXpCO0FBQ0EsSUFGRCxNQUVPO0FBQ04sU0FBSyxFQUFMLENBQVEsU0FBUixDQUFrQixHQUFsQixDQUFzQixjQUF0QjtBQUNBO0FBQ0Q7OzsyQkFFUSxDLEVBQUc7QUFDWCxLQUFFLGNBQUY7QUFDQSx1QkFBSyxFQUFFLE1BQUYsQ0FBUyxZQUFULENBQXNCLE1BQXRCLENBQUw7QUFDQSxZQUFTLGdCQUFU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Ozs7Ozs7d0JBQ1EsSSxFQUFNLFEsRUFBVTtBQUM1QixVQUFPLE1BQU0sU0FBTixDQUFnQixLQUFoQixDQUFzQixJQUF0QixDQUEyQixDQUFDLFlBQVksSUFBWixHQUFtQixJQUFuQixHQUEwQixRQUEzQixFQUFxQyxnQkFBckMsQ0FBc0QsV0FBVyxRQUFYLEdBQXNCLElBQTVFLENBQTNCLENBQVA7QUFDQTs7Ozs7O2tCQUdhLEs7Ozs7O0FDTGY7O0FBQ0E7Ozs7QUFDQTs7Ozs7Ozs7OzsrZUFMQTtBQUNBOztJQU1NLEc7OztBQUNMLGNBQVksRUFBWixFQUFnQjtBQUFBOztBQUFBLHdHQUNULEVBRFM7O0FBRWYsbUJBQU8sSUFBUDtBQUZlO0FBR2Y7Ozs7O0FBR0YsT0FBTyxnQkFBUCxDQUF3QixNQUF4QixFQUFnQyxZQUFNO0FBQ3JDLEtBQUksR0FBSixDQUFRLFNBQVMsSUFBakI7QUFDQSxDQUZEIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIu+7v2ltcG9ydCB7IFZpZXcgfSBmcm9tICcuLi9saWJzL2FzJztcclxuaW1wb3J0IFV0aWxzIGZyb20gJy4uL2xpYnMvdXRpbHMnO1xyXG5pbXBvcnQganVtcCBmcm9tICcuLi9saWJzL2p1bXAnO1xyXG5cclxuY2xhc3MgSGVhZGVyIGV4dGVuZHMgVmlldyB7XHJcblx0Y29uc3RydWN0b3IoZWwpIHtcclxuXHRcdHN1cGVyKGVsKTtcclxuXHJcblx0XHR0aGlzLm9uV2luZG93U2Nyb2xsKCk7XHJcblx0XHQvL3RoaXMuYWRkTGlzdGVuZXIoXCJjbGlja1wiLCBcIi5idXJnZXItbWVudVwiLCB0aGlzLnRvZ2dsZU1vYmlsZU1lbnUuYmluZCh0aGlzKSk7XHJcblx0XHR0aGlzLmFkZExpc3RlbmVyKFwic2Nyb2xsXCIsIGRvY3VtZW50LCB0aGlzLm9uV2luZG93U2Nyb2xsLmJpbmQodGhpcykpO1xyXG5cdFx0dGhpcy5hZGRMaXN0ZW5lcihcImNsaWNrXCIsIFwiLm1haW4tbmF2aWdhdGlvbi1saW5rXCIsIHRoaXMubmF2aWdhdGUuYmluZCh0aGlzKSk7XHJcblx0fVxyXG5cclxuXHRvbldpbmRvd1Njcm9sbCgpIHtcclxuXHRcdGlmKHdpbmRvdy5wYWdlWU9mZnNldCA+IHdpbmRvdy5pbm5lckhlaWdodC8yKSB7XHJcblx0XHRcdHRoaXMuZWwuY2xhc3NMaXN0LnJlbW92ZShcImlzLWludmlzaWJsZVwiKTtcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdHRoaXMuZWwuY2xhc3NMaXN0LmFkZChcImlzLWludmlzaWJsZVwiKVxyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0bmF2aWdhdGUoZSkge1xyXG5cdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cdFx0anVtcChlLnRhcmdldC5nZXRBdHRyaWJ1dGUoXCJocmVmXCIpKTtcclxuXHRcdGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIubWFpbi1uYXZpZ2F0aW9uLWxpbmtcIikuZm9yRWFjaChpdGVtID0+ICBpdGVtLmNsYXNzTGlzdC5yZW1vdmUoXCJpcy1hY3RpdmVcIikpO1xyXG5cdFx0ZS50YXJnZXQuY2xhc3NMaXN0LmFkZChcImlzLWFjdGl2ZVwiKTtcclxuXHR9XHJcblxyXG5cdHN0YXRpYyBpbml0KHNlbGVjdG9yID0gXCIuaGVhZGVyXCIsIGJhc2UgPSBkb2N1bWVudC5ib2R5KSB7XHJcblx0XHRVdGlscy5xdWVyeShiYXNlLCBzZWxlY3RvcikuZm9yRWFjaChlbGVtZW50ID0+IHtcdFxyXG5cdFx0XHRuZXcgSGVhZGVyKGVsZW1lbnQpO1xyXG5cdFx0fSk7XHJcblx0fVxyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgSGVhZGVyOyIsImNsYXNzIEJhc2Uge1xyXG5cdGNvbnN0cnVjdG9yKCkge1xyXG5cdFx0dGhpcy5saXN0ZW5lcnMgPSB7fTtcclxuXHR9XHJcblxyXG5cdHN1YnNjcmliZShldmVudE5hbWUsIGxpc3RlbmVyLCBjb250ZXh0KSB7XHJcblx0XHQodGhpcy5saXN0ZW5lcnNbZXZlbnROYW1lXSA9IHRoaXMubGlzdGVuZXJzW2V2ZW50TmFtZV0gfHwgW10pLnB1c2goe1xyXG5cdFx0XHRmdW5jOiBsaXN0ZW5lcixcclxuXHRcdFx0Y29udGV4dDogY29udGV4dFxyXG5cdFx0fSk7XHJcblx0fVxyXG5cclxuXHRlbWl0KGV2ZW50TmFtZSwgLi4uYXJnKSB7XHJcblx0XHRmb3IobGV0IGxpc3RlbmVyIG9mICh0aGlzLmxpc3RlbmVyc1tldmVudE5hbWVdIHx8IFtdKSkge1xyXG5cdFx0XHRsaXN0ZW5lci5mdW5jLmFwcGx5KGxpc3RlbmVyLmNvbnRleHQsIGFyZyk7XHJcblx0XHR9XHJcblx0fVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBCYXNlO1xyXG4iLCJpbXBvcnQgQmFzZSBmcm9tICcuL2Jhc2UnO1xyXG5pbXBvcnQgVmlldyBmcm9tICcuL3ZpZXcnO1xyXG5cclxuZXhwb3J0IHsgZGVmYXVsdCBhcyBCYXNlfSBmcm9tICcuL2Jhc2UnO1xyXG5leHBvcnQgeyBkZWZhdWx0IGFzIFZpZXd9IGZyb20gJy4vdmlldyc7XHJcblxyXG5leHBvcnQgZGVmYXVsdCB7XHJcbiAgQmFzZSxcclxuICBWaWV3XHJcbn07XHJcbiIsImltcG9ydCBCYXNlIGZyb20gJy4vYmFzZSc7XHJcblxyXG5jbGFzcyBWaWV3IGV4dGVuZHMgQmFzZSB7XHJcblx0Y29uc3RydWN0b3IoLi4uYXJncykge1xyXG5cdFx0c3VwZXIoKTtcclxuXHRcdGlmKGFyZ3NbMF0uY29uc3RydWN0b3IgPT09IEFycmF5KSB7IGFyZ3MgPSBhcmdzWzBdOyB9XHJcblx0XHR0aGlzLmVsID0gdHlwZW9mKGFyZ3NbMF0pPT09XCJzdHJpbmdcIiA/IHRoaXMubWFrZUVsZW1lbnQuYXBwbHkodGhpcywgYXJndW1lbnRzKSA6IGFyZ3NbMF07XHJcblx0fVxyXG5cclxuXHRxdWVyeShxdWVyeSkge1xyXG5cdFx0cmV0dXJuIEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKHRoaXMuZWwucXVlcnlTZWxlY3RvckFsbChxdWVyeSkpO1xyXG5cdH1cclxuXHJcblx0YWRkTGlzdGVuZXIodHlwZSwgbWF0Y2gsIG1ldGhvZCkge1xyXG5cdFx0aWYodHlwZS5zcGxpdChcIiBcIikubGVuZ3RoID4gMSkge1xyXG5cdFx0XHR0eXBlLnNwbGl0KFwiIFwiKS5mb3JFYWNoKHQgPT4gdGhpcy5hZGRMaXN0ZW5lcih0LCBtYXRjaCwgbWV0aG9kKSk7XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHRsZXQgZWxlbSA9IHRoaXMuZWw7XHJcblx0XHRcdGlmKHR5cGVvZihtYXRjaCkgPT09IFwiZnVuY3Rpb25cIikge1xyXG5cdFx0XHRcdG1ldGhvZCA9IG1hdGNoO1xyXG5cdFx0XHRcdG1hdGNoID0gbnVsbDtcclxuXHRcdFx0fSBlbHNlIGlmKG1hdGNoID09PSBkb2N1bWVudCB8fCBtYXRjaCA9PSB3aW5kb3cgKSB7XHJcblx0XHRcdFx0ZWxlbSA9IG1hdGNoO1xyXG5cdFx0XHRcdG1hdGNoID0gbnVsbDtcclxuXHRcdFx0fSBlbHNlIGlmIChtYXRjaCA9PT0gJ2JvZHknKSB7XHJcblx0XHRcdFx0ZWxlbSA9IGRvY3VtZW50LmJvZHk7XHJcblx0XHRcdFx0bWF0Y2ggPSBudWxsO1xyXG5cdFx0XHR9XHJcblx0XHRcdGVsZW0uYWRkRXZlbnRMaXN0ZW5lcih0eXBlLCBlID0+IHtcclxuXHRcdFx0XHRpZiAoIW1hdGNoKSByZXR1cm4gbWV0aG9kKGUpO1xyXG5cdFx0XHRcdHZhciBjdXJyZW50ID0gZS50YXJnZXQ7XHJcblx0XHRcdFx0d2hpbGUgKGN1cnJlbnQucGFyZW50Tm9kZSkge1xyXG5cdFx0XHRcdFx0Ly8gSUUxMSBpcyB3ZWlyZCwgaGFzIGltcGxlbWVudGVkIHRoaXMgYXMgbXNNYXRjaGVzU2VsZWN0b3IuLi5cclxuXHRcdFx0XHRcdGlmICgoY3VycmVudC5tYXRjaGVzIHx8IGN1cnJlbnQubXNNYXRjaGVzU2VsZWN0b3IpLmNhbGwoY3VycmVudCwgbWF0Y2gpKSB7XHJcblx0XHRcdFx0XHRcdG1ldGhvZChlLCBjdXJyZW50KTtcclxuXHRcdFx0XHRcdFx0YnJlYWs7XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRjdXJyZW50ID0gY3VycmVudC5wYXJlbnROb2RlO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fSk7XHJcblx0XHR9XHJcblx0fVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBWaWV3O1xyXG4iLCIvLyBSb2JlcnQgUGVubmVyJ3MgZWFzZUluT3V0UXVhZFxuXG4vLyBmaW5kIHRoZSByZXN0IG9mIGhpcyBlYXNpbmcgZnVuY3Rpb25zIGhlcmU6IGh0dHA6Ly9yb2JlcnRwZW5uZXIuY29tL2Vhc2luZy9cbi8vIGZpbmQgdGhlbSBleHBvcnRlZCBmb3IgRVM2IGNvbnN1bXB0aW9uIGhlcmU6IGh0dHBzOi8vZ2l0aHViLmNvbS9qYXhnZWxsZXIvZXouanNcblxuY29uc3QgZWFzZUluT3V0UXVhZCA9ICh0LCBiLCBjLCBkKSA9PiB7XG4gIHQgLz0gZCAvIDJcbiAgaWYgKHQgPCAxKSByZXR1cm4gYyAvIDIgKiB0ICogdCArIGJcbiAgdC0tXG4gIHJldHVybiAtYyAvIDIgKiAodCAqICh0IC0gMikgLSAxKSArIGJcbn1cblxuZXhwb3J0IGRlZmF1bHQgZWFzZUluT3V0UXVhZFxuIiwiaW1wb3J0IGVhc2VJbk91dFF1YWQgZnJvbSAnLi9lYXNpbmcnXG5cbmNvbnN0IGp1bXBlciA9ICgpID0+IHtcbiAgLy8gcHJpdmF0ZSB2YXJpYWJsZSBjYWNoZVxuICAvLyBubyB2YXJpYWJsZXMgYXJlIGNyZWF0ZWQgZHVyaW5nIGEganVtcCwgcHJldmVudGluZyBtZW1vcnkgbGVha3NcblxuICBsZXQgZWxlbWVudCAgICAgICAgIC8vIGVsZW1lbnQgdG8gc2Nyb2xsIHRvICAgICAgICAgICAgICAgICAgIChub2RlKVxuXG4gIGxldCBzdGFydCAgICAgICAgICAgLy8gd2hlcmUgc2Nyb2xsIHN0YXJ0cyAgICAgICAgICAgICAgICAgICAgKHB4KVxuICBsZXQgc3RvcCAgICAgICAgICAgIC8vIHdoZXJlIHNjcm9sbCBzdG9wcyAgICAgICAgICAgICAgICAgICAgIChweClcblxuICBsZXQgb2Zmc2V0ICAgICAgICAgIC8vIGFkanVzdG1lbnQgZnJvbSB0aGUgc3RvcCBwb3NpdGlvbiAgICAgIChweClcbiAgbGV0IGVhc2luZyAgICAgICAgICAvLyBlYXNpbmcgZnVuY3Rpb24gICAgICAgICAgICAgICAgICAgICAgICAoZnVuY3Rpb24pXG4gIGxldCBhMTF5ICAgICAgICAgICAgLy8gYWNjZXNzaWJpbGl0eSBzdXBwb3J0IGZsYWcgICAgICAgICAgICAgKGJvb2xlYW4pXG5cbiAgbGV0IGRpc3RhbmNlICAgICAgICAvLyBkaXN0YW5jZSBvZiBzY3JvbGwgICAgICAgICAgICAgICAgICAgICAocHgpXG4gIGxldCBkdXJhdGlvbiAgICAgICAgLy8gc2Nyb2xsIGR1cmF0aW9uICAgICAgICAgICAgICAgICAgICAgICAgKG1zKVxuXG4gIGxldCB0aW1lU3RhcnQgICAgICAgLy8gdGltZSBzY3JvbGwgc3RhcnRlZCAgICAgICAgICAgICAgICAgICAgKG1zKVxuICBsZXQgdGltZUVsYXBzZWQgICAgIC8vIHRpbWUgc3BlbnQgc2Nyb2xsaW5nIHRodXMgZmFyICAgICAgICAgIChtcylcblxuICBsZXQgbmV4dCAgICAgICAgICAgIC8vIG5leHQgc2Nyb2xsIHBvc2l0aW9uICAgICAgICAgICAgICAgICAgIChweClcblxuICBsZXQgY2FsbGJhY2sgICAgICAgIC8vIHRvIGNhbGwgd2hlbiBkb25lIHNjcm9sbGluZyAgICAgICAgICAgIChmdW5jdGlvbilcblxuICAvLyBzY3JvbGwgcG9zaXRpb24gaGVscGVyXG5cbiAgZnVuY3Rpb24gbG9jYXRpb24gKCkge1xuICAgIHJldHVybiB3aW5kb3cuc2Nyb2xsWSB8fCB3aW5kb3cucGFnZVlPZmZzZXRcbiAgfVxuXG4gIC8vIGVsZW1lbnQgb2Zmc2V0IGhlbHBlclxuXG4gIGZ1bmN0aW9uIHRvcCAoZWxlbWVudCkge1xuICAgIHJldHVybiBlbGVtZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLnRvcCArIHN0YXJ0XG4gIH1cblxuICAvLyByQUYgbG9vcCBoZWxwZXJcblxuICBmdW5jdGlvbiBsb29wICh0aW1lQ3VycmVudCkge1xuICAgIC8vIHN0b3JlIHRpbWUgc2Nyb2xsIHN0YXJ0ZWQsIGlmIG5vdCBzdGFydGVkIGFscmVhZHlcbiAgICBpZiAoIXRpbWVTdGFydCkge1xuICAgICAgdGltZVN0YXJ0ID0gdGltZUN1cnJlbnRcbiAgICB9XG5cbiAgICAvLyBkZXRlcm1pbmUgdGltZSBzcGVudCBzY3JvbGxpbmcgc28gZmFyXG4gICAgdGltZUVsYXBzZWQgPSB0aW1lQ3VycmVudCAtIHRpbWVTdGFydFxuXG4gICAgLy8gY2FsY3VsYXRlIG5leHQgc2Nyb2xsIHBvc2l0aW9uXG4gICAgbmV4dCA9IGVhc2luZyh0aW1lRWxhcHNlZCwgc3RhcnQsIGRpc3RhbmNlLCBkdXJhdGlvbilcblxuICAgIC8vIHNjcm9sbCB0byBpdFxuICAgIHdpbmRvdy5zY3JvbGxUbygwLCBuZXh0KVxuXG4gICAgLy8gY2hlY2sgcHJvZ3Jlc3NcbiAgICB0aW1lRWxhcHNlZCA8IGR1cmF0aW9uXG4gICAgICA/IHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUobG9vcCkgICAgICAgLy8gY29udGludWUgc2Nyb2xsIGxvb3BcbiAgICAgIDogZG9uZSgpICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBzY3JvbGxpbmcgaXMgZG9uZVxuICB9XG5cbiAgLy8gc2Nyb2xsIGZpbmlzaGVkIGhlbHBlclxuXG4gIGZ1bmN0aW9uIGRvbmUgKCkge1xuICAgIC8vIGFjY291bnQgZm9yIHJBRiB0aW1lIHJvdW5kaW5nIGluYWNjdXJhY2llc1xuICAgIHdpbmRvdy5zY3JvbGxUbygwLCBzdGFydCArIGRpc3RhbmNlKVxuXG4gICAgLy8gaWYgc2Nyb2xsaW5nIHRvIGFuIGVsZW1lbnQsIGFuZCBhY2Nlc3NpYmlsaXR5IGlzIGVuYWJsZWRcbiAgICBpZiAoZWxlbWVudCAmJiBhMTF5KSB7XG4gICAgICAvLyBhZGQgdGFiaW5kZXggaW5kaWNhdGluZyBwcm9ncmFtbWF0aWMgZm9jdXNcbiAgICAgIGVsZW1lbnQuc2V0QXR0cmlidXRlKCd0YWJpbmRleCcsICctMScpXG5cbiAgICAgIC8vIGZvY3VzIHRoZSBlbGVtZW50XG4gICAgICBlbGVtZW50LmZvY3VzKClcbiAgICB9XG5cbiAgICAvLyBpZiBpdCBleGlzdHMsIGZpcmUgdGhlIGNhbGxiYWNrXG4gICAgaWYgKHR5cGVvZiBjYWxsYmFjayA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgY2FsbGJhY2soKVxuICAgIH1cblxuICAgIC8vIHJlc2V0IHRpbWUgZm9yIG5leHQganVtcFxuICAgIHRpbWVTdGFydCA9IGZhbHNlXG4gIH1cblxuICAvLyBBUElcblxuICBmdW5jdGlvbiBqdW1wICh0YXJnZXQsIG9wdGlvbnMgPSB7fSkge1xuICAgIC8vIHJlc29sdmUgb3B0aW9ucywgb3IgdXNlIGRlZmF1bHRzXG4gICAgZHVyYXRpb24gPSBvcHRpb25zLmR1cmF0aW9uIHx8IDEwMDBcbiAgICBvZmZzZXQgPSBvcHRpb25zLm9mZnNldCB8fCAwXG4gICAgY2FsbGJhY2sgPSBvcHRpb25zLmNhbGxiYWNrICAgICAgICAgICAgICAgICAgICAgICAvLyBcInVuZGVmaW5lZFwiIGlzIGEgc3VpdGFibGUgZGVmYXVsdCwgYW5kIHdvbid0IGJlIGNhbGxlZFxuICAgIGVhc2luZyA9IG9wdGlvbnMuZWFzaW5nIHx8IGVhc2VJbk91dFF1YWRcbiAgICBhMTF5ID0gb3B0aW9ucy5hMTF5IHx8IGZhbHNlXG5cbiAgICAvLyBjYWNoZSBzdGFydGluZyBwb3NpdGlvblxuICAgIHN0YXJ0ID0gbG9jYXRpb24oKVxuXG4gICAgLy8gcmVzb2x2ZSB0YXJnZXRcbiAgICBzd2l0Y2ggKHR5cGVvZiB0YXJnZXQpIHtcbiAgICAgIC8vIHNjcm9sbCBmcm9tIGN1cnJlbnQgcG9zaXRpb25cbiAgICAgIGNhc2UgJ251bWJlcic6XG4gICAgICAgIGVsZW1lbnQgPSB1bmRlZmluZWQgICAgICAgICAgIC8vIG5vIGVsZW1lbnQgdG8gc2Nyb2xsIHRvXG4gICAgICAgIGExMXkgPSBmYWxzZSAgICAgICAgICAgICAgICAgIC8vIG1ha2Ugc3VyZSBhY2Nlc3NpYmlsaXR5IGlzIG9mZlxuICAgICAgICBzdG9wID0gc3RhcnQgKyB0YXJnZXRcbiAgICAgICAgYnJlYWtcblxuICAgICAgLy8gc2Nyb2xsIHRvIGVsZW1lbnQgKG5vZGUpXG4gICAgICAvLyBib3VuZGluZyByZWN0IGlzIHJlbGF0aXZlIHRvIHRoZSB2aWV3cG9ydFxuICAgICAgY2FzZSAnb2JqZWN0JzpcbiAgICAgICAgZWxlbWVudCA9IHRhcmdldFxuICAgICAgICBzdG9wID0gdG9wKGVsZW1lbnQpXG4gICAgICAgIGJyZWFrXG5cbiAgICAgIC8vIHNjcm9sbCB0byBlbGVtZW50IChzZWxlY3RvcilcbiAgICAgIC8vIGJvdW5kaW5nIHJlY3QgaXMgcmVsYXRpdmUgdG8gdGhlIHZpZXdwb3J0XG4gICAgICBjYXNlICdzdHJpbmcnOlxuICAgICAgICBlbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3Rvcih0YXJnZXQpXG4gICAgICAgIHN0b3AgPSB0b3AoZWxlbWVudClcbiAgICAgICAgYnJlYWtcbiAgICB9XG5cbiAgICAvLyByZXNvbHZlIHNjcm9sbCBkaXN0YW5jZSwgYWNjb3VudGluZyBmb3Igb2Zmc2V0XG4gICAgZGlzdGFuY2UgPSBzdG9wIC0gc3RhcnQgKyBvZmZzZXRcblxuICAgIC8vIHJlc29sdmUgZHVyYXRpb25cbiAgICBzd2l0Y2ggKHR5cGVvZiBvcHRpb25zLmR1cmF0aW9uKSB7XG4gICAgICAvLyBudW1iZXIgaW4gbXNcbiAgICAgIGNhc2UgJ251bWJlcic6XG4gICAgICAgIGR1cmF0aW9uID0gb3B0aW9ucy5kdXJhdGlvblxuICAgICAgICBicmVha1xuXG4gICAgICAvLyBmdW5jdGlvbiBwYXNzZWQgdGhlIGRpc3RhbmNlIG9mIHRoZSBzY3JvbGxcbiAgICAgIGNhc2UgJ2Z1bmN0aW9uJzpcbiAgICAgICAgZHVyYXRpb24gPSBvcHRpb25zLmR1cmF0aW9uKGRpc3RhbmNlKVxuICAgICAgICBicmVha1xuICAgIH1cblxuICAgIC8vIHN0YXJ0IHRoZSBsb29wXG4gICAgd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZShsb29wKVxuICB9XG5cbiAgLy8gZXhwb3NlIG9ubHkgdGhlIGp1bXAgbWV0aG9kXG4gIHJldHVybiBqdW1wXG59XG5cbi8vIGV4cG9ydCBzaW5nbGV0b25cblxuY29uc3Qgc2luZ2xldG9uID0ganVtcGVyKClcblxuZXhwb3J0IGRlZmF1bHQgc2luZ2xldG9uXG4iLCJpbXBvcnQgeyBCYXNlLCBWaWV3IH0gZnJvbSBcIi4vYXNcIjtcclxuXHJcbmNsYXNzIFV0aWxzIGV4dGVuZHMgQmFzZSB7XHJcblx0c3RhdGljIHF1ZXJ5KGJhc2UsIHNlbGVjdG9yKSB7XHJcblx0XHRyZXR1cm4gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoKHNlbGVjdG9yICYmIGJhc2UgPyBiYXNlIDogZG9jdW1lbnQpLnF1ZXJ5U2VsZWN0b3JBbGwoc2VsZWN0b3IgPyBzZWxlY3RvciA6IGJhc2UpKTtcclxuXHR9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IFV0aWxzO1xyXG4iLCIvLyBpbXBvcnQgJ2JhYmVsLXBvbHlmaWxsJztcclxuLy8gaW1wb3J0ICd3aGF0d2ctZmV0Y2gnO1xyXG5cclxuaW1wb3J0IHsgVmlldyB9IGZyb20gJy4vbGlicy9hcyc7XHJcbmltcG9ydCBVdGlscyBmcm9tICcuL2xpYnMvdXRpbHMnO1xyXG5pbXBvcnQgSGVhZGVyIGZyb20gJy4vY29tcG9uZW50cy9oZWFkZXInO1xyXG5cclxuY2xhc3MgQXBwIGV4dGVuZHMgVmlldyB7XHJcblx0Y29uc3RydWN0b3IoZWwpIHtcclxuXHRcdHN1cGVyKGVsKTtcclxuXHRcdEhlYWRlci5pbml0KCk7XHJcblx0fVxyXG59XHJcblxyXG53aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignbG9hZCcsICgpID0+IHtcclxuXHRuZXcgQXBwKGRvY3VtZW50LmJvZHkpO1xyXG59KTsiXX0=
