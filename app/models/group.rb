class Group < ActiveRecord::Base
  has_many :std_teacher, :foreign_key => :idGroup
  has_many :students, through: :std_teacher, :foreign_key => :idStd
  belongs_to :teacher, :foreign_key => :idTeacher

  attr_accessible :id, :idTeacher, :name, :description

  self.table_name = "group"
end