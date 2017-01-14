module Jekyll

  class NewsAPIPage < Page
    def initialize(site, base, dir, slug)
      @site = site
      @base = base
      @dir = dir
      @name = 'index.js'

      self.process(@name)
      self.read_yaml(File.join(base, '_layouts'), 'project_news_feed.js')
      self.data["slug"] = slug

    end
  end

  class NewsAPIGenerator < Generator
    safe true

    def generate(site)
      if site.layouts.key? 'project_news_feed'
        dir = 'api/news'
        collections = site.config['news_feed_for'] || []
        collections.each_entry do |collection|
          site.collections[collection].docs.each_entry do |project|
            slug =  project.data["slug"]
              site.pages << NewsAPIPage.new(site, site.source, File.join(dir, slug), slug)
          end
        end
      end
    end
  end

end
