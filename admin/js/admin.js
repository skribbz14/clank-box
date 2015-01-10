;(function(window, document, jQuery){
	
	/*
	//
	/// Functions */
	
	function Close_Alert_Boxes(){
		if( jQuery('.alert-box').length > 0 ){
			jQuery('.alert-box').find('.close').click(function(e){
				jQuery(this).parent().remove();
			});
		}
	}
	
	function Apply_Admin_Class(body){
		body.addClass('admin-screen');
		return true;
	}
	
	function Test_For_Admin_Page(){
		var body = jQuery('body'),
				admin_class_set = false;
				
		if(body.hasClass('page-admin')) admin_class_set = Apply_Admin_Class(body);
		else if(body.hasClass('node-edit')) admin_class_set = Apply_Admin_Class(body);
		else if(body.get(0).className.indexOf('node-add') > -1) admin_class_set = Apply_Admin_Class(body);
		else if(body.get(0).className.indexOf('-webform') > -1) admin_class_set = Apply_Admin_Class(body);
		else if(body.get(0).className.indexOf('node-edit') > -1) admin_class_set = Apply_Admin_Class(body);
		else if(body.get(0).className.indexOf('user-edit') > -1) admin_class_set = Apply_Admin_Class(body);
		else if(body.get(0).className.indexOf('page-node-revisions') > -1) admin_class_set = Apply_Admin_Class(body);
		
		if(admin_class_set) return true;
		return false;
	}
	
	function Create_Ajax_Throbber_Window_Height_Class(){
		if(Test_For_Admin_Page()){
			if(jQuery('#ajax-max-height-style').length > 0) return;			
			var window_height = jQuery(window).height();						
			var style_tag = document.createElement('style');			
			jQuery(style_tag).attr('id','ajax-max-height-style').html('.ajax-progress{ max-height:'+window_height+'px; }').appendTo('body');			
		}
	}
	
	
	/*
	//
	/// Run */
	
	jQuery(document).ready(function(e){
		Close_Alert_Boxes();	
		Create_Ajax_Throbber_Window_Height_Class();		
		Test_For_Admin_Page();
	});	
})(window, document, jQuery);
