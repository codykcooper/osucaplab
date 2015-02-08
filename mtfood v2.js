/**
 * Centipede for the OSU Caplab
 * Code by Cody Cooper
 *
 * Based on work by:
 * Josh de Leeuw
 * November 2013
 * 
 * This is a basic template for a jsPsych plugin. Use it to start creating your
 * own plugin. There is more information about how to create a plugin on the
 * jsPsych wiki (https://github.com/jodeleeuw/jsPsych/wiki/Create-a-Plugin).
 * 
 * 
 */
(function( $ ) {
	jsPsych['mtfood'] = (function(){
		var plugin = {};
		plugin.create = function(params) {
			var trials = new Array(5/*params.attributes.length*/);
			for(var i = 0; i < 5/*params.attributes.length*/; i++)
			{
				trials[i] = {};
				trials[i].type = "mtfood";
				trials[i].left_key = params.left_key || 65; // defaults to the 'A' key
                trials[i].right_key = params.right_key || 76; // defaults to the 'L' key
				trials[i].fixation= (typeof params.fixation === 'undefined') ? "+" : params.fixation;
                // supporting the generic data object with the following line
                // is always a good idea. it allows people to pass in the data
                // parameter, but if they don't it gracefully adds an empty object
                // in it's place.
                trials[i].data = (typeof params.data === 'undefined') ? {} : params.data[i];
			}	
			return trials;
		};
		plugin.trial = function(display_element, block, trial, part) {
		
		var bw = 240;
		var bh = 240;
			//padding around grid
		var p = 10;
		var cw = 1.5*bw + (p*2) + 1;
		var ch = bh + (p*2) + 1;
	//********************* TRIAL CONSTRUCTION ***********************************
						if (trial.prompt1 !== "") {
						display_element.append($('<div>', { //stage1 is the main experimental container, all other things are placed relative to this
							"id": 'grids'
						}));
							$('#grids').css({//sets the display elements of the first prompt should be approximately in the middle of screen
													//top:'15%',
													//left:'15%',
													'margin-left': 'auto',
													'margin-right': 'auto',
													left: 0,
													right: 0,
													width: '900px',
													height: '800px',
													'background-color':'#F2F2F2',
													'border-radius': '25px',
													position:'fixed'
												});
						$("#grids").append($('<canvas>', {
							"id": 'LG'
							}));
							$('#LG').css({//sets the display elements of the first prompt should be approximately in the middle of screen
													top : '10%',
													left: '2%',
													//width:cw,
													//height:ch,
													position:'absolute'
												});
							$('#LG').attr({width: cw, height: ch});
						$("#grids").append($('<canvas>', {
							"id": 'RG'
							}));
							$('#RG').css({//sets the display elements of the first prompt should be approximately in the middle of screen
													top : '10%',
													left: '70%',
													position:'absolute'
												});
							$('#RG').attr({width: cw, height: ch});
						
						$("#grids").append($('<div>',{
							"id": 'match',
							html: 'P - Match'
							}));
							$('#match').css({//sets the display elements of the first prompt should be approximately in the middle of screen
													top : '15%',
													left: '40%',
													width: '200px',
													height: '40px',
													'text-align':'center',
													'font-size':'25px',
													'color':'black',
													'border-radius': '5px',
													'border-color': 'black',
													border: '1px solid',
													position:'absolute'
												});	
						$("#grids").append($('<div>',{
							"id": 'mismatch',
							html: 'I - Mismatch'
							}));
							$('#mismatch').css({//sets the display elements of the first prompt should be approximately in the middle of screen
													top : '25%',
													left: '40%',
													width: '200px',
													height: '40px',
													'text-align':'center',
													'font-size':'25px',
													'color':'black',
													'border-radius': '5px',
													'border-color': 'black',
													border: '1px solid',
													position:'absolute'
												});	
						}
	
		// ********************* DRAWING Grids **********************************
			//grid width and height
			
			//size of canvas
			function ranstim(){
			var possible = "abcdefghijklmnopqrstuvwxyz";
			var matrix = new Array(9);
				for(var i=0; i < 9; i++ ){
				var text = "";
				text += possible.charAt(Math.floor(Math.random() * possible.length)) + possible.charAt(Math.floor(Math.random() * possible.length)) ;
					matrix[i]=text;
				}
			return matrix;
			}
		// rbstim randomly selects 2 cells and changes the contents
		function rbstim(x){
			var possible = "abcdefghijklmnopqrstuvwxyz";
			var matrix = new Array(9);
			var n = Math.floor((Math.random() * 10));
			var nn = Math.floor((Math.random() * 10));
			for(var i=0; i <9;i++){
				var text = "";
				if(i==n || i==nn){
				text += possible.charAt(Math.floor(Math.random() * possible.length)) + possible.charAt(Math.floor(Math.random() * possible.length));
				matrix[i]=text;
				}else{
				matrix[i]=x[i];
				}
			}		
			return matrix;
		}
			
		ra = ranstim();
		var trial_type = Math.floor((Math.random() * 2)+1);
		if(trial_type == 1){//set to match
		rb = ra;}
		else if (trial_type ==2){
		rb = rbstim(ra);
		}
		// Draw the left grid
		var leftgrid = document.getElementById("LG");
		var contexta = leftgrid.getContext("2d");
			function drawBoarda(){
				for (var s = 0; s <= bw; s += 80) {
					contexta.moveTo(0.5 + s + p, p);
					contexta.lineTo(0.5 + s + p, bh + p);
				}
				for (var x = 0; x <= bh; x += 80) {
					contexta.moveTo(p, 0.5 + x + p);
					contexta.lineTo(bw + p, 0.5 + x + p);
				}
				contexta.strokeStyle = "black";
				contexta.stroke();
				contexta.font="25px Arial"; // # numbers indicate row and column placement in the grid
				contexta.fillText(ra[0],40,55); 
				contexta.fillText(ra[1],40,135); 
				contexta.fillText(ra[2],40,215); 
				 
				contexta.fillText(ra[3],120,55); 
				contexta.fillText(ra[4],120,135); 
				contexta.fillText(ra[5],120,215); 
				 
				contexta.fillText(ra[6],200,55); 
				contexta.fillText(ra[7],200,135); 
				contexta.fillText(ra[8],200,215); 
			}
		// Draw the right grid
		var rightgrid = document.getElementById("RG");
		var contextb = rightgrid.getContext("2d");
			function drawBoardb(){
				for (var t = 0; t <= bw; t += 80) {
					contextb.moveTo(0.5 + t + p, p);
					contextb.lineTo(0.5 + t + p, bh + p);
				}
				for (var xx = 0; xx <= bh; xx += 80) {
					contextb.moveTo(p, 0.5 + xx + p);
					contextb.lineTo(bw + p, 0.5 + xx + p);
				}
				contextb.strokeStyle = "black";
				contextb.stroke();
				
				contextb.font="25px Arial"; // # numbers indicate row and column placement in the grid
				contextb.fillText(rb[0],40,55); 
				contextb.fillText(rb[1],40,135); 
				contextb.fillText(rb[2],40,215); 
				 
				contextb.fillText(rb[3],120,55); 
				contextb.fillText(rb[4],120,135); 
				contextb.fillText(rb[5],120,215); 
				 
				contextb.fillText(rb[6],200,55); 
				contextb.fillText(rb[7],200,135); 
				contextb.fillText(rb[8],200,215); 
			}
			drawBoarda();
			drawBoardb();
//		*****************		Response Functions	*******************************
						// start measuring response time
						var startTime = (new Date()).getTime();
						// create the function that triggers when a key is pressed.
						var flag_continue = false; // true when a valid key is chosen
						var flag_end = false;
	//*********************** FUNCTION DETECTING AFTER KEY PRESS *********************
						var resp_grid = function(g1) { 
							if (g1.which == 73 || g1.which == 80) // if the participant presses enter 
							{
								flag_continue = true;//
								resp_grid=g1.which;
							}
							if (flag_continue) {
								var endTime = (new Date()).getTime();
								rtcent = (endTime - startTime);
								$(document).unbind('keydown', resp_grid); // remove response function from keys
								contexta.clearRect ( 0 , 0 , bw, bh);// remove left grid before redraw
								contextb.clearRect ( 0 , 0 , bw, bh);// remove right grid before redraw
								ra = ranstim();
								trial_type = Math.floor((Math.random() * 2)+1);
									if(trial_type == 1){//set to match
									rb = ra;}
									else if (trial_type ==2){
									rb = rbstim(ra);
									}
								drawBoarda();
								drawBoardb();
								//plugin.trial(display_element, block, trial, part=1);
							}
						};
						$(document).keydown(resp_grid);
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
        };
        return plugin;
    })();
})(jQuery);
