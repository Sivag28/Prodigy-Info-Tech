document.addEventListener("DOMContentLoaded", function () {
    const bookingForm = document.querySelector(".booking-form");
    const confirmationContainer = document.querySelector("#confirmationContainer");

    const destinationPrices = {
        Goa: 15000,
        Manali: 18000,
        Kerala: 20000,
        Jaipur: 12000,
        Andaman: 25000,
        Maldives: 80000,
        Paris: 120000,
        Dubai: 90000,
        Singapore: 85000,
        Switzerland: 150000
    };

    if (!bookingForm) {
        console.error("❌ Booking form not found!");
        return;
    }

    bookingForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const name = document.getElementById("name").value;
        const email = document.getElementById("email").value;
        const phone = document.getElementById("phone").value;
        const destination = document.getElementById("destination").value;
        const numPersons = document.getElementById("num-persons").value;
        const travelDate = document.getElementById("travel-date").value;
        const payment = document.getElementById("payment").value;
        const travelXCoupon = document.getElementById("travelx-coupon").checked; // Get checkbox value

        if (!name || !email || !destination || !numPersons || !phone || !payment || !travelDate) {
            alert("⚠️ Please fill in all fields before submitting.");
            return;
        }

        const amountPerPerson = destinationPrices[destination] || 0;
        let totalAmount = amountPerPerson * numPersons;
        if (travelXCoupon) {
            totalAmount -= 1000; // Example: ₹5000 discount
        }

        // Calculate return date (5 days after travel date)
        let returnDate = new Date(travelDate);
        returnDate.setDate(returnDate.getDate() + 5);
        let formattedReturnDate = returnDate.toISOString().split('T')[0];

        console.log("✅ Booking confirmed for:", name, destination, email, phone, travelDate, formattedReturnDate, numPersons, totalAmount);

        if (confirmationContainer) {
            confirmationContainer.innerHTML = `
                <h2>Booking Confirmed! ✅</h2>
                <p>Thank you, <strong>${name}</strong>. Your trip to <strong>${destination}</strong> is confirmed.</p>
                <p>We have sent the details to <strong>${email}</strong>.</p>
                <p><strong>Number of persons:</strong> ${numPersons}</p>
                <p><strong>Travel Date:</strong> ${travelDate}</p>
                <p><strong>Return Date:</strong> ${formattedReturnDate}</p>
                <p><strong>Total Amount:</strong> ₹${totalAmount}</p>
                <p><strong>Payment Method:</strong> ${payment}</p>
                ${travelXCoupon ? "<p>🎫 TravelX Flight Coupon Applied!</p>" : ""}
                <a href="index.html" class="cta-button">Go Back</a>
            `;
            confirmationContainer.style.display = "block"; // Ensure it is visible
        } else {
            console.error("❌ Confirmation container not found!");
        }
    });
});
