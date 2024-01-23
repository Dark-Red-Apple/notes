<?php
/**
* Plugin Name: slides images
* Plugin URI: localhost/wpreact
* Description: Test.
* Version: 0.1
* Author: Alma
* Author URI: localhost/wpreact
**/

// using custom fields
function add_slider_post()
{
    register_post_type('slide', array(
        'supports' => array('title', 'editor', 'thumbnail', 'custom-field'),
        'public' => false,
        'show_ui' => true,
        'labels' => array(
            'name' => 'Slides',
            'add_new_item' => 'Add New Slides',
            'edit_item' => 'Edit Slides',
            'all_items' => 'All Slides',
            'singular_name' => 'Slide'
        ),
        'menu_icon' => 'dashicons-format-gallery',
    ));
}
add_action('init', 'add_slider_post');

function al_add_post_meta_box()
{
    add_meta_box(
        "post_metadata_slide_post",
        "Slide Sub",
        "post_meta_box_slides_post",
        "slide",
        "normal",
        "low"
    );
}
add_action('admin_init', "al_add_post_meta_box");

//fire the function when clicking update button
function al_save_post_meta_boxes($post_id)
{
   
    // Check if nonce is valid.
    if ( !isset($_POST[ 'cust_nonce' ]) || !wp_verify_nonce( $_POST['cust_nonce'], 'cust_nonce_action' ) ) {
        return $post_id; 
    }

    // Check if user has permissions to save data.
    if ( ! current_user_can( 'edit_post', $post_id ) ) {
        return;
    }

    // Check if not an autosave.
    if ( wp_is_post_autosave( $post_id ) ) {
        return;
    }

    // Check if not a revision.
    if ( wp_is_post_revision( $post_id ) ) {
        return;
    }
	
    // This is were you define the name of the field which is stored
    if (isset($_POST['slide_subtitle'])) {
        update_post_meta($post_id, "slide_subtitle", sanitize_text_field($_POST["slide_subtitle"]));
    }
}
add_action('save_post', 'al_save_post_meta_boxes');

function post_meta_box_slides_post()
{
    global $post;
    $custom = get_post_custom($post->ID);
    $fieldData = $custom["slide_subtitle"][0];
    wp_nonce_field( 'cust_nonce_action', 'cust_nonce' );
    echo '<input type="data" name="slide_subtitle" value="'.$fieldData.'" placeholder="Slide Subtitle">';
}
