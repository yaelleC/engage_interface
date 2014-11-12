FROM ruby:1.9-onbuild
# Precompile assets
EXPOSE 80
CMD rails server -p 80