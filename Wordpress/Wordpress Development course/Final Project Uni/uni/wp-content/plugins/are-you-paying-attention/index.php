<?php

/*
Plugin Name: Are You Paying Attention Quiz
Description: Give your readers a multiple choice question
Version: 1.0
Author: Alma
Author URI: https://www.al.com

*/

if (!defined('ABSPATH')) {
    exit;
}

class AreYouPayingAttention
{
    public function __construct()
    {
        //when on block screen run the js
        add_action('init', array($this, 'adminAssets'));
    }

    public function adminAssets()
    {
        // do not need this because of block.json
        // wp_register_style('quizeditcss', plugin_dir_url(__FILE__). 'build/index.css');
        // wp_register_script('ournewblocktype', plugin_dir_url(__FILE__). 'build/index.js', array(
        //     'wp-blocks',
        //     'wp-element',
        //     'wp-editor'
        // ));
        register_block_type(__DIR__, array(
            //which javascript to load, no longer need because of block.json
            // 'editor_script' => 'ournewblocktype',
            // 'editor_style' => 'quizeditcss',
            'render_callback' => array($this, 'theHTML')
        ));
    }

    public function theHTML($attributes)
    {
        // if (!is_admin()) {
        // use "script"
        // wp_enqueue_script('attentionFrontend', plugin_dir_url(__FILE__) . 'build/frontend.js', array('wp-element'));
        // style in block.json
        // wp_enqueue_style('attentionFrontendStyles', plugin_dir_url(__FILE__) . 'build/frontend.css');
        // }

        ob_start(); ?>
        <!-- send the attributes to the fronend js -->
           <div class="paying-attention-update-me"><pre style="display: none ;"><?php echo wp_json_encode($attributes)?></pre></div>         
        <?php return ob_get_clean();
    }
}

$areYouPayingAttention = new AreYouPayingAttention();
