class GameVersion < ActiveRecord::Base
	# belongs_to :developer, :foreign_key => :idDeveloper
	attr_accessible :id, :created, :ageMin, :ageMax, :country, :description, :language, :name, :version, :public, :url
	has_many :gameplays, :foreign_key => :idSG
	has_one :config_file, :foreign_key => :idSG

  	has_many :teachers, :foreign_key => :idTeacher

	self.table_name = "seriousgame"
end