document.addEventListener('DOMContentLoaded', () => {
    const cardsData = [
        { id: 1, title: 'Coding', sub: 'Where Ideas Turn Into Code', details: '9:00 AM • Main Hall' },
        { id: 2, title: 'Cyber Security', sub: 'Securing The Digital Future', details: 'Various rooms • Pre-register' },
        { id: 3, title: 'Quiz', sub: 'Think Smart, Answer Sharp', details: 'Bring laptop • Starts 3:00 PM' },
        { id: 4, title: 'Communication', sub: 'Where Words Build Worlds', details: '6:00 PM • Awards Stage' }
    ];

    // small SVG avatar generator (initials + bg color)
    function svgAvatar(initials, bg) {
        const svg = `<svg xmlns='http://www.w3.org/2000/svg' width='128' height='128'>` +
            `<rect width='100%' height='100%' fill='${bg}'/>` +
            `<text x='50%' y='50%' dy='.35em' text-anchor='middle' fill='#fff' font-family='Arial' font-size='56'>${initials}</text>` +
            `</svg>`;
        return 'data:image/svg+xml;utf8,' + encodeURIComponent(svg);
    }

    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        const id = Number(card.dataset.cardId);
        const data = cardsData.find(c => c.id === id);
        if(!data) return;

        const avatarImg = card.querySelector('.card-avatar img');
        const initials = data.title.split(/\s+/).map(w => w[0]).slice(0, 2).join('').toUpperCase();
        const colors = ['#6d57e9', '#ff7043', '#26a69a', '#ef5350'];
        const bg = colors[(id - 1) % colors.length];
        // try to load a real image from images/ folder, fallback to SVG avatar
        if(avatarImg) {
            const imageMap = {
                1: 'images/coding.jpg',
                2: 'images/cyber_security.jpg',
                3: 'images/quiz.jpg',
                4: 'images/communication.jpg'
            };
            const imgPath = imageMap[id];
            if(imgPath) {
                // attempt to load and if it fails, fallback to svg
                const test = new Image();
                test.onload = () => { avatarImg.src = imgPath; };
                test.onerror = () => { avatarImg.src = svgAvatar(initials, bg); };
                test.src = imgPath;
                avatarImg.alt = data.title + ' image';
            } else {
                avatarImg.src = svgAvatar(initials, bg);
                avatarImg.alt = data.title + ' avatar';
            }
        }

        card.querySelector('.card-title').textContent = data.title;
        card.querySelector('.card-sub').textContent = data.sub;

        const details = document.createElement('div');
        details.className = 'card-details';
        details.style.display = 'none';
        details.style.marginTop = '6px';
        details.textContent = data.details;
        card.appendChild(details);

        const btn = card.querySelector('.card-action');
        btn.setAttribute('aria-expanded', 'false');
        btn.addEventListener('click', () => {
            // const open = details.style.display === 'block';
            // details.style.display = open ? 'none' : 'block';
            // btn.textContent = open ? 'More Info' : 'Less Info';
            // btn.setAttribute('aria-expanded', (!open).toString());
        });
    });
});

