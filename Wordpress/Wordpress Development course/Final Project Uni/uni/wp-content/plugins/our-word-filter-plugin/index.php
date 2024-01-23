<?php

/*
Plugin Name: Our word Filter Plugin
Description: Replaces a list of words.
version 0.1
Author: Alma
Author URI: ''
*/

use ParagonIE\Sodium\Core\Curve25519\Ge\P2;

if (!defined('ABSPATH')) {
    exit;
} // Exit if accessed directly

class OurWordFilterPlugin {
    function __construct()
    {
        add_action('admin_menu', array($this, 'ourMenu'));
        if (get_option('plugin_words_to_filter') ) add_action('the_content', array($this, 'filterLogic'));

        add_action('admin_init', array($this, 'ourSettings'));
    }

    function ourSettings(){
        add_settings_section('replacement-text-section', null, null, 'word-filter-options');
        // setting group and name of option
        register_setting('replacementFields', 'replacementText');
        add_settings_field('replacement-text', 'Filtered Text', array($this, 'replacementFieldHTML'), 'word-filter-options', 'replacement-text-section');

    }

    function replacementFieldHTML(){
        ?>
        <input type="text" name="replacementText" value="<?php echo esc_attr(get_option('replacementText', '***')) ?>">
        <p class="description">Leave blank to simply remove the filtered words.</p>
        <?Php
    }

    function ourMenu(){
        $mainPageHook = add_menu_page('Words To Filter', 'word Filter', 'manage_options', 'ourwordfilter', array($this, 'wordFilterPage'), 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz48IURPQ1RZUEUgc3ZnIFBVQkxJQyAiLS8vVzNDLy9EVEQgU1ZHIDEuMS8vRU4iICJodHRwOi8vd3d3LnczLm9yZy9HcmFwaGljcy9TVkcvMS4xL0RURC9zdmcxMS5kdGQiPjwhLS0gVXBsb2FkZWQgdG86IFNWRyBSZXBvLCB3d3cuc3ZncmVwby5jb20sIEdlbmVyYXRvcjogU1ZHIFJlcG8gTWl4ZXIgVG9vbHMgLS0+CjxzdmcgZmlsbD0iIzAwMDAwMCIgd2lkdGg9IjgwMHB4IiBoZWlnaHQ9IjgwMHB4IiB2aWV3Qm94PSIwIDAgMjQgMjQiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHZlcnNpb249IjEuMSI+PHBhdGggZD0iTTIwLDEwQzIyLDEzIDE3LDIyIDE1LDIyQzEzLDIyIDEzLDIxIDEyLDIxQzExLDIxIDExLDIyIDksMjJDNywyMiAyLDEzIDQsMTBDNiw3IDksNyAxMSw4VjVDNS4zOCw4LjA3IDQuMTEsMy43OCA0LjExLDMuNzhDNC4xMSwzLjc4IDYuNzcsMC4xOSAxMSw1VjNIMTNWOEMxNSw3IDE4LDcgMjAsMTBaIiAvPjwvc3ZnPg==', 100 );
        // this should come after the above, it directs to same page but you need to define it to set a new name for it. 
        add_submenu_page('ourwordfilter', 'Word To Filter', 'Words List', 'manage_options', 'ourwordfilter', array($this, 'wordFilterPage') );
        add_submenu_page('ourwordfilter', 'Word Filter Options', 'Options', 'manage_options', 'word-filter-options', array($this, 'optionsSubPage') );
        add_action("load-{$mainPageHook}", array($this, 'mainPageAssets'));
    }

    function filterLogic($content){
        $words = get_option('plugin_words_to_filter');
        $words = explode(',', $words);
        $words = array_map('trim', $words);
        return str_replace($words, esc_html(get_option('replacementText', ' ***')), $content);
    }


    function mainPageAssets(){
        wp_enqueue_style('filterAdminCss', plugin_dir_url(__FILE__).'styles.css');
    }

    function handleForm(){
        if(wp_verify_nonce($_POST['ourNonce'], 'saveFilterWords') AND  current_user_can('manage_options')){
            // save the text are to funciton
            update_option('plugin_words_to_filter', sanitize_text_field($_POST['plugin_words_to_filter']));
            ?>
            <!-- // class is for wordpress -->
                <div class="updated">
                    Your filtered words were saved. 
                </div>
            <?php
        }else { ?>
        
            <div class="error">
                <p>Sorry, you do not have permission to perform that action.</p>
            </div>

            <?php
        }
    
    }

    function wordFilterPage(){
        ?>
        <div class="wrap">
            <h1>Word Filter</h1>
            <?php if($_POST['justsubmitted'] == "true") $this->handleForm() ?>
            <form method="POST">
                <input type="hidden" name="justsubmitted" value="true">
                <?php wp_nonce_field('saveFilterWords', 'ourNonce')?>
                <label for="plugin_words_to_filter">
                    <p>Enter a <stron>comma-separated</stron> list of words to filter from your site's content.</p>
                </label>
                <div class="word-filter__flex-container">
                    <textarea name="plugin_words_to_filter" id="plugin_words_to_filter" placeholder="bad, mean, awful, horrible"><?php echo esc_textarea(get_option('plugin_words_to_filter')); ?></textarea>
                </div>
                <input type="submit" name="submit" id="submit" class="button button-primary" value="Save Changes">
            </form>
        </div>
        <?php
    }
    
    function optionsSubPage(){
        ?>
        <div class="wrap">
            <h1>Word Filter Options</h1>
            <!-- METHOD POST IS NECESSARY -->
            <form action="options.php" method="POST">
                <?php 
                settings_errors();
                //group name
                    settings_fields('replacementFields');
                    //slug name
                    do_settings_sections('word-filter-options');
                    submit_button();
                ?>
            </form>
        </div>
        <?php
    }
}

// put it in a variable so other plugins can use our reusable methods.
$ourWordFilterPlugin = new OurWordFilterPlugin; 


?>