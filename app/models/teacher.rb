class Teacher < ActiveRecord::Base
  belongs_to :user
  belongs_to :school, :foreign_key => :idSchool
  has_many :std_teachers, :foreign_key => :idTeacher
  has_many :students, through: :std_teachers, :foreign_key => :idTeacher
  attr_accessible :idschool

  self.table_name = "teacher"
end
