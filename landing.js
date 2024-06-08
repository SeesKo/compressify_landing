document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('nav ul li a');

    // Force regular links to open in new tabs
    document.querySelectorAll('a').forEach(link => {
        if (!link.closest('nav')) { // Check if the link is not within the navigation menu
            link.setAttribute('target', '_blank');
        }
    });

    for (let link of navLinks) {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);

            window.scrollTo({
                top: targetSection.offsetTop - 60, // Adjust for fixed header height
                behavior: 'smooth'
            });

            // Update active class
            updateActiveClass(this);
        });
    }

    // Function to update active class
    function updateActiveClass(activeLink) {
        navLinks.forEach(link => link.classList.remove('active'));
        activeLink.classList.add('active');
    }

    // Update active class on scroll
    window.addEventListener('scroll', function() {
        let current = '';

        navLinks.forEach(link => {
            const section = document.querySelector(link.getAttribute('href'));
            const sectionTop = section.offsetTop - 60;
            const sectionHeight = section.offsetHeight;

            if (pageYOffset >= sectionTop && pageYOffset < sectionTop + sectionHeight) {
                current = link.getAttribute('href');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === current) {
                link.classList.add('active');
            }
        });
    });

    // Update current year using JavaScript
    document.getElementById('currentYear').textContent = new Date().getFullYear();
});
