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

const foods = [{
  name: "nguyen",
  main: [{
    name: "suon heo",
    value: 3
  }],
  extras: [{
    name: "suon bo",
    value: 2
  }],
  drinks: [{
    name: "nuoc dua",
    value: 2
  }]
}];
const main = [{
  id: 1,
  name: "sườn non nướng sữa"
}, {
  id: 2,
  name: "Thịt kho trứng cút"
}, {
  id: 3,
  name: "thịt bò xào cải chua"
}];
const extras = [{
  id: 1,
  name: "sườn thêm"
}, {
  id: 2,
  name: "thịt kho thêm"
}, {
  id: 3,
  name: "bò thêm"
}];
const drinks = [{
  id: 1,
  name: "Nuoc dua"
}];
var cartDefault = {
  name: "",
  main: [],
  extras: [],
  drinks: []
}; ///List all Menu for today

const MenuList = ({
  list
}) => {
  const [orderNumber, setOrderNumber] = (0, _react.useState)("");
  const [orderQuantity, setOrderQuantity] = (0, _react.useState)("");
  const [name, setName] = (0, _react.useState)("");
  const [step, setStep] = (0, _react.useState)(0);
  const [cart, setCart] = (0, _react.useState)(cartDefault);
  const [listFood, setListFood] = (0, _react.useState)({});
  (0, _react.useEffect)(() => {
    async function fetchData() {
      // You can await here
      const response = await (0, _axios.default)("https://sheets.googleapis.com/v4/spreadsheets/1ZjzZKCMOFp5YncC3yZLLwFW4sER6p5fkR0rA5KvhHrY/values/Sheet1?key=AIzaSyCccptxVWHp1Mf4BGCC33m1SzgwU14BRD4"); // ...

      setListFood(response.data.values[1]);
    }

    fetchData();
  }, []);

  const handleSubmitFoodName = (data, orderNumber) => {
    const input = parseInt(orderNumber);
    console.log(orderNumber);
    const numberRange = data.map(food => food.id);

    if (input === 0 || numberRange.includes(input)) {
      setStep(step + 1);
    } else {
      console.log("number invalid");
      console.log(numberRange);
      console.log(input);
    }
  };

  const addFoodToCart = (orderNumber, orderQuantity = 1, listFood, foodType) => {
    const food = listFood.find(food => food.id == orderNumber);
    food.value = orderQuantity;
    if (foodType === "main") setCart(cart, cart.main.push(food));else if (foodType === "extras") setCart(cart, cart.extras.push(food));else setCart(cart, cart.drinks.push(food));
    console.log(cart);
    setOrderNumber("");
    setOrderQuantity("");
    setStep(step + 1);
  };

  switch (step) {
    case 1:
      return _react.default.createElement(_react.default.Fragment, null, _react.default.createElement(_ink.Text, null, "Pick ur main"), _react.default.createElement(_inkTable.default, {
        data: main
      }), _react.default.createElement(_ink.Box, null, _react.default.createElement(_ink.Box, {
        marginRight: 1
      }, "Pick number: "), _react.default.createElement(_inkTextInput.default, {
        value: orderNumber,
        onChange: e => setOrderNumber(e),
        onSubmit: () => handleSubmitFoodName(main, orderNumber)
      })));

    case 2:
      return _react.default.createElement(_react.default.Fragment, null, _react.default.createElement(_ink.Box, null, _react.default.createElement(_ink.Box, {
        marginRight: 1
      }, "Quantity: "), _react.default.createElement(_inkTextInput.default, {
        value: orderQuantity,
        onChange: e => setOrderQuantity(e),
        onSubmit: () => addFoodToCart(orderNumber, orderQuantity, main, "main")
      })));

    case 3:
      return _react.default.createElement(_react.default.Fragment, null, _react.default.createElement(_ink.Text, null, " Pick your extras"), _react.default.createElement(_inkTable.default, {
        data: extras
      }), _react.default.createElement(_ink.Box, null, _react.default.createElement(_ink.Box, {
        marginRight: 1
      }, "Pick number:"), _react.default.createElement(_inkTextInput.default, {
        value: orderNumber,
        onChange: e => setOrderNumber(e),
        onSubmit: () => handleSubmitFoodName(extras, orderNumber)
      })));

    case 4:
      return _react.default.createElement(_react.default.Fragment, null, _react.default.createElement(_ink.Box, null, _react.default.createElement(_ink.Box, {
        marginRight: 1
      }, "Quantity: "), _react.default.createElement(_inkTextInput.default, {
        value: orderQuantity,
        onChange: e => setOrderQuantity(e),
        onSubmit: () => addFoodToCart(orderNumber, orderQuantity, extras, "extras")
      })));

    case 5:
      return _react.default.createElement(_react.default.Fragment, null, _react.default.createElement(_ink.Text, null, " Pick your drinks: "), _react.default.createElement(_inkTable.default, {
        data: drinks
      }), _react.default.createElement(_ink.Box, null, _react.default.createElement(_ink.Box, {
        marginRight: 1
      }, "Pick number:"), _react.default.createElement(_inkTextInput.default, {
        value: orderNumber,
        onChange: e => setOrderNumber(e),
        onSubmit: () => handleSubmitFoodName(drinks, orderNumber)
      })));

    case 6:
      return _react.default.createElement(_react.default.Fragment, null, _react.default.createElement(_ink.Box, null, _react.default.createElement(_ink.Box, {
        marginRight: 1
      }, "Quantity: "), _react.default.createElement(_inkTextInput.default, {
        value: orderQuantity,
        onChange: e => setOrderQuantity(e),
        onSubmit: () => addFoodToCart(orderNumber, orderQuantity, drinks, "drinks")
      })));

    case 7:
      return _react.default.createElement(_ink.Text, null, "Done");

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