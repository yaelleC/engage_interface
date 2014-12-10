class Gameplay < ActiveRecord::Base
  belongs_to :serious_game, :foreign_key => :idSG

  attr_accessible :version, :created, :lastAction, :ended

  self.table_name = "gameplay"
end
