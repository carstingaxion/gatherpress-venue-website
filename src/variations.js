/**
 * WordPress dependencies
 */
import { registerBlockVariation } from '@wordpress/blocks';
import { __ } from '@wordpress/i18n';

import { addFilter } from "@wordpress/hooks";
import { createHigherOrderComponent } from "@wordpress/compose";

/**
 * Internal dependencies
 */
// const GPVW = 'gatherpress-venue-website';
const GPVW_CLASS_NAME   = 'gp-venue-website';

/**
 * 
 * 
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-variations/
 */
registerBlockVariation( 'core/paragraph', {
	name: GPVW_CLASS_NAME,
	title: __( 'Venue Website', 'gatherpress' ),
	description: __( 'Displays the website for a venue.', 'gatherpress' ),
	category: 'gatherpress',
	icon: 'nametag',
	isActive: [ 'className', 'metadata.bindings.content.args.key' ],
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
		placeholder: "No website added, yet.",
	},
	// allowedControls: [],
	// scope: [ 'inserter', 'transform', 'block' ], // Defaults to 'block' and 'inserter'.
	example: {}
} );



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



addFilter(
    'blocks.registerBlockType',
    'gatherpress/extend-paragraph-block',
    extendParagraphBlock
);

function extendParagraphBlock(settings, name) {
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
			className: false, // Removes "Additional CSS classes" panel for blocks that support it
			// customClassName: false // **Updated** For blocks that don't have className
        },
    }
	// console.log(newSettings);
	return newSettings;
}
