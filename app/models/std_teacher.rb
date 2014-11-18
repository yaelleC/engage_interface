class StdTeacher < ActiveRecord::Base
  belongs_to :student, :foreign_key => :idStd
  belongs_to :teacher, :foreign_key => :idTeacher
  attr_accessible :idStd, :idTeacher, :groupname

  self.table_name = "std_teacher"
end
