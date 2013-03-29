/*
 *  Screenkeys v1.0.1 Beta
 *  Description: A Javascript plugin to render an onscreen keyboard for websites.
 *  Author: Tejus Pratap
 *  Email: tejuspratap@gmail.com
 *  Website: http://tejuspratap.info/projects/screenkeys
 *  License: MIT License
 */
;var screenKey={};
;screenKey.nonLocal={
	keysNum:[			
			{name:"0",disp:"0",type:"num"},
			{name:"1",disp:"1",type:"num"},
			{name:"2",disp:"2",type:"num"},
			{name:"3",disp:"3",type:"num"},
			{name:"4",disp:"4",type:"num"},
			{name:"5",disp:"5",type:"num"},
			{name:"6",disp:"6",type:"num"},
			{name:"7",disp:"7",type:"num"},
			{name:"8",disp:"8",type:"num"},
			{name:"9",disp:"9",type:"num"}
	],
	keysSymbols:[			
			{name:"~",disp:"~",type:"sym"},
			{name:"`",disp:"`",type:"sym"},
			{name:"!",disp:"!",type:"sym"},
			{name:"@",disp:"@",type:"sym"},
			{name:"#",disp:"#",type:"sym"},
			{name:"$",disp:"$",type:"sym"},
			{name:"%",disp:"%",type:"sym"},
			{name:"^",disp:"^",type:"sym"},
			{name:"&",disp:"&",type:"sym"},
			{name:"*",disp:"*",type:"sym"},
			{name:"(",disp:"(",type:"sym"},
			{name:")",disp:")",type:"sym"},
			{name:"-",disp:"-",type:"sym"},
			{name:"_",disp:"_",type:"sym"},
			{name:"+",disp:"+",type:"sym"},
			{name:"=",disp:"=",type:"sym"},
			{name:"{",disp:"{",type:"sym"},
			{name:"}",disp:"}",type:"sym"},
			{name:"[",disp:"[",type:"sym"},
			{name:"]",disp:"]",type:"sym"},
			{name:"|",disp:"|",type:"sym"},
			{name:"\\",disp:"\\",type:"sym"},
			{name:";",disp:";",type:"sym"},
			{name:":",disp:":",type:"sym"},
			{name:"\"",disp:"\"",type:"sym"},
			{name:"&apos;",disp:"&apos;",type:"sym"},
			{name:"<",disp:"<",type:"sym"},
			{name:">",disp:">",type:"sym"},
			{name:",",disp:",",type:"sym"},
			{name:".",disp:".",type:"sym"},
			{name:"?",disp:"?",type:"sym"},
			{name:"/",disp:"/",type:"sym"}
	]
};

		
;Array.prototype.shuffle = function() {
  var i = this.length, j, tempi, tempj;
  if ( i == 0 ) return this;
  while ( --i ) {
     j       = Math.floor( Math.random() * ( i + 1 ) );
     tempi   = this[i];
     tempj   = this[j];
     this[i] = tempj;
     this[j] = tempi;
  }
  return this;
};
;(function ( $, window, document, undefined ) {
    var pluginName = "screenKeys",
        defaults = {
			locale:"en_US",
			randomChar:false,
			container:".screenkeyboard",
			width:"100%"
        };

    function Plugin( element, options ) {
        this.element = element;
        this.options = $.extend( {}, defaults, options );
        this._defaults = defaults;
        this._name = pluginName;
        this.init();
    }

    Plugin.prototype = {
		charList:[],
		isShiftOn: false,
		isInFormElement: false,
		container: {},
		symContainer: "",
		symContIdentifier:"",
		symHolder: new Array(),
		charContainer: "",
		charContIdentifier:"",
		charHolder: new Array(),
		numContainer: "",
		numContIdentifier:"",
		showSymbols:false,
		numHolder: new Array(),
		funcContainer: "",
		funcContIdentifier:"",
		funcHolder: new Array(),
		clear:"<div class='clear'></div>",
		out: new Array(),
		randomSeed:"",
		renderCharCont:0,
		renderSymCont:0,
		keysNum:[],
		keysSym:[],
		keysChar:[],	
		keysFunc:[],
        init: function() {
			this.randomSeed = Math.floor(Math.random()*1111)+Math.floor(Math.random()*5111);
			if(screenKey[this.options.locale]==undefined)
			{
				alert("Localization for "+this.options.locale+" could not be loaded.");
				return false;
			}
			
			this.symContIdentifier = "screenKeySymIden-"+this.randomSeed;
			this.symContainer = $("<div style='display:none;' class='screenKeySymContainer "+this.symContIdentifier+"'></div>");
			
			this.charContIdentifier = "screenKeyCharIden-"+this.randomSeed;
			this.charContainer = $("<div class='screenKeyCharContainer "+this.charContIdentifier+"'></div>");
			
			this.numContIdentifier = "screenKeyNumIden-"+this.randomSeed;
			this.numContainer = $("<div class='screenKeyNumContainer "+this.numContIdentifier+"'></div>");
			
			this.funcContIdentifier = "screenKeyFuncIden-"+this.randomSeed;
			this.funcContainer = $("<div class='screenKeyFuncContainer "+this.funcContIdentifier+"'></div>"),
			
			this.holderElement=$(this.options.container);
			this.screenKeyIdentifier = "screenKeyIden-"+this.randomSeed;
			this.container=$("<div class='screenKeyContainer "+this.screenKeyIdentifier+"'></div>",this.holderElement);
			$(this.holderElement).css("width",this.options.width);
			switch(this.options.locale)
			{
				case "en_US":
					this.keysNum = screenKey.nonLocal.keysNum;
					this.keysSym = screenKey.nonLocal.keysSymbols;
					this.keysChar = screenKey.en_US.keysChar;
					this.keysFunc = screenKey.en_US.keysFunc;
				break;
				default:
					this.keysNum = screenKey.nonLocal.keysNum;
					this.keysSym = screenKey.nonLocal.keysSymbols;
					this.keysChar = screenKey.en_US.keysChar;
					this.keysFunc = screenKey.en_US.keysFunc;
				break;
			}
			if(this.options.randomChar)
			{
				this.keysChar.shuffle();
				this.keysSym.shuffle();
				this.keysNum.shuffle();
			}
			if($(this.element).is("input")||$(this.element).is("textarea"))
			{
				this.isInFormElement = true;
				$(this.element).val("");
			}
			else
			{
				$(this.element).empty();
			}
			this.initKeys();
			this.renderCharCont=0;
			this.renderSymCont=0;
        },
        initKeys: function(el, options) {
			$(this.numContainer).empty();
			$(this.charContainer).empty();
			$(this.funcContainer).empty();
			$(this.symContainer).empty();
			//$(this.container).empty();
			
			$(this.container).append(this.numContainer);
			$(this.container).append(this.clear);
			$(this.container).append(this.symContainer);
			$(this.container).append(this.clear);
			$(this.container).append(this.charContainer);
			$(this.container).append(this.clear);
			$(this.container).append(this.funcContainer);
			$(this.container).append(this.clear);
			
			$(this.holderElement).append(this.container);
			this.keyBoardPaint();
			this.renderCharCont=0;
			this.renderSymCont=0;
        },
		keyBoardPaint: function(){	
			this.renderSymKeys();
			this.renderNumKeys();
			this.renderCharKeys();
			this.renderFuncKeys();
			this.attachEvents();
		},
		renderSymKeys:function()
		{
			this.symHolder=new Array();
			$("."+this.symContIdentifier,this.container).empty();
			for(var i in this.keysSym)
			{
				var key = this.keysSym[i];
				cpClass="aKey screenIndSym sym";
				if(key.type=="sym")
				{
					this.symKeyMaker(key,cpClass);
				}
			}
			$("."+this.symContIdentifier,this.container).append(this.symHolder.join(""));
		},
		renderFuncKeys:function()
		{
			this.funcHolder=new Array();
			for(var i in this.keysFunc)
			{
				var key = this.keysFunc[i];
				switch(key.name)
				{
					case "backspace": 
						cpClass="aKey screenIndbackspace"
					break;
					case "shift": 
						cpClass="aKey screenIndShift"
					break;
					case "carriage": 
						cpClass="aKey screenIndCarriage"
					break;
					case "spacebar": 
						cpClass="aKey screenIndSpace"
					break;
					case "sym": 
						cpClass="aKey screenIndSymKey"
					break;
				}
				if(key.type=="func")
				{
					this.funcKeyMaker(key,cpClass);
				}
			}
			$("."+this.funcContIdentifier,this.container).append(this.funcHolder.join(""));
		},
		renderNumKeys:function()
		{
			this.numHolder=new Array();
			$("."+this.numContIdentifier,this.container).empty();
			for(var i in this.keysNum)
			{
				var key = this.keysNum[i];
				cpClass="aKey screenIndNum "+key.name+"num";
				if(key.type=="num")
				{
					this.numKeyMaker(key,cpClass);
				}
			}
			$("."+this.numContIdentifier,this.container).append(this.numHolder.join(""));
		},
		renderCharKeys:function()
		{
			this.charHolder=new Array();
			$("."+this.charContIdentifier,this.container).empty();
			for(var i in this.keysChar)
			{
				var key = this.keysChar[i];
				cpClass="aKey screenIndChar "+key.name+"char";
				if(key.type=="char")
				{
					this.charKeyMaker(key,cpClass);
				}
			}
			$("."+this.charContIdentifier,this.container).append(this.charHolder.join(""));
		},
		shiftPressEvent:function()
		{
			$('.screenIndChar',this.holderElement).off('click');
			this.renderCharKeys();
			this.attachCharKeyEvents();
			this.renderCharCont=0;
		},
		charKeyMaker:function(key,cpClass)
		{
			var styleR = "";
			if(this.renderCharCont==10)
			{
				styleR = "clear: left;margin-left: 5%;";
			}
			else if(this.renderCharCont==19)
			{
				styleR = "clear: left;margin-left: 12.6%;";
			}
			
			if(this.isShiftOn)
			{
				this.charHolder.push("<a href='javascript:void(0);' class='"+cpClass+"' data='"+key.name+"' type='"+key.type+"' style='"+styleR+"'><span>"+key.disp.toUpperCase()+"</span></a>");
			}
			else
			{
				this.charHolder.push("<a href='javascript:void(0);' class='"+cpClass+"' data='"+key.name+"' type='"+key.type+"' style='"+styleR+"'><span>"+key.disp+"</span></a>");
			}
			this.renderCharCont++;
		},
		funcKeyMaker:function(key,cpClass)
		{
			this.funcHolder.push("<a href='javascript:void(0);' class='"+cpClass+"' data='"+key.name+"' type='"+key.type+"' style=''><span>"+key.disp+"</span></a>");
		},
		symKeyMaker:function(key,cpClass)
		{
			var styleR = "";
			if(this.renderSymCont==0)
			{
				styleR = "margin-left: 0.5%;";
			}
			else if(this.renderSymCont==11)
			{
				styleR = "clear: left;margin-left: 0.5%;";
			}
			else if(this.renderSymCont==22)
			{
				styleR = "clear: left;margin-left: 5%;";
			}
			this.symHolder.push("<a href='javascript:void(0);' class='"+cpClass+"' data='"+key.name+"' type='"+key.type+"' style='"+styleR+"'><span>"+key.disp+"</span></a>");
			this.renderSymCont++;
		},
		numKeyMaker:function(key,cpClass)
		{
			this.numHolder.push("<a href='javascript:void(0);' class='"+cpClass+"' data='"+key.name+"' type='"+key.type+"' style=''><span>"+key.disp+"</span></a>");
		},
		attachEvents:function(){
			var self = this;
			this.attachShiftKeyEvents();
			this.attachNumKeyEvents();
			this.attachCharKeyEvents();
			this.attachSymKeyEvents();
			$(".screenIndCarriage",this.holderElement).on("click",function(){
				self.beforeEvent();
				self.charList.push("\n");
				self.afterEvent();
			});
			$(".screenIndbackspace",this.holderElement).on("click",function(){
				self.beforeEvent();
				self.charList.pop();
				self.afterEvent();
			});
			$(".screenIndSpace",this.holderElement).on("click",function(){
				self.beforeEvent();
				self.charList.push(" ");
				self.afterEvent();
			});
			$(".screenIndSymKey",this.holderElement).on("click",function(){
				self.showSymbols=!self.showSymbols?true:false;
				self.beforeEvent();
				$("."+self.symContIdentifier,this.container).slideToggle();
				$("."+self.charContIdentifier,this.container).slideToggle();
				if(self.showSymbols)
				{
					$(".screenIndShift",this.holderElement).off("click");
				}
				else
				{
					self.attachShiftKeyEvents();
				}
				self.afterEvent();
			});
		},
		attachShiftKeyEvents:function()
		{
			var self = this;
			$(".screenIndShift",this.holderElement).on("click",function(){
				self.isShiftOn = self.isShiftOn?false:true;
				if(self.isShiftOn)
				{
					$(this).addClass("shifton");
				}
				else
				{
					$(this).removeClass("shifton");
				}
				self.shiftPressEvent();
			});
		},
		attachSymKeyEvents:function(){
			var self = this;
			$(".screenIndSym",this.holderElement).on("click",function(){
				self.beforeEvent();
				self.charList.push($(this).attr("data"));
				self.afterEvent();
			});
		},
		attachNumKeyEvents:function(){
			var self = this;
			$(".screenIndNum",this.holderElement).on("click",function(){
				self.beforeEvent();
				self.charList.push($(this).attr("data"));
				self.afterEvent();
			});
		},
		attachCharKeyEvents:function(){
			var self = this;
			$(".screenIndChar",this.holderElement).on("click",function(){
				self.beforeEvent();
				if(self.isShiftOn)
				{
					self.charList.push($(this).attr("data").toUpperCase());
				}
				else
				{
					self.charList.push($(this).attr("data"));
				}
				self.afterEvent();
			});
		},
		beforeEvent:function()
		{
			this.updateCharList();
		},
		afterEvent:function()
		{
			this.paintChars();
			if(this.isInFormElement)
			{
				$(this.element).focus();
			}
		},
		updateCharList:function()
		{
			if(this.isInFormElement)
			{
				this.charList=$(this.element).val();
			}
			else
			{
				this.charList=$(this.element).html();
			}
			if(this.charList=="")
			{
				this.charList=new Array();
			}
			else
			{
				this.charList=this.charList.split("");
			}
		},
		paintChars:function(){
			if(this.isInFormElement)
			{
				$(this.element).val(this.charList.join(""));
			}
			else
			{
				$(this.element).html(this.charList.join(""));
			}
		}
    };

    $.fn[pluginName] = function ( options ) {
        return this.each(function () {
            if (!$.data(this, "plugin_" + pluginName)) {
                $.data(this, "plugin_" + pluginName, new Plugin( this, options ));
            }
        });
    };

})( jQuery, window, document );