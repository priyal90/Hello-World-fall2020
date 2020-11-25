
var motionHistoryImage;
var capture;
var buffer;
var result;
var w = 640,
    h = 480;

function setup() {
    capture = createCapture({
        audio: false,
        video: {
            width: w,
            height: h
        }
    }, function() {
        console.log('capture ready.')
    });
    capture.elt.setAttribute('playsinline', '');
    createCanvas(w, h);
    capture.size(w, h);
    capture.hide();
    buffer = new jsfeat.matrix_t(w, h, jsfeat.U8C1_t);
    capture.elt.setAttribute('playsinline', '');
    createCanvas(w, h);
    capture.size(w, h);
    capture.hide();
}

var backgroundPixels;

function resetBackground() {
    backgroundPixels = undefined;
}

function jsfeatToP5(src, dst) {
    if (!dst || dst.width != src.cols || dst.height != src.rows) {
        dst = createImage(src.cols, src.rows);
    }
    var n = src.data.length;
    dst.loadPixels();
    var srcData = src.data;
    var dstData = dst.pixels;
    for (var i = 0, j = 0; i < n; i++) {
        var cur = srcData[i];
        dstData[j++] = cur;
        dstData[j++] = cur;
        dstData[j++] = cur;
        dstData[j++] = 255;
    }
    dst.updatePixels();
    return dst;
}

function draw() {
    image(capture, 0, 0, 640, 480);
    capture.loadPixels();
    if (capture.pixels.length > 0) { // don't forget this!
        var blurSize = select('#blurSize').elt.value;
        var lowThreshold = select('#lowThreshold').elt.value;
        var highThreshold = select('#highThreshold').elt.value;

        blurSize = map(blurSize, 0, 100, 1, 12);
        lowThreshold = map(lowThreshold, 0, 100, 0, 255);
        highThreshold = map(highThreshold, 0, 100, 0, 255);

        jsfeat.imgproc.grayscale(capture.pixels, w, h, buffer);
        jsfeat.imgproc.gaussian_blur(buffer, buffer, blurSize, 0);
        jsfeat.imgproc.canny(buffer, buffer, lowThreshold, highThreshold);
        var n = buffer.rows * buffer.cols;
        // uncomment the following lines to invert the image
//        for (var i = 0; i < n; i++) {
//            buffer.data[i] = 255 - buffer.data[i];
//        }
        result = jsfeatToP5(buffer, result);
        image(result, 0, 0, 640, 480);
    }
}

function copyImage(src, dst) {
    var n = src.length;
    if (!dst || dst.length != n) dst = new src.constructor(n);
    while (n--) dst[n] = src[n];
    return dst;
}

function draw() {
    image(capture, 0, 0);
    capture.loadPixels();
    if (capture.pixels.length > 0) { // don't forget this!
        if (!backgroundPixels) {
            // copy the camera pixels for storing the background
            backgroundPixels = copyImage(capture.pixels, backgroundPixels);
            // make a grayscale image for storing the motion history
            motionHistoryImage = new Uint8ClampedArray(w * h);
        }
        var pixels = capture.pixels;
        var thresholdAmount = select('#thresholdAmount').value() / 100;
        var sumSquaredThreshold = thresholdAmount * (255 * 255) * 3;
        var iRgb = 0,
            iGray = 0;
        for (var y = 0; y < h; y++) {
            for (var x = 0; x < w; x++) {
                var rdiff = pixels[iRgb + 0] - backgroundPixels[iRgb + 0];
                var gdiff = pixels[iRgb + 1] - backgroundPixels[iRgb + 1];
                var bdiff = pixels[iRgb + 2] - backgroundPixels[iRgb + 2];
                var sumSquaredDiff = rdiff * rdiff + gdiff * gdiff + bdiff * bdiff;
                // if this is a foreground pixel
                if (sumSquaredDiff > sumSquaredThreshold) {
                    // set the motion history image to white
                    motionHistoryImage[iGray] = 255;
                } else {
                    // otherwise make it fade towards black
                    motionHistoryImage[iGray]--;
                }
                var output = motionHistoryImage[iGray];
                pixels[iRgb++] = output;
                pixels[iRgb++] = output;
                pixels[iRgb++] = output;
                iRgb++; // skip alpha in rgbindex
                iGray++; // next grayscale index
            }
        }

        // some parameters for calculating the motion vectors
        var stepSize = 16;
        var radius = 8;
        var maximumDiff = 8; // ignore big "motion edges"
        var minimumValue = 245; // ignore very old values
        var arrowWidth = .25;
        stroke(255);
        noFill();

        // pre-calculate some values outside the loop
        var upOffset = -radius * w;
        var downOffset = +radius * w;
        var leftOffset = -radius;
        var rightOffset = +radius;
        var maximumLength = Math.sqrt(maximumDiff * maximumDiff * 2);
        for (var y = radius; y + radius < h; y += stepSize) {
            for (var x = radius; x + radius < w; x += stepSize) {
                var i = y * w + x;
                var center = motionHistoryImage[i];
                var dx = 0,
                    dy = 0;
                if (center > minimumValue) {
                    var up = motionHistoryImage[i + upOffset];
                    var down = motionHistoryImage[i + downOffset];
                    var left = motionHistoryImage[i + leftOffset];
                    var right = motionHistoryImage[i + rightOffset];
                    dx = right - left;
                    dy = down - up;
                    // ignore big "motion edges"
                    if (dx > maximumDiff || dy > maximumDiff ||
                        -dx > maximumDiff || -dy > maximumDiff) {
                        dx = 0, dy = 0;
                    } else {
                        // big changes are slow motion, small changes are fast motion
                        var length = Math.sqrt(dx * dx + dy * dy);
                        var rescale = (maximumLength - length) / length;
                        dx *= rescale;
                        dy *= rescale;
                    }
                }
                line(x + dx, y + dy, x - arrowWidth * dy, y + arrowWidth * dx);
                line(x + dx, y + dy, x + arrowWidth * dy, y - arrowWidth * dx);
            }
        }
    }

    if (select('#showRaw').checked()) {
        capture.updatePixels();
        image(capture, 0, 0, 640, 480);
    }
}