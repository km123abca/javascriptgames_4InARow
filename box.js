function box(posx,posy,bxwidth=com_box_width)
	{
		this.onScreen=true;
		this.posx=posx;
		this.posy=posy;	
		this.circle_relative=circle_relative;	
		
		this.col='#FF0000';
		this.circle_color='#FFFFFF';

		this.occupied=false;
		

		this.width=bxwidth;
		this.height=bxwidth;

		

		this.xpts=[-this.width/2,this.width/2,this.width/2,-this.width/2];
		this.ypts=[-this.height/2,-this.height/2,this.height/2,this.height/2];


		
		this.putOnWinnerColors=function()
								{
									if(this.circle_color==colors['black'])
										this.circle_color=colors['hardblack'];
									if(this.circle_color==colors['white'])
										this.circle_color=colors['hardwhite'];

								};

		this.move=function()
					{
						if(!this.onScreen) return false;					
						
					};
		this.dr_w_box= function()
				{
				if(!this.onScreen) return false;			
						

				ctx.save();
				ctx.translate(this.posx,this.posy);				
				// ctx.rotate(this.rotangle*Math.PI/180);				
				ctx.fillStyle=this.col;
				ctx.strokeStyle='#000000';
				ctx.beginPath();
				ctx.moveTo(this.xpts[0],this.ypts[0]);
				for(var g=1;g<this.xpts.length;g++)
					ctx.lineTo(this.xpts[g],this.ypts[g]);
				ctx.closePath();
				ctx.fill();
				ctx.stroke();						

				ctx.restore();
				};

		this.dr_w_circle= function()
				{
				if(!this.onScreen) return false;				
				ctx.save();
				ctx.translate(this.posx,this.posy);	

				ctx.fillStyle=this.circle_color;
				ctx.strokeStyle='#000000';
				ctx.beginPath();
				ctx.arc(0,0,this.width*this.circle_relative,0,2*Math.PI);
				ctx.stroke();
				ctx.fill();

				ctx.restore();
				};
	}