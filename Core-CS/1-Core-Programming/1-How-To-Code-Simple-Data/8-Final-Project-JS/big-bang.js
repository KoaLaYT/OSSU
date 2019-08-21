// My Javascript simplified Big-Bang framework
// Constants:
const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

// Data definitions:

/**
 *  Options: {
 *    worldState: WS               // a user defined object
 *    onTick: {
 *      handler: WS -> WS          //
 *      interval: Number
 *    }
 *    toDraw: WS -> canvas
 *    stopWhen: WS -> Boolean
 *    onKey: WS Key -> WS
 *  }
 */

// Options -> World
// create a world according to the options
function bigBang({
    worldState,
    onTick: { handler, interval = 15 },
    toDraw,
    stopWhen,
    onKey
}) {
    let ws = worldState;
    let rtf, lastTime;
    rtf = window.requestAnimationFrame(worldLoop);
    window.addEventListener('keyup', keyHandler);

    function worldLoop(t) {
        if (stopWhen && stopWhen(ws)) {
            window.cancelAnimationFrame(rtf);
            window.removeEventListener('keyup', keyHandler);
            return;
        }

        if (lastTime == undefined) {
            lastTime = t;
        } else if (t - lastTime > interval) {
            lastTime = t;
            ws = handler(ws);
            updateCanvas();
        }
        window.requestAnimationFrame(worldLoop);
    }

    function keyHandler(event) {
        ws = onKey(ws, event.key);
        updateCanvas();
    }

    function updateCanvas() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        toDraw(ws);
    }
}
