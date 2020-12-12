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
})({"src/script.js":[function(require,module,exports) {
"use strict"; //DOM Selection - Fixed DOM

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

var container = document.querySelector("#cards-container");
var headerDisplay = document.querySelector("h1");
var message = document.querySelector("#message");
var stripe = document.querySelector(".stripe");
var buttons = document.querySelectorAll("button");
var movesBtn = document.querySelector(".moves");
var header = document.querySelector("header");
var nav = document.querySelector(".header"); //Dynamic DOM

var images = document.querySelectorAll(".image");
var covers = document.querySelectorAll(".cover");
var cards = document.querySelectorAll(".card"); //Global Setters

var gameLevels = [12, 20, 32, 48, 64];
var imagePaths = 38;
var imgUrls = [];
var gameLevel = gameLevels[0];
var openedCards = [];
var moves = 0; //Event Listeners

container.addEventListener("click", function (e) {
  e.stopPropagation();
  if (!e.target.classList.contains("cover")) return;
  var card = e.target.closest(".card");
  var image = card.querySelector(".image");
  openedCards = updateDisplay(openedCards);
  image.style.display = "block";
  e.target.style.display = "none";
  openedCards.push(image);
  displayMatchResult(openedCards);
});
stripe.addEventListener("click", function (e) {
  e.stopPropagation();
  if (e.target.id === "shuffle") displayLevels(selectLevels(imgUrls, gameLevel));
  if (e.target.id === "reset") reset();
  if (e.target.textContent === "Easy") modeHandeller(gameLevels[0], e.target);
  if (e.target.textContent === "Medium") modeHandeller(gameLevels[1], e.target);
  if (e.target.textContent === "Hard") modeHandeller(gameLevels[2], e.target);
  if (e.target.textContent === "Ultra") modeHandeller(gameLevels[3], e.target);
  if (e.target.textContent === "Legend") modeHandeller(gameLevels[4], e.target);
}); //Logic + Helpers

var updateDisplay = function updateDisplay(arr) {
  if (!(arr.length === 2)) return arr;

  if (isMatch(arr[0].src, arr[1].src)) {} else {
    arr.forEach(function (el) {
      el.style.display = "none";
      el.closest(".card").querySelector(".cover").style.display = "block";
    });
  }

  arr.splice(0, 2);
  return arr;
};

var displayMatchResult = function displayMatchResult(arr) {
  if (!(arr.length === 2)) return;
  moves++;
  movesBtn.textContent = "Moves: ".concat(moves);

  if (isMatch(arr[0].src, arr[1].src)) {
    message.textContent = "Shabbashhh 👏";
    if (!checkAllMatches()) return;
    winningText();
  } else {
    message.textContent = "Beta Tum Sai Na Ho Paye Ga 😏😏";
  }
};

var winningText = function winningText() {
  var guessRate = gameLevel / 2 / moves * 100;
  console.log("check score");

  if (moves === gameLevel / 2) {
    headerDisplay.textContent = "You Nailed it! Your Guess Rate is ".concat(+guessRate.toFixed(2), "%");
    headerDisplay.style.backgroundColor = "limegreen";
    headerDisplay.style.color = "whitesmoke";
  }

  if (moves > gameLevel / 2 && moves <= 2 * (gameLevel / 2)) {
    headerDisplay.textContent = "Great Work! Your Guess Rate is ".concat(+guessRate.toFixed(2), "%");
    headerDisplay.style.backgroundColor = "lime";
    headerDisplay.style.color = "steelblue";
  }

  if (moves > 2 * (gameLevel / 2) && moves <= 3 * (gameLevel / 2)) {
    headerDisplay.textContent = "That's Okay, Keep it up! Your Guess Rate is ".concat(+guessRate.toFixed(2), "%");
    headerDisplay.style.backgroundColor = "gold";
    headerDisplay.style.color = "steelblue";
  }

  if (moves > 3 * (gameLevel / 2)) {
    headerDisplay.textContent = "Poor Work, Try Again! Your Guess Rate is ".concat(+guessRate.toFixed(2), "%");
    headerDisplay.style.backgroundColor = "orangered";
    headerDisplay.style.color = "whitesmoke";
  }
};

var checkAllMatches = function checkAllMatches() {
  var unopenedImgs = _toConsumableArray(images).filter(function (image) {
    return image.style.display === "none";
  });

  if (unopenedImgs.length === 0) return true;
  return false;
};

var isMatch = function isMatch(d1, d2) {
  if (d1 === d2) return true;
  return false;
};

var modeHandeller = function modeHandeller(cardsCount, mode) {
  gameLevel = cardsCount;
  cardsCreation(gameLevel);
  displayLevels(selectLevels(imgUrls, gameLevel));
  buttons.forEach(function (btn) {
    return btn.classList.remove("selected");
  });
  mode.classList.add("selected");
};

var shuffleArray = function shuffleArray(arr) {
  for (var i = arr.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
  }

  return arr;
};

var resetImgs = function resetImgs(urls) {
  //console.clear()
  urls = shuffleArray(urls);
  urls.forEach(function (url, i) {
    images[i].src = url; //console.log(images[i]);
  });
};

var selectLevels = function selectLevels(urls, cardsCount) {
  if (cardsCount % 2 !== 0) return alert("Please Enter an Even Number");
  var imgArr = [];
  urls.forEach(function (url, i) {
    if (cardsCount / 2 > i) {
      imgArr.push(url);
    }
  });
  imgArr = [].concat(_toConsumableArray(imgArr), _toConsumableArray(imgArr));
  return imgArr;
};

var boxesInARow = function boxesInARow(urls, width, numBoxes) {
  container.style.width = width + "%";
  var cssClass = {
    0: "cards",
    3: "cardsThree",
    4: "cardsFour",
    5: "cardsFive",
    8: "cardsEight"
  };
  urls.forEach(function (_, i) {
    cards[i].classList.remove(cssClass["0"], cssClass["3"], cssClass["4"], cssClass["5"], cssClass["8"]);
    cards[i].classList.add(cssClass[numBoxes]);
  });
};

var reset = function reset() {
  images.forEach(function (image) {
    return image.style.display = "none";
  });
  covers.forEach(function (cover) {
    return cover.style.display = "block";
  });
  moves = 0;
  message.textContent = "Chalo Khelo 😋";
  movesBtn.textContent = "Moves: ".concat(moves);
  headerDisplay.textContent = "Match Up";
  headerDisplay.style.backgroundColor = "steelblue";
  headerDisplay.style.color = "whitesmoke";
};

var displayLevels = function displayLevels(urls) {
  reset();
  resetImgs(urls);
  if (urls.length <= 12 && urls.length > 6) boxesInARow(urls, 75, 4);
  if (urls.length <= 20 && urls.length > 12) boxesInARow(urls, 90, 5);
  if (urls.length > 20) boxesInARow(urls, 95, 8);
};

var stickyNav = function stickyNav() {
  var options = {
    root: null,
    threshold: 0
  };

  var toggleNav = function toggleNav(entries) {
    entries.forEach(function (entry) {
      if (!entry.isIntersecting) {
        nav.classList.add("sticky");
      } else {
        nav.classList.remove("sticky");
      }
    });
  };

  var headerObserver = new IntersectionObserver(toggleNav, options);
  headerObserver.observe(header);
};

var cardsCreation = function cardsCreation(cardsCount) {
  container.innerHTML = "";
  cards = images = covers = null;

  for (var i = 0; i < cardsCount; i++) {
    var html = "\n    <div class=\"card\">\t\t\t\n      <div class=\"cover\"></div>\n      <img src=\"\" class='image' id= ".concat(i + 1, ">\n    </div>");
    container.insertAdjacentHTML("beforeend", html);
  }

  cards = document.querySelectorAll(".card");
  images = document.querySelectorAll(".image");
  covers = document.querySelectorAll(".cover");
};

var populatePaths = function populatePaths(totalUrls) {
  var arr = [];

  for (var i = 0; i < totalUrls; i++) {
    var path = "./img/img-".concat(i + 1, ".jpg");
    arr.push(path);
  }

  return arr;
};

var init = function init() {
  imgUrls = shuffleArray(populatePaths(imagePaths));
  cardsCreation(gameLevel);
  displayLevels(selectLevels(imgUrls, gameLevel));
  stickyNav();
}; //Game Initialization


init();
},{}],"node_modules/parcel/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "59882" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["node_modules/parcel/src/builtins/hmr-runtime.js","src/script.js"], null)
//# sourceMappingURL=/script.baf0e655.js.map