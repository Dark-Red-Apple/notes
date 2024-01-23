<?php
/**
* Plugin Name: contactsinfoinfo
* Plugin URI: localhost/wpreact
* Description: Test.
* Version: 0.1
* Author: Alma
* Author URI: localhost/wpreact
**/

add_action( 'init', 'create_contactsinfo' );
function create_contactsinfo() {
  $labels = array(
    'name'               => _x( 'contactsinfo', 'post type general name', 'your-plugin-textdomain' ),
    'singular_name'      => _x( 'contactinfo', 'post type singular name', 'your-plugin-textdomain' ),
    'menu_name'          => _x( 'contactsinfo', 'admin menu', 'your-plugin-textdomain' ),
    'name_admin_bar'     => _x( 'contactsinfo', 'add new on admin bar', 'your-plugin-textdomain' ),
    'add_new'            => _x( 'Add New', 'contactsinfo', 'your-plugin-textdomain' ),
    'add_new_item'       => __( 'Add New contactsinfo', 'your-plugin-textdomain' ),
    'new_item'           => __( 'New contactsinfo', 'your-plugin-textdomain' ),
    'edit_item'          => __( 'Edit contactsinfo', 'your-plugin-textdomain' ),
    'view_item'          => __( 'View contactsinfo', 'your-plugin-textdomain' ),
    'all_items'          => __( 'All contactsinfo', 'your-plugin-textdomain' ),
    'search_items'       => __( 'Search contactsinfo', 'your-plugin-textdomain' ),
    'parent_item_colon'  => __( 'Parent contactsinfo:', 'your-plugin-textdomain' ),
    'not_found'          => __( 'No contactsinfo found.', 'your-plugin-textdomain' ),
    'not_found_in_trash' => __( 'No contactsinfo found in Trash.', 'your-plugin-textdomain' )
  );

  $args = array(
    'labels'             => $labels,
    'description'        => __( 'Description.', 'your-plugin-textdomain' ),
    'public'             => true,
    'publicly_queryable' => true,
    'show_ui'            => true,
    'show_in_menu'       => true,
    'query_var'          => true,
    'rewrite'            => array( 'slug' => 'contactsinfo' ),
    'capability_type'    => 'post',
    'has_archive'        => true,
    'hierarchical'       => false,
    'menu_position'      => null,
    'show_in_rest'       => true,
    'rest_base'          => 'contactsinfo',
    'rest_controller_class' => 'WP_REST_Posts_Controller',
    'supports'           => array( 'title', 'editor', 'author', 'thumbnail', 'excerpt', 'comments' )
  );
  
  register_post_type( 'contactsinfo', $args );
}

// add_action( 'rest_api_init', function () {
//   register_rest_route( 'contactsinfo/v1', '/alma/(?P<id>\d+)', array(
//     'methods' => 'GET',
//     'callback' => 'my_awesome_func',
//     'args' => array(
//       'id' => array(
//         'validate_callback' => function($param, $request, $key) {
//           return is_numeric( $param );
//         }
//       ),
//     ),
//   ) );
// } );


// function my_awesome_func( $data ) {
//   // $posts = get_posts( array(
//   //   'author' => $data['id'],
//   // ) );

//   // if ( empty( $posts ) ) {
//   //   return new WP_Error( 'no_author', 'Invalid author', array( 'status' => 404 ) );
//   // }

//   // return $posts[0]->post_title;


//   $posts = get_posts();
//   return $posts;
// }