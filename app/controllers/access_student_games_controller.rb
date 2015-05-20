class AccessStudentGamesController < ApplicationController
  filter_resource_access
  
  # GET /access_student_games
  # GET /access_student_games.json
  def index
    #@access_student_games = AccessStudentGame.all

    @studentsAccess = []
    @students = []
    @games = []
    @groups = []

    if !current_user.teacher.nil?
      @groups = []

      current_user.teacher.std_teacher.each do |s_t|
        if !@groups.include?(s_t.group)
          @groups.push(s_t.group)
        end
      end

      @games = current_user.teacher.serious_games
                .select("id, name, GROUP_CONCAT(CONCAT(version, ' - ', IFNULL(nameVersion,'?'))) as versions")
                .where("seriousgame.idTeacher = ? OR seriousgame.idTeacher IS NULL", current_user.teacher.id)
                .order("created DESC").group('id')
      @games.each do |g|
        g.versions = g.versions + ", no access"
      end
      #@games = current_user.teacher.serious_games.where("version = 0").select("idSG, name").order("created DESC")
      @students = current_user.teacher.students(:order => 'idGroup DESC')

      @students.each do |s|
        
        access = s.access_student_games.select("idSG, versionPlayed")
        accessKey = {}

        access.each do |a|
          accessKey.store(a.idSG, a.versionPlayed)
        end

        studentAccess = { "username" => s.username, "id" => s.id, "group" => s.groups.where("group.idTeacher = ?",  current_user.teacher.id), "access" => accessKey }

        #@games.each do |g|
         # if !s.access_student_games.find_by_idSG(g.id).nil? 
          #  version = s.access_student_games.find_by_idSG(g.id).versionPlayed 
           # studentAccess[g.id] = version
        #  end
        #end

        @studentsAccess.push(studentAccess)
      end
    end

    @jsonAccess = {'Games' => @games, 'Groups' => @groups, 'StudentAccess'=> @studentsAccess }

    respond_to do |format|
      format.html # index.html.erb
      format.json { render json: @jsonAccess }
    end
  end

  # POST /access_student_games
  # POST /access_student_games.json
  def create
    
    @jsonAccess = params
    errors = []
    # loop sur contenu
    @jsonAccess['StudentAccess'].each do |studentAccess|
      idStd = studentAccess['id']
      @jsonAccess['Games'].each do |game|
        idSG = game['id']
        # if new json specifies a valid version to play for this game
        if ( !studentAccess['access'][idSG.to_s].nil? && studentAccess['access'][idSG.to_s].to_s.strip != "no access" )
          versionToPlay = studentAccess['access'][idSG.to_s].to_i
          @access_student = AccessStudentGame.find_by_idSG_and_idStd(idSG, idStd)
          # if student didn't have access, create it
          if (@access_student.nil?)
            AccessStudentGame.create(idSG: idSG, idStd: idStd, versionPlayed: versionToPlay)
          else
            AccessStudentGame.where("idSG = ? AND idStd = ?", idSG, idStd).update_all(versionPlayed: versionToPlay)
            if @access_student.save
              errors.push("saved")
            else
              errors.push(@access_student.errors)
            end
          end
        else    
          @access_student = AccessStudentGame.find_by_idSG_and_idStd(idSG, idStd)      
          if (!@access_student.nil?)
            AccessStudentGame.where("idSG = ? AND idStd = ?", idSG, idStd).delete_all
            errors.push("destroyed")
          else
            errors.push(game['name'])
          end
        end
      end
    end

    @jsonAccess.store('errors', errors)

    respond_to do |format|
      format.html { render action: "index" }
      format.json { render json: @jsonAccess }
    end
    
    #@access_student_game = AccessStudentGame.new(params[:access_student_game])
    
    #respond_to do |format|
      #if @access_student_game.save
      #  format.html { redirect_to login_path, notice: 'AccessStudentGame was successfully created.' }
      #  format.json { render json: @jsonAccess, status: :unprocessable_entity }
      #else
      #  format.html { render action: "new" }
      #  format.json { render json: @access_student_game.errors, status: :unprocessable_entity }
      #end
    #end
  end
end
