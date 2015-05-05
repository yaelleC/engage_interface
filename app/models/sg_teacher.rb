class SgTeacher < ActiveRecord::Base
  belongs_to :serious_game, :foreign_key => :idSG
  belongs_to :teacher, :foreign_key => :idTeacher
  attr_accessible :idSG, :idTeacher

  self.table_name = "sg_teacher"
end