engage_interface
================

The web interface of EngAGe

Building locally
----------------
Run bundle install

    # Bundle install
    docker run --rm -v "$(pwd)":/usr/src/app -w /usr/src/app ruby:1.9.3 bundle install
    # Build
    fig build;
    # Start
    fig up
    # Migrate database
    fig run --rm rails rake db:migrate
    # Install seeds
    fig run --rm rails rake db:seed
    # Run generator
    fig run --rm rails rails generate ...

