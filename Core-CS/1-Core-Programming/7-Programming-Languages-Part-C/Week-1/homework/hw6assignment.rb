# University of Washington, Programming Languages, Homework 6, hw6runner.rb

# This is the only file you turn in, so do not modify the other files as
# part of your solution.

class MyPiece < Piece
  # The constant All_My_Pieces should be declared here
  All_My_Pieces = Piece::All_Pieces + 
                  [rotations([[-1,0],[0,0],[-1,-1],[0,-1],[1,-1]]), # square with a horn
                   [[[-2,0],[-1,0],[0,0],[1,0],[2,0]], # super long
                    [[0,-2],[0,-1],[0,0],[0,1],[0,2]]],
                   rotations([[0,0],[1,0],[0,1]])] # triangle
  Cheat_Piece = [[0,0]]

  # choose the next piece in all my piece
  def self.next_piece (board, cheat=false)
    if cheat
      MyPiece.new(Cheat_Piece, board)
    else
      MyPiece.new(All_My_Pieces.sample, board)
    end
  end

end

class MyBoard < Board
  # use MyPiece
  def initialize (game)
    @grid = Array.new(num_rows) {Array.new(num_columns)}
    @current_block = MyPiece.next_piece(self)
    @score = 0
    @game = game
    @delay = 500
    @cheat = false # you can now cheat
  end
  # cheat only if your score is higher than 100
  def cheat
    if @score >= 100 && !@cheat
      @score -= 100
      @cheat = true
    end
  end
  # rotate the piece 180 degree
  def rotate_180
    if !game_over? and @game.is_running?
      @current_block.move(0, 0, 2)
    end
    draw
  end
  # gets the next piece
  def next_piece
    @current_block = MyPiece.next_piece(self, @cheat)
    @cheat = false
    @current_pos = nil
  end
  # (0..4)!!
  def store_current
    locations = @current_block.current_rotation
    displacement = @current_block.position
    (0..locations.size-1).each{|index| 
      current = locations[index];
      @grid[current[1]+displacement[1]][current[0]+displacement[0]] = 
      @current_pos[index]
    }
    remove_filled
    @delay = [@delay - 2, 80].max
  end
end

class MyTetris < Tetris
  # use MyBoard
  def set_board
    @canvas = TetrisCanvas.new
    @board = MyBoard.new(self)
    @canvas.place(@board.block_size * @board.num_rows + 3,
                  @board.block_size * @board.num_columns + 6, 24, 80)
    @board.draw
  end
  # add key u to rotate 180
  def key_bindings
    super
    # rotate 180 deg
    @root.bind('u', proc {@board.rotate_180})
    # cheat
    @root.bind('c', proc {@board.cheat})
  end
end


