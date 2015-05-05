class AccessStudentGamesController < ApplicationController
  filter_resource_access
  
  # GET /access_student_games
  # GET /access_student_games.json
  def index
    #@access_student_games = AccessStudentGame.all

    @studentsAccess = []
    @students = []
    @games = []

    if !current_user.teacher.nil?
      @games = current_user.teacher.serious_games.where("version = 0").select("idSG, name").order("created DESC")
      @students = current_user.teacher.students(:order => 'idGroup DESC')

      @students.each do |s|
        
        studentAccess = { "username" => s.username, "id" => s.id, "group" => s.group, "access" => s.access_student_games.select("idSG, versionPlayed") }

        #@games.each do |g|
         # if !s.access_student_games.find_by_idSG(g.id).nil? 
          #  version = s.access_student_games.find_by_idSG(g.id).versionPlayed 
           # studentAccess[g.id] = version
        #  end
        #end

        @studentsAccess.push(studentAccess)
      end

    end

    @jsonAccess = {'Games' => @games, 'StudentAccess'=> @studentsAccess }

    respond_to do |format|
      format.html # index.html.erb
      format.json { render json: @jsonAccess }
    end
  end

  # GET /access_student_games/1
  # GET /access_student_games/1.json
  def show
    @access_student_game = AccessStudentGame.find(params[:id])

    respond_to do |format|
      format.html # show.html.erb
      format.json { render json: @access_student_game }
    end
  end

  # GET /access_student_games/new
  # GET /access_student_games/new.json
  def new
    @access_student_game = AccessStudentGame.new

    respond_to do |format|
      format.html # new.html.erb
      format.json { render json: @access_student_game }
    end
  end

  # GET /access_student_games/1/edit
  def edit
    @access_student_game = AccessStudentGame.find(params[:id])
  end

  # POST /access_student_games
  # POST /access_student_games.json
  def create
    @access_student_game = AccessStudentGame.new(params[:access_student_game])
    
    respond_to do |format|
      if @access_student_game.save
        format.html { redirect_to login_path, notice: 'AccessStudentGame was successfully created.' }
        format.json { render json: @access_student_game, status: :created, location: @access_student_game }
      else
        format.html { render action: "new" }
        format.json { render json: @access_student_game.errors, status: :unprocessable_entity }
      end
    end
  end

  # PUT /access_student_games/1
  # PUT /access_student_games/1.json
  def update
    @access_student_game = AccessStudentGame.find(params[:id])

    respond_to do |format|
      if @access_student_game.update_attributes(params[:access_student_game])
        format.html { redirect_to @access_student_game, notice: 'AccessStudentGame was successfully updated.' }
        format.json { head :no_content }
      else
        format.html { render action: "edit" }
        format.json { render json: @access_student_game.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /access_student_games/1
  # DELETE /access_student_games/1.json
  def destroy
    @access_student_game = AccessStudentGame.find(params[:id])
    @access_student_game.destroy

    respond_to do |format|
      format.html { redirect_to access_student_games_url }
      format.json { head :no_content }
    end
  end
end
