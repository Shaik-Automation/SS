document
  .getElementById("interestForm")
  .addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = document.getElementById("email").value;
    const reason = document.getElementById("reason").value;
    const responseMsg = document.getElementById("responseMsg");

    try {
      const res = await fetch("http://localhost:5000/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, reason }),
      });

      const data = await res.json();
      responseMsg.textContent = data.message;
    } catch (err) {
      responseMsg.textContent = "Something went wrong. Try again later.";
    }
  });
