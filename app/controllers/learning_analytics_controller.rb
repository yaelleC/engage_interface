class LearningAnalyticsController < ApplicationController
  filter_access_to :all
  def show
  	if current_user.role.title != 'admin'
		if not current_user.developer.serious_games.exists?(params[:id]) 
			redirect_to home_index_url
		end
  	end
  end

  # GET /learning_analytics
  # GET /learning_analytics.json
  def index
  	if current_user.developer.nil?
      @serious_games = []
    else
      @serious_games = current_user.developer.serious_games(:order => 'created DESC')
    end
    respond_to do |format|
      format.html # index.html.erb
      format.json { render json: @serious_games }
    end
  end
end
