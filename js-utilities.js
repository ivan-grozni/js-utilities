/**
 * JS-Utilities.js
 * Helper functions to facilitate site-wide functionality.
 * These functions often leverage functionality from site-wide libraries like jQuery
 */
var utils = {
	/**
	 * Return array of current query string parameters
	 * @return {[type]} [description]
	 */
	get_query_string_params: function () {
		var vars = [], hash;
		var q = document.URL.split('?')[1];
		if (q != undefined) {
			q = q.split('&');
			for (var i = 0; i < q.length; i++) {
				hash = q[i].split('=');
				vars.push(hash[1]);
				vars[hash[0]] = hash[1];
			}
		}
		return vars;
	},
	/**
	 * Look up a query string parameter in the current URL
	 * @param  {String} str the key to search for
	 * @return {[type]}    The
	 */
	get_single_query_param: function(str){
		return utils.rm_if_blank(utils.get_query_string_params()[str]);
	},
	/**
	 * Is String Empoty
	 * @param  {String}  str Test String
	 * @return {Boolean}     true if empty or null
	 */
	is_empty: function(str){
		return (str == null||str == "null"||str == "undefined"||str=="");
	},
	/**
	 * Convert undefined string to empty string
	 * @param  {<T>} str 	- String or Undefined
	 * @return {String}     - String or Empty String
	 */
	rm_if_blank :function(str){
		return utils.is_empty(str) ? "" : str;
	},
	/**
	 * Get your URL parameters as a json option
	 * @return {Object} each parameter as its own property
	 */
	get_url_as_json: function(){
	  var search = location.search.substring(1);
	  return JSON.parse('{"' + decodeURI(search).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g,'":"') + '"}')
	},
	/**
	 * Create CSS rule
	 * @param  {String} selector   The class, id, element etc
	 * @param  {Array|String} attributes One or more property:assignments
	 * @return {String}            A CSS selector and rule
	 */
	create_css_rule: function(selector,attributes){
	  var rules = "";
	  if (typeof attributes != "string" && typeof attributes == "object") {
	    for (var i = attributes.length - 1; i >= 0; i--) {
	      rules+=attributes[i]
	    }
	    return selector + '{' + rules + '}';
	  }
	  return selector + '{' + attributes + '}';
	},
	/**
	 * [create_css_attribute description]
	 * @param  {String} property   display,color,visibility, etc
	 * @param  {String} assignment value
	 * @return {String}            Concatenated values with colon & semicolon
	 */
	create_css_attribute: function(property, assignment){
	  return property+":"+assignment+";";
	},
	/**
	 * Appends the fed in text into a style tag at the bottom of the body
	 * @param  {String} styles a block of CSS code
	 */
	create_stylesheet: function(styles){
	  var sheet = document.createElement('style')
	  sheet.innerHTML = styles;
	  document.body.appendChild(sheet);
	},
	/**
	 * Echo in console
	 * @param  {string} variable 
	 * @param  {string} value    
	 */
	echo: function(variable,value){
		console.log(variable+": "+value);
	},
	/**
	 * PostAlert: Post a bootstrap message
	 * @param  {String} type    	"success", "warning" or "danger"
	 * @param  {String} message 	the message shown in the alert
	 * @param  {String} target  	The selector of the alert container (leave blank for default #warning-messages)
	 */
	post_alert: function(type, message, target) {
		var concatName = type+"-messages";
		var selector = utils.is_empty(target) ? "#"+concatName : target;
        $(selector).html('<div id="'+concatName+'" class="alert alert-'+type+'"><a class="close" data-dismiss="alert">×</a><span>'+message+'</span></div>')
    }
}