source "https://rubygems.org"

gem "jekyll", "~> 4.4.1"

gem "alembic-jekyll-theme", "~> 4.1"

# Plugins
group :jekyll_plugins do
  gem "jekyll-feed", "~> 0.12"
  gem "jekyll-sass-converter"
end

# Windows-specific gems
platforms :mingw, :x64_mingw, :mswin, :jruby do
  gem "tzinfo", ">= 1", "< 3"
  gem "tzinfo-data"
  gem "wdm", "~> 0.1" if Gem.win_platform?
end

# JRuby-specific
gem "http_parser.rb", "~> 0.6.0", :platforms => [:jruby]