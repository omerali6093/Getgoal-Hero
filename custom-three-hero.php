
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
     * FILE PATHS
     */

    $css_file = $plugin_path . 'dist/assets/main.css';
    $js_file  = $plugin_path . 'dist/assets/main.js';


    /*
     * LOAD CSS
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
     * LOAD JAVASCRIPT
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
         * IMPORTANT:
         * Load JS as ES MODULE
         */

        wp_script_add_data(
            'custom-three-hero-script',
            'type',
            'module'
        );


        /*
         * THREE.JS / PLUGIN DATA
         */

        wp_add_inline_script(
    'custom-three-hero-script',

    'window.CTH_DATA = ' . wp_json_encode(
        array(
            'pluginUrl' => $plugin_url,
            'voiceUrl'  => $plugin_url . 'audio/hero-voice.mp3'
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


        <!-- =====================================================
             THREE.JS CANVAS
        ====================================================== -->

        <canvas
            class="cth-canvas"
        ></canvas>


        <!-- =====================================================
             BACKGROUND
        ====================================================== -->

        <div
            class="cth-background"
        ></div>


        <!-- =====================================================
             MAIN HERO CONTENT
        ====================================================== -->

        <div
            class="cth-content"
        >


            <!-- ===============================
                 EYEBROW
            ================================ -->

            <div
                class="cth-eyebrow"
            >

                <span
                    class="cth-dot"
                ></span>


                <span>
                    AGENCY
                </span>


                <span
                    class="cth-rule"
                ></span>


                <span>
                    MULTI-DISCIPLINE
                </span>

            </div>


            <!-- ===============================
                 MAIN HEADING
            ================================ -->

            <h1>

                A MULTI-TECH AGENCY

                <br>

                <span
                    class="thin"
                >
                    BUILT FOR
                </span>

                <span
                    class="accent"
                >
                    WHAT’S NEXT
                </span>

            </h1>


            <!-- ===============================
                 MAIN PARAGRAPH
            ================================ -->

            <p>
                We combine design, technology, marketing, and
                innovation to turn ideas into impactful digital
                experiences.
            </p>


            <!-- ===============================
                 SERVICE MODULES
            ================================ -->

            <div
                class="cth-modules"
            >

                <div
                    class="cth-module"
                >
                    Design
                </div>


                <div
                    class="cth-module"
                >
                    Technology
                </div>


                <div
                    class="cth-module"
                >
                    Marketing
                </div>


                <div
                    class="cth-module"
                >
                    Innovation
                </div>

            </div>

        </div>


        <!-- =====================================================
             CLICK CONTENT
             KEPT FOR YOUR EXISTING CLICK / TEXT LOGIC
        ====================================================== -->

        <!-- =====================================================
     CLICK CONTENT
     KEEPING VOICE/SOUND COMPATIBILITY
===================================================== -->

<div
    class="cth-click-content"
>

    <!-- Visible heading -->
    <h1>

        A MULTI-TECH AGENCY

        <br>

        <span class="thin">
            BUILT FOR
        </span>

        <span class="accent">
            WHAT’S NEXT
        </span>

    </h1>


    <!-- Visible paragraph -->
    <p>
        We combine design, technology, marketing, and
        innovation to turn ideas into impactful digital
        experiences.
    </p>


    <!-- Service modules -->
    <div class="cth-modules">

        <div class="cth-module">
            Design
        </div>

        <div class="cth-module">
            Technology
        </div>

        <div class="cth-module">
            Marketing
        </div>

        <div class="cth-module">
            Innovation
        </div>

    </div>


    <!-- =================================================
         VOICE COMPATIBILITY ELEMENTS

         These preserve the old HTML selectors used
         by the voice/sound JavaScript.
    ================================================== -->

    <div
        class="cth-voice-content"
        style="display:none;"
        aria-hidden="true"
    >

        <span>
            HELLO
        </span>

        <h2>

            A MULTI-TECH AGENCY

            <strong>
                BUILT FOR WHAT’S NEXT
            </strong>

        </h2>

        <p>
            We combine design, technology, marketing, and
            innovation to turn ideas into impactful digital
            experiences.
        </p>

    </div>

</div>


        <!-- =====================================================
             CLICK ME TEXT
             POSITIONED BY THREE.JS
             INSIDE / OVER THE CHARACTER HEAD
        ====================================================== -->

        <div
            class="cth-head-text"
            aria-hidden="true"
        >
            CLICK ME
        </div>


        <!-- =====================================================
             INTERACTION HINT
        ====================================================== -->

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
