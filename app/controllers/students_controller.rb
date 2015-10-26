require 'csv'

class StudentsController < ApplicationController
  filter_resource_access
  filter_access_to :csv, :require => :create
  filter_access_to :createcsv, :require => :create
  # GET /students
  # GET /students.json
  def index
    if current_user.teacher.nil?
      @students = []
      @groups = []
    else
      @students = current_user.teacher.students
      @students.sort! { |a,b| a.groups.where("group.idTeacher = ?",  current_user.teacher.id)[0].name.downcase <=> b.groups.where("group.idTeacher = ?",  current_user.teacher.id)[0].name.downcase }
      @groups = current_user.teacher.groups

      #current_user.teacher.students.each do |s|
      #  if (!s.group.nil? && !@groups.include?(s.group))
      #    @groups.push(s.group)
      #  end
      #end
    end

    respond_to do |format|
      format.html # index.html.erb
      format.json { render json: @students }
    end
  end

  # GET /students/1
  # GET /students/1.json
  def show
    
    if current_user.teacher.nil?
      @students = []
      @groups = []
    else
      @student = current_user.teacher.students.find(params[:id])
      @groups = current_user.teacher.groups
    end

    respond_to do |format|
      format.html # show.html.erb
      format.json { render json: @student }
    end
  end

  # GET /students/new
  # GET /students/new.json
  def new
    @student = Student.new
    #@student.user = User.new
    @groups = current_user.teacher.groups

    respond_to do |format|
      format.html # new.html.erb
      format.json { render json: @student }
    end
  end

  # GET /students/csv
  def csv
    @groups = current_user.teacher.groups

    respond_to do |format|
      format.html # csv.html.erb
    end
  end


  # GET /students/1/edit
  def edit
    if current_user.teacher.nil?
      @students = []
      @groups = []
    else
      @student = current_user.teacher.students.find(params[:id])
      @groups = current_user.teacher.groups
    end
  end

  # POST /students
  # POST /students.json
  def create
    @student = Student.new(params[:student])
    @student.idSchool = current_user.teacher.idSchool 

    respond_to do |format|
      if @student.save
          StdTeacher.create(idStd: @student.id, idTeacher: current_user.teacher.id, idGroup: @student.idGroup)
          format.html { redirect_to students_path, notice: 'Student was successfully created.' }
          format.json { render json: @student, status: :created, location: @student }
      else
        format.html { render action: "new" }
        format.json { render json: @student.errors, status: :unprocessable_entity }
      end
    end
  end

  # POST /students
  # POST /students.json
  def createcsv
    
    CSV.foreach(params[:file].path, headers: true) do |row|
      @student = Student.new(row.to_hash)
      @student.idSchool = current_user.teacher.idSchool 
      @student.idGroup = params[:idGroup]
      @student.save
      StdTeacher.create!(idStd: @student.id, idTeacher: current_user.teacher.id, idGroup: @student.idGroup)
    end
    
    respond_to do |format|
      format.html { redirect_to students_path, notice: 'Students successfully created.' }
    end
  end

  # PUT /students/1
  # PUT /students/1.json
  def update
    @student = current_user.teacher.students.find(params[:id])

    respond_to do |format|
      if @student.update_attributes(params[:student])
        StdTeacher.where("idStd = ? AND idTeacher = ?", @student.id, current_user.teacher.id).update_all(idGroup: @student.idGroup)
        format.html { redirect_to students_path, notice: 'Student was successfully updated.' }
        format.json { head :no_content }
      else
        format.html { render action: "edit" }
        format.json { render json: @student.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /students/1
  # DELETE /students/1.json
  def destroy
    StdTeacher.where("idStd = ? AND idTeacher = ?", params[:id], current_user.teacher.id).delete_all
    #@student = current_user.teacher.students.find(params[:id])
    #@student.destroy

    respond_to do |format|
      format.html { redirect_to students_url }
      format.json { head :no_content }
    end
  end
end
