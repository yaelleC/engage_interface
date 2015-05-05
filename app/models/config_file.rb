class ConfigFile < ActiveRecord::Base
  attr_accessible :config, :created_at, :submited, :idSG, :idDeveloper
end
