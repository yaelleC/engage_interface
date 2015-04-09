class Student < ActiveRecord::Base
  belongs_to :user
  belongs_to :school, :foreign_key => :idSchool
  has_many :std_teacher, :foreign_key => :idStd
  has_many :teacher, through: :std_teacher

  accepts_nested_attributes_for :user
  attr_accessible :dateBirth, :gender, :idschool, :user_attributes

  self.table_name = "student"
end
