document.addEventListener('DOMContentLoaded', function() {
    const teachableCsvTextarea = document.getElementById('teachableCsv');
    const circleCsvTextarea = document.getElementById('circleCsv');
    const thresholdInput = document.getElementById('thresholdDays');
    const findStudentsButton = document.getElementById('findStudents');
    const outputCsvTextarea = document.getElementById('outputCsv');
    const downloadCsvButton = document.getElementById('downloadCsv');

    findStudentsButton.addEventListener('click', function() {
        const teachableCsv = teachableCsvTextarea.value;
        const circleCsv = circleCsvTextarea.value;
        const thresholdDays = parseInt(thresholdInput.value);

        if (!teachableCsv || !circleCsv || isNaN(thresholdDays)) {
            alert('Please fill in all fields and provide a valid number for the threshold.');
            return;
        }

        const teachableData = parseCsv(teachableCsv);
        const circleData = parseCsv(circleCsv);

        const inactiveStudents = filterInactiveStudents(teachableData, thresholdDays);
        const studentsToAssign = findStudentsNotInSpace(inactiveStudents, circleData);
        const outputCsv = generateOutputCsv(studentsToAssign);

        outputCsvTextarea.textContent = outputCsv;
        downloadCsvButton.style.display = 'block';
    });

    downloadCsvButton.addEventListener('click', function() {
        const outputCsv = outputCsvTextarea.value;
        const blob = new Blob([outputCsv], { type: 'text/csv' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'students_to_assign.csv';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    });
});