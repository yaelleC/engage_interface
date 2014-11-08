FROM ruby:1.9-onbuild
# Precompile assets
RUN RAILS_ENV=production bin/rake assets:precompile
EXPOSE 80
CMD rails server -p 80