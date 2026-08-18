<?php
/**
 * Plugin Name: Custom Three Hero
 * Description: A custom Three.js and GSAP hero section for WordPress.
 * Version: 1.0.0
 * Author: Your Name
 */

if ( ! defined( 'ABSPATH' ) ) {
    exit;
}


/**
 * Load the CSS and JavaScript files.
 */
function custom_three_hero_enqueue_assets() {

    // Only load these files on the homepage.
    if ( ! is_front_page() ) {
        return;
    }

    $plugin_url = plugin_dir_url( __FILE__ );

    // Load CSS if the Vite build has created it.
    wp_enqueue_style(
        'custom-three-hero-style',
        $plugin_url . 'dist/assets/main.css',
        array(),
        '1.0.0'
    );

    // Load the Three.js + GSAP bundle.
    wp_enqueue_script(
        'custom-three-hero-script',
        $plugin_url . 'dist/assets/main.js',
        array(),
        '1.0.0',
        true
    );
}

add_action(
    'wp_enqueue_scripts',
    'custom_three_hero_enqueue_assets'
);


/**
 * Create the hero shortcode.
 *
 * Use:
 * [custom_three_hero]
 */
function custom_three_hero_shortcode() {

    ob_start();
    ?>

    <section class="custom-three-hero">

        <!-- Three.js/WebGL renders here -->
        <canvas class="three-hero-canvas"></canvas>

        <!-- Normal WordPress/HTML content -->
        <div class="three-hero-content">

            <h1>Creative Digital Experiences</h1>

            <p>
                Powered by WordPress, Three.js and GSAP.
            </p>

            <a href="#services" class="three-hero-button">
                Explore
            </a>

        </div>

    </section>

    <?php

    return ob_get_clean();
}

add_shortcode(
    'custom_three_hero',
    'custom_three_hero_shortcode'
);