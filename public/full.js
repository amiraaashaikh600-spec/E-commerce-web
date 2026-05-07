
//         // ================= PRODUCTS =================
// let selectedProduct = null;

// // ================= SLIDER =================
// document.addEventListener("DOMContentLoaded", () => {

//   const slider = document.querySelector(".food-slider");
//   const cards = document.querySelectorAll(".food-card");
//   const next = document.querySelector(".next");
//   const prev = document.querySelector(".prev");

//   if (!slider || cards.length === 0) return;

//   const visible = 5;
//   const center = 2;
//   const total = cards.length;

//   let cardWidth = cards[0].offsetWidth + 30;

//   // Clone cards (infinite effect)
//   for (let i = 0; i < visible; i++) {
//     slider.appendChild(cards[i].cloneNode(true));
//   }

//   for (let i = total - visible; i < total; i++) {
//     slider.insertBefore(cards[i].cloneNode(true), slider.firstChild);
//   }

//   let allCards = document.querySelectorAll(".food-card");
//   let index = visible;

//   function update() {
//     allCards.forEach(c => c.classList.remove("active"));

//     if (allCards[index + center]) {
//       allCards[index + center].classList.add("active");
//     }

//     slider.style.transform = `translateX(${-(index * cardWidth)}px)`;
//   }

//   // Initial position
//   slider.style.transform = `translateX(${-(index * cardWidth)}px)`;
//   update();

//   // NEXT
//   if (next) {
//     next.onclick = () => {
//       index++;
//       slider.style.transition = ".6s";
//       update();

//       if (index >= total + visible) {
//         setTimeout(() => {
//           slider.style.transition = "none";
//           index = visible;
//           slider.style.transform = `translateX(${-(index * cardWidth)}px)`;
//         }, 600);
//       }
//     };
//   }

//   // PREV
//   if (prev) {
//     prev.onclick = () => {
//       index--;
//       slider.style.transition = ".6s";
//       update();

//       if (index < 0) {
//         setTimeout(() => {
//           slider.style.transition = "none";
//           index = total;
//           slider.style.transform = `translateX(${-(index * cardWidth)}px)`;
//         }, 600);
//       }
//     };
//   }
// });


// // ================= CONTACT FORM =================
// const contactForm = document.getElementById("contactForm");

// if (contactForm) {
//   contactForm.addEventListener("submit", function (e) {
//     e.preventDefault();
//     alert("Message sent successfully!");
//     contactForm.reset();
//   });
// }


// // ================= PAYMENT MODAL =================
// const products = {
//   floral: {
//     name: "Floral Elegance",
//     price: 50000,
//     img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRV3AhvzsTPKsCu7A8yCypc4ll-EaTT2u8-M0O4MBepRSyanVrGgxRfDPCRu0BSPXWPcqM&usqp=CAU"
//   },
//   citrus: {
//     name: "Citrus Fresh",
//     price: 3000,
//     img: "assets/images/blue-perfume.jpg"
//   },
//   woody: {
//     name: "Woody Mystique",
//     price: 4000,
//     img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSFAi6xnVatepPUgvE-9Dm4omweeoUY8a_4KNwt1RWhM6chF2RTa9vkpajKljs_Me4ZzvM&usqp=CAU"
//   },
//   vanilla: {
//     name: "Vanilla Dream",
//     price: 70000,
//     img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR4Hw3LswPzf3L8ti8PaZDzAcrbJ-zDmdJmYrJ61xoc-qvJiuUP06hYYDlfGgSFVhRE0HA&usqp=CAU"
//   },
//   lavender: {
//     name: "Lavender Bliss",
//     price: 45000,
//     img: "assets/images/lavander-perfume.jpg"
//   },
//   carousel: {
//     name: "Carousel Light",
//     price: 40000,
//     img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTDUNY2XJA-pCHOlkYJ3vV6j_ueunwhQCg9uXbD7fO9WNcFKyntHJJUZgAHcDjnk0SL6ts&usqp=CAU"
//   },
//   rose: {
//     name: "Rose Petals",
//     price: 55000,
//     img: "https://thumbs.dreamstime.com/b/bottle-perfume-beautiful-flowers-light-dark-background-realistic-style-perfume-glass-bottle-pink-background-290041616.jpg"
//   },
//   musk: {
//     name: "Soft Musk",
//     price: 60000,
//     img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQfF5QsToBy2M2iPhrBxnlCyCGk1AIwUhiPl8WzwO0BLW49UdKNGwmwEAB-aK-8he8cChE&usqp=CAU"
//   }
// };

// // 👉 CLICK FUNCTION
// function loadProduct(key){
//   const p = products[key];

//   if(!p){
//     alert("Product not found ❌");
//     return;
//   }

//   localStorage.setItem("product", JSON.stringify(p));
//   window.location.href = "checkout.html";
// }







// // Wait for DOM to load
// document.addEventListener('DOMContentLoaded', function() {
    
//     // ========== CART FUNCTIONALITY ==========
//     let cart = JSON.parse(localStorage.getItem('cart')) || [];
    
//     function updateCartDisplay() {
//         const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
//         const cartCountElement = document.getElementById('cartCount');
//         if (cartCountElement) {
//             cartCountElement.innerText = cartCount;
//         }
//         localStorage.setItem('cart', JSON.stringify(cart));
//     }
    
//     function addToCart(product) {
//         const existingItem = cart.find(item => item.name === product.name);
//         if (existingItem) {
//             existingItem.quantity++;
//         } else {
//             cart.push({ 
//                 name: product.name, 
//                 price: product.price, 
//                 quantity: 1,
//                 image: product.image
//             });
//         }
//         updateCartDisplay();
//         showToast(`${product.name} added to cart!`, 'success');
//     }
    
//     function viewCart() {
//         if (cart.length === 0) {
//             showToast('Your cart is empty!', 'error');
//             return;
//         }
        
//         let cartMessage = '🛒 Your Cart:\n\n';
//         let total = 0;
//         cart.forEach((item, index) => {
//             cartMessage += `${index + 1}. ${item.name} - $${item.price} x ${item.quantity} = $${(item.price * item.quantity).toFixed(2)}\n`;
//             total += item.price * item.quantity;
//         });
//         cartMessage += `\nTotal: $${total.toFixed(2)}\n\nProceed to checkout?`;
        
//         if (confirm(cartMessage)) {
//             checkout();
//         }
//     }
    
//     async function buyNow(product) {
//         if (confirm(`Purchase ${product.name} for $${product.price}?`)) {
//             await processPayment(product);
//         }
//     }
    
//     async function checkout() {
//         if (cart.length === 0) {
//             showToast('Your cart is empty!', 'error');
//             return;
//         }
        
//         const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
//         const productNames = cart.map(item => item.name).join(', ');
//         const firstProductImage = cart[0]?.image || '';
        
//         if (confirm(`Checkout ${cart.length} item(s) for $${total.toFixed(2)}?`)) {
//             await processPayment({
//                 name: productNames,
//                 price: total,
//                 image: firstProductImage
//             });
//         }
//     }
    
//     async function processPayment(product) {
//         try {
//             showToast('Processing payment...', 'success');
            
//             const response = await fetch('/create-checkout-session', {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//                 body: JSON.stringify({
//                     product: {
//                         name: product.name,
//                         price: product.price,
//                         image: product.image
//                     }
//                 })
//             });
            
//             const data = await response.json();
            
//             if (data.url) {
//                 if (cart.length > 0) {
//                     cart = [];
//                     updateCartDisplay();
//                 }
//                 window.location.href = data.url;
//             } else {
//                 showToast('Payment failed. Please try again.', 'error');
//             }
//         } catch (error) {
//             console.error('Payment error:', error);
//             showToast('Error processing payment. Please try again.', 'error');
//         }
//     }
    
//     function showToast(message, type = 'success') {
//         const toast = document.createElement('div');
//         toast.className = `toast-notification ${type === 'error' ? 'toast-error' : ''}`;
//         toast.textContent = message;
//         document.body.appendChild(toast);
        
//         setTimeout(() => {
//             toast.remove();
//         }, 3000);
//     }
    
//     // ========== AUTHENTICATION ==========
//     async function loadUserInfo() {
//         try {
//             const response = await fetch('/api/user');
//             const data = await response.json();
//             if (data.success && data.user) {
//                 const userNameElement = document.getElementById('userNameDisplay');
//                 if (userNameElement) {
//                     userNameElement.textContent = `Welcome, ${data.user.fullName}!`;
//                 }
//             }
//         } catch (error) {
//             console.error('Error loading user info:', error);
//         }
//     }
    
//     async function handleLogout() {
//         try {
//             const response = await fetch('/api/logout', {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json'
//                 }
//             });
//             const data = await response.json();
//             if (data.success) {
//                 localStorage.removeItem('cart');
//                 window.location.href = data.redirect;
//             }
//         } catch (error) {
//             console.error('Logout error:', error);
//             window.location.href = '/login';
//         }
//     }
    
//     // ========== SMOOTH SCROLLING ==========
//     function scrollToCollection() {
//         const collectionSection = document.getElementById('collection');
//         if (collectionSection) {
//             collectionSection.scrollIntoView({ behavior: 'smooth' });
//         }
//     }
    
//     function scrollToAbout() {
//         const aboutSection = document.getElementById('about-us');
//         if (aboutSection) {
//             aboutSection.scrollIntoView({ behavior: 'smooth' });
//         }
//     }
    
//     // ========== CAROUSEL FUNCTIONALITY ==========
//     function initCarousel() {
//         const slider = document.querySelector('.food-slider');
//         const prevBtn = document.querySelector('.slider-btn.prev');
//         const nextBtn = document.querySelector('.slider-btn.next');
        
//         if (!slider || !prevBtn || !nextBtn) return;
        
//         let scrollAmount = 0;
//         const cardWidth = 320;
        
//         nextBtn.addEventListener('click', () => {
//             scrollAmount += cardWidth;
//             if (scrollAmount > slider.scrollWidth - slider.clientWidth) {
//                 scrollAmount = slider.scrollWidth - slider.clientWidth;
//             }
//             slider.scrollTo({
//                 left: scrollAmount,
//                 behavior: 'smooth'
//             });
//         });
        
//         prevBtn.addEventListener('click', () => {
//             scrollAmount -= cardWidth;
//             if (scrollAmount < 0) {
//                 scrollAmount = 0;
//             }
//             slider.scrollTo({
//                 left: scrollAmount,
//                 behavior: 'smooth'
//             });
//         });
//     }
    
//     // ========== GSAP ANIMATIONS ==========
//     function initAnimations() {
//         if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
//             gsap.registerPlugin(ScrollTrigger);
            
//             // Hero section animation
//             gsap.from('.h1-hero-w, .h1-hero-e', {
//                 duration: 1,
//                 y: 50,
//                 opacity: 0,
//                 stagger: 0.3
//             });
            
//             gsap.from('.p-hero, .p-hero2, .btn2, .btn-2', {
//                 duration: 1,
//                 y: 30,
//                 opacity: 0,
//                 stagger: 0.2,
//                 delay: 0.5
//             });
            
//             // Products animation
//             gsap.from('.col-img', {
//                 scrollTrigger: {
//                     trigger: '#collection',
//                     start: 'top 80%',
//                 },
//                 duration: 0.8,
//                 y: 50,
//                 opacity: 0,
//                 stagger: 0.2
//             });
//         }
//     }
    
//     // ========== CONTACT FORM HANDLER ==========
//     function initContactForm() {
//         const contactForm = document.getElementById('contactForm');
//         if (contactForm) {
//             contactForm.addEventListener('submit', function(e) {
//                 e.preventDefault();
//                 showToast('Message sent successfully! We\'ll get back to you soon.', 'success');
//                 this.reset();
//             });
//         }
//     }
    
//     // ========== EVENT LISTENERS FOR BUTTONS ==========
//     function initEventListeners() {
//         // Logout button
//         const logoutBtn = document.getElementById('logoutBtn');
//         if (logoutBtn) {
//             logoutBtn.addEventListener('click', handleLogout);
//         }
        
//         // Cart button
//         const cartBtn = document.getElementById('cartBtn');
//         if (cartBtn) {
//             cartBtn.addEventListener('click', viewCart);
//         }
        
//         // Order now button
//         const orderNowBtn = document.getElementById('orderNowBtn');
//         if (orderNowBtn) {
//             orderNowBtn.addEventListener('click', scrollToCollection);
//         }
        
//         // Visit site button
//         const visitSiteBtn = document.getElementById('visitSiteBtn');
//         if (visitSiteBtn) {
//             visitSiteBtn.addEventListener('click', scrollToAbout);
//         }
        
//         // Buy now buttons
//         document.querySelectorAll('.buy-now-btn').forEach(btn => {
//             btn.addEventListener('click', function(e) {
//                 e.stopPropagation();
//                 const productDiv = this.closest('.col-img');
//                 if (productDiv && productDiv.dataset.product) {
//                     const product = JSON.parse(productDiv.dataset.product);
//                     buyNow(product);
//                 }
//             });
//         });
        
//         // Add to cart buttons
//         document.querySelectorAll('.add-to-cart-btn').forEach(btn => {
//             btn.addEventListener('click', function(e) {
//                 e.stopPropagation();
//                 const productDiv = this.closest('.col-img');
//                 if (productDiv && productDiv.dataset.product) {
//                     const product = JSON.parse(productDiv.dataset.product);
//                     addToCart(product);
//                 }
//             });
//         });
//     }
    
//     // ========== CHECK AUTHENTICATION ON PAGE LOAD ==========
//     async function checkAuth() {
//         try {
//             const response = await fetch('/api/user');
//             const data = await response.json();
//             if (!data.success) {
//                 window.location.href = '/login';
//             }
//         } catch (error) {
//             console.error('Auth check failed:', error);
//             window.location.href = '/login';
//         }
//     }
    
//     // ========== INITIALIZE EVERYTHING ==========
//     async function init() {
//         await checkAuth();
//         await loadUserInfo();
//         updateCartDisplay();
//         initCarousel();
//         initAnimations();
//         initContactForm();
//         initEventListeners();
//     }
    
//     // Start the application
//     init();
// });










// // full.js - Add this complete code

// // Check authentication status on page load
// document.addEventListener('DOMContentLoaded', async function() {
//     // Check if user is logged in
//     await checkAuthStatus();
    
//     // Initialize cart from localStorage
//     updateCartCount();
    
//     // Add event listeners for cart buttons
//     document.querySelectorAll('.add-to-cart-btn').forEach(btn => {
//         btn.addEventListener('click', addToCart);
//     });
    
//     document.querySelectorAll('.buy-now-btn').forEach(btn => {
//         btn.addEventListener('click', buyNow);
//     });
    
//     // Cart button click handler
//     const cartBtn = document.getElementById('cartBtn');
//     if (cartBtn) {
//         cartBtn.addEventListener('click', showCart);
//     }
    
//     // Logout button handler
//     const logoutBtn = document.getElementById('logoutBtn');
//     if (logoutBtn) {
//         logoutBtn.addEventListener('click', handleLogout);
//     }
    
//     // Order now button
//     const orderNowBtn = document.getElementById('orderNowBtn');
//     if (orderNowBtn) {
//         orderNowBtn.addEventListener('click', function() {
//             document.getElementById('collection').scrollIntoView({ behavior: 'smooth' });
//         });
//     }
    
//     // Visit site button
//     const visitSiteBtn = document.getElementById('visitSiteBtn');
//     if (visitSiteBtn) {
//         visitSiteBtn.addEventListener('click', function() {
//             document.getElementById('hero').scrollIntoView({ behavior: 'smooth' });
//         });
//     }
    
//     // Contact form handler
//     const contactForm = document.getElementById('contactForm');
//     if (contactForm) {
//         contactForm.addEventListener('submit', handleContactForm);
//     }
// });

// // Check authentication status
// async function checkAuthStatus() {
//     try {
//         const response = await fetch('/api/user', {
//             credentials: 'include'
//         });
        
//         const data = await response.json();
        
//         if (data.success && data.user) {
//             // User is logged in
//             const userNameDisplay = document.getElementById('userNameDisplay');
//             if (userNameDisplay) {
//                 userNameDisplay.textContent = `Welcome, ${data.user.fullName.split(' ')[0]}`;
//             }
            
//             const logoutBtn = document.getElementById('logoutBtn');
//             if (logoutBtn) {
//                 logoutBtn.style.display = 'block';
//             }
//         } else {
//             // User is not logged in - redirect to login
//             const protectedRoutes = ['/full', '/'];
//             if (protectedRoutes.includes(window.location.pathname)) {
//                 window.location.href = '/login';
//             }
//         }
//     } catch (error) {
//         console.error('Auth check failed:', error);
//     }
// }

// // Handle logout
// async function handleLogout() {
//     try {
//         const response = await fetch('/api/logout', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json'
//             },
//             credentials: 'include'
//         });
        
//         const data = await response.json();
        
//         if (data.success) {
//             window.location.href = '/login';
//         } else {
//             alert('Logout failed. Please try again.');
//         }
//     } catch (error) {
//         console.error('Logout error:', error);
//         window.location.href = '/login';
//     }
// }

// // Cart functionality
// let cart = JSON.parse(localStorage.getItem('cart')) || [];

// function updateCartCount() {
//     const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
//     const cartCount = document.getElementById('cartCount');
//     if (cartCount) {
//         cartCount.textContent = totalItems;
//         cartCount.style.display = totalItems > 0 ? 'flex' : 'none';
//     }
// }

// function addToCart(event) {
//     event.stopPropagation();
//     const productDiv = event.target.closest('.col-img');
//     const productData = JSON.parse(productDiv.getAttribute('data-product'));
    
//     // Check if product already in cart
//     const existingItem = cart.find(item => item.name === productData.name);
    
//     if (existingItem) {
//         existingItem.quantity += 1;
//     } else {
//         cart.push({
//             name: productData.name,
//             price: productData.price,
//             image: productData.image,
//             quantity: 1
//         });
//     }
    
//     localStorage.setItem('cart', JSON.stringify(cart));
//     updateCartCount();
    
//     // Show added to cart message
//     showNotification(`${productData.name} added to cart!`, 'success');
// }

// function buyNow(event) {
//     event.stopPropagation();
//     const productDiv = event.target.closest('.col-img');
//     const productData = JSON.parse(productDiv.getAttribute('data-product'));
    
//     // Check if user is logged in
//     fetch('/api/user', { credentials: 'include' })
//         .then(response => response.json())
//         .then(data => {
//             if (!data.success) {
//                 // Redirect to login if not authenticated
//                 if (confirm('Please login to purchase. Go to login page?')) {
//                     window.location.href = '/login';
//                 }
//             } else {
//                 // Proceed with Stripe payment
//                 initiateStripePayment(productData);
//             }
//         });
// }

// async function initiateStripePayment(product) {
//     try {
//         const response = await fetch('/create-checkout-session', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify({ product: product })
//         });
        
//         const data = await response.json();
        
//         if (data.url) {
//             window.location.href = data.url;
//         } else {
//             alert('Payment initiation failed. Please try again.');
//         }
//     } catch (error) {
//         console.error('Stripe error:', error);
//         alert('Payment error. Please try again.');
//     }
// }

// function showCart() {
//     if (cart.length === 0) {
//         alert('Your cart is empty!');
//         return;
//     }
    
//     let cartMessage = '🛒 Your Cart:\n\n';
//     let total = 0;
    
//     cart.forEach((item, index) => {
//         const itemTotal = item.price * item.quantity;
//         total += itemTotal;
//         cartMessage += `${index + 1}. ${item.name}\n   Quantity: ${item.quantity}\n   Price: $${item.price}\n   Total: $${itemTotal.toFixed(2)}\n\n`;
//     });
    
//     cartMessage += `\n📦 Total Amount: $${total.toFixed(2)}\n\n`;
//     cartMessage += 'Options:\n- Click OK to checkout\n- Click Cancel to continue shopping';
    
//     if (confirm(cartMessage)) {
//         checkout();
//     }
// }

// async function checkout() {
//     // Check if user is logged in
//     const authResponse = await fetch('/api/user', { credentials: 'include' });
//     const authData = await authResponse.json();
    
//     if (!authData.success) {
//         if (confirm('Please login to checkout. Go to login page?')) {
//             window.location.href = '/login';
//         }
//         return;
//     }
    
//     // Process all items in cart
//     if (cart.length === 0) {
//         alert('Your cart is empty!');
//         return;
//     }
    
//     // For simplicity, checkout the first item (or you can modify for multiple items)
//     const firstItem = cart[0];
//     initiateStripePayment({
//         name: firstItem.name,
//         price: firstItem.price,
//         image: firstItem.image
//     });
// }

// function showNotification(message, type = 'success') {
//     // Create notification element
//     const notification = document.createElement('div');
//     notification.textContent = message;
//     notification.style.cssText = `
//         position: fixed;
//         top: 20px;
//         right: 20px;
//         background: ${type === 'success' ? '#4caf50' : '#f44336'};
//         color: white;
//         padding: 12px 20px;
//         border-radius: 5px;
//         z-index: 9999;
//         animation: slideIn 0.3s ease;
//         box-shadow: 0 2px 10px rgba(0,0,0,0.2);
//     `;
    
//     document.body.appendChild(notification);
    
//     setTimeout(() => {
//         notification.style.animation = 'slideOut 0.3s ease';
//         setTimeout(() => notification.remove(), 300);
//     }, 3000);
// }

// // Add CSS animations for notification
// const style = document.createElement('style');
// style.textContent = `
//     @keyframes slideIn {
//         from {
//             transform: translateX(100%);
//             opacity: 0;
//         }
//         to {
//             transform: translateX(0);
//             opacity: 1;
//         }
//     }
    
//     @keyframes slideOut {
//         from {
//             transform: translateX(0);
//             opacity: 1;
//         }
//         to {
//             transform: translateX(100%);
//             opacity: 0;
//         }
//     }
// `;
// document.head.appendChild(style);

// // Handle contact form submission
// async function handleContactForm(event) {
//     event.preventDefault();
    
//     const form = event.target;
//     const formData = new FormData(form);
//     const data = {
//         firstName: formData.get('First name'),
//         lastName: formData.get('Last name'),
//         email: formData.get('Email address'),
//         message: formData.get('Leave us a message')
//     };
    
//     // Here you would send to your backend
//     console.log('Contact form submitted:', data);
//     showNotification('Message sent successfully! We will contact you soon.', 'success');
//     form.reset();
// }

// // Slider functionality for carousel
// document.addEventListener('DOMContentLoaded', function() {
//     const slider = document.querySelector('.food-slider');
//     const prevBtn = document.querySelector('.prev');
//     const nextBtn = document.querySelector('.next');
    
//     if (slider && prevBtn && nextBtn) {
//         let scrollAmount = 0;
//         const scrollStep = 300;
        
//         prevBtn.addEventListener('click', () => {
//             scrollAmount -= scrollStep;
//             if (scrollAmount < 0) scrollAmount = 0;
//             slider.scrollTo({
//                 left: scrollAmount,
//                 behavior: 'smooth'
//             });
//         });
        
//         nextBtn.addEventListener('click', () => {
//             scrollAmount += scrollStep;
//             const maxScroll = slider.scrollWidth - slider.clientWidth;
//             if (scrollAmount > maxScroll) scrollAmount = maxScroll;
//             slider.scrollTo({
//                 left: scrollAmount,
//                 behavior: 'smooth'
//             });
//         });
//     }
// });

// // Smooth scrolling for anchor links
// document.querySelectorAll('a[href^="#"]').forEach(anchor => {
//     anchor.addEventListener('click', function(e) {
//         e.preventDefault();
//         const target = document.querySelector(this.getAttribute('href'));
//         if (target) {
//             target.scrollIntoView({
//                 behavior: 'smooth',
//                 block: 'start'
//             });
//         }
//     });
// });







// ================= FULL.JS - COMPLETE FIXED VERSION =================

// ================= PRODUCTS DATA =================
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// ================= DOM CONTENT LOADED =================
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initAuthentication();
    initCart();
    initEventListeners();
    initCarousel();
    initAnimations();
    initContactForm();
    initSmoothScrolling();
});

// ================= AUTHENTICATION =================
async function initAuthentication() {
    await checkAuthStatus();
    await loadUserInfo();
    
    // Logout button handler
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', handleLogout);
    }
}

async function checkAuthStatus() {
    try {
        const response = await fetch('/api/user', {
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        
        const data = await response.json();
        
        if (!data.success) {
            // User is not logged in - redirect to login
            const protectedRoutes = ['/full', '/', '/full.html'];
            if (protectedRoutes.includes(window.location.pathname) || window.location.pathname === '/') {
                window.location.href = '/login';
            }
        }
    } catch (error) {
        console.error('Auth check failed:', error);
        window.location.href = '/login';
    }
}

async function loadUserInfo() {
    try {
        const response = await fetch('/api/user', {
            credentials: 'include'
        });
        const data = await response.json();
        
        if (data.success && data.user) {
            const userNameElement = document.getElementById('userNameDisplay');
            if (userNameElement) {
                const firstName = data.user.fullName.split(' ')[0];
                userNameElement.textContent = `Welcome, ${firstName}!`;
            }
        }
    } catch (error) {
        console.error('Error loading user info:', error);
    }
}

async function handleLogout() {
    try {
        const response = await fetch('/api/logout', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include'
        });
        
        const data = await response.json();
        
        if (data.success) {
            localStorage.clear();
            window.location.href = data.redirect || '/login';
        } else {
            showNotification('Logout failed. Please try again.', 'error');
        }
    } catch (error) {
        console.error('Logout error:', error);
        window.location.href = '/login';
    }
}

// ================= CART FUNCTIONALITY =================
function initCart() {
    updateCartDisplay();
    
    // Add to cart buttons
    document.querySelectorAll('.add-to-cart-btn').forEach(btn => {
        btn.removeEventListener('click', addToCartHandler);
        btn.addEventListener('click', addToCartHandler);
    });
    
    // Buy now buttons
    document.querySelectorAll('.buy-now-btn').forEach(btn => {
        btn.removeEventListener('click', buyNowHandler);
        btn.addEventListener('click', buyNowHandler);
    });
    
    // Cart button
    const cartBtn = document.getElementById('cartBtn');
    if (cartBtn) {
        cartBtn.removeEventListener('click', showCart);
        cartBtn.addEventListener('click', showCart);
    }
}

function addToCartHandler(event) {
    event.stopPropagation();
    const productDiv = event.target.closest('.col-img');
    if (!productDiv || !productDiv.dataset.product) {
        console.error('Product data not found');
        return;
    }
    
    try {
        const productData = JSON.parse(productDiv.dataset.product);
        addToCart(productData);
    } catch (error) {
        console.error('Error parsing product data:', error);
    }
}

function buyNowHandler(event) {
    event.stopPropagation();
    const productDiv = event.target.closest('.col-img');
    if (!productDiv || !productDiv.dataset.product) {
        console.error('Product data not found');
        return;
    }
    
    try {
        const productData = JSON.parse(productDiv.dataset.product);
        buyNow(productData);
    } catch (error) {
        console.error('Error parsing product data:', error);
    }
}

function addToCart(product) {
    const existingItem = cart.find(item => item.name === product.name);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ 
            name: product.name, 
            price: product.price, 
            quantity: 1,
            image: product.image
        });
    }
    
    updateCartDisplay();
    showNotification(`${product.name} added to cart!`, 'success');
}

function updateCartDisplay() {
    const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
    const cartCountElement = document.getElementById('cartCount');
    
    if (cartCountElement) {
        cartCountElement.innerText = totalItems;
        cartCountElement.style.display = totalItems > 0 ? 'flex' : 'none';
    }
    
    localStorage.setItem('cart', JSON.stringify(cart));
}

function showCart() {
    if (cart.length === 0) {
        showNotification('Your cart is empty!', 'error');
        return;
    }
    
    let cartMessage = '🛒 Your Cart:\n\n';
    let total = 0;
    
    cart.forEach((item, index) => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;
        cartMessage += `${index + 1}. ${item.name}\n   Quantity: ${item.quantity}\n   Price: $${item.price.toFixed(2)}\n   Total: $${itemTotal.toFixed(2)}\n\n`;
    });
    
    cartMessage += `━━━━━━━━━━━━━━━━━━━━\n`;
    cartMessage += `📦 Total Amount: $${total.toFixed(2)}\n\n`;
    cartMessage += `Click OK to checkout or Cancel to continue shopping`;
    
    if (confirm(cartMessage)) {
        checkout();
    }
}

async function buyNow(product) {
    const isAuthenticated = await checkUserAuthentication();
    
    if (!isAuthenticated) {
        if (confirm('Please login to purchase. Go to login page?')) {
            window.location.href = '/login';
        }
        return;
    }
    
    if (confirm(`Purchase ${product.name} for $${product.price.toFixed(2)}?`)) {
        await processPayment(product);
    }
}

async function checkout() {
    const isAuthenticated = await checkUserAuthentication();
    
    if (!isAuthenticated) {
        if (confirm('Please login to checkout. Go to login page?')) {
            window.location.href = '/login';
        }
        return;
    }
    
    if (cart.length === 0) {
        showNotification('Your cart is empty!', 'error');
        return;
    }
    
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const productNames = cart.map(item => item.name).join(', ');
    const firstProductImage = cart[0]?.image || '';
    
    if (confirm(`Checkout ${cart.length} item(s) for $${total.toFixed(2)}?\n\nProducts: ${productNames}`)) {
        await processPayment({
            name: productNames,
            price: total,
            image: firstProductImage
        });
    }
}

async function checkUserAuthentication() {
    try {
        const response = await fetch('/api/user', { 
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const data = await response.json();
        return data.success;
    } catch (error) {
        console.error('Auth check error:', error);
        return false;
    }
}

async function processPayment(product) {
    try {
        showNotification('Processing payment...', 'info');
        
        const response = await fetch('/create-checkout-session', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify({
                product: {
                    name: product.name,
                    price: product.price,
                    image: product.image
                }
            })
        });
        
        const data = await response.json();
        
        if (data.url) {
            if (cart.length > 0) {
                cart = [];
                updateCartDisplay();
            }
            window.location.href = data.url;
        } else {
            showNotification('Payment failed. Please try again.', 'error');
        }
    } catch (error) {
        console.error('Payment error:', error);
        showNotification('Error processing payment. Please try again.', 'error');
    }
}

// ================= NOTIFICATION SYSTEM =================
function showNotification(message, type = 'success') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.custom-notification');
    existingNotifications.forEach(notif => notif.remove());
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `custom-notification notification-${type}`;
    notification.textContent = message;
    
    // Style based on type
    const colors = {
        success: '#4caf50',
        error: '#f44336',
        info: '#2196f3'
    };
    
    notification.style.cssText = `
        position: fixed;
        top: 80px;
        right: 20px;
        background: ${colors[type] || colors.success};
        color: white;
        padding: 12px 20px;
        border-radius: 8px;
        z-index: 10000;
        animation: slideInRight 0.3s ease;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        font-size: 14px;
        font-weight: 500;
        max-width: 350px;
        word-wrap: break-word;
    `;
    
    document.body.appendChild(notification);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Add CSS animations
const notificationStyles = document.createElement('style');
notificationStyles.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(notificationStyles);

// ================= CAROUSEL / SLIDER FUNCTIONALITY =================
function initCarousel() {
    const slider = document.querySelector('.food-slider');
    const prevBtn = document.querySelector('.slider-btn.prev, .prev');
    const nextBtn = document.querySelector('.slider-btn.next, .next');
    
    if (!slider || !prevBtn || !nextBtn) {
        console.warn('Carousel elements not found');
        return;
    }
    
    let currentIndex = 0;
    const cards = document.querySelectorAll('.food-card');
    if (cards.length === 0) return;
    
    const cardWidth = cards[0].offsetWidth + 30; // Including gap
    const totalCards = cards.length;
    
    function updateSlider() {
        const scrollPosition = currentIndex * cardWidth;
        slider.scrollTo({
            left: scrollPosition,
            behavior: 'smooth'
        });
    }
    
    function nextSlide() {
        if (currentIndex < totalCards - 1) {
            currentIndex++;
        } else {
            currentIndex = 0; // Loop back to start
        }
        updateSlider();
    }
    
    function prevSlide() {
        if (currentIndex > 0) {
            currentIndex--;
        } else {
            currentIndex = totalCards - 1; // Loop to end
        }
        updateSlider();
    }
    
    // Add event listeners
    nextBtn.removeEventListener('click', nextSlide);
    prevBtn.removeEventListener('click', prevSlide);
    nextBtn.addEventListener('click', nextSlide);
    prevBtn.addEventListener('click', prevSlide);
    
    // Auto-slide every 5 seconds
    let autoSlide = setInterval(nextSlide, 5000);
    
    // Pause auto-slide on hover
    slider.addEventListener('mouseenter', () => clearInterval(autoSlide));
    slider.addEventListener('mouseleave', () => {
        autoSlide = setInterval(nextSlide, 5000);
    });
}

// ================= GSAP ANIMATIONS =================
function initAnimations() {
    // Check if GSAP is loaded
    if (typeof gsap === 'undefined') {
        console.warn('GSAP not loaded, animations skipped');
        return;
    }
    
    // Register ScrollTrigger if available
    if (typeof ScrollTrigger !== 'undefined') {
        gsap.registerPlugin(ScrollTrigger);
    }
    
    // Hero section animation
    gsap.fromTo('.h1-hero-w, .h1-hero-e', 
        { y: 50, opacity: 0 },
        { duration: 1, y: 0, opacity: 1, stagger: 0.3 }
    );
    
    gsap.fromTo('.p-hero, .p-hero2, .btn2, .btn-2', 
        { y: 30, opacity: 0 },
        { duration: 1, y: 0, opacity: 1, stagger: 0.2, delay: 0.5 }
    );
    
    // Products animation with ScrollTrigger
    if (typeof ScrollTrigger !== 'undefined') {
        gsap.fromTo('.col-img', 
            { y: 50, opacity: 0 },
            {
                duration: 0.8,
                y: 0,
                opacity: 1,
                stagger: 0.2,
                scrollTrigger: {
                    trigger: '#collection',
                    start: 'top 80%',
                    toggleActions: 'play none none reverse'
                }
            }
        );
    } else {
        // Fallback without ScrollTrigger
        gsap.fromTo('.col-img', 
            { y: 50, opacity: 0 },
            { duration: 0.8, y: 0, opacity: 1, stagger: 0.2 }
        );
    }
}

// ================= CONTACT FORM =================
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.removeEventListener('submit', handleContactForm);
        contactForm.addEventListener('submit', handleContactForm);
    }
}

function handleContactForm(event) {
    event.preventDefault();
    
    const form = event.target;
    const inputs = form.querySelectorAll('input, textarea');
    let isValid = true;
    
    // Basic validation
    inputs.forEach(input => {
        if (input.hasAttribute('required') && !input.value.trim()) {
            isValid = false;
            input.style.borderColor = '#f44336';
        } else {
            input.style.borderColor = '#ccc';
        }
    });
    
    if (!isValid) {
        showNotification('Please fill in all required fields', 'error');
        return;
    }
    
    const formData = new FormData(form);
    const data = {
        firstName: formData.get('First name') || formData.get('first-name') || '',
        lastName: formData.get('Last name') || formData.get('last-name') || '',
        email: formData.get('Email address') || formData.get('email') || '',
        message: formData.get('Leave us a message') || formData.get('message') || ''
    };
    
    console.log('Contact form submitted:', data);
    showNotification('Message sent successfully! We\'ll get back to you soon.', 'success');
    form.reset();
}

// ================= SMOOTH SCROLLING =================
function initSmoothScrolling() {
    // Order now button
    const orderNowBtn = document.getElementById('orderNowBtn');
    if (orderNowBtn) {
        orderNowBtn.removeEventListener('click', scrollToCollection);
        orderNowBtn.addEventListener('click', scrollToCollection);
    }
    
    // Visit site button
    const visitSiteBtn = document.getElementById('visitSiteBtn');
    if (visitSiteBtn) {
        visitSiteBtn.removeEventListener('click', scrollToHero);
        visitSiteBtn.addEventListener('click', scrollToHero);
    }
    
    // All anchor links with hash
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.removeEventListener('click', smoothScrollHandler);
        anchor.addEventListener('click', smoothScrollHandler);
    });
}

function scrollToCollection() {
    const collectionSection = document.getElementById('collection');
    if (collectionSection) {
        collectionSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}

function scrollToHero() {
    const heroSection = document.getElementById('hero');
    if (heroSection) {
        heroSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}

function smoothScrollHandler(e) {
    e.preventDefault();
    const targetId = this.getAttribute('href');
    if (targetId === '#') return;
    
    const targetElement = document.querySelector(targetId);
    if (targetElement) {
        targetElement.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// ================= EVENT LISTENERS INITIALIZATION =================
function initEventListeners() {
    // Cart button is handled in initCart
    // Logout button is handled in initAuthentication
    // Buy now and add to cart buttons are handled in initCart
    
    // Window before unload to save cart
    window.addEventListener('beforeunload', () => {
        localStorage.setItem('cart', JSON.stringify(cart));
    });
}

// ================= HELPER FUNCTIONS =================
function isUserLoggedIn() {
    // This is a helper - actual check is done via API
    return document.cookie.includes('connect.sid');
}

// Export for debugging (optional)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { cart, showNotification };
}