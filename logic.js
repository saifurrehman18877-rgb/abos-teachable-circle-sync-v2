function parseCsv(csvString) {
    const Papa = typeof require !== 'undefined' ? require('papaparse') : window.Papa;
    return Papa.parse(csvString, { header: true, skipEmptyLines: true }).data;
}

function filterInactiveStudents(teachableData, thresholdDays) {
    const now = new Date();
    const thresholdMs = thresholdDays * 24 * 60 * 60 * 1000;

    return teachableData.filter(student => {
        const lastLoginDate = new Date(student.last_login_date);
        return now - lastLoginDate > thresholdMs;
    });
}

function findStudentsNotInSpace(inactiveStudents, circleData) {
    const needsEncouragementEmails = new Set(
        circleData
            .filter(member => member.community_space === 'needs-encouragement')
            .map(member => member.email)
    );

    return inactiveStudents.filter(student =>
        !needsEncouragementEmails.has(student.student_email)
    );
}

function generateOutputCsv(studentsToAssign) {
    const outputData = studentsToAssign.map(student => ({
        email: student.student_email,
        new_space: 'needs-encouragement'
    }));

    const Papa = typeof require !== 'undefined' ? require('papaparse') : window.Papa;
    return Papa.unparse(outputData);
}

if (typeof module !== 'undefined') {
    module.exports = {
        parseCsv,
        filterInactiveStudents,
        findStudentsNotInSpace,
        generateOutputCsv
    };
}