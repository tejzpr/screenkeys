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

### Installation
1. Include the following lines inside the <head> tag. 
`<link href="../lib/screenkeys.css" type="text/css" rel="stylesheet"/>
<script type="text/javascript" src="../lib/jquery-1.9.1.min.js"></script>
<script type="text/javascript" src="../lib/screenkeys-1.0.1.min.js"></script>
<script type="text/javascript" src="../lib/locale/screenkeysloc_en_US.js"></script>`

###Usage

1. Input to a form text field
	* `$("input[type=text]").screenKeys({
			container:$(".keyboadDisplayDiv"),
			width:"310px"
		});`

		
2. Input to a display DIV tag	
	* `$("div").screenKeys({
			container:$(".keyboadDisplayDiv"),
			width:"310px"
		});`

		
3. Input to a display DIV tag with unbound width
	* `$("div").screenKeys({
			container:$(".keyboadDisplayDiv")
		});`

		
4. Scramble keys for added security	
	* `$("div").screenKeys({
			container:$(".keyboadDisplayDiv"),
			randomChar:true
		});`

		
5. Localize keyboard to US, English (Can display keys based on localization)
	* `$("div").screenKeys({
			container:$(".keyboadDisplayDiv"),
			locale:"en_US"
		});`