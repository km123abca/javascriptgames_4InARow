function randomObj(objName,posx1,posx2,posy,scalex=1)
	{
		this.objName=objName;
		this.blackX=posx1;
		this.whiteX=posx2;

		this.posx=posx1;
		this.posy=posy;
		this.listOfImages={'arrow':'arrowD.png'};
		this.img=new Image();
		this.img.src=this.listOfImages[this.objName];
		this.width=80;
		this.height=20;
		this.scalex=scalex;
		this.onScreen=true;
		this.move_timer=0;
		this.velx=2;

		

		this.dr_w= function()
				{
					// this.dr_w_border();
					if(!this.onScreen) return false;					
					ctx.save();
					ctx.translate(this.posx,this.posy);
					
					ctx.scale(this.scalex,1);
					ctx.drawImage(this.img,-this.width/2,-this.height/2,this.width,this.height);

					ctx.restore();
				};	
		this.move=function()
				{
					this.posx+=this.velx;
					this.move_timer+=1;
					if(this.move_timer>10)
						{
							this.velx*=-1;
							this.move_timer=0;
						}
				};
		this.shiftPos=function(colPar)
				{
					if(colPar=='white') {this.posx=this.whiteX;this.scalex=-1;}
					else {this.posx=this.blackX;this.scalex=1;}
				};
	}