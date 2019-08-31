/**
 *  PROBLEM 1:
 
 * Consider a social network similar to Twitter called Chirper. Each user has a name, a note about
 * whether or not they are a verified user, and follows some number of people. 
 
 * Design a data definition for Chirper, including a template that is tail recursive and avoids 
 * cycles. 
 
 * Then design a function called most-followers which determines which user in a Chirper Network is 
 * followed by the most people.
 */

// =========================================
// Data Definitions:

/**
 * User: {
 *   name: string;
 *   verified: boolean;
 *   follows: Array<User>;
 * }
 * Interp. A user has name, whether verified, and an array of other user's name who his/her follows
 */
function User(name, verified, follows) {
    return {
        name,
        verified,
        follows
    };
}

// Template
// 1. Structual Recursion
// 2. Tail Recursion with worklist
// 3. Context preserve accumulator for visited users
/**
function fnForNetWork(entry) {
    function fnForUser(user, todo, visited) {
        if (visited.inculdes(user.name)) {
            return fnForLOU(todo, visited);
        } else {
            //fn ??? (user);
            return fnForLOU(
                [...user.follows, ...todo],
                visited.push(user.name)
            );
        }
    }
    function fnForLOU([firstUser, ...restUsers], visited) {
        if (firstUser === undefined) return; //???;

        return fnForUser(firstUser, restUsers, visited);
    }
    // Trigger
    return fnForUser(entry, [], []);
}
 */

// =========================================
// Functions:

/**
 * mostFollowers: (entry: User) => User
 * Produce the user who has the most followers in the given network
 */

function mostFollowers(entry) {
    const ENTRY = entry.name;
    const visited = new Map();

    function fnForUser(user, todo) {
        if (visited.has(user)) {
            // if already visited, update visit num by 1
            visited.set(user, visited.get(user) + 1);
            return fnForLOU(todo);
        } else {
            // if first visit, set visit num as 1 (For entry, set it as 0)
            visited.set(user, user.name == ENTRY ? 0 : 1);
            return fnForLOU([...user.follows, ...todo]);
        }
    }
    function fnForLOU([firstUser, ...restUsers]) {
        return firstUser === undefined
            ? findMaxFollowers(visited)
            : fnForUser(firstUser, restUsers);
    }
    // Trigger
    return fnForUser(entry, []);

    // Wish List
    // [1] findMaxFollowers: (map: Map) => User
    function findMaxFollowers(map) {
        let max = -1;
        let maxUser;
        for (const [key, val] of map.entries()) {
            if (val > max) {
                max = val;
                maxUser = key;
            }
        }
        return maxUser;
    }
}

// =========================================
// Module Outputs:
module.exports = {
    User,
    mostFollowers
};
