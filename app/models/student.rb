class Student < ActiveRecord::Base
  belongs_to :user
  belongs_to :school, :foreign_key => :idSchool  
  belongs_to :group, :foreign_key => :idGroup  
  #has_many :std_teacher, :foreign_key => :idStd
  #has_many :teachers, through: :group
  has_many :access_student_games, :foreign_key => :idStd

  has_many :serious_games, through: :access_student_game, :foreign_key => :idStd

  accepts_nested_attributes_for :user
  attr_accessible :dateBirth, :gender, :idSchool, :user_attributes, :id, :idTeacher, :idGroup, :password, :username

  self.table_name = "student"
end
