class LearningAnalyticsController < ApplicationController
  filter_access_to :all
  def index
  	if current_user.role.title != 'admin'
		if not current_user.developer.serious_games.exists?(params[:id]) 
			redirect_to home_index_url
		end
  	end

  end
end
