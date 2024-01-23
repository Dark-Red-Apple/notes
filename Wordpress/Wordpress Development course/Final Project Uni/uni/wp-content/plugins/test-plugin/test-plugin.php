<?php

/**
* Plugin Name: Test Plugin
* Plugin URI: localhost/wpreact
* Description: Test.
* Version: 0.1
* Author: Alma
* Author URI: localhost/wpreact
**/

add_shortcode('programCount', 'programCountNumber');

function programCountNumber(){
    $programs = new WP_Query(array(
        'post_type' => 'program',
    ));


    return $programs->found_posts;
}

