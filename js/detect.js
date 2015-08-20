// Detect.js
// @author Kyle Lamble of Loosey Goosey Art
// Version 8.1



/*
//
/// Currently supports detections of */

// Chrome
// Safari
// Opera
// Firefox
// Internet Explorer 6-11
// Microsoft Edge
// Maxthon
// Sea Monkey
// Ipad 
// Iphone
// Android
// Retina Displays
// Kindle Fire
// Touch device


var detect = {
	initialized:false,
	onMobile:false,
	onTablet:false,
	onChrome:false,
	onSafari:false,
	onOpera:false,
	onFirefox:false,
	onIE:false,
	onEdge:false,
	onMaxthon:false,
	onSeaMonkey:false,
	onIpad:false,
	onIphone:false,
	onAndroid:false,
	onRetinaDisplay:false,
	onKindle:false,
	onTouch:false,
	onIos:false,
	version:null
};

;(function(window, document, jQuery, detect){
 	
 	var html = jQuery('html'),
 			device_detected = false;
 	
 	
 	/*
	//
	/// Functions */
	
	function Detect_IOS_Version(){
    var agent = window.navigator.userAgent,
    		start = agent.indexOf( 'Version/' ),
    		length_of_start = 8, // number of characters in 'Version/'
    		version = null; 
		version = window.Number( agent.substr( (start+length_of_start), 1 ) );	
    detect.version = version;    
    var class_safe_string = version.toString().split(".")[0];
    html.addClass('ios'+class_safe_string);
	}
	
	function Detect_Iphone(){
		if(!navigator.userAgent.match(/iPhone/i)) return false;		
		html.addClass('iphone mobile touch-device ios');
    detect.onMobile = true;
    detect.onIphone = true; 
    detect.onTouch = true;
    detect.onIos = true;
    Detect_IOS_Version();
    return true;			
	}
	
	function Detect_Ipad(){
		if(!navigator.userAgent.match(/iPad/i)) return false;
		html.addClass('ipad tablet touch-device ios');
    detect.onIpad = true;
    detect.onTablet = true;
    detect.onTouch = true;
    detect.onIos = true;
    Detect_IOS_Version();
    return true;		
	}
	
	function Detect_Kindle(){
		if(navigator.userAgent.indexOf("Silk") === -1) return false;		
		html.addClass('kindle tablet touch-device');
		detect.onTablet = true;
		detect.onKindle = true;
		detect.onTouch = true;
		return true;
	}
	
	function Detect_OS(){
		if(navigator.platform == "MacIntel") html.addClass('mac');
		else if(navigator.platform == "Win32") html.addClass('win');
	}
	
	function Detect_Android(){
		if(navigator.userAgent.toLowerCase().indexOf("android") == -1) return;
		
		/// http://stackoverflow.com/questions/7184573/pick-up-the-android-version-in-the-browser-by-javascript
		function getAndroidVersion(ua) {
      ua = (ua || navigator.userAgent).toLowerCase(); 
      var match = ua.match(/android\s([0-9\.]*)/);
      return match ? match[1] : false;
    };

    var version_string = 'androidV' + parseFloat(getAndroidVersion()).toString().replace('.','-');
      				
		html.addClass('android mobile touch-device ' + version_string); 
		detect.onMobile = true;
    detect.onAndroid = true;  
    detect.onTouch = true;                          
    detect.version = parseFloat(getAndroidVersion());
    return true;
	}
	
	function Detect_Retina_Display(){
		if(window.devicePixelRatio < 2) return false;
		html.addClass('retina');
		detect.onRetinaDisplay = true;
	}
	
	function Detect_Chrome(){
		if(!(/Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor))) return false;
		html.addClass('chrome');
		detect.onChrome = true;
	}
	
	function Detect_Safari(){
		if(!(/Safari/.test(navigator.userAgent) && /Apple Computer/.test(navigator.vendor))) return false;		
		detect.onSafari = true;		
		detect.version = navigator.userAgent.substr(navigator.userAgent.lastIndexOf('Version/') + 8, 3);
		var version_string = (' safariV' + detect.version).replace('.','-');
		html.addClass('safari' + version_string);
	}
	
	function Detect_Firefox(){
		if(!('MozAppearance' in document.documentElement.style)) return false;
		html.addClass('firefox');
		detect.onFirefox = true;
	}
	
	function Detect_Maxthon(){
		if(!(/Maxthon[\/\s](\d+\.\d+)/.test(navigator.userAgent))) return false;
		html.addClass('maxthon');
		detect.onMaxthon = true;		
	}
	
	function Detect_Opera(){
		if(!(window.opera || /opera|opr/i.test(navigator.userAgent))) return false;
		html.addClass('opera');
		detect.onOpera = true;
	}
	
	function Detect_IE(){
		
		function Check_Version(){
			var rv = -1; // Return value assumes failure.
			if (navigator.appName == 'Microsoft Internet Explorer'){
				var ua = navigator.userAgent;
		    var re  = new RegExp("MSIE ([0-9]{1,}[\\.0-9]{0,})");
		    if (re.exec(ua) !== null){
		      rv = parseFloat( RegExp.$1 );
		    }
			}
			else if(navigator.appName == "Netscape"){  			  			
  			/// in IE 11 the navigator.appVersion says 'trident'
  			/// in Edge the navigator.appVersion does not say trident
  			if(navigator.appVersion.indexOf('Trident') === -1) rv = 12;
  			else rv = 11;
			}  			
			return rv;			
		}
		
		var ie = -1;
		ie = Check_Version();
			
						 				
		switch(ie){
			case 12:
   			html.addClass('ie12 microsoft-edge not-ie');
  			detect.onEdge = true;
  			detect.version = "12";			
			  break;
			case 11:
   			html.addClass('ie11 ie');
  			detect.onIE = true;
  			detect.version = "11";	
			  break;
			case 10:
				html.addClass('ie10 ie');
				detect.onIE = true;
				detect.version = "10";					
				break;
			case 9:
				html.addClass('ie9 ie');
				detect.onIE = true;
				detect.version = "9";
				break;
			case 8:
				html.addClass('ie8 ie');
				detect.onIE = true;
				detect.version = "8";
				break;
			case 7:
				html.addClass('ie7 ie');
				detect.onIE = true;
				detect.version = "7";
				break;
			case 6:
				html.addClass('ie6 ie');
				detect.onIE = true;
				detect.version = "6";
				break;
			default:break;			
		}						
	
		
		if(ie === -1) {
			html.addClass('not-ie');
			return false;
		}
		
		return true;
	}
	
	function Detect_SeaMonkey(){
		if(!(/SeaMonkey[\/\s](\d+\.\d+)/.test(navigator.userAgent))) return false;
		detect.onSeaMonkey = true;
		html.addClass('seamonkey');
	}	
	
	
	/*
	//
	/// Run */
	
	// Always check Operating system and if display is retina
	Detect_OS();
	Detect_Retina_Display();
	
	// Detect IE first to get 'not-ie' class
	device_detected = Detect_IE();
	
	// Arranged in order of 2014 United State Market Share
	if(!device_detected) device_detected = Detect_Iphone();
	if(!device_detected) device_detected = Detect_Android();
	if(!device_detected) device_detected = Detect_Ipad();
	if(!device_detected) device_detected = Detect_Kindle();
	if(!device_detected) device_detected = Detect_Chrome();
	if(!device_detected) device_detected = Detect_Firefox();
	if(!device_detected) device_detected = Detect_Safari();
	if(!device_detected) device_detected = Detect_Opera();
	if(!device_detected) device_detected = Detect_Maxthon();
	if(!device_detected) device_detected = Detect_SeaMonkey();
		
	detect.initialized = true;						

})(window, document, jQuery, detect);