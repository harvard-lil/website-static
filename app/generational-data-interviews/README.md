# Generational Data Interviews

A comprehensive interview series system for the Library Innovation Lab website, featuring dynamic content loading, responsive design, and smooth navigation.

## 🏗️ System Architecture

### Core Components

| Component | Location | Purpose |
|-----------|----------|---------|
| **Landing Page** | `generational-data-interviews/index.html` | Main entry point with interviewees grid and quote cards |
| **Interview Pages** | `app/_interviews/*.md` | Individual interview content using Jekyll markdown |
| **Layout Template** | `app/_layouts/interview.html` | Jekyll layout for interview pages |
| **JavaScript Engine** | `generational-data-interviews/main.js` | Dynamic content loading, navigation, and interactions |
| **Styling** | `app/assets/css/interview-series.css` | Complete visual design system |
| **Assets** | `generational-data-interviews/assets/` | Images, fonts, and graphics |

### Data Flow

```
Jekyll Markdown Files → Layout Template → JavaScript Processing → Dynamic UI
```

## 📁 File Structure

```
app/
├── generational-data-interviews/    # Interview series folder
│   ├── index.html                   # Landing page
│   ├── main.js                      # JavaScript engine
│   ├── assets/                      # Images and graphics
│   │   ├── *.png                   # Interview headshots
│   │   ├── fonts/                  # Custom fonts
│   │   └── *.png                   # Hero images and graphics
│   └── README.md                   # This documentation
│
├── _interviews/                     # Interview content (Jekyll)
│   ├── amelia-acker.md
│   ├── martin-kunze-steffen-hellmold.md
│   ├── frank-cifaldi.md
│   └── [other-interviews].md
│
├── _layouts/
│   └── interview.html               # Jekyll layout template
│
└── assets/css/
    └── interview-series.css          # Complete styling system
```

## 🎯 Key Functionality

### Landing Page Features
- **Dynamic Interviewees Grid**: Auto-generated from JavaScript data
- **Quote Cards**: Pull quotes with smooth scrolling
- **Responsive Design**: Desktop grid → Mobile dropdown
- **Hero Section**: Custom typography and graphics

### Interview Page Features
- **Profile Section**: Headshot, bio, navigation arrows
- **Two-Column Layout**: Sidebar navigation + main content
- **Mobile Dropdown**: Collapsible navigation for mobile
- **Smooth Transitions**: Swup.js integration for seamless navigation

### JavaScript Engine (`main.js`)
- **Centralized Data**: Single source of truth for all interviews
- **Dynamic Loading**: Content generated from data arrays
- **Responsive Handling**: Automatic mobile/desktop switching
- **Navigation**: Previous/next interview arrows
- **Swup Integration**: Smooth page transitions

## 🛠️ Adding a New Interview

### Step 1: Create Interview Content

1. **Create markdown file** in `app/_interviews/`:
   ```bash
   # Example: app/_interviews/new-interview.md
   ```

2. **Add front matter**:
   ```yaml
   ---
   layout: interview
   title: Interviewee Name
   slug: new-interview
   image: new-interview.png
   bio: >
     Brief biographical description of the interviewee.
   date: 2025-01-30
   quote-card: "A compelling quote from the interview."
   custom-css: ['interview-series']
   ---
   ```

3. **Add interview content**:
   ```markdown
   <div class="speaker-label">Interviewer</div>
   <p>Your interview questions and responses here...</p>
   ```

### Step 2: Add Headshot Image

1. **Place image** in `app/generational-data-interviews/assets/`
2. **Name it** following the pattern: `[slug].png`
3. **Recommended size**: 400x400px or larger
4. **Format**: PNG or JPG

### Step 3: Update JavaScript Data

1. **Open** `generational-data-interviews/main.js`
2. **Find** the `INTERVIEWS` array (around line 6)
3. **Add** your interview, alphabetical by last name:
   ```javascript
   const INTERVIEWS = [
       // ... existing interviews ...
       { 
           name: 'NEW INTERVIEWEE', 
           file: 'new-interview', 
           pullQuote: "A compelling quote from the interview." 
       }
   ];
   ```

## 🎨 Managing Styling

### CSS Architecture (`interview-series.css`)

The styling system uses **BEM methodology** and **CSS custom properties**:

```css
/* CSS Custom Properties */
:root {
  --interview-bg-primary: #EFEEEB;
  --interview-text-primary: #121212;
  --font-primary: 'NeueHaasGrotesk', sans-serif;
  /* ... more variables */
}

/* BEM Class Structure */
.interview-landing__hero-title { }
.interview-page__profile-image { }
.interview-landing__quote-card { }
```

### Key Styling Areas

| Component | CSS Classes | Purpose |
|-----------|-------------|---------|
| **Hero Section** | `.interview-landing__hero-*` | Landing page hero area |
| **Interviewees Grid** | `.interview-landing__interviewees-*` | Dynamic grid system |
| **Quote Cards** | `.interview-landing__quote-*` | Pull quote display |
| **Profile Section** | `.interview-page__profile-*` | Individual interview page hero area |
| **Navigation** | `.interview-page__nav-*` | Previous/next arrows |
| **Mobile Dropdown** | `.interview-landing__mobile-dropdown-*` | Mobile navigation |

### Responsive Breakpoints

- **Desktop**: `> 1024px` - Full grid layout
- **Tablet**: `≤ 1024px` - 2-column grid
- **Mobile**: `≤ 768px` - Dropdown navigation
- **Small Mobile**: `≤ 480px` - Single column
- **Extra Small**: `≤ 360px` - Compact layout

## 🔧 JavaScript Management

### Core Functions

| Function | Purpose | Location |
|----------|---------|----------|
| `initInterviewSeries()` | Main initialization | Line 36 |
| `loadInterviewees()` | Generate interviewees grid | Line 255 |
| `loadQuoteCards()` | Generate quote cards | Line 370 |
| `loadInterviewSidebar()` | Generate sidebar navigation | Line 526 |
| `setupCyclingNavigation()` | Previous/next arrows | Line 654 |
| `handleResize()` | Responsive behavior | Line 216 |

### Data Management

**Centralized Interview Data** (Line 6-21):
```javascript
const INTERVIEWS = [
    { 
        name: 'INTERVIEWEE NAME', 
        file: 'interview-slug', 
        pullQuote: "Compelling quote..." 
    }
];
```

### Swup Integration

The system uses **Swup.js** for smooth page transitions:

- **`content:replace`**: Triggers on page navigation
- **`page:view`**: Handles sidebar updates
- **Automatic initialization**: Runs on page load

## 📱 Responsive Behavior

### Desktop (> 1024px)
- **3-column interviewees grid**
- **Sidebar navigation**
- **Full quote cards display**

### Tablet (≤ 1024px)
- **2-column interviewees grid**
- **Compressed sidebar**
- **Adjusted quote cards**

### Mobile (≤ 768px)
- **Dropdown navigation** for interviewees
- **Collapsible sidebar** for interview pages
- **Single-column quote cards**


## 🚀 Deployment

### File Dependencies

1. **Jekyll Layout**: `app/_layouts/interview.html`
2. **CSS File**: `app/assets/css/interview-series.css`
3. **JavaScript**: `generational-data-interviews/main.js`
4. **Assets**: `generational-data-interviews/assets/`

### Build Process

The system integrates with Jekyll's build process:
- **Markdown files** → **HTML pages**
- **Layout template** → **Rendered interviews**
- **JavaScript** → **Dynamic functionality**
- **CSS** → **Visual styling**

## 🔍 Troubleshooting

### Common Issues

1. **Interview not appearing**: Check `INTERVIEWS` array in `main.js`
2. **Headshot not loading**: Verify image path and filename
3. **Mobile dropdown not working**: Check JavaScript console for errors
4. **Styling issues**: Verify CSS file is loaded and classes match
