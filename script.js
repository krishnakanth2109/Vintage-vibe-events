   document.addEventListener('DOMContentLoaded', function() {
            // Mobile Menu Toggle
            const mobileMenuBtn = document.getElementById('menuBtn');
            const navLinks = document.getElementById('navLinks');
            const body = document.body;
            
            if (mobileMenuBtn && navLinks) {
                mobileMenuBtn.addEventListener('click', () => {
                    const isActive = navLinks.classList.toggle('active');
                    mobileMenuBtn.setAttribute('aria-expanded', isActive);
                    mobileMenuBtn.innerHTML = isActive ? 
                        '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
                    body.style.overflow = isActive ? 'hidden' : ''; 
                });
            }
            
            document.querySelectorAll('a[href^="#"]').forEach(anchor => {
                anchor.addEventListener('click', function(e) {
                    e.preventDefault();
                    const targetId = this.getAttribute('href');
                    const targetElement = document.querySelector(targetId);

                    if (targetElement) {
                        const headerOffset = document.getElementById('header').offsetHeight;
                        const elementPosition = targetElement.getBoundingClientRect().top;
                        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                        window.scrollTo({
                            top: offsetPosition,
                            behavior: 'smooth'
                        });
                    }
                    
                    if (navLinks && navLinks.classList.contains('active')) {
                        navLinks.classList.remove('active');
                        mobileMenuBtn.setAttribute('aria-expanded', 'false');
                        mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
                        body.style.overflow = '';
                    }
                });
            });
            
            const header = document.getElementById('header');
            if (header) {
                window.addEventListener('scroll', () => {
                    if (window.scrollY > 50) {
                        header.classList.add('scrolled');
                    } else {
                        header.classList.remove('scrolled');
                    }
                });
            }
            
            // Intersection Observer for animations
            const revealElements = document.querySelectorAll('.reveal');
            const revealObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('visible');
                        // Optional: Unobserve after revealing to save resources
                        // observer.unobserve(entry.target); 
                    }
                });
            }, { threshold: 0.1 }); 

            revealElements.forEach(el => {
                revealObserver.observe(el);
            });


            const filterBtns = document.querySelectorAll('.filter-btn');
            const portfolioItems = document.querySelectorAll('.portfolio-item');
            
            if (filterBtns.length > 0 && portfolioItems.length > 0) {
                filterBtns.forEach(btn => {
                    btn.addEventListener('click', () => {
                        filterBtns.forEach(b => b.classList.remove('active'));
                        btn.classList.add('active');
                        
                        const filter = btn.getAttribute('data-filter');
                        
                        portfolioItems.forEach(item => {
                            item.style.display = 'none'; 
                            item.classList.remove('visible'); 
                            if (filter === 'all' || item.getAttribute('data-category') === filter) {
                                item.style.animation = 'fadeInPortfolio 0.5s ease forwards';
                                item.style.display = 'block';
                                void item.offsetWidth; 
                                item.classList.add('visible'); 
                            } else {
                                item.style.animation = ''; 
                            }
                        });
                    });
                });
                portfolioItems.forEach(item => {
                    item.style.display = 'block';
                });
            }
            const styleSheet = document.createElement("style");
            styleSheet.type = "text/css";
            styleSheet.innerText = `@keyframes fadeInPortfolio { 
                from { opacity: 0; transform: scale(0.95) translateY(10px); } 
                to { opacity: 1; transform: scale(1) translateY(0); } 
            }`;
            document.head.appendChild(styleSheet);

            
            const enquiryForm = document.getElementById('enquiryForm');
            const successModal = document.getElementById('successModal');
            const closeModalIcon = document.getElementById('closeModalIcon'); 
            const closeModalBtn = document.getElementById('closeModalBtn');
            const modalTitle = document.getElementById('modalTitle');
            const modalMessage = document.getElementById('modalMessage');
            
            function showSuccessModal(title, message) {
                if(modalTitle) modalTitle.textContent = title;
                if(modalMessage) modalMessage.textContent = message;
                if(successModal) successModal.classList.add('active');
                body.style.overflow = 'hidden'; 
            }

            function hideModal() {
                if(successModal) successModal.classList.remove('active');
                body.style.overflow = ''; 
            }

            if (enquiryForm) {
                enquiryForm.addEventListener('submit', function(e) {
                    e.preventDefault();
                    let isValid = true;
                    this.querySelectorAll('[required]').forEach(input => {
                        if (!input.value.trim()) {
                            isValid = false;
                            input.style.borderColor = 'red'; 
                        } else {
                            input.style.borderColor = '#D1D5DB'; 
                        }
                    });

                    if (!isValid) {
                        showSuccessModal('Incomplete Form', 'Please fill in all required fields.');
                        return;
                    }
                    
                    setTimeout(() => {
                        showSuccessModal('Enquiry Sent!', "Thank you for your interest. We'll contact you shortly!");
                        this.reset();
                    }, 500);
                });
            }

            const newsletterForm = document.getElementById('newsletterForm');
            if (newsletterForm) {
                newsletterForm.addEventListener('submit', function(e) {
                    e.preventDefault();
                    const emailInput = this.querySelector('.newsletter-input');
                    if (emailInput && emailInput.value.trim() !== '' && emailInput.checkValidity()) {
                         showSuccessModal('Subscribed!', 'Thank you for subscribing to our newsletter.');
                        this.reset();
                    } else {
                        showSuccessModal('Invalid Email', 'Please enter a valid email address to subscribe.');
                        if(emailInput) emailInput.focus();
                    }
                });
            }
            
            if(closeModalIcon) closeModalIcon.addEventListener('click', hideModal);
            if(closeModalBtn) closeModalBtn.addEventListener('click', hideModal);
            
            window.addEventListener('click', (e) => {
                if (e.target === successModal) {
                    hideModal();
                }
            });
             window.addEventListener('keydown', (e) => {
                if (e.key === 'Escape' && successModal && successModal.classList.contains('active')) {
                    hideModal();
                }
            });
            
            const testimonials = [
                {
                    text: "Vintage Vibe Events transformed our wedding venue into a magical wonderland. Their attention to detail and creative vision exceeded all our expectations. Every guest complimented the beautiful decor!",
                    name: "Priya Sharma",
                    role: "Wedding Client",
                    image: "https://randomuser.me/api/portraits/women/32.jpg"
                },
                {
                    text: "The haldi ceremony decor was absolutely stunning! The team understood our vision perfectly and executed it beautifully. Highly recommend their services for any special occasion.",
                    name: "Rahul Kapoor",
                    role: "Groom",
                    image: "https://randomuser.me/api/portraits/men/44.jpg"
                },
                {
                    text: "Our corporate anniversary event was elevated to another level with Sreemantam's elegant decor. Professional, creative, and punctual - everything we could ask for!",
                    name: "Neha Patel",
                    role: "Corporate Client",
                    image: "https://randomuser.me/api/portraits/women/68.jpg"
                }
            ];
            
            let currentTestimonial = 0;
            const testimonialElement = document.querySelector('.testimonial');
            
            function showTestimonial(index) {
                if (!testimonialElement) return; 
                const testimonial = testimonials[index];
                testimonialElement.style.animation = ''; 
                void testimonialElement.offsetWidth; 

                testimonialElement.innerHTML = `
                    <p class="testimonial-text">${testimonial.text}</p>
                    <div class="testimonial-author">
                        <img src="${testimonial.image}" alt="${testimonial.name}" class="author-img">
                        <div class="author-info">
                            <h4>${testimonial.name}</h4>
                            <p>${testimonial.role}</p>
                        </div>
                    </div>
                `;
                
                testimonialElement.style.animation = 'fadeInTestimonial 0.7s ease-in-out forwards';
            }
            
            if (testimonialElement && testimonials.length > 0) {
                showTestimonial(currentTestimonial); 
                setInterval(() => {
                    currentTestimonial = (currentTestimonial + 1) % testimonials.length;
                    showTestimonial(currentTestimonial);
                }, 7000); 
            }

            const dateInput = document.getElementById('date');
            if (dateInput) {
                const today = new Date().toISOString().split('T')[0];
                dateInput.setAttribute('min', today);
            }

            const yearSpan = document.getElementById('currentYear');
            if(yearSpan) {
                yearSpan.textContent = new Date().getFullYear();
            }
        });