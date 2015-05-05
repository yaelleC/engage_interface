class Developer < ActiveRecord::Base
  belongs_to :user
  has_many :serious_games, :foreign_key => :idDeveloper
  has_many :config_files, :foreign_key => :idDeveloper

  attr_accessible :id, :user_attributes
  accepts_nested_attributes_for :user
  
  self.table_name = "developer"
end
