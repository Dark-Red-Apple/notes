<?php

// add_action('rest_api_init', 'contactsinfo');

// function contactsinfo()
// {
//     register_rest_route('redapple/v1', 'contactsinfo', array(
//       'methods' => 'GET',
//       'callback' =>  'unires'

//     ));
    
// }

// function unires()
// {
//     $args = array(
//       'numberposts' => 9,
//       'post_type'   => 'contactsinfo'
//     );
//     $items = get_posts();
//     return $items;
// }

// add_action('rest_api_init', function () {
//     register_rest_route('redapple/v1', '/contactsinfo', array(
//         'methods' => 'POST',
//         'callback' => 'create_contact_from_data'
//     ));
// });

// function create_contact_from_data($req)
// {
//     $response['content'] = $req['content'];
//     $response['title'] = $req['title'];
//     $response['status'] = $req['status'];

//     $new_post = array(
//       'post_content'    => $req['content'],
//       'post_title'  => $req['title'],
//       'post_status'   => $req['status'],
//       'post_type'     => 'contactsinfo'
//       );

//     $pid = wp_insert_post($new_post);
//     $res = new WP_REST_Response($response);
//     $res->set_status(200);

//     return ['req' => $res];
// }

// http://localhost/wreact/wp-json/contactsinfo/v1/route

class Slug_Custom_Route extends WP_REST_Controller
{
    /**
     * Register the routes for the objects of the controller.
     */
    public function register_routes()
    {
        $version = '1';
        $namespace = 'redapple/v' . $version;
        $base = 'contactsinfo';
        register_rest_route($namespace, '/' . $base, array(
          array(
            'methods'             => WP_REST_Server::READABLE,
            'callback'            => array( $this, 'get_items' ),
            // 'permission_callback' => array( $this, 'get_items_permissions_check' ),
            'args'                => array(

            ),
          ),
          array(
            'methods'             => WP_REST_Server::CREATABLE,
            'callback'            => array( $this, 'create_item' ),
            // 'permission_callback' => array( $this, 'create_item_permissions_check' ),
            'args'                => $this->get_endpoint_args_for_item_schema(true),
          ),
        ));
        register_rest_route($namespace, '/' . $base . '/(?P<id>[\d]+)', array(
          array(
            'methods'             => WP_REST_Server::READABLE,
            'callback'            => array( $this, 'get_item' ),
            // 'permission_callback' => array( $this, 'get_item_permissions_check' ),
            'args'                => array(
              'context' => array(
                'default' => 'view',
              ),
            ),
          ),
          array(
            'methods'             => WP_REST_Server::EDITABLE,
            'callback'            => array( $this, 'update_item' ),
            // 'permission_callback' => array( $this, 'update_item_permissions_check' ),
            'args'                => $this->get_endpoint_args_for_item_schema(false),
          ),
          array(
            'methods'             => WP_REST_Server::DELETABLE,
            'callback'            => array( $this, 'delete_item' ),
            // 'permission_callback' => array( $this, 'delete_item_permissions_check' ),
            // 'args'                => array(
            //   'force' => array(
            //     'default' => false,
            //   ),
            // ),
          ),
        ));
        register_rest_route($namespace, '/' . $base . '/schema', array(
          'methods'  => WP_REST_Server::READABLE,
          'callback' => array( $this, 'get_public_item_schema' ),
        ));
    }

    /**
     * Get a collection of items
     *
     * @param WP_REST_Request $request Full data about the request.
     * @return WP_Error|WP_REST_Response
     */
    public function get_items($request)
    {
        $arggs = array(
          'numberposts' => 5,
          'post_type'   => 'contactsinfo'
        );
        $items = get_posts($arggs); //do a query, call another class, etc

        $data = array();
        foreach ($items as $item) {
            $itemdata = $this->prepare_item_for_response($item, $request);
            $data[] = $this->prepare_response_for_collection($itemdata);
        }
        // echo $data[0][0];
        return new WP_REST_Response($items, 200);
    }

    /**
     * Get one item from the collection
     *
     * @param WP_REST_Request $request Full data about the request.
     * @return WP_Error|WP_REST_Response
     */
    public function get_item($request)
    {

        $params = $request->get_params();
        $item = get_post($params["id"]);

        return new WP_REST_Response($item, 200);
    }

    /**
     * Create one item from the collection
     *
     * @param WP_REST_Request $request Full data about the request.
     * @return WP_Error|WP_REST_Response
     */
    public function create_item($request)
    {
      $response['content'] = $request['content'];
      $response['title'] = $request['title'];
      $response['status'] = $request['status'];
  
      $new_post = array(
        'post_content'    => $request['content'],
        'post_title'  => $request['title'],
        'post_status'   => $request['status'],
        'post_type'     => 'contactsinfo'
        );
  
      $pid = wp_insert_post($new_post);
      $res = new WP_REST_Response($response);
      $res->set_status(200);
  
      return new WP_REST_Response(['req' => $res], 200);

    }

    /**
     * Update one item from the collection
     *
     * @param WP_REST_Request $request Full data about the request.
     * @return WP_Error|WP_REST_Response
     */
    public function update_item($request)
    {
     $params = $request->get_params();
     
     $my_post = [
      'ID'           => $params['id'],
      'post_content' => $params['content'],
    ];

    // Update the post into the database
     $post_id = wp_update_post( $my_post );

     if ( is_wp_error( $post_id ) ) {
			if ( 'db_update_error' === $post_id->get_error_code() ) {
				$post_id->add_data( array(
					'status' => 500,
				) );
			} else {
				$post_id->add_data( array(
					'status' => 400,
				) );
			}
			return $post_id;
		}
     return new WP_REST_Response('success', 200);
    }

    /**
     * Delete one item from the collection
     *
     * @param WP_REST_Request $request Full data about the request.
     * @return WP_Error|WP_REST_Response
     */
    public function delete_item($request)
    {
      // $arggs = array(
      //   'id' => $request['id'],
      //   'post_type'   => 'contactsinfo'
      // );
      

      // echo $request['id'];
      //   $contact = get_posts($request['id']);
      //   echo $contact;
      //   if (is_wp_error($contact)) {
      //       return $contact;
      //   }
        
      // return new WP_REST_Response($contact, 200);


if (true) {
    // $previous = $this->prepare_item_for_response( $post, $request );

    // TODO: At this point $wp_customize will no longer have up-to-date post data.
    $params = $request->get_params();
    $result = wp_delete_post($params['id'], true);

    if (! $result) {
        return new WP_Error(
            'rest_cannot_delete',
            __('The post cannot be deleted.'),
            array(
              'status' => 500,
            )
        );
    }

    $response = new WP_REST_Response();

    $response->set_data(array(
      'deleted' => true,
      // 'previous' => $previous->get_data(),
    ));

    return $response;
}
      // echo $data[0][0];
      
      
      return new WP_REST_Response('hh', 200);
    }

    // $force = isset($request['force']) ? (bool) $request['force'] : false;

    // $supports_trash = apply_filters('res_contact_trashable')
    /**
     * Check if a given request has access to get items
     *
     * @param WP_REST_Request $request Full data about the request.
     * @return WP_Error|bool
     */
    public function get_items_permissions_check($request)
    {
        //return true; <--use to make readable by all
        return current_user_can('edit_something');
    }

    /**
     * Check if a given request has access to get a specific item
     *
     * @param WP_REST_Request $request Full data about the request.
     * @return WP_Error|bool
     */
    public function get_item_permissions_check($request)
    {
        return $this->get_items_permissions_check($request);
    }

    /**
     * Check if a given request has access to create items
     *
     * @param WP_REST_Request $request Full data about the request.
     * @return WP_Error|bool
     */
    public function create_item_permissions_check($request)
    {
        return current_user_can('edit_something');
    }

    /**
     * Check if a given request has access to update a specific item
     *
     * @param WP_REST_Request $request Full data about the request.
     * @return WP_Error|bool
     */
    public function update_item_permissions_check($request)
    {
        return $this->create_item_permissions_check($request);
    }

    /**
     * Check if a given request has access to delete a specific item
     *
     * @param WP_REST_Request $request Full data about the request.
     * @return WP_Error|bool
     */
    public function delete_item_permissions_check($request)
    {
        return $this->create_item_permissions_check($request);
    }

    /**
     * Prepare the item for create or update operation
     *
     * @param WP_REST_Request $request Request object
     * @return WP_Error|object $prepared_item
     */
    protected function prepare_item_for_database($request)
    {
        return array();
    }

    /**
     * Prepare the item for the REST response
     *
     * @param mixed $item WordPress representation of the item.
     * @param WP_REST_Request $request Request object.
     * @return mixed
     */
    public function prepare_item_for_response($item, $request)
    {
        return array();
    }

    /**
     * Get the query params for collections
     *
     * @return array
     */
    public function get_collection_params()
    {
        return array(
          'page'     => array(
            'description'       => 'Current page of the collection.',
            'type'              => 'integer',
            'default'           => 1,
            'sanitize_callback' => 'absint',
          ),
          'per_page' => array(
            'description'       => 'Maximum number of items to be returned in result set.',
            'type'              => 'integer',
            'default'           => 10,
            'sanitize_callback' => 'absint',
          ),
          'search'   => array(
            'description'       => 'Limit results to those matching a string.',
            'type'              => 'string',
            'sanitize_callback' => 'sanitize_text_field',
          ),
        );
    }
}


function register_contactsinfo_controller()
{
    $controller = new Slug_Custom_Route();
    $controller->register_routes();
}

add_action('rest_api_init', 'register_contactsinfo_controller');

add_action( 'wp_enqueue_scripts', 'my_enqueue_scripts' );
function my_enqueue_scripts() {
    // Enqueue the script which makes the AJAX call to /wp-json/my-plugin/v1/foo.
    wp_enqueue_script( 'my-script', '/path/to/my-script.js', [ 'jquery' ] );

    // Register custom variables for the AJAX script.
    wp_localize_script( 'my-script', 'myScriptVars', [
        'root'  => esc_url_raw( rest_url() ),
        'nonce' => wp_create_nonce( 'wp_rest' ),
    ] );
}
