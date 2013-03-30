Screenkeys
==========
Screenkeys is a fluidic CSS/Javascript based virtual keyboard with localization support. 

### Features 
* Full keys virtual keyboard in 102kb
* Can be used to overcome key loggers  
* Fully customizable with themes
* Multiple Localizations Supported (Looking for contributors)
* QWERTY / Randomized keys supported
* Accepts input fields as well as HTML display elements
* Fixed width and Fluidic width supported.

### Usage
##Input to a form text field
1. `$("input[type=text]").screenKeys({
		container:$(".keyboadDisplayDiv"),
		width:"310px"
	});`
##Input to a display DIV tag	
2. `$("div").screenKeys({
		container:$(".keyboadDisplayDiv"),
		width:"310px"
	});`
##Input to a display DIV tag with unbound width
3. `$("div").screenKeys({
		container:$(".keyboadDisplayDiv")
	});`
##Scramble keys for added security	
4. `$("div").screenKeys({
		container:$(".keyboadDisplayDiv"),
		randomChar:true
	});`
##Localize keyboard to US, English (Can display keys based on localization)
5. `$("div").screenKeys({
		container:$(".keyboadDisplayDiv"),
		locale:"en_US"
	});`






