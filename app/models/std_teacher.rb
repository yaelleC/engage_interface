class StdTeacher < ActiveRecord::Base
  belongs_to :student, :foreign_key => :idStd
  belongs_to :teacher, :foreign_key => :idTeacher
  belongs_to :group, :foreign_key => :idGroup  
  attr_accessible :idStd, :idTeacher, :idGroup

  self.table_name = "std_teacher"
end
