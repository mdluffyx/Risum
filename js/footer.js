// Generate Footer Content
function generateFooter() {
    const footer = document.createElement('footer');
    footer.className = 'bg-gray-800 text-white py-8';
    
    const container = document.createElement('div');
    container.className = 'container mx-auto px-4';
    
    const content = document.createElement('div');
    content.className = 'flex flex-col md:flex-row justify-between items-center';
    
    // Copyright section
    const copyrightDiv = document.createElement('div');
    copyrightDiv.className = 'mb-4 md:mb-0 flex items-center space-x-4';
    
    // Add logo
    const logo = document.createElement('img');
    logo.src = '../logo_name.png'; // Try using the other logo file
    logo.alt = 'Risum Logo';
    logo.className = 'h-8 w-auto'; // Keep existing size classes
    
    const copyrightText = document.createElement('p');
    const yearSpan = document.createElement('span');
    yearSpan.id = 'copyright-year';
    yearSpan.textContent = new Date().getFullYear();
    copyrightText.innerHTML = `&copy; ${yearSpan.outerHTML} Risum. All rights reserved.`;
    
    copyrightDiv.appendChild(logo);
    copyrightDiv.appendChild(copyrightText);
    
    // Social media section
    const socialDiv = document.createElement('div');
    socialDiv.className = 'flex space-x-4';
    
    const socialPlatforms = [
        { platform: 'facebook', url: 'https://facebook.com/risumdentistry', icon: 'fa-facebook-f' },
        { platform: 'instagram', url: 'https://instagram.com/risumdentistry', icon: 'fa-instagram' },
        { platform: 'twitter', url: 'https://twitter.com/risumdentistry', icon: 'fa-twitter' },
        { platform: 'linkedin', url: 'https://linkedin.com/company/risumdentistry', icon: 'fa-linkedin-in' }
    ];
    
    socialPlatforms.forEach(social => {
        const link = document.createElement('a');
        link.href = social.url;
        link.className = 'social-link text-white hover:text-blue-400 transition-colors duration-200';
        link.setAttribute('data-platform', social.platform);
        link.innerHTML = `<i class="fab ${social.icon} text-xl"></i>`;
        socialDiv.appendChild(link);
    });
    
    // Legal links
    const legalDiv = document.createElement('div');
    legalDiv.className = 'flex space-x-4 mt-4 md:mt-0';
    
    const privacyLink = document.createElement('a');
    privacyLink.href = '#';
    privacyLink.className = 'hover:text-blue-400';
    privacyLink.textContent = 'Privacy Policy';
    
    const termsLink = document.createElement('a');
    termsLink.href = '#';
    termsLink.className = 'hover:text-blue-400';
    termsLink.textContent = 'Terms of Service';
    
    legalDiv.appendChild(privacyLink);
    legalDiv.appendChild(termsLink);
    
    // Assemble footer
    content.appendChild(copyrightDiv);
    content.appendChild(socialDiv);
    content.appendChild(legalDiv);
    container.appendChild(content);
    footer.appendChild(container);
    
    // Insert before scripts
    const scripts = document.querySelectorAll('script[src$="footer.js"]');
    if (scripts.length > 0) {
        scripts[0].parentNode.insertBefore(footer, scripts[0]);
    } else {
        document.body.appendChild(footer);
    }
    
    return footer;
}

// Initialize footer
document.addEventListener('DOMContentLoaded', () => {
    generateFooter();

    // Enhanced Social Media Integration
    const socialLinks = document.querySelectorAll('.social-link');
    socialLinks.forEach(link => {
        // Add hover effects
        link.addEventListener('mouseenter', () => {
            link.classList.add('scale-110', 'transition-transform', 'duration-200');
        });
        link.addEventListener('mouseleave', () => {
            link.classList.remove('scale-110');
        });

        // Handle clicks
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const platform = link.getAttribute('data-platform');
            const url = link.getAttribute('href');
            
            // Track social media clicks (in a real app, this would be analytics)
            console.log(`Social media click: ${platform}`);
            
            // Open in new tab with consistent dimensions
            window.open(url, `${platform}_window`, 'width=600,height=400');
        });
    });

    // Initialize social media tooltips if using tooltip library
    if (typeof tippy !== 'undefined') {
        tippy('.social-link', {
            content: (reference) => `Follow us on ${reference.getAttribute('data-platform')}`,
            placement: 'top',
            animation: 'scale',
            arrow: true
        });
    }

    // Newsletter Subscription Form
    const newsletterForm = document.getElementById('newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const emailInput = newsletterForm.querySelector('input[type="email"]');
            
            if (emailInput && emailInput.value) {
                // Here you would typically send to a backend service
                alert('Thanks for subscribing to our newsletter!');
                newsletterForm.reset();
            } else {
                alert('Please enter a valid email address');
            }
        });
    }

    // Back to Top Button (if not in main scripts.js)
    if (!document.getElementById('back-to-top')) {
        const backToTopButton = document.createElement('button');
        backToTopButton.id = 'back-to-top';
        backToTopButton.className = 'fixed bottom-4 right-4 p-3 bg-blue-600 text-white rounded-full hidden';
        backToTopButton.innerHTML = '↑';
        document.body.appendChild(backToTopButton);

        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 300) {
                backToTopButton.classList.remove('hidden');
            } else {
                backToTopButton.classList.add('hidden');
            }
        });

        backToTopButton.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
});
