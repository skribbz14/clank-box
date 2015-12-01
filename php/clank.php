<?php


/*
//
/// Prints the safe value of a field.
/// - Optional value to strip all html from value */		

function clank_print_safe_value($field, $strip = false){
	if(isset($field['und'][0]['safe_value'])){
		if($strip) echo(strip_tags($field['und'][0]['safe_value']));							
		else echo($field['und'][0]['safe_value']);								
	}		
}



/*
//
/// Prints the markup of a textfield */ 

function clank_print_text($field_name, $strip = false){  
  if(isset($field_name[0]['#markup'])){    
    if($strip) echo(strip_tags(decode_entities($field_name[0]['#markup'])));    	 	
    else echo(decode_entities($field_name[0]['#markup']));	 	    
  }
}
 


/*
//
/// Returns the specified views' results */

function clank_get_view($view_name, $block_id){
	$view = views_get_view($view_name);		
	$view->set_display($block_id);
	$view->pre_execute();
	$view->execute();
	return $view->result;
}



/*
//
/// Renders a block with contextual filters */

function clank_load_block($module, $block_delta){
	$block = block_load($module, $block_delta);
	$renderable_array = _block_get_renderable_array(_block_render_blocks(array($block)));		
	print drupal_render($renderable_array);
}



/*
//
/// Returns url, with alias, of the node ID passed */

function clank_node_url($nid){
  echo('/'.drupal_get_path_alias('node/'.$nid));
}



/*
//
/// Returns the url of an image 
/// Set $content_field to false when accessing the field from the $node object
/// Image number allows you to specify which photo when the field allows multiple uploads */

function clank_image_url($image_field, $content_field = true, $image_number = 0){  
  if(isset($image_field)){
    if($content_field) $url = file_create_url($image_field[$image_number]['#item']['uri']);    
    else $url = file_create_url($image_field[$image_number]['uri']);    
    echo($url);    
  }
}



/*
//
/// Returns the alt of an image */

function clank_image_alt($image_field, $content_field = false){
  if(isset($image_field)){    
    if($content_field) $alt = $image_field[0]['#item']['alt'];      
    else $alt = $image_field[0]['alt'];                    
    echo($alt);
  }  
}



/*
//
/// Returns a node form */

function clank_load_node_form($form_id){
  global $user;
	$form_node = (object) array(
    'uid' => $user->uid, 
    'name' => (isset($user->name) ? $user->name : ''), 
    'type' => 'artwork', 
    'language' => LANGUAGE_NONE,
  );

  $form_state = array();
  $form_state['build_info']['args'] = array($form_node);
  form_load_include($form_state, 'inc', 'node', 'node.pages');    
  return drupal_build_form($form_id, $form_state);        	
} 


/*
//
/// Returns a webform */

function clank_render_webform_block($block_id){
  $form = module_invoke('webform', 'block_view', $block_id);						  
	print render($form['content']); 
}
  


function clank_machine_name($str){
  return strtolower( str_replace(' ', '_', $str));
}

  
?>