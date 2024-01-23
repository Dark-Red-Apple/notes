<?php
get_header();
?>

<?php
while (have_posts()) {
    the_post(); 
    pageBanner();
    ?>

    <div class="container container--narrow page-section">
    <div class="metabox metabox--position-up metabox--with-home-link">
        <p>
          <a class="metabox__blog-home-link" href="<?php echo get_post_type_archive_link('campus'); ?>">
          <i class="fa fa-home" aria-hidden="true">
          </i> All Campuses </a> 
          <span class="metabox__main"><?php the_title() ?></span>
        </p>
      </div>
        <div class="generic-content" >
            <?php the_content(); 
            $mapLocation = get_field('map_location');
            ?>
            <div class="acf-map">
                <div class='marker' data-lat='<?php echo $mapLocation['lat']; ?>' 
                data-lng='<?php echo $mapLocation['lng']; ?>' >
                <h3><?php the_title(); ?></h3>
                <?php echo $mapLocation['address'] ?>
                </div>
            </div>
        </div>
        <?php
        // do I need to write the code or have I used something similar before? events in home-page

    $campusRelatedPrograms = new WP_Query(array(
    'posts_per_page' => -1,
    'post_type' => 'program',
    'orderby' => 'title',
    'order' => 'ASC',
    'meta_query' => array(
        array(
        'key' => 'related_campus',
        'compare' => 'LIKE',
        'value' => '"'.get_the_ID().'"'
        )
    )
    ));
    // you can not use $homePageEvents as it does not return empty, it's an object
if ($campusRelatedPrograms->have_posts()) {
    echo '<hr class = "section-break">';
    echo '<h2 class="headline headline--medium"> Programs available at this campus </h2>';

    echo '<ul class="min-list link-list">';
    while ($campusRelatedPrograms->have_posts()) {
        $campusRelatedPrograms->the_post();
        ?>
            <li class="">
                <a class="" href="<?php the_permalink() ?>">
                    <span class="">
                        <?php the_title()?>
                    </span>
                </a>
            </li>
            <?php

    }
    echo '</ul>';
}
?>
        
</div>

    <?php
}
?>


<?php
get_footer();

?>