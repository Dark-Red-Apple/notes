
<?php

/*

Plugin Name: Featured Professor Block Type
Description: Featured prof
Version: 1.0
Author: Alma
Text Domain: featured-professor
Domain Path: /languages

*/

if (!defined('ABSPATH')) {
    exit;
}

require_once plugin_dir_path(__FILE__) . 'inc/generateProfessorHTML.php';
require_once plugin_dir_path(__FILE__) . 'inc/relatedPostsHTML.php';

class FeaturedProfessor
{
    function __construct()
    {
        add_action('init', [$this, 'onInit']);
        add_action('rest_api_init',[$this, 'profHTML']);
        add_filter('the_content', [$this, 'addRelatedPosts']);
    }
// add the posts that featured profs in 
    function addRelatedPosts($content){
        if(is_singular('professor') && in_the_loop() && is_main_query()){
            // function in a different file and require it!
            //has access the to the current id;
            return $content . relatedPostsHTML(get_the_id()); 
        }
        return $content;
    }

    function profHTML(){
        register_rest_route('featuredProfessor/v1','getHTML', array(
            'methods' => WP_REST_SERVER::READABLE,
            'callback' => [$this, 'getProfHTML']
        ));
    }

    function getProfHTML($data){
        // return json, single string of text is valid json
        return generateProfessorHTML($data['profId']);
    }
    
    public function onInit() {
        // support translation for this plugin
        load_plugin_textdomain('featured-professor',false, dirname(plugin_basename(__FILE__)) . '/languages');

        register_meta('post', 'featuredprofessor', array(
            'show_in_rest' => true,
            'type' => 'number',
            'single' => false
        ));

        // the names are index.css;
        // it is wp-element no wp-elements be careful
        wp_register_script('featuredProfessorScript', plugin_dir_url(__FILE__) . 'build/index.js', array("wp-blocks", "wp-element", "wp-editor"));
        wp_register_style('featuredProfessorStyle', plugin_dir_url(__FILE__) . 'build/index.css');

        //tie the javascript file to translation system
        wp_set_script_translations('featuredProfessorScript', 'featured-professor', plugin_dir_path(__FILE__) . '/languages');

        register_block_type('ourplugin/featured-professor', array(
            'render_callback' => [$this, 'renderCallback'],
            'editor_script' => 'featuredProfessorScript',
            'editor_style' => 'featuredProfessorStyle'
        ));
    }

    function renderCallback($attributes){

        if($attributes['profId']){
            wp_enqueue_style('featuredProfessorStyle');
            return generateProfessorHTML($attributes['profId']);
        }else{
            return NULL;
        }
    }
}

$featuredProfessor = new FeaturedProfessor();