document.addEventListener('DOMContentLoaded', () => {
    lucide.createIcons();
    initTypewriterMessage();
    initInteractiveGallery();
    initVideoSlider();
    initFloatingParticles();
    initMagicJar();
    initBackgroundMusic();
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
            
            // Activar música de fondo de forma suave al abrir la carta
            if (typeof window.playMusic === 'function') {
                window.playMusic();
            }
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
        'IV/1.png': 'Todo que ver la gorra JAJAJA',
        'IV/2.png': 'Ese azulito te animo a entrar a la Santa nuevamente',
        'IV/3.png': 'Tu viendo que nomas te andaba sacando fotos con tu azulito',
        'IV/4.png': 'De las veces que vamos con la misma ropa',
        'IV/5.png': 'Yo te dije que no creo en las brujas, pero ve ya me hiciste dudar',
        'IV/6.png': 'Aquí me di cuenta de que te llevabas, pero no te aguantabas',
        'IV/7.png': 'Casi se ve mi reflejo JAJAJ',
        'IV/8.png': 'Ese día no te quisiste tomar una foto conmigo, pero quedo más chida la foto así',
        'IV/9.png': 'La neta ya no me acuerdo de esa foto, pero la hice sticker solo que no lo he usado',
        'IV/10.png': 'Aquí no me acuerdo ni que onda, pero se tenia que poner la foto',
        'IV/11.png': 'Es que no recuerdo, pero según yo tome las fotos con tu teléfono',
        'IV/12.png': 'El gato tiro mas rostro que tu jajaa',
        'IV/13.png': 'Es que el filtro de gato es de mis fav, y quedo en la foto',
        'IV/14.png': 'Desde ahí algo cambio dentro de Andy, a ver si te acuerdas JAJAJ',
        'IV/MA.png': 'Pa que te miento ese día te cargue porque andaba contento JAJAJA',
        'IV/MAA.png': 'La verdadera primera foto que tenemos jajajaja'
    };

    const polaroidGroups = {
        'img-polaroid-1': ['IV/2.png', 'IV/3.png', 'IV/4.png', 'IV/5.png', 'IV/6.png'],
        'img-polaroid-2': ['IV/MAA.png', 'IV/7.png', 'IV/8.png', 'IV/9.png', 'IV/10.png', 'IV/11.png'],
        'img-polaroid-3': ['IV/1.png', 'IV/12.png', 'IV/13.png', 'IV/14.png', 'IV/MA.png']
    };

    const currentIndexMap = {};

    Object.keys(polaroidGroups).forEach((id) => {
        const imgElement = document.getElementById(id);
        const groupImages = polaroidGroups[id];
        
        if (imgElement && groupImages) {
            currentIndexMap[id] = 0;

            const container = imgElement.closest('.polaroid');
            if (container) {
                container.classList.add('cursor-pointer');

                container.addEventListener('click', () => {
                    currentIndexMap[id] = (currentIndexMap[id] + 1) % groupImages.length;
                    const nextImg = groupImages[currentIndexMap[id]];

                    imgElement.src = nextImg;

                    const captionElement = container.querySelector('p');
                    if (captionElement) {
                        captionElement.textContent = imageCaptions[nextImg];
                    }
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

function initMagicJar() {
    const magicJar = document.getElementById('magic-jar');
    const drawBtn = document.getElementById('draw-note-btn');
    const popup = document.getElementById('note-popup');
    const noteText = document.getElementById('note-text');
    const closeBtn = document.getElementById('close-note-btn');
    const nextBtn = document.getElementById('next-note-btn');
    const keepBtn = document.getElementById('keep-note-btn');

    if (!magicJar || !popup || !noteText) return;

    const messages = [
        "Como te dije despreocupate de todo, no pieces cosas que no son y que ni si quiera demuestro algo como eso, lo unico que quiero es que estes comoda, que puedas ser tu misma conmigo, porque eres una persona maravillosas, especial, unica y verdaderamente importante para mi 🤍",
        "Andy no tienes nada que agradecer, tu sabes muy bien que lo hago de corazón, que eres alguien especial para mí, ya te lo dije yo me quedo aquí contigo, y que te quiero más de lo que te imaginas 🤍",
        "Andy tu sabes que eres muy importante para mí y a lo mejor no siempre lo demuestro, pero en verdad te quieroooooo muchísimo, siempre voy a estar para escucharte y apoyarte, cuando no encuentres una salida, cuando sientas que todo se derrumba siempre voy a estar contigo, yo solo quiero verte feliz:)",
        "Solo quiero que nunca olvides lo mucho que significas para mí Andy, te quiero demasiado estoy aquí para apoyarte en cualquier etapa, incluso cuando sientas que no hay salida, no te sientas sola nunca, porque siempre estaré a tu lado para escucharte y acompañarte.",
        "Andy no siempre soy el mejor expresando lo que siento, casi siempre sale un mensaje que está algo confuso jajaja, pero lo que te puedo decir y expresar sin problema es que  siempre voy a estar en tu lado, que cuando sientas que el mundo te exige demasiado, recuerdes que aquí tienes a alguien que te escucha y te apoya sin condiciones, porque le importas demaciado",
        "A veces me cuesta poner en palabras lo mucho que te quiero, pero eres alguien  especial para mí que si en algún punto sientes que las cosas se ponen difíciles o te abrumas, no dudes en buscarme prometo escucharte y apoyarte en todo lo que necesites, se de lo que eres capaz y de las cosas que soportas día a día, solo te pido que me dejes ayudarte o algo más simple que me dejes acompañarte en cualquier situación:)"
    ];

    let lastIndex = -1;

    function getRandomMessage() {
        let index;
        do {
            index = Math.floor(Math.random() * messages.length);
        } while (index === lastIndex && messages.length > 1);
        lastIndex = index;
        return messages[index];
    }

    function triggerJarAction() {
        // 1. Efecto de temblor en el frasco
        magicJar.classList.add('shake-jar');
        if (drawBtn) drawBtn.disabled = true;

        setTimeout(() => {
            magicJar.classList.remove('shake-jar');
            
            // 2. Mostrar mensaje
            noteText.textContent = getRandomMessage();
            popup.classList.remove('hidden');
            
            // 3. Crear explosión de corazones/estrellas
            createExplosion();
            
            if (drawBtn) drawBtn.disabled = false;
        }, 600);
    }

    function createExplosion() {
        const particleCount = 25; // Más partículas porque son más pequeñas y se ven increíbles
        const rect = magicJar.getBoundingClientRect();
        const container = magicJar.parentElement;
        
        // Coordenadas relativas al contenedor
        const parentRect = container.getBoundingClientRect();
        const startX = rect.left - parentRect.left + rect.width / 2;
        const startY = rect.top - parentRect.top + 15; // Cerca de la tapa

        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            
            // Tamaños aleatorios para las chispas de luz (3px a 8px)
            const size = Math.random() * 5 + 3;
            
            particle.className = 'absolute pointer-events-none rounded-full burst-particle';
            particle.style.width = `${size}px`;
            particle.style.height = `${size}px`;
            
            // Paleta celestial: Blanco, plateado y un sutil azulito brillante
            const colors = ['#ffffff', '#f1f5f9', '#93c5fd', '#e2e8f0'];
            const color = colors[Math.floor(Math.random() * colors.length)];
            particle.style.backgroundColor = color;
            
            // Brillo estelar difuminado a su alrededor
            particle.style.boxShadow = `0 0 ${size * 2}px ${color}, 0 0 ${size}px #ffffff`;
            
            // Dirección aleatoria (semicírculo hacia arriba)
            const angle = (Math.random() * Math.PI) - Math.PI; 
            const speed = Math.random() * 110 + 40;
            const tx = Math.cos(angle) * speed;
            const ty = Math.sin(angle) * speed;
            
            particle.style.setProperty('--tx', `${tx}px`);
            particle.style.setProperty('--ty', `${ty}px`);
            particle.style.setProperty('--rot', '0deg'); // No requiere rotación al ser círculos perfectos
            particle.style.left = `${startX}px`;
            particle.style.top = `${startY}px`;
            
            container.appendChild(particle);
            
            // Limpieza
            setTimeout(() => {
                particle.remove();
            }, 1500);
        }
    }

    // Eventos
    magicJar.addEventListener('click', triggerJarAction);
    if (drawBtn) drawBtn.addEventListener('click', triggerJarAction);

    if (closeBtn) closeBtn.addEventListener('click', () => popup.classList.add('hidden'));
    if (keepBtn) keepBtn.addEventListener('click', () => popup.classList.add('hidden'));
    
    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            // Efecto rápido de cambio
            popup.classList.add('scale-95', 'opacity-0');
            setTimeout(() => {
                noteText.textContent = getRandomMessage();
                popup.classList.remove('scale-95', 'opacity-0');
                createExplosion();
            }, 150);
        });
    }
}

function initBackgroundMusic() {
    const audio = document.getElementById('bg-music');
    const controller = document.getElementById('music-controller');
    const iconOn = document.getElementById('music-icon-on');
    const iconOff = document.getElementById('music-icon-off');

    if (!audio || !controller || !iconOn || !iconOff) return;

    // Configurar volumen por defecto al 15% (bajito de fondo)
    audio.volume = 0.15;

    let isPlaying = false;
    let hasStarted = false; // Bandera para controlar el salto inicial de tiempo

    function play() {
        if (!hasStarted) {
            audio.currentTime = 63; // Salto al segundo 63 (1:03)
            hasStarted = true;
        }
        audio.play().then(() => {
            isPlaying = true;
            // Mostrar icono activo y animar su rotación
            iconOn.classList.remove('opacity-0', 'scale-50');
            iconOn.classList.add('opacity-100', 'scale-100', 'animate-[rotate-slow_4s_linear_infinite]');
            // Ocultar icono de silenciado
            iconOff.classList.remove('opacity-100', 'scale-100');
            iconOff.classList.add('opacity-0', 'scale-50');
        }).catch(err => {
            console.log("El navegador previno el inicio automático de música de fondo hasta que interactúes:", err);
            // Si falla por autoplay, reiniciamos la bandera para que intente saltar al abrir
            hasStarted = false;
        });
    }

    function pause() {
        audio.pause();
        isPlaying = false;
        // Ocultar icono activo
        iconOn.classList.remove('opacity-100', 'scale-100', 'animate-[rotate-slow_4s_linear_infinite]');
        iconOn.classList.add('opacity-0', 'scale-50');
        // Mostrar icono de silenciado
        iconOff.classList.remove('opacity-0', 'scale-50');
        iconOff.classList.add('opacity-100', 'scale-100');
    }

    function togglePlay() {
        if (isPlaying) {
            pause();
        } else {
            play();
        }
    }

    // Exponer la función globalmente para que el sobre de la carta pueda detonar la reproducción
    window.playMusic = () => {
        if (!isPlaying) {
            play();
        }
    };

    // Evento de clic para pausar/reproducir música manualmente
    controller.addEventListener('click', (e) => {
        e.stopPropagation();
        togglePlay();
    });
}
