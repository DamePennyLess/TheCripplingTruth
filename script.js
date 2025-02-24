// ✅ Smooth Scroll Navigation
document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll('.navbar a').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
});

// ✅ Contact Form Submission Handler
document.getElementById("contact-form")?.addEventListener("submit", function (event) {
    event.preventDefault();
    document.getElementById("form-response").textContent = "Thank you! We’ll get back to you soon.";
    setTimeout(() => {
        document.getElementById("form-response").textContent = "";
    }, 5000);
    this.reset();
});

// ✅ Shopping Cart Functionality
document.addEventListener("DOMContentLoaded", function () {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    updateCartCount();

    document.querySelectorAll(".add-to-cart").forEach(button => {
        button.addEventListener("click", function () {
            const product = this.parentElement;
            const item = {
                id: product.getAttribute("data-id"),
                name: product.getAttribute("data-name"),
                price: parseFloat(product.getAttribute("data-price")),
                quantity: 1
            };

            const existingItem = cart.find(i => i.id === item.id);
            if (existingItem) {
                existingItem.quantity++;
            } else {
                cart.push(item);
            }

            localStorage.setItem("cart", JSON.stringify(cart));
            updateCartCount();
            alert("Added to cart! (If only DWP decisions were this fast...)");
        });
    });

    if (document.getElementById("cart-items")) {
        renderCart();
    }
});

function updateCartCount() {
    document.getElementById("cart-count").textContent = JSON.parse(localStorage.getItem("cart"))?.length || 0;
}

function renderCart() {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const cartItems = document.getElementById("cart-items");
    const cartTotal = document.getElementById("cart-total");

    cartItems.innerHTML = "";
    let total = 0;

    cart.forEach(item => {
        total += item.price * item.quantity;
        cartItems.innerHTML += `
            <tr>
                <td>${item.name}</td>
                <td>£${item.price.toFixed(2)}</td>
                <td>${item.quantity}</td>
                <td>£${(item.price * item.quantity).toFixed(2)}</td>
                <td><button onclick="removeItem('${item.id}')">❌</button></td>
            </tr>
        `;
    });

    cartTotal.textContent = total.toFixed(2);
}

function removeItem(id) {
    let cart = JSON.parse(localStorage.getItem("cart"));
    cart = cart.filter(item => item.id !== id);
    localStorage.setItem("cart", JSON.stringify(cart));
    renderCart();
    updateCartCount();
}

// ✅ 🎡 Wheel of Misfortune: Updated (Only "X" on Wheel, Show Result at Bottom)
document.addEventListener("DOMContentLoaded", function () {
    const canvas = document.getElementById("wheelCanvas");
    if (!canvas) return; // Exit if wheel section is not on the page

    const ctx = canvas.getContext("2d");
    const spinButton = document.getElementById("spinButton");
    const wheelResult = document.getElementById("wheelResult");

    const outcomes = [
        "❌ You blinked during assessment—CLEARLY fit for work!",
        "❌ Breathing unaided? You can definitely hold a full-time job.",
        "❌ Used a wheelchair but managed to smile? TOO POSITIVE.",
        "❌ Arrived at assessment alone? Congratulations, you’re independent!",
        "❌ You can lift a cup of tea? That’s heavy lifting right there.",
        "❌ Claimed you have pain—pain can’t be *seen*, denied!",
        "❌ Waited 6 months for this? Should’ve worked during that time.",
        "❌ Existing? Must mean you’re thriving. Rejected!"
    ];

    const colors = ["#FF6B6B", "#FFD93D", "#6BCB77", "#4D96FF", "#FF5D9E", "#8E44AD", "#F39C12", "#3498DB"];

    let startAngle = 0;
    const arc = Math.PI / (outcomes.length / 2);
    let spinAngleStart = 10;
    let spinTime = 0;
    let spinTimeTotal = 0;

    function drawWheel() {
        const outsideRadius = 150;
        const insideRadius = 50;

        ctx.clearRect(0, 0, 400, 400);
        ctx.strokeStyle = "black";
        ctx.lineWidth = 2;
        ctx.font = "30px Arial";

        for (let i = 0; i < outcomes.length; i++) {
            const angle = startAngle + i * arc;
            ctx.fillStyle = colors[i % colors.length];

            ctx.beginPath();
            ctx.arc(200, 200, outsideRadius, angle, angle + arc, false);
            ctx.arc(200, 200, insideRadius, angle + arc, angle, true);
            ctx.stroke();
            ctx.fill();

            // Only draw "X" in each section
            ctx.save();
            ctx.fillStyle = "white";
            ctx.translate(
                200 + Math.cos(angle + arc / 2) * 100,
                200 + Math.sin(angle + arc / 2) * 100
            );
            ctx.rotate(angle + arc / 2 + Math.PI / 2);
            ctx.fillText("X", -10, 10); // Display "X" in each section
            ctx.restore();
        }
    }

    function rotateWheel() {
        spinTime += 30;
        if (spinTime >= spinTimeTotal) {
            stopRotateWheel();
            return;
        }
        const spinAngle = spinAngleStart - easeOut(spinTime, 0, spinAngleStart, spinTimeTotal);
        startAngle += (spinAngle * Math.PI / 180);
        drawWheel();
        requestAnimationFrame(rotateWheel);
    }

    function stopRotateWheel() {
        const degrees = startAngle * 180 / Math.PI + 90;
        const arcd = arc * 180 / Math.PI;
        const index = Math.floor((360 - degrees % 360) / arcd);
        wheelResult.textContent = outcomes[index];
    }

    function easeOut(t, b, c, d) {
        const ts = (t /= d) * t;
        const tc = ts * t;
        return b + c * (tc + -3 * ts + 3 * t);
    }

    spinButton.addEventListener("click", function () {
        spinAngleStart = Math.random() * 10 + 10;
        spinTime = 0;
        spinTimeTotal = Math.random() * 3000 + 4000;
        rotateWheel();
    });

    drawWheel(); // Initial Draw
});

// ✅ ♿ Satirical Accessibility Checker Logic
document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("accessibilityForm");
    const resultDiv = document.getElementById("accessibilityResult");

    const verdicts = [
        "✅ Congratulations! According to absolutely no credible standards, you're 100% accessible!",
        "⚠️ Partial Accessibility: Looks good on paper. In reality? Good luck.",
        "❌ Accessibility FAIL: More accessible to a ghost than an actual person.",
        "🤡 Bonus Points: You qualify for the 'We Tried' award. Barely.",
        "💀 Total Disaster: If inaccessibility were a sport, you’d have gold."
    ];

    form.addEventListener("submit", function (e) {
        e.preventDefault();
        const checkedOptions = document.querySelectorAll('input[name="option"]:checked').length;

        let accessibilityVerdict = "";
        if (checkedOptions === 0) {
            finalVerdict = verdicts[0]; // Perfect Accessibility
        } else if (checkedOptions === 1 || checkedOptions === 2) {
            accessibilityVerdict = verdicts[1]; // Partial Accessibility
        } else if (checkedOptions === 3) {
            accessibilityVerdict = verdicts[2]; // Accessibility FAIL
        } else if (checkedOptions === 4) {
            accessibilityVerdict = verdicts[3]; // Bonus Points
        } else {
            accessibilityVerdict = verdicts[4]; // Total Disaster
        }

        resultDiv.textContent = accessibilityVerdict;
    });
});