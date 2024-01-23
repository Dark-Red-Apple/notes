<?php


function new_post_type()
{
    register_post_type('event', array(
        'capability_type' => 'event',
        'map_meta_cap' => true,
        'supports' => array('title','editor','excerpt', 'custom-fields'),
        'rewrite' => array('slug'=> 'events'),
        'has_archive' => true,
        'public' => true,
        'labels' => array( // the names that are shown in wordpress
            'name' => 'Events',
            'add_new_item' => 'Add New EVent',
            'edit_item' => 'Edit Event',
            'all_items' => 'All Events',
            'singular_name' => 'Event',

        ),
        'menu_icon' => 'dashicons-calendar',


    ));

    //program post type
    register_post_type('program', array(
        'supports' => array('title'),
        'rewrite' => array('slug'=> 'programs'),
        'has_archive' => true,
        'public' => true,
        'labels' => array( // the names that are shown in wordpress
            'name' => 'Programs',
            'add_new_item' => 'Add New program',
            'edit_item' => 'Edit Program',
            'all_items' => 'All Programs',
            'singular_name' => 'Program',

        ),
        'menu_icon' => 'dashicons-awards',


    ));

    //program post type
    register_post_type('professor', array(
        'show_in_rest'=> true,
        'supports' => array('title','editor', 'thumbnail'),
        'public' => true,
        'labels' => array( // the names that are shown in wordpress
            'name' => 'Professors', // what it is shown in backend
            'add_new_item' => 'Add New Professor',
            'edit_item' => 'Edit Professor',
            'all_items' => 'All Professors',
            'singular_name' => 'Professor',

        ),
        'menu_icon' => 'dashicons-welcome-learn-more',


    ));

    // campus post type
    register_post_type('campus', array(
        'capability_type' => 'campus', // it does not need to be named campus just a name
        'map_meta_cap' => true,
        'supports' => array('title','editor','excerpt', 'custom-fields'),
        'rewrite' => array('slug'=> 'campuses'),
        'has_archive' => true,
        'public' => true,
        'labels' => array( // the names that are shown in wordpress
            'name' => 'Campuses',
            'add_new_item' => 'Add New Campus',
            'edit_item' => 'Edit Campus',
            'all_items' => 'All Campuses',
            'singular_name' => 'Campus',

        ),
        'menu_icon' => 'dashicons-location-alt',


    ));

    // we don't want to give them access to all posts just note
    register_post_type('note', array(
        'capability_type' => 'note',
        'map_meta_cap' => true,
        'show_in_rest'=> true,
        'supports' => array('title', 'editor'),
        // don't show it in public queries or search result only, specific to user account, it also hides in dashboard
        'public' => false,
        // to show it dashboard
        'show_ui' => true,
        'labels' => array(
            'name' => 'Notes',
            'add_new_item' => 'Add New Note',
            'edit_item' => 'Edit Note',
            'all_items' => 'All Notes',
            'singular_name' => 'Note'
        ),
        'menu_icon' => 'dashicons-welcome-write-blog'
    ));

    register_post_type('like', array(
        'supports' => array('title'),
        'public' => false,
        'show_ui' => true,
        'labels' => array(
            'name' => 'Likes',
            'add_new_item' => 'Add New Like',
            'edit_item' => 'Edit Like',
            'all_items' => 'All Likes',
            'singular_name' => 'Like'
        ),
        'menu_icon' => 'dashicons-heart'
    ));
}
add_action('init', 'new_post_type');
