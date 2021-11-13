const { TA, Assignment, scheduleTAs } = require('../schedule');

const TAS = [TA('Soba', 2, [1, 3]), TA('Udon', 1, [3, 4]), TA('Ramen', 1, [2])];

describe('scheduleTAs function test', function() {
    it('should output empty array if both tas and slots are empty', function() {
        const result = scheduleTAs([], []);
        expect(result).toEqual([]);
    });

    it('should output false if tas are empty', function() {
        const result = scheduleTAs([], [1, 2, 3]);
        expect(result).toBe(false);
    });

    it('should output empty array if slots are empty', function() {
        const result = scheduleTAs([TA('Amen', 3, [1, 2])], []);
        expect(result).toEqual([]);
    });

    it('should produce the valid schedule', function() {
        const result = scheduleTAs(TAS, [1, 2, 3, 4]);
        expect(result).toEqual([
            Assignment('Udon', 4),
            Assignment('Soba', 3),
            Assignment('Ramen', 2),
            Assignment('Soba', 1)
        ]);
    });
});
