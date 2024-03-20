<?php
/**
 * Plugin Name:       Gatherpress venue-website block
 * Description:       An experiment to replace the "website" part of the `gatherpress/venue` block with a block-variation of the `core/paragraph` block.
 * Version:           0.1.0-alpha
 * Requires at least: 6.5-RC2
 * Requires PHP:      7.0
 * Author:            The WordPress Contributors
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       gatherpress-venue-website
 *
 * @package           create-block
 */

namespace GatherPressVenueWebsiteBlock;

use GatherPress\Core\Event;

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

/**
 * Start the engines.
 *
 * @return void
 */
function bootstrap(): void {
	add_action( 'init', __NAMESPACE__ . '\\register_assets', 1 );

	add_action( 'enqueue_block_editor_assets', __NAMESPACE__ . '\\enqueue_assets' );

	/**
	 * Do not use protected post_meta aka do not start with "_",
	 * because the use of protected meta is prevent by the Block Bindings API at the moment.
	 * 
	 * Believe me, I searched some time, why my post_meta content is shown in the admin, but not on the frontend.
	 * But, I wanted to avoid having this pseudo-post_meta available within the old custom-fileds metabox, that's why I tried using "_". 
	 */
	\add_filter(
		'get_post_metadata',
		function ( $metadata, $object_id, $meta_key ) : mixed {
			if ( 'venue_information__website' !== $meta_key ) {
				return $metadata;
			}
			$venue_information = (array) json_decode( get_post_meta( $object_id, 'venue_information', true ) );
			return [
				$venue_information['website'],
			];
		},
		10,
		3
	);

	// https://developer.wordpress.org/reference/hooks/render_block_this-name/
	add_filter( 'render_block_core/paragraph', __NAMESPACE__ . '\\render_venue_website_block', 10, 3 );
}
bootstrap();


/**
 * Get backend-only editor assets.
 *
 * @return string[]
 */
function get_editor_assets(): array {
	return [
	// 'venue-website',
	];
}


/**
 * 
 *
 * @return void
 */
function register_assets(): void {

	\register_post_meta(
		'gp_venue',
		'venue_information__website',
		array(
			'auth_callback'     => function () {
				return current_user_can( 'edit_posts' );
			},
			'sanitize_callback' => 'sanitize_url',
			'show_in_rest'      => true,
			'single'            => true,
			'type'              => 'string',
		)
	);

	\array_map(
		__NAMESPACE__ . '\\register_asset',
		\array_merge(
			get_editor_assets(),
			[
				'variations',
			]
		)
	);
}

/**
 * Enqueue all scripts.
 *
 * @return void
 */
function enqueue_assets(): void {
	\array_map(
		__NAMESPACE__ . '\\enqueue_asset',
		// get_editor_assets()
		[
			'variations',
		]
	);
}

/**
 * Enqueue a script.
 *
 * @param  string $asset Slug of the block to load the frontend scripts for.
 *
 * @return void
 */
function enqueue_asset( string $asset ): void {
	wp_enqueue_script( "gatherpress-venue-website--$asset" );
	// wp_enqueue_style( "gatherpress-venue-website--$asset" );
}


/**
 * Register a new script and sets translated strings for the script.
 *
 * @throws \Error If build-files doesn't exist errors out in local environments and writes to error_log otherwise.
 *
 * @param  string $asset Slug of the block to register scripts and translations for.
 *
 * @return void
 */
function register_asset( string $asset ): void {

	$dir = __DIR__;

	$script_asset_path = "$dir/build/$asset/$asset.asset.php";

	
	if ( ! \file_exists( $script_asset_path ) ) {
		$error_message = "You need to run `npm start` or `npm run build` for the '$asset' block-asset first.";
		if ( \in_array( wp_get_environment_type(), [ 'local', 'development' ], true ) ) {
			throw new \Error( esc_html( $error_message ) );
		} else {
			// Should write to the \error_log( $error_message ); if possible.
			return;
		}
	}

	$index_js     = "build/$asset/$asset.js";
	$script_asset = require $script_asset_path; // phpcs:ignore WordPressVIPMinimum.Files.IncludingFile.UsingVariable
	\wp_register_script(
		"gatherpress-venue-website--$asset",
		plugins_url( $index_js, __FILE__ ),
		$script_asset['dependencies'],
		$script_asset['version'],
		true
	);

	$index_css = "build/$asset/$asset.css";
	\wp_register_style(
		"gatherpress-venue-website--$asset",
		plugins_url( $index_css, __FILE__ ),
		[ 'wp-block-post-date','global-styles' ],
		time(),
		'screen'
	);
	wp_set_script_translations(
		"gatherpress-venue-website--$asset",
		'gatherpress',
		"$dir/languages"
	);
}



/**
 * Filter the render_block to add the needed directives to the inner cover blocks.
 * 
 * @see https://developer.wordpress.org/reference/hooks/render_block_this-name/
 *
 * @param string $block_content The content being rendered by the block.
 */
function render_venue_website_block( $block_content, $block, $instance ) {
	if ( ! isset( $block['attrs']['className'] ) || false === \strpos( $block['attrs']['className'], 'gp-venue-website' ) ) {
		return $block_content;
	}
// wp_die('<pre>'.\var_export($block,true).'</pre>');
// wp_die('<pre>'.\var_export($instance->attributes,true).'</pre>');

	// Mostly copied from
	// /gutenberg/packages/block-library/src/post-title/index.php#L38
	if ( 1==1 || isset( $block['attrs']['isLink'] ) && $block['attrs']['isLink'] ) {
		$title = \the_title_attribute([
			'echo'   => false,
			'before' => __('Website of ', 'gatherpress'),
			'post'   => get_post( $instance->context['postId'] )
		]);
		$target = ! empty( $block['attrs']['linkTarget'] ) ? 'target="' . esc_attr( $block['attrs']['linkTarget'] ) . '"' : '';
		$rel    = ! empty( $block['attrs']['linkRel'] ) ? 'rel="' . esc_attr( $block['attrs']['linkRel'] ) . '"' : '';
		$linked_content = sprintf( 
			'<a href="%1$s" %2$s %3$s title="%4$s">%5$s</a>',
			esc_url( 
				\get_post_meta( 
					$instance->context['postId'],
					'venue_information__website',
					true
				)
			),
			$target,
			$rel,
			$title,
			url_shorten( $instance->attributes['content'] )
		);
	}

	return \str_replace(
		'>' . $instance->attributes['content'] . '</',
		'>' . $linked_content . '</',
		$block_content
	);
}
