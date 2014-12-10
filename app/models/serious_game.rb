class SeriousGame < ActiveRecord::Base
	# belongs_to :developer, :foreign_key => :idDeveloper
	attr_accessible :id, :created, :ageMin, :ageMax, :country, :description, :language, :name, :version
	has_many :gameplays, :foreign_key => :idSG

	self.table_name = "seriousgame"
	self.primary_key = :id
end
