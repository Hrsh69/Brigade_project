const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('nav');
const dropdowns = document.querySelectorAll('.dropdown');

menuToggle.addEventListener('click', () => {
    nav.classList.toggle('active');
    menuToggle.classList.toggle('active');
});

document.addEventListener('click', (e) => {
    if (!nav.contains(e.target) && !menuToggle.contains(e.target)) {
        nav.classList.remove('active');
        menuToggle.classList.remove('active');
    }
});

dropdowns.forEach(dropdown => {
    const dropbtn = dropdown.querySelector('.dropbtn');
    
    dropbtn.addEventListener('click', (e) => {
        if (window.innerWidth <= 768) {
            e.preventDefault();
            dropdown.classList.toggle('active');
        }
    });
});

document.querySelectorAll('nav a').forEach(link => {
    link.addEventListener('click', () => {
        if (window.innerWidth <= 768) {
            nav.classList.remove('active');
            menuToggle.classList.remove('active');
        }
    });
});

window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    if (window.scrollY > 50) {
        header.style.backgroundColor = 'rgba(30, 58, 138, 0.95)';
    } else {
        header.style.backgroundColor = '#1e3a8a';
    }
});

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            
            if (window.innerWidth <= 768) {
                nav.classList.remove('active');
                menuToggle.classList.remove('active');
            }
        }
    });
});


const contactForm = document.getElementById('contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        
        const formData = new FormData(this);
        const data = Object.fromEntries(formData);
        
        
        const submitBtn = this.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        submitBtn.disabled = true;
        
        
        setTimeout(() => {
            console.log('Form submitted:', data);
            
            const successMessage = document.createElement('div');
            successMessage.className = 'success-message';
            successMessage.innerHTML = `
                <i class="fas fa-check-circle"></i>
                <p>Thank you for your message! We will get back to you soon.</p>
            `;
            successMessage.style.cssText = `
                position: fixed;
                top: 20px;
                right: 20px;
                background: #2ecc71;
                color: white;
                padding: 1rem 2rem;
                border-radius: 10px;
                display: flex;
                align-items: center;
                gap: 1rem;
                box-shadow: 0 4px 12px rgba(0,0,0,0.1);
                transform: translateX(120%);
                transition: transform 0.3s ease;
                z-index: 1000;
            `;
            
            document.body.appendChild(successMessage);
            
            setTimeout(() => {
                successMessage.style.transform = 'translateX(0)';
            }, 100);
            
            setTimeout(() => {
                successMessage.style.transform = 'translateX(120%)';
                setTimeout(() => {
                    successMessage.remove();
                }, 300);
            }, 3000);
            
            this.reset();
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        }, 1500);
    });
}

const createScrollTopButton = () => {
    const button = document.createElement('button');
    button.innerHTML = '<i class="fas fa-arrow-up"></i>';
    button.className = 'scroll-top';
    button.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        background: var(--secondary-color);
        color: white;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        border: none;
        cursor: pointer;
        display: none;
        font-size: 1.2rem;
        z-index: 1000;
        transition: all 0.3s ease;
        box-shadow: 0 4px 12px rgba(0,0,0,0.1);
    `;
    
    document.body.appendChild(button);
    
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            button.style.display = 'flex';
            button.style.alignItems = 'center';
            button.style.justifyContent = 'center';
        } else {
            button.style.display = 'none';
        }
    });
    
    button.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    button.addEventListener('mouseover', () => {
        button.style.transform = 'translateY(-5px)';
        button.style.background = '#2980b9';
    });
    
    button.addEventListener('mouseout', () => {
        button.style.transform = 'translateY(0)';
        button.style.background = 'var(--secondary-color)';
    });
};

createScrollTopButton();

const createLightbox = () => {
    const lightbox = document.createElement('div');
    lightbox.className = 'lightbox';
    lightbox.style.cssText = `
        display: none;
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.9);
        z-index: 1000;
        justify-content: center;
        align-items: center;
        opacity: 0;
        transition: opacity 0.3s ease;
    `;
    
    const img = document.createElement('img');
    img.style.cssText = `
        max-width: 90%;
        max-height: 90vh;
        object-fit: contain;
        transform: scale(0.9);
        transition: transform 0.3s ease;
    `;
    
    const closeBtn = document.createElement('button');
    closeBtn.innerHTML = '<i class="fas fa-times"></i>';
    closeBtn.style.cssText = `
        position: absolute;
        top: 20px;
        right: 20px;
        background: none;
        border: none;
        color: white;
        font-size: 2rem;
        cursor: pointer;
        transition: transform 0.3s ease;
    `;
    
    lightbox.appendChild(img);
    lightbox.appendChild(closeBtn);
    document.body.appendChild(lightbox);
    
    document.querySelectorAll('.gallery-item').forEach(galleryItem => {
        galleryItem.style.cursor = 'pointer';
        galleryItem.addEventListener('click', () => {
            const galleryImg = galleryItem.querySelector('img');
            img.src = galleryImg.src;
            lightbox.style.display = 'flex';
            setTimeout(() => {
                lightbox.style.opacity = '1';
                img.style.transform = 'scale(1)';
            }, 10);
        });
    });
    
    const closeLightbox = () => {
        lightbox.style.opacity = '0';
        img.style.transform = 'scale(0.9)';
        setTimeout(() => {
            lightbox.style.display = 'none';
        }, 300);
    };
    
    closeBtn.addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });
    
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && lightbox.style.display === 'flex') {
            closeLightbox();
        }
    });
};

createLightbox();

const animateOnScroll = () => {
    const elements = document.querySelectorAll('.amenity-card, .gallery-item, .contact-container > *');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    elements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(element);
    });
};

animateOnScroll();

const heroSection = document.querySelector('.hero');
if (heroSection) {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        heroSection.style.backgroundPositionY = `${scrolled * 0.5}px`;
    });
}

// Header scroll behavior
let lastScroll = 0;
const header = document.querySelector('.header');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll <= 0) {
        header.classList.remove('hide');
        return;
    }
    
    if (currentScroll > lastScroll && !header.classList.contains('hide')) {
        // Scrolling down
        header.classList.add('hide');
    } else if (currentScroll < lastScroll && header.classList.contains('hide')) {
        // Scrolling up
        header.classList.remove('hide');
    }
    
    lastScroll = currentScroll;
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
}); 
const path = window.location.pathname.split('/').pop();
document.querySelectorAll('.nav-links a').forEach(link => {
  if (link.getAttribute('href') === path) {
    link.classList.add('active');
  }
});