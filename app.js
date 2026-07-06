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
        outfit: "Pastel pink cotton chikankari kurta with white palazzo pants",
        jewelry: "Delicate silver oxidized jhumkas and a sleek silver bracelet",
        setting: "Bright, sunny outdoor cafe in Chandigarh",
        mood: "Confident, serene, and smiling softly at the camera",
        image: "assets/look1.jpg",
        basePrice: 2933,
        discountPrice: 2200,
        discountPercent: 25
    },
    "2": {
        num: "Look 02",
        title: "Mint Green Floral Walk",
        outfit: "Mint green floral printed kurti with matching cotton pants",
        jewelry: "Minimalist gold hoops and a thin chain necklace",
        setting: "Walking down a breezy, sunlit tree-lined street",
        mood: "Casual, happy, and effortlessly chic",
        image: "assets/look2.jpg",
        basePrice: 2667,
        discountPrice: 2000,
        discountPercent: 25
    },
    "3": {
        num: "Look 03",
        title: "Rust Georgette Midi-Saree",
        outfit: "Rust-colored georgette midi-saree with a solid black sleeveless blouse",
        jewelry: "Stacked thin metallic bangles on one wrist",
        setting: "Standing against a textured, minimalist wall",
        mood: "Retro, relaxed, and introspective",
        image: "assets/look3.jpg",
        basePrice: 4267,
        discountPrice: 3200,
        discountPercent: 25
    },
    "4": {
        num: "Look 04",
        title: "Yellow Block-Print Anarkali",
        outfit: "Bright yellow block-print cotton Anarkali suit with a sheer dupatta",
        jewelry: "Pearl studs and a small, delicate bindi",
        setting: "Indoor setting near a large arched window with soft light",
        mood: "Joyful, elegant, and looking over the shoulder",
        image: "assets/look4.jpg",
        basePrice: 8125,
        discountPrice: 6500,
        discountPercent: 20
    },
    "5": {
        num: "Look 05",
        title: "Navy Blue Threadwork Straight Cut",
        outfit: "Navy blue straight-cut kurta with silver threadwork and white churidar",
        jewelry: "Thin silver rings and small dangler earrings",
        setting: "Modern, minimalist balcony with potted green plants",
        mood: "Poised, professional, and graceful",
        image: "assets/look5.jpg",
        basePrice: 3333,
        discountPrice: 2500,
        discountPercent: 25
    },
    "6": {
        num: "Look 06",
        title: "Ivory Handloom Linen Kurta",
        outfit: "Ivory handloom linen kurta with beige cigarette pants and a lightweight woven dupatta",
        jewelry: "Tiny pearl drop earrings and a slim gold watch",
        setting: "Modern courtyard with sandstone walls and soft morning sunlight",
        mood: "Calm, sophisticated, and naturally smiling",
        image: "assets/look6.jpg",
        basePrice: 6250,
        discountPrice: 5000,
        discountPercent: 20
    },
    "7": {
        num: "Look 07",
        title: "Maroon Velvet Haveli Festive",
        outfit: "Deep maroon velvet kurta with subtle embroidery paired with cream straight pants",
        jewelry: "Antique gold jhumkas and a delicate statement ring",
        setting: "Heritage haveli corridor with warm golden lighting",
        mood: "Festive, confident, and graceful",
        image: "assets/look7.jpg",
        basePrice: 8750,
        discountPrice: 7000,
        discountPercent: 20
    },
    "8": {
        num: "Look 08",
        title: "Lavender Organza Garden Dream",
        outfit: "Lavender organza embroidered suit with matching palazzo pants and a sheer dupatta",
        jewelry: "Crystal stud earrings and a minimalist bracelet",
        setting: "Flower-filled garden during golden hour",
        mood: "Dreamy, elegant, and looking slightly away from the camera",
        image: "assets/look8.jpg",
        basePrice: 8750,
        discountPrice: 7000,
        discountPercent: 20
    },
    "9": {
        num: "Look 09",
        title: "Teal Ajrakh Artisan Classic",
        outfit: "Teal Ajrakh printed A-line kurta with off-white cotton trousers",
        jewelry: "Oxidized silver choker and matching stud earrings",
        setting: "Cozy artisan café with hand-painted wall accents",
        mood: "Artistic, confident, and effortlessly stylish",
        image: "assets/look9.jpg",
        basePrice: 6667,
        discountPrice: 6000,
        discountPercent: 10
    },
    "10": {
        num: "Look 10",
        title: "Champagne Beige Hotel Luxury",
        outfit: "Champagne beige silk kurta set with matching trousers and an embellished stole",
        jewelry: "Fine gold chain and matching drop earrings",
        setting: "Luxurious boutique hotel lobby with grand arches",
        mood: "Poised, regal, and naturally smiling",
        image: "assets/look10.jpg",
        basePrice: 6250,
        discountPrice: 5000,
        discountPercent: 20,
        isNewArrival: true
    },
    "11": {
        num: "Look 11",
        title: "Powder Blue Angrakha Freshness",
        outfit: "Powder blue cotton Angrakha kurta with white flared palazzo pants",
        jewelry: "Silver anklet, minimalist hoops, and a slim bracelet",
        setting: "Charming old-city lane with pastel architecture and blooming bougainvillea",
        mood: "Carefree, fresh, and mid-walk with a natural smile",
        image: "assets/look11.jpg",
        basePrice: 2667,
        discountPrice: 2000,
        discountPercent: 25
    },
    "12": {
        num: "Look 12",
        title: "Emerald Banarasi Regal Touch",
        outfit: "Emerald green Banarasi tissue kurta with ivory straight-fit pants and a lightweight dupatta",
        jewelry: "Emerald stone studs, a thin gold bangle, and a small bindi",
        setting: "Luxurious indoor lounge with arched doorways, neutral décor, and soft natural light",
        mood: "Regal, elegant, and making gentle eye contact with the camera",
        image: "assets/look12.jpg",
        basePrice: 7500,
        discountPrice: 6000,
        discountPercent: 20,
        isNewArrival: true
    },
    "13": {
        num: "Look 13",
        title: "Sky Blue Cafe Chic",
        outfit: "Sky blue striped cotton kurta with white ankle-length pants",
        jewelry: "Small silver hoops, a delicate bracelet, and a simple tote bag",
        setting: "Sunlit neighborhood café with outdoor seating and greenery",
        mood: "Fresh, cheerful, and effortlessly stylish",
        image: "assets/look13.jpg",
        basePrice: 3200,
        discountPrice: 2400,
        discountPercent: 25,
        isNewArrival: true
    },
    "14": {
        num: "Look 14",
        title: "Sage Green Balcony Calm",
        outfit: "Sage green linen co-ord kurta set with straight-fit pants",
        jewelry: "Minimalist gold studs, a slim watch, and a fine chain necklace",
        setting: "Modern home balcony with potted plants and soft morning light",
        mood: "Relaxed, confident, and naturally smiling",
        image: "assets/look14.jpg",
        basePrice: 3200,
        discountPrice: 2400,
        discountPercent: 25,
        isNewArrival: true
    },
    "15": {
        num: "Look 15",
        title: "Peach Floral Literary Elegance",
        outfit: "Peach floral cotton A-line kurta with ivory cigarette pants",
        jewelry: "Pearl stud earrings and a thin silver ring",
        setting: "Bookstore with wooden shelves and large windows",
        mood: "Warm, approachable, and casually elegant",
        image: "assets/look15.jpg",
        basePrice: 3200,
        discountPrice: 2400,
        discountPercent: 25
    },
    "16": {
        num: "Look 16",
        title: "Beige Handblock Park Pathway",
        outfit: "Beige handblock printed kurta with olive straight pants and a lightweight cotton dupatta",
        jewelry: "Oxidized silver studs and a slim bangle",
        setting: "Quiet park pathway lined with lush green trees",
        mood: "Calm, graceful, and looking away candidly",
        image: "assets/look16.jpg",
        basePrice: 2933,
        discountPrice: 2200,
        discountPercent: 25
    },
    "17": {
        num: "Look 17",
        title: "Wine Embroidered Grand Ballroom",
        outfit: "Wine-colored embroidered silk Anarkali with a flowing organza dupatta",
        jewelry: "Statement chandelier earrings, stacked bangles, and a jeweled ring",
        setting: "Grand ballroom with crystal chandeliers and warm golden lighting",
        mood: "Glamorous, confident, and poised",
        image: "assets/look17.jpg",
        basePrice: 10000,
        discountPrice: 9000,
        discountPercent: 10
    },
    "18": {
        num: "Look 18",
        title: "Black Sequin Rooftop Night",
        outfit: "Black sequin saree with a sleeveless embellished blouse",
        jewelry: "Diamond-style drop earrings, a sleek bracelet, and a bold cocktail ring",
        setting: "Rooftop lounge at night with city lights in the background",
        mood: "Bold, luxurious, and making direct eye contact with the camera",
        image: "assets/look18.jpg",
        basePrice: 11111,
        discountPrice: 10000,
        discountPercent: 10
    },
    "19": {
        num: "Look 19",
        title: "Champagne Gold Palace Sharara",
        outfit: "Champagne gold embellished sharara set with intricate mirror work and a sheer dupatta",
        jewelry: "Layered kundan necklace, matching earrings, and elegant bangles",
        setting: "Luxury heritage palace entrance illuminated with warm evening lights",
        mood: "Regal, radiant, and smiling confidently",
        image: "assets/look19.jpg",
        basePrice: 9444,
        discountPrice: 8500,
        discountPercent: 10,
        isNewArrival: true
    }
};

// Modal Elements
const modal = document.getElementById("details-modal");
const modalImg = document.getElementById("modal-img");
const modalLookNum = document.getElementById("modal-look-num");
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
    modalImg.alt = data.title;
    modalLookNum.textContent = data.num;
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

// Arch Portal Style Selector Logic
const archButtons = document.querySelectorAll(".arch-btn");
const heroSection = document.querySelector(".hero");
if (archButtons && heroSection) {
    archButtons.forEach(btn => {
        btn.addEventListener("click", () => {
            archButtons.forEach(b => b.classList.remove("active"));
            btn.classList.add("active");
            
            const shape = btn.getAttribute("data-shape");
            heroSection.classList.remove("arch-mughal", "arch-jaipur", "arch-classical", "arch-flat");
            heroSection.classList.add("arch-" + shape);
        });
    });
}

// Close Modal function
function closeLookModal() {
    modal.classList.remove("active");
    modal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = ""; // Restore background scroll
}

// Event Listeners for Look Cards
document.querySelectorAll(".look-card").forEach(card => {
    card.addEventListener("click", () => {
        const lookId = card.getAttribute("data-look");
        openLookModal(lookId);
    });
});

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

    // Checkout simulator
    const checkoutBtn = document.getElementById("cart-checkout-btn");
    if (checkoutBtn) {
        checkoutBtn.addEventListener("click", () => {
            if (cart.length === 0) return;
            alert("Proceeding to secure checkout under WooCommerce headless integrations...");
            cart = [];
            updateCartUI();
            closeCartDrawer();
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
    updateAllPrices("INR");
    applyVisibility();
    setupWooCommerceActions();
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
