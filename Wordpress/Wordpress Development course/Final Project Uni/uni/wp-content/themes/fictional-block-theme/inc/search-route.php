<?php

add_action('rest_api_init', 'universityRegisterSearch');

// function universityRegisterSearch(){
//     return register_rest_route('name','rout',array(
//         ''=>''
//     ));
// }
function universityRegisterSearch()
{
    register_rest_route('university/v1', 'search', array(
        'method'=>'WP_REST_SERVER::READABLE',
        'callback' => 'universitySearchResults'
    ));
}
function universitySearchResults($data)
{
    $mainQuery = new WP_Query(array(
        'post_type' => array('post', 'page', 'professor', 'program', 'campus', 'event'),
        's' => sanitize_text_field($data['term'])
    ));

    //$professors->posts, this is what we can return
    // to only return a few we use array with while
    $results = array(
        'generalInfo' => array(),
        'professors' => array(),
        'programs' => array(),
        'events' => array(),
        'campuses' => array()

    );

    // because we use a while we have access to any information from posts
    while ($mainQuery->have_posts()) {
        // this we had access to the posts
        $mainQuery->the_post();
        if (get_post_type() == 'post' or get_post_type() == 'page') {
            array_push($results['generalInfo'], array(
                'id' => get_the_ID(),
                'title' => get_the_title(),
                'permalink' => get_the_permalink(),
                'postType' => get_post_type(),
                'authorName' => get_the_author()
            ));
        }
        if (get_post_type() == 'professor') {
            array_push($results['professors'], array(
                'id' => get_the_ID(),
                'title' => get_the_title(),
                'permalink' => get_the_permalink(),
                // zero means the current post
                'postThumbnail' => get_the_post_thumbnail_url(0, 'professorLandscape')));
        }
        if (get_post_type() == 'program') {
            $relatedCampuses = get_field('related_campus');
            if($relatedCampuses){
                foreach($relatedCampuses as $campus){
                    array_push($results['campuses'], array(
                        'title' => get_the_title($campus),
                        'permalink' => get_the_permalink($campus)));
                }
            }
            array_push($results['programs'], array(
                'id' => get_the_ID(),
                'title' => get_the_title(),
                'permalink' => get_the_permalink()));
        }
        if (get_post_type() == 'event') {
            $eventDate = new DateTime(get_field('event_date', false, false));
            $description = null;
            if (has_excerpt()) {
                $description = get_the_excerpt();
            } else {
                $description = wp_trim_words(get_the_content(), 18);
            }
            array_push($results['events'], array(
                'id' => get_the_ID(),
                'title' => get_the_title(),
                'permalink' => get_the_permalink(),
                'month' => $eventDate->format('M'),
                'day' => $eventDate->format('d'),
                'description' => $description

            ));
        }
        if (get_post_type() == 'campus') {
            array_push($results['campuses'], array(
                'id' => get_the_ID(),
                'title' => get_the_title(),
                'permalink' => get_the_permalink()));
        }
    }


    if ($results['programs'] or $results['events']) {
        $meta_query = array('relation' => 'OR');
        foreach ($results['programs'] as $item) {
            array_push($meta_query, array(
                'key'       => 'related_programs',
                'value'     => '"'.$item['id'].'"',
                'compare'   => 'LIKE'
            ));
        }
        $programRelationship = new WP_Query(array(
            'post_type' => array('professor', 'event'),
            'meta_query' => $meta_query
            ));

        while ($programRelationship->have_posts()) {
            $programRelationship->the_post();
            if (get_post_type() == 'professor') {
                array_push($results['professors'], array(
                    'id' => get_the_ID(),
                    'title' => get_the_title(),
                    'permalink' => get_the_permalink(),
                    // zero means the current post
                    'postThumbnail' => get_the_post_thumbnail_url(0, 'professorLandscape')));
            }
            if (get_post_type() == 'event') {
                $eventDate = new DateTime(get_field('event_date', false, false));
                $description = null;
                if (has_excerpt()) {
                    $description = get_the_excerpt();
                } else {
                    $description = wp_trim_words(get_the_content(), 18);
                }
                array_push($results['events'], array(
                    'id' => get_the_ID(),
                    'title' => get_the_title(),
                    'permalink' => get_the_permalink(),
                    'month' => $eventDate->format('M'),
                    'day' => $eventDate->format('d'),
                    'description' => $description));
            }
        }
        $results['professors'] = array_values(array_unique($results['professors'], SORT_REGULAR));
        $results['events'] = array_values(array_unique($results['events'], SORT_REGULAR));
    }
    //the relationship for campuses is inside the program, because of the few number of campus compared to program

    return $results;
}
