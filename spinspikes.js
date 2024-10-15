const spinSpeed = 0.9;
(function() {
  const spikeUrls = new Set([
    //Remove spikes that you do not want to spin
    "https://sploop.io/img/entity/spike.png?v=1923912",
    "https://sploop.io/img/entity/hard_spike.png?v=1923912",
    "https://sploop.io/img/entity/big_spike.png?v=1923912",
]);
const spikeUpdate = (ctx, img, x, y, width, height, rotation) => {
    ctx.save();
    ctx.translate(x + width / 2, y + height / 2);
    ctx.rotate(rotation);
    ogdraw.call(ctx, img, -width / 2, -height / 2, width, height);
    ctx.restore();
};
const ogdraw = CanvasRenderingContext2D.prototype.drawImage;
CanvasRenderingContext2D.prototype.drawImage = function(img, ...args) {
    if (this.canvas && this.canvas.id === "game-canvas" && img instanceof HTMLImageElement && img.src && spikeUrls.has(img.src)) {
        let x, y, width, height;
        if (args.length === 2) {
            [x, y] = args;
            width = img.width;
            height = img.height;
        } else if (args.length === 4) {
            [x, y, width, height] = args;
        } else if (args.length === 8) {
            [,,,, x, y, width, height] = args;
        } else {
            return ogdraw.apply(this, [img, ...args]);
        }
        this.globalAlpha = 0;
        ogdraw.apply(this, [img, ...args]);
        this.globalAlpha = 1;
        const rotation = (performance.now() / 1000 * spinSpeed) % (2 * Math.PI);
        spikeUpdate(this, img, x, y, width, height, rotation);
    } else {
        return ogdraw.apply(this, [img, ...args]);
    }};
