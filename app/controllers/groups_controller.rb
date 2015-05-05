class GroupsController < ApplicationController

	filter_resource_access
	
  # GET /groups
  # GET /groups.json
  def index
    if  !current_user.teacher.nil? 
  	  @groups = current_user.teacher.groups
    else
      @groups = []
    end

  	respond_to do |format|
      format.html # index.html.erb
      format.json { render json: @groups }
    end
  end

  # GET /groups/1
  # GET /groups/1.json
  def show
    @group = Group.find(params[:id])

    respond_to do |format|
      format.html # show.html.erb
      format.json { render json: @group }
    end
  end

  # GET /groups/1/edit
  def edit
    @group = Group.find(params[:id])
  end

  def new
  	@group = Group.new
  end

  def create
  	@group = Group.new(params[:group])
    @group.idTeacher = current_user.teacher.id

  	if @group.save
  		redirect_to groups_url, :notice => "Group created!"
  	else
  		render :new
  	end
  end

  # PUT /serious_games/1
  # PUT /serious_games/1.json
  def update
    @group = Group.find(params[:id])

    respond_to do |format|
      if @group.update_attributes(params[:group])
        format.html { redirect_to groups_url, notice: 'Group updated.' }
        format.json { head :no_content }
      else
        format.html { render action: "edit" }
        format.json { render json: @group.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /groups/1
  # DELETE /groups/1.json
  def destroy
    @group = Group.find(params[:id])
    @group.destroy

    respond_to do |format|
      format.html { redirect_to groups_url, :notice => "Group deleted!"}
      format.json { head :no_content }
    end
  end
end
