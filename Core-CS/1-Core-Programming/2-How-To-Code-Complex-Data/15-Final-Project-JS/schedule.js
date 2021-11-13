/**
 * PROBLEM 2:
 
 * In UBC's version of How to Code, there are often more than 800 students taking 
 * the course in any given semester, meaning there are often over 40 Teaching Assistants. 
 
 * Designing a schedule for them by hand is hard work - luckily we've learned enough now to write 
 * a program to do it for us! 
 
 * There are some umber of slots that must be filled, each represented by a natural number. Each TA is 
 * available for some of these slots, and has a maximum number of shifts they can work. 
 
 * Design a search program that consumes a list of TAs and a list of Slots, and produces one
 * valid schedule where each Slot is assigned to a TA, and no TA is working more than their 
 * maximum shifts. If no such schedules exist, produce false. 
 */

// ==================================
// Data Definitions:

/**
 * TA: {
 *   name: string;
 *   max: number;
 *   avail: Array<Slot>
 * }
 * Interp. A ta has name, max shift number and a array of slot he/she can take
 */
function TA(name, max, avail) {
    return {
        name,
        max,
        avail,
        canWork(slot) {
            return this.avail.includes(slot);
        },
        updateTa(slot, tas) {
            if (this.max > 1) {
                const newTa = TA(
                    this.name,
                    this.max - 1,
                    this.avail.filter(s => s != slot)
                );
                return tas.map(ta => (ta.name == this.name ? newTa : ta));
            } else {
                return tas.filter(ta => ta.name != this.name);
            }
        }
    };
}

/**
 * Slot: number
 * Interp. Each TA slot is represented by a unique number as its id
 */

/**
 * Assignment: {
 *   name: string;
 *   slot: Slot;
 * }
 * Interp. An assignment is a pair of ta's name and the slot id assigned to he/she
 */
function Assignment(name, slot) {
    return {
        name,
        slot
    };
}

/**
 * Schedule: Array<Assignment>
 * Interp. The schedule is a list of assignments
 */

// ==================================
// Functions:

// scheduleTAs: (tas: Array<TA>, slots: Array<Slot>) => Schedule | false
// Take a list of tas and a list of slots, produce the schedule of them or false if impossible
function scheduleTAs(tas, slots) {
    // Encapsulated local functions
    function State(tas, slots, schedule) {
        return {
            tas,
            slots,
            schedule
        };
    }
    function fnForState({ tas, slots, schedule }) {
        // slots is empty means our job is done
        if (slots.length == 0) return schedule;
        // tas is empty means impossible
        if (tas.length == 0) return false;
        // Generative Recursion
        return fnForLOS(nextStates({ tas, slots, schedule }));
    }
    function fnForLOS([firstState, ...tail]) {
        if (firstState === undefined) return false;
        // try first, get result or recursion
        return fnForState(firstState) || fnForLOS(tail);
    }
    // trigger
    return fnForState({ tas, slots, schedule: [] });

    // wish list
    // [1] nextStates: (state: State) => Array<State>
    //     ASSUME: tas and slots both can't be empty
    function nextStates({ tas, slots, schedule }) {
        const initTas = [...tas];

        function $nextStates(
            [firstTa, ...tailTa],
            [firstSlot, ...tailSlot],
            schedule
        ) {
            if (firstTa === undefined) return [];
            if (firstTa.canWork(firstSlot)) {
                return [
                    State(firstTa.updateTa(firstSlot, initTas), tailSlot, [
                        Assignment(firstTa.name, firstSlot),
                        ...schedule
                    ]),
                    ...$nextStates(tailTa, slots, schedule)
                ];
            } else {
                return $nextStates(tailTa, slots, schedule);
            }
        }
        return $nextStates(tas, slots, schedule);
    }
}

// exports to test
module.exports = {
    TA,
    Assignment,
    scheduleTAs
};
