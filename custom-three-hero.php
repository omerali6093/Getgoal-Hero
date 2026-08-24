```php
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

    $plugin_url  = plugin_dir_url( __FILE__ );
    $plugin_path = plugin_dir_path( __FILE__ );

    /*
     * Files
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


        /*
         * ES MODULE
         */

        wp_script_add_data(
            'custom-three-hero-script',
            'type',
            'module'
        );


        /*
         * Send plugin data to Three.js
         */

        wp_add_inline_script(
            'custom-three-hero-script',

            'window.CTH_DATA = ' . wp_json_encode(
                array(
                    'pluginUrl' => $plugin_url,

                    /*
                     * Custom voice file
                     */
                    'voiceUrl' => $plugin_url . 'audio/hero-voice.mp3'
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


        <!-- =====================================
             THREE.JS CANVAS
        ====================================== -->

        <canvas
            class="cth-canvas"
        ></canvas>


        <!-- =====================================
             BACKGROUND
        ====================================== -->

        <div
            class="cth-background"
        ></div>


        <!-- =====================================
             MAIN HERO CONTENT
        ====================================== -->

        <div
            class="cth-content"
        >


            <!-- AGENCY TAG -->

            <div
                class="cth-tag"
            >
                GETGOAL SOLUTIONS
            </div>


            <!-- MAIN HEADING -->

            <h1>

                A MULTI-TECH AGENCY

                <span>
                    BUILT FOR
                </span>

                <span>
                    WHAT’S NEXT
                </span>

            </h1>


            <!-- DESCRIPTION -->

            <p>
                We combine design, technology, marketing, and innovation
                to turn ideas into impactful digital experiences.
            </p>


            <!-- BUTTONS -->

            <div
                class="cth-buttons"
            >


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


        <!-- =====================================
             CLICK GENERATED CONTENT
             
             IMPORTANT:
             CSS expects h1 here.
        ====================================== -->

        <div
            class="cth-click-content"
        >


            <span>
                A MULTI-TECH AGENCY
            </span>


            <h1>

                BUILT FOR

                <strong>
                    WHAT’S NEXT
                </strong>

            </h1>


            <p>
                We combine design, technology, marketing, and innovation
                to turn ideas into impactful digital experiences.
            </p>


        </div>


        <!-- =====================================
             3D CHARACTER HEAD TEXT
             
             World.js positions this element
             over the character's head.
        ====================================== -->

        <div
            class="cth-head-text"
            aria-hidden="true"
        >
            CLICK ME
        </div>


        <!-- =====================================
             INTERACTION HINT
        ====================================== -->

        <div
            class="cth-interaction"
        >


            <span
                class="cth-pulse"
            ></span>


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

