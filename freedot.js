function freedot(posx,posy,bxwidth,col,hooked=false)
	{
		this.onScreen=true;
		this.posx=posx;
		this.posy=posy;
		this.width=bxwidth;
		this.hooked=hooked;
		this.movable=false;
		this.j=-1;

		this.circle_relative=circle_relative;
		

		

		if(col=='black') 
			{
			this.col='#0000e6';
			this.cold='black';
			}
		else
			{
			this.col='#66ffcc';
			this.cold='white';
			}

		

		this.hook_on_to_box=function()
								{
									if(!this.onScreen) return false;

									var box_num=Math.floor((this.posy-boardy)/com_box_width);
									// console.log('passing through box num:'+box_num);
									if(this.j==-1)
										{
										this.onScreen=false;
										alert('This is strange..j was never set ');

										hookLock=false;
										toggle_turn();

										return false;
										}

									if(box_num>=num_rows)
										{
										this.onScreen=false;
										alert('ball passed through');
										hookLock=false;
										toggle_turn();
										return false;
										}

									
									if(box_num==(num_rows-1))
										{
											this.onScreen=false;
											gbox.boardMatrix[box_num][this.j]=this.cold;
											gbox.childrenx[num_columns*box_num+this.j].circle_color=this.col;
											hookLock=false;
											toggle_turn();
											return true;
										}

									if(gbox.boardMatrix[box_num+1][this.j]!='n')
										{
											this.onScreen=false;
											gbox.boardMatrix[box_num][this.j]=this.cold;
											gbox.childrenx[num_columns*box_num+this.j].circle_color=this.col;
											hookLock=false;
											toggle_turn();
											return true;
										}

								};
		this.dr_w= function()
				{
				if(!this.onScreen) return false;				
				ctx.save();
				ctx.translate(this.posx,this.posy);	

				ctx.fillStyle=this.col;
				ctx.strokeStyle='#000000';
				ctx.beginPath();
				ctx.arc(0,0,this.width*this.circle_relative,0,2*Math.PI);
				ctx.stroke();
				ctx.fill();

				ctx.restore();
				};
		this.clicked_me=function(mx,my)
						{							
							var rad=this.width*this.circle_relative;
							
							if (((mx-this.posx)**2+(my-this.posy)**2)<(rad*rad))
								{									
									return true;
								}
							return false;
						};
		this.move=function()
					{
						if((this.hooked)&&!this.movable)
							{
								this.posx=mouseX;
								this.posy=mouseY;
							}
						if(this.movable)
							{
								this.posy+=5;
								this.hook_on_to_box();
								if(this.posy>canvas.height)
									this.onScreen=false;
							}

					};
	}