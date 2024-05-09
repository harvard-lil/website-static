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

class LilHeader extends HTMLElement {
    constructor() {
        super();
        this.expanded = false;
        this.menuButton = this.querySelector('.menu-button');
        this.menu = this.querySelector('.nav-menu');
        this.overlay = this.querySelector('.nav-menu__overlay');

        this.menuButton.addEventListener('click', this.toggleMenu.bind(this));
        this.overlay.addEventListener('click', this.toggleMenu.bind(this));
    }

    closeOnEscape(event) {
        if (event.key === 'Escape' && this.expanded) {
            this.toggleMenu();
        }
    }

    toggleMenu() {
        this.expanded = !this.expanded;
        this.menuButton.setAttribute('aria-expanded', this.expanded);
        this.menu.setAttribute('aria-hidden', !this.expanded);

        if (this.expanded) {
            document.body.style.overflow = 'hidden';
            window.addEventListener('keydown', this.closeOnEscape.bind(this));
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
    }
}

class LilMarquee extends HTMLElement {
    constructor() {
        super();
        this.inner = this.querySelector('.marquee__inner');
        this.parts = this.inner.querySelectorAll('.marquee__part');
        this.animate()
    }

    animate() {
        gsap.to(this.parts, {xPercent: -100, repeat: -1, duration: safeDuration(60), ease: "linear"}).totalProgress(0.5);
        gsap.set(this.inner, {xPercent: -50});
    }
}

function setupCustomElements() {
    customElements.define('lil-header', LilHeader);
    customElements.define('lil-marquee', LilMarquee);
}

const setup = () => {
    setVh();
    setupCustomElements();
}

(function() {
    var u="//analytics.lil.tools/";
    _paq.push(['setTrackerUrl', u+'piwik.php']);
    _paq.push(['setSiteId', '1']);
    var d=document, g=d.createElement('script'), s=d.getElementsByTagName('script')[0];
    g.type='text/javascript'; g.async=true; g.defer=true; g.src=u+'piwik.js'; s.parentNode.insertBefore(g,s);

    window.addEventListener('DOMContentLoaded', setup);
})();