class SeriousGame < ActiveRecord::Base
	# belongs_to :developer, :foreign_key => :idDeveloper
	attr_accessible :id, :created, :ageMin, :ageMax, :country, :description, :language, :name, :version, :public, :url
	has_many :gameplays, :foreign_key => :idSG
	has_one :config_file, :foreign_key => :idSG


  	has_many :sg_teachers, :foreign_key => :idSG
  	has_many :teachers, through: :sg_teachers, :foreign_key => :idSG
  	has_many :sg_school, :foreign_key => :idSG
  	has_many :schools, through: :sg_school, :foreign_key => :idSG

	self.table_name = "seriousgame"
	self.primary_key = :id
end
