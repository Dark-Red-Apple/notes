<?php
while (have_posts()) {
    the_post();
    pageBanner();
    ?>

    <div class="container container--narrow page-section">
    <div class="metabox metabox--position-up metabox--with-home-link">
        <p>
          <a class="metabox__blog-home-link" href="<?php echo get_post_type_archive_link('program'); ?>">
          <i class="fa fa-home" aria-hidden="true">
          </i> All programs </a> 
          <span class="metabox__main"><?php the_title() ?></span>
        </p>
      </div>
        <div class="generic-content" >
            <?php the_field('main_body_content'); ?>
        </div>
        <?php
        // do I need to write the code or have I used something similar before? events in home-page

    $programRelatedProf = new WP_Query(array(
    'posts_per_page' => -1,
    'post_type' => 'professor',
    'orderby' => 'title',
    'order' => 'ASC',
    'meta_query' => array(
        array(
        'key' => 'related_programs',
        'compare' => 'LIKE',
        'value' => '"'.get_the_ID().'"'
        )
    )
    ));
    // you can not use $homePageEvents as it does not return empty, it's an object
    if ($programRelatedProf->have_posts()) {
        echo '<hr class = "section-break">';
        echo '<h2 class="headline headline--medium">' . get_the_title()  .'Professors </h2>';

        echo '<ul class="professor-cards">';
        while ($programRelatedProf->have_posts()) {
            $programRelatedProf->the_post();
            ?>
            <li class="professor-card__list-item">
                <a class="professor-card" href="<?php the_permalink() ?>">
                    <img class="professor-card__image" src="<?php the_post_thumbnail_url('professorLandscape'); ?>">
                    <span class="professor-card__name">
                        <?php the_title()?>
                    </span>
                </a>
            </li>
            <?php

        }
        echo '</ul>';
    }

    wp_reset_postdata();

    $today = date('Ymd');
    $homePageEvents = new WP_Query(array(
    'posts_per_page' => 2,
    'post_type' => 'event',
    'meta_key' => 'event_date',
    'orderby' => 'meta_value_num',
    'order' => 'ASC',
    'meta_query' => array(
        array(
        'key' => 'event_date',
        'compare' => '>=',
        'value' => $today,
        'type' => 'numeric',
        ),
        array(
        'key' => 'related_programs',
        'compare' => 'LIKE',
        'value' => '"'.get_the_ID().'"'
        )
    )
    ));
    // you can not use only $homePageEvents for if as it does not return empty, it's an object
    // this only shows the header if there is post
    if ($homePageEvents->have_posts()) {
        echo '<hr class = "section-break">';
        echo '<h2 class="headline headline--medium">Upcoming ' . get_the_title()  .' events </h2>';
    }
    while ($homePageEvents->have_posts()) {
        $homePageEvents->the_post();
        get_template_part('template-parts/content', 'event');
    }

    echo '<hr class="section-break">';

    wp_reset_postdata(); // don't forget this we are going back to default. get_field gives the true information of the relationship
    $relatedCampuses = get_field('related_campus');

    if ($relatedCampuses) {
        echo '<h2 class="headline headline--medium">'.get_the_title().' is available at this campuses</h2>';
    }

    echo '<ul class="min-list link-list">';
    if ($relatedCampuses) {
        foreach ($relatedCampuses as $campus) {
            ?>
                    <li><a href="<?php get_the_permalink($campus)?>"><?php echo get_the_title($campus) ?></a></li>
                <?php
        }
    }
    echo '</ul>'
    ?>

        
</div>

    <?php
}
?>
