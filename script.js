document.addEventListener('DOMContentLoaded', () => {
    lucide.createIcons();
    initTypewriterMessage();
    initInteractiveGallery();
    initVideoSlider();
    initFloatingParticles();
});

function initTypewriterMessage() {
    const container = document.getElementById('typed-text');
    const letterContainer = document.getElementById('letter-container');
    const letterClosed = document.getElementById('letter-closed');
    const letterOpen = document.getElementById('letter-open');
    
    if (!container || !letterContainer || !letterClosed || !letterOpen) return;

    const paragraphs = [
        "No sé si te lo digo lo suficiente, pero una de mis cosas favoritas de estos últimos años ha sido coincidir contigo.",
        "Porque contigo todo termina siendo una anécdota, podemos estar haciendo algo normal y de alguna manera, acaba convirtiéndose en algo que después recordamos y nos da risa durante semanas.",
        "Me gusta que contigo no hace falta planear mucho para pasarla bien a veces basta una conversación cualquiera, una tontería que se nos ocurra o una foto ridícula para que el día ya valga la pena.",
        "También me gusta que, después de todo este tiempo sigues siendo esa persona con la que puedo compartir desde algo importante hasta la cosa más absurda que se me venga a la cabeza.",
        "Hay personas que llegan, están un rato y se van, pero también hay personas que poco a poco se vuelven parte de tus recuerdos favoritos sin siquiera darse cuenta.",
        "Y no, no voy a ponerme súper sentimental porque luego me vas a molestar con eso, pero sí quería que quedara escrito en algún lugar que me alegra muchísimo haberte conocido.",
        "Gracias por las risas, por las tonterías que sueldo decir, por aguantarme cuando me pongo intenso o molesto aquí no sabría cómo ponerlo, pero ya me entiendes, y por todas esas historias que solamente tienen sentido para nosotros.",
        "A continuación fotos donde sino saliste bien es porque yo las tome JAJAJA"
    ];

    let isLetterOpen = false;

    letterContainer.addEventListener('click', () => {
        if (!isLetterOpen) {
            isLetterOpen = true;
            letterContainer.classList.remove('cursor-pointer', 'hover:scale-[1.02]');
            letterClosed.classList.add('hidden');
            letterOpen.classList.remove('hidden');
            startTypewriter();
        }
    });

    function startTypewriter() {
        container.innerHTML = '';
        let pIndex = 0;
        let charIndex = 0;
        
        function type() {
            if (pIndex < paragraphs.length) {
                if (charIndex === 0) {
                    const p = document.createElement('p');
                    p.className = 'mb-4 text-black leading-relaxed font-black';
                    container.appendChild(p);
                }
                
                const currentParagraphElement = container.lastChild;
                currentParagraphElement.textContent = paragraphs[pIndex].substring(0, charIndex + 1);
                
                charIndex++;
                
                if (charIndex < paragraphs[pIndex].length) {
                    setTimeout(type, 15);
                } else {
                    pIndex++;
                    charIndex = 0;
                    setTimeout(type, 300);
                }
            }
        }
        
        setTimeout(type, 200);
    }
}

function initInteractiveGallery() {
    const imageCaptions = {
        'IV/.1.png': 'Todo que ver la gorra JAJAJA',
        'IV/.2.png': 'Ese azulito te animo a entrar a la Santa nuevamente',
        'IV/.3.png': 'Tu viendo que nomas te andaba sacando fotos con tu azulito',
        'IV/.4.png': 'De las veces que vamos con la misma ropa',
        'IV/.5.png': 'Yo te dije que no creo en las brujas, pero ve ya me hiciste dudar',
        'IV/.6.png': 'Aquí me di cuenta de que te llevabas, pero no te aguantabas',
        'IV/.7.png': 'Casi se ve mi reflejo JAJAJ',
        'IV/.8.png': 'Ese día no te quisiste tomar una foto conmigo, pero quedo más chida la foto así',
        'IV/.9.png': 'La neta ya no me acuerdo de esa foto, pero la hice sticker solo que no lo he usado',
        'IV/.10.png': 'Aquí no me acuerdo ni que onda, pero se tenia que poner la foto',
        'IV/.11.png': 'Es que no recuerdo, pero según yo tome las fotos con tu teléfono',
        'IV/.12.png': 'El gato tiro mas rostro que tu jajaa',
        'IV/.13.png': 'Es que el filtro de gato es de mis fav, y quedo en la foto',
        'IV/.14.png': 'Desde ahí algo cambio dentro de Andy, a ver si te acuerdas JAJAJ',
        'IV/MA.png': 'Pa que te miento ese día te cargue porque andaba contento JAJAJA',
        'IV/MAA.png': 'La verdadera primera foto que tenemos jajajaja'
    };

    const polaroidGroups = {
        'img-polaroid-1': ['IV/.2.png', 'IV/.3.png', 'IV/.4.png', 'IV/.5.png', 'IV/.6.png'],
        'img-polaroid-2': ['IV/MAA.png', 'IV/.7.png', 'IV/.8.png', 'IV/.9.png', 'IV/.10.png', 'IV/.11.png'],
        'img-polaroid-3': ['IV/.1.png', 'IV/.12.png', 'IV/.13.png', 'IV/.14.png', 'IV/MA.png']
    };

    const currentIndexMap = {};

    Object.keys(polaroidGroups).forEach((id) => {
        const imgElement = document.getElementById(id);
        const groupImages = polaroidGroups[id];
        
        if (imgElement && groupImages) {
            imgElement.style.transition = 'opacity 0.4s ease';
            currentIndexMap[id] = 0;

            const container = imgElement.closest('.polaroid');
            if (container) {
                container.classList.add('cursor-pointer');

                container.addEventListener('click', () => {
                    imgElement.style.opacity = '0';
                    
                    setTimeout(() => {
                        currentIndexMap[id] = (currentIndexMap[id] + 1) % groupImages.length;
                        const nextImg = groupImages[currentIndexMap[id]];

                        imgElement.src = nextImg;
                        imgElement.style.opacity = '1';

                        const captionElement = container.querySelector('p');
                        if (captionElement) {
                            captionElement.textContent = imageCaptions[nextImg];
                        }
                    }, 400);
                });
            }
        }
    });
}

function initVideoSlider() {
    const videosList = ['IV/V2.mp4', 'IV/V1.mp4'];
    let currentVideoIndex = 0;
    
    const nextBtn = document.getElementById('next-video-btn');
    const video = document.getElementById('romantic-video');
    const playBtn = document.getElementById('play-btn');
    
    if (playBtn && video) {
        playBtn.addEventListener('click', () => {
            if (video.paused) {
                video.play();
                playBtn.style.opacity = '0';
            } else {
                video.pause();
                playBtn.style.opacity = '1';
            }
        });
        
        video.addEventListener('play', () => {
            playBtn.style.opacity = '0';
        });
        
        video.addEventListener('pause', () => {
            playBtn.style.opacity = '1';
        });
    }
    
    if (nextBtn && video) {
        nextBtn.addEventListener('click', () => {
            currentVideoIndex = (currentVideoIndex + 1) % videosList.length;
            video.pause();
            video.style.opacity = '0';
            
            setTimeout(() => {
                video.querySelector('source').src = videosList[currentVideoIndex];
                video.load();
                video.style.opacity = '1';
                playBtn.style.opacity = '1';
            }, 300);
        });
    }
}

function initCelebrationGame() {
    const celebrateBtn = document.getElementById('celebrate-btn');

    if (celebrateBtn) {
        celebrateBtn.addEventListener('click', () => {
            triggerCelebrationConfetti();
            
            celebrateBtn.innerHTML = '<i data-lucide="heart" class="w-5 h-5"></i><span>¡Gracias por todo!</span><i data-lucide="heart" class="w-5 h-5"></i>';
            celebrateBtn.classList.remove('from-warm-500', 'to-indigoSpecial-500');
            celebrateBtn.classList.add('from-pink-500', 'to-red-500');
            lucide.createIcons();
            
            const duration = 5 * 1000;
            const end = Date.now() + duration;

            (function frame() {
                confetti({
                    particleCount: 3,
                    angle: 60,
                    spread: 55,
                    origin: { x: 0 },
                    colors: ['#f59e0b', '#6366f1', '#a78bfa', '#fef3c7', '#ec4899']
                });
                confetti({
                    particleCount: 3,
                    angle: 120,
                    spread: 55,
                    origin: { x: 1 },
                    colors: ['#f59e0b', '#6366f1', '#a78bfa', '#fef3c7', '#ec4899']
                });

                if (Date.now() < end) {
                    requestAnimationFrame(frame);
                }
            }());
        });
    }
}

function triggerCelebrationConfetti() {
    const colors = ['#f59e0b', '#6366f1', '#a78bfa', '#ffffff', '#fbbf24'];
    
    confetti({
        particleCount: 150,
        spread: 80,
        origin: { y: 0.6 },
        colors: colors
    });

    setTimeout(() => {
        confetti({
            particleCount: 100,
            spread: 120,
            origin: { y: 0.3 },
            colors: colors
        });
    }, 200);
}

function initFloatingParticles() {
    const container = document.getElementById('stars-container');
    
    if (!container) return;
    
    function createStar() {
        const star = document.createElement('div');
        star.textContent = '✦';
        star.style.position = 'absolute';
        star.style.left = Math.random() * 100 + 'vw';
        star.style.bottom = '-50px';
        star.style.fontSize = (Math.random() * 20 + 10) + 'px';
        star.style.color = '#ffffff';
        star.style.opacity = Math.random() * 0.7 + 0.3;
        star.style.pointerEvents = 'none';
        star.style.animation = `floatUp ${Math.random() * 10 + 10}s linear forwards`;
        
        container.appendChild(star);
        
        setTimeout(() => {
            star.remove();
        }, 20000);
    }
    
    setInterval(createStar, 2000);
}
