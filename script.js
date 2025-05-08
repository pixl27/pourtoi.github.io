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

    // New logic for "Mon ultime cadeau"
    const ultimeCadeauBtn = document.getElementById('ultimeCadeauBtn');
    const cadeauxConteneur = document.getElementById('cadeauxConteneur');

    if (ultimeCadeauBtn && cadeauxConteneur) {
        ultimeCadeauBtn.addEventListener('click', () => {
            cadeauxConteneur.classList.add('visible');
            // Optionally hide the button after click, or change its state
            // ultimeCadeauBtn.style.display = 'none'; 
        });
    }

    // Gestion de la navigation active
    const navLinks = document.querySelectorAll('nav ul li a');
    const currentPage = window.location.pathname.split('/').pop();

    // Backdrop overlay for souvenir cards
    const backdropOverlay = document.getElementById('backdrop-overlay');

    // Modal elements for Souvenirs page
    const souvenirModal = document.getElementById('souvenir-modal');
    const modalTitre = document.getElementById('modal-titre');
    const modalParagraphesContainer = document.getElementById('modal-paragraphes');
    const modalImageElement = document.getElementById('modal-image'); // Ensure this element is selected
    const modalFermer = souvenirModal ? souvenirModal.querySelector('.modal-fermer') : null;

    navLinks.forEach(link => {
        const linkPage = link.getAttribute('href');
        if (linkPage === currentPage || (currentPage === '' && linkPage === 'index.html')) {
            link.classList.add('active');
        }
    });

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
        const texteOriginal = `💌 Lettre : "Je suis encore là, pour toi."
Mon cœur,

Je ne sais pas vraiment comment commencer cette lettre, mais je veux que tu la lises en sentant chaque mot comme une caresse douce, pas comme une pression.

Je suis désolé. Pour mes absences, mes maladresses, pour les fois où j’ai pensé que tu savais ce que je ressentais, alors que j’aurais dû te le montrer davantage. J’ai fait des erreurs, c’est vrai… mais jamais avec de mauvaises intentions. Mon cœur, lui, n’a jamais cessé de t’aimer.

Tu as peut-être besoin de temps, de silence, de te retrouver, et je comprends. Tu vis des choses, tu as des responsabilités, peut-être des doutes aussi. Je ne t’en veux pas. Je veux juste que tu saches que même si je me sens loin de toi en ce moment, je suis encore là.
Pas pour te retenir. Pas pour t'étouffer. Mais pour t’aimer, encore.

Je rêve souvent de nous retrouver. De revivre nos rires, nos confidences, nos regards. J’aimerais que ce “nous” qu’on a construit ne s’effondre pas. Pas comme ça.
Je sais que ce n’est pas facile. Mais je suis prêt à faire ce qu’il faut. À respecter ton espace, à patienter, à ne plus oublier ce qui est essentiel : toi.

Si un jour, même dans un mois ou dans un soupir, tu ressens encore un peu de ce que tu avais pour moi, je t’attendrai.
Et si tu veux encore me laisser une place dans ton cœur, je te promets de la mériter chaque jour.

Je t’aime.
Et peu importe ce que l’avenir décidera pour nous, je te porterai toujours en moi avec tendresse.

Toujours là,
Ton petit garçon perdu,
qui t’aime encore.`;

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

    if (musiqueFond && toggleMusiqueBtn && iconPlay && iconPause) {
        // Essayer de démarrer la musique automatiquement (peut être bloqué par le navigateur)
        // Pour une meilleure expérience utilisateur, il est souvent préférable de laisser l'utilisateur initier la lecture.
        // musiqueFond.play().catch(error => console.log("La lecture automatique a été bloquée."));
        // iconPlay.style.display = 'none';
        // iconPause.style.display = 'inline';

        toggleMusiqueBtn.addEventListener('click', () => {
            if (musiqueFond.paused) {
                musiqueFond.play();
                iconPlay.style.display = 'none';
                iconPause.style.display = 'inline';
            } else {
                musiqueFond.pause();
                iconPlay.style.display = 'inline';
                iconPause.style.display = 'none';
            }
        });

        // Synchroniser l'icône si la musique se met en pause pour une autre raison
        musiqueFond.onpause = () => {
            iconPlay.style.display = 'inline';
            iconPause.style.display = 'none';
        };
        musiqueFond.onplay = () => {
            iconPlay.style.display = 'none';
            iconPause.style.display = 'inline';
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
