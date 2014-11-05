class UsersController < ApplicationController

	filter_resource_access
	
  # GET /users
  # GET /users.json
  def index
  	@users = User.all

  	respond_to do |format|
      format.html # index.html.erb
      format.json { render json: @serious_games }
    end
  end

  # GET /users/1
  # GET /users/1.json
  def show
    @user = User.find(params[:id])

    respond_to do |format|
      format.html # show.html.erb
      format.json { render json: @serious_game }
    end
  end

  # GET /users/1/edit
  def edit
    @user = User.find(params[:id])
  end

  def new
  	@user = User.new
  end

  def create
  	@user = User.new(params[:user])
  	if @user.save
  		redirect_to users_url, :notice => "User created!"
  	else
  		render :new
  	end
  end

  # PUT /serious_games/1
  # PUT /serious_games/1.json
  def update
    @user = User.find(params[:id])

    respond_to do |format|
      if @user.update_attributes(params[:user])
        format.html { redirect_to users_url, notice: 'User updated.' }
        format.json { head :no_content }
      else
        format.html { render action: "edit" }
        format.json { render json: @user.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /users/1
  # DELETE /users/1.json
  def destroy
    @user = User.find(params[:id])
    @user.destroy

    respond_to do |format|
      format.html { redirect_to users_url, :notice => "User deleted!"}
      format.json { head :no_content }
    end
  end
end
