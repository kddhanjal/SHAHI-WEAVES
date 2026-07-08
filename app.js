// Shahi Weaves Interactive Script

// Exchange rates based on INR (₹)
const exchangeRates = {
    INR: { rate: 1, symbol: "₹", decimals: 0 },
    USD: { rate: 1 / 83, symbol: "$", decimals: 0 },
    GBP: { rate: 1 / 105, symbol: "£", decimals: 0 },
    EUR: { rate: 1 / 90, symbol: "€", decimals: 0 }
};

let currentCurrency = "INR";

// Helper function to format price
function formatPrice(basePriceInr, currency) {
    const config = exchangeRates[currency] || exchangeRates["INR"];
    const converted = basePriceInr * config.rate;
    // Format with commas and no fractional part
    return config.symbol + Math.round(converted).toLocaleString();
}

// Update all prices on the page (cards + open modal)
function updateAllPrices(currency) {
    currentCurrency = currency;
    
    // Update original prices
    document.querySelectorAll(".original-price").forEach(el => {
        const basePrice = parseInt(el.getAttribute("data-base-price"), 10);
        if (!isNaN(basePrice)) {
            el.textContent = formatPrice(basePrice, currency);
        }
    });

    // Update discount prices
    document.querySelectorAll(".discount-price").forEach(el => {
        const basePrice = parseInt(el.getAttribute("data-base-price"), 10);
        if (!isNaN(basePrice)) {
            el.textContent = formatPrice(basePrice, currency);
        }
    });
}

// Lookbook data structure (19 Looks)
const looksData = {
    "1": {
        num: "Look 01",
        title: "Pastel Chikankari Elegance",
        category: "daily",
        outfit: "Pastel pink cotton chikankari kurta with white palazzo pants",
        jewelry: "Silver oxidized jhumkas and a silver bracelet",
        setting: "Outdoor cafe in Chandigarh",
        mood: "Smiling, direct camera view",
        image: "assets/look1.jpg",
        basePrice: 2933,
        discountPrice: 2200,
        discountPercent: 25
    },
    "2": {
        num: "Look 02",
        title: "Mint Green Floral Walk",
        category: "daily",
        outfit: "Mint green floral printed kurti with matching cotton pants",
        jewelry: "Gold hoops and a thin chain necklace",
        setting: "Tree-lined street walk",
        mood: "Casual, relaxed look",
        image: "assets/look2.jpg",
        basePrice: 2667,
        discountPrice: 2000,
        discountPercent: 25
    },
    "3": {
        num: "Look 03",
        title: "Rust Georgette Midi-Saree",
        category: "daily",
        outfit: "Rust georgette midi-saree with black sleeveless blouse",
        jewelry: "Thin metal bangles",
        setting: "Minimalist textured wall background",
        mood: "Classic, calm pose",
        image: "assets/look3.jpg",
        basePrice: 4267,
        discountPrice: 3200,
        discountPercent: 25
    },
    "4": {
        num: "Look 04",
        title: "Yellow Block-Print Anarkali",
        category: "festive",
        outfit: "Yellow block-print cotton Anarkali with sheer dupatta",
        jewelry: "Pearl studs and a red bindi",
        setting: "Indoors near a large window",
        mood: "Smiling, traditional pose",
        image: "assets/look4.jpg",
        basePrice: 8125,
        discountPrice: 6500,
        discountPercent: 20
    },
    "5": {
        num: "Look 05",
        title: "Navy Blue Threadwork Straight Cut",
        category: "daily",
        outfit: "Navy blue straight-cut kurta with silver thread work",
        jewelry: "Silver rings and drop earrings",
        setting: "Balcony with green plants",
        mood: "Dignified, professional pose",
        image: "assets/look5.jpg",
        basePrice: 3333,
        discountPrice: 2500,
        discountPercent: 25
    },
    "6": {
        num: "Look 06",
        title: "Ivory Handloom Linen Kurta",
        category: "festive",
        outfit: "Ivory handloom linen kurta with beige cigarette pants",
        jewelry: "Pearl drop earrings and a gold watch",
        setting: "Courtyard with morning light",
        mood: "Calm, natural smile",
        image: "assets/look6.jpg",
        basePrice: 6250,
        discountPrice: 5000,
        discountPercent: 20
    },
    "7": {
        num: "Look 07",
        title: "Maroon Velvet Haveli Festive",
        category: "festive",
        outfit: "Maroon velvet kurta with light embroidery and cream pants",
        jewelry: "Gold jhumkas and a statement ring",
        setting: "Haveli corridor with warm lighting",
        mood: "Festive, confident look",
        image: "assets/look7.jpg",
        basePrice: 8750,
        discountPrice: 7000,
        discountPercent: 20
    },
    "8": {
        num: "Look 08",
        title: "Lavender Organza Garden Dream",
        category: "festive",
        outfit: "Lavender organza suit with palazzo pants",
        jewelry: "Crystal studs and a thin bracelet",
        setting: "Flower garden during evening hours",
        mood: "Looking slightly away",
        image: "assets/look8.jpg",
        basePrice: 8750,
        discountPrice: 7000,
        discountPercent: 20
    },
    "9": {
        num: "Look 09",
        title: "Teal Ajrakh Artisan Classic",
        category: "glam",
        outfit: "Teal Ajrakh printed A-line kurta with off-white trousers",
        jewelry: "Silver choker and matching studs",
        setting: "Cafe with hand-painted walls",
        mood: "Casual, stylish pose",
        image: "assets/look9.jpg",
        basePrice: 6667,
        discountPrice: 6000,
        discountPercent: 10
    },
    "10": {
        num: "Look 10",
        title: "Champagne Beige Hotel Luxury",
        category: "festive",
        outfit: "Champagne beige silk kurta with matching trousers",
        jewelry: "Gold chain and matching drop earrings",
        setting: "Boutique hotel lobby",
        mood: "Classic portrait smile",
        image: "assets/look10.jpg",
        basePrice: 6250,
        discountPrice: 5000,
        discountPercent: 20,
        isNewArrival: true
    },
    "11": {
        num: "Look 11",
        title: "Powder Blue Angrakha Freshness",
        category: "daily",
        outfit: "Powder blue cotton Angrakha kurta with white palazzo pants",
        jewelry: "Silver anklet and hoops",
        setting: "Old-city lane with bougainvillea",
        mood: "Walking pose, natural smile",
        image: "assets/look11.jpg",
        basePrice: 2667,
        discountPrice: 2000,
        discountPercent: 25
    },
    "12": {
        num: "Look 12",
        title: "Emerald Banarasi Regal Touch",
        category: "festive",
        outfit: "Emerald green Banarasi tissue kurta with ivory pants",
        jewelry: "Emerald studs and a thin bangle",
        setting: "Lounge with arched doorways",
        mood: "Direct view, elegant look",
        image: "assets/look12.jpg",
        basePrice: 7500,
        discountPrice: 6000,
        discountPercent: 20,
        isNewArrival: true
    },
    "13": {
        num: "Look 13",
        title: "Sky Blue Cafe Chic",
        category: "daily",
        outfit: "Sky blue striped cotton kurta with white pants",
        jewelry: "Silver hoops and a simple tote bag",
        setting: "Neighborhood cafe seating",
        mood: "Cheerful, casual pose",
        image: "assets/look13.jpg",
        basePrice: 3200,
        discountPrice: 2400,
        discountPercent: 25,
        isNewArrival: true
    },
    "14": {
        num: "Look 14",
        title: "Sage Green Balcony Calm",
        category: "daily",
        outfit: "Sage green linen co-ord kurta set",
        jewelry: "Gold studs and a slim watch",
        setting: "Balcony with potted plants",
        mood: "Relaxed, natural smile",
        image: "assets/look14.jpg",
        basePrice: 3200,
        discountPrice: 2400,
        discountPercent: 25,
        isNewArrival: true
    },
    "15": {
        num: "Look 15",
        title: "Peach Floral Literary Elegance",
        category: "daily",
        outfit: "Peach floral cotton A-line kurta with cigarette pants",
        jewelry: "Pearl studs and a silver ring",
        setting: "Bookstore with wooden shelves",
        mood: "Warm, casual look",
        image: "assets/look15.jpg",
        basePrice: 3200,
        discountPrice: 2400,
        discountPercent: 25
    },
    "16": {
        num: "Look 16",
        title: "Beige Handblock Park Pathway",
        category: "daily",
        outfit: "Beige handblock printed kurta with olive pants",
        jewelry: "Silver studs and a slim bangle",
        setting: "Park pathway with green trees",
        mood: "Calm, looking away",
        image: "assets/look16.jpg",
        basePrice: 2933,
        discountPrice: 2200,
        discountPercent: 25
    },
    "17": {
        num: "Look 17",
        title: "Wine Embroidered Grand Ballroom",
        category: "glam",
        outfit: "Wine-colored embroidered silk Anarkali with organza dupatta",
        jewelry: "Chandelier earrings and stacked bangles",
        setting: "Ballroom with crystal chandeliers",
        mood: "Elegant, formal pose",
        image: "assets/look17.jpg",
        basePrice: 10000,
        discountPrice: 9000,
        discountPercent: 10
    },
    "18": {
        num: "Look 18",
        title: "Black Sequin Rooftop Night",
        category: "glam",
        outfit: "Black sequin saree with sleeveless blouse",
        jewelry: "Drop earrings and a cocktail ring",
        setting: "Rooftop lounge at night",
        mood: "Direct view, modern look",
        image: "assets/look18.jpg",
        basePrice: 11111,
        discountPrice: 10000,
        discountPercent: 10
    },
    "19": {
        num: "Look 19",
        title: "Champagne Gold Palace Sharara",
        category: "glam",
        outfit: "Champagne gold sharara set with mirror work",
        jewelry: "Kundan necklace and matching earrings",
        setting: "Heritage palace entrance",
        mood: "Dignified, confident smile",
        image: "assets/look19.jpg",
        basePrice: 9444,
        discountPrice: 8500,
        discountPercent: 10,
        isNewArrival: true
    }
};

// Render lookbook cards dynamically to optimize page speed and reduce index.html size
function renderLookbookGrid() {
    const grid = document.getElementById("lookbook-grid-container");
    if (!grid) return;

    grid.innerHTML = "";
    Object.keys(looksData).forEach(lookId => {
        const data = looksData[lookId];
        const card = document.createElement("div");
        card.className = "look-card";
        card.setAttribute("data-look", lookId);
        card.setAttribute("data-category", data.category || "daily");
        
        // Hide looks beyond Look 6 initially
        if (parseInt(lookId, 10) > 6) {
            card.classList.add("hidden");
        }

        card.innerHTML = `
            <div class="look-image-wrapper">
                <img src="${data.image}" alt="${data.title} - ${data.outfit}" title="${data.title} - ${data.outfit}" class="look-image">
                ${data.isNewArrival ? '<span class="new-arrival-tag">New Arrival</span>' : ''}
                <div class="look-hover-overlay">
                    <span class="view-details-tag">View Details</span>
                </div>
            </div>
            <div class="look-meta">
                <h3 class="look-name">${data.title}</h3>
                <p class="look-desc">${data.outfit}</p>
                <div class="look-price-container">
                    <span class="original-price" data-base-price="${data.basePrice}">${formatPrice(data.basePrice, currentCurrency)}</span>
                    <span class="discount-price" data-base-price="${data.discountPrice}">${formatPrice(data.discountPrice, currentCurrency)}</span>
                    <span class="discount-badge">${data.discountPercent}% OFF</span>
                </div>
            </div>
        `;

        card.addEventListener("click", () => {
            openLookModal(lookId);
        });

        grid.appendChild(card);
    });
}

// Modal Elements
const modal = document.getElementById("details-modal");
const modalImg = document.getElementById("modal-img");
const modalLookTitle = document.getElementById("modal-look-title");
const modalOutfit = document.getElementById("modal-outfit");
const modalJewelry = document.getElementById("modal-jewelry");
const modalSetting = document.getElementById("modal-setting");
const modalMood = document.getElementById("modal-mood");
const modalOriginalPrice = document.getElementById("modal-original-price");
const modalDiscountPrice = document.getElementById("modal-discount-price");
const modalDiscountBadge = document.getElementById("modal-discount-badge");
const modalCloseBtn = document.querySelector(".modal-close");

// Open Modal function
function openLookModal(lookId) {
    const data = looksData[lookId];
    if (!data) return;

    modalImg.src = data.image;
    modalImg.alt = data.title + " - " + data.outfit;
    modalImg.title = data.title + " - " + data.outfit;
    modalLookTitle.textContent = data.title;
    modalOutfit.textContent = data.outfit;
    modalJewelry.textContent = data.jewelry;
    modalSetting.textContent = data.setting;
    modalMood.textContent = data.mood;
    
    // Bind price attributes and render
    if (modalOriginalPrice) {
        modalOriginalPrice.setAttribute("data-base-price", data.basePrice);
        modalOriginalPrice.textContent = formatPrice(data.basePrice, currentCurrency);
    }
    if (modalDiscountPrice) {
        modalDiscountPrice.setAttribute("data-base-price", data.discountPrice);
        modalDiscountPrice.textContent = formatPrice(data.discountPrice, currentCurrency);
    }
    if (modalDiscountBadge) {
        modalDiscountBadge.textContent = data.discountPercent + "% OFF";
    }

    modal.classList.add("active");
    modal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden"; // Prevent background scroll
}

// Close Modal function
function closeLookModal() {
    modal.classList.remove("active");
    modal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = ""; // Restore background scroll
}


// Event Listener for Modal Close Button
if (modalCloseBtn) {
    modalCloseBtn.addEventListener("click", closeLookModal);
}

// Close on Backdrop click
modal.addEventListener("click", (e) => {
    if (e.target === modal) {
        closeLookModal();
    }
});

// Keyboard accessibility (ESC to close)
document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal.classList.contains("active")) {
        closeLookModal();
    }
});

let isShowingAll = false;
let activeCategory = "all";

// Function to apply visibility based on active category and isShowingAll state
function applyVisibility() {
    const cards = Array.from(document.querySelectorAll(".look-card"));
    const showMoreWrapper = document.querySelector(".lookbook-actions");

    if (activeCategory === "all") {
        // Apply normal pagination (show 6 initially, toggle all if expanded)
        cards.forEach((card, idx) => {
            if (isShowingAll) {
                card.classList.remove("hidden");
            } else {
                if (idx >= 6) {
                    card.classList.add("hidden");
                } else {
                    card.classList.remove("hidden");
                }
            }
        });
        // Show pagination controls
        if (showMoreWrapper) showMoreWrapper.style.display = "";
    } else {
        // Filter by category: show all matches, hide non-matches
        cards.forEach((card) => {
            const category = card.getAttribute("data-category");
            if (category === activeCategory) {
                card.classList.remove("hidden");
            } else {
                card.classList.add("hidden");
            }
        });
        // Hide pagination controls (since filtered lists are short)
        if (showMoreWrapper) showMoreWrapper.style.display = "none";
    }

    const showMoreBtn = document.getElementById("show-more-btn");
    if (showMoreBtn) {
        showMoreBtn.textContent = isShowingAll ? "Show Less Looks" : "Show More Looks";
    }
}

// Category filter logic (Theme blocks click listeners)
document.querySelectorAll(".theme-block").forEach(block => {
    block.addEventListener("click", () => {
        // Toggle active styling
        document.querySelectorAll(".theme-block").forEach(b => b.classList.remove("active"));
        block.classList.add("active");

        // Filter and update
        activeCategory = block.getAttribute("data-theme");
        isShowingAll = false; // Reset pagination toggle state
        applyVisibility();

        // Smooth scroll grid into view if filtered
        const grid = document.querySelector(".lookbook-grid");
        if (grid) {
            grid.scrollIntoView({ behavior: "smooth", block: "nearest" });
        }
    });
});

// Show More / Show Less Toggle Logic
const showMoreBtn = document.getElementById("show-more-btn");
if (showMoreBtn) {
    showMoreBtn.addEventListener("click", () => {
        isShowingAll = !isShowingAll;
        applyVisibility();

        if (isShowingAll) {
            // Scroll to the first newly revealed card (index 6)
            const cards = document.querySelectorAll(".look-card");
            if (cards.length > 6) {
                cards[6].scrollIntoView({ behavior: "smooth", block: "nearest" });
            }
        }
    });
}

// Sorting logic
const sortSelect = document.getElementById("sort-select");
if (sortSelect) {
    sortSelect.addEventListener("change", (e) => {
        const sortBy = e.target.value;
        const grid = document.querySelector(".lookbook-grid");
        const cards = Array.from(grid.querySelectorAll(".look-card"));

        cards.sort((a, b) => {
            const lookIdA = a.getAttribute("data-look");
            const lookIdB = b.getAttribute("data-look");
            const dataA = looksData[lookIdA];
            const dataB = looksData[lookIdB];

            if (sortBy === "price-low-high") {
                return dataA.basePrice - dataB.basePrice;
            } else if (sortBy === "price-high-low") {
                return dataB.basePrice - dataA.basePrice;
            } else if (sortBy === "new-arrivals") {
                const aNew = dataA.isNewArrival ? 1 : 0;
                const bNew = dataB.isNewArrival ? 1 : 0;
                if (aNew !== bNew) {
                    return bNew - aNew; // sorts true (1) before false (0)
                }
                return parseInt(lookIdA, 10) - parseInt(lookIdB, 10);
            } else {
                // "featured" or default sorting by original look order (1 to 19)
                return parseInt(lookIdA, 10) - parseInt(lookIdB, 10);
            }
        });

        // Re-append sorted cards to the grid container
        cards.forEach(card => grid.appendChild(card));

        // Re-apply visibility based on isShowingAll state
        applyVisibility();
    });
}

// Currency Selector Listener
const currencySelect = document.getElementById("currency-select");
if (currencySelect) {
    currencySelect.addEventListener("change", (e) => {
        updateAllPrices(e.target.value);
    });
}

// Smooth Scroll for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// WPForms Submission Simulator
const wpForm = document.getElementById("wpforms-form-consultation");
if (wpForm) {
    wpForm.addEventListener("submit", (e) => {
        e.preventDefault();
        
        const nameInput = document.getElementById("wpforms-field-name");
        const emailInput = document.getElementById("wpforms-field-email");
        const name = nameInput ? nameInput.value : "";
        const email = emailInput ? emailInput.value : "";
        
        const parentContainer = wpForm.parentNode;
        
        const confirmationDiv = document.createElement("div");
        confirmationDiv.className = "wpforms-confirmation-container";
        confirmationDiv.innerHTML = `
            <h3>Fitting Request Submitted Successfully!</h3>
            <p>Thank you for contacting Shahi Weaves, <strong>${name}</strong>. Our lead designer will review your interest and follow up at <strong>${email}</strong> within 24 hours to coordinate your custom fitting session.</p>
        `;
        
        wpForm.style.display = "none";
        parentContainer.appendChild(confirmationDiv);
    });
}

// FAQ Accordion Toggle logic
document.querySelectorAll(".faq-question").forEach(question => {
    question.addEventListener("click", () => {
        const item = question.parentNode;
        const answer = item.querySelector(".faq-answer");
        const isOpen = item.classList.contains("active");
        
        // Close other open FAQ items for a neat accordion effect
        document.querySelectorAll(".faq-item").forEach(otherItem => {
            otherItem.classList.remove("active");
            otherItem.querySelector(".faq-answer").style.maxHeight = null;
            otherItem.querySelector(".faq-question").setAttribute("aria-expanded", "false");
        });

        if (!isOpen) {
            item.classList.add("active");
            answer.style.maxHeight = answer.scrollHeight + "px";
            question.setAttribute("aria-expanded", "true");
        }
    });
});

// Shopping Cart State
let cart = [];
let activeLookId = null;

// Add item to cart
function addToCart(lookId) {
    const data = looksData[lookId];
    if (!data) return;

    const existingItem = cart.find(item => item.id === lookId);
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            id: lookId,
            title: data.title,
            num: data.num,
            price: data.discountPrice, // user's base discounted price
            image: data.image,
            quantity: 1
        });
    }

    updateCartUI();
    openCartDrawer();
}

// Open side cart drawer
function openCartDrawer() {
    const drawer = document.getElementById("woo-side-cart");
    if (drawer) {
        drawer.classList.add("active");
        drawer.setAttribute("aria-hidden", "false");
        document.body.style.overflow = "hidden"; // Prevent scrolling
    }
}

// Close side cart drawer
function closeCartDrawer() {
    const drawer = document.getElementById("woo-side-cart");
    if (drawer) {
        drawer.classList.remove("active");
        drawer.setAttribute("aria-hidden", "true");
        document.body.style.overflow = ""; // Restore scrolling
    }
}

// Update quantity
function updateCartQty(lookId, newQty) {
    const item = cart.find(item => item.id === lookId);
    if (item) {
        item.quantity = parseInt(newQty, 10);
        if (item.quantity <= 0) {
            cart = cart.filter(i => i.id !== lookId);
        }
        updateCartUI();
    }
}

// Remove item
function removeFromCart(lookId) {
    cart = cart.filter(item => item.id !== lookId);
    updateCartUI();
}

// Expose functions globally for inline onclick handlers
window.updateCartQty = updateCartQty;
window.removeFromCart = removeFromCart;

// Update Cart Count, Items, and Subtotal
function updateCartUI() {
    // Update count in header
    const cartCountEl = document.querySelector(".cart-count");
    const totalQty = cart.reduce((sum, item) => sum + item.quantity, 0);
    if (cartCountEl) {
        cartCountEl.textContent = totalQty;
        cartCountEl.classList.add("bounce");
        setTimeout(() => cartCountEl.classList.remove("bounce"), 300);
    }

    // Render items
    const cartItemsContainer = document.querySelector(".cart-drawer-items");
    if (cartItemsContainer) {
        if (cart.length === 0) {
            cartItemsContainer.innerHTML = '<p class="empty-cart-msg">Your cart is currently empty.</p>';
        } else {
            cartItemsContainer.innerHTML = "";
            cart.forEach(item => {
                const itemDiv = document.createElement("div");
                itemDiv.className = "cart-item";
                itemDiv.innerHTML = `
                    <img src="${item.image}" alt="${item.title}" class="cart-item-img">
                    <div class="cart-item-details">
                        <span class="cart-item-num">${item.num}</span>
                        <h4 class="cart-item-title">${item.title}</h4>
                        <div class="cart-item-meta">
                            <div class="cart-item-qty">
                                <button class="qty-btn dec-btn" onclick="updateCartQty('${item.id}', ${item.quantity - 1})">-</button>
                                <span class="qty-val">${item.quantity}</span>
                                <button class="qty-btn inc-btn" onclick="updateCartQty('${item.id}', ${item.quantity + 1})">+</button>
                            </div>
                            <span class="cart-item-price">${formatPrice(item.price * item.quantity, currentCurrency)}</span>
                        </div>
                    </div>
                    <button class="cart-item-remove" onclick="removeFromCart('${item.id}')" aria-label="Remove item">
                        &times;
                    </button>
                `;
                cartItemsContainer.appendChild(itemDiv);
            });
        }
    }

    // Calculate subtotal
    const subtotalEl = document.getElementById("cart-subtotal-val");
    if (subtotalEl) {
        const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        subtotalEl.textContent = formatPrice(subtotal, currentCurrency);
    }
}

// WooCommerce Quick Add Card Overlays and Modal Hooks Setup
function setupWooCommerceActions() {
    // Dynamic overlay adjustments
    document.querySelectorAll(".look-card").forEach(card => {
        const lookId = card.getAttribute("data-look");
        const hoverOverlay = card.querySelector(".look-hover-overlay");
        if (hoverOverlay) {
            hoverOverlay.innerHTML = "";
            
            const detailsSpan = document.createElement("span");
            detailsSpan.className = "view-details-tag";
            detailsSpan.textContent = "View Details";
            detailsSpan.addEventListener("click", (e) => {
                e.stopPropagation();
                openLookModal(lookId);
            });
            
            const quickAddSpan = document.createElement("span");
            quickAddSpan.className = "quick-add-tag";
            quickAddSpan.textContent = "Quick Add";
            quickAddSpan.addEventListener("click", (e) => {
                e.stopPropagation();
                addToCart(lookId);
            });
            
            hoverOverlay.appendChild(detailsSpan);
            hoverOverlay.appendChild(quickAddSpan);
        }
    });

    // Drawer overlay events
    const cartBtn = document.getElementById("woo-cart-btn");
    const closeCartBtn = document.querySelector(".close-cart-btn");
    const cartOverlay = document.querySelector(".cart-drawer-overlay");

    if (cartBtn) cartBtn.addEventListener("click", openCartDrawer);
    if (closeCartBtn) closeCartBtn.addEventListener("click", closeCartDrawer);
    if (cartOverlay) cartOverlay.addEventListener("click", closeCartDrawer);

    // Modal add-to-cart listener
    const modalAddToCartBtn = document.getElementById("modal-add-to-cart-btn");
    if (modalAddToCartBtn) {
        modalAddToCartBtn.addEventListener("click", () => {
            if (activeLookId) {
                addToCart(activeLookId);
                closeLookModal();
            }
        });
    }

    // Custom WooCommerce Checkout Modal Integration
    const checkoutBtn = document.getElementById("cart-checkout-btn");
    const checkoutModal = document.getElementById("woo-checkout-modal");
    const closeCheckoutBtn = document.getElementById("close-checkout-btn");
    const checkoutForm = document.getElementById("woo-checkout-form");
    const checkoutSuccessView = document.getElementById("checkout-success-view");
    const closeSuccessBtn = document.getElementById("close-success-btn");
    const orderNumberVal = document.getElementById("order-number-val");
    const checkoutSummaryItemsList = document.getElementById("checkout-summary-items-list");
    const checkoutTotalVal = document.getElementById("checkout-total-val");

    function closeCheckoutModal() {
        if (checkoutModal) {
            checkoutModal.classList.remove("active");
            checkoutModal.setAttribute("aria-hidden", "true");
            document.body.style.overflow = "";
        }
        // Reset form visual state after closed
        setTimeout(() => {
            if (checkoutForm) checkoutForm.style.display = "block";
            if (checkoutSuccessView) checkoutSuccessView.style.display = "none";
        }, 400);
    }

    if (checkoutBtn && checkoutModal) {
        checkoutBtn.addEventListener("click", () => {
            if (cart.length === 0) return;
            closeCartDrawer();
            
            // Render Order Summary inside checkout modal
            if (checkoutSummaryItemsList) {
                checkoutSummaryItemsList.innerHTML = "";
                cart.forEach(item => {
                    const itemDiv = document.createElement("div");
                    itemDiv.style.display = "flex";
                    itemDiv.style.justify = "space-between";
                    itemDiv.style.fontSize = "0.85rem";
                    itemDiv.style.color = "var(--color-text-dark)";
                    itemDiv.innerHTML = `
                        <span>${item.title} <strong>&times; ${item.quantity}</strong></span>
                        <span>${formatPrice(item.price * item.quantity, currentCurrency)}</span>
                    `;
                    checkoutSummaryItemsList.appendChild(itemDiv);
                });
            }

            if (checkoutTotalVal) {
                const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
                checkoutTotalVal.textContent = formatPrice(subtotal, currentCurrency);
            }

            checkoutModal.classList.add("active");
            checkoutModal.setAttribute("aria-hidden", "false");
            document.body.style.overflow = "hidden";
        });
    }

    if (closeCheckoutBtn) {
        closeCheckoutBtn.addEventListener("click", closeCheckoutModal);
    }

    if (closeSuccessBtn) {
        closeSuccessBtn.addEventListener("click", closeCheckoutModal);
    }

    // Modal backdrop click closes the checkout modal
    if (checkoutModal) {
        checkoutModal.addEventListener("click", (e) => {
            if (e.target === checkoutModal) {
                closeCheckoutModal();
            }
        });
    }

    // Checkout form submission simulator
    if (checkoutForm && checkoutSuccessView && orderNumberVal) {
        checkoutForm.addEventListener("submit", (e) => {
            e.preventDefault();
            
            // Generate mock WooCommerce order number
            const orderNum = "#SW-" + Math.floor(10000 + Math.random() * 90000);
            orderNumberVal.textContent = orderNum;
            
            // Toggle form off and success screen on
            checkoutForm.style.display = "none";
            checkoutSuccessView.style.display = "block";
            
            // Empty shopping cart state
            cart = [];
            updateCartUI();
        });
    }
}

// Setup Reviews submission and modal controllers
function setupReviews() {
    const openReviewBtn = document.getElementById("open-add-review-btn");
    const reviewModal = document.getElementById("add-review-modal");
    const closeReviewBtn = document.getElementById("close-review-modal-btn");
    const reviewForm = document.getElementById("add-review-form");
    const reviewsGrid = document.getElementById("reviews-display-grid");

    function openReviewModal() {
        if (reviewModal) {
            reviewModal.classList.add("active");
            reviewModal.setAttribute("aria-hidden", "false");
            document.body.style.overflow = "hidden";
        }
    }

    function closeReviewModal() {
        if (reviewModal) {
            reviewModal.classList.remove("active");
            reviewModal.setAttribute("aria-hidden", "true");
            document.body.style.overflow = "";
        }
    }

    if (openReviewBtn) openReviewBtn.addEventListener("click", openReviewModal);
    if (closeReviewBtn) closeReviewBtn.addEventListener("click", closeReviewModal);
    if (reviewModal) {
        reviewModal.addEventListener("click", (e) => {
            if (e.target === reviewModal) {
                closeReviewModal();
            }
        });
    }

    if (reviewForm && reviewsGrid) {
        reviewForm.addEventListener("submit", (e) => {
            e.preventDefault();
            
            const name = document.getElementById("rev-name").value.trim();
            const location = document.getElementById("rev-location").value.trim();
            const starCount = parseInt(document.getElementById("rev-stars").value, 10);
            const text = document.getElementById("rev-text").value.trim();

            if (!name || !location || !text) return;

            // Generate stars string
            let stars = "";
            for (let i = 0; i < 5; i++) {
                stars += i < starCount ? "★" : "☆";
            }

            // Create new review card element
            const card = document.createElement("div");
            card.className = "review-card";
            card.innerHTML = `
                <div class="review-stars">${stars}</div>
                <p class="review-text">"${text}"</p>
                <h4 class="review-author">${name}</h4>
                <span class="review-designation">Patron from ${location}</span>
            `;

            // Prepend new card to the grid
            reviewsGrid.insertBefore(card, reviewsGrid.firstChild);

            // Clean up
            reviewForm.reset();
            closeReviewModal();
        });
    }
}

// Track active ID when opening the modal
const originalOpenLookModal = openLookModal;
openLookModal = function(lookId) {
    activeLookId = lookId;
    originalOpenLookModal(lookId);
};

// Initialize on startup
function init() {
    renderLookbookGrid();
    updateAllPrices("INR");
    applyVisibility();
    setupWooCommerceActions();
    setupReviews();
}

// Override updateAllPrices to trigger cart UI refresh too (for correct currency symbols inside the cart drawer!)
const originalUpdateAllPrices = updateAllPrices;
updateAllPrices = function(currency) {
    originalUpdateAllPrices(currency);
    updateCartUI();
};
if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
} else {
    init();
}
