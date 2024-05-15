let capture;
let buffer = []; // Declare buffer in the global scope
let maxBufferSize = 10; // Maximum buffer size
let numSegments = 1; // Number of segments to draw
let minSegmentSize = 1; // Minimum size of each segment
let maxSegmentSize = 300; // Maximum size of each segment

function setup() {
  createCanvas(windowWidth, windowHeight);
  capture = createCapture(VIDEO);
  capture.size(windowWidth, windowHeight);
  capture.hide(); // Hide the video element
}

function draw() {
  // Draw the camera feed onto the buffer
  buffer.push(capture.get());

  // Limit the buffer size
  if (buffer.length > maxBufferSize) {
    buffer.shift();
  }

  // Randomly determine the delay for this frame
  let delayFrames = int(random(1, 5));

  // Draw random segments of the delayed frame as the background
  if (buffer.length >= delayFrames) {
    let delayedFrame = buffer[buffer.length - delayFrames];
    for (let i = 0; i < numSegments; i++) { // Draw numSegments random segments
      let x = int(random(width));
      let y = int(random(height));
      let segmentWidth = int(random(minSegmentSize, maxSegmentSize));
      let segmentHeight = int(random(minSegmentSize, maxSegmentSize));
      let z = random(0, 1); // Assign a random depth in the z-axis (from 0 to 1)
      
      let segment = delayedFrame.get(x, y, segmentWidth, segmentHeight);

      // Set stroke color to white
      stroke(255);
      strokeWeight(2); // Set stroke thickness

      // Calculate alpha (transparency) based on z-axis depth
      let alpha = map(z, 0, 0, 0, 255); // Vary alpha from 50 (more transparent) to 255 (less transparent)

      // Draw the stroke around the segment with adjusted alpha
      stroke(255, alpha);
      noFill(); // Don't fill the stroke shape
      rect(x, y, segmentWidth, segmentHeight);

      // Draw the segment image with adjusted alpha
      tint(255, alpha); // Apply transparency to the segment
      image(segment, x, y, segmentWidth, segmentHeight);
    }
  }
}