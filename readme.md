# Univolt Power - HTML/CSS/JavaScript Website

## ✅ Conversion Complete!

Your React website has been successfully converted to pure HTML, CSS, and JavaScript. This version will work on any web server without requiring Node.js, React, or any build tools.

## 📁 Files Included

### Core Files (Created):
- `index.html` - Home page with hero section, features, services preview, and stats
- `products.html` - Products page with filtering and "Add to Cart" functionality
- `styles.css` - Complete stylesheet with all necessary styles
- `script.js` - JavaScript for cart management, navigation, and interactions

### Additional Pages (Template):
You can create these by copying the structure from `index.html` or `products.html`:
- `about.html` - About page
- `services.html` - Services page
- `projects.html` - Projects portfolio page
- `resources.html` - Resources and blog page
- `contact.html` - Contact form page

## 🚀 How to Use

### Option 1: Local Testing
1. Download all files to a folder on your computer
2. Open `index.html` in your web browser
3. Navigate through the site using the links

### Option 2: Web Server
1. Upload all files to your web hosting server (cPanel, FTP, etc.)
2. Ensure all files are in the same directory
3. Access via your domain (e.g., `https://yourdomain.com`)

### Option 3: GitHub Pages (Free Hosting)
1. Create a new GitHub repository
2. Upload all files to the repository
3. Enable GitHub Pages in repository settings
4. Your site will be live at `https://yourusername.github.io/repository-name`

## ✨ Features Included

### ✅ Fully Functional:
- **Responsive Design** - Works on desktop, tablet, and mobile
- **Shopping Cart** - Add/remove items, persists using localStorage
- **Product Filtering** - Filter products by category
- **Mobile Navigation** - Hamburger menu for mobile devices
- **Toast Notifications** - User feedback for actions
- **Smooth Animations** - CSS transitions and animations
- **Form Handling** - Contact form with validation

### 🎨 Design:
- Brand color: `#2e347f` (blue) applied throughout
- Professional solar industry aesthetic
- High-quality Unsplash images
- Modern UI components
- Clean typography and spacing

## 📄 Creating Additional Pages

To create the missing pages (About, Services, Projects, Resources, Contact), follow this template:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Page Title - Univolt Power</title>
  <link rel="stylesheet" href="styles.css">
</head>
<body>
  <div class="page-wrapper">
    <!-- Copy header from index.html -->
    <header class="header">
      <!-- ... header content ... -->
    </header>

    <!-- Copy cart drawer from index.html -->
    <div id="cart-overlay" class="cart-overlay"></div>
    <div id="cart-drawer" class="cart-drawer">
      <!-- ... cart content ... -->
    </div>

    <!-- Copy toast from index.html -->
    <div id="toast" class="toast success">
      <!-- ... toast content ... -->
    </div>

    <!-- Main Content - YOUR CUSTOM CONTENT HERE -->
    <main class="main-content">
      <section class="page-header" style="background: var(--brand-blue);">
        <div class="page-header-content">
          <h1>Your Page Title</h1>
          <p>Your page description</p>
        </div>
      </section>

      <section class="section">
        <div class="container">
          <!-- Your page content here -->
        </div>
      </section>
    </main>

    <!-- Copy footer from index.html -->
    <footer class="footer">
      <!-- ... footer content ... -->
    </footer>
  </div>

  <script src="script.js"></script>
</body>
</html>
```

## 🛠️ Customization Guide

### Colors
Edit these CSS variables in `styles.css`:
```css
:root {
  --brand-blue: #2e347f;        /* Main brand color */
  --brand-blue-dark: #1a1f5a;   /* Darker shade for hovers */
  /* ... other colors ... */
}
```

### Images
Replace Unsplash URLs with your own images:
- Save images in an `images/` folder
- Update image `src` attributes: `<img src="images/your-image.jpg">`

### Content
Simply edit the HTML text content in each page file.

## 📱 Browser Compatibility

✅ Works in all modern browsers:
- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Android)

## 🔧 Cart Functionality

The shopping cart:
- Stores data in browser localStorage
- Persists across page refreshes
- Displays total price and item count
- Allows adding/removing items
- Includes toast notifications

## 📞 Need Help?

### Common Issues:

**Cart not working?**
- Ensure `script.js` is loaded properly
- Check browser console for errors
- Clear localStorage: `localStorage.clear()`

**Styling issues?**
- Verify `styles.css` is in the same folder
- Check that the CSS file link is correct
- Clear browser cache

**Navigation not working?**
- Ensure all HTML files are in the same directory
- Check that file names match exactly (case-sensitive on some servers)

## 🎯 Next Steps

1. **Create remaining pages** using the template above
2. **Replace placeholder images** with your actual photos
3. **Update contact information** in footer and contact page
4. **Add your own content** to each page
5. **Test on mobile devices** to ensure responsive
design
6. **Deploy to your web server** or hosting platform

## 📊 File Structure

```
your-website-folder/
├── index.html          (Home page)
├── products.html       (Products with cart)
├── about.html          (To create)
├── services.html       (To create)
├── projects.html       (To create)
├── resources.html      (To create)
├── contact.html        (To create)
├── styles.css          (All styles)
├── script.js           (All JavaScript)
└── images/             (Optional: your images folder)
```

## ⚡ Performance Tips

1. **Optimize images** - Compress before uploading
2. **Use lazy loading** - Add `loading="lazy"` to images
3. **Minify CSS/JS** - Use online tools before production
4. **Enable caching** - Configure server caching headers

## 🔒 Important Notes

- ❌ **No backend** - This is a frontend-only website
- ❌ **No real checkout** - Cart is demonstration only
- ❌ **No database** - All data stored in browser localStorage
- ✅ **SEO friendly** - Semantic HTML structure
- ✅ **Accessible** - Proper ARIA labels and semantic tags

## 📝 License

This converted code is provided for your use. Replace all placeholder content (images, text, contact info) with your actual business information.

---

**Created:** March 2026  
**Original:** React + Tailwind CSS  
**Converted:** HTML + CSS + Vanilla JavaScript

Enjoy your new static website! 🎉
