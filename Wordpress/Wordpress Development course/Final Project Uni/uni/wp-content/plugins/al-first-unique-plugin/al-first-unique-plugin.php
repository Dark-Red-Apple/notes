<?php

/*
Plugin Name: Our Test Plugin!
Description: A truly amazing plugin
Version: 1.0
Author: Brad
Author URI: https://www.al.com
Text Domain: wcpdomain
Domain Path: /languages

*/

class WordCountAndTimePlugin
{
    //you can put the add_action and filter in the construct
    public function __construct()
    {
        add_action('admin_menu', array($this, 'adminPage'));
        add_action('admin_init', array($this, 'settings'));
        //check if the user is in single blog post screen and have checked one of checkboxes;
        add_filter('the_content', array($this, 'ifWrap'));
        add_action('init', array($this, 'languages'));
    }

    public function languages()
    {
        //wcp is word count plugin 
        load_plugin_textdomain('wcpdomain', false, dirname(plugin_basename(__FILE__)).'/languages');
    }

    public function ifWrap($content)
    {
        // 1 in get_option is the default value when plugin is installed it is not is not in the dabase
        if (is_main_query() and is_single() and (get_option('wcp_wordcount', '1') or get_option('wcp_charactercount', '1') or get_option('wcp_readtime', '1'))) {
            // call the method
            return $this->createHTML($content);
        }

        return $content;
    }

    public function createHtml($content)
    {
        $html = '<h3>' . esc_html(get_option('wcp_headline', 'Post Statistics')) . '</h3><p>';

        if (get_option('wcp_wordcount', '1') or get_option('wcp_readtime', '1')) {
            // php function
            $wordCount = str_word_count(strip_tags($content));
        }

        if (get_option('wcp_wordcount', '1')) {
            $html .= __('This post has', 'wcpdomain').' ' .  $wordCount . ' '.__('words', 'wcpdomain').' <br>';
        }

        if (get_option('wcp_charactercount', '1')) {
            $html .= 'This post has ' .  strlen(strip_tags($content)) . ' characters. <br>';
        }

        if (get_option('wcp_readtime', '1')) {
            $html .= 'This post will take about ' .  round($wordCount/255) . ' minute(s) to read. <br>';
        }

        $html .= '</p>';

        // both zero are string
        if (get_option('wcp_location', '0') == '0') {
            return $html . $content;
        }

        return $content . $html;
    }

    public function settings()
    {
        //the name of the, this is like an api
        add_settings_section('wcp_first_section', null, null, 'word-count-settings-page');

        add_settings_field('wcp_location', 'Display Location', array($this, 'locationHTML'), 'word-count-settings-page', 'wcp_first_section');
        //'the name of setting group' = 'wordcountplugin'
        register_setting('wordcountplugin', 'wcp_location', array('sanitize_callback' => array($this, 'sanitizeLocation'), 'default' => '0'));

        add_settings_field('wcp_headline', 'Headline Text', array($this, 'headlineHTML'), 'word-count-settings-page', 'wcp_first_section');
        //Pass argument to html callback func array(name of property => value), array('theName' => 'wcp_wordcount')
        register_setting('wordcountplugin', 'wcp_headline', array('sanitize_callback' => 'sanitize_text_field', 'default' => 'Post Statistics'));

        add_settings_field('wcp_wordcount', 'word Count', array($this, 'checkboxHTML'), 'word-count-settings-page', 'wcp_first_section', array('theName' => 'wcp_wordcount'));
        register_setting('wordcountplugin', 'wcp_wordcount', array('sanitize_callback' => 'sanitize_text_field', 'default' => '1'));

        add_settings_field('wcp_charactercount', 'Character Count', array($this, 'checkboxHTML'), 'word-count-settings-page', 'wcp_first_section', array('theName' => 'wcp_charactercount'));
        register_setting('wordcountplugin', 'wcp_charactercount', array('sanitize_callback' => 'sanitize_text_field', 'default' => '1'));

        add_settings_field('wcp_readtime', 'Read Time', array($this, 'checkboxHTML'), 'word-count-settings-page', 'wcp_first_section', array('theName' => 'wcp_readtime'));
        register_setting('wordcountplugin', 'wcp_readtime', array('sanitize_callback' => 'sanitize_text_field', 'default' => '1'));
    }

    public function sanitizeLocation($input)
    {
        if ($input != '0' and $input != '1') {
            //wordpress add the slug like id=slug
            add_settings_error('wcp_location', 'wcp_location_error', 'Display location must be either beginning or end');
            return get_option('wcp_location');
        }

        return $input;
    }

    public function locationHTML()
    { ?>

        <!-- match the name we gave to add setting field  -->
        <select name="wcp_location">
            <option value="0" <?php selected(get_option('wcp_location'), 0) ?>>Beginning Of Post</option>
            <option value="1" <?php selected(get_option('wcp_location'), 1) ?>>End of Post</option>
        </select>

    <?php }

    public function headlineHTML()
    { ?>

        <input type="text" name="wcp_headline" value = "<?php echo esc_attr(get_option('wcp_headline')) ?>" placeholder="Please write your headline">

    <?php }

    public function checkboxHTML($args)
    { ?>

        <input type="checkbox" name="<?php echo $args['theName'] ?>" value = "1" <?php checked(get_option($args['theName']), 1) ?>>

    <?php }

    public function adminPage()
    {
        // manage options = the current user can change options in wordpress
        // name, url
        // esc_html__ ('original text', 'text domain') // no one can put html in translated content
        add_options_page('Word Count Setting', esc_html__('Word Count', 'wcpdomain'), 'manage_options', 'word-count-settings-page', array($this,'ourHTML'));
    }

    public function ourHTML()
    { ?>
    
    <div class="wrap">
        <h1>Word Count Settings</h1>
        <form action="options.php" method="POST">
            <?php
                // define the field group so wordpress will add the hidden html values with the nonce and action value security and permission
                settings_fields('wordcountplugin');
        do_settings_sections('word-count-settings-page');
        // wordpress save blue button
        submit_button();
        ?>
        </form>
    </div>
    
    <?php }
    }

$wordCountAndTimePlugin = new WordCountAndTimePlugin();



?>