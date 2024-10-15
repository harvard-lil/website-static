module Jekyll
  module MastodonFilter
    def to_handle(url)
      # URL *must* be in the form 'https://<hostname>/@<username>'
      # and neither hostname nor username can contain slashes.
      parts = url.split('/')
      "#{parts[3]}@#{parts[2]}"
    end
 end
end

Liquid::Template.register_filter(Jekyll::MastodonFilter)
