class ConfigFile < ActiveRecord::Base
  attr_accessible :id, :config, :created_at, :submited, :idSG, :idDeveloper
end
