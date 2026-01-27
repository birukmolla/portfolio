document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Intersection Observer for Scroll Animations
    const observerOptions = {
        threshold: 0.2
    };

    const revealOnScroll = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('reveal');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.section').forEach(section => {
        revealOnScroll.observe(section);
    });

    // 2. Smooth Scrolling with Offset for Navbar
    const links = document.querySelectorAll(".nav-links a");
    links.forEach(link => {
        link.addEventListener("click", (e) => {
            e.preventDefault();
            const targetId = link.getAttribute("href");
            const targetSection = document.querySelector(targetId);
            const navHeight = document.querySelector('.navbar').offsetHeight;

            window.scrollTo({
                top: targetSection.offsetTop - navHeight,
                behavior: "smooth"
            });
        });
    });

    // 3. Update Active Link on Scroll
    window.addEventListener('scroll', () => {
        let current = "";
        const sections = document.querySelectorAll("section");
        const navHeight = document.querySelector('.navbar').offsetHeight;

        sections.forEach(section => {
            const sectionTop = section.offsetTop - navHeight - 10;
            if (pageYOffset >= sectionTop) {
                current = section.getAttribute("id");
            }
        });

        links.forEach(link => {
            link.classList.remove("active");
            if (link.getAttribute("href") === `#${current}`) {
                link.classList.add("active");
            }
        });
    });
});

// Modal Logic for Certificates
function openModal(element) {
  const modal = document.getElementById("certModal");
  const modalImg = document.getElementById("fullCertImage");
  const captionText = document.getElementById("caption");
  const clickedImg = element.querySelector('img');

  modal.style.display = "block";
  modalImg.src = clickedImg.src;
  captionText.innerHTML = clickedImg.alt;
}

function closeModal() {
  const modal = document.getElementById("certModal");
  modal.style.display = "none";
}

// Close modal if user presses 'Esc' key
document.addEventListener('keydown', (e) => {
  if (e.key === "Escape") closeModal();
});