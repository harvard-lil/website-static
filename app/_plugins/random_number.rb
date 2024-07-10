module Jekyll
  module RandomFilter
    def random_number(input, last_number = nil)
      max = input.to_i
      new_number = rand(1..max)
      
      while new_number == last_number.to_i
        new_number = rand(1..max)
      end
      
      new_number
    end
  end
end

Liquid::Template.register_filter(Jekyll::RandomFilter)