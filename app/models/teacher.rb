class Teacher < ActiveRecord::Base
  belongs_to :user
  belongs_to :school, :foreign_key => :idSchool
  #has_many :std_teacher, :foreign_key => :idTeacher
  #has_many :students, through: :std_teacher, :foreign_key => :idTeacher
  has_many :students, through: :groups, :foreign_key => :idTeacher
  has_many :groups, :foreign_key => :idTeacher

  has_many :sg_teachers, :foreign_key => :idTeacher
  has_many :serious_games, through: :sg_teachers, :foreign_key => :idTeacher

  attr_accessible :id, :idSchool, :user_attributes
  accepts_nested_attributes_for :user

  self.table_name = "teacher"
end
