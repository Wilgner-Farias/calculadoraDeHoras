var currentYear = document.getElementById("current-year");
currentYear.innerHTML = new Date().getFullYear();

let calculateBtn = document.getElementById("calculate-hours");

calculateBtn.addEventListener("click", () => {
    var startTime = document.getElementById("start-time").value;
    var endTime = document.getElementById("end-time").value;
    var hourlyRate = document.getElementById("hourly-rate").value;
    var breakTime = document.getElementById("break-time").value;

    if (startTime === "" || endTime === "") {
        alert('Por favor, preencha as informações para o cálculo.');
        return;
    } else {
        let [startHour, startMinute] = startTime.split(":").map(Number);
        let [endHour, endMinute] = endTime.split(":").map(Number);

        let totalStartMinutes = startHour * 60 + startMinute;
        let totalEndMinutes = endHour * 60 + endMinute;

        let totalWorkedMinutes = totalEndMinutes - totalStartMinutes;

        if (totalWorkedMinutes < 0) {
            alert('O horário de saída deve ser maior que o horário de entrada.');
            return;
        }

        if (breakTime !== "") {
            let [breakHour, breakMinute] = breakTime.split(":").map(Number);
            let breakMinutes = breakHour * 60 + breakMinute;
            totalWorkedMinutes -= breakMinutes;
        }

        if (totalWorkedMinutes < 0) {
            totalWorkedMinutes = 0;
        }

        let finalHoursWorked = Math.floor(totalWorkedMinutes / 60);
        let finalRemainingMinutes = totalWorkedMinutes % 60;

        let totalPayment = (finalHoursWorked + finalRemainingMinutes / 60) * parseFloat(hourlyRate);

        let hourResult = document.getElementById("hours-worked");
        hourResult.innerHTML = `Horas trabalhadas: ${finalHoursWorked}h ${finalRemainingMinutes}min`;

        if (totalPayment > 0) {
            let costResult = document.getElementById("hourly-cost");
            costResult.innerHTML = `Custo total: R$ ${totalPayment.toFixed(2)}`;
        }

        let result = document.getElementById("result");
        result.style.removeProperty("display");
        result.style.display = "block";
    }
});
