document.addEventListener("DOMContentLoaded", () => {
    // Mobile Menu Toggle
    const mobileMenuBtn = document.getElementById("mobile-menu-btn");
    const mobileMenu = document.getElementById("mobile-menu");
    const mobileLinks = mobileMenu.querySelectorAll("a");

    mobileMenuBtn.addEventListener("click", () => {
        mobileMenu.classList.toggle("hidden");
    });

    mobileLinks.forEach(link => {
        link.addEventListener("click", () => {
            mobileMenu.classList.add("hidden");
        });
    });

    // Navbar background on scroll and active link mapping
    const navbar = document.getElementById("navbar");
    const sections = document.querySelectorAll("section");
    const navLinks = document.querySelectorAll(".nav-link");

    window.addEventListener("scroll", () => {
        // Navbar shadow
        if (window.scrollY > 50) {
            navbar.classList.add("shadow-lg", "shadow-black/20");
        } else {
            navbar.classList.remove("shadow-lg", "shadow-black/20");
        }

        // Active link highlighting
        let current = "";
        sections.forEach((section) => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollY >= sectionTop - 150) {
                current = section.getAttribute("id");
            }
        });

        navLinks.forEach((link) => {
            link.classList.remove("text-primary");
            if (link.getAttribute("href") === `#${current}`) {
                link.classList.add("text-primary");
            }
        });
    });

    // Scroll Reveal Animation
    const revealElements = document.querySelectorAll(".reveal, .reveal-left, .reveal-right");
    
    const revealOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const revealOnScroll = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                return;
            } else {
                entry.target.classList.add("active");
                observer.unobserve(entry.target);
            }
        });
    }, revealOptions);

    revealElements.forEach(el => {
        revealOnScroll.observe(el);
    });

    // Initial Reveal for elements already in viewport on load
    setTimeout(() => {
        revealElements.forEach(el => {
            const rect = el.getBoundingClientRect();
            if (rect.top < window.innerHeight - 50) {
                el.classList.add("active");
            }
        });
    }, 100);

    // Form submission to WhatsApp
    const form = document.getElementById("contact-form");
    if(form) {
        form.addEventListener("submit", (e) => {
            e.preventDefault();
            
            const name = document.getElementById("name").value.trim();
            const message = document.getElementById("message").value.trim();
            
            if (name && message) {
                const waNumber = "201279437917";
                const text = `Hello Moustafa, my name is ${name}. ${message}`;
                const waUrl = `https://wa.me/${waNumber}?text=${encodeURIComponent(text)}`;
                
                window.open(waUrl, "_blank");
                form.reset();
            }
        });
    }
});
