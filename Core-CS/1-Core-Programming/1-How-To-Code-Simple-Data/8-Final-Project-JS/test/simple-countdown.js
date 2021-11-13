// Constants
// ctx is our canvas context
ctx.font = '60px monospace';
ctx.textAlign = 'center';

const FONTCOLOR = 'black';
const XPOSITION = 150;
const YPOSITION = 250;

// Data definition:

/**
 *  CountDown is Natural[0, 10]
 *  Interp. count down from 10 to 0
 *
 *  function fnForCD(cd) {
 *      // ... cd
 *  }
 */

// Functions:

// CountDown -> CountDown
// start the world with main(10)
function main(cd) {
    bigBang({
        worldState: cd,
        onTick: {
            handler: countDown,
            interval: 1000
        },
        toDraw: render,
        onKey: reset
    });
}

// CountDown -> CountDown
// reduce the countdown number by 1
function countDown(cd) {
    return cd == 0 ? 0 : cd - 1;
}

// CountDown -> canvas
// render the current countdown number to the canvas
function render(cd) {
    ctx.fillText(cd, XPOSITION, YPOSITION);
}

// CountDown Key -> CountDown
// reset the countdown number to 10 when space hitted
function reset(cd, key) {
    if (key == ' ') {
        return 10;
    } else {
        return cd;
    }
}

// trigger:
main(10);
