class AccessStudentGame < ActiveRecord::Base
  belongs_to :student, :foreign_key => :idStd
  belongs_to :serious_game, :foreign_key => :idSG

  attr_accessible :idStd, :idSG, :versionPlayed

  self.table_name = "sg_student"
end