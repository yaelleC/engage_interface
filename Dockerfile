FROM ruby:1.9.3-onbuild
RUN rake db:setup
EXPOSE 80
CMD rails server -p 80