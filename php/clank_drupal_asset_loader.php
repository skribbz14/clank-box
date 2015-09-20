function clank_drupal_asset_load(&$variables){
  
  /*
  //
  /// Variables */
  
  /// User status returns 'logged-in' for admins and 'not-logged-in' for anonymous users
	$user_status = $variables['logged_in'] ? 'logged-in' : 'not-logged-in';	
	
	
  /// This variables determines whether or not we we need to load the generic theme js
	$theme_js_set = false;
	
	
	/// Options required to pull in inline css sheets
	$critical_css_options = array(
  	'type' => 'inline',
  	'scope' => 'header',
  	'group' => CSS_SYSTEM,
  	'weight' => -1000,
  	'preprocess' => FALSE,
	);	
	
	
	/// Theme CSS
	$app_css = drupal_get_path('theme', 'app').'/css/app.css';
	
	
	/// Theme JS
	$app_js = drupal_get_path('theme', 'app').'/js/app.min.js';
	
	
	/// Vendor JS/CSS
	$detect_js = drupal_get_path('theme','app').'/bower_components/clank-box/js/detect.js';
	$angular_js = drupal_get_path('theme','app').'/bower_components/angular/angular.js';
	
	
	
	/*
  //
  /// Load assets */
    
  /// Global assets
  drupal_add_js($angular_js);
  drupal_add_js($detect_js);
  
  
  /// Conditional assets
	$body_classes = $variables['classes_array'];		
	foreach($body_classes as $index => $class_name){				
		switch($class_name){
      case 'node-type-page':
        /// load optional assets
        break;
      default:break;
    }
  }   
}  
  
 