/* =========================================================
   AJAY KUSHWAHA PORTFOLIO
   script.js
========================================================= */


/* =========================================================
   01. BASIC HELPERS
========================================================= */

const body = document.body;


/* =========================================================
   02. THEME TOGGLE
========================================================= */

const themeToggle = document.getElementById("themeToggle");


/*
    Theme ko browser mein save karne ke liye
    localStorage use kar rahe hain.
*/

const savedTheme = localStorage.getItem("ajay-theme");


/*
    Agar pehle Light Theme select kiya tha
    to website Light Theme mein open hogi.
*/

if (savedTheme === "light") {

    body.classList.add("light-theme");

}


/*
    Theme button click
*/

if (themeToggle) {

    themeToggle.addEventListener("click", () => {

        body.classList.toggle("light-theme");


        /*
            Theme save karo
        */

        if (body.classList.contains("light-theme")) {

            localStorage.setItem(
                "ajay-theme",
                "light"
            );

        } else {

            localStorage.setItem(
                "ajay-theme",
                "dark"
            );

        }

    });

}


/* =========================================================
   03. NAVBAR SCROLL EFFECT
========================================================= */

const navbar = document.getElementById("navbar");


function updateNavbar() {

    if (!navbar) {
        return;
    }


    if (window.scrollY > 40) {

        navbar.classList.add("scrolled");

    } else {

        navbar.classList.remove("scrolled");

    }

}


window.addEventListener(
    "scroll",
    updateNavbar,
    { passive: true }
);


updateNavbar();


/* =========================================================
   04. SCROLL PROGRESS
========================================================= */

const scrollProgress =
    document.getElementById("scrollProgress");


function updateScrollProgress() {

    if (!scrollProgress) {
        return;
    }


    const scrollTop =
        window.scrollY;


    const documentHeight =
        document.documentElement.scrollHeight
        - window.innerHeight;


    if (documentHeight <= 0) {

        scrollProgress.style.width = "0%";

        return;

    }


    const progress =
        (scrollTop / documentHeight) * 100;


    scrollProgress.style.width =
        `${progress}%`;

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
   05. MOBILE MENU
========================================================= */

const menuButton =
    document.getElementById("menuButton");


const mobileMenu =
    document.getElementById("mobileMenu");


if (menuButton && mobileMenu) {


    menuButton.addEventListener(
        "click",
        () => {

            menuButton.classList.toggle("active");

            mobileMenu.classList.toggle("active");


            const isOpen =
                mobileMenu.classList.contains("active");


            menuButton.setAttribute(
                "aria-expanded",
                isOpen ? "true" : "false"
            );

        }
    );


    /*
        Mobile menu ka link click hone ke baad
        menu automatically close ho jayega.
    */

    const mobileLinks =
        mobileMenu.querySelectorAll("a");


    mobileLinks.forEach((link) => {

        link.addEventListener(
            "click",
            () => {

                mobileMenu.classList.remove(
                    "active"
                );

                menuButton.classList.remove(
                    "active"
                );

                menuButton.setAttribute(
                    "aria-expanded",
                    "false"
                );

            }
        );

    });

}


/* =========================================================
   06. REVEAL ANIMATION
========================================================= */

const revealElements =
    document.querySelectorAll(".reveal");


/*
    IntersectionObserver ke through
    section screen par aane par animation chalega.
*/

if (
    "IntersectionObserver" in window
) {

    const revealObserver =
        new IntersectionObserver(
            (entries, observer) => {

                entries.forEach((entry) => {

                    if (
                        entry.isIntersecting
                    ) {

                        entry.target.classList.add(
                            "visible"
                        );


                        /*
                            Ek baar animation hone ke baad
                            dobara observe karne ki zaroorat nahi.
                        */

                        observer.unobserve(
                            entry.target
                        );

                    }

                });

            },
            {
                threshold: 0.12
            }
        );


    revealElements.forEach(
        (element) => {

            revealObserver.observe(
                element
            );

        }
    );

} else {


    /*
        Old browsers ke liye fallback.
    */

    revealElements.forEach(
        (element) => {

            element.classList.add(
                "visible"
            );

        }
    );

}


/* =========================================================
   07. PROJECT DATA
========================================================= */


/*
    IMPORTANT:

    YAHAN SE FUTURE MEIN PROJECT IMAGE CHANGE KARNA HAI.

    Example:

    image: "images/project-01.jpg"

    Folder structure:

    ajayPP/
    |
    |-- ajay.html
    |-- style.css
    |-- script.js
    |
    |-- images/
         |
         |-- project-01.jpg
         |-- project-02.jpg
         |-- project-03.jpg
         |-- project-04.jpg


    Agar image ka naam kuch aur hai,
    sirf image wali line change karna.
*/


const projectData = {


    /* =====================================================
       PROJECT 01
    ===================================================== */

    project1: {

        number: "01",

        category: "GRAPHIC DESIGN",

        title: "Visual Campaign",


        /*
            IMAGE PATH
            -----------------------------------------------
            Future mein yahan image add karna.

            Example:
            image: "images/project-01.jpg",
        */

        image: "images/project-01-visual-campaign.jpg",


        description:
            "A visual design project focused on creating clear, engaging and production-ready artwork for promotional communication.",


        details: [

            {
                label: "CATEGORY",
                value: "Graphic Design"
            },

            {
                label: "WORK",
                value: "Visual Campaign"
            },

            {
                label: "PROCESS",
                value: "Design & Production"
            }

        ]

    },


    /* =====================================================
       PROJECT 02
    ===================================================== */

    project2: {

        number: "02",

        category: "ADVERTISING",

        title: "Product Design",


        /*
            IMAGE PATH
        */

        image: "images/project-02-product-advertising.jpg",


        description:
            "Product-focused advertising artwork designed to present visual information in a clear and attractive format.",


        details: [

            {
                label: "CATEGORY",
                value: "Advertising"
            },

            {
                label: "WORK",
                value: "Product Advertising"
            },

            {
                label: "PROCESS",
                value: "Design & Print"
            }

        ]

    },


    /* =====================================================
       PROJECT 03
    ===================================================== */

    project3: {

        number: "03",

        category: "PACKAGING",

        title: "Packaging Design",


        /*
            IMAGE PATH
        */

        image: "images/project-03-packaging-design.jpg",


        description:
            "Packaging and product artwork prepared with attention to visual presentation, layout and print requirements.",


        details: [

            {
                label: "CATEGORY",
                value: "Packaging"
            },

            {
                label: "WORK",
                value: "Packaging Design"
            },

            {
                label: "PROCESS",
                value: "Artwork & Print"
            }

        ]

    },


    /* =====================================================
       PROJECT 04
    ===================================================== */

    project4: {

        number: "04",

        category: "PRINT",

        title: "Print Production",


        /*
            IMAGE PATH
        */

        image: "images/project-04-print-production.jpg",


        description:
            "Print production work involving artwork preparation, digital printing and production-focused execution.",


        details: [

            {
                label: "CATEGORY",
                value: "Print Production"
            },

            {
                label: "WORK",
                value: "Digital & UV Print"
            },

            {
                label: "PROCESS",
                value: "Production"
            }

        ]

    }

};


/* =========================================================
   08. SERVICE DATA
========================================================= */

const serviceData = {


    /* =====================================================
       GRAPHIC DESIGN
    ===================================================== */

    graphic: {

        number: "01",

        category: "SERVICE",

        title: "Graphic Design",


        /*
            Service ke liye image optional hai.

            Future mein image lagani ho to:

            image: "images/service-graphic.jpg"
        */

        image: "",


        description:
            "Creative visual design for marketing, advertising and brand communication. Artwork can be prepared according to the final print or digital requirement.",


        details: [

            {
                label: "SERVICE",
                value: "Graphic Design"
            },

            {
                label: "FOCUS",
                value: "Visual Communication"
            },

            {
                label: "OUTPUT",
                value: "Print & Digital"
            }

        ]

    },


    /* =====================================================
       DIGITAL PRINTING
    ===================================================== */

    digital: {

        number: "02",

        category: "SERVICE",

        title: "Digital Printing",

        image: "",

        description:
            "Digital printing work including artwork preparation and regular production operations with attention to accuracy and quality.",

        details: [

            {
                label: "SERVICE",
                value: "Digital Printing"
            },

            {
                label: "FOCUS",
                value: "Print Production"
            },

            {
                label: "PROCESS",
                value: "Design to Print"
            }

        ]

    },


    /* =====================================================
       UV PRINTING
    ===================================================== */

    uv: {

        number: "03",

        category: "SERVICE",

        title: "UV Printing",

        image: "",

        description:
            "UV printing machine operation and print preparation for production work.",

        details: [

            {
                label: "SERVICE",
                value: "UV Printing"
            },

            {
                label: "FOCUS",
                value: "UV Print"
            },

            {
                label: "PROCESS",
                value: "Production"
            }

        ]

    },


    /* =====================================================
       PRINT PREPARATION
    ===================================================== */

    preparation: {

        number: "04",

        category: "SERVICE",

        title: "Print Preparation",

        image: "",

        description:
            "Preparing artwork and files for accurate production while keeping layouts, sizing and final output requirements in mind.",

        details: [

            {
                label: "SERVICE",
                value: "Print Preparation"
            },

            {
                label: "FOCUS",
                value: "Artwork Setup"
            },

            {
                label: "OUTPUT",
                value: "Production Ready"
            }

        ]

    }

};


/* =========================================================
   09. EXPERIENCE DATA
========================================================= */

const experienceData = {


    main: {

        number: "01",

        category:
            "GRAPHIC DESIGN & PRINT PRODUCTION",

        title:
            "Graphic Designer & Printing Machine Operator",


        /*
            EXPERIENCE IMAGE

            Future mein image lagani ho:

            image: "images/experience.jpg"
        */

        image: "",


        description:
            "Graphic Designer and Printing Machine Operator with experience in designing and printing work. Skilled in digital and UV printing machines, preparing designs for printing, and handling regular machine operations while maintaining accuracy and quality.",


        details: [

            {
                label: "ROLE",
                value: "Graphic Designer"
            },

            {
                label: "SPECIALIZATION",
                value: "Digital & UV Printing"
            },

            {
                label: "WORK",
                value: "Design & Production"
            }

        ]

    }

};


/* =========================================================
   10. UNIVERSAL MODAL
========================================================= */

const modal =
    document.getElementById(
        "universalModal"
    );


const modalBackdrop =
    document.getElementById(
        "modalBackdrop"
    );


const modalClose =
    document.getElementById(
        "modalClose"
    );


const modalCategory =
    document.getElementById(
        "modalCategory"
    );


const modalNumber =
    document.getElementById(
        "modalNumber"
    );


const modalTitle =
    document.getElementById(
        "modalTitle"
    );


const modalImage =
    document.getElementById(
        "modalImage"
    );


const modalImagePlaceholder =
    document.getElementById(
        "modalImagePlaceholder"
    );


const modalDescription =
    document.getElementById(
        "modalDescription"
    );


const modalDetails =
    document.getElementById(
        "modalDetails"
    );


/*
    Last focused element save karenge,
    taaki modal close hone par focus wapas
    wahi aa sake.
*/

let lastFocusedElement = null;


/* =========================================================
   11. MODAL IMAGE HANDLER
========================================================= */

function loadModalImage(imagePath, altText) {


    if (
        !modalImage ||
        !modalImagePlaceholder
    ) {

        return;

    }


    /*
        Pehle old image reset.
    */

    modalImage.classList.remove(
        "loaded"
    );

    modalImage.removeAttribute(
        "src"
    );

    modalImage.alt = "";


    modalImagePlaceholder.style.display =
        "grid";


    /*
        Agar image path available hai,
        image load karo.
    */

    if (
        imagePath &&
        typeof imagePath === "string"
    ) {

        modalImage.onload = () => {

            modalImage.classList.add(
                "loaded"
            );

            modalImagePlaceholder.style.display =
                "none";

        };


        modalImage.onerror = () => {

            modalImage.classList.remove(
                "loaded"
            );

            modalImagePlaceholder.style.display =
                "grid";

        };


        modalImage.src = imagePath;

        modalImage.alt =
            altText || "Portfolio image";

    }

}


/* =========================================================
   12. MODAL DETAILS BUILDER
========================================================= */

function renderModalDetails(details) {


    if (!modalDetails) {
        return;
    }


    modalDetails.innerHTML = "";


    if (
        !Array.isArray(details)
    ) {

        return;

    }


    details.forEach((detail) => {


        const item =
            document.createElement("div");


        item.className =
            "modal-detail";


        const label =
            document.createElement("span");


        label.textContent =
            detail.label || "";


        const value =
            document.createElement("strong");


        value.textContent =
            detail.value || "";


        item.appendChild(label);

        item.appendChild(value);


        modalDetails.appendChild(item);

    });

}


/* =========================================================
   13. OPEN MODAL
========================================================= */

function openModal(data) {


    if (
        !modal ||
        !data
    ) {

        return;

    }


    /*
        Current focused element remember karo.
    */

    lastFocusedElement =
        document.activeElement;


    /*
        Category
    */

    if (modalCategory) {

        modalCategory.textContent =
            data.category || "";

    }


    /*
        Number
    */

    if (modalNumber) {

        modalNumber.textContent =
            data.number || "";

    }


    /*
        Title
    */

    if (modalTitle) {

        modalTitle.textContent =
            data.title || "";

    }


    /*
        Description
    */

    if (modalDescription) {

        modalDescription.textContent =
            data.description || "";

    }


    /*
        Image
    */

    loadModalImage(
        data.image,
        data.title
    );


    /*
        Details
    */

    renderModalDetails(
        data.details
    );


    /*
        Modal open
    */

    modal.classList.add(
        "active"
    );

    modal.setAttribute(
        "aria-hidden",
        "false"
    );


    body.classList.add(
        "modal-open"
    );


    /*
        Close button ko focus karo.
    */

    if (modalClose) {

        setTimeout(() => {

            modalClose.focus();

        }, 50);

    }

}


/* =========================================================
   14. CLOSE MODAL
========================================================= */

function closeModal() {


    if (!modal) {
        return;
    }


    modal.classList.remove(
        "active"
    );

    modal.setAttribute(
        "aria-hidden",
        "true"
    );


    body.classList.remove(
        "modal-open"
    );


    /*
        Modal image reset
    */

    if (modalImage) {

        modalImage.classList.remove(
            "loaded"
        );

    }


    /*
        Focus previous element par wapas.
    */

    if (
        lastFocusedElement &&
        typeof lastFocusedElement.focus === "function"
    ) {

        lastFocusedElement.focus();

    }


    lastFocusedElement = null;

}


/* =========================================================
   15. PROJECT MODAL
========================================================= */

const projectCards =
    document.querySelectorAll(
        "[data-project]"
    );


projectCards.forEach((card) => {


    const projectId =
        card.dataset.project;


    card.addEventListener(
        "click",
        () => {

            const project =
                projectData[projectId];


            openModal(project);

        }
    );


    /*
        Keyboard support:
        Enter / Space se project open hoga.
    */

    card.addEventListener(
        "keydown",
        (event) => {

            if (
                event.key === "Enter" ||
                event.key === " "
            ) {

                event.preventDefault();

                const project =
                    projectData[projectId];

                openModal(project);

            }

        }
    );

});


/* =========================================================
   16. SERVICE MODAL
========================================================= */

const serviceItems =
    document.querySelectorAll(
        "[data-service]"
    );


serviceItems.forEach((item) => {


    const serviceId =
        item.dataset.service;


    item.addEventListener(
        "click",
        () => {

            const service =
                serviceData[serviceId];


            openModal(service);

        }
    );


    /*
        Keyboard support
    */

    item.addEventListener(
        "keydown",
        (event) => {

            if (
                event.key === "Enter" ||
                event.key === " "
            ) {

                event.preventDefault();

                const service =
                    serviceData[serviceId];

                openModal(service);

            }

        }
    );

});


/* =========================================================
   17. EXPERIENCE MODAL
========================================================= */

const experienceCards =
    document.querySelectorAll(
        "[data-experience]"
    );


experienceCards.forEach((card) => {


    const experienceId =
        card.dataset.experience;


    card.addEventListener(
        "click",
        () => {

            const experience =
                experienceData[experienceId];


            openModal(experience);

        }
    );


    /*
        Keyboard support
    */

    card.addEventListener(
        "keydown",
        (event) => {

            if (
                event.key === "Enter" ||
                event.key === " "
            ) {

                event.preventDefault();

                const experience =
                    experienceData[experienceId];

                openModal(experience);

            }

        }
    );

});


/* =========================================================
   18. MODAL CLOSE BUTTON
========================================================= */

if (modalClose) {

    modalClose.addEventListener(
        "click",
        closeModal
    );

}


/* =========================================================
   19. CLOSE MODAL BY BACKDROP
========================================================= */

if (modalBackdrop) {

    modalBackdrop.addEventListener(
        "click",
        closeModal
    );

}


/* =========================================================
   20. ESC KEY
========================================================= */

document.addEventListener(
    "keydown",
    (event) => {

        if (
            event.key === "Escape" &&
            modal &&
            modal.classList.contains("active")
        ) {

            closeModal();

        }

    }
);


/* =========================================================
   21. LOAD PROJECT CARD IMAGES
========================================================= */


/*
    IMPORTANT:

    Project images ka main control yahi hai.

    Example:

    project1:
    image: "images/project-01.jpg"

    project2:
    image: "images/project-02.jpg"

    project3:
    image: "images/project-03.jpg"

    project4:
    image: "images/project-04.jpg"
*/


projectCards.forEach((card) => {


    const projectId =
        card.dataset.project;


    const project =
        projectData[projectId];


    if (
        !project ||
        !project.image
    ) {

        return;

    }


    const image =
        card.querySelector(
            ".work-card-image"
        );


    if (!image) {
        return;
    }


    image.onload = () => {

        image.classList.add(
            "loaded"
        );

    };


    image.onerror = () => {

        image.classList.remove(
            "loaded"
        );

    };


    image.src =
        project.image;


    image.alt =
        project.title || "Portfolio project";

});


/* =========================================================
   22. EXPERIENCE IMAGE SUPPORT
========================================================= */

experienceCards.forEach((card) => {


    const experienceId =
        card.dataset.experience;


    const experience =
        experienceData[experienceId];


    /*
        Current experience card mein image
        nahi hai, isliye future ke liye
        data ready rakha gaya hai.
    */

    if (
        !experience ||
        !experience.image
    ) {

        return;

    }

});


/* =========================================================
   23. EXPERIENCE IN NUMBERS
========================================================= */


/*
    Numbers HTML mein defined hain:

    data-target="7"
    data-target="29"
    data-target="20"

    Future mein number change karna ho to
    HTML mein data-target change karna.
*/


const counters =
    document.querySelectorAll(
        ".counter"
    );


function animateCounter(counter) {


    const target =
        Number(
            counter.dataset.target
        );


    if (
        Number.isNaN(target)
    ) {

        return;

    }


    const duration = 1600;

    const startTime =
        performance.now();


    function updateCounter(currentTime) {


        const elapsed =
            currentTime - startTime;


        const progress =
            Math.min(
                elapsed / duration,
                1
            );


        /*
            Smooth easing
        */

        const eased =
            1 -
            Math.pow(
                1 - progress,
                3
            );


        const currentValue =
            Math.floor(
                eased * target
            );


        counter.textContent =
            currentValue;


        if (
            progress < 1
        ) {

            requestAnimationFrame(
                updateCounter
            );

        } else {

            counter.textContent =
                target;

        }

    }


    requestAnimationFrame(
        updateCounter
    );

}


/*
    Numbers screen par aane ke baad
    animation start hogi.
*/

if (
    counters.length &&
    "IntersectionObserver" in window
) {


    const counterObserver =
        new IntersectionObserver(
            (entries, observer) => {


                entries.forEach(
                    (entry) => {


                        if (
                            entry.isIntersecting
                        ) {


                            animateCounter(
                                entry.target
                            );


                            observer.unobserve(
                                entry.target
                            );


                        }

                    }
                );


            },
            {
                threshold: .5
            }
        );


    counters.forEach(
        (counter) => {

            counterObserver.observe(
                counter
            );

        }
    );


} else {


    /*
        Fallback
    */

    counters.forEach(
        (counter) => {

            counter.textContent =
                counter.dataset.target;

        }
    );

}


/* =========================================================
   24. BACK TO TOP
========================================================= */

const backToTop =
    document.getElementById(
        "backToTop"
    );


function updateBackToTop() {


    if (!backToTop) {
        return;
    }


    if (
        window.scrollY > 600
    ) {

        backToTop.classList.add(
            "show"
        );

    } else {

        backToTop.classList.remove(
            "show"
        );

    }

}


window.addEventListener(
    "scroll",
    updateBackToTop,
    { passive: true }
);


updateBackToTop();


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


/* =========================================================
   25. SMOOTH INTERNAL LINKS
========================================================= */


/*
    Browser ka default anchor scroll already
    smooth hai because CSS mein:

    html {
        scroll-behavior: smooth;
    }

    Yahan extra handling sirf navbar offset
    ko better banane ke liye hai.
*/


const internalLinks =
    document.querySelectorAll(
        'a[href^="#"]'
    );


internalLinks.forEach((link) => {


    link.addEventListener(
        "click",
        (event) => {


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


            const navbarHeight =
                navbar
                    ? navbar.offsetHeight
                    : 0;


            const targetPosition =
                target.getBoundingClientRect()
                    .top
                + window.scrollY
                - navbarHeight
                - 10;


            window.scrollTo({

                top:
                    Math.max(
                        targetPosition,
                        0
                    ),

                behavior: "smooth"

            });

        }
    );

});


/* =========================================================
   26. IMAGE PRELOAD HELPER
========================================================= */


/*
    Future mein bahut images add karne par
    browser loading ko smooth rakhne ke liye
    helper function.
*/


function preloadImage(src) {


    return new Promise(
        (resolve, reject) => {


            if (!src) {

                reject(
                    new Error(
                        "Image path is empty."
                    )
                );

                return;

            }


            const image =
                new Image();


            image.onload =
                () => resolve(image);


            image.onerror =
                () => reject(
                    new Error(
                        `Unable to load image: ${src}`
                    )
                );


            image.src = src;

        }
    );

}
/* ============================================================
   FEATURED HERO IMAGES
   Future mein sirf yahan image names change karne hain.
============================================================ */

const featuredImages = [
    {
        image: "images/featured-01-kilian-campaign.jpg",
        title: "KILIAN",
        small: "VISUAL CAMPAIGN"
    },
    {
        image: "images/featured-02-dior-prestige.jpg",
        title: "DIOR",
        small: "PRODUCT ADVERTISING"
    },
    {
        image: "images/featured-03-dior-prestige.jpg",
        title: "DIOR PRESTIGE",
        small: "LUXURY VISUAL DESIGN"
    },
    {
        image: "images/featured-04-ysl-beauty.jpg",
        title: "YSL BEAUTY",
        small: "BEAUTY CAMPAIGN"
    }
];

const featuredCard = document.querySelector(".hero-card");

if (featuredCard && featuredImages.length) {

    const featuredCircle =
        featuredCard.querySelector(".art-circle");

    const featuredText =
        featuredCard.querySelector(".art-text");

    const featuredSmall =
        featuredCard.querySelector(".art-small");

    const featuredCounter =
        featuredCard.querySelector(".hero-card-top span:nth-child(2)");

    let featuredIndex = 0;

    function showFeaturedImage(index) {

        const item = featuredImages[index];

        if (!item || !featuredCircle) return;

        featuredCircle.style.opacity = "0.15";

setTimeout(() => {
    featuredCircle.style.backgroundImage =
        `url("${item.image}")`;

    featuredCircle.style.opacity = "1";
}, 300);

        featuredCircle.style.backgroundSize = "cover";
        featuredCircle.style.backgroundPosition = "center";

        if (featuredText) {
            featuredText.textContent = item.title;
        }

        if (featuredSmall) {
            featuredSmall.textContent = item.small;
        }

        if (featuredCounter) {
            featuredCounter.textContent =
                `${String(index + 1).padStart(2, "0")} / ${String(featuredImages.length).padStart(2, "0")}`;
        }
    }

    showFeaturedImage(featuredIndex);

    setInterval(() => {

        featuredIndex =
            (featuredIndex + 1) % featuredImages.length;

        showFeaturedImage(featuredIndex);

    }, 5000);
}

/* =========================================================
   27. CONSOLE MESSAGE
========================================================= */

console.log(
    "Ajay Kushwaha Portfolio loaded successfully."
);


/* =========================================================
   END OF script.js
========================================================= */