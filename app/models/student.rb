class Student < ActiveRecord::Base
  belongs_to :user
  belongs_to :school
  has_one :std_teacher, :foreign_key => :idStd
  has_one :teacher, through: :std_teacher

  accepts_nested_attributes_for :user
  attr_accessible :dateBirth, :gender, :idschool, :user_attributes

  self.table_name = "student"
end
