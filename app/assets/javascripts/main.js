var _paq = _paq || [];
/* tracker methods like "setCustomDimension" should be called before "trackPageView" */
_paq.push(['trackPageView']);
_paq.push(['enableLinkTracking']);

function setVh() {
    const setValue = () => {
        var vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);

    }
    setValue();
    window.addEventListener('resize', setValue);
}

function prefersReducedMotion() {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

function safeDuration(duration) {
    return prefersReducedMotion() ? 0 : duration;
}

function createCycler(min, max) {
    let current = min;

    return function() {
        const returnValue = current; // Store the current value to return
        current = current < max ? current + 1 : 1; // Cycle through 1-6
        return returnValue; // Return the current value
    };
}

/*
* https://github.com/daviddarnes/jekyll-search-js
*/

class jekyllSearch {
    constructor(dataSource, searchField, resultsList, resultsSummary, form, clearButton) {
      this.dataSource = dataSource
      this.searchField = document.querySelector(searchField)
      this.resultsList = document.querySelector(resultsList)
      this.resultsSummary = document.querySelector(resultsSummary)
      this.clearButton = document.querySelector(clearButton)
      this.form = form
  
      this.displayResults = this.displayResults.bind(this)
    }
  
    fetchedData() {
      return fetch(this.dataSource)
        .then(blob => blob.json())
    }
  
    async findResults() {
      const data = await this.fetchedData()
      return data.filter(item => {
        const regex = new RegExp(this.searchField.value, 'gi')
        const title = item.title?.toString() || ''
        return (title && title.match(regex)) || item.content.match(regex)
      })
    }
  
    async displayResults() {
      const results = await this.findResults()
      const cycler = createCycler(1,6);
      const html = results.map(item => {
        return `
          <article class="flex flex-col gap-8 relative">
            <header class="aspect-square w-full bg-gray relative">
              ${item.image && item.image !== null && item.image !== '' ? (
                `<object data="${item.image}" class="w-full h-full object-cover absolute inset-0">
                    <img src="/assets/images/blog-thumbnail-${cycler()}.png" class="w-full h-full object-cover absolute inset-0" alt="" />
                 </object>`
              ) : ''}
            </header>
            <h2 class="text-18 leading-115 font-medium" itemprop="headline">
              <a href="${item.url}" class="card-link">${item.title}</a>
            </h2>
            <time class="text-18 leading-00" datetime="${item.date}">${item.date}</time>
          </article>`
        }).join('')
      if(this.searchField.value === '') {
        this.resultsList.innerHTML = ''
      } else if (this.searchField.value !== '' && results.length == 0) {
        this.resultsSummary.innerHTML = '0 results found'
        this.resultsList.innerHTML = `<p class="body-text no-results col-span-2 md:col-span-4">0 results for "${this.searchField.value}"</p>`
      } else {
        this.resultsSummary.innerHTML = `${results.length} results found`
        this.resultsList.innerHTML = html
      }
    }

    reset() {
        this.resultsList.innerHTML = ''
        this.searchField.value = ''
        this.resultsSummary.innerHTML = 'Search cleared'
        const url = window.location.href?.split('?')[0]
        window.history.pushState('', '', url);
        this.searchField.focus()
    }
  
    init() {
      const url = new URL(document.location)
      if (url.searchParams.get("search")) {
        this.searchField.value = url.searchParams.get("search")
        this.displayResults()
      }

      this.clearButton?.addEventListener('click', () => {
        this.reset();
      })

      this.form?.addEventListener('submit', (event) => {
        event.preventDefault();
        this.displayResults()
        if (this.searchField.value && this.searchField.value !== '') {
            url.searchParams.set("search", this.searchField.value)
            window.history.pushState('', '', url.href)
        } else {
            url.searchParams.delete("search")
            window.history.pushState('', '', url.href)
        }
      })
    }
}

class LilSearch extends HTMLElement {
    constructor() {
        super();
        this.searchFile = '/search.json'
        this.searchInputSelector = '#search'
        this.searchResultsSelector = '#list'
        this.searchSummarySelector = '#summary'
        this.form = this.querySelector('form');
        this.clearButtonSelector = '[data-clear-button]'
        this.search = new jekyllSearch(
            this.searchFile,
            this.searchInputSelector,
            this.searchResultsSelector,
            this.searchSummarySelector,
            this.form,
            this.clearButtonSelector
        );

        this.init();
    }

    init() {
        this.search.init();
    }
}
  

class LilHeader extends HTMLElement {
    constructor() {
        super();
        this.expanded = false;
        this.menuButton = this.querySelector('.menu-button');
        this.overlay = this.querySelector('.nav-menu__overlay');
        this.logo = this.querySelector('.logo');
        this.header = this.querySelector('header');

        this.menu = this.querySelector('.nav-menu');
        this.links = this.menu.querySelectorAll('a');
        this.inner = this.menu.querySelector('.nav-menu__inner');

        this.menuButton.addEventListener('click', this.toggleMenu.bind(this));
        this.overlay.addEventListener('click', this.toggleMenu.bind(this));
        this.addEventListeners();
    }

    addEventListeners() {
        this.links?.forEach(link => {
            link.addEventListener('click', this.toggleMenu.bind(this));
        });

        this.logo?.addEventListener('click', this.closeMenu.bind(this));
    }

    closeOnEscape(event) {
        if (event.key === 'Escape' && this.expanded) {
            this.toggleMenu();
        }
    }

    closeMenu() {
        this.expanded = false;
        this.menuButton.setAttribute('aria-expanded', this.expanded);
        this.menu.setAttribute('aria-hidden', !this.expanded);
        document.body.style.overflow = 'auto';
        window.removeEventListener('keydown', this.closeOnEscape.bind(this));
        this.classList.remove('expanded');
        this.menuButton.setAttribute('aria-label', 'Close navigation');
        this.menuCloseAnimation()
    }

    toggleMenu() {
        this.expanded = !this.expanded;
        this.menuButton.setAttribute('aria-expanded', this.expanded);
        this.menu.setAttribute('aria-hidden', !this.expanded);

        if (this.expanded) {
            document.body.style.overflow = 'hidden';
            window.addEventListener('keydown', this.closeOnEscape.bind(this));
            this.inner.style.paddingTop = `${this.header.getBoundingClientRect().bottom+40}px`;
            this.classList.add('expanded');
            this.menuButton.setAttribute('aria-label', 'Close menu');
            this.menuOpenAnimation()
        }
        else {
            document.body.style.overflow = 'auto';
            window.removeEventListener('keydown', this.closeOnEscape.bind(this));
            this.classList.remove('expanded');
            this.menuButton.setAttribute('aria-label', 'Open menu');
            this.menuCloseAnimation()
        }
    }

    menuOpenAnimation() {
        // when closed, menu will be none to keep out of tab order
        gsap.to(this.menu, {duration: 0, display: 'flex'})

        gsap.to(this.menu, {
            duration: safeDuration(0.95),
            ease: 'expo.inOut',
            clipPath: 'inset(0% 0% 0% 0%)',
        })

        gsap.fromTo('.nav-menu__list li', {
            opacity: 0,
            y: -80,
        }, {
            duration: safeDuration(1.2),
            ease: 'power3.out',
            opacity: 1,
            y: 0,
            stagger: 0.03,
        })

        gsap.fromTo('.nav-menu__socials', {
            opacity: 0,
            y: -10,
        }, {
            duration: safeDuration(1),
            ease: 'power3.out',
            opacity: 1,
            delay: 0.55,
            y: 0,
        })
    }

    menuCloseAnimation() {
        gsap.to(this.menu, {
            duration: safeDuration(0.8),
            ease: 'expo.inOut',
            clipPath: 'inset(0% 0% 100% 0%)',
        })

        gsap.fromTo('.nav-menu__list li', {
            opacity: 1,
            y: 0,
        }, {
            duration: safeDuration(0.4),
            ease: 'power3.in',
            opacity: 0,
            y: -30,
            stagger: 0.001,
        })

        gsap.fromTo('.nav-menu__socials', {
            opacity: 1,
            y: 0,
        }, {
            duration: safeDuration(0.4),
            ease: 'power3.in',
            opacity: 0,
            y: -40,
        })

        gsap.to(this.menu, {duration: safeDuration(0.6), display: 'none'})
    }
}

class LilMarquee extends HTMLElement {
    constructor() {
        super();
        this.inner = this.querySelector('.marquee__inner');
        this.parts = this.inner.querySelectorAll('.marquee__part');
        this.animate();
    }

    animate() {
        gsap?.to(this.parts, {xPercent: -100, repeat: -1, duration: safeDuration(60), ease: "linear"}).totalProgress(0.5);
        gsap?.set(this.inner, {xPercent: -50});
    }
}

class LilExpandable extends HTMLElement {
    constructor() {
        super();
        this.expanded = false;
        this.toggle = this.querySelector('.expandable__toggle');
        this.button = this.querySelector('.expandable__icon');
        this.content = this.querySelector('.expandable__content');

        this.toggle.addEventListener('click', this.handleToggleClick.bind(this));
    }

    handleToggleClick() {
        if (this.expanded) {
            this.closeExpandable();
        } else {
            this.openExpandable();
        }
    }

    closeAllExpandables() {
        document.querySelectorAll('lil-expandable').forEach(expandable => {
            if (expandable !== this) {
                expandable.closeExpandable();
            }
        });
    }

    openExpandable() {
        this.expanded = true;
        this.classList.add('expanded')
        this.button.setAttribute('aria-expanded', true);
        this.openExpandableContent();
        this.closeAllExpandables()
    }

    closeExpandable() {
        this.expanded = false;
        this.classList.remove('expanded')
        this.button.setAttribute('aria-expanded', false);
        this.closeExpandableContent();
    }

    openExpandableContent() {
        this.content.style.display = 'block';
        gsap.to(this.content, {
            duration: safeDuration(0.6),
            ease: 'power4.inOut',
            height: this.content.scrollHeight,
            opacity: 1,
        })
    }

    closeExpandableContent() {
        gsap.to(this.content, {
            duration: safeDuration(0.6),
            ease: 'power4.inOut',
            height: 0,
            opacity: 0,
        })
        gsap.to(this.content, {
            duration: safeDuration(0.6),
            ease: 'power4.inOut',
            display: 'none',
        })

    }
}

function setupCustomElements() {
    customElements.define('lil-header', LilHeader);
    customElements.define('lil-marquee', LilMarquee);
    customElements.define('lil-expandable', LilExpandable);
    customElements.define('lil-search', LilSearch);
}

function setupSwup() {
    const swup = new Swup({
        plugins: [new SwupHeadPlugin()],
        skipPopStateHandling: (event) => {
          event.url?.contains('blog') || event.state?.source !== 'swup'
        },
    });
}

const setup = () => {
    setVh();
    setupCustomElements();
    setupSwup();
}

(function() {
    var u="//analytics.lil.tools/";
    _paq.push(['setTrackerUrl', u+'piwik.php']);
    _paq.push(['setSiteId', '1']);
    var d=document, g=d.createElement('script'), s=d.getElementsByTagName('script')[0];
    g.type='text/javascript'; g.async=true; g.defer=true; g.src=u+'piwik.js'; s.parentNode.insertBefore(g,s);

    window.addEventListener('DOMContentLoaded', setup);
})();
