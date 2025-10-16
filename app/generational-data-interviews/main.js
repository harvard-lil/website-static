// Generational Data Interviews - Main JavaScript File
// Handles all interview series functionality
// Note: these files were generated in part by Cursor, the AI coding assistant.


// Centralized interview data - single source of truth
const INTERVIEWS = [
    { name: 'AMELIA ACKER', file: 'amelia-acker', pullQuote: "I probably wouldn't build a system. I'd build a bureaucracy." },
    { name: 'CHE-WEI WANG & TAYLOR LEVY', file: 'che-wei-wang-taylor-levy', pullQuote: "Wait, only a hundred years?" },
    { name: 'FRANK CIFALDI', file: 'frank-cifaldi', pullQuote: "I would have the best copyright lawyers in the country figuring out how we can actually make this work." },
    { name: 'REBECCA CREMONA', file: 'rebecca-cremona', pullQuote: "I would assemble a huge panel of staff from all kinds of backgrounds and all kinds of geographies to try and curate what we were trying to save for a century or not." },
    { name: 'LORI EMERSON', file: 'lori-emerson', pullQuote: "The book is the most beautiful invention I can think of." },
    { name: 'REBECCA FRANK', file: 'rebecca-frank', pullQuote: "The glib answer is the money itself would be the solution." },
    { name: 'IAN MILLIGAN', file: 'ian-milligan', pullQuote: "I don't think there's a technological solution that's going to achieve that goal." },
    { name: 'MARK LANTZ', file: 'mark-lantz', pullQuote: "Even if I have a punch card reader from 1940 that can still read my punch cards, I can't find a computer that supports the interface it has...I would work on that neglected part of the problem." },
    { name: 'MICHELLE LEE', file: 'michelle-lee', pullQuote: "I would do two things, both where I'm not following instructions." },
    { name: 'KATIE MACKINNON', file: 'katie-mackinnon', pullQuote: "I'd devote a lot of the funding to the decision-making processes around what gets to last for 100 years, who gets to decide, and why?" },
    { name: 'MARTIN KUNZE & STEFFEN HELLMOLD', file: 'martin-kunze-steffen-hellmold', pullQuote: "So this was the idea- to store digital information in an analog archive" },
    { name: 'MATTEO CARGNELUTTI', file: 'matteo-cargnelutti', pullQuote: "If we were able to have this sort of technology, designed from the beginning to store things for centuries and more, it would need to be broadly accessible, and cheap." },
    { name: 'TREVOR OWENS', file: 'trevor-owens', pullQuote: "There's a technical way to answer the question, focusing on redundancy or what kind of media to use, but my sense is that those are largely solved problems at this point." },
    { name: 'TYLER MCMULLEN', file: 'tyler-mcmullen', pullQuote: "Where is the next generation going to come from? Where is the funding for that next generation going to come from as well?" }
];

// Track initialization to prevent multiple runs
let isInitialized = false;

// Track if this is the initial page load to skip Swup hooks for quote cards
let isInitialPageLoad = true;

// Store the shuffled order to maintain consistency
let shuffledInterviewsOrder = null;

// Store calculated font sizes to prevent recalculation
let quoteCardFontSizes = new Map();

// Function to reset the shuffle order (useful for page navigation)
function resetQuoteCardShuffle() {
    shuffledInterviewsOrder = null;
    quoteCardFontSizes.clear();
}

// Track editor notes event listeners for cleanup
let editorNotesEventListeners = {
    click: null,
    keydown: null,
    scroll: null
};

// Track dropdown event listeners for cleanup
let dropdownEventListeners = {
    landingPage: null,
    interviewPage: null,
    centralized: null
};

// Centralized dropdown management
let activeDropdowns = new Set();

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
    
    // Set up centralized dropdown management
    setupCentralizedDropdownManagement();
    
    // Set up blockquote observer
    setupBlockquoteObserver();
    
    // Load interviewees for landing page (only if on landing page)
    if (isLandingPage) {
        try {
            // Clean up any existing dropdown listeners before creating new ones
            cleanupDropdownEventListeners();
            setupCentralizedDropdownManagement(); // Re-setup after cleanup
            loadInterviewees();
            window.interviewsLoaded = true;
            // Add a small delay to ensure DOM is ready
            setTimeout(() => {
                loadQuoteCards();
                // Mark initial page load as complete after quote cards are loaded
                isInitialPageLoad = false;
            }, 100);
        } catch (error) {
            console.error('Error loading interviewees:', error);
        }
    }
    
    // Load interviewees for individual interview pages (only if on interview page)
    const interviewLinks = document.querySelector('.interview-page__links');
    const isInterviewPage = interviewLinks !== null;
    
    if (isInterviewPage) {
        
        try {
            // Clean up any existing dropdown listeners before creating new ones
            cleanupDropdownEventListeners();
            setupCentralizedDropdownManagement(); // Re-setup after cleanup
            // Try to load sidebar immediately
            const sidebarLoaded = loadInterviewSidebar();
            
            // Adjust blockquote sizes based on content length
            resizeAllBlockquotes();
            
            // Set up cycling navigation arrows
            try {
                const navResult = setupCyclingNavigation();
            } catch (error) {
            }
            
            // Initialize editor's notes
            initEditorsNotes();
            
            // Initialize bottom navigation
            initBottomNavigation();
            
            
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
                                initEditorsNotes();
                                initBottomNavigation();
                                
                                // Adjust blockquote sizes based on content length
                                resizeAllBlockquotes();
                            }
                        }, 100);
                    }
                });
                
                // Specific hook for landing page to reload quote cards (skip on initial load)
                window.swup.hooks.on('page:view', () => {
                    if (isLandingPage() && !isInitialPageLoad) {
                        // Reset shuffle order for new page navigation
                        resetQuoteCardShuffle();
                        setTimeout(() => {
                            const quoteCardsContainer = document.querySelector('.interview-landing__quote-cards-content');
                            if (quoteCardsContainer) {
                                loadQuoteCards();
                            }
                        }, 100);
                    }
                    // Mark that initial page load is complete
                    isInitialPageLoad = false;
                });
                
                // Dedicated hook for editor's notes reinitialization
                window.swup.hooks.on('page:view', () => {
                    if (isInterviewSeriesPage()) {
                        setTimeout(() => {
                            const editorNoteLinks = document.querySelectorAll('.editor-note-link');
                            if (editorNoteLinks.length > 0) {
                                initEditorsNotes();
                            }
                        }, 150); // Slightly longer delay for editor notes
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
            // Check for landing page quote cards (skip on initial load)
            if (isLandingPage() && !isInitialPageLoad) {
                const quoteCardsContainer = document.querySelector('.interview-landing__quote-cards-content');
                if (quoteCardsContainer && quoteCardsContainer.children.length === 0) {
                    loadQuoteCards();
                }
                
                // Check for missing interview grid
                const intervieweesGrid = document.getElementById('interviewees-grid');
                if (intervieweesGrid && intervieweesGrid.children.length === 0) {
                    loadInterviewees();
                }
            }
            
            // Check for interview page sidebar
            const interviewLinks = document.querySelector('.interview-page__links');
            if (interviewLinks) {
                // Check if sidebar needs updating (empty or wrong current page)
                const currentPath = window.location.pathname;
                const pathParts = currentPath.split('/').filter(part => part.length > 0);
                const currentSlug = pathParts[pathParts.length - 1];
                
                const currentLink = interviewLinks.querySelector('.interview-page__link--current');
                const needsUpdate = interviewLinks.children.length === 0 || 
                                 !currentLink || 
                                 !currentLink.href.includes(currentSlug);
                
                if (needsUpdate) {
                    loadInterviewSidebar();
                    setupCyclingNavigation();
                    initBottomNavigation();
                }
            }
            
            // Check for editor's notes on interview pages
            const editorNoteLinks = document.querySelectorAll('.editor-note-link');
            if (editorNoteLinks.length > 0) {
                // Check if editor notes need reinitialization (no event listeners or processed links)
                const hasUnprocessedLinks = Array.from(editorNoteLinks).some(link => !link.dataset.processed);
                if (hasUnprocessedLinks) {
                    initEditorsNotes();
                }
            }
            
            // Check for bottom navigation arrows
            const textPrevArrow = document.getElementById('text-prev-arrow');
            const textNextArrow = document.getElementById('text-next-arrow');
            if (textPrevArrow && textNextArrow) {
                // Check if bottom navigation needs updating (empty hrefs or wrong links)
                const currentPath = window.location.pathname;
                const pathParts = currentPath.split('/').filter(part => part.length > 0);
                const currentSlug = pathParts[pathParts.length - 1];
                
                const needsBottomUpdate = !textPrevArrow.href || 
                                        textPrevArrow.href === '#' ||
                                        !textNextArrow.href || 
                                        textNextArrow.href === '#';
                
                if (needsBottomUpdate) {
                    initBottomNavigation();
                }
            }
        }
    }, 1000); // Check every second
}

// Check if we're on an interview series page
function isInterviewSeriesPage() {
    const path = window.location.pathname;
    const result = path.includes('/generational-data-interviews/');
    return result;
}

// Check if we're on the landing page specifically
function isLandingPage() {
    const path = window.location.pathname;
    const result = path === '/generational-data-interviews/' || path === '/generational-data-interviews';
    return result;
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
            unregisterDropdown(intervieweesGrid); // Unregister old dropdown
            intervieweesGrid.innerHTML = '';
            createMobileIntervieweesDropdown(intervieweesGrid, INTERVIEWS);
        } else if (!isMobile && hasDropdown) {
            // Switch to desktop grid
            unregisterDropdown(intervieweesGrid); // Unregister old dropdown
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
            unregisterDropdown(interviewLinks); // Unregister old dropdown
            interviewLinks.innerHTML = '';
            createMobileDropdown(interviewLinks);
        } else if (!isMobile && hasDropdown) {
            // Switch to desktop sidebar
            unregisterDropdown(interviewLinks); // Unregister old dropdown
            interviewLinks.innerHTML = '';
            createDesktopSidebar(interviewLinks);
        }
    }
}

// Add single resize event listener
window.addEventListener('resize', handleResize);

// Reinitialize editor notes on resize
window.addEventListener('resize', () => {
    if (document.querySelector('.interview-page__links')) {
        initEditorsNotes();
    }
});

// Cleanup function for editor notes event listeners
function cleanupEditorNotesEventListeners() {
    // Remove existing event listeners
    if (editorNotesEventListeners.click) {
        document.removeEventListener('click', editorNotesEventListeners.click);
        editorNotesEventListeners.click = null;
    }
    
    if (editorNotesEventListeners.keydown) {
        document.removeEventListener('keydown', editorNotesEventListeners.keydown);
        editorNotesEventListeners.keydown = null;
    }
    
    if (editorNotesEventListeners.scroll) {
        window.removeEventListener('scroll', editorNotesEventListeners.scroll);
        editorNotesEventListeners.scroll = null;
    }
}

// Cleanup function for dropdown event listeners
function cleanupDropdownEventListeners() {
    
    // Remove existing dropdown event listeners
    if (dropdownEventListeners.landingPage) {
        document.removeEventListener('click', dropdownEventListeners.landingPage);
        dropdownEventListeners.landingPage = null;
    }
    
    if (dropdownEventListeners.interviewPage) {
        document.removeEventListener('click', dropdownEventListeners.interviewPage);
        dropdownEventListeners.interviewPage = null;
    }
    
    if (dropdownEventListeners.centralized) {
        document.removeEventListener('click', dropdownEventListeners.centralized);
        dropdownEventListeners.centralized = null;
    }
    
    // Clear active dropdowns
    activeDropdowns.clear();
}

// Centralized dropdown management system
function setupCentralizedDropdownManagement() {
    // Remove any existing centralized listener
    if (dropdownEventListeners.centralized) {
        document.removeEventListener('click', dropdownEventListeners.centralized);
    }
    
    // Create a single document click handler for all dropdowns
    const centralizedClickHandler = function(event) {
        // Check each active dropdown individually
        activeDropdowns.forEach(dropdownContainer => {
            const toggle = dropdownContainer.querySelector('.interview-landing__mobile-dropdown-toggle, .interview-page__dropdown-toggle');
            const menu = dropdownContainer.querySelector('.interview-landing__mobile-dropdown-menu, .interview-page__dropdown-menu');
            
            // Only check if this dropdown is actually open
            if (toggle && menu && (toggle.classList.contains('open') || menu.classList.contains('open'))) {
                // If click is outside this specific dropdown, close it
                if (!dropdownContainer.contains(event.target)) {
                    toggle.classList.remove('open');
                    menu.classList.remove('open');
                }
            }
        });
    };
    
    document.addEventListener('click', centralizedClickHandler);
    dropdownEventListeners.centralized = centralizedClickHandler;
}

// Register a dropdown with the centralized system
function registerDropdown(container) {
    activeDropdowns.add(container);
}

// Unregister a dropdown from the centralized system
function unregisterDropdown(container) {
    activeDropdowns.delete(container);
}

// Close all active dropdowns
function closeAllDropdowns() {
    activeDropdowns.forEach(container => {
        const toggle = container.querySelector('.interview-landing__mobile-dropdown-toggle, .interview-page__dropdown-toggle');
        const menu = container.querySelector('.interview-landing__mobile-dropdown-menu, .interview-page__dropdown-menu');
        
        if (toggle && menu) {
            toggle.classList.remove('open');
            menu.classList.remove('open');
        }
    });
}

// Editor's Notes Functionality
function initEditorsNotes() {
    // Clean up existing event listeners first
    cleanupEditorNotesEventListeners();
    
    const editorNoteLinks = document.querySelectorAll('.editor-note-link');
    
    editorNoteLinks.forEach(link => {
        const note = link.nextElementSibling;
        
        if (note && note.classList.contains('editor-note')) {
            // Check if this link has already been processed
            if (link.dataset.processed) {
                return;
            }
            
            // Mark as processed
            link.dataset.processed = 'true';
            
            // Extract interview name from href
            const href = link.getAttribute('href');
            const interviewName = extractInterviewName(href);
            
            // Set up the note content
            setupEditorNote(note, interviewName, href);
            
            // Add event listeners - check viewport size dynamically
            link.addEventListener('click', (e) => {
                e.preventDefault();
                if (window.innerWidth <= 768) {
                    // Mobile: show modal
                    showMobileEditorNote(note);
                } else {
                    // Desktop: close note and navigate
                    hideEditorNote(note);
                    // Navigate to the interview
                    window.open(href, '_blank');
                }
            });
            
            // Add keyboard support
            link.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    if (window.innerWidth <= 768) {
                        showMobileEditorNote(note);
                    } else {
                        hideEditorNote(note);
                        window.open(href, '_blank');
                    }
                }
            });
            
            // Desktop hover behavior
            link.addEventListener('mouseenter', () => {
                if (window.innerWidth > 768) {
                    showEditorNote(link, note);
                }
            });
        }
    });
    
    // Add global event listeners for closing notes
    setupEditorNoteGlobalListeners();
}

function setupEditorNoteGlobalListeners() {
    
    // Close notes when clicking outside
    const clickHandler = (e) => {
        const visibleNotes = document.querySelectorAll('.editor-note.visible');
        if (visibleNotes.length > 0) {
            const clickedNote = e.target.closest('.editor-note');
            const clickedLink = e.target.closest('.editor-note-link');
            
            if (!clickedNote && !clickedLink) {
                hideAllEditorNotes();
            }
        }
    };
    document.addEventListener('click', clickHandler);
    editorNotesEventListeners.click = clickHandler;
    
    // Close notes when pressing Escape
    const keydownHandler = (e) => {
        if (e.key === 'Escape') {
            hideAllEditorNotes();
        }
    };
    document.addEventListener('keydown', keydownHandler);
    editorNotesEventListeners.keydown = keydownHandler;
    
    // Close notes when scrolling away from highlighted text
    let scrollTimeout;
    const scrollHandler = () => {
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(() => {
            const visibleNotes = document.querySelectorAll('.editor-note.visible');
            visibleNotes.forEach(note => {
                const link = note.previousElementSibling;
                if (link && link.classList.contains('editor-note-link')) {
                    const linkRect = link.getBoundingClientRect();
                    const viewportHeight = window.innerHeight;
                    
                    // If the link is not visible in the viewport, hide the note
                    if (linkRect.bottom < 0 || linkRect.top > viewportHeight) {
                        hideEditorNote(note);
                    }
                }
            });
        }, 100); // Debounce scroll events
    };
    window.addEventListener('scroll', scrollHandler);
    editorNotesEventListeners.scroll = scrollHandler;
}

function extractInterviewName(href) {
    if (!href) return '';
    const pathParts = href.split('/').filter(part => part.length > 0);
    const slug = pathParts[pathParts.length - 1];
    return slug.split('-').map(word => 
        word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
}

function setupEditorNote(note, interviewName, href) {
    // Check if the note has already been processed
    if (note.querySelector('.editor-note__label')) {
        return; // Already processed
    }
    
    // Get the original note content before modifying the HTML
    const noteContent = note.textContent.trim();
    
    // Create the structured note HTML with close button for desktop only
    note.innerHTML = `
        <button class="editor-note__close" aria-label="Close editor note">×</button>
        <div class="editor-note__label" id="editor-note-label">Editor's note:</div>
        <div class="editor-note__content" id="editor-note-content">${noteContent}</div>
        <div class="editor-note__link">Read ${interviewName}'s interview next</div>
    `;
    
    // Add ARIA attributes to the note
    note.setAttribute('role', 'dialog');
    note.setAttribute('aria-labelledby', 'editor-note-label');
    note.setAttribute('aria-describedby', 'editor-note-content');
    
    // Add close button functionality (desktop only)
    const closeBtn = note.querySelector('.editor-note__close');
    closeBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        hideEditorNote(note);
    });
    
    // Make the note clickable to open interview
    note.addEventListener('click', (e) => {
        // Don't open if clicking the close button
        if (e.target.classList.contains('editor-note__close')) {
            return;
        }
        window.open(href, '_blank');
    });
}

function showEditorNote(link, note) {
    // Hide any other visible notes
    hideAllEditorNotes();
    
    // Position the note relative to the link
    positionEditorNote(link, note);
    
    // Show the note
    note.classList.add('visible');
    
    // Set focus to the note for screen readers
    note.setAttribute('aria-hidden', 'false');
    note.focus();
}

function hideEditorNote(note) {
    note.classList.remove('visible');
    note.setAttribute('aria-hidden', 'true');
}

function hideAllEditorNotes() {
    const visibleNotes = document.querySelectorAll('.editor-note.visible');
    visibleNotes.forEach(note => hideEditorNote(note));
}

function positionEditorNote(link, note) {
    const paragraph = link.closest('p');
    const paragraphRect = paragraph.getBoundingClientRect();
    const linkRect = link.getBoundingClientRect();
    
    // Position relative to paragraph, not viewport
    const left = -320; // Fixed left margin position (300px sidebar + 20px gap)
    const top = linkRect.top - paragraphRect.top; // Relative to paragraph start
    
    // Position the note
    note.style.position = 'absolute';
    note.style.left = `${left}px`;
    note.style.top = `${top}px`;
    note.style.right = 'auto';
}

function showMobileEditorNote(note) {
    // Remove any existing modals first
    const existingModals = document.querySelectorAll('.editor-note-modal');
    existingModals.forEach(modal => modal.remove());
    
    // Get the link that triggered this modal
    const link = note.previousElementSibling;
    const href = link ? link.getAttribute('href') : null;
    
    // Create modal overlay
    const modal = document.createElement('div');
    modal.className = 'editor-note-modal';
    
    // Create content div
    const content = document.createElement('div');
    content.className = 'editor-note-modal__content';
    
    // Add note content to modal (remove close button for mobile)
    const noteContent = note.innerHTML;
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = noteContent;
    
    // Remove the close button from mobile modal
    const closeBtn = tempDiv.querySelector('.editor-note__close');
    if (closeBtn) {
        closeBtn.remove();
    }
    
    content.innerHTML = tempDiv.innerHTML;
    modal.appendChild(content);
    
    // Add modal to body
    document.body.appendChild(modal);
    
    // Make modal content clickable to open interview
    if (href) {
        content.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            window.open(href, '_blank');
            modal.remove(); // Close modal after opening link
        });
        
        // Add cursor pointer to indicate clickability
        content.style.cursor = 'pointer';
    }
    
    // Close on overlay click (but not on content)
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.remove();
        }
    });
    
    // Close on escape key
    const handleEscape = (e) => {
        if (e.key === 'Escape') {
            modal.remove();
            document.removeEventListener('keydown', handleEscape);
        }
    };
    document.addEventListener('keydown', handleEscape);
}

// Text Navigation Functionality
function initBottomNavigation() {
    const currentInterview = getCurrentInterview();
    if (!currentInterview) return;
    
    const interviews = getInterviewsList();
    const currentIndex = interviews.findIndex(interview => 
        interview.slug === currentInterview.slug
    );
    
    if (currentIndex === -1) return;
    
    // Set up previous interview
    const prevInterview = currentIndex > 0 ? interviews[currentIndex - 1] : null;
    const prevArrow = document.getElementById('text-prev-arrow');
    const prevName = document.getElementById('text-prev-name');
    
    if (prevInterview && prevArrow && prevName) {
        prevArrow.href = `/generational-data-interviews/${prevInterview.slug}`;
        prevName.textContent = prevInterview.name;
    } else if (prevArrow) {
        prevArrow.style.display = 'none';
    }
    
    // Set up next interview
    const nextInterview = currentIndex < interviews.length - 1 ? interviews[currentIndex + 1] : null;
    const nextArrow = document.getElementById('text-next-arrow');
    const nextName = document.getElementById('text-next-name');
    
    if (nextInterview && nextArrow && nextName) {
        nextArrow.href = `/generational-data-interviews/${nextInterview.slug}`;
        nextName.textContent = nextInterview.name;
    } else if (nextArrow) {
        nextArrow.style.display = 'none';
    }
}

function getCurrentInterview() {
    const currentPath = window.location.pathname;
    const pathParts = currentPath.split('/').filter(part => part.length > 0);
    const currentSlug = pathParts[pathParts.length - 1];
    
    if (!currentSlug || currentSlug === 'generational-data-interviews') {
        return null;
    }
    
    // Find the interview in the interviews list
    const interviews = getInterviewsList();
    return interviews.find(interview => interview.slug === currentSlug);
}

function getInterviewsList() {
    // Return the same interviews list used by the cycling navigation
    // Convert INTERVIEWS array to match the expected format
    return INTERVIEWS.map(interview => ({
        slug: interview.file,
        name: interview.name
    }));
}


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
        
        // Distribute across columns sequentially
        if (index < 5) {
            column1.appendChild(intervieweeDiv);
        } else if (index < 10) {
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
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-haspopup', 'true');
    toggle.setAttribute('aria-controls', 'interviewees-dropdown-menu');
    toggle.setAttribute('aria-label', 'Select an interview to read');
    grid.appendChild(toggle);
    
    // Create dropdown menu
    const menu = document.createElement('div');
    menu.className = 'interview-landing__mobile-dropdown-menu';
    menu.id = 'interviewees-dropdown-menu';
    menu.setAttribute('role', 'menu');
    menu.setAttribute('aria-labelledby', 'interviewees-dropdown-toggle');
    grid.appendChild(menu);
    
    // Add each interview link
    interviews.forEach(interview => {
        const link = document.createElement('a');
        link.href = `/generational-data-interviews/${interview.file}/`;
        link.className = 'interview-landing__interviewee-name';
        link.textContent = interview.name;
        link.setAttribute('role', 'menuitem');
        link.setAttribute('aria-label', `Read interview with ${interview.name}`);
        menu.appendChild(link);
    });
    
    
    // Add click handler for toggle
    toggle.addEventListener('click', function(event) {
        event.stopPropagation(); // Prevent event from bubbling to document listeners
        const isOpen = toggle.classList.contains('open');
        toggle.classList.toggle('open');
        menu.classList.toggle('open');
        toggle.setAttribute('aria-expanded', !isOpen);
    });
    
    // Register this dropdown with the centralized system
    registerDropdown(grid);
}

function loadQuoteCards() {
    
    try {
        // Validate interviews data
        if (!INTERVIEWS || !Array.isArray(INTERVIEWS) || INTERVIEWS.length === 0) {
            return false;
        }
        
        
        
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
        
        // Use stored shuffle order or create new one if not exists
        if (!shuffledInterviewsOrder) {
            shuffledInterviewsOrder = [...INTERVIEWS].sort(() => Math.random() - 0.5);
        }
        const shuffledInterviews = shuffledInterviewsOrder;
        
        // Track successful card creation
        let successCount = 0;
        const errors = [];
        
        // Create quote cards for each interview
        shuffledInterviews.forEach((interview, index) => {
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
                quoteCard.setAttribute('role', 'button');
                quoteCard.setAttribute('tabindex', '0');
                quoteCard.setAttribute('aria-label', `Read interview with ${interview.name}: ${pullQuote}`);
                
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
                
                // Add click and keyboard handlers with error handling
                try {
                    const handleActivation = (e) => {
                        e.preventDefault();
                        try {
                            window.location.href = `/generational-data-interviews/${interview.file}/`;
                        } catch (navError) {
                        }
                    };
                    
                    quoteCard.addEventListener('click', handleActivation);
                    quoteCard.addEventListener('keydown', (e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                            handleActivation(e);
                        }
                    });
                } catch (eventError) {
                    errors.push(`Click handler failed for ${interview.name}`);
                }
                
                // Append card to container
                try {
                    quoteCardsContainer.appendChild(quoteCard);
                    
                    // Adjust font size based on text length (apply immediately)
                    adjustQuoteTextSize(quoteCard);
                    
                    successCount++;
                } catch (appendError) {
                    errors.push(`Append failed for ${interview.name}`);
                }
                
            } catch (cardError) {
                errors.push(`Processing failed for ${interview?.name || 'unknown'}`);
            }
        });
        
        // Report results
        
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
    
    // Create a cache key based on text length
    const cacheKey = `length_${textLength}`;
    
    // Check if we already calculated this font size
    let fontSize = quoteCardFontSizes.get(cacheKey);
    
    if (!fontSize) {
        // Calculate optimal font size based on text length - three simple categories
        if (textLength <= 80) {
            fontSize = '1.3rem';  // Larger for short quotes
        } else if (textLength <= 120) {
            fontSize = '1.1rem';  // Standard size for medium quotes
        } else {
            fontSize = '0.95rem'; // Smaller for long quotes
        }
        
        // Cache the calculated font size
        quoteCardFontSizes.set(cacheKey, fontSize);
    }
    
    // Apply the font size immediately (no delay needed)
    quoteText.style.fontSize = fontSize;
}

// Helper function to adjust pull quote text size based on content length
function adjustBlockquoteSize(blockquote) {
    const text = blockquote.textContent.trim();
    const textLength = text.length;
    
    // Calculate optimal font size based on text length - slightly smaller scale for blockquotes
    let fontSize;
    if (textLength <= 60) {
        fontSize = 'clamp(2rem, 5vw, 3.5rem)';  // Large for short quotes
    } else if (textLength <= 100) {
        fontSize = 'clamp(1.8rem, 4.5vw, 3rem)';  // Medium for medium quotes
    } else if (textLength <= 150) {
        fontSize = 'clamp(1.5rem, 4vw, 2.5rem)'; // Smaller for longer quotes
    } else {
        fontSize = 'clamp(1.2rem, 3.5vw, 2rem)'; // Smallest for very long quotes
    }
    
    // Apply the calculated font size
    blockquote.style.fontSize = fontSize;
}

// Dedicated function to resize all blockquotes
function resizeAllBlockquotes() {
    const blockquotes = document.querySelectorAll('blockquote p, blockquote');
    console.log('Resizing blockquotes:', blockquotes.length);
    blockquotes.forEach(adjustBlockquoteSize);
}

// Set up a MutationObserver to watch for blockquotes being added
function setupBlockquoteObserver() {
    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            if (mutation.type === 'childList') {
                mutation.addedNodes.forEach((node) => {
                    if (node.nodeType === 1) { // Element node
                        if (node.tagName === 'BLOCKQUOTE' || node.querySelector('blockquote')) {
                            setTimeout(() => {
                                resizeAllBlockquotes();
                            }, 50);
                        }
                    }
                });
            }
        });
    });
    
    observer.observe(document.body, {
        childList: true,
        subtree: true
    });
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
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-haspopup', 'true');
    toggle.setAttribute('aria-controls', 'interview-dropdown-menu');
    toggle.setAttribute('aria-label', 'Select an interview to read');
    container.appendChild(toggle);
    
    // Create dropdown menu
    const menu = document.createElement('div');
    menu.className = 'interview-page__dropdown-menu';
    menu.id = 'interview-dropdown-menu';
    menu.setAttribute('role', 'menu');
    menu.setAttribute('aria-labelledby', 'interview-dropdown-toggle');
    container.appendChild(menu);
    
    // Add "Back to Series" link
    const backLink = document.createElement('a');
    backLink.href = '/generational-data-interviews/';
    backLink.className = 'interview-page__link';
    backLink.textContent = 'Back to Series';
    backLink.setAttribute('role', 'menuitem');
    backLink.setAttribute('aria-label', 'Return to interview series homepage');
    menu.appendChild(backLink);
    
    // Add each interview link
    INTERVIEWS.forEach(interview => {
        const link = document.createElement('a');
        link.href = `/generational-data-interviews/${interview.file}/`;
        link.className = 'interview-page__link';
        link.textContent = interview.name;
        link.setAttribute('role', 'menuitem');
        link.setAttribute('aria-label', `Read interview with ${interview.name}`);
        
        // Check if this is the current page
        const currentPath = window.location.pathname;
        const pathParts = currentPath.split('/').filter(part => part.length > 0);
        const currentSlug = pathParts[pathParts.length - 1];
        if (currentSlug === interview.file) {
            link.classList.add('interview-page__link--current');
            link.setAttribute('aria-current', 'page');
            toggle.textContent = interview.name; // Update toggle text to current interview
        }
        
        menu.appendChild(link);
    });
    
    // Add click handler for toggle
    toggle.addEventListener('click', function(event) {
        event.stopPropagation(); // Prevent event from bubbling to document listeners
        const isOpen = toggle.classList.contains('open');
        toggle.classList.toggle('open');
        menu.classList.toggle('open');
        toggle.setAttribute('aria-expanded', !isOpen);
    });
    
    // Register this dropdown with the centralized system
    registerDropdown(container);
    
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
    
    // Set the href attributes - Swup will handle the transitions automatically
    prevArrow.href = prevUrl;
    nextArrow.href = nextUrl;
    
    
    // Return success status
    return {
        success: true,
        prevUrl: prevArrow.href,
        nextUrl: nextArrow.href,
        prevInterview: prevInterview.name,
        nextInterview: nextInterview.name
    };
}
