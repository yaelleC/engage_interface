class Group < ActiveRecord::Base
  has_many :students, :foreign_key => :idGroup
  belongs_to :teacher, :foreign_key => :idTeacher

  attr_accessible :id, :idTeacher, :name, :description

  self.table_name = "group"
end