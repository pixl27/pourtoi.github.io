document.addEventListener('DOMContentLoaded', () => {
    // Logique pour la page Accueil
    const commencerBtn = document.getElementById('commencerBtn');
    const messageEntree = document.querySelector('.message-entree');

    if (messageEntree) {
        const phrase1 = messageEntree.querySelector('.phrase-1');
        const phrase2 = messageEntree.querySelector('.phrase-2');

        // Déclencher les animations des phrases après un court délai
        setTimeout(() => {
            if(phrase1) phrase1.classList.add('visible');
        }, 300); // Délai avant la première animation

        setTimeout(() => {
            if(phrase2) phrase2.classList.add('visible');
        }, 600); // Délai un peu plus long pour la seconde phrase, se coordonne avec les délais CSS
    }

    if (commencerBtn) {
        // Make button visible after a delay by adding .visible class
        setTimeout(() => {
            commencerBtn.classList.add('visible');
        }, 1500); // 1.5 second delay, then 1s transition

        commencerBtn.addEventListener('click', () => {
            // Pour l'instant, redirige vers la page des souvenirs
            // Une animation plus complexe pourrait être ajoutée ici
            window.location.href = 'souvenirs.html';
        });
    }

    // Logique pour la page Et maintenant ?
    const parlerBtn = document.getElementById('parlerBtn'); // Will be null if old button removed
    const pasEncoreBtn = document.getElementById('pasEncoreBtn'); // Will be null if old button removed
    const messageAttente = document.getElementById('messageAttente'); // Will be null if old p removed

    // Remove old event listeners if elements existed
    if (parlerBtn) {
        // To properly remove, we would need the original function reference.
        // Assuming they are not critical to remove if elements are gone from HTML.
        // For robustness, if these IDs are reused, this could be an issue.
        // Best practice is to ensure IDs are unique or manage listeners carefully.
    }

    if (pasEncoreBtn && messageAttente) {
        // Similar to parlerBtn, direct removal is tricky without original function.
    }

    // New logic for "Mon ultime cadeau" and dramatic text reveal
    const ultimeCadeauBtn = document.getElementById('ultimeCadeauBtn');
    const cadeauxConteneur = document.getElementById('cadeauxConteneur');
    const dramaticTextContainer = document.querySelector('.dramatic-text-reveal');

    // Story Collage elements
    const storyCollageOverlay = document.getElementById('story-collage-overlay');
    const storyItems = document.querySelectorAll('.story-item');
    const storyVideo = document.getElementById('story-item-1');
    const loveMessage = document.getElementById('love-message'); // Added

    if (dramaticTextContainer && ultimeCadeauBtn) {
        const textSegments = dramaticTextContainer.querySelectorAll('.text-segment');
        let delay = 500; // Initial delay before the first text segment appears
        const segmentRevealDelay = 150; // Delay between each segment appearing (ms)

        textSegments.forEach((segment, index) => {
            setTimeout(() => {
                segment.classList.add('visible');
            }, delay + index * segmentRevealDelay);
        });

        // Calculate total time for text animation
        const totalTextAnimationTime = delay + textSegments.length * segmentRevealDelay + 800; // Extra 800ms for last segment transition

        setTimeout(() => {
            ultimeCadeauBtn.classList.add('visible');
        }, totalTextAnimationTime);
    }

    if (ultimeCadeauBtn) {
        ultimeCadeauBtn.addEventListener('click', () => {
            if (storyCollageOverlay && storyItems.length > 0) {
                storyCollageOverlay.classList.add('visible');
                
                storyItems.forEach((item) => {
                    item.classList.add('visible');
                });

                if (loveMessage) { // Added
                    loveMessage.classList.add('visible');
                }

                if (storyVideo && typeof storyVideo.play === 'function') {
                    storyVideo.currentTime = 0;
                    storyVideo.play().catch(error => {
                        console.warn("Video autoplay prevented for story1.mp4:", error);
                    });
                }

                // Updated duration for collage:
                // Last story item (item 4) starts at 4.4s, duration 1.2s -> finishes at 5.6s
                // Love message starts at 5.7s, duration 1s -> finishes at 6.7s
                // Add 3 seconds viewing time: 6.7s + 3s = 9.7s
                const collageDisplayDuration = 9700; 

                setTimeout(() => {
                    storyCollageOverlay.classList.remove('visible');
                    if (storyVideo && typeof storyVideo.pause === 'function') {
                        storyVideo.pause();
                    }
                    storyItems.forEach(item => item.classList.remove('visible'));
                    if (loveMessage) { // Added
                        loveMessage.classList.remove('visible');
                    }

                    if (cadeauxConteneur) {
                        cadeauxConteneur.classList.add('visible');
                    }
                }, collageDisplayDuration);

            } else {
                if (cadeauxConteneur) {
                    cadeauxConteneur.classList.add('visible');
                }
            }
        });
    }

    // Gestion de la navigation active
    const navLinks = document.querySelectorAll('nav ul li a');
    const currentPage = window.location.pathname.split('/').pop();

    // New Stepper Navigation Logic
    const stepperNav = document.querySelector('.stepper-nav');
    if (stepperNav) {
        const steps = stepperNav.querySelectorAll('.step');
        const currentPath = window.location.pathname.split('/').pop() || 'index.html';
        let activeStepFound = false;

        steps.forEach(step => {
            const page = step.dataset.page;
            if (page === currentPath) {
                step.classList.add('active');
                activeStepFound = true;
            } else if (!activeStepFound) {
                step.classList.add('completed');
            }

            // Make previous steps clickable to navigate back
            if (step.classList.contains('completed') || step.classList.contains('active')) {
                // Link is already there, just ensure styling or behavior is as expected
            } else {
                // Prevent clicking on future steps if desired (optional)
                // const link = step.querySelector('a');
                // if (link) {
                //     link.addEventListener('click', (e) => e.preventDefault());
                // }
            }
        });
    }
    // End of New Stepper Navigation Logic

    // Comment out or remove old active link logic if stepper handles it all
    /*
    navLinks.forEach(link => {
        const linkPage = link.getAttribute('href');
        if (linkPage === currentPage || (currentPage === '' && linkPage === 'index.html')) {
            link.classList.add('active');
        }
    });
    */

    // Backdrop overlay for souvenir cards
    const backdropOverlay = document.getElementById('backdrop-overlay');

    // Modal elements for Souvenirs page
    const souvenirModal = document.getElementById('souvenir-modal');
    const modalTitre = document.getElementById('modal-titre');
    const modalParagraphesContainer = document.getElementById('modal-paragraphes');
    const modalImageElement = document.getElementById('modal-image'); // Ensure this element is selected
    const modalFermer = souvenirModal ? souvenirModal.querySelector('.modal-fermer') : null;

    // Logique pour la page Souvenirs - Cartes interactives & Modal
    const cartesSouvenirs = document.querySelectorAll('.carte-souvenir');

    function afficherModalSouvenir(carte) {
        const titreElement = carte.querySelector('.carte-arriere h3');
        let titreSouvenir = "Titre non disponible"; 
        if (titreElement) {
            titreSouvenir = titreElement.textContent;
        } else {
            console.warn("Aucun élément h3 (titre) trouvé dans .carte-arriere pour la carte souvenir:", carte);
        }

        const paragraphesOriginaux = carte.querySelectorAll('.carte-arriere p');

        if (modalTitre) {
            modalTitre.textContent = titreSouvenir;
        } else {
            console.warn("L'élément #modal-titre est introuvable dans le DOM.");
        }

        if (modalParagraphesContainer) {
            modalParagraphesContainer.innerHTML = ''; 
            if (paragraphesOriginaux.length > 0) {
                paragraphesOriginaux.forEach(pOrigin => {
                    const pClone = pOrigin.cloneNode(true);
                    pClone.classList.remove('visible-p'); 
                    modalParagraphesContainer.appendChild(pClone);
                });
            } else {
                const pMessage = document.createElement('p');
                pMessage.textContent = "Contenu détaillé non disponible pour ce souvenir.";
                modalParagraphesContainer.appendChild(pMessage);
                console.warn("Aucun paragraphe <p> trouvé dans .carte-arriere pour la carte souvenir:", carte);
            }
        } else {
            console.warn("L'élément #modal-paragraphes (conteneur des paragraphes du modal) est introuvable dans le DOM.");
        }

        // Handle modal image
        // const imageSrc = carte.dataset.modalImage; // REMOVED: No longer using data-modal-image for modal display
        if (modalImageElement) {
            modalImageElement.src = ''; // Always clear src
            modalImageElement.style.display = 'none'; // Always hide image element in modal
            modalImageElement.alt = ''; // Always clear alt text
        } else {
            console.warn("L'élément #modal-image est introuvable dans le DOM.");
        }

        if (backdropOverlay) {
            backdropOverlay.classList.add('visible');
        } else {
            console.warn("L'élément #backdrop-overlay est introuvable dans le DOM.");
        }
        
        if (souvenirModal) {
            souvenirModal.classList.add('visible');
        } else {
            console.warn("L'élément #souvenir-modal est introuvable dans le DOM.");
        }

        // Déclencher l'animation des paragraphes dans le modal
        const paragraphesModal = modalParagraphesContainer ? modalParagraphesContainer.querySelectorAll('p') : [];
        if (paragraphesModal.length > 0) {
            paragraphesModal.forEach((p, index) => {
                // S'assurer que p est un élément valide avant d'accéder à classList
                if (p && typeof p.classList !== 'undefined') { 
                    setTimeout(() => {
                        p.classList.add('visible-p');
                    }, 100 + index * 200); // Délai ajusté pour l'apparition dans le modal
                }
            });
        }
    }

    function cacherModalSouvenir() {
        if (backdropOverlay) backdropOverlay.classList.remove('visible');
        if (souvenirModal) souvenirModal.classList.remove('visible');
        
        if (modalTitre) modalTitre.textContent = '';
        if (modalParagraphesContainer) modalParagraphesContainer.innerHTML = '';

        // Clear and hide modal image
        if (modalImageElement) {
            modalImageElement.src = '';
            modalImageElement.style.display = 'none';
            modalImageElement.alt = '';
        }
    }

    cartesSouvenirs.forEach(carte => {
        carte.addEventListener('click', () => {
            // La carte ne se retourne plus, elle ouvre le modal
            afficherModalSouvenir(carte);
        });

        // Effet de tilt au survol (ne dépend plus de l'état 'flipped')
        carte.addEventListener('mousemove', (e) => {
            const rect = carte.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            const rotateX = -y / 20;
            const rotateY = x / 20;
            carte.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
        });

        carte.addEventListener('mouseleave', () => {
            carte.style.transform = 'rotateX(0deg) rotateY(0deg) scale(1)';
        });
    });

    // Fermeture du modal
    if (modalFermer) {
        modalFermer.addEventListener('click', cacherModalSouvenir);
    }
    if (backdropOverlay) { // Cliquer sur le fond pour fermer aussi
        backdropOverlay.addEventListener('click', (event) => {
            // S'assurer que le clic est bien sur le backdrop et non sur un enfant (comme le modal lui-même si event bubbling)
            if (event.target === backdropOverlay) {
                cacherModalSouvenir();
            }
        });
    }

    // Logique pour la page Ce que je ressens - Lettre animée
    const texteLettreElement = document.getElementById('texteLettre');
    if (texteLettreElement) {
        const texteOriginal = `Mon amour,

Je t’écris avec le cœur ouvert, plein d’espoir et d’amour pour toi.

Je sais qu’on traverse une période compliquée, qu’il y a eu des hauts et des bas, des moments où j’ai été maladroit, peut-être absent sur certaines choses importantes. Et pour ça, je m’excuse. Mais ce que je ressens pour toi est toujours là, sincère et profond.

Je veux que tu saches que je suis prêt à changer, à m’améliorer, à être un meilleur homme pour toi. Pas juste avec des mots, mais avec des gestes, des attentions, de la patience. Parce que tu mérites quelqu’un qui te comprend, qui te soutient, et je veux être cette personne.

Je ne te demande pas de revenir comme avant d’un coup, je sais que tu as tes projets, tes préoccupations, ton rythme. Et je respecte ça. Mais au fond de moi, j’espère encore qu’il reste un bout de place dans ton cœur pour moi.
Je t’aime. Et j’espère que tu m’aimes encore un peu aussi.

Je crois encore en nous. Je crois que ce qu’on a construit peut être réparé, renforcé, rendu encore plus beau.

Je suis là, et je serai là. Avec tendresse, patience, et beaucoup d’amour.

Toujours ton petit garçon,
qui veut juste te voir sourire à nouveau avec lui.`;

        let index = 0;
        texteLettreElement.textContent = ''; // Vider le contenu initial pour l'animation de frappe
        texteLettreElement.style.opacity = '1'; // Rendre visible pour l'animation

        function afficherCaractere() {
            if (index < texteOriginal.length) {
                texteLettreElement.textContent += texteOriginal.charAt(index);
                index++;
                setTimeout(afficherCaractere, 60); // Vitesse de frappe (en ms)
            } else {
                // Optionnel: faire clignoter un curseur à la fin
            }
        }

        // Déclencher l'animation après un court délai pour que la page soit bien chargée
        setTimeout(afficherCaractere, 500);
    }

    // Logique pour le lecteur audio
    const musiqueFond = document.getElementById('musiqueFond');
    const toggleMusiqueBtn = document.getElementById('toggleMusiqueBtn');
    const iconPlay = toggleMusiqueBtn ? toggleMusiqueBtn.querySelector('.icon-play') : null;
    const iconPause = toggleMusiqueBtn ? toggleMusiqueBtn.querySelector('.icon-pause') : null;
    const autoplayStatusMsg = document.getElementById('autoplay-status'); // Get the new message element

    if (musiqueFond && toggleMusiqueBtn && iconPlay && iconPause && autoplayStatusMsg) { // Check for autoplayStatusMsg
        let autoplayBlockedInitially = false;

        // Attempt to autoplay music when the page loads
        musiqueFond.play().then(() => {
            // Autoplay started successfully
            iconPlay.style.display = 'none';
            iconPause.style.display = 'inline';
            autoplayStatusMsg.style.display = 'none'; // Hide message
            console.log("Background music autoplay started.");
        }).catch(error => {
            autoplayBlockedInitially = true;
            console.log("Background music autoplay was blocked by the browser. User interaction is required to start the music.");
            // Ensure icons are in the 'paused' state (i.e., show play button) if autoplay fails
            iconPlay.style.display = 'inline';
            iconPause.style.display = 'none';
            autoplayStatusMsg.textContent = "Click ▶️ to start music"; // Set message text
            autoplayStatusMsg.style.display = 'inline'; // Show message
        });

        toggleMusiqueBtn.addEventListener('click', () => {
            if (musiqueFond.paused) {
                musiqueFond.play().catch(err => {
                    console.error("Error playing music after click:", err);
                    // Optionally update message if manual play fails for some reason
                    if (autoplayBlockedInitially) {
                         autoplayStatusMsg.textContent = "Could not play music.";
                         autoplayStatusMsg.style.display = 'inline';
                    }
                });
            } else {
                musiqueFond.pause();
            }
        });

        // Synchroniser l'icône si la musique se met en pause pour une autre raison
        musiqueFond.onpause = () => {
            iconPlay.style.display = 'inline';
            iconPause.style.display = 'none';
            // If autoplay was initially blocked and music is paused by user,
            // and it had played at least a bit, the message can remain hidden.
            // The play icon itself is the cue.
        };
        musiqueFond.onplay = () => {
            iconPlay.style.display = 'none';
            iconPause.style.display = 'inline';
            autoplayStatusMsg.style.display = 'none'; // Always hide message when playing
            autoplayBlockedInitially = false; // Reset flag once music has successfully played
        };

    } else {
        // Si le lecteur n'est pas sur la page actuelle (parce qu'on l'a mis que sur index.html pour l'instant)
        // ou si les éléments ne sont pas trouvés, on log un message.
        // console.log("Lecteur audio non initialisé sur cette page ou éléments manquants.");
    }

    // Plus de JS pour les animations et interactivité à venir

    // Logique pour le fond étoilé animé (sur index.html)
    const canvas = document.getElementById('starryNightCanvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        let stars = [];
        const numStars = 200; // Nombre d'étoiles
        const twinkleSpeed = 0.05; // Vitesse de scintillement

        function resizeCanvas() {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        }

        class Star {
            constructor(x, y, size, opacity) {
                this.x = x;
                this.y = y;
                this.size = size;
                this.opacity = opacity;
                this.opacityDirection = 1; // 1 pour augmenter, -1 pour diminuer
            }

            draw() {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity})`;
                ctx.fill();
            }

            update() {
                // Scintillement
                if (this.opacityDirection === 1) {
                    this.opacity += twinkleSpeed * Math.random();
                    if (this.opacity >= 1) {
                        this.opacity = 1;
                        this.opacityDirection = -1;
                    }
                } else {
                    this.opacity -= twinkleSpeed * Math.random();
                    if (this.opacity <= 0.1) { // Opacité minimale pour ne pas disparaître complètement trop vite
                        this.opacity = 0.1;
                        this.opacityDirection = 1;
                        // Réinitialiser la position pour un effet de "nouvelle" étoile qui apparaît
                        this.x = Math.random() * canvas.width;
                        this.y = Math.random() * canvas.height;
                    }
                }
                this.draw();
            }
        }

        function initStars() {
            stars = [];
            for (let i = 0; i < numStars; i++) {
                const x = Math.random() * canvas.width;
                const y = Math.random() * canvas.height;
                const size = Math.random() * 1.5 + 0.5; // Taille entre 0.5 et 2
                const opacity = Math.random() * 0.5 + 0.2; // Opacité initiale
                stars.push(new Star(x, y, size, opacity));
            }
        }

        function animateStars() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            stars.forEach(star => {
                star.update();
            });
            requestAnimationFrame(animateStars);
        }

        window.addEventListener('resize', () => {
            resizeCanvas();
            initStars(); // Recréer les étoiles si la taille de la fenêtre change
        });

        resizeCanvas();
        initStars();
        animateStars();
    }
});
