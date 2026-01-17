const canvas = document.getElementById("progressCanvas");
  const ctx = canvas.getContext("2d");

  let goal = 0;
  let totalSaved = 0;

  function drawProgress() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = 90;

    // Background circle
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
    ctx.strokeStyle = "#eee";
    ctx.lineWidth = 15;
    ctx.stroke();

    if (goal <= 0) return;

    const progress = Math.min(totalSaved / goal, 1);
    const endAngle = progress * Math.PI * 2;

    // Progress arc
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, -Math.PI / 2, endAngle - Math.PI / 2);
    ctx.strokeStyle = "#2e7d32";
    ctx.lineWidth = 15;
    ctx.stroke();

    // Text
    ctx.font = "20px Arial";
    ctx.fillStyle = "#333";
    ctx.textAlign = "center";
    ctx.fillText(
      `${Math.round(progress * 100)}%`,
      centerX,
      centerY + 5
    );
  }

  function setGoal() {
    const goalInput = parseFloat(document.getElementById("goal").value);
    if (goalInput > 0) {
      goal = goalInput;
      totalSaved = 0;
      document.getElementById("log").innerHTML = "";
      drawProgress();
    }
  }

  function addDeposit() {
    const depositInput = parseFloat(document.getElementById("deposit").value);
    if (depositInput > 0 && goal > 0) {
      totalSaved += depositInput;

      const log = document.getElementById("log");
      const entry = document.createElement("div");
      entry.textContent = `Deposited: ${depositInput} | Total: ${totalSaved}`;
      log.prepend(entry);

      drawProgress();
      document.getElementById("deposit").value = "";
    }
  }

  drawProgress();