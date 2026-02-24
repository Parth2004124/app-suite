document.addEventListener('DOMContentLoaded', () => {
    // Scroll Reveal Observer
    const revealElements = document.querySelectorAll('.scroll-reveal');

    const revealOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;

            entry.target.classList.add('visible');

            // Re-trigger CSS animations for children if needed
            const svgLine = entry.target.querySelector('.active-line');
            if (svgLine) {
                // simple hack to restart svg animation on scroll
                svgLine.style.animation = 'none';
                svgLine.offsetHeight; // trigger reflow
                svgLine.style.animation = null;
            }

            // Observer stops once revealed
            observer.unobserve(entry.target);
        });
    }, revealOptions);

    revealElements.forEach(el => {
        revealObserver.observe(el);
    });

    // Parallax effect on glow-bg
    const bg = document.querySelector('.glow-bg');
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        bg.style.transform = `translateY(${scrolled * 0.3}px)`;
    });
});
