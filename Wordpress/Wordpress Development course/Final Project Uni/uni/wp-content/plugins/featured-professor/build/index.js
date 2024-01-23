/******/ (function() { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/index.scss":
/*!************************!*\
  !*** ./src/index.scss ***!
  \************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "React" ***!
  \************************/
/***/ (function(module) {

module.exports = window["React"];

/***/ }),

/***/ "@wordpress/api-fetch":
/*!**********************************!*\
  !*** external ["wp","apiFetch"] ***!
  \**********************************/
/***/ (function(module) {

module.exports = window["wp"]["apiFetch"];

/***/ }),

/***/ "@wordpress/data":
/*!******************************!*\
  !*** external ["wp","data"] ***!
  \******************************/
/***/ (function(module) {

module.exports = window["wp"]["data"];

/***/ }),

/***/ "@wordpress/element":
/*!*********************************!*\
  !*** external ["wp","element"] ***!
  \*********************************/
/***/ (function(module) {

module.exports = window["wp"]["element"];

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	!function() {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = function(module) {
/******/ 			var getter = module && module.__esModule ?
/******/ 				function() { return module['default']; } :
/******/ 				function() { return module; };
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	!function() {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = function(exports, definition) {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	!function() {
/******/ 		__webpack_require__.o = function(obj, prop) { return Object.prototype.hasOwnProperty.call(obj, prop); }
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	!function() {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = function(exports) {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	}();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
!function() {
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _index_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./index.scss */ "./src/index.scss");
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/data */ "@wordpress/data");
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_data__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @wordpress/api-fetch */ "@wordpress/api-fetch");
/* harmony import */ var _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_4__);

// wordpress package will extract it into its own file. 
// we need to include it in the file tree within our javascript here.




//shortcut from global scope of wordpress instead of importing since it may have some issues, instead of typing wp.i18n.__ typ __
const __ = wp.i18n.__;

// register block type on the javascript side
wp.blocks.registerBlockType("ourplugin/featured-professor", {
  title: "professor Callout",
  description: "Include a short description and link to a professor ",
  icon: "welcome-learn-more",
  category: "common",
  attributes: {
    // better to define it as string
    profId: {
      type: "string"
    }
  },
  edit: EditComponent,
  save: function () {
    return null;
  }
});
function EditComponent(props) {
  const [thePreview, setThePreview] = (0,react__WEBPACK_IMPORTED_MODULE_3__.useState)("");
  (0,react__WEBPACK_IMPORTED_MODULE_3__.useEffect)(() => {
    // with this if it won't show the last professor added when select is undefined
    if (props.attributes.profId) {
      updateTheMeta();

      // fetch the new version of 
      // no need to use fetch manually, it will parse the json itself too
      // since it returns a promise you can use await, 
      // useEffect can't accept an async function directly (before () of the callback arrow function), but defining an async function inside it and then call it is okay. 

      async function go() {
        const response = await _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_4___default()({
          // does not need the rest of address. 
          path: `/featuredProfessor/v1/getHTML?profId=${props.attributes.profId}`,
          method: "GET"
        });
        setThePreview(response);
      }
      go();
    }
  }, [props.attributes.profId]);
  (0,react__WEBPACK_IMPORTED_MODULE_3__.useEffect)(() => {
    // cleaner function, fresh copy of eMeta
    return () => {
      updateTheMeta();
    };
  }, []);
  function updateTheMeta() {
    // select all block types and filter for our block type
    // filter(x => x.name == 'ourplugin/featured-professor') returns all sort of property of that blocktype
    // map is used when we want to do something for each value of array and return an array, like only ids
    // filter again no need to store the same id twice if we have the same featured block on a blog post!! 
    const profsForMeta = wp.data.select("core/block-editor").getBlocks().filter(x => x.name == 'ourplugin/featured-professor').map(x => x.attributes.profId).filter((x, index, arr) => {
      // indexOf will return the first one. If we have it a second time the index don't match
      return arr.indexOf(x) == index;
    });
    console.log(profsForMeta);
    wp.data.dispatch("core/editor").editPost({
      meta: {
        featuredprofessor: profsForMeta
      }
    });
  }
  const allProfs = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_2__.useSelect)(select => {
    //select is the tool
    return select("core").getEntityRecords("postType", "professor", {
      per_page: -1
    });
  });
  if (allProfs == undefined) return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", null, "Loading...");
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "featured-professor-wrapper"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "professor-select-container"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("select", {
    onChange: e => props.setAttributes({
      profId: e.target.value
    })
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("option", {
    value: ""
  }, __("Select a professor", "featured-professor")), allProfs.map(prof => {
    return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("option", {
      value: prof.id,
      selected: props.attributes.profId == prof.id
    }, prof.title.rendered);
  }))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    dangerouslySetInnerHTML: {
      __html: thePreview
    }
  }));
}
(0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("select", {
  onChange: e => props.setAttributes({
    profId: e.target.value
  })
}, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("option", {
  value: ""
}, "Select a professor"), allProfs.map(prof => {
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("option", {
    value: prof.id,
    selected: props.attributes.profId == prof.id
  }, prof.title.rendered);
}));
}();
/******/ })()
;
//# sourceMappingURL=index.js.map