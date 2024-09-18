module Jekyll
    module IsEven

        def is_even(number)
            number.even?
        end

    end
end

Liquid::Template.register_filter(Jekyll::IsEven)
