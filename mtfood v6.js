/**
 * Multitasking experiment for the OSU Caplab
 * Code by Cody Cooper
 *
 * Based on work by:
 * Josh de Leeuw
 * November 2013
 * 
 * 
 * 
 */
(function( $ ) {
	jsPsych['mtfood'] = (function(){
		var plugin = {};
		plugin.create = function(params) {
			var trials = new Array(params.stim.length);
			for(var i = 0; i < params.stim.length; i++)
			{
				trials[i] = {};
				trials[i].type = "mtfood";
				trials[i].Limg = params.stim[i][0];
				trials[i].Rimg = params.stim[i][1];
                // supporting the generic data object with the following line
                // is always a good idea. it allows people to pass in the data
                // parameter, but if they don't it gracefully adds an empty object
                // in it's place.
                trials[i].data = (typeof params.data === 'undefined') ? {} : params.data[i];
			}	
			return trials;
		};
		var x = 0;
	plugin.trial = function(display_element, block, trial, part) {
		var bw = 240;
		var bh = 240;
			//padding around grid
		var p = 10;
		var cw = 1.5*bw + (p*2) + 1;
		var ch = bh + (p*2) + 1;
		var a = 1;
		
	//********************* TRIAL CONSTRUCTION ***********************************
	if(x==0){//so it does not redraw on every trial
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
							html: 'L - Match'
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
							html: 'J - Mismatch'
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
		// Draw the right grid
		var rightgrid = document.getElementById("RG");
		var contextb = rightgrid.getContext("2d");
		// Draw the left grid
		var leftgrid = document.getElementById("LG");
		var contexta = leftgrid.getContext("2d");
		ra = ranstim();
		var trial_type = Math.floor((Math.random() * 2)+1);
		if(trial_type == 1){//set to match
		rb = ra;}
		else if (trial_type ==2){
		rb = rbstim(ra);
		}
		drawBoarda();
		drawBoardb();
		grid_timer = setInterval(function() {//acts as trial timer for the grid
								switch(a){
									case 1:
										grid1=9999;
										gRT1 = 9999;
									break;
									case 2:
										grid2=9999;
										gRT2 = 9999;
									break;
									case 3:
										grid3=9999;
										gRT3 = 9999;
									break;
									case 4:
										grid4=9999;
										gRT4 = 9999;
									break;
									case 5:
										grid5=9999;
										gRT5 = 9999;
									break;
									case 6:
										grid6= 9999;
										gRT6 = 9999;
									break;
									case 7:
										grid7= 9999;
										gRT7 = 9999;
									break;
									case 8:
										grid8= 9999;
										gRT8 = 9999;
									break;
									case 9:
										grid9= 9999;
										gRT9 = 9999;
									break;
									case 10:
										grid10= 9999;
										gRT10 = 9999;
									break;
									case 11:
										grid11= 9999;
										gRT11 = 9999;
									break;
									case 12:
										grid12=9999;
										gRT12 = 9999;
									break;
									case 13:
										grid13=9999;
										gRT13 = 9999;
									break;
									case 14:
										grid14=9999;
										gRT14 = 9999;
									break;
									case 15:
										grid15=9999;
										gRT15 = 9999;
									break;
								}//end switch********************************************************************************************************************
								ra = ranstim();
								trial_type = Math.floor((Math.random() * 2)+1);
									if(trial_type == 1){//set to match
									rb = ra;}
									else if (trial_type ==2){
									rb = rbstim(ra);
									}
								contexta.clearRect (0,0,bw,bh);// remove left grid before redraw
								contextb.clearRect (0,0,bw,bh);// remove right grid before redraw
								drawBoarda();
								drawBoardb();
								a=a+1;
							}, 7000);//will terminate after 7000ms		
		$("#grids").append($('<div>',{
							"id": 'choice',
							html: 'Press "A" to choose the item on the left <br> Press "D" to choose the item on the right'
							}));
							$('#choice').css({//sets the display elements of the first prompt should be approximately in the middle of screen
													top : '47%',
													left: '22%',
													width: '500px',
													height: '65px',
													'text-align':'center',
													'font-size':'25px',
													'color':'black',
													'border-radius': '5px',
													'border-color': 'black',
													border: '1px solid',
													position:'absolute'
												});		
		
	}
	x=1;
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
	
//		*****************		Response Functions			*******************************
						// start measuring response time
						var startTimegrid = (new Date()).getTime();
						// create the function that triggers when a key is pressed.
						var flag_continue = false; // true when a valid key is chosen
						var flag_end = false;
	//*********************** FUNCTION DETECTING AFTER KEY PRESS *********************
	//			Images
				$("#grids").append($('<img>', {
							"id":"imgleft",
							//src: trial.Limg
						}));				
					$('#imgleft').css({//sets the display elements of the first prompt should be approximately in the middle of screen
													top : '60%',
													left: '4%',
													width: '240px',
													height: '240px',
													'text-align':'center',
													'font-size':'25px',
													'color':'black',
													'border-radius': '5px',
													'border-color': 'black',
													border: '1px solid',
													position:'absolute'
												});			
					$("#grids").append($('<img>', {
							"id":"imgright",
							//src: trial.Rimg
						}));				
					$('#imgright').css({//sets the display elements of the first prompt should be approximately in the middle of screen
													top : '60%',
													left: '70%',
													width: '240px',
													height: '240px',
													'text-align':'center',
													'font-size':'25px',
													'color':'black',
													'border-radius': '5px',
													'border-color': 'black',
													border: '1px solid',
													position:'absolute'
												});
					
		switch (part){
		case 1:
		//reset the grid variables
		grid1 = '';grid2 = '';grid3 = '';grid4 = '';grid5 = '';
		grid6 = '';grid7 = '';grid8 = '';grid9 = '';grid10 = '';
		grid11 = '';grid12 = '';grid13 = '';grid14 = '';grid15= '';
		
		gRT1 = '';gRT2 = '';gRT3 = '';gRT4 = '';gRT5 = '';
		gRT6 = '';gRT7 = '';gRT8 = '';gRT9 = '';gRT10 = '';
		gRT11 = '';gRT12 = '';gRT13 = '';gRT14 = '';gRT15= '';
		
		// set the image for the new trial
			$("#imgleft").attr({src:trial.Limg});
			$("#imgright").attr({src:trial.Rimg});
			
		// define the response function of the grid
					var resp_grid = function(g1) { 
							if (g1.which == 74 || g1.which == 76) // if the participant presses enter 
							{
								flag_continue = true;// 
								switch(a){//used to determine which variable to write to. Can't figure out how to write array in trial_data. Would be more efficient.
									case 1:
										grid1=g1.which;
										gRT1 = (new Date()).getTime()-startTimegrid;
									break;
									case 2:
										grid2=g1.which;
										gRT2 = (new Date()).getTime()-startTimegrid;
									break;
									case 3:
										grid3=g1.which;
										gRT3 = (new Date()).getTime()-startTimegrid;
									break;
									case 4:
										grid4=g1.which;
										gRT4 = (new Date()).getTime()-startTimegrid;
									break;
									case 5:
										grid5=g1.which;
										gRT5 = (new Date()).getTime()-startTimegrid;
									break;
									case 6:
										grid6=g1.which;
										gRT6 = (new Date()).getTime()-startTimegrid;
									break;
									case 7:
										grid7=g1.which;
										gRT7 = (new Date()).getTime()-startTimegrid;
									break;
									case 8:
										grid8=g1.which;
										gRT8 = (new Date()).getTime()-startTimegrid;
									break;
									case 9:
										grid9=g1.which;
										gRT9 = (new Date()).getTime()-startTimegrid;
									break;
									case 10:
										grid10=g1.which;
										gRT10 = (new Date()).getTime()-startTimegrid;
									break;
									case 11:
										grid11=g1.which;
										gRT11 = (new Date()).getTime()-startTimegrid;
									break;
									case 12:
										grid12=g1.which;
										gRT12 = (new Date()).getTime()-startTimegrid;
									break;
									case 13:
										grid13=g1.which;
										gRT13 = (new Date()).getTime()-startTimegrid;
									break;
									case 14:
										grid14=g1.which;
										gRT14 = (new Date()).getTime()-startTimegrid;
									break;
									case 15:
										grid15=g1.which;
										gRT15 = (new Date()).getTime()-startTimegrid;
									break;
								}//end switch
							}
							if (flag_continue) {// not necessary but seperating everyhing out.
								clearInterval(grid_timer);
								//rtgrid[a] = (endTime - startTimegrid);
								// should write as a function
								leftgrid = document.getElementById("LG");
								contexta = leftgrid.getContext("2d");
								rightgrid = document.getElementById("RG");
								contextb = rightgrid.getContext("2d");
								contexta.clearRect (0,0,bw,bh);// remove left grid before redraw
								contextb.clearRect (0,0,bw,bh);// remove right grid before redraw
								ra = ranstim();
								trial_type = Math.floor((Math.random() * 2)+1);
									if(trial_type == 1){//set to match
									rb = ra;}
									else if (trial_type ==2){
									rb = rbstim(ra);
									}
								drawBoarda();
								drawBoardb();
								startTimegrid = (new Date()).getTime();
								a=a+1;
								flag_continue = false;
//**********************************************Gird Timer *****************************************************************************************************************************
							grid_timer = setInterval(function() {//acts as trial timer for the grid. Have to place in response function to reset. Callback to original?
							switch(a){
									case 1:
										grid1=9999;
										gRT1 = 9999;
									break;
									case 2:
										grid2=9999;
										gRT2 = 9999;
									break;
									case 3:
										grid3=9999;
										gRT3 = 9999;
									break;
									case 4:
										grid4=9999;
										gRT4 = 9999;
									break;
									case 5:
										grid5=9999;
										gRT5 = 9999;
									break;
									case 6:
										grid6= 9999;
										gRT6 = 9999;
									break;
									case 7:
										grid7= 9999;
										gRT7 = 9999;
									break;
									case 8:
										grid8= 9999;
										gRT8 = 9999;
									break;
									case 9:
										grid9= 9999;
										gRT9 = 9999;
									break;
									case 10:
										grid10= 9999;
										gRT10 = 9999;
									break;
									case 11:
										grid11= 9999;
										gRT11 = 9999;
									break;
									case 12:
										grid12=9999;
										gRT12 = 9999;
									break;
									case 13:
										grid13=9999;
										gRT13 = 9999;
									break;
									case 14:
										grid14=9999;
										gRT14 = 9999;
									break;
									case 15:
										grid15=9999;
										gRT15 = 9999;
									break;
								}//end switch********************************************************************************************************************
								ra = ranstim();
								trial_type = Math.floor((Math.random() * 2)+1);
									if(trial_type == 1){//set to match
									rb = ra;}
									else if (trial_type ==2){
									rb = rbstim(ra);
									}
								leftgrid = document.getElementById("LG");
								contexta = leftgrid.getContext("2d");
								rightgrid = document.getElementById("RG");
								contextb = rightgrid.getContext("2d");
								contexta.clearRect (0,0,bw,bh);// remove left grid before redraw
								contextb.clearRect (0,0,bw,bh);// remove right grid before redraw
								drawBoarda();
								drawBoardb();
								startTimegrid = (new Date()).getTime();
								a=a+1;
							}, 7000);//will terminate after 7000ms		
						}
						};
						//'activate' the response function
						$(document).keydown(resp_grid);
						
					var flag_pic=false;	
					var startTimepic = (new Date()).getTime();					
					var resp_pic= function(p1) { 
							if (p1.which == 65 || p1.which == 68) // if the participant presses enter 
							{
								flag_pic = true;//
								pic_Resp= p1.which;
							}
							if (flag_pic) {
								var endTime = (new Date()).getTime();
								rtpic = (endTime - startTimepic);
								plugin.trial(display_element, block, trial, part + 1);
								//if statement to switch out of main task
								clearInterval(pic_timer);//cancel the timeout event at the end of this case
								flag_pic=false;	
							}
						};
					$(document).keydown(resp_pic);
						pic_timer=setInterval(function() {//acts as trial timer for the pic
								rtpic=999;
								pic_Resp=999;//
								plugin.trial(display_element, block, trial, part + 1);
							}, 5000);
			break;
			case 2:
			a=1;
				//$('#grids').remove();
				$(document).unbind('keydown', resp_pic); // remove response function from keys
				//$(document).unbind('keydown', resp_grid); // remove response function from keys
							var trial_data = {
								'trial_type':'mtfood',
								trial_index: block.trial_idx,
								"Pic_Resp": pic_Resp,
								'Pic_RT':rtpic,
								// grid response data
								'grid1':grid1,'grid2':grid2,'grid3':grid3,'grid4':grid4,'grid5':grid5,
								'grid6':grid6,'grid7':grid7,'grid8':grid8,'grid9':grid9,'grid10':grid10,
								'grid11':grid11,'grid12':grid12,'grid13':grid13,'grid14':grid14,'grid15':grid15,
								//Grid RT data
								'gRT1':gRT1,'gRT2':gRT2,'gRT3':gRT3,'gRT4':gRT4,'gRT5':gRT5,
								'gRT6':gRT6,'gRT7':gRT7,'gRT8':gRT8,'gRT9':gRT9,'gRT10':gRT10,
								'gRT11':gRT11,'gRT12':gRT12,'gRT13':gRT13,'gRT14':gRT14,'gRT15':gRT15,
								// Image shown during experiment
								'Left_image':trial.Limg,
								'Right_image':trial.Rimg
							};
							block.writeData($.extend({}, trial_data, trial.data));
					setTimeout(function() {block.next();}, 100);//need to wait so data can write
			break;
            }// End switch function
			
        };
        return plugin;
    })();
})(jQuery);