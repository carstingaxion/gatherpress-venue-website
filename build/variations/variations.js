/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "@wordpress/blocks":
/*!********************************!*\
  !*** external ["wp","blocks"] ***!
  \********************************/
/***/ ((module) => {

module.exports = window["wp"]["blocks"];

/***/ }),

/***/ "@wordpress/compose":
/*!*********************************!*\
  !*** external ["wp","compose"] ***!
  \*********************************/
/***/ ((module) => {

module.exports = window["wp"]["compose"];

/***/ }),

/***/ "@wordpress/hooks":
/*!*******************************!*\
  !*** external ["wp","hooks"] ***!
  \*******************************/
/***/ ((module) => {

module.exports = window["wp"]["hooks"];

/***/ }),

/***/ "@wordpress/i18n":
/*!******************************!*\
  !*** external ["wp","i18n"] ***!
  \******************************/
/***/ ((module) => {

module.exports = window["wp"]["i18n"];

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
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!***************************!*\
  !*** ./src/variations.js ***!
  \***************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/blocks */ "@wordpress/blocks");
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_hooks__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/hooks */ "@wordpress/hooks");
/* harmony import */ var _wordpress_hooks__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_hooks__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_compose__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/compose */ "@wordpress/compose");
/* harmony import */ var _wordpress_compose__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_compose__WEBPACK_IMPORTED_MODULE_3__);
/**
 * WordPress dependencies
 */





/**
 * Internal dependencies
 */
// const GPVW = 'gatherpress-venue-website';
const GPVW_CLASS_NAME = 'gp-venue-website';

/**
 * 
 * 
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-variations/
 */
(0,_wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__.registerBlockVariation)('core/paragraph', {
  name: GPVW_CLASS_NAME,
  title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Venue Website', 'gatherpress'),
  description: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Displays the website for a venue.', 'gatherpress'),
  category: 'gatherpress',
  icon: 'nametag',
  isActive: ['className', 'metadata.bindings.content.args.key'],
  // @source https://github.com/WordPress/gutenberg/issues/41303#issuecomment-1760985709 
  // I had to add blockAttrs to the fn to make this work, because the className only exists within the variationAttrs, which comes second.
  // isActive: ( blockAttrs, { className }) => {
  // 	return (
  // 		blockAttrs.className.includes(GPVW_CLASS_NAME) // check if className contains GPV_CLASS_NAME and not equals. incase you add additional css classes it will still work
  // 	);
  // },
  attributes: {
    // namespace: GPVW_CLASS_NAME,
    className: GPVW_CLASS_NAME,
    metadata: {
      bindings: {
        content: {
          source: "core/post-meta",
          args: {
            key: "venue_information__website"
          }
        }
      }
    },
    placeholder: "No website added, yet."
  },
  // allowedControls: [],
  // scope: [ 'inserter', 'transform', 'block' ], // Defaults to 'block' and 'inserter'.
  example: {}
});

/* 
registerBlockVariation( 'core/button', {
	name: GPVW_CLASS_NAME,
	title: __( 'Venue Website', 'gatherpress' ),
	description: __( 'Displays the website for a venue.', 'gatherpress' ),
	category: 'gatherpress',
	icon: 'nametag',
	// isActive: [ 'namespace', 'className' ],
	// @source https://github.com/WordPress/gutenberg/issues/41303#issuecomment-1760985709 
	// I had to add blockAttrs to the fn to make this work, because the className only exists within the variationAttrs, which comes second.
	isActive: ( blockAttrs, { className }) => {
		return (
			className.includes(GPVW_CLASS_NAME) // check if className contains GPV_CLASS_NAME and not equals. incase you add additional css classes it will still work
		);
	},
	attributes: {
		// namespace: GPVW_CLASS_NAME,
		className: GPVW_CLASS_NAME,
		tagName: 'a', // By setting this to 'button', instead of 'a', we can completely prevent the LinkControl getting rendered into the Toolbar.
		title: __( 'Venue Website', 'gatherpress' ),
		text: '🌐 ' + __( 'Venue Website', 'gatherpress' ) + ' (v2)',
		// text: null,
		// url: '#',
		// url: null,
		metadata: {
			bindings: {
				// text: {
				// 	source: "core/post-meta",
				// 	args: {
				// 		key: "venue_information__website"
				// 	}
				// },
				url: {
					source: "core/post-meta",
					args: {
						key: "venue_information__website"
					}
				}
			}
		}
	},
	// allowedControls: [],
	scope: [ 'inserter', 'transform', 'block' ], // Defaults to 'block' and 'inserter'.
	example: {}
} );
 */

/**
 * Add the edit component to the block.
 * This is the component that will be rendered in the editor.
 * It will be rendered after the original block edit component.
 *
 * @param {function} BlockEdit Original component
 * @returns {function} Wrapped component
 *
 * @see https://developer.wordpress.org/block-editor/developers/filters/block-filters/#editor-blockedit
 */
// addFilter(
// 	"editor.BlockEdit",
// 	"gatherpress-venue-website/paragraph-block-variation",
// 	createHigherOrderComponent((BlockEdit) => {
// 		return (props) => {
// 			if (props.name !== "core/paragraph" || props.attributes.className !== GPVW_CLASS_NAME) {
// 				return <BlockEdit {...props} />;
// 			}

// 		/* 	
// 			const linkedContent = '<a href="#">' + props.attributes.content + '</a>';
// 			let newAttrs;
// 			newAttrs = {
// 				...props.attributes,
// 				// content: undefined
// 				// content: <Edit {...props} />
// 				// content: linkedContent
// 				dynamicContent: linkedContent
// 			}
// 			// delete newAttrs.content;

// 			let newProps;
// 			newProps = {
// 				...props,
// 				attributes: newAttrs
// 			}
// console.log(newProps, 'newProps');

// */
// // console.log(props, 'props');

// /* 
// if (-1 === props.attributes.content.indexOf('a href')) {
// 	props.setAttributes( {
// 		content: '<a href="#">' + props.attributes.content + '</a>',
// 	} );	
// }
//  */

// // console.log(props, 'setAttributes --> props');

// 			return (
// 				<>
// 					<BlockEdit {...props} />
// 					{/* <Edit {...props} /> */}
// 				</>
// 			);
// 		};
// 	}),
// );

(0,_wordpress_hooks__WEBPACK_IMPORTED_MODULE_2__.addFilter)('blocks.registerBlockType', 'gatherpress/extend-query-block', extendQueryBlock);
function extendQueryBlock(settings, name) {
  if (name !== 'core/paragraph') {
    return settings;
  }
  // console.log(name);
  // console.info(settings);

  settings.usesContext.indexOf('postId') === -1 && settings.usesContext.push('postId');
  // settings.usesContext.indexOf('postType') === -1 && settings.usesContext.push('postType');

  const newSettings = {
    ...settings,
    supports: {
      ...settings.supports,
      className: false // Removes "Additional CSS classes" panel for blocks that support it
      // customClassName: false // **Updated** For blocks that don't have className
    }
  };
  // console.log(newSettings);
  return newSettings;
}
})();

/******/ })()
;
//# sourceMappingURL=variations.js.map