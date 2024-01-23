
<?php
while (have_posts()) {
    the_post(); 
    pageBanner();
    ?>
    <div class="container container--narrow page-section">
        
        <div class="generic-content" >
       <div class="row group">
        <div class="one-third">
        <?php the_post_thumbnail('professorPortrait') ?>
         </div>
        <div class="two-thirds">
            <?php 
                $likeCount = new WP_Query(array(
                    'post_type' => 'like',
                    // pull only for this prof
                    'meta_query' => array(
                        array(
                            'key'=> 'liked_professor_id' ,
                            'compare' => '=',
                            'value' => get_the_ID()
                        )
                    )
                ));
                $existStatus = 'no';
                if(is_user_logged_in()){
                    $existQuery = new WP_Query(array(
                        'author' => get_current_user_id(),
                        'post_type' => 'like',
                        'meta_query' => array(
                            array(
                                'key'=> 'liked_professor_id' ,
                                'compare' => '=',
                                'value' => get_the_ID()
                            )
                        )
                    ));
                    $existQuery->have_posts()  ?  $existStatus = 'yes' : '';
                }               
            ?>
            <span class="like-box" data-like="<?php echo $existQuery->posts[0]->ID; ?>" data-professor="<?php the_ID() ?>" data-exists="<?php echo $existStatus ?>">
                <i class="fa fa-heart-o" aria-hidden="true"></i>
                <i class="fa fa-heart" aria-hidden="true"></i>
                <span class="like-count"><?php echo isset($likeCount->found_posts)? $likeCount->found_posts : 0; ?></span>
            </span>
        <?php the_content(); ?>
        </div>
       </div>
       </div>
        
        <?php
        $relatedPrograms = get_field('related_programs');
    // print_r($relatedPrograms); // prints all sort of information about that variable print_r
    if ($relatedPrograms) {
        echo '<hr class="section-break">';
        echo '<h2 class="headline headline--medium"> Subject(s) Taught </h2>';
        echo '<ul class="link-list min-list">';
        foreach ($relatedPrograms as $program) {
        // echo $program->post_title;
            ?>
        <li><a href="<?php echo get_the_permalink($program) ?>">
        <?php echo get_the_title($program); // accepts an id or a post object?>
        </a></li>
        <?php
        }
        echo '</ul>';
        ?>
    <?php
    }
    ?>
    
    </div>
    <?php
}
?>
