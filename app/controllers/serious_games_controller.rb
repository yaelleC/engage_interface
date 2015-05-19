require 'net/http' ## Include http lib to enable calling the webservice
require 'open-uri'

class SeriousGamesController < ApplicationController
  #filter_resource_access
  # GET /serious_games
  # GET /serious_games.json
  def index
    @serious_games = []

    if !current_user.developer.nil?
      @serious_games = current_user.developer.serious_games(:order => 'created DESC')
    elsif !current_user.teacher.nil?
      @serious_games = current_user.teacher.serious_games.where("version = 0").order("created DESC")

    end
    respond_to do |format|
      format.html # index.html.erb
      format.json { render json: @serious_games }
    end
  end

  # GET /serious_games/1
  # GET /serious_games/1.json
  def show
    if !current_user.developer.nil?
      @serious_game = current_user.developer.serious_games.find(params[:id])
      @versions = []
    elsif !current_user.teacher.nil?
      @serious_game = current_user.teacher.serious_games.find(params[:id])
      @versions = current_user.teacher.serious_games.where("id = ? and (version = 0 OR seriousgame.idTeacher = ?)", params[:id], current_user.teacher.id).order("created ASC")
      
      #@versions = current_user.teacher.serious_games.select("id, name, GROUP_CONCAT(CONCAT(version, ' - ', IFNULL(nameVersion,'?'))) as versions").order("created DESC")
      
    end
    
    @teachers = Teacher.all
    @schools = School.all

    respond_to do |format|
      format.html # show.html.erb
      format.json { render json: @serious_game }
    end
  end

  # GET /serious_games/new
  # GET /serious_games/new.json
  def new

    respond_to do |format|
      format.html # new.html.erb
    end
  end

  # GET /serious_games/1/edit
  # GET /serious_games/1/edit.json
  def edit
    if !current_user.developer.nil?
      @serious_game = current_user.developer.serious_games.find(params[:id])
      @teachers = Teacher.all

      @jsonData = {"idSG" => @serious_game.id}
      @teachersJson = []
      @teacherIds = []
      @teachers.each do |t|
        teacherJson = {"id" => t.id, "username" => t.user.username, "school" => t.school}
        @teachersJson.push(teacherJson)
      end

      @serious_game.teachers.each do |t|
        @teacherIds.push(t.id)
      end

      @jsonData.store("teachers", @teachersJson)
      @jsonData.store("teacherIds", @teacherIds)

    elsif !current_user.teacher.nil?
      @serious_game = current_user.teacher.serious_games.find(params[:id])
      @teachersJson = []
    end

    respond_to do |format|
      format.html # show.html.erb
      format.json { render json: @jsonData }
    end

  end

  # POST /serious_games/1/edit
  # POST /serious_games/1/edit.json
  def edit2
    @jsonAccess = params
    idSG = @jsonAccess['idSG']
    @serious_game = current_user.developer.serious_games.find(params[:id])

    # get list of teachers with access to the game
    sg_teachers_before = SeriousGame.find_by_id(idSG).sg_teachers

    @jsonAccess['teacherIds'].each do |idTeacher|

      # try and find if teacher already has access
      @sg_teacher = SgTeacher.find_by_idSG_and_idTeacher(idSG, idTeacher)

      # if not => create access
      if (@sg_teacher.nil?)
          SgTeacher.create(idSG: idSG, idTeacher: idTeacher)
      end
    end

    # for any access that was before but is not anymore => delete
    sg_teachers_before.each do |sgTeacher|
      if( !@jsonAccess['teacherIds'].include?(sgTeacher.idTeacher) )
        SgTeacher.where("idSG = ? AND idTeacher = ?", idSG, sgTeacher.idTeacher).delete_all
      end
    end

    respond_to do |format|
      format.html { redirect_to serious_games_url, notice: 'Serious game access was successfully updated.' }
      format.json { render json: @jsonAccess }
    end
  end

  # POST /serious_games
  # POST /serious_games.json
  def create
    # Getting config file from POST
    config_file = params[:ConfigFile]

    # Preparing the request to the webservice
    if Rails.env.production?
      url = URI.parse('http://146.191.107.189:8080/seriousgame')
    else
      url = URI.parse('http://ws:8080/seriousgame')
    end
    req = Net::HTTP::Put.new(url.path, initheader = { 'Content-Type' => 'text/plain'})
    req.body = config_file
    # Getting the response
    res = Net::HTTP.start(url.host, url.port) {|http|
      http.request(req)
    }
    # Rendering the response
    if res.code == '200'
      flash[:success] = "Success. Your game ID is : #{res.body}."
      redirect_to action: 'new'
      # Save the config
      if (!current_user.nil? && !current_user.developer.nil?)
        ConfigFile.create(config: config_file, submited: true, idSG: res.body, idDeveloper: current_user.developer.id)
      end
    else 
      flash[:danger] = 'Oups, something went wrong. We could not create the game!'
      redirect_to action: 'new'
      # Save the config
      if (!current_user.nil? && !current_user.developer.nil?)
        ConfigFile.create(config: config_file, submited: true, idDeveloper: current_user.developer.id)
      end
    end 
  end

  # PUT /serious_games/1
  # PUT /serious_games/1.json
  def update
    if !current_user.developer.nil?
      @serious_game = current_user.developer.serious_games.find(params[:id])
    elsif !current_user.teacher.nil?
      @serious_game = current_user.teacher.serious_games.find(params[:id])
    end

    respond_to do |format|
      if @serious_game.update_attributes(params[:serious_game])
        format.html { redirect_to edit_serious_game_path(@serious_game), notice: 'Serious game was successfully updated.' }
        format.json { head :no_content }
      else
        format.html { render action: "edit" }
        format.json { render json: @serious_game.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /serious_games/1
  # DELETE /serious_games/1.json
  def destroy
    if !current_user.developer.nil?
      @serious_game = current_user.developer.serious_games.find(params[:id])
    elsif !current_user.teacher.nil?
      @serious_game = current_user.teacher.serious_games.find(params[:id])
    end
    #@serious_game.destroy
    @serious_game.update_attribute("idDeveloper", 1);

    respond_to do |format|
      format.html { redirect_to serious_games_url }
      format.json { head :no_content }
    end
  end
end
