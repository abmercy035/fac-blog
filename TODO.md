# FAC - Todo List

## Features to Implement

### 🎨 Quote Sharing Feature (Priority: High)
**Advanced version: Highlight text → generate beautiful quote image with FAC branding → share/download**

**Description:**
Implement a feature that allows users to highlight text in blog posts and generate shareable quote images with FAC branding.

**Requirements:**
- Detect text selection/highlighting on blog post pages
- Show a popup/tooltip with share options when text is selected
- Generate a beautiful quote image with:
  - The highlighted quote text
  - FAC branding (logo, colors from theme)
  - Attribution to the article and author
  - Vintage aesthetic matching the site theme (cream/beige background, Playfair Display font)
- Options to:
  - Download the image
  - Share directly to Twitter/Instagram/Facebook
  - Copy image to clipboard

**Technical Approach:**
- Use `html-to-image` or `dom-to-image` library
- Canvas API for custom rendering
- Apply theme colors: #F9F5F0, #F2EAD3, #F4991A, #344F1F
- Use Playfair Display font for quotes
- Add subtle textures/borders for vintage feel

**Benefits:**
- Increases social media engagement
- Drives traffic back to the blog
- Enhances user experience
- Creates beautiful, shareable content

---

## Future Enhancements
- [ ] Dark mode support
- [ ] Newsletter integration
- [ ] Reading time estimates
- [ ] Related posts recommendations
- [ ] Comment system
- [ ] Search functionality improvements
- [ ] Author profile pages
- [ ] Category archive pages
