// Generational Data Interviews - Main JavaScript File
// Handles all interview series functionality


// Centralized interview data - single source of truth
const INTERVIEWS = [
    { name: 'AMELIA ACKER', file: 'amelia-acker', pullQuote: "I probably wouldn't build a system. I'd build a bureaucracy." },
    { name: 'MATTEO CARGNELUTTI', file: 'matteo-cargnelutti', pullQuote: "I think the first thing I would focus on is expanding the new storage formats that exist right now at the lab stage." },
    { name: 'FRANK CIFALDI', file: 'frank-cifaldi', pullQuote: "I would have the best copyright lawyers in the country figuring out how we can actually make this work." },
    { name: 'REBECCA CREMONA', file: 'rebecca-cremona', pullQuote: "I think that if you have everything, you have nothing. It's all the grains of sand at the beach." },
    { name: 'LORI EMERSON', file: 'lori-emerson', pullQuote: "I'm going to give you the most boring and predictable answer possible." },
    { name: 'REBECCA FRANK', file: 'rebecca-frank', pullQuote: "The glib answer is the money itself would be the solution." },
    { name: 'MARTIN KUNZE & STEFFEN HELLMOLD', file: 'martin-kunze-steffen-hellmold', pullQuote: "I want to say exactly what we are doing at the moment." },
    { name: 'MARK LANTZ', file: 'mark-lantz', pullQuote: "There's two critical aspects to that question. The first part of it is just preserving bits." },
    { name: 'MICHELLE LEE', file: 'michelle-lee', pullQuote: "I would have the best copyright lawyers in the country figuring out how we can actually make this work." },
    { name: 'KATIE MACKINNON', file: 'katie-mackinnon', pullQuote: "I would devote a lot of the funding to the decision-making processes around what gets to last for 100 years, who gets to decide, and why?" },
    { name: 'TYLER MCMULLEN', file: 'tyler-mcmullen', pullQuote: "My first step is to take that money and turn it into a self-sustaining fund." },
    { name: 'IAN MILLIGAN', file: 'ian-milligan', pullQuote: "People think it failed because of beautiful Renaissance paintings of marauding armies burning down the Library of Alexandria, but it fundamentally died because people stopped caring." },
    { name: 'TREVOR OWENS', file: 'trevor-owens', pullQuote: "The more that information is touched, the more that it's handled, the more that it's forward migrated, the more that it's engaged with, the safer it is." },
    { name: 'CHE-WEI WANG & TAYLOR LEVY', file: 'che-wei-wang-taylor-levy', pullQuote: "I would do two things, both where I'm not following instructions. First, I would think about storing for 20 years and 500 years, not 100." }
];

// Track initialization to prevent multiple runs
let isInitialized = false;

// Initialize when DOM is ready
function initializeWhenReady() {
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initInterviewSeries);
    } else {
        initInterviewSeries();
    }
}

// Initialize interview series functionality
function initInterviewSeries() {
    
    // Reset initialization flag for each page load
    isInitialized = false;
    
    // Check if we're on the landing page
    const intervieweesGrid = document.getElementById('interviewees-grid');
    const isLandingPage = intervieweesGrid !== null;
    
    // Load interviewees for landing page (only if on landing page)
    if (isLandingPage) {
        try {
            loadInterviewees();
            // Add a small delay to ensure DOM is ready
            setTimeout(() => {
                loadQuoteCards();
            }, 100);
        } catch (error) {
        }
    } else {
    }
    
    // Load interviewees for individual interview pages (only if on interview page)
    const interviewLinks = document.querySelector('.interview-page__links');
    const isInterviewPage = interviewLinks !== null;
    
    if (isInterviewPage) {
        
        try {
            // Try to load sidebar immediately
            const sidebarLoaded = loadInterviewSidebar();
            
            // Set up cycling navigation arrows
            try {
                const navResult = setupCyclingNavigation();
            } catch (error) {
            }
            
            // If sidebar didn't load successfully, try again with multiple attempts
            if (!sidebarLoaded) {
                let retryCount = 0;
                const maxRetries = 3;
                
                const retrySidebar = () => {
                    retryCount++;
                    
                    const retrySuccess = loadInterviewSidebar();
                    
                    if (!retrySuccess && retryCount < maxRetries) {
                        setTimeout(retrySidebar, 100 * retryCount); // Increasing delay
                    } else if (!retrySuccess) {
                    } else {
                    }
                };
                
                setTimeout(retrySidebar, 100);
            }
            
        } catch (error) {
        }
    } else {
    }
    
}


// Swup integration for sidebar loading, simple navigation
function setupSwupIntegration() {
    
    // Check if Swup is available
    if (typeof Swup !== 'undefined') {
        
        // Wait for Swup to be initialized
        let retryCount = 0;
        const maxSwupRetries = 20; // 2 seconds max
        
        const waitForSwup = () => {
            if (window.swup && window.swup.hooks) {
                // Hook into Swup's content replacement
                window.swup.hooks.on('content:replace', () => {
                    if (isInterviewSeriesPage()) {
                        // Small delay to ensure DOM is ready
                        setTimeout(() => {
                            initInterviewSeries();
                        }, 50);
                    }
                });
                
                // Also hook into page view to ensure sidebar is updated
                window.swup.hooks.on('page:view', () => {
                    if (isInterviewSeriesPage()) {
                        // Small delay to ensure DOM is ready
                        setTimeout(() => {
                            const interviewLinks = document.querySelector('.interview-page__links');
                            if (interviewLinks) {
                                loadInterviewSidebar();
                                setupCyclingNavigation();
                            }
                        }, 100);
                    }
                });
                
                // Specific hook for landing page to reload quote cards
                window.swup.hooks.on('page:view', () => {
                    if (isLandingPage()) {
                        setTimeout(() => {
                            const quoteCardsContainer = document.querySelector('.interview-landing__quote-cards-content');
                            if (quoteCardsContainer) {
                                loadQuoteCards();
                            }
                        }, 100);
                    }
                });
            } else if (retryCount < maxSwupRetries) {
                retryCount++;
                // Retry after a short delay
                setTimeout(waitForSwup, 100);
            } else {
                // Fall back to standard initialization
                initializeWhenReady();
            }
        };
        
        waitForSwup();
    } else {
        initializeWhenReady();
    }
    
    // Also set up a more aggressive approach - check periodically for interview pages
    setInterval(() => {
        if (isInterviewSeriesPage()) {
            // Check for landing page quote cards
            if (isLandingPage()) {
                const quoteCardsContainer = document.querySelector('.interview-landing__quote-cards-content');
                if (quoteCardsContainer && quoteCardsContainer.children.length === 0) {
                    loadQuoteCards();
                }
            }
            
            // Check for interview page sidebar
            const interviewLinks = document.querySelector('.interview-page__links');
            if (interviewLinks) {
                // Check if sidebar needs updating (empty or wrong current page)
                const currentPath = window.location.pathname;
                const pathParts = currentPath.split('/').filter(part => part.length > 0);
                const currentSlug = pathParts[pathParts.length - 1];
                
                const currentLink = interviewLinks.querySelector('.current');
                const needsUpdate = interviewLinks.children.length === 0 || 
                                 !currentLink || 
                                 !currentLink.href.includes(currentSlug);
                
                if (needsUpdate) {
                    loadInterviewSidebar();
                    setupCyclingNavigation();
                }
            }
        }
    }, 1000); // Check every second
}

// Check if we're on an interview series page
function isInterviewSeriesPage() {
    const path = window.location.pathname;
    return path.includes('/generational-data-interviews/');
}

// Check if we're on the landing page specifically
function isLandingPage() {
    const path = window.location.pathname;
    return path === '/generational-data-interviews/' || path === '/generational-data-interviews';
}

// Start Swup integration for sidebar, simple navigation
setupSwupIntegration();

// Always run initial setup for the current page
initializeWhenReady();

// Consolidated resize handler for all interview series components
function handleResize() {
    const isMobile = window.innerWidth <= 768;
    
    // Handle landing page interviewees grid
    const intervieweesGrid = document.getElementById('interviewees-grid');
    if (intervieweesGrid) {
        const hasDropdown = intervieweesGrid.querySelector('.interview-landing__mobile-dropdown-toggle');
        
        if (isMobile && !hasDropdown) {
            // Switch to mobile dropdown
            intervieweesGrid.innerHTML = '';
            createMobileIntervieweesDropdown(intervieweesGrid, INTERVIEWS);
        } else if (!isMobile && hasDropdown) {
            // Switch to desktop grid
            intervieweesGrid.innerHTML = '';
            createDesktopIntervieweesGrid(intervieweesGrid, INTERVIEWS);
        }
    }
    
    // Handle interview page sidebar
    const interviewLinks = document.querySelector('.interview-page__links');
    if (interviewLinks) {
        const hasDropdown = interviewLinks.querySelector('.interview-page__dropdown-toggle');
        
        if (isMobile && !hasDropdown) {
            // Switch to mobile dropdown
            interviewLinks.innerHTML = '';
            createMobileDropdown(interviewLinks);
        } else if (!isMobile && hasDropdown) {
            // Switch to desktop sidebar
            interviewLinks.innerHTML = '';
            createDesktopSidebar(interviewLinks);
        }
    }
}

// Add single resize event listener
window.addEventListener('resize', handleResize);

function loadInterviewees() {
    
    
    // Generate the HTML for the interviewees grid
    generateIntervieweesGrid(INTERVIEWS);
}

function generateIntervieweesGrid(interviews) {
    const grid = document.getElementById('interviewees-grid');
    if (!grid) {
        return;
    }
    
    
    // Check if grid is already populated to avoid re-running
    if (grid.children.length > 0 && grid.querySelector('.interviewees-column')) {
        return;
    }
    
    // Clear any existing content (including fallback HTML)
    grid.innerHTML = '';
    
    // Check if we're on mobile
    const isMobile = window.innerWidth <= 768;
    
    if (isMobile) {
        // Create mobile dropdown
        createMobileIntervieweesDropdown(grid, interviews);
    } else {
        // Create desktop grid
        createDesktopIntervieweesGrid(grid, interviews);
    }
    
}

function createDesktopIntervieweesGrid(grid, interviews) {
    
    // Create three columns
    const column1 = document.createElement('div');
    column1.className = 'interview-landing__interviewees-column';
    
    const column2 = document.createElement('div');
    column2.className = 'interview-landing__interviewees-column';
    
    const column3 = document.createElement('div');
    column3.className = 'interview-landing__interviewees-column';
    
    // Distribute interviews across columns
    interviews.forEach((interview, index) => {
        const intervieweeDiv = document.createElement('div');
        intervieweeDiv.className = 'interview-landing__interviewee-name';
        
        // Create a link to the interview page
        const link = document.createElement('a');
        link.href = `/generational-data-interviews/${interview.file}/`;
        link.textContent = interview.name;
        
        intervieweeDiv.appendChild(link);
        
        // Distribute across columns (roughly equal)
        if (index % 3 === 0) {
            column1.appendChild(intervieweeDiv);
        } else if (index % 3 === 1) {
            column2.appendChild(intervieweeDiv);
        } else {
            column3.appendChild(intervieweeDiv);
        }
    });
    
    // Add columns to grid
    grid.appendChild(column1);
    grid.appendChild(column2);
    grid.appendChild(column3);
    
}

function createMobileIntervieweesDropdown(grid, interviews) {
    
    // Create dropdown toggle button
    const toggle = document.createElement('button');
    toggle.className = 'interview-landing__mobile-dropdown-toggle';
    toggle.textContent = 'Select Interview';
    grid.appendChild(toggle);
    
    // Create dropdown menu
    const menu = document.createElement('div');
    menu.className = 'interview-landing__mobile-dropdown-menu';
    grid.appendChild(menu);
    
    // Add each interview link
    interviews.forEach(interview => {
        const link = document.createElement('a');
        link.href = `/generational-data-interviews/${interview.file}/`;
        link.className = 'interview-landing__interviewee-name';
        link.textContent = interview.name;
        menu.appendChild(link);
    });
    
    
    // Add click handler for toggle
    toggle.addEventListener('click', function() {
        toggle.classList.toggle('open');
        menu.classList.toggle('open');
    });
    
    // Close dropdown when clicking outside
    document.addEventListener('click', function(event) {
        if (!grid.contains(event.target)) {
            toggle.classList.remove('open');
            menu.classList.remove('open');
        }
    });
}

function loadQuoteCards() {
    
    try {
        // Validate interviews data
        if (!INTERVIEWS || !Array.isArray(INTERVIEWS) || INTERVIEWS.length === 0) {
            return false;
        }
        
        
        // Debug: Show all elements with class names containing "quote"
        const allElements = document.querySelectorAll('*');
        const quoteElements = Array.from(allElements).filter(el => 
            el.className && el.className.includes && el.className.includes('quote')
        );
        
        // Find quote cards container
        const quoteCardsContainer = document.querySelector('.interview-landing__quote-cards-content');
        
        if (!quoteCardsContainer) {
            const fallbackContainer = document.querySelector('.quote-cards');
            if (fallbackContainer) {
                return loadQuoteCardsWithContainer(fallbackContainer);
            }
            return false;
        }
        
        return loadQuoteCardsWithContainer(quoteCardsContainer);
        
    } catch (error) {
        return false;
    }
}

function loadQuoteCardsWithContainer(quoteCardsContainer) {
    
    try {
        
        // Clear existing content safely
        try {
            quoteCardsContainer.innerHTML = '';
        } catch (error) {
            return false;
        }
        
        // Track successful card creation
        let successCount = 0;
        const errors = [];
        
        // Create quote cards for each interview
        INTERVIEWS.forEach((interview, index) => {
            try {
                // Validate interview data
                if (!interview || !interview.name || !interview.file) {
                    errors.push(`Invalid interview data at index ${index}`);
                    return;
                }
                
                // Validate pull quote
                const pullQuote = interview.pullQuote || 'No quote available';
                if (pullQuote === 'No quote available') {
                }
                
                // Create quote card element
                const quoteCard = document.createElement('div');
                quoteCard.className = 'interview-landing__quote-card';
                
                // Set up card content with error handling
                try {
                    quoteCard.innerHTML = `
                        <div class="interview-landing__quote-mark">
                            <img src="/generational-data-interviews/assets/QuotationMark.png" alt="Quotation mark" onerror="this.style.display='none'" />
                        </div>
                        <p class="interview-landing__quote-text">${escapeHtml(pullQuote)}</p>
                        <div class="interview-landing__quote-attribution">- ${escapeHtml(interview.name)}</div>
                        <div class="interview-landing__quote-link">↗</div>
                    `;
                } catch (htmlError) {
                    errors.push(`HTML creation failed for ${interview.name}`);
                    return;
                }
                
                // Add click handler with error handling
                try {
                    quoteCard.addEventListener('click', (e) => {
                        e.preventDefault();
                        try {
                            window.location.href = `/generational-data-interviews/${interview.file}/`;
                        } catch (navError) {
                        }
                    });
                } catch (eventError) {
                    errors.push(`Click handler failed for ${interview.name}`);
                }
                
                // Append card to container
                try {
                    quoteCardsContainer.appendChild(quoteCard);
                    
                    // Adjust font size based on text length
                    setTimeout(() => {
                        adjustQuoteTextSize(quoteCard);
                    }, 100);
                    
                    successCount++;
                } catch (appendError) {
                    errors.push(`Append failed for ${interview.name}`);
                }
                
            } catch (cardError) {
                errors.push(`Processing failed for ${interview?.name || 'unknown'}`);
            }
        });
        
        // Report results
        
        if (errors.length > 0) {
        }
        
        // Return success status
        return successCount > 0;
        
    } catch (error) {
        return false;
    }
}

// Helper function to escape HTML content
function escapeHtml(text) {
    if (typeof text !== 'string') return '';
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// Helper function to adjust quote text size based on content length
function adjustQuoteTextSize(quoteCard) {
    const quoteText = quoteCard.querySelector('.interview-landing__quote-text');
    if (!quoteText) return;
    
    const text = quoteText.textContent.trim();
    const textLength = text.length;
    
    // Calculate optimal font size based on text length - three simple categories
    let fontSize;
    if (textLength <= 80) {
        fontSize = '1.3rem';  // Larger for short quotes
    } else if (textLength <= 120) {
        fontSize = '1.1rem';  // Standard size for medium quotes
    } else {
        fontSize = '0.95rem'; // Smaller for long quotes
    }
    
    // Apply the calculated font size
    quoteText.style.fontSize = fontSize;
}

function loadInterviewSidebar() {
    
    // Get the sidebar links container
    const sidebarLinks = document.querySelector('.interview-page__links');
    
    if (!sidebarLinks) {
        return false;
    }
    
    
    // Check if sidebar is already populated
    if (sidebarLinks.children.length > 0) {
        // Clear existing content to ensure fresh generation
        sidebarLinks.innerHTML = '';
    }
    
    
    
    // Clear existing content
    sidebarLinks.innerHTML = '';
    
    // Check if we're on mobile (screen width <= 768px)
    const isMobile = window.innerWidth <= 768;
    
    if (isMobile) {
        // Create mobile dropdown
        createMobileDropdown(sidebarLinks);
    } else {
        // Create desktop sidebar
        createDesktopSidebar(sidebarLinks);
    }
    
    
    // Verify the sidebar was populated successfully
    if (sidebarLinks.children.length > 0) {
    return true;
} else {
    return false;
}
}

// Function to create mobile dropdown
function createMobileDropdown(container) {
    
    // Create dropdown toggle button
    const toggle = document.createElement('button');
    toggle.className = 'interview-page__dropdown-toggle';
    toggle.textContent = 'Select Interview';
    container.appendChild(toggle);
    
    // Create dropdown menu
    const menu = document.createElement('div');
    menu.className = 'interview-page__dropdown-menu';
    container.appendChild(menu);
    
    // Add "Back to Series" link
    const backLink = document.createElement('a');
    backLink.href = '/generational-data-interviews/';
    backLink.className = 'interview-page__link';
    backLink.textContent = 'Back to Series';
    menu.appendChild(backLink);
    
    // Add each interview link
    INTERVIEWS.forEach(interview => {
        const link = document.createElement('a');
        link.href = `/generational-data-interviews/${interview.file}/`;
        link.className = 'interview-page__link';
        link.textContent = interview.name;
        
        // Check if this is the current page
        const currentPath = window.location.pathname;
        const pathParts = currentPath.split('/').filter(part => part.length > 0);
        const currentSlug = pathParts[pathParts.length - 1];
        if (currentSlug === interview.file) {
            link.classList.add('interview-page__link--current');
            toggle.textContent = interview.name; // Update toggle text to current interview
        }
        
        menu.appendChild(link);
    });
    
    // Add click handler for toggle
    toggle.addEventListener('click', function() {
        toggle.classList.toggle('open');
        menu.classList.toggle('open');
    });
    
    // Close dropdown when clicking outside
    document.addEventListener('click', function(event) {
        if (!container.contains(event.target)) {
            toggle.classList.remove('open');
            menu.classList.remove('open');
        }
    });
    
}

// Function to create desktop sidebar
function createDesktopSidebar(container) {
    
    // Add "Back to Series" link
    const backLink = document.createElement('a');
    backLink.href = '/generational-data-interviews/';
    backLink.className = 'interview-page__link';
    backLink.textContent = 'Back to Series';
    container.appendChild(backLink);
    
    // Add each interview link
    INTERVIEWS.forEach(interview => {
        const link = document.createElement('a');
        link.href = `/generational-data-interviews/${interview.file}/`;
        link.className = 'interview-page__link';
        link.textContent = interview.name;
        
        // Check if this is the current page
        const currentPath = window.location.pathname;
        const pathParts = currentPath.split('/').filter(part => part.length > 0);
        const currentSlug = pathParts[pathParts.length - 1];
        if (currentSlug === interview.file) {
            link.classList.add('interview-page__link--current');
        }
        
        container.appendChild(link);
    });
}

// Function to set up cycling navigation arrows
function setupCyclingNavigation() {
    
    const prevArrow = document.getElementById('prev-arrow');
    const nextArrow = document.getElementById('next-arrow');
    
    
    if (!prevArrow || !nextArrow) {
        return;
    }
    
    
    // Get current interview slug from URL
    const currentPath = window.location.pathname;
    const pathParts = currentPath.split('/').filter(part => part.length > 0);
    const currentSlug = pathParts[pathParts.length - 1];
    
    // Find current interview index
    const currentIndex = INTERVIEWS.findIndex(interview => interview.file === currentSlug);
    
    if (currentIndex === -1) {
        return;
    }
    
    // Calculate previous and next indices with cycling
    const prevIndex = currentIndex === 0 ? INTERVIEWS.length - 1 : currentIndex - 1;
    const nextIndex = currentIndex === INTERVIEWS.length - 1 ? 0 : currentIndex + 1;
    
    
    // Set up navigation links
    const prevInterview = INTERVIEWS[prevIndex];
    const nextInterview = INTERVIEWS[nextIndex];
    
    const prevUrl = `/generational-data-interviews/${prevInterview.file}/`;
    const nextUrl = `/generational-data-interviews/${nextInterview.file}/`;
    
    
    // Set the href attributes
    prevArrow.href = prevUrl;
    nextArrow.href = nextUrl;
    
    
    // Test that the links are clickable
    
    // Set the href attributes - let the browser handle navigation naturally
    // This works with Swup's page transitions without needing special handling
    
    // Set the href attributes - Swup will handle the transitions automatically
    prevArrow.href = prevUrl;
    nextArrow.href = nextUrl;
    
    
    // Test that the links are actually clickable
    
    // Add simple click listeners for debugging
    prevArrow.addEventListener('click', (e) => {
    });
    
    nextArrow.addEventListener('click', (e) => {
    });
    
    
    // Return success status
    return {
        success: true,
        prevUrl: prevArrow.href,
        nextUrl: nextArrow.href,
        prevInterview: prevInterview.name,
        nextInterview: nextInterview.name
    };
}
