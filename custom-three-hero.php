<?php
/**
 * Plugin Name: Custom Three Hero
 * Description: Three.js + GSAP interactive hero section.
 * Version: 1.0.0
 * Author: GetGoal Solutions
 */

if ( ! defined( 'ABSPATH' ) ) {
    exit;
}


/*
|--------------------------------------------------------------------------
| LOAD CSS + JAVASCRIPT
|--------------------------------------------------------------------------
*/

function cth_enqueue_assets() {

    $plugin_url = plugin_dir_url( __FILE__ );
    $plugin_path = plugin_dir_path( __FILE__ );

    /*
     * Debug:
     * These paths should point to:
     *
     * custom-three-hero/dist/assets/main.css
     * custom-three-hero/dist/assets/main.js
     */

    $css_file = $plugin_path . 'dist/assets/main.css';
    $js_file  = $plugin_path . 'dist/assets/main.js';


    /*
     * CSS
     */

    if ( file_exists( $css_file ) ) {

        wp_enqueue_style(
            'custom-three-hero-style',
            $plugin_url . 'dist/assets/main.css',
            array(),
            filemtime( $css_file )
        );

    }


    /*
     * JAVASCRIPT
     */

    if ( file_exists( $js_file ) ) {

    wp_enqueue_script(
        'custom-three-hero-script',
        $plugin_url . 'dist/assets/main.js',
        array(),
        filemtime( $js_file ),
        true
    );

    wp_script_add_data(
        'custom-three-hero-script',
        'type',
        'module'
    );

    wp_add_inline_script(
        'custom-three-hero-script',
        'window.CTH_DATA = ' . wp_json_encode(
            array(
                'pluginUrl' => $plugin_url
            )
        ) . ';',
        'before'
    );
}
}

add_action(
    'wp_enqueue_scripts',
    'cth_enqueue_assets'
);


/*
|--------------------------------------------------------------------------
| HERO SHORTCODE
|--------------------------------------------------------------------------
*/

function cth_hero_shortcode() {

    ob_start();
    ?>

    <section
        id="custom-three-hero"
        class="cth-hero"
    >

        <canvas class="cth-canvas"></canvas>

        <div class="cth-background"></div>


        <div class="cth-content">

            <div class="cth-tag">
                GETGOAL SOLUTIONS
            </div>

            <h1>
                We Build
                <span>Digital Experiences.</span>
            </h1>

            <p>
                We combine creativity, technology and innovation
                to build powerful digital experiences.
            </p>

            <div class="cth-buttons">

                <a
                    href="#services"
                    class="cth-primary-button"
                >
                    Explore Services
                </a>

                <a
                    href="#contact"
                    class="cth-secondary-button"
                >
                    Let's Talk
                </a>

            </div>

        </div>


        <div class="cth-click-content">

            <span>HELLO 👋</span>

            <h2>
                Let's Create
                <strong>Something Amazing.</strong>
            </h2>

        </div>


        <div class="cth-interaction">

            <span class="cth-pulse"></span>

            <span>
                Move your mouse and click the character
            </span>

        </div>

    </section>

    <?php

    return ob_get_clean();
}

add_shortcode(
    'custom_three_hero',
    'cth_hero_shortcode'
);