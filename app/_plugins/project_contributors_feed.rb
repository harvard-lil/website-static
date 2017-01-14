module Jekyll

  class ContributorsAPIPage < Page
    def initialize(site, base, dir, who_contributed)
      @site = site
      @base = base
      @dir = dir
      @name = 'index.js'

      self.process(@name)
      self.read_yaml(File.join(base, '_layouts'), 'project_contributors_feed.js')
      self.data["who_contributed"] = who_contributed

    end
  end

  class ContributorsAPIGenerator < Generator
    safe true

    def generate(site)
      if site.layouts.key? 'project_contributors_feed'
        dir = 'api/contributors'
        collections = site.config['contributors_feed_for'] || []
        collections.each_entry do |collection|
          site.collections[collection].docs.each_entry do |project|
              site.pages << ContributorsAPIPage.new(site, site.source, File.join(dir, project.data["slug"]), project.data["who_contributed"])
          end
        end
      end
    end
  end

end
