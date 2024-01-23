<?php
/**
 * The base configuration for WordPress
 *
 * The wp-config.php creation script uses this file during the installation.
 * You don't have to use the web site, you can copy this file to "wp-config.php"
 * and fill in the values.
 *
 * This file contains the following configurations:
 *
 * * Database settings
 * * Secret keys
 * * Database table prefix
 * * ABSPATH
 *
 * @link https://wordpress.org/support/article/editing-wp-config-php/
 *
 * @package WordPress
 */

// ** Database settings - You can get this info from your web host ** //
/** The name of the database for WordPress */

if (file_exists(dirname(__FILE__).'/local.php')) {
    //loca databse settings.
    define('DB_NAME', 'wreact');

    /** Database username */
    define('DB_USER', 'wreact');

    /** Database password */
    define('DB_PASSWORD', '1111');

    /** Database hostname */
    define('DB_HOST', 'localhost');
} else {
    //Live database settings
    define('DB_NAME', 'id20085101_uni');

    /** Database username */
    define('DB_USER', 'id20085101_university');

    /** Database password */
    define('DB_PASSWORD', 'g]<!\J<2ciuGt-}=');

    /** Database hostname */
    define('DB_HOST', 'localhost');
}

/** Database charset to use in creating database tables. */
define( 'DB_CHARSET', 'utf8mb4' );

/** The database collate type. Don't change this if in doubt. */
define( 'DB_COLLATE', '' );



/**#@+
 * Authentication unique keys and salts.
 *
 * Change these to different unique phrases! You can generate these using
 * the {@link https://api.wordpress.org/secret-key/1.1/salt/ WordPress.org secret-key service}.
 *
 * You can change these at any point in time to invalidate all existing cookies.
 * This will force all users to have to log in again.
 *
 * @since 2.6.0
 */
define( 'AUTH_KEY',         'e7Nv/eeD*iZ5^znF^FLe:X:? )f;/)p{`6>7ka_zm.YNj$]Fp!d%?xMHw*^(WE_a' );
define( 'SECURE_AUTH_KEY',  'l$KK4lW.aQRI^ONr5[5|,JIF6vNjLjH0T3tHBBU[4!gHEexp+|m^*,2H2Yhdw+K%' );
define( 'LOGGED_IN_KEY',    'T8Op67Aj<2]@RoOoC)w~S: &2%c:sD;c!VW6J=X4w$p_8Ga%_sz52pc?OJBRvs;o' );
define( 'NONCE_KEY',        'u*O]Iv8gM1^17Cfl:M4^3:-^su.gqq64-<Il:is5>RFd3+_{C6fV=J_EXA^,8G2w' );
define( 'AUTH_SALT',        'yq3]p>R:#c.19^3}) sypg^4PQ4CrYh(g=Li1YS?:-yh,,]:dtZQEA;(ahC_>Vt6' );
define( 'SECURE_AUTH_SALT', '8qhD/Dg,Q#zlvCovp/X8~$s1Hr(nX+KN@9Pk5Mz@?Ep4K2k&Ar@Z?ZMRgaw*qf79' );
define( 'LOGGED_IN_SALT',   'K8q9,|X(V@,k?r:mDAwUQ7-U_[L=G1BV3Aw|]_A%j5hA?uc(F&^MbEn$y?j1>vj.' );
define( 'NONCE_SALT',       'aOo:WK3kQg$5B94CGRADZP7s2b^e3 hr0MIs}bS$$_CE }lyy?{DPK0Z5z%^IRL4' );

/**#@-*/

/**
 * WordPress database table prefix.
 *
 * You can have multiple installations in one database if you give each
 * a unique prefix. Only numbers, letters, and underscores please!
 */
$table_prefix = 'wp_';

/**
 * For developers: WordPress debugging mode.
 *
 * Change this to true to enable the display of notices during development.
 * It is strongly recommended that plugin and theme developers use WP_DEBUG
 * in their development environments.
 *
 * For information on other constants that can be used for debugging,
 * visit the documentation.
 *
 * @link https://wordpress.org/support/article/debugging-in-wordpress/
 */
define( 'WP_DEBUG', false );
define('DISALLOW_FILE_EDIT', false);
/*define('WP_MEMORY_LIMIT', '64M'); */

/* Add any custom values between this line and the "stop editing" line. */



/* That's all, stop editing! Happy publishing. */

/** Absolute path to the WordPress directory. */
if ( ! defined( 'ABSPATH' ) ) {
	define( 'ABSPATH', __DIR__ . '/' );
}

/** Sets up WordPress vars and included files. */
require_once ABSPATH . 'wp-settings.php';
