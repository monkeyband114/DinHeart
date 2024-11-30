document
  .getElementById("heartDiseaseForm")
  .addEventListener("submit", function (e) {
    e.preventDefault();

    const formData = new FormData(this);
    const data = Object.fromEntries(formData.entries());

    // Convert string values to numbers
    for (let key in data) {
      data[key] = Number(data[key]);
    }
    console.log(data);
    const risk = predictHeartDiseaseRisk(data);
    displayResult(risk);
  });

function predictHeartDiseaseRisk(data) {
  let riskScore = 0;

  // Age factor
  if (data.age > 55) riskScore += 2;
  else if (data.age > 45) riskScore += 1;

  // Sex factor (assuming 1 is male, 0 is female)
  if (data.sex === 1) riskScore += 1;

  // Chest pain type factor
  if (data.chestPainType === 3) riskScore += 3;
  else if (data.chestPainType === 0) riskScore += 2;

  // Blood pressure factor
  if (data.restingBP > 140) riskScore += 2;
  else if (data.restingBP > 120) riskScore += 1;

  // Cholesterol factor
  if (data.serumCholesterol > 240) riskScore += 2;
  else if (data.serumCholesterol > 200) riskScore += 1;

  // Fasting blood sugar factor
  if (data.fastingBS === 1) riskScore += 1;

  // ECG results factor
  if (data.restingECG === 2) riskScore += 2;
  else if (data.restingECG === 1) riskScore += 1;

  // Maximum heart rate factor
  if (data.maxHR > 100) riskScore += 1;

  // Exercise induced angina factor
  if (data.exerciseAngina === 1) riskScore += 2;

  // ST depression factor
  if (data.oldpeak > 2) riskScore += 2;
  else if (data.oldpeak > 1) riskScore += 1;

  // ST slope factor
  if (data.stSlope === 2) riskScore += 2;
  else if (data.stSlope === 1) riskScore += 1;

  // Number of vessels factor
  riskScore += data.numVessels;
  console.log(riskScore);
  // Determine risk category
  if (riskScore >= 10) return "A";
  else if (riskScore >= 5) return "B";
  else return "C";
}

function displayResult(risk) {
  const resultDiv = document.getElementById("result");
  resultDiv.classList.remove("hidden");
  let message, icon, color, advice;
  switch (risk) {
    case "A":
      message = "High Risk: Prone to heart disease";
      icon = "fa-exclamation-triangle";
      color = "text-red-600";
      advice =
        "Please consult a cardiologist immediately for a thorough evaluation.";
      break;
    case "B":
      message = "Moderate Risk: Not so prone to heart disease";
      icon = "fa-exclamation-circle";
      color = "text-yellow-600";
      advice =
        "Consider lifestyle changes and regular check-ups with your doctor.";
      break;
    case "C":
      message = "Low Risk: Not at all prone to heart disease";
      icon = "fa-check-circle";
      color = "text-green-600";
      advice =
        "Maintain your healthy lifestyle and continue regular check-ups.";
      break;
  }

  resultDiv.innerHTML = `
        <div class="flex flex-col items-center">
            <i class="fas ${icon} ${color} text-5xl mb-4"></i>
            <h3 class="${color} text-2xl font-bold mb-2">${message}</h3>
            <p class="text-gray-600 mb-4">${advice}</p>
            <div class="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                <div class="bg-blue-600 h-2.5 rounded-full" style="width: ${
                  risk === "A" ? "100%" : risk === "B" ? "50%" : "25%"
                }"></div>
            </div>
        </div>
    `;

  // Show the result section
  document.getElementById("result").classList.remove("hidden");
  Alpine.store("showResult", true);
}

// Initialize Alpine.js store
document.addEventListener("alpine:init", () => {
  Alpine.store("showResult", false);
});
