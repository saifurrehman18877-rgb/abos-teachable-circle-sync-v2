const assert = require('assert');
const { parseCsv, filterInactiveStudents, findStudentsNotInSpace, generateOutputCsv } = require('./logic');

// Dates relative to "now" rather than hardcoded — filterInactiveStudents
// compares against the real current date, so fixed 2023 dates would always
// end up "inactive" no matter when this test runs (verified live: this
// broke the test on every future run, not just once).
function daysAgo(n) {
    const d = new Date();
    d.setDate(d.getDate() - n);
    return d.toISOString().slice(0, 10);
}
const teachableData = [
    { student_email: 'student1@example.com', last_login_date: daysAgo(30) },
    { student_email: 'student2@example.com', last_login_date: daysAgo(2) },
    { student_email: 'student3@example.com', last_login_date: daysAgo(20) },
    { student_email: 'student4@example.com', last_login_date: daysAgo(1) }
];

const circleData = [
    { email: 'student1@example.com', community_space: 'active' },
    { email: 'student2@example.com', community_space: 'needs-encouragement' },
    { email: 'student3@example.com', community_space: 'active' },
    { email: 'student5@example.com', community_space: 'needs-encouragement' }
];

const thresholdDays = 14;

const inactiveStudents = filterInactiveStudents(teachableData, thresholdDays);
assert.strictEqual(inactiveStudents.length, 2);
assert.strictEqual(inactiveStudents[0].student_email, 'student1@example.com');
assert.strictEqual(inactiveStudents[1].student_email, 'student3@example.com');

const studentsNotInSpace = findStudentsNotInSpace(inactiveStudents, circleData);
// Both inactive students (student1, student3) are 'active' in circleData,
// not 'needs-encouragement' — both correctly need to be flagged.
assert.strictEqual(studentsNotInSpace.length, 2);
assert.strictEqual(studentsNotInSpace[0].student_email, 'student1@example.com');
assert.strictEqual(studentsNotInSpace[1].student_email, 'student3@example.com');

const outputCsv = generateOutputCsv(studentsNotInSpace);
assert.strictEqual(outputCsv, 'email,new_space\r\nstudent1@example.com,needs-encouragement\r\nstudent3@example.com,needs-encouragement');