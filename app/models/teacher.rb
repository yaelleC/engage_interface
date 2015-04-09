class Teacher < ActiveRecord::Base
  belongs_to :user
  belongs_to :school, :foreign_key => :idSchool
  has_many :std_teachers, :foreign_key => :idTeacher
  has_many :students, through: :std_teachers, :foreign_key => :idTeacher

  has_many :sg_teachers, :foreign_key => :idTeacher
  has_many :serious_games, through: :sg_teachers, :foreign_key => :idTeacher

  attr_accessible :idSchool, :user_attributes
  accepts_nested_attributes_for :user

  self.table_name = "teacher"
end
