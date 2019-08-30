const { TA, scheduleTAs } = require('./schedule');

const UBCTAs_v1 = [
    TA('Erika', 1, [1, 3, 7, 9]),
    TA('Ryan', 1, [1, 8, 10]),
    TA('Reece', 1, [5, 6]),
    TA('Gordon', 2, [2, 3, 9]),
    TA('David', 2, [2, 8, 9]),
    TA('Katie', 1, [4, 6]),
    TA('Aashish', 2, [1, 10]),
    TA('Grant', 2, [1, 11]),
    TA('Raeanne', 2, [1, 11, 12])
];

const UBCTAs_v2 = [
    TA('Erika', 1, [1, 3, 7, 9]),
    TA('Ryan', 1, [1, 8, 10]),
    TA('Reece', 2, [5, 6]), // increase shifts from 1 to 2
    TA('Gordon', 2, [2, 3, 9]),
    TA('David', 2, [2, 8, 9]),
    TA('Katie', 1, [4, 6]),
    TA('Aashish', 2, [1, 10]),
    TA('Grant', 2, [1, 11]),
    TA('Raeanne', 2, [1, 11, 12])
];

// [1..12]
const SLOTS = Array.from({ length: 12 }).map((_, index) => index + 1);

console.log(scheduleTAs(UBCTAs_v1, SLOTS));
console.log(scheduleTAs(UBCTAs_v2, SLOTS));
