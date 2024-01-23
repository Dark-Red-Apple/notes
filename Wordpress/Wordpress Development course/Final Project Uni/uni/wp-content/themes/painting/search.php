<?php


get_header();
pageBanner(array(
  'title' => 'Search Results',
//  &ldquo; html code for left double quote
//get_search_query() escapes value by default and takes even scripts as text, don't run them
  'subtitle' => 'You search for &ldquo;'.esc_html(get_search_query(false)).'&rdquo;'
))
?>

    <div class="container container--narrow page-section">
      <?php
      if(have_posts()){
        while (have_posts()) {
            the_post();
            // instead of hardcoding based on post type get the related tmeplate
            get_template_part('template-parts/content', get_post_type());
        }

        echo paginate_links();
      }else{
        echo '<h2n class="headline headline--small-plus">No Results match that search.</h2>';
      }
      get_search_form()
?>
    </div>

<?php
get_footer();
