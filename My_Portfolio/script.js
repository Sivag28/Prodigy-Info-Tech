document.addEventListener("DOMContentLoaded", function () {
    console.log("Portfolio Website Loaded Successfully!");
    const toggleButton = document.createElement("button");
    toggleButton.innerText = "Toggle Dark Mode";
    toggleButton.id = "theme-toggle";
    Object.assign(toggleButton.style, {
        position: "fixed",
        bottom: "20px",
        right: "20px",
        padding: "10px",
        background: "#f0a500",
        color: "#222",
        border: "none",
        cursor: "pointer",
        borderRadius: "5px",
        fontSize: "16px",
        transition: "background 0.3s ease"
    });
    document.body.appendChild(toggleButton);

    toggleButton.addEventListener("click", () => {
        document.body.classList.toggle("dark-mode");
        localStorage.setItem("darkMode", document.body.classList.contains("dark-mode"));
    });

    if (localStorage.getItem("darkMode") === "true") {
        document.body.classList.add("dark-mode");
    }

    const navLinks = document.querySelectorAll("nav ul li a");
    if (navLinks.length) {
        navLinks.forEach(anchor => {
            anchor.addEventListener("click", function (e) {
                if (this.getAttribute("href").startsWith("#")) {
                    e.preventDefault();
                    const sectionId = this.getAttribute("href").substring(1);
                    const section = document.getElementById(sectionId);
                    if (section) {
                        window.scrollTo({
                            top: section.offsetTop - 50,
                            behavior: "smooth"
                        });
                    }
                }
            });
        });
    }

    const header = document.querySelector("header");
    if (header) {
        window.addEventListener("scroll", () => {
            if (window.scrollY > 50) {
                header.style.background = "#222";
                header.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.2)";
            } else {
                header.style.background = "#333";
                header.style.boxShadow = "none";
            }
        });
    }
    document.querySelectorAll(".progress").forEach(progress => {
        let width = progress.style.width;
        progress.style.width = "0"; 
        setTimeout(() => {
            progress.style.width = width; 
        }, 300);
    });

    const projectItems = document.querySelectorAll(".project-item");
    const projectTitle = document.getElementById("project-title");
    const projectImage = document.getElementById("project-image");
    const projectDescription = document.getElementById("project-description");

    projectItems.forEach(item => {
        item.addEventListener("click", (event) => {
            event.preventDefault(); 
            
            projectTitle.textContent = item.getAttribute("data-title");
            projectImage.src = item.getAttribute("data-image");
            projectImage.alt = item.getAttribute("data-title");
            projectDescription.textContent = item.getAttribute("data-description");
            document.querySelector('#project-details').scrollIntoView({
                behavior: 'smooth',
                block: 'start' 
            });

        });
    });

    function showProject(title, description, imageSrc) {
        console.log("showProject() called with:", title, description, imageSrc);
        
        const projectTitle = document.getElementById("projectTitle");
        const projectDesc = document.getElementById("projectDesc");
        const projectImage = document.getElementById("projectImage");
        const projectDisplay = document.getElementById("projectDisplay");
    
        if (!projectTitle || !projectDesc || !projectImage || !projectDisplay) {
            console.error("One or more elements not found in the DOM!");
            return;
        }
    
        projectTitle.innerText = title;
        projectDesc.innerText = description;
        projectImage.src = imageSrc;
        projectImage.style.display = "block"; 
        projectDisplay.style.display = "block";
    }
    
const certItems = document.querySelectorAll(".cert-item");
const certTitle = document.getElementById("cert-title");
const certDescription = document.getElementById("cert-description");
const certImage = document.getElementById("cert-image");
const certDisplay = document.getElementById("cert-display");

certItems.forEach(item => {
    item.addEventListener("click", (event) => {
        event.preventDefault(); 

        certTitle.textContent = item.getAttribute("data-title");
        certDescription.textContent = item.getAttribute("data-description") || "No description available.";
        certImage.src = item.getAttribute("data-image");
        certImage.alt = item.getAttribute("data-title");
        document.querySelector('#cert-details').scrollIntoView({
            behavior: 'smooth',
            block: 'start'  
        });

        
    });
});

function showCertificate(title, description, imageSrc) {
    console.log("showCertificate() called with:", title, description, imageSrc);

    if (!certTitle || !certDescription || !certImage || !certDisplay) {
        console.error("One or more elements not found in the DOM!");
        return;
    }

    certTitle.innerText = title;
    certDescription.innerText = description || "No description available.";
    certImage.src = imageSrc;
    certImage.style.display = "block"; 
    certDisplay.style.display = "block";
}    
const contactForm = document.getElementById("contactForm");
const confirmationContainer = document.getElementById("confirmationContainer");
const confirmationName = document.getElementById("confirmationName");
const confirmationEmail = document.getElementById("confirmationEmail");

contactForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const message = document.getElementById("message").value.trim();

    if (!name || !email || !message) {
        alert("⚠️ Please fill in all fields before submitting.");
        return;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
        alert("⚠️ Please enter a valid email address.");
        return;
    }

    confirmationName.textContent = name;
    confirmationEmail.textContent = email;
    confirmationContainer.style.display = "block";
    contactForm.reset();
});
});
const style = document.createElement("style");
style.innerHTML = `
    .dark-mode {
        background-color: #222;
        color: #fff;
    }
    .dark-mode header {
        background-color: #111;
    }
    .dark-mode nav ul li a {
        color: #ffcc00;
    }
    .dark-mode footer {
        background-color: #111;
    }
`;
document.head.appendChild(style);
