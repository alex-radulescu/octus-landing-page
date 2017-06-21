(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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

var DemoForm = function (_View) {
	_inherits(DemoForm, _View);

	function DemoForm(el) {
		_classCallCheck(this, DemoForm);

		var _this = _possibleConstructorReturn(this, (DemoForm.__proto__ || Object.getPrototypeOf(DemoForm)).call(this, el));

		_this.addListener("submit", _this.submitForm.bind(_this));
		return _this;
	}

	_createClass(DemoForm, [{
		key: 'submitForm',
		value: function submitForm(event) {
			event.preventDefault(); // we are submitting via xhr below
			var data = {
				email: this.el.querySelector(".input-field").value
			}; // get the values submitted in the form

			var url = event.target.action; //
			var xhr = new XMLHttpRequest();
			xhr.open('POST', url);
			xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
			xhr.onreadystatechange = function () {
				console.log(xhr.status, xhr.statusText);
				console.log(xhr.responseText);
				alert("Thank you");
				this.el.querySelector(".input-field").value = "";
				return;
			};
			// url encode form data for sending as post data
			var encoded = Object.keys(data).map(function (k) {
				return encodeURIComponent(k) + '=' + encodeURIComponent(data[k]);
			}).join('&');
			xhr.send(encoded);
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

},{"../libs/as":4,"../libs/utils":8}],2:[function(require,module,exports){
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
		_this.addListener("click", ".menu-toggle", _this.toggleMobileMenu.bind(_this));
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
			(0, _jump2.default)(e.target.getAttribute("href"));
		}
	}, {
		key: 'toggleMobileMenu',
		value: function toggleMobileMenu() {
			this.el.classList.toggle("is-menu-open");
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

},{"../libs/as":4,"../libs/jump":7,"../libs/utils":8}],3:[function(require,module,exports){
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

},{}],4:[function(require,module,exports){
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

},{"./base":3,"./view":5}],5:[function(require,module,exports){
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

},{"./base":3}],6:[function(require,module,exports){
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

},{}],7:[function(require,module,exports){
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

},{"./easing":6}],8:[function(require,module,exports){
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

},{"./as":4}],9:[function(require,module,exports){
'use strict';

var _as = require('./libs/as');

var _utils = require('./libs/utils');

var _utils2 = _interopRequireDefault(_utils);

var _header = require('./components/header');

var _header2 = _interopRequireDefault(_header);

var _demoForm = require('./components/demo-form');

var _demoForm2 = _interopRequireDefault(_demoForm);

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
		_demoForm2.default.init();
		return _this;
	}

	return App;
}(_as.View);

window.addEventListener('load', function () {
	new App(document.body);
});

},{"./components/demo-form":1,"./components/header":2,"./libs/as":4,"./libs/utils":8}]},{},[9])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvc2NyaXB0cy9jb21wb25lbnRzL2RlbW8tZm9ybS5qcyIsInNyYy9zY3JpcHRzL2NvbXBvbmVudHMvaGVhZGVyLmpzIiwic3JjL3NjcmlwdHMvbGlicy9hcy9iYXNlLmpzIiwic3JjL3NjcmlwdHMvbGlicy9hcy9pbmRleC5qcyIsInNyYy9zY3JpcHRzL2xpYnMvYXMvdmlldy5qcyIsInNyYy9zY3JpcHRzL2xpYnMvZWFzaW5nLmpzIiwic3JjL3NjcmlwdHMvbGlicy9qdW1wLmpzIiwic3JjL3NjcmlwdHMvbGlicy91dGlscy5qcyIsInNyYy9zY3JpcHRzL3NjcmlwdC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7O0FDQUM7O0FBQ0Q7Ozs7Ozs7Ozs7OztJQUVNLFE7OztBQUNMLG1CQUFZLEVBQVosRUFBZ0I7QUFBQTs7QUFBQSxrSEFDVCxFQURTOztBQUdmLFFBQUssV0FBTCxDQUFpQixRQUFqQixFQUEyQixNQUFLLFVBQUwsQ0FBZ0IsSUFBaEIsT0FBM0I7QUFIZTtBQUlmOzs7OzZCQUVVLEssRUFBTztBQUNqQixTQUFNLGNBQU4sR0FEaUIsQ0FDaUI7QUFDbEMsT0FBTSxPQUFPO0FBQ1osV0FBTyxLQUFLLEVBQUwsQ0FBUSxhQUFSLENBQXNCLGNBQXRCLEVBQXNDO0FBRGpDLElBQWIsQ0FGaUIsQ0FJTjs7QUFFWCxPQUFNLE1BQU0sTUFBTSxNQUFOLENBQWEsTUFBekIsQ0FOaUIsQ0FNaUI7QUFDbEMsT0FBSSxNQUFNLElBQUksY0FBSixFQUFWO0FBQ0EsT0FBSSxJQUFKLENBQVMsTUFBVCxFQUFpQixHQUFqQjtBQUNBLE9BQUksZ0JBQUosQ0FBcUIsY0FBckIsRUFBcUMsbUNBQXJDO0FBQ0EsT0FBSSxrQkFBSixHQUF5QixZQUFXO0FBQ25DLFlBQVEsR0FBUixDQUFZLElBQUksTUFBaEIsRUFBd0IsSUFB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LEdBQW1CLElBQW5CLEdBQTBCLFFBQTNCLEVBQXFDLGdCQUFyQyxDQUFzRCxXQUFXLFFBQVgsR0FBc0IsSUFBNUUsQ0FBM0IsQ0FBUDtBQUNBOzs7Ozs7a0JBR2EsSzs7Ozs7QUNMZjs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7Ozs7Ozs7K2VBTkE7QUFDQTs7SUFPTSxHOzs7QUFDTCxjQUFZLEVBQVosRUFBZ0I7QUFBQTs7QUFBQSx3R0FDVCxFQURTOztBQUVmLG1CQUFPLElBQVA7QUFDQSxxQkFBUyxJQUFUO0FBSGU7QUFJZjs7Ozs7QUFHRixPQUFPLGdCQUFQLENBQXdCLE1BQXhCLEVBQWdDLFlBQU07QUFDckMsS0FBSSxHQUFKLENBQVEsU0FBUyxJQUFqQjtBQUNBLENBRkQiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwi77u/aW1wb3J0IHsgVmlldyB9IGZyb20gJy4uL2xpYnMvYXMnO1xyXG5pbXBvcnQgVXRpbHMgZnJvbSAnLi4vbGlicy91dGlscyc7XHJcblxyXG5jbGFzcyBEZW1vRm9ybSBleHRlbmRzIFZpZXcge1xyXG5cdGNvbnN0cnVjdG9yKGVsKSB7XHJcblx0XHRzdXBlcihlbCk7XHJcblxyXG5cdFx0dGhpcy5hZGRMaXN0ZW5lcihcInN1Ym1pdFwiLCB0aGlzLnN1Ym1pdEZvcm0uYmluZCh0aGlzKSk7XHJcblx0fVxyXG5cclxuXHRzdWJtaXRGb3JtKGV2ZW50KSB7XHJcblx0XHRldmVudC5wcmV2ZW50RGVmYXVsdCgpOyAgICAgICAgICAgLy8gd2UgYXJlIHN1Ym1pdHRpbmcgdmlhIHhociBiZWxvd1xyXG5cdFx0Y29uc3QgZGF0YSA9IHtcclxuXHRcdFx0ZW1haWw6IHRoaXMuZWwucXVlcnlTZWxlY3RvcihcIi5pbnB1dC1maWVsZFwiKS52YWx1ZVxyXG5cdFx0fTsgICAgICAgICAvLyBnZXQgdGhlIHZhbHVlcyBzdWJtaXR0ZWQgaW4gdGhlIGZvcm1cclxuXHRcdFxyXG5cdFx0Y29uc3QgdXJsID0gZXZlbnQudGFyZ2V0LmFjdGlvbjsgIC8vXHJcblx0XHR2YXIgeGhyID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XHJcblx0XHR4aHIub3BlbignUE9TVCcsIHVybCk7XHJcblx0XHR4aHIuc2V0UmVxdWVzdEhlYWRlcignQ29udGVudC1UeXBlJywgJ2FwcGxpY2F0aW9uL3gtd3d3LWZvcm0tdXJsZW5jb2RlZCcpO1xyXG5cdFx0eGhyLm9ucmVhZHlzdGF0ZWNoYW5nZSA9IGZ1bmN0aW9uKCkge1xyXG5cdFx0XHRjb25zb2xlLmxvZyh4aHIuc3RhdHVzLCB4aHIuc3RhdHVzVGV4dCk7XHJcblx0XHRcdGNvbnNvbGUubG9nKHhoci5yZXNwb25zZVRleHQpO1xyXG5cdFx0XHRhbGVydChcIlRoYW5rIHlvdVwiKTtcclxuXHRcdFx0dGhpcy5lbC5xdWVyeVNlbGVjdG9yKFwiLmlucHV0LWZpZWxkXCIpLnZhbHVlID0gXCJcIjtcclxuXHRcdFx0cmV0dXJuO1xyXG5cdFx0fTtcclxuXHRcdC8vIHVybCBlbmNvZGUgZm9ybSBkYXRhIGZvciBzZW5kaW5nIGFzIHBvc3QgZGF0YVxyXG5cdFx0dmFyIGVuY29kZWQgPSBPYmplY3Qua2V5cyhkYXRhKS5tYXAoZnVuY3Rpb24oaykge1xyXG5cdFx0XHRyZXR1cm4gZW5jb2RlVVJJQ29tcG9uZW50KGspICsgJz0nICsgZW5jb2RlVVJJQ29tcG9uZW50KGRhdGFba10pXHJcblx0XHR9KS5qb2luKCcmJylcclxuXHRcdHhoci5zZW5kKGVuY29kZWQpO1xyXG5cdH1cclxuXHJcblx0c3RhdGljIGluaXQoc2VsZWN0b3IgPSBcIi5nZXQtZGVtby1mb3JtXCIsIGJhc2UgPSBkb2N1bWVudC5ib2R5KSB7XHJcblx0XHRVdGlscy5xdWVyeShiYXNlLCBzZWxlY3RvcikuZm9yRWFjaChlbGVtZW50ID0+IHtcdFxyXG5cdFx0XHRuZXcgRGVtb0Zvcm0oZWxlbWVudCk7XHJcblx0XHR9KTtcclxuXHR9XHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBEZW1vRm9ybTsiLCLvu79pbXBvcnQgeyBWaWV3IH0gZnJvbSAnLi4vbGlicy9hcyc7XHJcbmltcG9ydCBVdGlscyBmcm9tICcuLi9saWJzL3V0aWxzJztcclxuaW1wb3J0IGp1bXAgZnJvbSAnLi4vbGlicy9qdW1wJztcclxuXHJcbmNsYXNzIEhlYWRlciBleHRlbmRzIFZpZXcge1xyXG5cdGNvbnN0cnVjdG9yKGVsKSB7XHJcblx0XHRzdXBlcihlbCk7XHJcblxyXG5cdFx0Y29uc3Qgc2VjdGlvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIuc2VjdGlvblwiKTtcclxuXHRcdHRoaXMuc2VjdGlvbnMgPSB7fTtcclxuXHJcblx0XHRBcnJheS5wcm90b3R5cGUuZm9yRWFjaC5jYWxsKHNlY3Rpb24sIGUgPT4ge1xyXG5cdFx0XHR0aGlzLnNlY3Rpb25zW2UuaWRdID0gZS5vZmZzZXRUb3A7XHJcblx0XHR9KTtcclxuXHJcblx0XHR0aGlzLm9uV2luZG93U2Nyb2xsKCk7XHJcblx0XHR0aGlzLmFkZExpc3RlbmVyKFwiY2xpY2tcIiwgXCIubWVudS10b2dnbGVcIiwgdGhpcy50b2dnbGVNb2JpbGVNZW51LmJpbmQodGhpcykpO1xyXG5cdFx0dGhpcy5hZGRMaXN0ZW5lcihcInNjcm9sbFwiLCBkb2N1bWVudCwgdGhpcy5vbldpbmRvd1Njcm9sbC5iaW5kKHRoaXMpKTtcclxuXHRcdHRoaXMuYWRkTGlzdGVuZXIoXCJjbGlja1wiLCBcIi5tYWluLW5hdmlnYXRpb24tbGlua1wiLCB0aGlzLm5hdmlnYXRlLmJpbmQodGhpcykpO1xyXG5cdH1cclxuXHJcblx0b25XaW5kb3dTY3JvbGwoKSB7XHJcblx0XHRpZih3aW5kb3cucGFnZVlPZmZzZXQgPiB3aW5kb3cuaW5uZXJIZWlnaHQvMikge1xyXG5cdFx0XHR0aGlzLmVsLmNsYXNzTGlzdC5yZW1vdmUoXCJpcy1pbnZpc2libGVcIik7XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHR0aGlzLmVsLmNsYXNzTGlzdC5hZGQoXCJpcy1pbnZpc2libGVcIilcclxuXHRcdH1cclxuXHJcblx0XHRjb25zdCBzY3JvbGxQb3NpdGlvbiA9IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5zY3JvbGxUb3AgfHwgZG9jdW1lbnQuYm9keS5zY3JvbGxUb3A7XHJcblxyXG5cdFx0bGV0IGkgPSAwO1xyXG5cdFx0Zm9yIChpIGluIHRoaXMuc2VjdGlvbnMpIHtcclxuXHRcdFx0aWYgKHRoaXMuc2VjdGlvbnNbaV0gPD0gc2Nyb2xsUG9zaXRpb24pIHtcclxuXHRcdFx0XHRpZiAoZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm1haW4tbmF2aWdhdGlvbi1saW5rLmlzLWFjdGl2ZScpKSB7XHJcblx0XHRcdFx0XHRkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubWFpbi1uYXZpZ2F0aW9uLWxpbmsuaXMtYWN0aXZlJykuY2xhc3NMaXN0LnJlbW92ZShcImlzLWFjdGl2ZVwiKTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdFx0aWYoZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm1haW4tbmF2aWdhdGlvbi1saW5rW2hyZWYqPScgKyBpICsgJ10nKSkge1xyXG5cdFx0XHRcdFx0ZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm1haW4tbmF2aWdhdGlvbi1saW5rW2hyZWYqPScgKyBpICsgJ10nKS5jbGFzc0xpc3QuYWRkKCdpcy1hY3RpdmUnKTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdG5hdmlnYXRlKGUpIHtcclxuXHRcdGUucHJldmVudERlZmF1bHQoKTtcclxuXHRcdGp1bXAoZS50YXJnZXQuZ2V0QXR0cmlidXRlKFwiaHJlZlwiKSk7XHJcblx0fVxyXG5cclxuXHR0b2dnbGVNb2JpbGVNZW51KCkge1xyXG5cdFx0dGhpcy5lbC5jbGFzc0xpc3QudG9nZ2xlKFwiaXMtbWVudS1vcGVuXCIpO1xyXG5cdH1cclxuXHJcblx0c3RhdGljIGluaXQoc2VsZWN0b3IgPSBcIi5oZWFkZXJcIiwgYmFzZSA9IGRvY3VtZW50LmJvZHkpIHtcclxuXHRcdFV0aWxzLnF1ZXJ5KGJhc2UsIHNlbGVjdG9yKS5mb3JFYWNoKGVsZW1lbnQgPT4ge1x0XHJcblx0XHRcdG5ldyBIZWFkZXIoZWxlbWVudCk7XHJcblx0XHR9KTtcclxuXHR9XHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBIZWFkZXI7IiwiY2xhc3MgQmFzZSB7XHJcblx0Y29uc3RydWN0b3IoKSB7XHJcblx0XHR0aGlzLmxpc3RlbmVycyA9IHt9O1xyXG5cdH1cclxuXHJcblx0c3Vic2NyaWJlKGV2ZW50TmFtZSwgbGlzdGVuZXIsIGNvbnRleHQpIHtcclxuXHRcdCh0aGlzLmxpc3RlbmVyc1tldmVudE5hbWVdID0gdGhpcy5saXN0ZW5lcnNbZXZlbnROYW1lXSB8fCBbXSkucHVzaCh7XHJcblx0XHRcdGZ1bmM6IGxpc3RlbmVyLFxyXG5cdFx0XHRjb250ZXh0OiBjb250ZXh0XHJcblx0XHR9KTtcclxuXHR9XHJcblxyXG5cdGVtaXQoZXZlbnROYW1lLCAuLi5hcmcpIHtcclxuXHRcdGZvcihsZXQgbGlzdGVuZXIgb2YgKHRoaXMubGlzdGVuZXJzW2V2ZW50TmFtZV0gfHwgW10pKSB7XHJcblx0XHRcdGxpc3RlbmVyLmZ1bmMuYXBwbHkobGlzdGVuZXIuY29udGV4dCwgYXJnKTtcclxuXHRcdH1cclxuXHR9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IEJhc2U7XHJcbiIsImltcG9ydCBCYXNlIGZyb20gJy4vYmFzZSc7XHJcbmltcG9ydCBWaWV3IGZyb20gJy4vdmlldyc7XHJcblxyXG5leHBvcnQgeyBkZWZhdWx0IGFzIEJhc2V9IGZyb20gJy4vYmFzZSc7XHJcbmV4cG9ydCB7IGRlZmF1bHQgYXMgVmlld30gZnJvbSAnLi92aWV3JztcclxuXHJcbmV4cG9ydCBkZWZhdWx0IHtcclxuICBCYXNlLFxyXG4gIFZpZXdcclxufTtcclxuIiwiaW1wb3J0IEJhc2UgZnJvbSAnLi9iYXNlJztcclxuXHJcbmNsYXNzIFZpZXcgZXh0ZW5kcyBCYXNlIHtcclxuXHRjb25zdHJ1Y3RvciguLi5hcmdzKSB7XHJcblx0XHRzdXBlcigpO1xyXG5cdFx0aWYoYXJnc1swXS5jb25zdHJ1Y3RvciA9PT0gQXJyYXkpIHsgYXJncyA9IGFyZ3NbMF07IH1cclxuXHRcdHRoaXMuZWwgPSB0eXBlb2YoYXJnc1swXSk9PT1cInN0cmluZ1wiID8gdGhpcy5tYWtlRWxlbWVudC5hcHBseSh0aGlzLCBhcmd1bWVudHMpIDogYXJnc1swXTtcclxuXHR9XHJcblxyXG5cdHF1ZXJ5KHF1ZXJ5KSB7XHJcblx0XHRyZXR1cm4gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwodGhpcy5lbC5xdWVyeVNlbGVjdG9yQWxsKHF1ZXJ5KSk7XHJcblx0fVxyXG5cclxuXHRhZGRMaXN0ZW5lcih0eXBlLCBtYXRjaCwgbWV0aG9kKSB7XHJcblx0XHRpZih0eXBlLnNwbGl0KFwiIFwiKS5sZW5ndGggPiAxKSB7XHJcblx0XHRcdHR5cGUuc3BsaXQoXCIgXCIpLmZvckVhY2godCA9PiB0aGlzLmFkZExpc3RlbmVyKHQsIG1hdGNoLCBtZXRob2QpKTtcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdGxldCBlbGVtID0gdGhpcy5lbDtcclxuXHRcdFx0aWYodHlwZW9mKG1hdGNoKSA9PT0gXCJmdW5jdGlvblwiKSB7XHJcblx0XHRcdFx0bWV0aG9kID0gbWF0Y2g7XHJcblx0XHRcdFx0bWF0Y2ggPSBudWxsO1xyXG5cdFx0XHR9IGVsc2UgaWYobWF0Y2ggPT09IGRvY3VtZW50IHx8IG1hdGNoID09IHdpbmRvdyApIHtcclxuXHRcdFx0XHRlbGVtID0gbWF0Y2g7XHJcblx0XHRcdFx0bWF0Y2ggPSBudWxsO1xyXG5cdFx0XHR9IGVsc2UgaWYgKG1hdGNoID09PSAnYm9keScpIHtcclxuXHRcdFx0XHRlbGVtID0gZG9jdW1lbnQuYm9keTtcclxuXHRcdFx0XHRtYXRjaCA9IG51bGw7XHJcblx0XHRcdH1cclxuXHRcdFx0ZWxlbS5hZGRFdmVudExpc3RlbmVyKHR5cGUsIGUgPT4ge1xyXG5cdFx0XHRcdGlmICghbWF0Y2gpIHJldHVybiBtZXRob2QoZSk7XHJcblx0XHRcdFx0dmFyIGN1cnJlbnQgPSBlLnRhcmdldDtcclxuXHRcdFx0XHR3aGlsZSAoY3VycmVudC5wYXJlbnROb2RlKSB7XHJcblx0XHRcdFx0XHQvLyBJRTExIGlzIHdlaXJkLCBoYXMgaW1wbGVtZW50ZWQgdGhpcyBhcyBtc01hdGNoZXNTZWxlY3Rvci4uLlxyXG5cdFx0XHRcdFx0aWYgKChjdXJyZW50Lm1hdGNoZXMgfHwgY3VycmVudC5tc01hdGNoZXNTZWxlY3RvcikuY2FsbChjdXJyZW50LCBtYXRjaCkpIHtcclxuXHRcdFx0XHRcdFx0bWV0aG9kKGUsIGN1cnJlbnQpO1xyXG5cdFx0XHRcdFx0XHRicmVhaztcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdGN1cnJlbnQgPSBjdXJyZW50LnBhcmVudE5vZGU7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9KTtcclxuXHRcdH1cclxuXHR9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IFZpZXc7XHJcbiIsIi8vIFJvYmVydCBQZW5uZXIncyBlYXNlSW5PdXRRdWFkXG5cbi8vIGZpbmQgdGhlIHJlc3Qgb2YgaGlzIGVhc2luZyBmdW5jdGlvbnMgaGVyZTogaHR0cDovL3JvYmVydHBlbm5lci5jb20vZWFzaW5nL1xuLy8gZmluZCB0aGVtIGV4cG9ydGVkIGZvciBFUzYgY29uc3VtcHRpb24gaGVyZTogaHR0cHM6Ly9naXRodWIuY29tL2pheGdlbGxlci9lei5qc1xuXG5jb25zdCBlYXNlSW5PdXRRdWFkID0gKHQsIGIsIGMsIGQpID0+IHtcbiAgdCAvPSBkIC8gMlxuICBpZiAodCA8IDEpIHJldHVybiBjIC8gMiAqIHQgKiB0ICsgYlxuICB0LS1cbiAgcmV0dXJuIC1jIC8gMiAqICh0ICogKHQgLSAyKSAtIDEpICsgYlxufVxuXG5leHBvcnQgZGVmYXVsdCBlYXNlSW5PdXRRdWFkXG4iLCJpbXBvcnQgZWFzZUluT3V0UXVhZCBmcm9tICcuL2Vhc2luZydcblxuY29uc3QganVtcGVyID0gKCkgPT4ge1xuICAvLyBwcml2YXRlIHZhcmlhYmxlIGNhY2hlXG4gIC8vIG5vIHZhcmlhYmxlcyBhcmUgY3JlYXRlZCBkdXJpbmcgYSBqdW1wLCBwcmV2ZW50aW5nIG1lbW9yeSBsZWFrc1xuXG4gIGxldCBlbGVtZW50ICAgICAgICAgLy8gZWxlbWVudCB0byBzY3JvbGwgdG8gICAgICAgICAgICAgICAgICAgKG5vZGUpXG5cbiAgbGV0IHN0YXJ0ICAgICAgICAgICAvLyB3aGVyZSBzY3JvbGwgc3RhcnRzICAgICAgICAgICAgICAgICAgICAocHgpXG4gIGxldCBzdG9wICAgICAgICAgICAgLy8gd2hlcmUgc2Nyb2xsIHN0b3BzICAgICAgICAgICAgICAgICAgICAgKHB4KVxuXG4gIGxldCBvZmZzZXQgICAgICAgICAgLy8gYWRqdXN0bWVudCBmcm9tIHRoZSBzdG9wIHBvc2l0aW9uICAgICAgKHB4KVxuICBsZXQgZWFzaW5nICAgICAgICAgIC8vIGVhc2luZyBmdW5jdGlvbiAgICAgICAgICAgICAgICAgICAgICAgIChmdW5jdGlvbilcbiAgbGV0IGExMXkgICAgICAgICAgICAvLyBhY2Nlc3NpYmlsaXR5IHN1cHBvcnQgZmxhZyAgICAgICAgICAgICAoYm9vbGVhbilcblxuICBsZXQgZGlzdGFuY2UgICAgICAgIC8vIGRpc3RhbmNlIG9mIHNjcm9sbCAgICAgICAgICAgICAgICAgICAgIChweClcbiAgbGV0IGR1cmF0aW9uICAgICAgICAvLyBzY3JvbGwgZHVyYXRpb24gICAgICAgICAgICAgICAgICAgICAgICAobXMpXG5cbiAgbGV0IHRpbWVTdGFydCAgICAgICAvLyB0aW1lIHNjcm9sbCBzdGFydGVkICAgICAgICAgICAgICAgICAgICAobXMpXG4gIGxldCB0aW1lRWxhcHNlZCAgICAgLy8gdGltZSBzcGVudCBzY3JvbGxpbmcgdGh1cyBmYXIgICAgICAgICAgKG1zKVxuXG4gIGxldCBuZXh0ICAgICAgICAgICAgLy8gbmV4dCBzY3JvbGwgcG9zaXRpb24gICAgICAgICAgICAgICAgICAgKHB4KVxuXG4gIGxldCBjYWxsYmFjayAgICAgICAgLy8gdG8gY2FsbCB3aGVuIGRvbmUgc2Nyb2xsaW5nICAgICAgICAgICAgKGZ1bmN0aW9uKVxuXG4gIC8vIHNjcm9sbCBwb3NpdGlvbiBoZWxwZXJcblxuICBmdW5jdGlvbiBsb2NhdGlvbiAoKSB7XG4gICAgcmV0dXJuIHdpbmRvdy5zY3JvbGxZIHx8IHdpbmRvdy5wYWdlWU9mZnNldFxuICB9XG5cbiAgLy8gZWxlbWVudCBvZmZzZXQgaGVscGVyXG5cbiAgZnVuY3Rpb24gdG9wIChlbGVtZW50KSB7XG4gICAgcmV0dXJuIGVsZW1lbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkudG9wICsgc3RhcnRcbiAgfVxuXG4gIC8vIHJBRiBsb29wIGhlbHBlclxuXG4gIGZ1bmN0aW9uIGxvb3AgKHRpbWVDdXJyZW50KSB7XG4gICAgLy8gc3RvcmUgdGltZSBzY3JvbGwgc3RhcnRlZCwgaWYgbm90IHN0YXJ0ZWQgYWxyZWFkeVxuICAgIGlmICghdGltZVN0YXJ0KSB7XG4gICAgICB0aW1lU3RhcnQgPSB0aW1lQ3VycmVudFxuICAgIH1cblxuICAgIC8vIGRldGVybWluZSB0aW1lIHNwZW50IHNjcm9sbGluZyBzbyBmYXJcbiAgICB0aW1lRWxhcHNlZCA9IHRpbWVDdXJyZW50IC0gdGltZVN0YXJ0XG5cbiAgICAvLyBjYWxjdWxhdGUgbmV4dCBzY3JvbGwgcG9zaXRpb25cbiAgICBuZXh0ID0gZWFzaW5nKHRpbWVFbGFwc2VkLCBzdGFydCwgZGlzdGFuY2UsIGR1cmF0aW9uKVxuXG4gICAgLy8gc2Nyb2xsIHRvIGl0XG4gICAgd2luZG93LnNjcm9sbFRvKDAsIG5leHQpXG5cbiAgICAvLyBjaGVjayBwcm9ncmVzc1xuICAgIHRpbWVFbGFwc2VkIDwgZHVyYXRpb25cbiAgICAgID8gd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZShsb29wKSAgICAgICAvLyBjb250aW51ZSBzY3JvbGwgbG9vcFxuICAgICAgOiBkb25lKCkgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIHNjcm9sbGluZyBpcyBkb25lXG4gIH1cblxuICAvLyBzY3JvbGwgZmluaXNoZWQgaGVscGVyXG5cbiAgZnVuY3Rpb24gZG9uZSAoKSB7XG4gICAgLy8gYWNjb3VudCBmb3IgckFGIHRpbWUgcm91bmRpbmcgaW5hY2N1cmFjaWVzXG4gICAgd2luZG93LnNjcm9sbFRvKDAsIHN0YXJ0ICsgZGlzdGFuY2UpXG5cbiAgICAvLyBpZiBzY3JvbGxpbmcgdG8gYW4gZWxlbWVudCwgYW5kIGFjY2Vzc2liaWxpdHkgaXMgZW5hYmxlZFxuICAgIGlmIChlbGVtZW50ICYmIGExMXkpIHtcbiAgICAgIC8vIGFkZCB0YWJpbmRleCBpbmRpY2F0aW5nIHByb2dyYW1tYXRpYyBmb2N1c1xuICAgICAgZWxlbWVudC5zZXRBdHRyaWJ1dGUoJ3RhYmluZGV4JywgJy0xJylcblxuICAgICAgLy8gZm9jdXMgdGhlIGVsZW1lbnRcbiAgICAgIGVsZW1lbnQuZm9jdXMoKVxuICAgIH1cblxuICAgIC8vIGlmIGl0IGV4aXN0cywgZmlyZSB0aGUgY2FsbGJhY2tcbiAgICBpZiAodHlwZW9mIGNhbGxiYWNrID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICBjYWxsYmFjaygpXG4gICAgfVxuXG4gICAgLy8gcmVzZXQgdGltZSBmb3IgbmV4dCBqdW1wXG4gICAgdGltZVN0YXJ0ID0gZmFsc2VcbiAgfVxuXG4gIC8vIEFQSVxuXG4gIGZ1bmN0aW9uIGp1bXAgKHRhcmdldCwgb3B0aW9ucyA9IHt9KSB7XG4gICAgLy8gcmVzb2x2ZSBvcHRpb25zLCBvciB1c2UgZGVmYXVsdHNcbiAgICBkdXJhdGlvbiA9IG9wdGlvbnMuZHVyYXRpb24gfHwgMTAwMFxuICAgIG9mZnNldCA9IG9wdGlvbnMub2Zmc2V0IHx8IDBcbiAgICBjYWxsYmFjayA9IG9wdGlvbnMuY2FsbGJhY2sgICAgICAgICAgICAgICAgICAgICAgIC8vIFwidW5kZWZpbmVkXCIgaXMgYSBzdWl0YWJsZSBkZWZhdWx0LCBhbmQgd29uJ3QgYmUgY2FsbGVkXG4gICAgZWFzaW5nID0gb3B0aW9ucy5lYXNpbmcgfHwgZWFzZUluT3V0UXVhZFxuICAgIGExMXkgPSBvcHRpb25zLmExMXkgfHwgZmFsc2VcblxuICAgIC8vIGNhY2hlIHN0YXJ0aW5nIHBvc2l0aW9uXG4gICAgc3RhcnQgPSBsb2NhdGlvbigpXG5cbiAgICAvLyByZXNvbHZlIHRhcmdldFxuICAgIHN3aXRjaCAodHlwZW9mIHRhcmdldCkge1xuICAgICAgLy8gc2Nyb2xsIGZyb20gY3VycmVudCBwb3NpdGlvblxuICAgICAgY2FzZSAnbnVtYmVyJzpcbiAgICAgICAgZWxlbWVudCA9IHVuZGVmaW5lZCAgICAgICAgICAgLy8gbm8gZWxlbWVudCB0byBzY3JvbGwgdG9cbiAgICAgICAgYTExeSA9IGZhbHNlICAgICAgICAgICAgICAgICAgLy8gbWFrZSBzdXJlIGFjY2Vzc2liaWxpdHkgaXMgb2ZmXG4gICAgICAgIHN0b3AgPSBzdGFydCArIHRhcmdldFxuICAgICAgICBicmVha1xuXG4gICAgICAvLyBzY3JvbGwgdG8gZWxlbWVudCAobm9kZSlcbiAgICAgIC8vIGJvdW5kaW5nIHJlY3QgaXMgcmVsYXRpdmUgdG8gdGhlIHZpZXdwb3J0XG4gICAgICBjYXNlICdvYmplY3QnOlxuICAgICAgICBlbGVtZW50ID0gdGFyZ2V0XG4gICAgICAgIHN0b3AgPSB0b3AoZWxlbWVudClcbiAgICAgICAgYnJlYWtcblxuICAgICAgLy8gc2Nyb2xsIHRvIGVsZW1lbnQgKHNlbGVjdG9yKVxuICAgICAgLy8gYm91bmRpbmcgcmVjdCBpcyByZWxhdGl2ZSB0byB0aGUgdmlld3BvcnRcbiAgICAgIGNhc2UgJ3N0cmluZyc6XG4gICAgICAgIGVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHRhcmdldClcbiAgICAgICAgc3RvcCA9IHRvcChlbGVtZW50KVxuICAgICAgICBicmVha1xuICAgIH1cblxuICAgIC8vIHJlc29sdmUgc2Nyb2xsIGRpc3RhbmNlLCBhY2NvdW50aW5nIGZvciBvZmZzZXRcbiAgICBkaXN0YW5jZSA9IHN0b3AgLSBzdGFydCArIG9mZnNldFxuXG4gICAgLy8gcmVzb2x2ZSBkdXJhdGlvblxuICAgIHN3aXRjaCAodHlwZW9mIG9wdGlvbnMuZHVyYXRpb24pIHtcbiAgICAgIC8vIG51bWJlciBpbiBtc1xuICAgICAgY2FzZSAnbnVtYmVyJzpcbiAgICAgICAgZHVyYXRpb24gPSBvcHRpb25zLmR1cmF0aW9uXG4gICAgICAgIGJyZWFrXG5cbiAgICAgIC8vIGZ1bmN0aW9uIHBhc3NlZCB0aGUgZGlzdGFuY2Ugb2YgdGhlIHNjcm9sbFxuICAgICAgY2FzZSAnZnVuY3Rpb24nOlxuICAgICAgICBkdXJhdGlvbiA9IG9wdGlvbnMuZHVyYXRpb24oZGlzdGFuY2UpXG4gICAgICAgIGJyZWFrXG4gICAgfVxuXG4gICAgLy8gc3RhcnQgdGhlIGxvb3BcbiAgICB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lKGxvb3ApXG4gIH1cblxuICAvLyBleHBvc2Ugb25seSB0aGUganVtcCBtZXRob2RcbiAgcmV0dXJuIGp1bXBcbn1cblxuLy8gZXhwb3J0IHNpbmdsZXRvblxuXG5jb25zdCBzaW5nbGV0b24gPSBqdW1wZXIoKVxuXG5leHBvcnQgZGVmYXVsdCBzaW5nbGV0b25cbiIsImltcG9ydCB7IEJhc2UsIFZpZXcgfSBmcm9tIFwiLi9hc1wiO1xyXG5cclxuY2xhc3MgVXRpbHMgZXh0ZW5kcyBCYXNlIHtcclxuXHRzdGF0aWMgcXVlcnkoYmFzZSwgc2VsZWN0b3IpIHtcclxuXHRcdHJldHVybiBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbCgoc2VsZWN0b3IgJiYgYmFzZSA/IGJhc2UgOiBkb2N1bWVudCkucXVlcnlTZWxlY3RvckFsbChzZWxlY3RvciA/IHNlbGVjdG9yIDogYmFzZSkpO1xyXG5cdH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgVXRpbHM7XHJcbiIsIi8vIGltcG9ydCAnYmFiZWwtcG9seWZpbGwnO1xyXG4vLyBpbXBvcnQgJ3doYXR3Zy1mZXRjaCc7XHJcblxyXG5pbXBvcnQgeyBWaWV3IH0gZnJvbSAnLi9saWJzL2FzJztcclxuaW1wb3J0IFV0aWxzIGZyb20gJy4vbGlicy91dGlscyc7XHJcbmltcG9ydCBIZWFkZXIgZnJvbSAnLi9jb21wb25lbnRzL2hlYWRlcic7XHJcbmltcG9ydCBEZW1vRm9ybSBmcm9tICcuL2NvbXBvbmVudHMvZGVtby1mb3JtJztcclxuXHJcbmNsYXNzIEFwcCBleHRlbmRzIFZpZXcge1xyXG5cdGNvbnN0cnVjdG9yKGVsKSB7XHJcblx0XHRzdXBlcihlbCk7XHJcblx0XHRIZWFkZXIuaW5pdCgpO1xyXG5cdFx0RGVtb0Zvcm0uaW5pdCgpO1xyXG5cdH1cclxufVxyXG5cclxud2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ2xvYWQnLCAoKSA9PiB7XHJcblx0bmV3IEFwcChkb2N1bWVudC5ib2R5KTtcclxufSk7Il19
