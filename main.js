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

    // 2. Data Loading & Rendering
    const albumsContainer = document.getElementById('albums-container');
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxCaption = document.getElementById('lightbox-caption');

    const albums = [
        {
            id: 'street',
            title: 'Street Photography',
            icon: 'streetview',
            description: 'Những khoảnh khắc ngẫu nhiên, cuộc sống hối hả nơi góc phố. Giữ trọn vẹn bố cục và cảm xúc nguyên bản.',
            images: [
                { src: 'images/street_ (1).jpg', title: 'Nắng sớm góc phố', filename: 'street_ (1).jpg' },
                { src: 'images/street_ (2).jpg', title: 'Nhịp sống mưu sinh', filename: 'street_ (2).jpg' },
                { src: 'images/street_ (3).jpg', title: 'Khoảnh khắc tĩnh lặng', filename: 'street_ (3).jpg' },
                { src: 'images/chilling_vibe_ (1).jpg', title: 'Chiều hoàng hôn', filename: 'chilling_vibe_ (1).jpg' },
                { src: 'images/chilling_vibe_ (2).jpg', title: 'Góc quán quen', filename: 'chilling_vibe_ (2).jpg' },
                { src: 'images/chilling_vibe_ (3).jpg', title: 'Chill vibes', filename: 'chilling_vibe_ (3).jpg' }
            ]
        },
        {
            id: 'portrait',
            title: 'Portraits & Stories',
            icon: 'face',
            description: 'Ghi lại chân dung và những ánh mắt biết nói. Mỗi khung hình là một câu chuyện riêng biệt.',
            images: [
                { src: 'images/embe_ (1).jpg', title: 'Hồn nhiên', filename: 'embe_ (1).jpg' },
                { src: 'images/embe_ (2).jpg', title: 'Nụ cười trẻ thơ', filename: 'embe_ (2).jpg' },
                { src: 'images/tre_em.jpg', title: 'Ánh mắt', filename: 'tre_em.jpg' },
                { src: 'images/embe_ (3).jpg', title: 'Trong veo', filename: 'embe_ (3).jpg' },
                { src: 'images/embe_ (4).jpg', title: 'Ngây thơ', filename: 'embe_ (4).jpg' }
            ]
        },
        {
            id: 'graduation',
            title: 'Graduation Moments',
            icon: 'school',
            description: 'Kỷ niệm ngày tốt nghiệp và những bước ngoặt quan trọng được lưu giữ trọn vẹn.',
            images: [
                { src: 'images/tot_nghiep_ (1).jpg', title: 'Lễ tốt nghiệp', filename: 'tot_nghiep_ (1).jpg' },
                { src: 'images/tot_nghiep_ (2).jpg', title: 'Nụ cười rạng rỡ', filename: 'tot_nghiep_ (2).jpg' },
                { src: 'images/tot_nghiep_ (3).jpg', title: 'Bạn bè thân yêu', filename: 'tot_nghiep_ (3).jpg' },
                { src: 'images/tot_nghiep_ (4).jpg', title: 'Kỷ niệm khó quên', filename: 'tot_nghiep_ (4).jpg' },
                { src: 'images/tot_nghiep_ (5).jpg', title: 'Cánh cổng tương lai', filename: 'tot_nghiep_ (5).jpg' },
                { src: 'images/tot_nghiep_ (6).jpg', title: 'Thành quả nỗ lực', filename: 'tot_nghiep_ (6).jpg' }
            ]
        }
    ];

    async function initGallery() {
        let metadata = {};
        try {
            const response = await fetch('metadata.json');
            metadata = await response.json();
        } catch (e) {
            console.warn('Could not load EXIF metadata:', e);
        }

        renderAlbums(metadata);
        revealElements();
    }

    const renderAlbums = (metadata) => {
        if (!albumsContainer) return;

        albums.forEach(album => {
            const section = document.createElement('div');
            section.className = 'album-section reveal';

            let imagesHtml = '';
            album.images.forEach((img) => {
                const info = metadata[img.filename];
                const exifHtml = info ? `
                    <div class="exif-info">
                        <span><i class="material-icons-round">camera</i> ${info.camera}</span>
                        <span><i class="material-icons-round">settings_input_component</i> ${info.focal} ${info.aperture} ${info.exposure} ${info.iso}</span>
                    </div>
                ` : '';

                imagesHtml += `
                    <div class="masonry-item" onclick="openLightbox('${img.src}', '${img.title}')">
                        <img src="${img.src}" alt="${img.title}" loading="lazy">
                        <div class="item-overlay">
                            <span class="item-title">${img.title}</span>
                            ${exifHtml}
                        </div>
                    </div>
                `;
            });

            section.innerHTML = `
                <div class="album-header">
                    <h3><span class="material-icons-round">${album.icon}</span> ${album.title}</h3>
                    <p class="album-description">${album.description}</p>
                </div>
                <div class="album-masonry">
                    ${imagesHtml}
                </div>
            `;
            albumsContainer.appendChild(section);
        });
    };

    initGallery();

    // 3. Lightbox Functions
    window.openLightbox = (src, title) => {
        lightboxImg.src = src;
        lightboxCaption.textContent = title;
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
    };

    const closeLightbox = () => {
        lightbox.classList.remove('active');
        document.body.style.overflow = 'auto';
    };

    if (lightbox) {
        lightbox.addEventListener('click', (e) => {
            if (e.target !== lightboxImg && e.target !== lightboxCaption) {
                closeLightbox();
            }
        });
    }

    // 4. Scroll Reveal Animation
    const revealElements = () => {
        const reveals = document.querySelectorAll('.reveal');
        const windowHeight = window.innerHeight;
        const revealPoint = 100;

        reveals.forEach(el => {
            const revealTop = el.getBoundingClientRect().top;
            if (revealTop < windowHeight - revealPoint) {
                el.classList.add('active');
            }
        });
    };

    window.addEventListener('scroll', revealElements);

    // 5. Smooth Scrolling
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
});
