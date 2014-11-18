class Student < ActiveRecord::Base
  belongs_to :user
  belongs_to :school
  has_one :std_teacher, :foreign_key => :idStd
  has_one :teacher, through: :std_teacher
  attr_accessible :datebirth, :gender, :idschool

  self.table_name = "student"
end
