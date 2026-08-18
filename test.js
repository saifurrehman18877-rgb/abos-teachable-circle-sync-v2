const assert = require('assert');
const { parseCsv, filterInactiveStudents, findStudentsNotInSpace, generateOutputCsv } = require('./logic');

const teachableData = [
    { student_email: 'student1@example.com', last_login_date: '2023-01-01' },
    { student_email: 'student2@example.com', last_login_date: '2023-06-01' },
    { student_email: 'student3@example.com', last_login_date: '2023-05-15' },
    { student_email: 'student4@example.com', last_login_date: '2023-06-10' }
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
assert.strictEqual(studentsNotInSpace.length, 1);
assert.strictEqual(studentsNotInSpace[0].student_email, 'student3@example.com');

const outputCsv = generateOutputCsv(studentsNotInSpace);
assert.strictEqual(outputCsv, 'email,new_space\nstudent3@example.com,needs-encouragement');