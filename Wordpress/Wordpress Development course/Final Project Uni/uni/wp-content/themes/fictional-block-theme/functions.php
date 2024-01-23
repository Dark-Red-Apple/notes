<?php


require get_theme_file_path('/inc/search-route.php');
require get_theme_file_path('/inc/like-route.php');

//add a new property to the rest api response
// by default we don't have the author name in rest to have a page based on that (posts of an author)
//
function university_custom_rest()
{
    register_rest_field('post', 'authorName', array(
        'get_callback' => function () {
            return get_the_author();
        }
    ));
    register_rest_field('note', 'userNoteCount', array(
        'get_callback' => function () {
            return count_user_posts(get_current_user_id(), 'note');
        }
    ));
}
add_action('rest_api_init', 'university_custom_rest');

function pageBanner($args = null)
{
    if (!$args['title']) {
        $args['title'] = get_the_title();
    }
    if (!$args['subtitle']) {
        $args['subtitle'] = get_field('page_banner_subtitle');
    }
    if (!$args['photo']) {
        $pageBanner = get_field('page_banner_background_image');
        if ($pageBanner) {
            $args['photo'] = $pageBanner['sizes']['pageBanner'];
        } else {
            $args['photo'] = get_theme_file_uri('/images/ocean.jpg');
        }
    }
    ?>
    <div class="page-banner">
    <div class="page-banner__bg-image" 
    style="background-image: url(
        <?php echo $args['photo'] ?>)"></div>
    <div class="page-banner__content container container--narrow">
    <h1 class="page-banner__title"><?php echo $args['title'] ?></h1>
    <div class="page-banner__intro">
        <p><?php echo $args['subtitle'] ?></p>
    </div>
    </div>
</div>

<?php
}

function site_resources()
{
    wp_enqueue_script('googleMap', '//maps.googleapis.com/maps/api/js', null, microtime(), true);
    // wp_enqueue_script('main-university-js', get_theme_file_uri('/src/scripts-bundled.js'), null, microtime(), true);
    wp_enqueue_script('main-university-js', get_theme_file_uri('/build/index.js'), null, microtime(), true);
    // I don't know how to use build/index.js for search and notes it does not work
    wp_enqueue_script('main-university2-js', get_theme_file_uri('/src/scripts-bundled.js'), null, microtime(), true);
    // wp_enqueue_script('main-university3-js', get_theme_file_uri('/src/scripts-b.js'), null, microtime(), true);
    wp_enqueue_style('font-awsome', '//maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css'); //name does not matter
    wp_enqueue_style('custom-font', '//fonts.googleapis.com/css?family=Roboto+Condensed:300,300i,400,400i,700,700i|Roboto:100,300,400,400i,700,700i'); //name does not matter
    wp_enqueue_style('site', get_stylesheet_uri()); // name of style and the address to file
    wp_enqueue_style('style2', get_theme_file_uri('/css/style2.css')); // because of module glide that slide shows have we need this
    wp_localize_script('main-university-js', 'universityData', array(
        'root_url'=> get_site_url(),
        'nonce' => wp_create_nonce('wp_rest')
    ));
}

add_action('wp_enqueue_scripts', 'site_resources');

function university_features()
{
    // register_nav_menu('header-menu-location', 'Header menu location');
    // register_nav_menu('footer-location-one', 'Footer Location one');
    // register_nav_menu('footer-location-two', 'Footer Location Two');
    add_theme_support('title-tag'); // what feature of the function we are interested in: title-tag
    add_theme_support('post-thumbnails'); // enables only for blog post
    add_image_size('professorLandscape', 400, 260, true);
    add_image_size('professorPortrait', 480, 650, true);
    add_image_size('pageBanner', 1500, 350, true);
    add_theme_support('editor-style');
    //must be https
    add_editor_style(array('https//fonts.googleapis.com/css?family=Roboto+Condensed:300,300i,400,400i,700,700i|Roboto:100,300,400,400i,700,700i','build/style-index.css', 'build/index.css'));
}

add_action('after_setup_theme', 'university_features');

function university_adjust_queries($query)
{
    if (!is_admin() and is_post_type_archive('event') and $query->is_main_query()) {
        $today = date('Ymd');
        $query->set('meta_key', 'event_date');
        $query->set('orderby', 'meta_value_num');
        $query->set('order', 'ASC');
        $query->set('meta_query', array(
            array(
            'key' => 'event_date',
            'compare' => '>=',
            'value' => $today,
            'type' => 'numeric',
            )
        ));
    }

    if (!is_admin() and is_post_type_archive('program') and $query->is_main_query()) {
        $query->set('orderby', 'title');
        $query->set('order', 'ASC');
        $query->set('posts_per_page', -1);
    }

    if (!is_admin() and is_post_type_archive('campus') and $query->is_main_query()) {
        $query->set('posts_per_page', -1);
    }
}
add_action('pre_get_posts', 'university_adjust_queries');

// function universityMapKey($api){ // the $api is available to us by acf, we change it return it.
//     $api['key'] = 'google maps api key';
//     return $api;
// }

// add_filter('acf/fields/google_map/api', 'universityMapKey'); // google map is the type of the field.

//redirect subscriber accounts out of admin and onto homepage
add_action('admin_init', 'redirectSubsToFrontend');

function redirectSubsToFrontend()
{
    $ourCurrentUser = wp_get_current_user();

    //roles is an array
    if (count($ourCurrentUser->roles) == 1 and $ourCurrentUser->roles[0] == 'subscriber') {
        wp_redirect(site_url('/'));
        // tell wordpress stop spinning its gears when redirecting
        exit;
    }
}
add_action('wp_loaded', 'noSubsAdminBar');

function noSubsAdminBar()
{
    $ourCurrentUser = wp_get_current_user();

    //roles is an array
    if (count($ourCurrentUser->roles) == 1 and $ourCurrentUser->roles[0] == 'subscriber') {
        show_admin_bar(false);
    }
}

//customize login screen

add_filter('login_headerurl', 'ourHeaderUrl');

function ourHeaderUrl()
{
    return esc_url(site_url('/'));
}

add_action('login_enqueue_scripts', 'ourLoginCSS');

function ourLoginCss()
{
    wp_enqueue_style('site', get_stylesheet_uri());
    wp_enqueue_style('custom-font', '//fonts.googleapis.com/css?family=Roboto+Condensed:300,300i,400,400i,700,700i|Roboto:100,300,400,400i,700,700i'); //name does not matter
}

add_filter('login_headertitle', 'ourLoginTitle');

function ourLoginTitle()
{
    //return what you want to show
    return get_bloginfo('name');
}

//force note posts to be private
// the hook is one of the most powerful functions.
add_filter('wp_insert_post_data', 'makeNotePrivate', 10, 2);

//	$post_arr = wp_insert_post_data does not pass the id by $data - first argument, we need a second argument
function makeNotePrivate($data, $postarr)
{
    //
    if ($data['post_type'] == 'note') {
        if (count_user_posts(get_current_user_id(), 'note') > 4 and !$postarr['ID']) {
            die("You have reached your note limit!");
        }
        $data['post_content'] = sanitize_textarea_field($data['post_content']);
        $data['post_title'] = sanitize_text_field($data['post_title']);
    }
    if ($data['post_type'] == 'note' and $data['post_status'] != 'trash') {
        $data['post_status'] = 'private';
    }
    return $data;
}

//disable block editor
// add_filter('use_block_editor_for_post', '__return_false');

class PlaceholderBlock
{
    public $name;

    public function __construct($name)
    {
        $this->name = $name;
        add_action('init', array($this,'onInit'));
    }

    public function ourRenderCallback($attributes, $content)
    {
        // the var {} works only with ""
        ob_start(); // anything in between will be treated as a big string of text
        require get_theme_file_path("/our-blocks/{$this->name}.php");
        return ob_get_clean();
    }

    public function onInit()
    {
        // no need for build version, no jsx
        wp_register_script($this->name, get_stylesheet_directory_uri() . "/our-blocks/{$this->name}.js", array('wp-blocks','wp-editor'));

        register_block_type("ourblocktheme/{$this->name}", array(
            'editor_script' => $this->name,
            'render_callback' => [$this, 'ourRenderCallback']
        ));
    }
}

new PlaceholderBlock("eventsandblogs");
new PlaceholderBlock("header");
new PlaceholderBlock("footer");
new PlaceholderBlock("singlepost");
new PlaceholderBlock("page");
new PlaceholderBlock("blogindex");
new PlaceholderBlock("programarchive");
new PlaceholderBlock("singleprogram");
new PlaceholderBlock("singleprofessor");
new PlaceholderBlock("mynotes");

// This class is used to create the block in Editor
class JSXBlock
{
    public $name;
    public $renderCallback;
    public $data;
    public function __construct($name, $renderCallback = null, $data = null)
    {
        $this->data = $data;
        $this->name = $name;
        $this->renderCallback = $renderCallback;
        add_action('init', array($this,'onInit'));
    }

    public function ourRenderCallback($attributes, $content)
    {
        // the var {} works only with ""
        ob_start(); // anything in between will be treated as a big string of text
        require get_theme_file_path("/our-blocks/{$this->name}.php");
        return ob_get_clean();
    }

    public function onInit()
    {
        wp_register_script($this->name, get_stylesheet_directory_uri() . "/build/{$this->name}.js", array('wp-blocks','wp-editor'));

        if ($this->data) {
            // to localize some json with the script we registered above
            // the second arg is the var name we can access in js
            new JSXBlock('banner', true, ['fallbackimage' => get_theme_file_uri('/images/li')]);
            wp_localize_script($this->name, $this->name, $this->data);
        }

        $ourArgs =  array(
            'editor_script' => $this->name
        );
        $this->renderCallback == true ? $ourArgs['render_callback'] = [$this, 'ourRenderCallback'] : '';
        register_block_type("ourblocktheme/{$this->name}", $ourArgs);
    }
}

new JSXBlock('banner', true, ['fallbackimage' => get_theme_file_uri('/images/library-hero.jpg')]);
new JSXBlock('genericheading');
new JSXBlock('genericbutton');
new JSXBlock('slideshow', true);
new JSXBlock('slide', true, ['themeimagepath' => get_theme_file_uri('/images/')]);

function myallowedblocks($allowed_block_types, $editor_context)
{
    // deafutl block types allowed => allowed_block_types_all
    // page/post editor screen
    if (!empty($editor_context->post)) {
        return $allowed_block_types;
    }
    return $allowed_block_types;

    //FSE Screen
    // return array('ourblocktheme/header', 'ourblocktheme/footer')
}

add_filter('allowed_block_types_all', 'myallowedblocks', 10, 2);
