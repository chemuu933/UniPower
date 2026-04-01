

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

/**
 * Product Detail Page JavaScript
 * Handles product rendering and dynamic content loading
 */

// Product database - mirrors the products from products.html
const productsData = [
  {
    id: 1,
    name: '600W Jinko Monocrystalline Panel',
    category: 'Solar Panels',
    price: 249900.00,
    image: 'image/image1.png',
    stock: 'In Stock',
    description: 'High-efficiency 600W monocrystalline solar panel from Jinko Solar. Features advanced PERC technology for maximum power output and excellent performance in low-light conditions. Perfect for residential and commercial installations.',
    specs: {
      'Power Output': '600W',
      'Efficiency': '21.5%',
      'Dimensions': '2172 x 1303 x 35mm',
      'Weight': '28.5 kg',
      'Warranty': '25 years',
      'Cell Type': 'Monocrystalline PERC'
    },
    features: [
      'Industry-leading efficiency rating',
      'Excellent low-light performance',
      'Salt mist and ammonia resistance',
      'PID resistant technology',
      'Certified for harsh weather conditions'
    ]
  },
  {
    id: 2,
    name: 'Dyness  Battery',
    category: 'Batteries',
    price: 140000.00,
    image: 'image/Image3.png',
    stock: 'In Stock',
    description: 'High-capacity 5kWh lithium battery with advanced battery management system. Perfect for residential energy storage with long cycle life and reliable performance.',
    specs: {
      'Capacity': '5kWh',
      'Voltage': '48V',
      'Cell Chemistry': 'LiFePO4',
      'Cycles': '6000+',
      'Efficiency': '95%',
      'Warranty': '10 years'
    },
    features: [
      'Long cycle life',
      'Advanced BMS protection',
      'Scalable modular design',
      'High temperature tolerance',
      'Maintenance-free operation'
    ]
  },
  {
    id: 3,
    name: 'Solis 8KW Hybrid Inverter',
    category: 'Inverters',
    price: 129900.00,
    image: 'image/Image4.png',
    stock: 'In Stock',
    description: 'High-performance 8KW hybrid inverter from Solis. Supports both grid-tied and off-grid operation with seamless switching and advanced monitoring capabilities.',
    specs: {
      'Rated Power': '8kW',
      'Max PV Input': '10kW',
      'Efficiency': '97.8%',
      'MPPT Trackers': '2',
      'Battery Voltage': '48V',
      'Warranty': '5 years'
    },
    features: [
      'Hybrid grid/off-grid operation',
      'Dual MPPT inputs',
      'Smart monitoring app',
      'Generator input support',
      'IP65 protection rating'
    ]
  },
  {
    id: 4,
    name: 'EV Charger Station',
    category: 'Accessories',
    price: 599.00,
    image: 'https://images.unsplash.com/photo-1760246964044-1384f71665b9?w=200',
    stock: 'In Stock',
    description: 'Smart EV charging station for home and commercial use. Compatible with all major EV brands with fast charging capabilities and smart load management.',
    specs: {
      'Power Output': '22kW',
      'Voltage': '400V AC',
      'Connector': 'Type 2',
      'Cable Length': '5 meters',
      'Protection': 'IP54',
      'Warranty': '2 years'
    },
    features: [
      'Smart load balancing',
      'RFID access control',
      'Mobile app control',
      'Overcurrent protection',
      'Weather resistant'
    ]
  },
  {
    id: 5,
    name: '615W JA Monocrystalline Panel',
    category: 'Solar Panels',
    price: 299900.00,
    image: 'image/image2.png',
    stock: 'In Stock',
    description: 'Premium 615W monocrystalline solar panel from JA Solar. High-efficiency cells with excellent temperature coefficient for maximum energy yield.',
    specs: {
      'Power Output': '615W',
      'Efficiency': '21.8%',
      'Dimensions': '2172 x 1303 x 35mm',
      'Weight': '28.0 kg',
      'Warranty': '25 years',
      'Cell Type': 'Monocrystalline'
    },
    features: [
      'High power output',
      'Low degradation rate',
      'Excellent weak light performance',
      'PID resistant',
      'Mechanical load resistant'
    ]
  },
  {
    id: 6,
    name: 'JA Solar 565 Watts Monocrystalline Solar Panel | Bifacial',
    category: 'Solar Panels',
    price: 50439.00,
    image: 'image/image5.png',
    stock: 'In Stock',
    description: 'Bifacial solar panel with 565W power output. Generates power from both front and rear sides, increasing overall energy yield by up to 25%.',
    specs: {
      'Front Power': '565W',
      'Rear Power Gain': 'Up to 25%',
      'Efficiency': '21.0%',
      'Dimensions': '2278 x 1134 x 35mm',
      'Weight': '28.5 kg',
      'Warranty': '25 years'
    },
    features: [
      'Bifacial technology',
      'Double-sided power generation',
      'Lower LCOE',
      'High reliability',
      'Salt mist resistant'
    ]
  },
  {
    id: 7,
    name: 'Smart Monitoring Hub',
    category: 'Accessories',
    price: 349.50,
    image: 'https://images.unsplash.com/photo-1635424709961-f3a150459ad4?w=200',
    stock: 'In Stock',
    description: 'Comprehensive solar monitoring system that tracks energy production, consumption, and battery status in real-time. Easy installation with WiFi connectivity.',
    specs: {
      'Connectivity': 'WiFi/Ethernet',
      'Display': '7-inch touchscreen',
      'Compatibility': 'All major inverters',
      'Data Storage': 'Cloud based',
      'Power Supply': '5V DC',
      'Warranty': '2 years'
    },
    features: [
      'Real-time monitoring',
      'Mobile app integration',
      'Historical data analysis',
      'Alert notifications',
      'Easy DIY installation'
    ]
  },
  {
    id: 8,
    name: 'JA 700 WATTS bifacial N-type double glass solar panels JAM66D46-700/LB',
    category: 'Solar Panels',
    price: 19500.00,
    image: 'image/image7.png',
    stock: 'In Stock',
    description: 'High-performance 700W bifacial N-type solar panel with double glass construction. Advanced technology delivers exceptional efficiency and durability.',
    specs: {
      'Power Output': '700W',
      'Cell Type': 'N-type bifacial',
      'Efficiency': '22.5%',
      'Glass': 'Dual 2.0mm tempered',
      'Weight': '32 kg',
      'Warranty': '30 years'
    },
    features: [
      'N-type cell technology',
      'Zero LID/PID',
      'Lower temperature coefficient',
      'Double glass durability',
      'Higher bifacial gain'
    ]
  },
  {
    id: 9,
    name: 'JINKO 585 WATTS bifacial solar panels JKM585M-72HL4-V',
    category: 'Solar Panels',
    price: 16380.00,
    image: 'image/image6.png',
    stock: 'In Stock',
    description: 'Tiger Pro series bifacial solar panel with 585W output. Advanced multi-busbar technology for improved efficiency and reliability.',
    specs: {
      'Power Output': '585W',
      'Cell Type': 'Monocrystalline',
      'Efficiency': '21.4%',
      'Dimensions': '2172 x 1303 x 35mm',
      'Weight': '28.5 kg',
      'Warranty': '25 years'
    },
    features: [
      'Multi-busbar technology',
      'Bifacial power gain',
      'Half-cell design',
      'Lower hot spot risk',
      'Enhanced reliability'
    ]
  },
  {
    id: 10,
    name: 'Trina Solar 705 Watts Monocrystalline Solar Panel | Bifacial',
    category: 'Solar Panels',
    price: 19740.00,
    image: 'image/image8.png',
    stock: 'In Stock',
    description: 'Vertex series 705W bifacial solar panel with advanced cell technology. Superior power output and efficiency for large-scale installations.',
    specs: {
      'Power Output': '705W',
      'Efficiency': '22.0%',
      'Dimensions': '2384 x 1303 x 35mm',
      'Weight': '32 kg',
      'Cell Type': 'Monocrystalline',
      'Warranty': '25 years'
    },
    features: [
      'High power density',
      'Bifacial technology',
      'Low BOS cost',
      'Excellent reliability',
      'Multi-busbar design'
    ]
  },
  {
    id: 11,
    name: 'Dayliff 200W monocrystalline Solar panels',
    category: 'Solar Panels',
    price: 12000.00,
    image: 'image/image9.png',
    stock: 'In Stock',
    description: 'Reliable 200W monocrystalline solar panel for small residential and commercial applications. Cost-effective solution with proven performance.',
    specs: {
      'Power Output': '200W',
      'Efficiency': '19.2%',
      'Dimensions': '1580 x 808 x 35mm',
      'Weight': '12 kg',
      'Cell Type': 'Monocrystalline',
      'Warranty': '20 years'
    },
    features: [
      'Cost-effective',
      'Reliable performance',
      'Easy installation',
      'Weather resistant',
      'Good low-light performance'
    ]
  },
  {
    id: 12,
    name: 'Longi Solar 615 Watts Monocrystalline Solar Panel | Bifacial',
    category: 'Solar Panels',
    price: 17220.00,
    image: 'image/image10.png',
    stock: 'In Stock',
    description: 'Hi-MO 6 series bifacial solar panel with 615W power output. High efficiency and low degradation for maximum long-term returns.',
    specs: {
      'Power Output': '615W',
      'Efficiency': '21.6%',
      'Dimensions': '2172 x 1303 x 35mm',
      'Weight': '28.5 kg',
      'Cell Type': 'Monocrystalline',
      'Warranty': '25 years'
    },
    features: [
      'HPBC cell technology',
      'High conversion efficiency',
      'Excellent weak light performance',
      'Low degradation',
      'Bifacial power gain'
    ]
  },
  {
    id: 13,
    name: 'Longi Solar 620 Watts Monocrystalline Solar Panel | Bifacial',
    category: 'Solar Panels',
    price: 17360.00,
    image: 'image/image11.png',
    stock: 'In Stock',
    description: 'Premium 620W bifacial solar panel with advanced cell technology. Maximum power output for utility-scale and commercial installations.',
    specs: {
      'Power Output': '620W',
      'Efficiency': '21.7%',
      'Dimensions': '2172 x 1303 x 35mm',
      'Weight': '28.8 kg',
      'Cell Type': 'Monocrystalline',
      'Warranty': '25 years'
    },
    features: [
      'Ultra-high power',
      'Bifacial technology',
      'Low LCOE',
      'High reliability',
      'Superior temperature coefficient'
    ]
  },
  {
    id: 14,
    name: 'Must 3.2 kVA Hybrid solar inverter 24V|High Frequency offgrid VPM',
    category: 'Inverters',
    price: 43500.00,
    image: 'inverters/in1.png',
    stock: 'In Stock',
    description: 'Compact 3.2kVA hybrid inverter suitable for small off-grid and backup power systems. High-frequency design with pure sine wave output.',
    specs: {
      'Rated Power': '3.2kVA',
      'DC Voltage': '24V',
      'AC Output': '230V',
      'Efficiency': '93%',
      'Waveform': 'Pure sine wave',
      'Warranty': '2 years'
    },
    features: [
      'High frequency design',
      'Compact size',
      'Pure sine wave output',
      'LCD display',
      'Multiple protection features'
    ]
  },
  {
    id: 15,
    name: 'SRNE 5KW 48V hybrid pure sinewave inverter HF series (HF4850S80-145)',
    category: 'Inverters',
    price: 70000.00,
    image: 'inverters/in2.png',
    stock: 'In Stock',
    description: '5KW hybrid inverter with high-frequency technology and pure sine wave output. Ideal for residential solar systems with battery backup.',
    specs: {
      'Rated Power': '5kW',
      'DC Voltage': '48V',
      'AC Output': '230V',
      'Efficiency': '95%',
      'Surge Power': '10kW',
      'Warranty': '2 years'
    },
    features: [
      'High frequency topology',
      'Pure sine wave',
      'Built-in 80A MPPT',
      'LCD + WiFi monitoring',
      'Multiple operation modes'
    ]
  },
  {
    id: 16,
    name: 'SRNE 8KW 48V hybrid pure sinewave inverter HF series (HF4850S80-145)',
    category: 'Inverters',
    price: 205000.00,
    image: 'inverters/in3.png',
    stock: 'In Stock',
    description: 'High-capacity 8KW hybrid inverter for larger residential systems. Supports high PV input and provides reliable backup power.',
    specs: {
      'Rated Power': '8kW',
      'DC Voltage': '48V',
      'Max PV Input': '10kW',
      'Efficiency': '96%',
      'MPPT Current': '80A',
      'Warranty': '2 years'
    },
    features: [
      'High power capacity',
      'Dual MPPT support',
      'WiFi monitoring',
      'Parallel operation capable',
      'Generator compatible'
    ]
  },
  {
    id: 17,
    name: 'Solis - 5kW S6-EO 1-Phase Offgrid inverter',
    category: 'Inverters',
    price: 70000.00,
    image: 'inverters/in4.png',
    stock: 'In Stock',
    description: '5kW off-grid inverter from Solis S6 series. Designed for standalone solar systems without grid connection.',
    specs: {
      'Rated Power': '5kW',
      'AC Voltage': '230V',
      'DC Voltage': '48V',
      'Efficiency': '96%',
      'Frequency': '50/60Hz',
      'Warranty': '5 years'
    },
    features: [
      'True off-grid operation',
      'High efficiency',
      'Built-in charger',
      'LCD display',
      'Multiple protection'
    ]
  },
  {
    id: 18,
    name: 'Solis - 5kW S6-EH 1-Phase LV Hybrid inverter',
    category: 'Inverters',
    price: 140000.00,
    image: 'inverters/in5.png',
    stock: 'In Stock',
    description: '5kW low voltage hybrid inverter with dual MPPT inputs. Supports battery storage and grid export for maximum energy independence.',
    specs: {
      'Rated Power': '5kW',
      'Max PV Input': '8kW',
      'Efficiency': '97.5%',
      'MPPT': 'Dual',
      'Battery Voltage': '48V',
      'Warranty': '5 years'
    },
    features: [
      'Hybrid operation',
      'Dual MPPT inputs',
      'Smart export control',
      'Battery compatible',
      'IP65 rated'
    ]
  },
  {
    id: 19,
    name: 'Solis - 8kW S6-EH 1-Phase LV Hybrid inverter',
    category: 'Inverters',
    price: 200000.00,
    image: 'inverters/in6.png',
    stock: 'In Stock',
    description: '8kW single-phase hybrid inverter for larger residential systems. High efficiency with comprehensive monitoring and protection features.',
    specs: {
      'Rated Power': '8kW',
      'Max PV Input': '12kW',
      'Efficiency': '98%',
      'MPPT': 'Dual',
      'Battery Voltage': '48V',
      'Warranty': '5 years'
    },
    features: [
      'High efficiency',
      'Large PV capacity',
      'Smart energy management',
      'Remote monitoring',
      'Grid support functions'
    ]
  },
  {
    id: 20,
    name: 'Solis - 16kW S6-EH 1-Phase LV Hybrid inverter',
    category: 'Inverters',
    price: 400000.00,
    image: 'inverters/in7.png',
    stock: 'In Stock',
    description: 'High-capacity 16kW single-phase hybrid inverter. Suitable for large homes and small commercial installations with high energy demands.',
    specs: {
      'Rated Power': '16kW',
      'Max PV Input': '24kW',
      'Efficiency': '98%',
      'MPPT': 'Dual',
      'Battery Voltage': '48V',
      'Warranty': '5 years'
    },
    features: [
      'Very high power',
      'Large scale compatible',
      'Advanced BMS support',
      'Export limiting',
      'Parallel capable'
    ]
  },
  {
    id: 21,
    name: 'Solis - 15kW S6-EH 3-Phase LV Hybrid inverter',
    category: 'Inverters',
    price: 360000.00,
    image: 'inverters/in10.png',
    stock: 'In Stock',
    description: '15kW three-phase hybrid inverter for commercial and industrial applications. Balanced power distribution across all phases.',
    specs: {
      'Rated Power': '15kW',
      'AC Output': '3-phase 400V',
      'Max PV Input': '22.5kW',
      'Efficiency': '98%',
      'Battery Voltage': '48V',
      'Warranty': '5 years'
    },
    features: [
      'Three-phase output',
      'Commercial grade',
      'Phase balancing',
      'High PV capacity',
      'SCADA compatible'
    ]
  },
  {
    id: 22,
    name: 'Deye 3.6kW | 48V Single phase Hybrid Ongrid Solar inverter | Dual MPP',
    category: 'Inverters',
    price: 106000.00,
    image: 'inverters/in9.png',
    stock: 'In Stock',
    description: '3.6kW single-phase hybrid inverter with dual MPPT inputs. Compact design with high efficiency for residential solar systems.',
    specs: {
      'Rated Power': '3.6kW',
      'DC Voltage': '48V',
      'Efficiency': '97%',
      'MPPT': 'Dual',
      'Battery Support': '48V LiFePO4',
      'Warranty': '5 years'
    },
    features: [
      'Dual MPPT',
      'Compact design',
      'High efficiency',
      'Smart monitoring',
      'Battery ready'
    ]
  },
  {
    id: 23,
    name: 'Deye - 8kW 1-Phase LV Hybrid Inverter',
    category: 'Inverters',
    price: 208000.00,
    image: 'inverters/in10.png',
    stock: 'In Stock',
    description: '8kW single-phase hybrid inverter with advanced features. Supports high battery charging currents and parallel operation.',
    specs: {
      'Rated Power': '8kW',
      'Max PV Input': '12kW',
      'Efficiency': '97.5%',
      'Charge Current': '190A',
      'Parallel': 'Up to 6 units',
      'Warranty': '5 years'
    },
    features: [
      'High charge current',
      'Parallel capable',
      'Generator input',
      'Smart load control',
      'EPS function'
    ]
  },
  {
    id: 24,
    name: 'Deye - 16kW 1-Phase LV Hybrid Inverter',
    category: 'Inverters',
    price: 388000.00,
    image: 'inverters/in11.png',
    stock: 'In Stock',
    description: '16kW single-phase hybrid inverter with maximum power point tracking. Designed for high-demand residential and light commercial use.',
    specs: {
      'Rated Power': '16kW',
      'Max PV Input': '24kW',
      'Efficiency': '97.6%',
      'MPPT Voltage': '90-520V',
      'Battery Voltage': '48V',
      'Warranty': '5 years'
    },
    features: [
      'Very high capacity',
      'Wide MPPT range',
      'Flexible battery',
      'Grid support',
      'Advanced monitoring'
    ]
  },
  {
    id: 25,
    name: 'Deye - 5kW 1-Phase LV Hybrid Inverter',
    category: 'Inverters',
    price: 140000.00,
    image: 'inverters/in13.png',
    stock: 'In Stock',
    description: '5kW single-phase hybrid inverter with comprehensive protection features. Reliable solution for residential energy storage.',
    specs: {
      'Rated Power': '5kW',
      'Max PV Input': '8kW',
      'Efficiency': '97%',
      'Surge Power': '10kW',
      'Battery Voltage': '48V',
      'Warranty': '5 years'
    },
    features: [
      'Reliable operation',
      'Comprehensive protection',
      'Smart cooling',
      'LCD display',
      'Remote monitoring'
    ]
  },
  {
    id: 26,
    name: 'Deye - 20kW 3-Phase LV Hybrid Inverter',
    category: 'Inverters',
    price: 289900.00,
    image: 'inverters/in12.png',
    stock: 'In Stock',
    description: '20kW three-phase hybrid inverter for commercial installations. High efficiency with advanced grid support capabilities.',
    specs: {
      'Rated Power': '20kW',
      'AC Output': '3-phase 400V',
      'Max PV Input': '30kW',
      'Efficiency': '98%',
      'Battery Voltage': '48V',
      'Warranty': '5 years'
    },
    features: [
      'Commercial grade',
      'Three-phase balance',
      'High efficiency',
      'VPP ready',
      'Export control'
    ]
  },
  {
    id: 27,
    name: 'Deye - LV 5kWh, 48V',
    category: 'Batteries',
    price: 140000.00,
    image: 'inverters/Batteries/b1.png',
    stock: 'In Stock',
    description: '5kWh lithium battery module with 48V nominal voltage. Compatible with Deye inverters for reliable energy storage.',
    specs: {
      'Capacity': '5kWh',
      'Voltage': '48V',
      'Chemistry': 'LiFePO4',
      'Cycles': '6000+',
      'DOD': '90%',
      'Warranty': '10 years'
    },
    features: [
      'Long cycle life',
      'High DOD',
      'Modular design',
      'BMS included',
      'Safe chemistry'
    ]
  },
  {
    id: 28,
    name: 'Deye - LV 16kWh',
    category: 'Batteries',
    price: 320000.00,
    image: 'inverters/Batteries/b2.png',
    stock: 'In Stock',
    description: 'Large capacity 16kWh lithium battery system. Perfect for homes with high energy consumption or backup requirements.',
    specs: {
      'Capacity': '16kWh',
      'Voltage': '48V',
      'Chemistry': 'LiFePO4',
      'Cycles': '6000+',
      'DOD': '90%',
      'Warranty': '10 years'
    },
    features: [
      'Very high capacity',
      'Scalable design',
      '10+ year lifespan',
      'Maintenance-free',
      'Compatible with Deye'
    ]
  },
  {
    id: 29,
    name: 'Dyness/Maqbul - LV DL 5.0C 5.12kWh 100Ah',
    category: 'Batteries',
    price: 130000.00,
    image: 'inverters/Batteries/b3.png',
    stock: 'In Stock',
    description: '5.12kWh lithium battery with 100Ah capacity. Wall-mount design with easy installation and reliable performance.',
    specs: {
      'Capacity': '5.12kWh',
      'Voltage': '51.2V',
      'Current': '100Ah',
      'Chemistry': 'LiFePO4',
      'Weight': '52 kg',
      'Warranty': '10 years'
    },
    features: [
      'Wall mountable',
      'Easy installation',
      'LCD display',
      'Multiple protections',
      'High discharge rate'
    ]
  },
  {
    id: 30,
    name: 'Dyness/Maqbul - LV PowerBrick 14.3kWh 288Ah',
    category: 'Batteries',
    price: 280000.00,
    image: 'inverters/Batteries/b4.png',
    stock: 'In Stock',
    description: 'High-capacity 14.3kWh PowerBrick battery. Floor-standing design with massive storage for whole-home backup.',
    specs: {
      'Capacity': '14.3kWh',
      'Voltage': '51.2V',
      'Current': '288Ah',
      'Chemistry': 'LiFePO4',
      'Weight': '135 kg',
      'Warranty': '10 years'
    },
    features: [
      'Massive capacity',
      'Floor standing',
      'Built-in BMS',
      'Parallel capable',
      'Premium quality'
    ]
  }
];

/**
 * Get URL parameter by name
 * @param {string} name - Parameter name
 * @returns {string|null} - Parameter value or null
 */
function getUrlParam(name) {
  const params = new URLSearchParams(window.location.search);
  return params.get(name);
}

/**
 * Get product by ID
 * @param {number} id - Product ID
 * @returns {Object|undefined} - Product object or undefined
 */
function getProductById(id) {
  return productsData.find(p => p.id === id);
}

/**
 * Get related products based on category (excluding current product)
 * @param {Object} currentProduct - Current product object
 * @param {number} limit - Maximum number of related products to return
 * @returns {Array} - Array of related product objects
 */
function getRelatedProducts(currentProduct, limit = 4) {
  return productsData
    .filter(p => p.category === currentProduct.category && p.id !== currentProduct.id)
    .slice(0, limit);
}

/**
 * Format price with Ksh currency
 * @param {number} price - Price value
 * @returns {string} - Formatted price
 */
function formatPrice(price) {
  return 'Ksh ' + price.toLocaleString('en-KE', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });
}

/**
 * Render product specifications HTML
 * @param {Object} specs - Product specifications object
 * @returns {string} - HTML string
 */
function renderSpecs(specs) {
  return Object.entries(specs).map(([key, value]) => `
    <div class="pd-spec">
      <span class="pd-spec-label">${key}</span>
      <span class="pd-spec-value">${value}</span>
    </div>
  `).join('');
}

/**
 * Render features list HTML
 * @param {Array} features - Array of feature strings
 * @returns {string} - HTML string
 */
function renderFeatures(features) {
  return features.map(feature => `
    <li>
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <polyline points="20 6 9 17 4 12"/>
      </svg>
      ${feature}
    </li>
  `).join('');
}

/**
 * Render related products grid
 * @param {Array} relatedProducts - Array of related product objects
 * @returns {string} - HTML string
 */
function renderRelatedProducts(relatedProducts) {
  if (relatedProducts.length === 0) return '';
  
  return `
    <div class="pd-related-section">
      <h3 class="pd-related-title">Related Products</h3>
      <div class="pd-related-grid">
        ${relatedProducts.map(relatedProduct => `
          <div class="pd-related-card">
            <div class="pd-related-image">
              <img src="${relatedProduct.image}" alt="${relatedProduct.name}" loading="lazy">
              <span class="pd-related-category">${relatedProduct.category}</span>
            </div>
            <div class="pd-related-info">
              <h4 class="pd-related-name">${relatedProduct.name}</h4>
              <div class="pd-related-price">${formatPrice(relatedProduct.price)}</div>
              <div class="pd-related-stock ${relatedProduct.stock.toLowerCase().includes('in') ? 'in-stock' : 'out-of-stock'}">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                  <polyline points="22 4 12 14.01 9 11.01"/>
                </svg>
                ${relatedProduct.stock}
              </div>
              <a href="productdetail.html?id=${relatedProduct.id}" class="pd-related-link">View Details</a>
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  `;
}

/**
 * Handle datasheet download
 * @param {number} productId - Product ID
 */
function handleDatasheetDownload(productId) {
  const product = getProductById(productId);
  if (!product) return;
  
  // Create a simple text-based datasheet
  const datasheetContent = `
PRODUCT DATASHEET - Univolt Power
=====================================

Product: ${product.name}
Category: ${product.category}
Price: ${formatPrice(product.price)}
Stock Status: ${product.stock}

DESCRIPTION:
${product.description}

SPECIFICATIONS:
${Object.entries(product.specs).map(([key, value]) => `${key}: ${value}`).join('\n')}

KEY FEATURES:
${product.features.map((feature, index) => `${index + 1}. ${feature}`).join('\n')}

For more information, contact:
Univolt Power
Email: univoltpower@gmail.com
Phone: 0708345963
Website: www.univoltpower.com

Generated: ${new Date().toLocaleString()}
  `.trim();
  
  // Create and download the file
  const blob = new Blob([datasheetContent], { type: 'text/plain' });
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${product.name.replace(/[^a-z0-9]/gi, '_').toLowerCase()}_datasheet.txt`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  window.URL.revokeObjectURL(url);
  
  cart.showToast('Datasheet downloaded successfully!');
}

/**
 * Handle add to cart button click
 * @param {number} productId - Product ID
 */
function handleAddToCart(productId) {
  const quantityInput = document.getElementById('pd-quantity');
  const quantity = parseInt(quantityInput.value) || 1;
  
  const product = getProductById(productId);
  if (!product) return;
  
  // Add to cart multiple times based on quantity
  for (let i = 0; i < quantity; i++) {
    cart.addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image
    });
  }
}

/**
 * Update quantity input value
 * @param {number} change - Amount to change (+1 or -1)
 */
function updateQuantity(change) {
  const input = document.getElementById('pd-quantity');
  const newValue = parseInt(input.value) + change;
  if (newValue >= 1 && newValue <= 10) {
    input.value = newValue;
  }
}

/**
 * Render product detail page
 */
function renderProductDetail() {
  const productId = parseInt(getUrlParam('id'));
  const container = document.getElementById('product-page');
  
  if (!container) return;
  
  // Product not found or no ID provided
  if (!productId || !getProductById(productId)) {
    container.innerHTML = `
      <div class="product-detail">
        <div class="pd-not-found">
          <h2>Product Not Found</h2>
          <p>Sorry, we couldn't find the product you're looking for.</p>
          <a href="products.html" class="pd-back-link">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <line x1="19" y1="12" x2="5" y2="12"/>
              <polyline points="12 19 5 12 12 5"/>
            </svg>
            Back to Products
          </a>
        </div>
      </div>
    `;
    return;
  }
  
  const product = getProductById(productId);
  const relatedProducts = getRelatedProducts(product);
  
  container.innerHTML = `
    <div class="product-detail">
      <!-- Breadcrumb -->
      <nav class="pd-breadcrumb">
        <a href="index.html">Home</a>
        <span class="pd-breadcrumb-separator">/</span>
        <a href="products.html">Products</a>
        <span class="pd-breadcrumb-separator">/</span>
        <span class="pd-breadcrumb-current">${product.name}</span>
      </nav>

      <!-- Product Grid -->
      <div class="pd-grid">
        <!-- Image Section -->
        <div class="pd-image-section">
          <div class="pd-image-main">
            <img src="${product.image}" alt="${product.name}" loading="eager">
            <span class="pd-category-badge">${product.category}</span>
          </div>
        </div>

        <!-- Info Section -->
        <div class="pd-info">
          <div class="pd-header">
            <h1 class="pd-title">${product.name}</h1>
            <div class="pd-price-section">
              <span class="pd-price">${formatPrice(product.price)}</span>
              <span class="pd-stock ${product.stock.toLowerCase().includes('in') ? 'in-stock' : 'out-of-stock'}">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                  <polyline points="22 4 12 14.01 9 11.01"/>
                </svg>
                ${product.stock}
              </span>
            </div>
          </div>

          <div class="pd-description">
            <p>${product.description}</p>
          </div>

          <div class="pd-specs">
            <h3 class="pd-specs-title">Specifications</h3>
            <div class="pd-specs-grid">
              ${renderSpecs(product.specs)}
            </div>
          </div>

          <div class="pd-features">
            <h3 class="pd-features-title">Key Features</h3>
            <ul class="pd-features-list">
              ${renderFeatures(product.features)}
            </ul>
          </div>

          <div class="pd-actions">
            <div class="pd-quantity">
              <span class="pd-quantity-label">Quantity:</span>
              <div class="pd-quantity-controls">
                <button class="pd-qty-btn" onclick="updateQuantity(-1)">−</button>
                <input type="number" id="pd-quantity" class="pd-qty-input" value="1" min="1" max="10" readonly>
                <button class="pd-qty-btn" onclick="updateQuantity(1)">+</button>
              </div>
            </div>
            <button class="pd-add-to-cart" onclick="handleAddToCart(${product.id})">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="9" cy="21" r="1"/>
                <circle cx="20" cy="21" r="1"/>
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
              </svg>
              Add to Cart
            </button>
            <button class="pd-datasheet-btn" onclick="handleDatasheetDownload(${product.id})">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                <polyline points="7 10 12 15 17 10"/>
                <line x1="12" y1="15" x2="12" y2="3"/>
              </svg>
              Download Datasheet
            </button>
          </div>
        </div>
      </div>
      
      <!-- Related Products Section -->
      ${renderRelatedProducts(relatedProducts)}
    </div>
  `;
}

// Initialize product detail page when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  renderProductDetail();
});