authorization do
  role :guest do
    # add permissions for guests here, e.g.
    # has_permission_on :conferences, :to => :read
    has_permission_on :serious_games, :to => :create
    has_permission_on :config_files, :to => :create
  end
  
  role :developer do
    has_permission_on :serious_games, :to => :manage
    has_permission_on :config_files, :to => :create

  #   has_permission_on :conferences, :to => [:read, :create]
  #   has_permission_on :conferences, :to => [:update, :delete] do
  #     if_attribute :user_id => is {user.id}
  #   end
  end
  

  role :admin do
     has_permission_on :users, :to => :manage
     has_permission_on :serious_games, :to => :manage
     has_permission_on :config_files, :to => :manage
  end

end

privileges do
  # default privilege hierarchies to facilitate RESTful Rails apps
  privilege :manage, :includes => [:create, :read, :update, :delete]
  privilege :read, :includes => [:index, :show]
  privilege :create, :includes => :new
  privilege :update, :includes => :edit
  privilege :delete, :includes => :destroy
end
