function letter_box(sq_size, pos_x, pos_y){
	this.square = new Kinetic.Rect({
		x: pos_x,
		y: pos_y,
		width: sq_size,
		height: sq_size,
		fill: "#428bca",
		stroke: 'white'
	});

	this.symbol = new Kinetic.Text({
		x: pos_x,
		y: pos_y + sq_size/6,
		fill: "white",
		text: "",
		fontSize: 2 * sq_size/3,
		fontFamily: 'Helvetica',
		height: sq_size,
		width: sq_size,
		align: 'center',
	});

}


function cinta(pos_y, n_cells, sq_size){
	this.current_despl = 0;
	this.n_cells = n_cells;
	this.current_pos = 0;
	this.first_displayed = 0;
	this.sq_size = sq_size;

	this.char_array = Array();
	this.box_array = Array(n_cells);

	this.square_group = new Kinetic.Group({});
	this.symbol_group = new Kinetic.Group({});

	for(var i = 0; i < n_cells; i++){
		var l_box = new letter_box(sq_size, sq_size * (i-1), pos_y)
		this.box_array[i] = l_box
		this.symbol_group.add(l_box.symbol);
		this.square_group.add(l_box.square);
	}

	this.get_square_group = function(){
		return this.square_group;
	}

	this.get_symbol_group = function(){
		return this.symbol_group;
	}

	this.set_input = function(texto){
		for(var i = 0; i < texto.length; i++){
			var pos = (this.first_displayed + Math.floor(n_cells / 2)) % n_cells + i
			new_char = texto.charAt(i);
			if(pos < n_cells && new_char != '_'){
				this.symbol_group.getChildren()[pos].setText(new_char);
			}
			this.char_array[i - this.current_pos] = texto.charAt(i);
		}
	}

	this.get_current_symbol = function(){
		return this.get_symbol(-this.current_pos);
	}

	this.get_symbol = function(pos){
		if(this.char_array[pos]){
			if(this.char_array[pos]!=" "){
				return this.char_array[pos];
			}
		}
		return "_";
	}

	this.set_middle_symbol = function(symbol){
		var pos = (this.first_displayed + Math.floor(this.n_cells / 2)) % this.n_cells;
		if(symbol == "_"){
			this.symbol_group.getChildren()[pos].setText("");
		}
		else{
			this.symbol_group.getChildren()[pos].setText(symbol);
		}
		this.char_array[-this.current_pos] = symbol;
	}

	
	this.mover = function(direction, callback) {
		
		this.current_despl = this.current_despl + direction * sq_size;
		this.current_pos = this.current_pos + direction
		this.first_displayed=(this.first_displayed - direction + this.n_cells) % this.n_cells;

		var target_position;
		var new_symbol = " ";
		var to_move;

		if(direction == -1){
			to_move = (this.first_displayed - 1 + this.n_cells) % this.n_cells;
			target_position = -this.current_despl + (this.n_cells - 2) * this.sq_size;
			if (this.char_array[ -this.current_pos + Math.floor(this.n_cells / 2)]){
				new_symbol = this.char_array[ -this.current_pos + Math.floor(this.n_cells / 2)];
			}
		}
		else{
			to_move = (this.first_displayed + this.n_cells) % this.n_cells;
			target_position = -this.current_despl - this.sq_size;
			if (this.char_array[ -this.current_pos - Math.floor(this.n_cells / 2)]){
				new_symbol = this.char_array[ -this.current_pos - Math.floor(this.n_cells / 2)];
			}
		}
		if(new_symbol == "_"){
			new_symbol = " ";
		}

		var square_to_move = this.square_group.getChildren()[to_move]
		var symbol_to_move = this.symbol_group.getChildren()[to_move]

		var tween_symbols = new Kinetic.Tween({
			  node: this.symbol_group,
			  x: this.current_despl,
			  duration: trans_speed,
			  easing: Kinetic.Easings.EaseInOut,
			  onFinish: function(){
					ready_tapes++;
					square_to_move.setX(target_position);
					symbol_to_move.setX(target_position);
					symbol_to_move.setText(new_symbol);
					if(ready_tapes == 2 * n_tapes && !pause){
						callback();
					}
				}
			});

		var tween_squares = new Kinetic.Tween({
			  node: this.square_group,
			  x: this.current_despl,
			  duration: trans_speed,
			  easing: Kinetic.Easings.EaseInOut,
			  onFinish: function(){
					ready_tapes++;
					square_to_move.setX(target_position);
					symbol_to_move.setX(target_position);
					symbol_to_move.setText(new_symbol);
					if(ready_tapes == 2 * n_tapes && !pause){
						callback();
					}
				}
			});

		tween_symbols.play();
		tween_squares.play();
	}
}
