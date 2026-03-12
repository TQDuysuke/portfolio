document.addEventListener('DOMContentLoaded', () => {
    // 1. Navbar Scroll Effect
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // 2. Dynamic Gallery Loading
    const galleryContainer = document.getElementById('gallery-container');
    const images = [
        { src: 'images/street_ (1).jpg', title: 'Street Life I', category: 'Street' },
        { src: 'images/street_ (2).jpg', title: 'Street Life II', category: 'Street' },
        { src: 'images/street_ (3).jpg', title: 'Moment', category: 'Moment' },
        { src: 'images/chilling_vibe_ (1).jpg', title: 'Vibe I', category: 'Mood' },
        { src: 'images/chilling_vibe_ (2).jpg', title: 'Vibe II', category: 'Mood' },
        { src: 'images/chilling_vibe_ (3).jpg', title: 'Vibe III', category: 'Mood' },
        { src: 'images/embe_ (1).jpg', title: 'Childhood I', category: 'Portrait' },
        { src: 'images/embe_ (2).jpg', title: 'Childhood II', category: 'Portrait' },
        { src: 'images/tre_em.jpg', title: 'Childhood III', category: 'Portrait' },
        { src: 'images/tot_nghiep_ (1).jpg', title: 'Graduation I', category: 'Event' },
        { src: 'images/tot_nghiep_ (2).jpg', title: 'Graduation II', category: 'Event' },
        { src: 'images/Lighting_ (1).png', title: 'Studio Light I', category: 'Lighting' },
        { src: 'images/Lighting_ (2).png', title: 'Studio Light II', category: 'Lighting' },
    ];

    const loadGallery = () => {
        if (!galleryContainer) return;
        
        images.forEach((img, index) => {
            const item = document.createElement('div');
            item.className = 'gallery-item reveal';
            
            // Randomly assign spanning classes for masonry look
            if (index % 3 === 0) item.style.gridRow = 'span 1.5';
            
            item.innerHTML = `
                <img src="${img.src}" alt="${img.title}" loading="lazy">
                <div class="gallery-overlay">
                    <span class="tag">${img.category}</span>
                    <h3>${img.title}</h3>
                </div>
            `;
            galleryContainer.appendChild(item);
        });
    };

    loadGallery();

    // 3. Scroll Reveal Animation
    const revealElements = () => {
        const reveals = document.querySelectorAll('.reveal');
        const windowHeight = window.innerHeight;
        const revealPoint = 150;

        reveals.forEach(el => {
            const revealTop = el.getBoundingClientRect().top;
            if (revealTop < windowHeight - revealPoint) {
                el.classList.add('active');
            }
        });
    };

    window.addEventListener('scroll', revealElements);
    // Initial call
    setTimeout(revealElements, 100);

    // 4. Smooth Scrolling for Nav Links (Reinforcement)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 70,
                    behavior: 'smooth'
                });
            }
        });
    });

    // 5. Dynamic Age / Experience (Optional Polish)
    // Born: 25/11/2003
    const birthDate = new Date(2003, 10, 25); // Months are 0-indexed
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    
    console.log(`Current age: ${age}`);
});
