// Generational Data Interviews - Main JavaScript File
// Handles all interview series functionality

console.log('Interview series JavaScript loaded!');

// Centralized interview data - single source of truth
const INTERVIEWS = [
    { name: 'KATIE MACKINNON', file: 'katie-mackinnon', pullQuote: "I would devote a lot of the funding to the decision-making processes around what gets to last for 100 years, who gets to decide, and why?" },
    { name: 'LORI EMERSON', file: 'lori-emerson', pullQuote: "I'm going to give you the most boring and predictable answer possible." },
    { name: 'CHE-WEI WANG & TAYLOR LEVY', file: 'che-wei-wang-taylor-levy', pullQuote: "I would do two things, both where I'm not following instructions. First, I would think about storing for 20 years and 500 years, not 100." },
    { name: 'MICHELLE LEE', file: 'michelle-lee', pullQuote: "I would have the best copyright lawyers in the country figuring out how we can actually make this work." },
    { name: 'IAN MILLIGAN', file: 'ian-milligan', pullQuote: "People think it failed because of beautiful Renaissance paintings of marauding armies burning down the Library of Alexandria, but it fundamentally died because people stopped caring." },
    { name: 'TREVOR OWENS', file: 'trevor-owens', pullQuote: "The more that information is touched, the more that it's handled, the more that it's forward migrated, the more that it's engaged with, the safer it is." }
];

// Track initialization to prevent multiple runs
let isInitialized = false;

// Initialize when DOM is ready
function initializeWhenReady() {
    if (document.readyState === 'loading') {
        console.log('DOM is loading, waiting for DOMContentLoaded event');
        document.addEventListener('DOMContentLoaded', initInterviewSeries);
    } else {
        console.log('DOM is already loaded, running initInterviewSeries immediately');
        initInterviewSeries();
    }
}

// Initialize interview series functionality
function initInterviewSeries() {
    console.log('=== INITIALIZING INTERVIEW SERIES ===');
    console.log('Current URL:', window.location.pathname);
    console.log('Document ready state:', document.readyState);
    
    // Reset initialization flag for each page load
    isInitialized = false;
    
    // Check if we're on the landing page
    const intervieweesGrid = document.getElementById('interviewees-grid');
    const isLandingPage = intervieweesGrid !== null;
    console.log('interviewees-grid element found:', !!intervieweesGrid);
    console.log('Is landing page:', isLandingPage);
    
    // Load interviewees for landing page (only if on landing page)
    if (isLandingPage) {
        console.log('Running loadInterviewees() for landing page');
        try {
            loadInterviewees();
            loadQuoteCards();
        } catch (error) {
            console.error('Error loading interviewees:', error);
        }
    } else {
        console.log('Skipping loadInterviewees() - not on landing page');
    }
    
    // Load interviewees for individual interview pages (only if on interview page)
    const interviewLinks = document.querySelector('.interview-links');
    const isInterviewPage = interviewLinks !== null;
    console.log('interview-links element found:', !!interviewLinks);
    console.log('Is interview page:', isInterviewPage);
    
    if (isInterviewPage) {
        console.log('=== SETTING UP INTERVIEW PAGE ===');
        console.log('Interview links element:', interviewLinks);
        console.log('Interview links children:', interviewLinks ? interviewLinks.children.length : 'N/A');
        
        try {
            // Try to load sidebar immediately
            console.log('Attempting to load sidebar...');
            const sidebarLoaded = loadInterviewSidebar();
            console.log('Sidebar load result:', sidebarLoaded);
            
            // Set up cycling navigation arrows
            console.log('Setting up cycling navigation...');
            try {
                const navResult = setupCyclingNavigation();
                console.log('✅ Cycling navigation setup completed, result:', navResult);
            } catch (error) {
                console.error('❌ Error setting up cycling navigation:', error);
            }
            
            // If sidebar didn't load successfully, try again with multiple attempts
            if (!sidebarLoaded) {
                console.log('Initial sidebar load failed, retrying...');
                let retryCount = 0;
                const maxRetries = 3;
                
                const retrySidebar = () => {
                    retryCount++;
                    console.log(`=== SIDEBAR RETRY ${retryCount}/${maxRetries} ===`);
                    
                    const retrySuccess = loadInterviewSidebar();
                    console.log(`Retry ${retryCount} result:`, retrySuccess);
                    
                    if (!retrySuccess && retryCount < maxRetries) {
                        console.log(`Scheduling retry ${retryCount + 1} in ${100 * retryCount}ms`);
                        setTimeout(retrySidebar, 100 * retryCount); // Increasing delay
                    } else if (!retrySuccess) {
                        console.error('Sidebar failed to load after all retries');
                    } else {
                        console.log('Sidebar loaded successfully on retry');
                    }
                };
                
                setTimeout(retrySidebar, 100);
            }
            
        } catch (error) {
            console.error('Error setting up interview page:', error);
        }
    } else {
        console.log('Skipping loadInterviewSidebar() - not on interview page');
    }
    
    console.log('=== INTERVIEW SERIES INITIALIZATION COMPLETE ===');
}


// Swup integration for sidebar loading, simple navigation
function setupSwupIntegration() {
    console.log('Setting up Swup integration for sidebar loading...');
    
    // Check if Swup is available
    if (typeof Swup !== 'undefined') {
        console.log('Swup detected, setting up interview series hooks');
        
        // Wait for Swup to be initialized
        let retryCount = 0;
        const maxSwupRetries = 20; // 2 seconds max
        
        const waitForSwup = () => {
            if (window.swup && window.swup.hooks) {
                console.log('✅ Swup instance and hooks found, setting up hooks');
                // Hook into Swup's content replacement
                window.swup.hooks.on('content:replace', () => {
                    console.log('🔄 Swup content replaced, checking for interview series...');
                    if (isInterviewSeriesPage()) {
                        console.log('📄 Interview series page detected, reinitializing...');
                        // Small delay to ensure DOM is ready
                        setTimeout(() => {
                            console.log('🔄 Reinitializing interview series after navigation...');
                            initInterviewSeries();
                        }, 50);
                    }
                });
                
                // Also hook into page view to ensure sidebar is updated
                window.swup.hooks.on('page:view', () => {
                    console.log('🔄 Swup page view, checking for interview series...');
                    if (isInterviewSeriesPage()) {
                        console.log('📄 Interview series page viewed, reloading sidebar...');
                        // Small delay to ensure DOM is ready
                        setTimeout(() => {
                            const interviewLinks = document.querySelector('.interview-links');
                            if (interviewLinks) {
                                console.log('🔄 Reloading sidebar for new page...');
                                loadInterviewSidebar();
                                setupCyclingNavigation();
                            }
                        }, 100);
                    }
                });
                
                // Specific hook for landing page to reload quote cards
                window.swup.hooks.on('page:view', () => {
                    console.log('🔄 Checking if landing page needs quote cards...');
                    if (isLandingPage()) {
                        console.log('🏠 Landing page detected, reloading quote cards...');
                        setTimeout(() => {
                            const quoteCardsContainer = document.querySelector('.quote-cards');
                            if (quoteCardsContainer) {
                                console.log('🔄 Reloading quote cards for landing page...');
                                loadQuoteCards();
                            }
                        }, 100);
                    }
                });
            } else if (retryCount < maxSwupRetries) {
                retryCount++;
                console.log(`⏳ Swup instance or hooks not ready, retrying... (${retryCount}/${maxSwupRetries})`);
                console.log('Swup available:', !!window.swup);
                console.log('Swup hooks available:', !!(window.swup && window.swup.hooks));
                // Retry after a short delay
                setTimeout(waitForSwup, 100);
            } else {
                console.log('⚠️ Swup hooks not available after retries, using fallback approach');
                // Fall back to standard initialization
                initializeWhenReady();
            }
        };
        
        waitForSwup();
    } else {
        console.log('❌ Swup not detected, using standard initialization');
        initializeWhenReady();
    }
    
    // Also set up a more aggressive approach - check periodically for interview pages
    setInterval(() => {
        if (isInterviewSeriesPage()) {
            // Check for landing page quote cards
            if (isLandingPage()) {
                const quoteCardsContainer = document.querySelector('.quote-cards');
                if (quoteCardsContainer && quoteCardsContainer.children.length === 0) {
                    console.log('🔄 Periodic check: Landing page quote cards missing, reloading...');
                    loadQuoteCards();
                }
            }
            
            // Check for interview page sidebar
            const interviewLinks = document.querySelector('.interview-links');
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
                    console.log('🔄 Periodic check: Sidebar needs update, reloading...');
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

function loadInterviewees() {
    console.log('Loading interviewees...');
    
    console.log('Found', INTERVIEWS.length, 'interviews to display');
    console.log('Interview names:', INTERVIEWS.map(i => i.name));
    
    // Generate the HTML for the interviewees grid
    generateIntervieweesGrid(INTERVIEWS);
}

function generateIntervieweesGrid(interviews) {
    const grid = document.getElementById('interviewees-grid');
    if (!grid) {
        console.error('interviewees-grid element not found');
        return;
    }
    
    console.log('Found interviewees-grid element, current children:', grid.children.length);
    
    // Check if grid is already populated to avoid re-running
    if (grid.children.length > 0 && grid.querySelector('.interviewees-column')) {
        console.log('Grid already populated, skipping generation');
        return;
    }
    
    // Clear any existing content (including fallback HTML)
    grid.innerHTML = '';
    console.log('Cleared existing content, generating', interviews.length, 'interviews');
    
    // Create three columns
    const column1 = document.createElement('div');
    column1.className = 'interviewees-column';
    
    const column2 = document.createElement('div');
    column2.className = 'interviewees-column';
    
    const column3 = document.createElement('div');
    column3.className = 'interviewees-column';
    
    // Distribute interviews across columns
    interviews.forEach((interview, index) => {
        const intervieweeDiv = document.createElement('div');
        intervieweeDiv.className = 'interviewee-name';
        
        // Create a link to the interview page
        const link = document.createElement('a');
        link.href = `/generational-data-interviews/${interview.file}/`;
        link.textContent = interview.name;
        link.style.color = 'white';
        link.style.textDecoration = 'none';
        link.style.textTransform = 'uppercase';
        
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
    
    console.log('Added columns to grid. Final children count:', grid.children.length);
    console.log('Column 1 children:', column1.children.length);
    console.log('Column 2 children:', column2.children.length);
    console.log('Column 3 children:', column3.children.length);
}

function loadQuoteCards() {
    console.log('=== LOADING QUOTE CARDS ===');
    
    try {
        // Validate interviews data
        if (!INTERVIEWS || !Array.isArray(INTERVIEWS) || INTERVIEWS.length === 0) {
            console.error('❌ No interviews data available');
            return false;
        }
        
        console.log(`Found ${INTERVIEWS.length} interviews to process`);
        
        // Find quote cards container
        const quoteCardsContainer = document.querySelector('.quote-cards');
        if (!quoteCardsContainer) {
            console.error('❌ Quote cards container not found');
            return false;
        }
        
        console.log('✅ Quote cards container found');
        
        // Clear existing content safely
        try {
            quoteCardsContainer.innerHTML = '';
            console.log('✅ Cleared existing content');
        } catch (error) {
            console.error('❌ Error clearing container:', error);
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
                    console.warn(`⚠️ Skipping invalid interview at index ${index}:`, interview);
                    errors.push(`Invalid interview data at index ${index}`);
                    return;
                }
                
                // Validate pull quote
                const pullQuote = interview.pullQuote || 'No quote available';
                if (pullQuote === 'No quote available') {
                    console.warn(`⚠️ No pull quote for ${interview.name}`);
                }
                
                // Create quote card element
                const quoteCard = document.createElement('div');
                quoteCard.className = 'quote-card';
                
                // Set up card content with error handling
                try {
                    quoteCard.innerHTML = `
                        <div class="quote-mark">
                            <img src="/generational-data-interviews/assets/QuotationMark.png" alt="Quotation mark" onerror="this.style.display='none'; console.warn('Quotation mark image failed to load')" />
                        </div>
                        <p class="quote-text">${escapeHtml(pullQuote)}</p>
                        <div class="quote-attribution">- ${escapeHtml(interview.name)}</div>
                        <div class="quote-link">↗</div>
                    `;
                } catch (htmlError) {
                    console.error(`❌ Error creating HTML for ${interview.name}:`, htmlError);
                    errors.push(`HTML creation failed for ${interview.name}`);
                    return;
                }
                
                // Add click handler with error handling
                try {
                    quoteCard.addEventListener('click', (e) => {
                        e.preventDefault();
                        console.log(`🖱️ Navigating to ${interview.name} interview`);
                        try {
                            window.location.href = `/generational-data-interviews/${interview.file}/`;
                        } catch (navError) {
                            console.error('❌ Navigation error:', navError);
                        }
                    });
                } catch (eventError) {
                    console.error(`❌ Error adding click handler for ${interview.name}:`, eventError);
                    errors.push(`Click handler failed for ${interview.name}`);
                }
                
                // Append card to container
                try {
                    quoteCardsContainer.appendChild(quoteCard);
                    successCount++;
                    console.log(`✅ Added quote card for ${interview.name}`);
                } catch (appendError) {
                    console.error(`❌ Error appending card for ${interview.name}:`, appendError);
                    errors.push(`Append failed for ${interview.name}`);
                }
                
            } catch (cardError) {
                console.error(`❌ Error processing interview ${interview?.name || 'unknown'}:`, cardError);
                errors.push(`Processing failed for ${interview?.name || 'unknown'}`);
            }
        });
        
        // Report results
        console.log(`=== QUOTE CARDS LOADING COMPLETE ===`);
        console.log(`✅ Successfully created: ${successCount}/${INTERVIEWS.length} cards`);
        
        if (errors.length > 0) {
            console.warn(`⚠️ Errors encountered: ${errors.length}`);
            errors.forEach(error => console.warn(`  - ${error}`));
        }
        
        // Return success status
        return successCount > 0;
        
    } catch (error) {
        console.error('❌ Fatal error in loadQuoteCards:', error);
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

function loadInterviewSidebar() {
    console.log('=== LOADING INTERVIEW SIDEBAR ===');
    
    // Get the sidebar links container
    const sidebarLinks = document.querySelector('.interview-links');
    console.log('Looking for .interview-links element:', sidebarLinks);
    
    if (!sidebarLinks) {
        console.log('No interview sidebar found on this page (this is normal for the landing page)');
        return false;
    }
    
    console.log('Sidebar element found:', {
        tagName: sidebarLinks.tagName,
        className: sidebarLinks.className,
        id: sidebarLinks.id,
        children: sidebarLinks.children.length,
        innerHTML: sidebarLinks.innerHTML.substring(0, 100) + '...'
    });
    
    // Check if sidebar is already populated
    if (sidebarLinks.children.length > 0) {
        console.log('Sidebar already populated, clearing and regenerating...');
        // Clear existing content to ensure fresh generation
        sidebarLinks.innerHTML = '';
    }
    
    console.log('Found interview sidebar, generating links...');
    console.log('Current sidebar content:', sidebarLinks.innerHTML);
    
    console.log('Found', INTERVIEWS.length, 'interviews for sidebar');
    
    // Clear existing content
    sidebarLinks.innerHTML = '';
    
    // Add "Back to Series" link
    const backLink = document.createElement('a');
    backLink.href = '/generational-data-interviews/';
    backLink.className = 'interview-link';
    backLink.textContent = 'Back to Series';
    sidebarLinks.appendChild(backLink);
    
    // Add each interview link
    INTERVIEWS.forEach(interview => {
        const link = document.createElement('a');
        link.href = `/generational-data-interviews/${interview.file}/`;
        link.className = 'interview-link';
        link.textContent = interview.name;
        
        // Check if this is the current page
        const currentPath = window.location.pathname;
        const pathParts = currentPath.split('/').filter(part => part.length > 0);
        const currentSlug = pathParts[pathParts.length - 1];
        if (currentSlug === interview.file) {
            link.classList.add('current');
            console.log('Marking', interview.name, 'as current page');
        }
        
        sidebarLinks.appendChild(link);
        console.log('Added link for', interview.name);
    });
    
    console.log('=== SIDEBAR GENERATION COMPLETE ===');
    console.log('Total links added:', sidebarLinks.children.length);
    console.log('Final sidebar HTML:', sidebarLinks.innerHTML.substring(0, 200) + '...');
    
    // Verify the sidebar was populated successfully
    if (sidebarLinks.children.length > 0) {
    console.log('✅ Sidebar successfully populated with', sidebarLinks.children.length, 'links');
    return true;
} else {
    console.error('❌ Sidebar failed to populate - no children added');
    console.log('Sidebar element after generation:', sidebarLinks);
    return false;
}
}



// Function to set up cycling navigation arrows
function setupCyclingNavigation() {
    console.log('=== SETTING UP CYCLING NAVIGATION ===');
    console.log('Current URL:', window.location.pathname);
    
    const prevArrow = document.getElementById('prev-arrow');
    const nextArrow = document.getElementById('next-arrow');
    
    console.log('Found prev arrow:', !!prevArrow);
    console.log('Found next arrow:', !!nextArrow);
    
    if (!prevArrow || !nextArrow) {
        console.log('❌ Navigation arrows not found');
        console.log('Looking for elements with IDs: prev-arrow, next-arrow');
        console.log('Available elements with similar IDs:');
        const allElements = document.querySelectorAll('[id*="arrow"]');
        allElements.forEach(el => console.log('- Found element:', el.id, el));
        return;
    }
    
    console.log('✅ Navigation arrows found:', {
        prevArrow: prevArrow,
        nextArrow: nextArrow,
        prevArrowHref: prevArrow.href,
        nextArrowHref: nextArrow.href
    });
    
    // Get current interview slug from URL
    const currentPath = window.location.pathname;
    const pathParts = currentPath.split('/').filter(part => part.length > 0);
    const currentSlug = pathParts[pathParts.length - 1];
    console.log('Current interview slug:', currentSlug);
    console.log('Path parts:', pathParts);
    
    // Find current interview index
    const currentIndex = INTERVIEWS.findIndex(interview => interview.file === currentSlug);
    console.log('Current interview index:', currentIndex);
    
    if (currentIndex === -1) {
        console.log('❌ Current interview not found in list');
        console.log('Available interviews:', INTERVIEWS.map(i => i.file));
        return;
    }
    
    // Calculate previous and next indices with cycling
    const prevIndex = currentIndex === 0 ? INTERVIEWS.length - 1 : currentIndex - 1;
    const nextIndex = currentIndex === INTERVIEWS.length - 1 ? 0 : currentIndex + 1;
    
    console.log('Navigation indices:', {
        current: currentIndex,
        prev: prevIndex,
        next: nextIndex
    });
    
    // Set up navigation links
    const prevInterview = INTERVIEWS[prevIndex];
    const nextInterview = INTERVIEWS[nextIndex];
    
    const prevUrl = `/generational-data-interviews/${prevInterview.file}/`;
    const nextUrl = `/generational-data-interviews/${nextInterview.file}/`;
    
    console.log('Setting navigation URLs:', {
        prev: prevInterview.name,
        next: nextInterview.name,
        prevUrl: prevUrl,
        nextUrl: nextUrl
    });
    
    // Set the href attributes
    prevArrow.href = prevUrl;
    nextArrow.href = nextUrl;
    
    console.log('✅ Navigation set up successfully:', {
        prev: prevInterview.name,
        next: nextInterview.name,
        prevUrl: prevArrow.href,
        nextUrl: nextArrow.href
    });
    
    // Test that the links are clickable
    console.log('Testing navigation links...');
    console.log('Prev arrow clickable:', prevArrow.href !== '#');
    console.log('Next arrow clickable:', nextArrow.href !== '#');
    
    // Set the href attributes - let the browser handle navigation naturally
    // This works with Swup's page transitions without needing special handling
    console.log('Setting navigation URLs:', {
        prev: prevInterview.name,
        next: nextInterview.name,
        prevUrl: prevUrl,
        nextUrl: nextUrl
    });
    
    // Set the href attributes - Swup will handle the transitions automatically
    prevArrow.href = prevUrl;
    nextArrow.href = nextUrl;
    
    console.log('✅ Navigation links set up successfully (Swup will handle transitions)');
    
    // Test that the links are actually clickable
    console.log('Final navigation test:');
    console.log('- Prev arrow href:', prevArrow.href);
    console.log('- Next arrow href:', nextArrow.href);
    console.log('- Prev arrow clickable:', prevArrow.href !== '#' && prevArrow.href !== '');
    console.log('- Next arrow clickable:', nextArrow.href !== '#' && nextArrow.href !== '');
    
    // Add simple click listeners for debugging
    prevArrow.addEventListener('click', (e) => {
        console.log('🖱️ Prev arrow clicked!', {
            href: prevArrow.href,
            target: e.target,
            currentTarget: e.currentTarget
        });
    });
    
    nextArrow.addEventListener('click', (e) => {
        console.log('🖱️ Next arrow clicked!', {
            href: nextArrow.href,
            target: e.target,
            currentTarget: e.currentTarget
        });
    });
    
    console.log('✅ Click listeners added for debugging');
    
    // Return success status
    return {
        success: true,
        prevUrl: prevArrow.href,
        nextUrl: nextArrow.href,
        prevInterview: prevInterview.name,
        nextInterview: nextInterview.name
    };
}
