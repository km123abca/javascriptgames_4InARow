function player(posx,posy,isauto=false)
	{
		this.onScreen=true;
		this.posx=posx;
		this.posy=posy;
		this.rotangle=0;
		this.auto_obj=isauto;
		
		this.col='#FF0000';
		if(this.auto_obj)
			this.col='#00FF00';

		this.width=60;
		this.height=40;

		this.velx=4;
		this.vely=4;
		this.rotvel=5;

		this.xpts=[-this.width/2,this.width/2,this.width/2,-this.width/2];
		this.ypts=[-this.height/2,-this.height/2,this.height/2,this.height/2];


		this.col_check=function()
						{
							if(this.auto_obj) return false;
							var collision_info='good stuff';
							for(var p of players)
							{
								if (p==this) continue;
								collision_info=check_intrusion(this,p);
								str2print=collision_info;
							}
						};

		this.move=function()
					{
						if(!this.onScreen) return false;

						this.col_check();
						if(fPress)
							{
								if(this.auto_obj)
								this.rotangle+=this.rotvel;
							}
						if(gPress)
							{
								if(!this.auto_obj)
								this.rotangle+=this.rotvel;
							}

						if(this.auto_obj) return false;

						if(leftPress)
							{
								this.posx-=this.velx;								
							}
						if(rightPress)
							{
								this.posx+=this.velx;								
							}
						if(upPress)
							{								
								this.posy-=this.vely;
							}
						if(downPress)
							{								
								this.posy+=this.vely;
							}

						
						
					};
		this.dr_w= function()
				{
				if(!this.onScreen) return false;

				// if(!this.auto_obj) 
				// {
				// 	alert('stop');
				// 	console.log('inside draw of red');	
				// }
				// else
				// 	console.log('inside draw of green');			

				ctx.save();
				ctx.translate(this.posx,this.posy);				
				ctx.rotate(this.rotangle*Math.PI/180);
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
	}