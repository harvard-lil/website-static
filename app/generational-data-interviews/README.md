# Generational Data Interviews

This directory contains the interview series for the Library Innovation Lab website.

## Structure

- `index.html` - Landing page for the interview series
- `interviews/` - Folder containing all individual interview pages
  - `example-interview.html` - Sample individual interview page
  - `katie-mackinnon.html` - Katie Mackinnon interview
  - `lori-emerson.html` - Lori Emerson interview
- `main.js` - Main JavaScript file for all interview series functionality
- `assets/` - Images and other assets for interviews
- `README.md` - This file

## Adding a New Interview

### Step 1: Create the Interview HTML File

1. Copy `interviews/example-interview.html` to create a new interview page
2. Name it following the pattern: `[interviewee-name].html`
3. Place it in the `interviews/` folder
4. Update the front matter and content

### Step 2: Update the Template

Replace the following placeholders in your new interview file:

- **Title**: Update the `title` in the front matter
- **Interviewee Name**: Replace "EXAMPLE INTERVIEWEE" with the actual name
- **Image**: Update the image path in the profile section
- **Bio**: Replace the bio text with the interviewee's biographical information
- **Date**: Update the interview date
- **Content**: Replace the Q&A content with the actual interview
- **Navigation**: Update the navigation links

### Step 3: Add to Dynamic List

1. Open `main.js`
2. Add the new interview to the `existingInterviews` array in the `loadInterviewees()` function
3. The interview will automatically appear on the landing page

**Example:**
```javascript
const existingInterviews = [
    { name: 'EXAMPLE INTERVIEW', file: 'interviews/example-interview' },
    { name: 'KATIE MACKINNON', file: 'interviews/katie-mackinnon' }
];
```

### Step 4: Add Profile Image

1. Place the interviewee's profile image in the `assets/` directory
2. Update the image path in the interview HTML file
3. Recommended image size: 400x400px or larger
4. Images will be automatically styled as circular and grayscale

## Example Interview Card

```html
<div class="interview-card">
    <h3>Interviewee Name</h3>
    <div class="date">January 15, 2025</div>
    <div class="bio">Brief biographical description of the interviewee.</div>
    <a href="/generational-data-interviews/interviews/interviewee-name/" class="read-more">Read Interview →</a>
</div>
```

## CSS Styling

The interview series uses a dedicated CSS file (`interview-series.css`) that includes:

- **Landing page styles** - Hero section, about section, interviews grid
- **Individual interview styles** - Profile section, two-column layout, sidebar
- **Responsive design** - Mobile and desktop layouts
- **Consistent typography** - Font sizes, weights, and spacing
- **Interactive elements** - Hover effects and transitions

## Assets

- Place interview images in the `assets/` directory
- Use descriptive filenames (e.g., `interviewee-name.jpg`)
- Recommended image size: 400x400px or larger
- Images will be automatically styled as circular and grayscale

## Notes

- Each interview page is a standalone HTML file
- The landing page uses the site's default layout (header/footer)
- Individual interview pages also use the default layout
- All styling is managed through the external `interview-series.css` file
- The system is designed to be simple and maintainable
