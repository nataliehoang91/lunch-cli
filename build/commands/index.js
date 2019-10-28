// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"../configs/index.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.API_KEY = void 0;
const API_KEY = "AIzaSyCccptxVWHp1Mf4BGCC33m1SzgwU14BRD4";
exports.API_KEY = API_KEY;
},{}],"index.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _ink = require("ink");

var _inkTable = _interopRequireDefault(require("ink-table"));

var _axios = _interopRequireDefault(require("axios"));

var _inkTextInput = _interopRequireDefault(require("ink-text-input"));

var _configs = require("../configs");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; if (obj != null) { var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

const requestBody = {
  range: "Sheet1",
  majorDimension: "ROWS",
  values: []
};
var foodID = 1;
var cart = Array(15).fill(""); ///List all Menu for today

const MenuList = ({
  list
}) => {
  const [order, setOrder] = (0, _react.useState)("");
  const [name, setName] = (0, _react.useState)("");
  const [step, setStep] = (0, _react.useState)(0);
  const [listFood, setListFood] = (0, _react.useState)({});
  (0, _react.useEffect)(() => {
    async function fetchData() {
      const response = await (0, _axios.default)("https://sheets.googleapis.com/v4/spreadsheets/1ZjzZKCMOFp5YncC3yZLLwFW4sER6p5fkR0rA5KvhHrY/values/Sheet1?key=AIzaSyCccptxVWHp1Mf4BGCC33m1SzgwU14BRD4");
      setListFood(response.data.values[1].filter(item => item != "").map(item => ({
        id: foodID++,
        name: item
      }))); //Array(response.data.values[1].length).fill(""));
    }

    fetchData();
  }, []);

  const handleSubmitFood = (data, order) => {
    const input = order.trim().split(" ").map(i => parseInt(i));
    const numberRange = data.map(food => food.id);

    if (input === 0 || numberRange.includes(input[0])) {
      cart[0] = name;
      cart[input[0]] = input[1];
      setStep(step + 1);
      setOrder("");
    } else {
      console.log("number invalid");
    }
  };

  const postData = data => {
    _axios.default.PUT("https://sheets.googleapis.com/v4/spreadsheets/1ZjzZKCMOFp5YncC3yZLLwFW4sER6p5fkR0rA5KvhHrY/values/Sheet1?valueInputOption=RAW", {
      headers: [{
        key: "Content-Type",
        value: "application/json",
        description: ""
      }, {
        key: "Authorization",
        value: "ya29.ImCpB60wV3E1kUPn7MLaa6WY546MrFIID7ImVM8NVmMqjsOj83Tdutg0I0ydCR8-5ATDMWc4LYZJGCGlL9g2x3PlboGoWMDYFDRoxzPeARYHLIQU-cSq3Y9wls4maBRiRDw",
        description: ""
      }],
      body: JSON.stringify({
        range: "Sheet1",
        majorDimension: "ROWS",
        value: data
      })
    });
  };

  switch (step) {
    case 1:
      return _react.default.createElement(_react.default.Fragment, null, _react.default.createElement(_ink.Text, null, "Hi ", name, " "), _react.default.createElement(_ink.Text, null, "List foods for today: "), _react.default.createElement(_inkTable.default, {
        data: listFood
      }), _react.default.createElement(_ink.Box, null, _react.default.createElement(_ink.Box, {
        marginRight: 1
      }, "Pick number and quantity: "), _react.default.createElement(_inkTextInput.default, {
        value: order,
        onChange: e => setOrder(e),
        onSubmit: () => handleSubmitFood(listFood, order)
      })));

    case 2:
      return _react.default.createElement(_react.default.Fragment, null, _react.default.createElement(_ink.Text, null, "Do you want to choose other(y/n): "), _react.default.createElement(_inkTextInput.default, {
        value: "",
        onChange: e => e === "y" ? setStep(1) : setStep(step + 1)
      }));

    case 3:
      return _react.default.createElement(_react.default.Fragment, null, _react.default.createElement(_ink.Text, null, "Order Succeed. Type anything to quit !!! "), _react.default.createElement(_ink.Text, null, "Done. Thank you and have a nice day !!! "));

    default:
      return _react.default.createElement(_react.default.Fragment, null, _react.default.createElement(_ink.Box, {
        marginRight: 1
      }, _react.default.createElement(_ink.Text, null, " Type your name: "), _react.default.createElement(_inkTextInput.default, {
        value: name,
        onChange: e => setName(e),
        onSubmit: () => setStep(step + 1)
      })));
  }
};

var _default = MenuList;
exports.default = _default;
},{"../configs":"../configs/index.js"}]},{},["index.js"], null)
//# sourceMappingURL=/index.js.map