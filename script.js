/* =========================================================
   AJAY KUSHWHA — V2
   MAIN JAVASCRIPT
========================================================= */


/* =========================================================
   01. DOM HELPERS
========================================================= */

const $ = (selector, parent = document) =>
    parent.querySelector(selector);

const $$ = (selector, parent = document) =>
    [...parent.querySelectorAll(selector)];


/* =========================================================
   02. THEME
========================================================= */

const themeToggle = $("#themeToggle");

const savedTheme =
    localStorage.getItem("ajay-theme");

if (savedTheme === "light") {
    document.body.classList.add("light-theme");
}


if (themeToggle) {

    themeToggle.addEventListener("click", () => {

        document.body.classList.toggle("light-theme");

        const theme =
            document.body.classList.contains("light-theme")
                ? "light"
                : "dark";

        localStorage.setItem(
            "ajay-theme",
            theme
        );

    });

}


/* =========================================================
   03. LOADER
========================================================= */

const loader = $("#loader");
const loaderCounter = $("#loaderCounter");
const loaderProgress = $("#loaderProgress");
const loaderName = $("#loaderName");

let loaderStart =
    performance.now();

const loaderDuration = 1250;

function runLoader(time) {

    if (!loaderCounter || !loaderProgress) {
        return;
    }

    const elapsed =
        time - loaderStart;

    const progress =
        Math.min(
            elapsed / loaderDuration,
            1
        );

    const value =
        Math.floor(progress * 100);

    loaderCounter.textContent =
        value;

    loaderProgress.style.width =
        `${value}%`;

    if (progress < 1) {

        requestAnimationFrame(
            runLoader
        );

        return;
    }


    if (loaderName) {

        loaderName.classList.add(
            "is-visible"
        );

    }


    setTimeout(() => {

        if (!loader) return;

        loader.classList.add(
            "is-hidden"
        );

        document.body.classList.add(
            "page-ready"
        );

    }, 250);

}


requestAnimationFrame(
    runLoader
);


/* =========================================================
   04. NAVBAR SCROLL STATE
========================================================= */

const navbar = $("#navbar");

function updateNavbar() {

    if (!navbar) return;

    navbar.classList.toggle(
        "is-scrolled",
        window.scrollY > 30
    );

}

updateNavbar();

window.addEventListener(
    "scroll",
    updateNavbar,
    { passive: true }
);


/* =========================================================
   05. SCROLL PROGRESS
========================================================= */

const scrollProgress =
    $("#scrollProgress");

function updateScrollProgress() {

    if (!scrollProgress) return;

    const documentHeight =
        document.documentElement.scrollHeight
        - window.innerHeight;

    if (documentHeight <= 0) {

        scrollProgress.style.width =
            "0%";

        return;
    }

    const progress =
        (window.scrollY / documentHeight) * 100;

    scrollProgress.style.width =
        `${Math.min(progress, 100)}%`;

}

window.addEventListener(
    "scroll",
    updateScrollProgress,
    { passive: true }
);

window.addEventListener(
    "resize",
    updateScrollProgress
);

updateScrollProgress();


/* =========================================================
   06. MOBILE MENU
========================================================= */

const menuButton =
    $("#menuButton");

const mobileMenu =
    $("#mobileMenu");


function closeMobileMenu() {

    if (!menuButton || !mobileMenu) {
        return;
    }

    menuButton.classList.remove(
        "is-active"
    );

    mobileMenu.classList.remove(
        "is-open"
    );

}


if (menuButton && mobileMenu) {

    menuButton.addEventListener(
        "click",
        () => {

            menuButton.classList.toggle(
                "is-active"
            );

            mobileMenu.classList.toggle(
                "is-open"
            );

        }
    );


    $$(".mobile-menu a")
        .forEach(link => {

            link.addEventListener(
                "click",
                closeMobileMenu
            );

        });

}


/* =========================================================
   07. REVEAL ON SCROLL
========================================================= */

const revealElements =
    $$(".reveal");

const revealObserver =
    new IntersectionObserver(
        (entries, observer) => {

            entries.forEach(entry => {

                if (!entry.isIntersecting) {
                    return;
                }

                entry.target.classList.add(
                    "is-visible"
                );

                observer.unobserve(
                    entry.target
                );

            });

        },
        {
            threshold: 0.12,
            rootMargin:
                "0px 0px -40px 0px"
        }
    );


revealElements.forEach(
    element =>
        revealObserver.observe(element)
);


/* =========================================================
   08. EXPERIENCE IN NUMBERS
   TRIGGER WHEN NUMBERS ENTER VIEW
========================================================= */

const counterElements =
    $$(".counter");

const counterObserver =
    new IntersectionObserver(
        (entries, observer) => {

            entries.forEach(entry => {

                if (!entry.isIntersecting) {
                    return;
                }

                animateCounter(
                    entry.target
                );

                observer.unobserve(
                    entry.target
                );

            });

        },
        {
            threshold: 0.45
        }
    );


counterElements.forEach(
    counter =>
        counterObserver.observe(counter)
);


function animateCounter(element) {

    const target =
        Number(
            element.dataset.target
        );

    if (!Number.isFinite(target)) {
        return;
    }


    const duration = 1500;

    const start =
        performance.now();


    function updateCounter(time) {

        const elapsed =
            time - start;

        const progress =
            Math.min(
                elapsed / duration,
                1
            );


        /*
            Smooth ease-out

            Fast at beginning,
            slow near final number.
        */

        const eased =
            1 - Math.pow(
                1 - progress,
                3
            );


        const current =
            Math.floor(
                eased * target
            );


        element.textContent =
            current;


        if (progress < 1) {

            requestAnimationFrame(
                updateCounter
            );

        } else {

            element.textContent =
                target;

        }

    }


    requestAnimationFrame(
        updateCounter
    );

}


/* =========================================================
   09. WORK — SEE MORE / SEE LESS
========================================================= */

const seeMoreButton =
    $("#seeMoreWork");

const hiddenProjects =
    $$(".project-hidden");


let workExpanded = false;


if (seeMoreButton) {

    seeMoreButton.addEventListener(
        "click",
        () => {

            workExpanded =
                !workExpanded;


            hiddenProjects.forEach(
                project => {

                    project.classList.toggle(
                        "is-visible",
                        workExpanded
                    );

                }
            );


            seeMoreButton.textContent =
                workExpanded
                    ? "SEE LESS WORK"
                    : "SEE MORE WORK";


            /*
                Small scroll adjustment after
                closing the extra projects.
            */

            if (!workExpanded) {

                const workSection =
                    $("#work");

                if (workSection) {

                    setTimeout(() => {

                        workSection.scrollIntoView({
                            behavior: "smooth",
                            block: "start"
                        });

                    }, 100);

                }

            }

        }
    );

}


/* =========================================================
   10. PROJECT DATA
========================================================= */

const projectData = {


    "project-1": {

        kicker:
            "01 / GRAPHIC DESIGN",

        title:
            "Visual Campaign",

        description:
            "Creative visual direction, composition, artwork preparation and print-ready output.",

        image:
            "images/project-01-visual-campaign.jpg",

        details: [
            {
                label: "FOCUS",
                value:
                    "Visual Communication"
            },
            {
                label: "PROCESS",
                value:
                    "Concept to Production"
            },
            {
                label: "OUTPUT",
                value:
                    "Print & Digital"
            }
        ]

    },


    "project-2": {

        kicker:
            "02 / ADVERTISING",

        title:
            "Product Advertising",

        description:
            "Product-focused advertising layouts, visual composition and brand presentation.",

        image:
            "images/project-02-product-advertising.jpg",

        details: [
            {
                label: "FOCUS",
                value:
                    "Product Advertising"
            },
            {
                label: "PROCESS",
                value:
                    "Layout & Composition"
            },
            {
                label: "OUTPUT",
                value:
                    "Campaign Artwork"
            }
        ]

    },


    "project-3": {

        kicker:
            "03 / PACKAGING",

        title:
            "Packaging Design",

        description:
            "Packaging artwork, visual layout, print preparation and production support.",

        image:
            "images/project-03-packaging-design.jpg",

        details: [
            {
                label: "FOCUS",
                value:
                    "Packaging"
            },
            {
                label: "PROCESS",
                value:
                    "Artwork Preparation"
            },
            {
                label: "OUTPUT",
                value:
                    "Production Ready"
            }
        ]

    },


    "project-4": {

        kicker:
            "04 / PRODUCTION",

        title:
            "Print Production",

        description:
            "Artwork preparation, print setup, digital and UV production and quality checking.",

        image:
            "images/project-04-print-production.jpg",

        details: [
            {
                label: "FOCUS",
                value:
                    "Print Production"
            },
            {
                label: "PROCESS",
                value:
                    "Design to Print"
            },
            {
                label: "OUTPUT",
                value:
                    "Digital & UV"
            }
        ]

    },


    "project-5": {

        kicker:
            "05 / LUXURY / BEAUTY",

        title:
            "Luxury Beauty Campaign",

        description:
            "Premium beauty and luxury visual communication.",

        image:
            "images/featured-01-kilian-campaign.jpg",

        details: [
            {
                label: "FOCUS",
                value:
                    "Luxury Visuals"
            },
            {
                label: "STYLE",
                value:
                    "Premium / Beauty"
            },
            {
                label: "OUTPUT",
                value:
                    "Campaign Artwork"
            }
        ]

    },


    /* =====================================================
       EXTRA PROJECT 06
    ===================================================== */

    "project-6": {

        kicker:
            "06 / CREATIVE WORK",

        title:
            "Additional Project",

        description:
            "Additional creative work from the full portfolio.",

        image:
            "",

        details: [
            {
                label: "TYPE",
                value:
                    "Creative Work"
            },
            {
                label: "STATUS",
                value:
                    "Portfolio Archive"
            }
        ]

    },


    /* =====================================================
       EXTRA PROJECT 07
    ===================================================== */

    "project-7": {

        kicker:
            "07 / CREATIVE WORK",

        title:
            "Additional Project",

        description:
            "Additional creative work from the full portfolio.",

        image:
            "",

        details: [
            {
                label: "TYPE",
                value:
                    "Creative Work"
            },
            {
                label: "STATUS",
                value:
                    "Portfolio Archive"
            }
        ]

    },


    /* =====================================================
       EXTRA PROJECT 08
    ===================================================== */

    "project-8": {

        kicker:
            "08 / CREATIVE WORK",

        title:
            "Additional Project",

        description:
            "Additional creative work from the full portfolio.",

        image:
            "",

        details: [
            {
                label: "TYPE",
                value:
                    "Creative Work"
            },
            {
                label: "STATUS",
                value:
                    "Portfolio Archive"
            }
        ]

    },


    /* =====================================================
       EXTRA PROJECT 09
    ===================================================== */

    "project-9": {

        kicker:
            "09 / CREATIVE WORK",

        title:
            "Additional Project",

        description:
            "Additional creative work from the full portfolio.",

        image:
            "",

        details: [
            {
                label: "TYPE",
                value:
                    "Creative Work"
            },
            {
                label: "STATUS",
                value:
                    "Portfolio Archive"
            }
        ]

    },


    /* =====================================================
       EXTRA PROJECT 10
    ===================================================== */

    "project-10": {

        kicker:
            "10 / CREATIVE WORK",

        title:
            "Additional Project",

        description:
            "Additional creative work from the full portfolio.",

        image:
            "",

        details: [
            {
                label: "TYPE",
                value:
                    "Creative Work"
            },
            {
                label: "STATUS",
                value:
                    "Portfolio Archive"
            }
        ]

    }

};


/* =========================================================
   11. SERVICE DATA
========================================================= */

const serviceData = {


    "graphic-design": {

        kicker:
            "01 / SERVICE",

        title:
            "Graphic Design",

        description:
            "Visual communication, composition, branding and production-ready artwork.",

        image:
            "images/service-graphic-design.jpg",

        details: [
            {
                label: "SERVICE",
                value:
                    "Graphic Design"
            },
            {
                label: "FOCUS",
                value:
                    "Visual Communication"
            },
            {
                label: "OUTPUT",
                value:
                    "Print & Digital"
            }
        ]

    },


    "digital-printing": {

        kicker:
            "02 / SERVICE",

        title:
            "Digital Printing",

        description:
            "Digital printing production with artwork preparation and quality-focused output.",

        image:
            "images/service-digital-printing.jpg",

        details: [
            {
                label: "SERVICE",
                value:
                    "Digital Printing"
            },
            {
                label: "FOCUS",
                value:
                    "Print Production"
            },
            {
                label: "PROCESS",
                value:
                    "Design to Print"
            }
        ]

    },


    "uv-printing": {

        kicker:
            "03 / SERVICE",

        title:
            "UV Printing",

        description:
            "UV printing machine operation and print preparation for production work.",

        image:
            "images/service-uv-printing.jpg",

        details: [
            {
                label: "SERVICE",
                value:
                    "UV Printing"
            },
            {
                label: "FOCUS",
                value:
                    "UV Print"
            },
            {
                label: "PROCESS",
                value:
                    "Production"
            }
        ]

    },


    "print-preparation": {

        kicker:
            "04 / SERVICE",

        title:
            "Print Preparation",

        description:
            "Preparing artwork and files for accurate production while keeping layouts, sizing and final output requirements in mind.",

        image:
            "images/service-print-preparation.jpg",

        details: [
            {
                label: "SERVICE",
                value:
                    "Print Preparation"
            },
            {
                label: "FOCUS",
                value:
                    "Artwork Setup"
            },
            {
                label: "OUTPUT",
                value:
                    "Production Ready"
            }
        ]

    }

};


/* =========================================================
   12. EXPERIENCE DATA
========================================================= */

const experienceData = {


    main: {

        kicker:
            "EXPERIENCE / 7+ YEARS",

        title:
            "Graphic Designer & Printing Machine Operator",

        description:
            "A career built across graphic design, signwork, digital printing, UV printing, artwork preparation and production.",

        /*
            Experience intentionally has NO image.
        */

        image:
            "",

        details: [

            {
                label:
                    "2023 — PRESENT",

                value:
                    "Graphic Designer — Signwork, Saudi Arabia. Working across visual design, signwork, artwork preparation and production."
            },


            {
                label:
                    "2022 — 2023",

                value:
                    "Graphic Designer — Signwork, Dubai, UAE. Worked on graphic design and signwork production, preparing artwork according to production requirements."
            },


            {
                label:
                    "2017 — 2022",

                value:
                    "Graphic Designer & Printing Machine Operator — JMD Graphics, Delhi, India. Worked across graphic design, digital printing and UV printing operations."
            },


            {
                label:
                    "DESIGN TOOLS",

                value:
                    "Adobe Illustrator, Photoshop, CorelDRAW and Adobe Acrobat."
            },


            {
                label:
                    "MACHINE EXPERIENCE",

                value:
                    "Flatbed, UV Roll to Roll, Epson, HP, Roland, Mimaki and related printing equipment."
            },


            {
                label:
                    "PRODUCTION",

                value:
                    "Artwork preparation, print setup, machine operation, production support and quality checking."
            },


            {
                label:
                    "SPECIALIZATION",

                value:
                    "Graphic Design, Digital Printing, UV Printing, Signwork and Print Production."
            }

        ]

    }

};


/* =========================================================
   13. MODAL ELEMENTS
========================================================= */

const modal =
    $("#detailModal");

const modalWindow =
    $(".modal-window");

const modalClose =
    $("#modalClose");

const modalImage =
    $("#modalImage");

const modalKicker =
    $("#modalKicker");

const modalTitle =
    $("#modalTitle");

const modalDescription =
    $("#modalDescription");

const modalMeta =
    $("#modalMeta");

const modalDetails =
    $("#modalDetails");


let modalIsOpen = false;


/* =========================================================
   14. OPEN MODAL
========================================================= */

function openModal(data) {

    if (!modal || !data) {
        return;
    }


    /*
        RESET
    */

    modalKicker.textContent =
        data.kicker || "";

    modalTitle.textContent =
        data.title || "";

    modalDescription.textContent =
        data.description || "";


    /*
        IMAGE
    */

    modalImage.innerHTML = "";


    if (data.image) {

        const image =
            document.createElement("img");

        image.src =
            data.image;

        image.alt =
            data.title || "Portfolio image";

        modalImage.appendChild(
            image
        );

    }


    /*
        META
    */

    modalMeta.innerHTML = "";


    if (data.details) {

        const metaItems =
            data.details.slice(
                0,
                Math.min(
                    data.details.length,
                    3
                )
            );


        metaItems.forEach(item => {

            const box =
                document.createElement("div");

            const label =
                document.createElement("span");

            const value =
                document.createElement("strong");


            label.textContent =
                item.label;

            value.textContent =
                item.value;


            box.append(
                label,
                value
            );

            modalMeta.appendChild(
                box
            );

        });

    }


    /*
        DETAILS
    */

    modalDetails.innerHTML = "";


    if (data.details) {

        data.details.forEach(item => {

            const row =
                document.createElement("div");

            row.className =
                "modal-detail-row";


            const label =
                document.createElement("span");

            const value =
                document.createElement("p");


            label.textContent =
                item.label;

            value.textContent =
                item.value;


            row.append(
                label,
                value
            );


            modalDetails.appendChild(
                row
            );

        });

    }


    /*
        OPEN
    */

    modal.classList.add(
        "is-open"
    );

    modal.setAttribute(
        "aria-hidden",
        "false"
    );

    document.body.classList.add(
        "modal-open"
    );

    modalIsOpen = true;


    /*
        Start modal content
        animation from clean state.
    */

    requestAnimationFrame(() => {

        if (modalWindow) {

            modalWindow.scrollTop = 0;

        }

    });

}


/* =========================================================
   15. CLOSE MODAL
========================================================= */

function closeModal() {

    if (!modal || !modalIsOpen) {
        return;
    }


    modal.classList.remove(
        "is-open"
    );

    modal.setAttribute(
        "aria-hidden",
        "true"
    );

    document.body.classList.remove(
        "modal-open"
    );

    modalIsOpen = false;


    /*
        Give closing animation
        time to finish before
        clearing content.
    */

    setTimeout(() => {

        if (!modalIsOpen) {

            modalImage.innerHTML = "";

        }

    }, 500);

}


/* =========================================================
   16. PROJECT CLICK
========================================================= */

$$("[data-project]")
    .forEach(card => {

        function activateProject() {

            const id =
                card.dataset.project;

            const data =
                projectData[id];

            if (data) {

                openModal(data);

            }

        }


        card.addEventListener(
            "click",
            activateProject
        );


        card.addEventListener(
            "keydown",
            event => {

                if (
                    event.key === "Enter" ||
                    event.key === " "
                ) {

                    event.preventDefault();

                    activateProject();

                }

            }
        );

    });


/* =========================================================
   17. SERVICE CLICK
========================================================= */

$$("[data-service]")
    .forEach(card => {

        function activateService() {

            const id =
                card.dataset.service;

            const data =
                serviceData[id];

            if (data) {

                openModal(data);

            }

        }


        card.addEventListener(
            "click",
            activateService
        );


        card.addEventListener(
            "keydown",
            event => {

                if (
                    event.key === "Enter" ||
                    event.key === " "
                ) {

                    event.preventDefault();

                    activateService();

                }

            }
        );

    });


/* =========================================================
   18. EXPERIENCE CLICK
========================================================= */

$$("[data-experience]")
    .forEach(card => {

        function activateExperience() {

            const id =
                card.dataset.experience;

            const data =
                experienceData[id];

            if (data) {

                openModal(data);

            }

        }


        card.addEventListener(
            "click",
            activateExperience
        );


        card.addEventListener(
            "keydown",
            event => {

                if (
                    event.key === "Enter" ||
                    event.key === " "
                ) {

                    event.preventDefault();

                    activateExperience();

                }

            }
        );

    });


/* =========================================================
   19. MODAL CLOSE EVENTS
========================================================= */

if (modalClose) {

    modalClose.addEventListener(
        "click",
        closeModal
    );

}


const modalBackdrop =
    $(".modal-backdrop");


if (modalBackdrop) {

    modalBackdrop.addEventListener(
        "click",
        closeModal
    );

}


document.addEventListener(
    "keydown",
    event => {

        if (
            event.key === "Escape" &&
            modalIsOpen
        ) {

            closeModal();

        }

    }
);


/* =========================================================
   20. INTERNAL SMOOTH LINKS
========================================================= */

$$('a[href^="#"]')
    .forEach(link => {

        link.addEventListener(
            "click",
            event => {

                const targetId =
                    link.getAttribute("href");

                if (
                    !targetId ||
                    targetId === "#"
                ) {
                    return;
                }


                const target =
                    document.querySelector(
                        targetId
                    );


                if (!target) {
                    return;
                }


                event.preventDefault();


                closeMobileMenu();


                target.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });

            }
        );

    });


/* =========================================================
   21. BACK TO TOP
========================================================= */

const backToTop =
    $("#backToTop");


function updateBackToTop() {

    if (!backToTop) {
        return;
    }


    backToTop.classList.toggle(
        "is-visible",
        window.scrollY > 700
    );

}


window.addEventListener(
    "scroll",
    updateBackToTop,
    { passive: true }
);


if (backToTop) {

    backToTop.addEventListener(
        "click",
        () => {

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });

        }
    );

}


updateBackToTop();


/* =========================================================
   22. IMAGE ERROR HANDLING
========================================================= */

$$("img")
    .forEach(image => {

        image.addEventListener(
            "error",
            () => {

                image.style.display =
                    "none";

                const parent =
                    image.parentElement;

                if (parent) {

                    parent.classList.add(
                        "image-missing"
                    );

                }

            }
        );

    });


/* =========================================================
   23. PREVENT SPACE KEY FROM SCROLLING
       ON CLICKABLE CARDS
========================================================= */

$$(
    "[data-project], [data-service], [data-experience]"
)
.forEach(element => {

    element.addEventListener(
        "keydown",
        event => {

            if (
                event.key === " "
            ) {

                event.preventDefault();

            }

        }
    );

});


/* =========================================================
   24. FINAL
========================================================= */

console.log(
    "AJAY KUSHWHA V2 loaded successfully."
);