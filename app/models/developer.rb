class Developer < ActiveRecord::Base
  belongs_to :user
  has_many :serious_games, :foreign_key => :idDeveloper
  
  self.table_name = "developer"
end
