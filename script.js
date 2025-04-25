document.addEventListener('DOMContentLoaded', function() {
    const text = "Making it happen !";
    const typingElement = document.getElementById('typing-text');
    let i = 0;
    let isTyping = true;
    
    function loopTyping() {
        // Typing effect
        if (isTyping) {
            if (i < text.length) {
                typingElement.textContent += text.charAt(i);
                i++;
            } else {
                isTyping = false;
                setTimeout(loopTyping, 1500); // Pause before starting to erase
                return;
            }
        } 
        // Erasing effect
        else {
            if (i > 0) {
                i--;
                typingElement.textContent = text.substring(0, i);
            } else {
                isTyping = true;
                setTimeout(loopTyping, 500); // Pause before starting to type again
                return;
            }
        }
        
        // Speed: typing is slightly slower than erasing
        const speed = isTyping ? 150 : 100;
        setTimeout(loopTyping, speed);
    }
    
    // Start typing effect loop
    loopTyping();
    
    // Generate animated shapes
    const shapesContainer = document.querySelector('.shapes-container');
    const numberOfShapes = 15; // Total number of shapes to create
    
    for (let i = 0; i < numberOfShapes; i++) {
        // Decide if it's a circle or triangle
        const isCircle = Math.random() > 0.5;
        const shape = document.createElement('div');
        
        // Set common properties
        shape.style.position = 'absolute';
        shape.style.opacity = (Math.random() * 0.5 + 0.1).toString(); // Between 0.1 and 0.6
        
        // Set random starting position
        shape.style.left = Math.random() * 100 + 'vw';
        shape.style.top = Math.random() * 100 + 'vh';
        
        if (isCircle) {
            // Create a circle
            const size = Math.random() * 50 + 20; // Between 20px and 70px
            shape.className = 'shape circle';
            shape.style.width = size + 'px';
            shape.style.height = size + 'px';
            shape.style.borderRadius = '50%';
            shape.style.backgroundColor = 'var(--primary-blue)';
        } else {
            // Create a triangle
            const size = Math.random() * 40 + 20; // Between 20px and 60px
            shape.className = 'shape triangle';
            shape.style.width = '0';
            shape.style.height = '0';
            shape.style.borderLeft = size/2 + 'px solid transparent';
            shape.style.borderRight = size/2 + 'px solid transparent';
            shape.style.borderBottom = size + 'px solid var(--primary-pink)';
        }
        
        // Generate random movement parameters
        const speedX = (Math.random() - 0.5) * 0.1; // Between -0.05 and 0.05 vw per frame
        const speedY = (Math.random() - 0.5) * 0.1; // Between -0.05 and 0.05 vh per frame
        const rotation = Math.random() * 360; // Initial rotation (0-360 degrees)
        const rotationSpeed = (Math.random() - 0.5) * 0.5; // Rotation speed
        
        shape.setAttribute('data-speed-x', speedX);
        shape.setAttribute('data-speed-y', speedY);
        shape.setAttribute('data-rotation', rotation);
        shape.setAttribute('data-rotation-speed', rotationSpeed);
        
        // Apply initial rotation
        shape.style.transform = `rotate(${rotation}deg)`;
        
        // Add the shape to the container
        shapesContainer.appendChild(shape);
    }
    
    // Animate the shapes
    function animateShapes() {
        const shapes = document.querySelectorAll('.shape');
        
        shapes.forEach(shape => {
            const currentLeft = parseFloat(shape.style.left);
            const currentTop = parseFloat(shape.style.top);
            const speedX = parseFloat(shape.getAttribute('data-speed-x'));
            const speedY = parseFloat(shape.getAttribute('data-speed-y'));
            let rotation = parseFloat(shape.getAttribute('data-rotation'));
            const rotationSpeed = parseFloat(shape.getAttribute('data-rotation-speed'));
            
            // Update position
            let newLeft = currentLeft + speedX;
            let newTop = currentTop + speedY;
            
            // Bounce off edges
            if (newLeft < -10 || newLeft > 110) {
                shape.setAttribute('data-speed-x', -speedX);
                newLeft = currentLeft;
            }
            
            if (newTop < -10 || newTop > 110) {
                shape.setAttribute('data-speed-y', -speedY);
                newTop = currentTop;
            }
            
            // Update rotation
            rotation += rotationSpeed;
            shape.setAttribute('data-rotation', rotation);
            
            // Apply new position and rotation
            shape.style.left = newLeft + 'vw';
            shape.style.top = newTop + 'vh';
            shape.style.transform = `rotate(${rotation}deg)`;
        });
        
        requestAnimationFrame(animateShapes);
    }
    
    // Start the animation
    animateShapes();
    
    // Navbar scroll effect
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('navbar-scrolled');
            navbar.classList.remove('navbar-transparent');
        } else {
            navbar.classList.add('navbar-transparent');
            navbar.classList.remove('navbar-scrolled');
        }
    });
    
    // Collapse navbar when clicking a nav item on mobile
    const navLinks = document.querySelectorAll('.nav-link');
    const menuToggle = document.getElementById('navbarNav');
    const bsCollapse = new bootstrap.Collapse(menuToggle, {toggle: false});
    
    navLinks.forEach(function(navLink) {
        navLink.addEventListener('click', function() {
            if (window.innerWidth < 992) {
                bsCollapse.hide();
            }
        });
    });

    // Intersection Observer for scroll animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.2
    });
    
    // Observe all animated elements
    document.querySelectorAll('.animate-left, .animate-right, .animate-bottom').forEach(element => {
        observer.observe(element);
    });

    // Get the contact form element
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        // Add event listener for form submission
        contactForm.addEventListener('submit', function(event) {
            event.preventDefault(); // Prevent default form submission
            
            // Form validation
            if (!validateForm()) {
                return false;
            }
            
            // Get form data
            const formData = new FormData(contactForm);
            
            // Replace with your Formspree endpoint
            // Format: https://formspree.io/f/{your-form-id}
            const formspreeEndpoint = 'https://formspree.io/f/xxxyyyzzz'; // Replace with your actual form ID
            
            // Show loading state
            const submitBtn = contactForm.querySelector('.submit-btn');
            const originalBtnText = submitBtn.textContent;
            submitBtn.disabled = true;
            submitBtn.textContent = 'Sending...';
            
            // Submit the form to Formspree
            fetch(formspreeEndpoint, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            })
            .then(response => {
                if (response.ok) {
                    return response.json();
                }
                throw new Error('Network response was not ok.');
            })
            .then(data => {
                // Show success message
                showMessage('success', 'Thank you! Your message has been sent successfully.');
                contactForm.reset(); // Reset form fields
            })
            .catch(error => {
                // Show error message
                showMessage('error', 'Oops! There was a problem sending your message. Please try again later.');
                console.error('Form submission error:', error);
            })
            .finally(() => {
                // Reset button state
                submitBtn.disabled = false;
                submitBtn.textContent = originalBtnText;
            });
        });
    }
    
    // Form validation function
    function validateForm() {
        let isValid = true;
        
        // Get form fields
        const name = document.getElementById('name');
        const email = document.getElementById('email');
        const message = document.getElementById('message');
        
        // Reset previous error states
        removeErrorState(name);
        removeErrorState(email);
        removeErrorState(message);
        
        // Validate name
        if (!name.value.trim()) {
            addErrorState(name, 'Please enter your name');
            isValid = false;
        }
        
        // Validate email
        if (!email.value.trim()) {
            addErrorState(email, 'Please enter your email');
            isValid = false;
        } else if (!isValidEmail(email.value.trim())) {
            addErrorState(email, 'Please enter a valid email address');
            isValid = false;
        }
        
        // Validate message
        if (!message.value.trim()) {
            addErrorState(message, 'Please enter your message');
            isValid = false;
        }
        
        return isValid;
    }
    
    // Email validation function
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    // Add error state to input
    function addErrorState(input, message) {
        input.classList.add('is-invalid');
        
        // Create error message element if it doesn't exist
        let errorElement = input.parentElement.querySelector('.invalid-feedback');
        if (!errorElement) {
            errorElement = document.createElement('div');
            errorElement.className = 'invalid-feedback';
            input.parentElement.appendChild(errorElement);
        }
        
        errorElement.textContent = message;
    }
    
    // Remove error state from input
    function removeErrorState(input) {
        input.classList.remove('is-invalid');
        const errorElement = input.parentElement.querySelector('.invalid-feedback');
        if (errorElement) {
            errorElement.remove();
        }
    }
    
    // Function to show form submission messages
    function showMessage(type, text) {
        // Remove any existing message
        const existingMessage = document.querySelector('.form-message');
        if (existingMessage) {
            existingMessage.remove();
        }
        
        // Create message element
        const messageElement = document.createElement('div');
        messageElement.className = `form-message alert alert-${type === 'success' ? 'success' : 'danger'} mt-3 animate-fade`;
        messageElement.textContent = text;
        
        // Insert message after form
        contactForm.parentElement.appendChild(messageElement);
        
        // Auto-remove message after 5 seconds
        setTimeout(() => {
            messageElement.classList.add('fade-out');
            setTimeout(() => {
                messageElement.remove();
            }, 500);
        }, 5000);
    }
    // Function to dynamically add images to the slider
    function initializeImageSlider(imageUrls) {
        if (!imageUrls || imageUrls.length === 0) return;
        
        const sliderTrack = document.querySelector('.slider-track');
        if (!sliderTrack) return;
        
        // Clear existing slides
        sliderTrack.innerHTML = '';
        
        // Create slides for each image (original set)
        imageUrls.forEach((url, index) => {
            const slide = document.createElement('div');
            slide.className = 'slide';
            
            const img = document.createElement('img');
            img.src = url;
            img.alt = `Partner ${index + 1}`;
            
            slide.appendChild(img);
            sliderTrack.appendChild(slide);
        });
        
        // Duplicate the slides for seamless infinite scrolling
        imageUrls.forEach((url, index) => {
            const slide = document.createElement('div');
            slide.className = 'slide';
            
            const img = document.createElement('img');
            img.src = url;
            img.alt = `Partner ${index + 1}`;
            
            slide.appendChild(img);
            sliderTrack.appendChild(slide);
        });
        
        // Update animation duration based on number of images
        const slidesCount = imageUrls.length;
        const baseSpeed = 5; // seconds for 1 image
        const animationDuration = baseSpeed * slidesCount;
        
        // Update CSS animation
        sliderTrack.style.animation = `scroll ${animationDuration}s linear infinite`;
        
        // Update slide width calculation
        const slideWidth = 200; // Base slide width
        sliderTrack.style.width = `${slideWidth * slidesCount * 2}px`; // Double for duplicate set
        
        // Update animation keyframes
        document.styleSheets[0].insertRule(`
            @keyframes scroll {
                0% {
                    transform: translateX(0);
                }
                100% {
                    transform: translateX(calc(-${slideWidth}px * ${slidesCount}));
                }
            }
        `, 0);
    }
});