class DevelopersController < ApplicationController
  before_filter :set_developer, only: [:show, :edit, :update, :destroy]

  def index
    @developers = Developer.all
    respond_to do |format|
      format.html # index.html.erb
      format.json { render json: @developers }
    end
  end

  def show
    respond_to do |format|
      format.html # index.html.erb
      format.json { render json: @developers }
    end
  end

  def new
    @developer = Developer.new
    respond_to do |format|
      format.html # index.html.erb
      format.json { render json: @developers }
    end
  end

  def edit
  end

  def create
    @developer = Developer.new(params[:developer])
    @developer.save
    respond_to do |format|
      format.html # index.html.erb
      format.json { render json: @developers }
    end
  end

  def update
    @developer.update_attributes(params[:developer])
    respond_to do |format|
      format.html # index.html.erb
      format.json { render json: @developers }
    end
  end

  def destroy
    @developer.destroy
    respond_to do |format|
      format.html # index.html.erb
      format.json { render json: @developers }
    end
  end

  private
    def set_developer
      @developer = Developer.find(params[:id])
    end
end
