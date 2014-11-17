class Developer < ActiveRecord::Base
  belongs_to :user
  has_many :serious_games, :foreign_key => :idDeveloper
  
  attr_accessible :email, :password, :name, :surname
  validates :name, :presence => true
  validates :email, :presence => true
  validates :password, :presence => true

  self.table_name = "developer"
end
