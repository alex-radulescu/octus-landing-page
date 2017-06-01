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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvc2NyaXB0cy9jb21wb25lbnRzL2hlYWRlci5qcyIsInNyYy9zY3JpcHRzL2xpYnMvYXMvYmFzZS5qcyIsInNyYy9zY3JpcHRzL2xpYnMvYXMvaW5kZXguanMiLCJzcmMvc2NyaXB0cy9saWJzL2FzL3ZpZXcuanMiLCJzcmMvc2NyaXB0cy9saWJzL2Vhc2luZy5qcyIsInNyYy9zY3JpcHRzL2xpYnMvanVtcC5qcyIsInNyYy9zY3JpcHRzL2xpYnMvdXRpbHMuanMiLCJzcmMvc2NyaXB0cy9zY3JpcHQuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7OztBQ0FDOztBQUNEOzs7O0FBQ0E7Ozs7Ozs7Ozs7OztJQUVNLE07OztBQUNMLGlCQUFZLEVBQVosRUFBZ0I7QUFBQTs7QUFBQSw4R0FDVCxFQURTOztBQUdmLFFBQUssY0FBTDtBQUNBO0FBQ0EsUUFBSyxXQUFMLENBQWlCLFFBQWpCLEVBQTJCLFFBQTNCLEVBQXFDLE1BQUssY0FBTCxDQUFvQixJQUFwQixPQUFyQztBQUNBLFFBQUssV0FBTCxDQUFpQixPQUFqQixFQUEwQix1QkFBMUIsRUFBbUQsTUFBSyxRQUFMLENBQWMsSUFBZCxPQUFuRDtBQU5lO0FBT2Y7Ozs7bUNBRWdCO0FBQ2hCLE9BQUcsT0FBTyxXQUFQLEdBQXFCLE9BQU8sV0FBUCxHQUFtQixDQUEzQyxFQUE4QztBQUM3QyxTQUFLLEVBQUwsQ0FBUSxTQUFSLENBQWtCLE1BQWxCLENBQXlCLGNBQXpCO0FBQ0EsSUFGRCxNQUVPO0FBQ04sU0FBSyxFQUFMLENBQVEsU0FBUixDQUFrQixHQUFsQixDQUFzQixjQUF0QjtBQUNBO0FBQ0Q7OzsyQkFFUSxDLEVBQUc7QUFDWCxLQUFFLGNBQUY7QUFDQSx1QkFBSyxFQUFFLE1BQUYsQ0FBUyxZQUFULENBQXNCLE1BQXRCLENBQUw7QUFDQSxLQUFFLE1BQUYsQ0FBUyxTQUFULENBQW1CLEdBQW5CLENB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Q0FBc0QsV0FBVyxRQUFYLEdBQXNCLElBQTVFLENBQTNCLENBQVA7QUFDQTs7Ozs7O2tCQUdhLEs7Ozs7O0FDTGY7O0FBQ0E7Ozs7QUFDQTs7Ozs7Ozs7OzsrZUFMQTtBQUNBOztJQU1NLEc7OztBQUNMLGNBQVksRUFBWixFQUFnQjtBQUFBOztBQUFBLHdHQUNULEVBRFM7O0FBRWYsbUJBQU8sSUFBUDtBQUZlO0FBR2Y7Ozs7O0FBR0YsT0FBTyxnQkFBUCxDQUF3QixNQUF4QixFQUFnQyxZQUFNO0FBQ3JDLEtBQUksR0FBSixDQUFRLFNBQVMsSUFBakI7QUFDQSxDQUZEIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIu+7v2ltcG9ydCB7IFZpZXcgfSBmcm9tICcuLi9saWJzL2FzJztcclxuaW1wb3J0IFV0aWxzIGZyb20gJy4uL2xpYnMvdXRpbHMnO1xyXG5pbXBvcnQganVtcCBmcm9tICcuLi9saWJzL2p1bXAnO1xyXG5cclxuY2xhc3MgSGVhZGVyIGV4dGVuZHMgVmlldyB7XHJcblx0Y29uc3RydWN0b3IoZWwpIHtcclxuXHRcdHN1cGVyKGVsKTtcclxuXHJcblx0XHR0aGlzLm9uV2luZG93U2Nyb2xsKCk7XHJcblx0XHQvL3RoaXMuYWRkTGlzdGVuZXIoXCJjbGlja1wiLCBcIi5idXJnZXItbWVudVwiLCB0aGlzLnRvZ2dsZU1vYmlsZU1lbnUuYmluZCh0aGlzKSk7XHJcblx0XHR0aGlzLmFkZExpc3RlbmVyKFwic2Nyb2xsXCIsIGRvY3VtZW50LCB0aGlzLm9uV2luZG93U2Nyb2xsLmJpbmQodGhpcykpO1xyXG5cdFx0dGhpcy5hZGRMaXN0ZW5lcihcImNsaWNrXCIsIFwiLm1haW4tbmF2aWdhdGlvbi1saW5rXCIsIHRoaXMubmF2aWdhdGUuYmluZCh0aGlzKSk7XHJcblx0fVxyXG5cclxuXHRvbldpbmRvd1Njcm9sbCgpIHtcclxuXHRcdGlmKHdpbmRvdy5wYWdlWU9mZnNldCA+IHdpbmRvdy5pbm5lckhlaWdodC8yKSB7XHJcblx0XHRcdHRoaXMuZWwuY2xhc3NMaXN0LnJlbW92ZShcImlzLWludmlzaWJsZVwiKTtcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdHRoaXMuZWwuY2xhc3NMaXN0LmFkZChcImlzLWludmlzaWJsZVwiKVxyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0bmF2aWdhdGUoZSkge1xyXG5cdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cdFx0anVtcChlLnRhcmdldC5nZXRBdHRyaWJ1dGUoXCJocmVmXCIpKTtcclxuXHRcdGUudGFyZ2V0LmNsYXNzTGlzdC5hZGQoXCJpcy1hY3RpdmVcIik7XHJcblx0fVxyXG5cclxuXHRzdGF0aWMgaW5pdChzZWxlY3RvciA9IFwiLmhlYWRlclwiLCBiYXNlID0gZG9jdW1lbnQuYm9keSkge1xyXG5cdFx0VXRpbHMucXVlcnkoYmFzZSwgc2VsZWN0b3IpLmZvckVhY2goZWxlbWVudCA9PiB7XHRcclxuXHRcdFx0bmV3IEhlYWRlcihlbGVtZW50KTtcclxuXHRcdH0pO1xyXG5cdH1cclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IEhlYWRlcjsiLCJjbGFzcyBCYXNlIHtcclxuXHRjb25zdHJ1Y3RvcigpIHtcclxuXHRcdHRoaXMubGlzdGVuZXJzID0ge307XHJcblx0fVxyXG5cclxuXHRzdWJzY3JpYmUoZXZlbnROYW1lLCBsaXN0ZW5lciwgY29udGV4dCkge1xyXG5cdFx0KHRoaXMubGlzdGVuZXJzW2V2ZW50TmFtZV0gPSB0aGlzLmxpc3RlbmVyc1tldmVudE5hbWVdIHx8IFtdKS5wdXNoKHtcclxuXHRcdFx0ZnVuYzogbGlzdGVuZXIsXHJcblx0XHRcdGNvbnRleHQ6IGNvbnRleHRcclxuXHRcdH0pO1xyXG5cdH1cclxuXHJcblx0ZW1pdChldmVudE5hbWUsIC4uLmFyZykge1xyXG5cdFx0Zm9yKGxldCBsaXN0ZW5lciBvZiAodGhpcy5saXN0ZW5lcnNbZXZlbnROYW1lXSB8fCBbXSkpIHtcclxuXHRcdFx0bGlzdGVuZXIuZnVuYy5hcHBseShsaXN0ZW5lci5jb250ZXh0LCBhcmcpO1xyXG5cdFx0fVxyXG5cdH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgQmFzZTtcclxuIiwiaW1wb3J0IEJhc2UgZnJvbSAnLi9iYXNlJztcclxuaW1wb3J0IFZpZXcgZnJvbSAnLi92aWV3JztcclxuXHJcbmV4cG9ydCB7IGRlZmF1bHQgYXMgQmFzZX0gZnJvbSAnLi9iYXNlJztcclxuZXhwb3J0IHsgZGVmYXVsdCBhcyBWaWV3fSBmcm9tICcuL3ZpZXcnO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQge1xyXG4gIEJhc2UsXHJcbiAgVmlld1xyXG59O1xyXG4iLCJpbXBvcnQgQmFzZSBmcm9tICcuL2Jhc2UnO1xyXG5cclxuY2xhc3MgVmlldyBleHRlbmRzIEJhc2Uge1xyXG5cdGNvbnN0cnVjdG9yKC4uLmFyZ3MpIHtcclxuXHRcdHN1cGVyKCk7XHJcblx0XHRpZihhcmdzWzBdLmNvbnN0cnVjdG9yID09PSBBcnJheSkgeyBhcmdzID0gYXJnc1swXTsgfVxyXG5cdFx0dGhpcy5lbCA9IHR5cGVvZihhcmdzWzBdKT09PVwic3RyaW5nXCIgPyB0aGlzLm1ha2VFbGVtZW50LmFwcGx5KHRoaXMsIGFyZ3VtZW50cykgOiBhcmdzWzBdO1xyXG5cdH1cclxuXHJcblx0cXVlcnkocXVlcnkpIHtcclxuXHRcdHJldHVybiBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbCh0aGlzLmVsLnF1ZXJ5U2VsZWN0b3JBbGwocXVlcnkpKTtcclxuXHR9XHJcblxyXG5cdGFkZExpc3RlbmVyKHR5cGUsIG1hdGNoLCBtZXRob2QpIHtcclxuXHRcdGlmKHR5cGUuc3BsaXQoXCIgXCIpLmxlbmd0aCA+IDEpIHtcclxuXHRcdFx0dHlwZS5zcGxpdChcIiBcIikuZm9yRWFjaCh0ID0+IHRoaXMuYWRkTGlzdGVuZXIodCwgbWF0Y2gsIG1ldGhvZCkpO1xyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0bGV0IGVsZW0gPSB0aGlzLmVsO1xyXG5cdFx0XHRpZih0eXBlb2YobWF0Y2gpID09PSBcImZ1bmN0aW9uXCIpIHtcclxuXHRcdFx0XHRtZXRob2QgPSBtYXRjaDtcclxuXHRcdFx0XHRtYXRjaCA9IG51bGw7XHJcblx0XHRcdH0gZWxzZSBpZihtYXRjaCA9PT0gZG9jdW1lbnQgfHwgbWF0Y2ggPT0gd2luZG93ICkge1xyXG5cdFx0XHRcdGVsZW0gPSBtYXRjaDtcclxuXHRcdFx0XHRtYXRjaCA9IG51bGw7XHJcblx0XHRcdH0gZWxzZSBpZiAobWF0Y2ggPT09ICdib2R5Jykge1xyXG5cdFx0XHRcdGVsZW0gPSBkb2N1bWVudC5ib2R5O1xyXG5cdFx0XHRcdG1hdGNoID0gbnVsbDtcclxuXHRcdFx0fVxyXG5cdFx0XHRlbGVtLmFkZEV2ZW50TGlzdGVuZXIodHlwZSwgZSA9PiB7XHJcblx0XHRcdFx0aWYgKCFtYXRjaCkgcmV0dXJuIG1ldGhvZChlKTtcclxuXHRcdFx0XHR2YXIgY3VycmVudCA9IGUudGFyZ2V0O1xyXG5cdFx0XHRcdHdoaWxlIChjdXJyZW50LnBhcmVudE5vZGUpIHtcclxuXHRcdFx0XHRcdC8vIElFMTEgaXMgd2VpcmQsIGhhcyBpbXBsZW1lbnRlZCB0aGlzIGFzIG1zTWF0Y2hlc1NlbGVjdG9yLi4uXHJcblx0XHRcdFx0XHRpZiAoKGN1cnJlbnQubWF0Y2hlcyB8fCBjdXJyZW50Lm1zTWF0Y2hlc1NlbGVjdG9yKS5jYWxsKGN1cnJlbnQsIG1hdGNoKSkge1xyXG5cdFx0XHRcdFx0XHRtZXRob2QoZSwgY3VycmVudCk7XHJcblx0XHRcdFx0XHRcdGJyZWFrO1xyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0Y3VycmVudCA9IGN1cnJlbnQucGFyZW50Tm9kZTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH0pO1xyXG5cdFx0fVxyXG5cdH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgVmlldztcclxuIiwiLy8gUm9iZXJ0IFBlbm5lcidzIGVhc2VJbk91dFF1YWRcblxuLy8gZmluZCB0aGUgcmVzdCBvZiBoaXMgZWFzaW5nIGZ1bmN0aW9ucyBoZXJlOiBodHRwOi8vcm9iZXJ0cGVubmVyLmNvbS9lYXNpbmcvXG4vLyBmaW5kIHRoZW0gZXhwb3J0ZWQgZm9yIEVTNiBjb25zdW1wdGlvbiBoZXJlOiBodHRwczovL2dpdGh1Yi5jb20vamF4Z2VsbGVyL2V6LmpzXG5cbmNvbnN0IGVhc2VJbk91dFF1YWQgPSAodCwgYiwgYywgZCkgPT4ge1xuICB0IC89IGQgLyAyXG4gIGlmICh0IDwgMSkgcmV0dXJuIGMgLyAyICogdCAqIHQgKyBiXG4gIHQtLVxuICByZXR1cm4gLWMgLyAyICogKHQgKiAodCAtIDIpIC0gMSkgKyBiXG59XG5cbmV4cG9ydCBkZWZhdWx0IGVhc2VJbk91dFF1YWRcbiIsImltcG9ydCBlYXNlSW5PdXRRdWFkIGZyb20gJy4vZWFzaW5nJ1xuXG5jb25zdCBqdW1wZXIgPSAoKSA9PiB7XG4gIC8vIHByaXZhdGUgdmFyaWFibGUgY2FjaGVcbiAgLy8gbm8gdmFyaWFibGVzIGFyZSBjcmVhdGVkIGR1cmluZyBhIGp1bXAsIHByZXZlbnRpbmcgbWVtb3J5IGxlYWtzXG5cbiAgbGV0IGVsZW1lbnQgICAgICAgICAvLyBlbGVtZW50IHRvIHNjcm9sbCB0byAgICAgICAgICAgICAgICAgICAobm9kZSlcblxuICBsZXQgc3RhcnQgICAgICAgICAgIC8vIHdoZXJlIHNjcm9sbCBzdGFydHMgICAgICAgICAgICAgICAgICAgIChweClcbiAgbGV0IHN0b3AgICAgICAgICAgICAvLyB3aGVyZSBzY3JvbGwgc3RvcHMgICAgICAgICAgICAgICAgICAgICAocHgpXG5cbiAgbGV0IG9mZnNldCAgICAgICAgICAvLyBhZGp1c3RtZW50IGZyb20gdGhlIHN0b3AgcG9zaXRpb24gICAgICAocHgpXG4gIGxldCBlYXNpbmcgICAgICAgICAgLy8gZWFzaW5nIGZ1bmN0aW9uICAgICAgICAgICAgICAgICAgICAgICAgKGZ1bmN0aW9uKVxuICBsZXQgYTExeSAgICAgICAgICAgIC8vIGFjY2Vzc2liaWxpdHkgc3VwcG9ydCBmbGFnICAgICAgICAgICAgIChib29sZWFuKVxuXG4gIGxldCBkaXN0YW5jZSAgICAgICAgLy8gZGlzdGFuY2Ugb2Ygc2Nyb2xsICAgICAgICAgICAgICAgICAgICAgKHB4KVxuICBsZXQgZHVyYXRpb24gICAgICAgIC8vIHNjcm9sbCBkdXJhdGlvbiAgICAgICAgICAgICAgICAgICAgICAgIChtcylcblxuICBsZXQgdGltZVN0YXJ0ICAgICAgIC8vIHRpbWUgc2Nyb2xsIHN0YXJ0ZWQgICAgICAgICAgICAgICAgICAgIChtcylcbiAgbGV0IHRpbWVFbGFwc2VkICAgICAvLyB0aW1lIHNwZW50IHNjcm9sbGluZyB0aHVzIGZhciAgICAgICAgICAobXMpXG5cbiAgbGV0IG5leHQgICAgICAgICAgICAvLyBuZXh0IHNjcm9sbCBwb3NpdGlvbiAgICAgICAgICAgICAgICAgICAocHgpXG5cbiAgbGV0IGNhbGxiYWNrICAgICAgICAvLyB0byBjYWxsIHdoZW4gZG9uZSBzY3JvbGxpbmcgICAgICAgICAgICAoZnVuY3Rpb24pXG5cbiAgLy8gc2Nyb2xsIHBvc2l0aW9uIGhlbHBlclxuXG4gIGZ1bmN0aW9uIGxvY2F0aW9uICgpIHtcbiAgICByZXR1cm4gd2luZG93LnNjcm9sbFkgfHwgd2luZG93LnBhZ2VZT2Zmc2V0XG4gIH1cblxuICAvLyBlbGVtZW50IG9mZnNldCBoZWxwZXJcblxuICBmdW5jdGlvbiB0b3AgKGVsZW1lbnQpIHtcbiAgICByZXR1cm4gZWxlbWVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS50b3AgKyBzdGFydFxuICB9XG5cbiAgLy8gckFGIGxvb3AgaGVscGVyXG5cbiAgZnVuY3Rpb24gbG9vcCAodGltZUN1cnJlbnQpIHtcbiAgICAvLyBzdG9yZSB0aW1lIHNjcm9sbCBzdGFydGVkLCBpZiBub3Qgc3RhcnRlZCBhbHJlYWR5XG4gICAgaWYgKCF0aW1lU3RhcnQpIHtcbiAgICAgIHRpbWVTdGFydCA9IHRpbWVDdXJyZW50XG4gICAgfVxuXG4gICAgLy8gZGV0ZXJtaW5lIHRpbWUgc3BlbnQgc2Nyb2xsaW5nIHNvIGZhclxuICAgIHRpbWVFbGFwc2VkID0gdGltZUN1cnJlbnQgLSB0aW1lU3RhcnRcblxuICAgIC8vIGNhbGN1bGF0ZSBuZXh0IHNjcm9sbCBwb3NpdGlvblxuICAgIG5leHQgPSBlYXNpbmcodGltZUVsYXBzZWQsIHN0YXJ0LCBkaXN0YW5jZSwgZHVyYXRpb24pXG5cbiAgICAvLyBzY3JvbGwgdG8gaXRcbiAgICB3aW5kb3cuc2Nyb2xsVG8oMCwgbmV4dClcblxuICAgIC8vIGNoZWNrIHByb2dyZXNzXG4gICAgdGltZUVsYXBzZWQgPCBkdXJhdGlvblxuICAgICAgPyB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lKGxvb3ApICAgICAgIC8vIGNvbnRpbnVlIHNjcm9sbCBsb29wXG4gICAgICA6IGRvbmUoKSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gc2Nyb2xsaW5nIGlzIGRvbmVcbiAgfVxuXG4gIC8vIHNjcm9sbCBmaW5pc2hlZCBoZWxwZXJcblxuICBmdW5jdGlvbiBkb25lICgpIHtcbiAgICAvLyBhY2NvdW50IGZvciByQUYgdGltZSByb3VuZGluZyBpbmFjY3VyYWNpZXNcbiAgICB3aW5kb3cuc2Nyb2xsVG8oMCwgc3RhcnQgKyBkaXN0YW5jZSlcblxuICAgIC8vIGlmIHNjcm9sbGluZyB0byBhbiBlbGVtZW50LCBhbmQgYWNjZXNzaWJpbGl0eSBpcyBlbmFibGVkXG4gICAgaWYgKGVsZW1lbnQgJiYgYTExeSkge1xuICAgICAgLy8gYWRkIHRhYmluZGV4IGluZGljYXRpbmcgcHJvZ3JhbW1hdGljIGZvY3VzXG4gICAgICBlbGVtZW50LnNldEF0dHJpYnV0ZSgndGFiaW5kZXgnLCAnLTEnKVxuXG4gICAgICAvLyBmb2N1cyB0aGUgZWxlbWVudFxuICAgICAgZWxlbWVudC5mb2N1cygpXG4gICAgfVxuXG4gICAgLy8gaWYgaXQgZXhpc3RzLCBmaXJlIHRoZSBjYWxsYmFja1xuICAgIGlmICh0eXBlb2YgY2FsbGJhY2sgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIGNhbGxiYWNrKClcbiAgICB9XG5cbiAgICAvLyByZXNldCB0aW1lIGZvciBuZXh0IGp1bXBcbiAgICB0aW1lU3RhcnQgPSBmYWxzZVxuICB9XG5cbiAgLy8gQVBJXG5cbiAgZnVuY3Rpb24ganVtcCAodGFyZ2V0LCBvcHRpb25zID0ge30pIHtcbiAgICAvLyByZXNvbHZlIG9wdGlvbnMsIG9yIHVzZSBkZWZhdWx0c1xuICAgIGR1cmF0aW9uID0gb3B0aW9ucy5kdXJhdGlvbiB8fCAxMDAwXG4gICAgb2Zmc2V0ID0gb3B0aW9ucy5vZmZzZXQgfHwgMFxuICAgIGNhbGxiYWNrID0gb3B0aW9ucy5jYWxsYmFjayAgICAgICAgICAgICAgICAgICAgICAgLy8gXCJ1bmRlZmluZWRcIiBpcyBhIHN1aXRhYmxlIGRlZmF1bHQsIGFuZCB3b24ndCBiZSBjYWxsZWRcbiAgICBlYXNpbmcgPSBvcHRpb25zLmVhc2luZyB8fCBlYXNlSW5PdXRRdWFkXG4gICAgYTExeSA9IG9wdGlvbnMuYTExeSB8fCBmYWxzZVxuXG4gICAgLy8gY2FjaGUgc3RhcnRpbmcgcG9zaXRpb25cbiAgICBzdGFydCA9IGxvY2F0aW9uKClcblxuICAgIC8vIHJlc29sdmUgdGFyZ2V0XG4gICAgc3dpdGNoICh0eXBlb2YgdGFyZ2V0KSB7XG4gICAgICAvLyBzY3JvbGwgZnJvbSBjdXJyZW50IHBvc2l0aW9uXG4gICAgICBjYXNlICdudW1iZXInOlxuICAgICAgICBlbGVtZW50ID0gdW5kZWZpbmVkICAgICAgICAgICAvLyBubyBlbGVtZW50IHRvIHNjcm9sbCB0b1xuICAgICAgICBhMTF5ID0gZmFsc2UgICAgICAgICAgICAgICAgICAvLyBtYWtlIHN1cmUgYWNjZXNzaWJpbGl0eSBpcyBvZmZcbiAgICAgICAgc3RvcCA9IHN0YXJ0ICsgdGFyZ2V0XG4gICAgICAgIGJyZWFrXG5cbiAgICAgIC8vIHNjcm9sbCB0byBlbGVtZW50IChub2RlKVxuICAgICAgLy8gYm91bmRpbmcgcmVjdCBpcyByZWxhdGl2ZSB0byB0aGUgdmlld3BvcnRcbiAgICAgIGNhc2UgJ29iamVjdCc6XG4gICAgICAgIGVsZW1lbnQgPSB0YXJnZXRcbiAgICAgICAgc3RvcCA9IHRvcChlbGVtZW50KVxuICAgICAgICBicmVha1xuXG4gICAgICAvLyBzY3JvbGwgdG8gZWxlbWVudCAoc2VsZWN0b3IpXG4gICAgICAvLyBib3VuZGluZyByZWN0IGlzIHJlbGF0aXZlIHRvIHRoZSB2aWV3cG9ydFxuICAgICAgY2FzZSAnc3RyaW5nJzpcbiAgICAgICAgZWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IodGFyZ2V0KVxuICAgICAgICBzdG9wID0gdG9wKGVsZW1lbnQpXG4gICAgICAgIGJyZWFrXG4gICAgfVxuXG4gICAgLy8gcmVzb2x2ZSBzY3JvbGwgZGlzdGFuY2UsIGFjY291bnRpbmcgZm9yIG9mZnNldFxuICAgIGRpc3RhbmNlID0gc3RvcCAtIHN0YXJ0ICsgb2Zmc2V0XG5cbiAgICAvLyByZXNvbHZlIGR1cmF0aW9uXG4gICAgc3dpdGNoICh0eXBlb2Ygb3B0aW9ucy5kdXJhdGlvbikge1xuICAgICAgLy8gbnVtYmVyIGluIG1zXG4gICAgICBjYXNlICdudW1iZXInOlxuICAgICAgICBkdXJhdGlvbiA9IG9wdGlvbnMuZHVyYXRpb25cbiAgICAgICAgYnJlYWtcblxuICAgICAgLy8gZnVuY3Rpb24gcGFzc2VkIHRoZSBkaXN0YW5jZSBvZiB0aGUgc2Nyb2xsXG4gICAgICBjYXNlICdmdW5jdGlvbic6XG4gICAgICAgIGR1cmF0aW9uID0gb3B0aW9ucy5kdXJhdGlvbihkaXN0YW5jZSlcbiAgICAgICAgYnJlYWtcbiAgICB9XG5cbiAgICAvLyBzdGFydCB0aGUgbG9vcFxuICAgIHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUobG9vcClcbiAgfVxuXG4gIC8vIGV4cG9zZSBvbmx5IHRoZSBqdW1wIG1ldGhvZFxuICByZXR1cm4ganVtcFxufVxuXG4vLyBleHBvcnQgc2luZ2xldG9uXG5cbmNvbnN0IHNpbmdsZXRvbiA9IGp1bXBlcigpXG5cbmV4cG9ydCBkZWZhdWx0IHNpbmdsZXRvblxuIiwiaW1wb3J0IHsgQmFzZSwgVmlldyB9IGZyb20gXCIuL2FzXCI7XHJcblxyXG5jbGFzcyBVdGlscyBleHRlbmRzIEJhc2Uge1xyXG5cdHN0YXRpYyBxdWVyeShiYXNlLCBzZWxlY3Rvcikge1xyXG5cdFx0cmV0dXJuIEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKChzZWxlY3RvciAmJiBiYXNlID8gYmFzZSA6IGRvY3VtZW50KS5xdWVyeVNlbGVjdG9yQWxsKHNlbGVjdG9yID8gc2VsZWN0b3IgOiBiYXNlKSk7XHJcblx0fVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBVdGlscztcclxuIiwiLy8gaW1wb3J0ICdiYWJlbC1wb2x5ZmlsbCc7XHJcbi8vIGltcG9ydCAnd2hhdHdnLWZldGNoJztcclxuXHJcbmltcG9ydCB7IFZpZXcgfSBmcm9tICcuL2xpYnMvYXMnO1xyXG5pbXBvcnQgVXRpbHMgZnJvbSAnLi9saWJzL3V0aWxzJztcclxuaW1wb3J0IEhlYWRlciBmcm9tICcuL2NvbXBvbmVudHMvaGVhZGVyJztcclxuXHJcbmNsYXNzIEFwcCBleHRlbmRzIFZpZXcge1xyXG5cdGNvbnN0cnVjdG9yKGVsKSB7XHJcblx0XHRzdXBlcihlbCk7XHJcblx0XHRIZWFkZXIuaW5pdCgpO1xyXG5cdH1cclxufVxyXG5cclxud2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ2xvYWQnLCAoKSA9PiB7XHJcblx0bmV3IEFwcChkb2N1bWVudC5ib2R5KTtcclxufSk7Il19
