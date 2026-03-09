// Univolt Power - Main JavaScript

// Cart Management
class CartManager {
  constructor() {
    this.cart = JSON.parse(localStorage.getItem('univolt_cart')) || [];
    this.updateCartUI();
  }

  addToCart(product) {
    const existingItem = this.cart.find(item => item.id === product.id);
    
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      this.cart.push({ ...product, quantity: 1 });
    }
    
    this.saveCart();
    this.updateCartUI();
    this.openCart();
    this.showToast(`${product.name} added to cart!`);
  }

  removeFromCart(productId) {
    this.cart = this.cart.filter(item => item.id !== productId);
    this.saveCart();
    this.updateCartUI();
  }

  clearCart() {
    this.cart = [];
    this.saveCart();
    this.updateCartUI();
  }

  saveCart() {
    localStorage.setItem('univolt_cart', JSON.stringify(this.cart));
  }

  getCartCount() {
    return this.cart.reduce((count, item) => count + item.quantity, 0);
  }

  getCartTotal() {
    return this.cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  }

  updateCartUI() {
    const cartCount = this.getCartCount();
    const cartTotal = this.getCartTotal();
    
    // Update cart count badge
    const cartCountElement = document.getElementById('cart-count');
    if (cartCountElement) {
      if (cartCount > 0) {
        cartCountElement.textContent = cartCount;
        cartCountElement.style.display = 'block';
      } else {
        cartCountElement.style.display = 'none';
      }
    }
    
    // Update cart items display
    const cartItemsContainer = document.getElementById('cart-items');
    const cartEmptyMessage = document.getElementById('cart-empty');
    
    if (cartItemsContainer) {
      if (this.cart.length === 0) {
        cartItemsContainer.style.display = 'none';
        if (cartEmptyMessage) cartEmptyMessage.style.display = 'block';
      } else {
        cartItemsContainer.style.display = 'block';
        if (cartEmptyMessage) cartEmptyMessage.style.display = 'none';
        
        cartItemsContainer.innerHTML = this.cart.map(item => `
          <div class="cart-item">
            <div class="cart-item-image">
              <img src="${item.image}" alt="${item.name}">
            </div>
            <div class="cart-item-details">
              <div class="cart-item-name">${item.name}</div>
              <div class="cart-item-qty">Qty: ${item.quantity}</div>
              <div class="cart-item-price">$${(item.price * item.quantity).toFixed(2)}</div>
            </div>
            <button class="cart-remove" onclick="cart.removeFromCart(${item.id})">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polyline points="3 6 5 6 21 6"></polyline>
                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
              </svg>
            </button>
          </div>
        `).join('');
      }
    }
    
    // Update cart total
    const cartTotalElement = document.getElementById('cart-total');
    if (cartTotalElement) {
      cartTotalElement.textContent = `$${cartTotal.toFixed(2)}`;
    }
    
    // Update checkout button state
    const checkoutBtn = document.getElementById('checkout-btn');
    if (checkoutBtn) {
      checkoutBtn.disabled = this.cart.length === 0;
    }
  }

  openCart() {
    const cartOverlay = document.getElementById('cart-overlay');
    const cartDrawer = document.getElementById('cart-drawer');
    
    if (cartOverlay && cartDrawer) {
      cartOverlay.classList.add('active');
      cartDrawer.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
  }

  closeCart() {
    const cartOverlay = document.getElementById('cart-overlay');
    const cartDrawer = document.getElementById('cart-drawer');
    
    if (cartOverlay && cartDrawer) {
      cartOverlay.classList.remove('active');
      cartDrawer.classList.remove('active');
      document.body.style.overflow = '';
    }
  }

  showToast(message) {
    const toast = document.getElementById('toast');
    const toastMessage = document.getElementById('toast-message');
    
    if (toast && toastMessage) {
      toastMessage.textContent = message;
      toast.classList.add('show');
      
      setTimeout(() => {
        toast.classList.remove('show');
      }, 3000);
    }
  }
}

// Mobile Menu Toggle
function toggleMobileMenu() {
  const mobileMenu = document.getElementById('mobile-menu');
  if (mobileMenu) {
    mobileMenu.classList.toggle('active');
  }
}

// Initialize cart
const cart = new CartManager();

// Set active nav link
function setActiveNav() {
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  const navLinks = document.querySelectorAll('.nav-link');
  
  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
}

// Product filtering
function filterProducts(category) {
  const products = document.querySelectorAll('.product-card');
  const filterButtons = document.querySelectorAll('.filter-btn');
  
  // Update active filter button
  filterButtons.forEach(btn => {
    if (btn.dataset.category === category) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }
  });
  
  // Filter products
  products.forEach(product => {
    if (category === 'All' || product.dataset.category === category) {
      product.style.display = 'block';
    } else {
      product.style.display = 'none';
    }
  });
}

// Project filtering
function filterProjects(category) {
  const projects = document.querySelectorAll('.project-card');
  const filterButtons = document.querySelectorAll('.filter-btn');
  
  // Update active filter button
  filterButtons.forEach(btn => {
    if (btn.dataset.category === category) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }
  });
  
  // Filter projects
  projects.forEach(project => {
    if (category === 'All' || project.dataset.category === category) {
      project.style.display = 'block';
    } else {
      project.style.display = 'none';
    }
  });
}

// Contact form submission
function handleContactSubmit(event) {
  event.preventDefault();
  
  const form = event.target;
  const formData = new FormData(form);
  const data = Object.fromEntries(formData.entries());
  
  // Create email body
  const emailBody = `
NEW CONTACT MESSAGE - Univolt Power

From: ${data.name}
Email: ${data.email}
Phone: ${data.phone || 'Not provided'}
Project Type: ${data.type}

Message:
${data.message}

---
Submitted: ${new Date().toLocaleString()}
  `.trim();
  
  // Create mailto link
  const subject = encodeURIComponent(`Contact Form - ${data.type} - ${data.name}`);
  const body = encodeURIComponent(emailBody);
  const mailtoLink = `mailto:univoltpower@gmail.com?subject=${subject}&body=${body}`;
  
  // Open email client
  window.location.href = mailtoLink;
  
  cart.showToast("Message prepared! Your email client will open.");
  form.reset();
}

// Quote form submission
function handleQuoteSubmit(event) {
  event.preventDefault();
  
  const formData = new FormData(event.target);
  const data = Object.fromEntries(formData.entries());
  
  // Create email body
  const emailBody = `
NEW QUOTE REQUEST - Univolt Power

CLIENT INFORMATION:
Name/Company: ${data.fullName}
Email: ${data.email}
Phone: ${data.phone}
Location: ${data.location || 'Not provided'}

SOLUTION/PRODUCT NEEDED:
Type: ${data.solutionType}
System Size: ${data.systemSize || 'Not specified'}
Budget Range: ${data.budget || 'Not specified'}
Timeline: ${data.timeline || 'Not specified'}

PROJECT DETAILS:
${data.description}

Current Monthly Bill: ${data.monthlyBill || 'Not provided'}

---
Submitted: ${new Date().toLocaleString()}
  `.trim();
  
  // Create mailto link
  const subject = encodeURIComponent(`Quote Request - ${data.solutionType} - ${data.fullName}`);
  const body = encodeURIComponent(emailBody);
  const mailtoLink = `mailto:univoltpower@gmail.com?subject=${subject}&body=${body}`;
  
  // Open email client
  window.location.href = mailtoLink;
  
  cart.showToast('Quote request prepared! Your email client will open.');
  
  setTimeout(() => {
    event.target.reset();
  }, 2000);
}

// Checkout handler
function handleCheckout() {
  if (cart.cart.length === 0) {
    cart.showToast('Your cart is empty!');
    return;
  }
  
  cart.showToast('Checkout functionality would be implemented here.');
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
  setActiveNav();
  
  // Close mobile menu when clicking outside
  document.addEventListener('click', (e) => {
    const mobileMenu = document.getElementById('mobile-menu');
    const menuBtn = document.getElementById('mobile-menu-btn');
    
    if (mobileMenu && menuBtn && !mobileMenu.contains(e.target) && !menuBtn.contains(e.target)) {
      mobileMenu.classList.remove('active');
    }
  });
  
  // Close cart when clicking overlay
  const cartOverlay = document.getElementById('cart-overlay');
  if (cartOverlay) {
    cartOverlay.addEventListener('click', () => cart.closeCart());
  }
});