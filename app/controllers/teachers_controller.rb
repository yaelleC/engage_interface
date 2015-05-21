class TeachersController < ApplicationController
  filter_resource_access
  # GET /teachers
  # GET /teachers.json
  def index
    @teachers = Teacher.all

    respond_to do |format|
      format.html # index.html.erb
      format.json { render json: @teachers }
    end
  end

  # GET /teachers/1
  # GET /teachers/1.json
  def show
    @teacher = Teacher.find(params[:id])

    respond_to do |format|
      format.html # show.html.erb
      format.json { render json: @teacher }
    end
  end

  # GET /teachers/new
  # GET /teachers/new.json
  def new
    @teacher = Teacher.new
    @teacher.user = User.new

    respond_to do |format|
      format.html # new.html.erb
      format.json { render json: @teacher }
    end
  end

  # GET /teachers/1/edit
  def edit
    @teacher = Teacher.find(params[:id])
  end

  # POST /teachers
  # POST /teachers.json
  def create
    @teacher = Teacher.new(params[:teacher])
    @teacher.user.role = Role.find_by_title('teacher')
    
    respond_to do |format|
      if @teacher.save
        # give access to tutorial games
        SgTeacher.create(idSG: 131, idTeacher: @teacher.id)
        SgTeacher.create(idSG: 126, idTeacher: @teacher.id)

        # create default groups for teachers
        @groupFrench = Group.create(idTeacher: @teacher.id, name: "French")
        @groupGeo = Group.create(idTeacher: @teacher.id, name: "Geography")
        @groupTeachers = Group.create(idTeacher: @teacher.id, name: "Teachers")

        # associate default students for teachers
        StdTeacher.create(idStd: 11, idTeacher: @teacher.id, idGroup: @groupGeo.id)
        StdTeacher.create(idStd: 12, idTeacher: @teacher.id, idGroup: @groupGeo.id)
        StdTeacher.create(idStd: 14, idTeacher: @teacher.id, idGroup: @groupFrench.id)
        StdTeacher.create(idStd: 15, idTeacher: @teacher.id, idGroup: @groupFrench.id)

        format.html { redirect_to login_path, notice: 'Teacher was successfully created.' }
        format.json { render json: @teacher, status: :created, location: @teacher }
      else
        format.html { render action: "new" }
        format.json { render json: @teacher.errors, status: :unprocessable_entity }
      end
    end
  end

  # PUT /teachers/1
  # PUT /teachers/1.json
  def update
    @teacher = Teacher.find(params[:id])

    respond_to do |format|
      if @teacher.update_attributes(params[:teacher])
        format.html { redirect_to @teacher, notice: 'Teacher was successfully updated.' }
        format.json { head :no_content }
      else
        format.html { render action: "edit" }
        format.json { render json: @teacher.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /teachers/1
  # DELETE /teachers/1.json
  def destroy
    @teacher = Teacher.find(params[:id])
    @teacher.destroy

    respond_to do |format|
      format.html { redirect_to teachers_url }
      format.json { head :no_content }
    end
  end
end
