const { User, mostFollowers } = require('../graph');

const UserA = User('A', true, []);
const UserB = User('B', true, []);
const UserC = User('C', true, []);
const UserD = User('D', true, []);
const UserE = User('E', true, []);
const UserF = User('F', true, []);

UserA.follows.push(UserB, UserD);
UserB.follows.push(UserC, UserD, UserE);
UserC.follows.push(UserA, UserF);
UserD.follows.push(UserE);
UserE.follows.push(UserF);
UserF.follows.push(UserD);

describe('mostFollowers function test', function() {
    it('should work for graph that has loop', function() {
        const result = mostFollowers(UserA);
        expect(result).toEqual(UserD);
    });
    it('should work for choose any entry', function() {
        const result = mostFollowers(UserB);
        expect(result).toEqual(UserD);
    });
});
