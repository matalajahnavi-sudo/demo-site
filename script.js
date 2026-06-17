// Sample events data
const eventsData = [
    {
        id: 1,
        title: "Summer Music Festival",
        date: "June 15, 2026",
        time: "5:00 PM - 11:00 PM",
        location: "Central Park, New York",
        category: "music",
        description: "Enjoy live performances from top artists across multiple genres. Food trucks, art installations, and more!",
        image: "images/music_festival.png"
    },
    {
        id: 2,
        title: "Tech Innovators Conference",
        date: "July 2, 2026",
        time: "9:00 AM - 6:00 PM",
        location: "Convention Center, San Francisco",
        category: "tech",
        description: "Explore the latest in technology, AI, and innovation. Keynote speakers, workshops, and networking opportunities.",
        image: "images/tech_conference.png"
    },
    {
        id: 3,
        title: "Food & Wine Expo",
        date: "August 10, 2026",
        time: "12:00 PM - 8:00 PM",
        location: "Waterfront Plaza, Chicago",
        category: "food",
        description: "Taste exquisite dishes from renowned chefs, sample fine wines, and learn about culinary trends.",
        image: "images/food_wine_expo.png"
    },
    {
        id: 4,
        title: "Indie Rock Night",
        date: "June 20, 2026",
        time: "8:00 PM - 12:00 AM",
        location: "The Rock House, Austin",
        category: "music",
        description: "An evening of independent rock music featuring local and up-and-coming bands.",
        image: "images/indie_rock_night.png"
    },
    {
        id: 5,
        title: "AI & Machine Learning Summit",
        date: "July 18, 2026",
        time: "10:00 AM - 5:00 PM",
        location: "Tech Hub, Boston",
        category: "tech",
        description: "Deep dive into AI and ML applications. Hands-on sessions and expert panels.",
        image: "images/ai_summit.png"
    },
    {
        id: 6,
        title: "Street Food Festival",
        date: "August 5, 2026",
        time: "11:00 AM - 9:00 PM",
        location: "Downtown Streets, Los Angeles",
        category: "food",
        description: "A celebration of global street food with live music and entertainment.",
        image: "images/street_food_festival.png"
    }
];

// DOM Elements
const eventsGrid = document.getElementById('events-grid');
const filterButtons = document.querySelectorAll('.filter-btn');
const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');
const contactForm = document.getElementById('contact-form');
const formResponse = document.getElementById('form-response');

// Modal elements
const modal = document.getElementById('event-modal');
const modalTitle = document.getElementById('modal-title');
const modalImage = document.querySelector('.modal-image');
const modalDescription = document.getElementById('modal-description');
const modalDate = document.getElementById('modal-date');
const modalTime = document.getElementById('modal-time');
const modalLocation = document.getElementById('modal-location');
const closeModalBtn = document.querySelector('.close-modal');

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    displayEvents(eventsData); // Show all events initially
    setupEventListeners();
});

// Display events in the grid
function displayEvents(events) {
    eventsGrid.innerHTML = ''; // Clear existing events

    if (events.length === 0) {
        eventsGrid.innerHTML = '<p class="no-events">No events found for this category.</p>';
        return;
    }

    events.forEach(event => {
        const eventCard = document.createElement('div');
        eventCard.className = 'event-card';
        eventCard.dataset.id = event.id; // Store event ID
        eventCard.innerHTML = `
            <div class="event-image" style="background-image: url('${event.image}')"></div>
            <div class="event-content">
                <h3>${event.title}</h3>
                <div class="event-meta">
                    <span>${event.date}</span>
                    <span>${event.time}</span>
                </div>
                <p class="event-description">${event.description}</p>
                <button class="event-btn learn-more-btn">Learn More</button>
            </div>
        `;
        eventsGrid.appendChild(eventCard);
    });
}

// Filter events by category
function filterEvents(category) {
    if (category === 'all') {
        displayEvents(eventsData);
    } else {
        const filtered = eventsData.filter(event => event.category === category);
        displayEvents(filtered);
    }
}

// Set up event listeners
function setupEventListeners() {
    // Filter buttons
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            // Filter events
            const category = button.getAttribute('data-filter');
            filterEvents(category);
        });
    });

    // Mobile navigation toggle
    navToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        navToggle.classList.toggle('active');
    });

    // Close mobile menu when clicking a link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            navToggle.classList.remove('active');
        });
    });

    // Event delegation for learn more buttons
    eventsGrid.addEventListener('click', (e) => {
        if (e.target.classList.contains('learn-more-btn')) {
            const eventCard = e.target.closest('.event-card');
            const eventId = parseInt(eventCard.dataset.id);
            const event = eventsData.find(e => e.id === eventId);
            if (event) {
                openModal(event);
            }
        }
    });

    // Close modal when clicking close button
    closeModalBtn.addEventListener('click', closeModal);

    // Close modal when clicking outside modal content
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });

    // Form submission
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        // Simple form validation
        const name = contactForm.name.value.trim();
        const email = contactForm.email.value.trim();
        const eventInterest = contactForm['event-interest'].value;
        const message = contactForm.message.value.trim();

        if (name === '' || email === '' || message === '') {
            showFormResponse('Please fill in all required fields.', 'error');
            return;
        }

        // Basic email validation
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(email)) {
            showFormResponse('Please enter a valid email address.', 'error');
            return;
        }

        // Simulate form submission (in a real app, you would send this to a server)
        setTimeout(() => {
            showFormResponse('Thank you for your message! We will get back to you soon.', 'success');
            contactForm.reset();
        }, 1000);
    });
}

// Open modal with event details
function openModal(event) {
    modalTitle.textContent = event.title;
    modalImage.style.backgroundImage = `url('${event.image}')`;
    modalDescription.textContent = event.description;
    modalDate.textContent = event.date;
    modalTime.textContent = event.time;
    modalLocation.textContent = event.location;
    modal.style.display = 'block';
}

// Close modal
function closeModal() {
    modal.style.display = 'none';
}

// Show form response message
function showFormResponse(message, type) {
    formResponse.textContent = message;
    formResponse.className = `form-response ${type}`;
    formResponse.style.display = 'block';

    // Hide after 5 seconds
    setTimeout(() => {
        formResponse.style.display = 'none';
    }, 5000);
}