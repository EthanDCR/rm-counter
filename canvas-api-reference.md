# Canvas API Reference - Rocket Race Project

## Basic Setup in React

```javascript
import { useRef, useEffect } from 'react';

export default function Race() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Your drawing code here

  }, []);

  return <canvas ref={canvasRef} width={800} height={400} />;
}
```

## Loading and Drawing Rocket Images

### Option 1: Using Emoji (Simplest - No files needed)
```javascript
export default function Race() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Draw emoji as rocket
    ctx.font = '60px Arial';
    ctx.fillText('🚀', 100, 100);

  }, []);

  return <canvas ref={canvasRef} width={800} height={400} />;
}
```

### Option 2: Using PNG/JPG Images (Recommended)
```javascript
export default function Race() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Create image object
    const rocketImg = new Image();
    rocketImg.src = '/rocket.png';  // Put image in /public/rocket.png

    // IMPORTANT: Wait for image to load before drawing
    rocketImg.onload = () => {
      // Draw image at position (x, y) with size (width, height)
      ctx.drawImage(rocketImg, 100, 150, 80, 80);
    };

  }, []);

  return <canvas ref={canvasRef} width={800} height={400} />;
}
```

### Option 3: Using SVG (Convert to Image)
SVG can't be drawn directly - convert to Image:
```javascript
const rocketImg = new Image();
rocketImg.src = '/rocket.svg';  // Put SVG in /public/rocket.svg

rocketImg.onload = () => {
  ctx.drawImage(rocketImg, x, y, width, height);
};
```

## Moving Your Rocket Across the Screen

### Simple Animation - Rocket Moves Right
```javascript
export default function Race() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rocketImg = new Image();
    rocketImg.src = '/rocket.png';

    let rocketX = 0;  // Starting X position
    const rocketY = 150;  // Fixed Y position

    rocketImg.onload = () => {
      function animate() {
        // 1. Clear the entire canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // 2. Update position
        rocketX += 2;  // Move 2 pixels right each frame

        // 3. Draw rocket at new position
        ctx.drawImage(rocketImg, rocketX, rocketY, 80, 80);

        // 4. Request next frame (runs 60 times per second)
        requestAnimationFrame(animate);
      }

      // Start animation
      animate();
    };

  }, []);

  return <canvas ref={canvasRef} width={800} height={400} />;
}
```

## Rocket Race with Multiple Rockets (Your Project)

```javascript
export default function Race() {
  const canvasRef = useRef(null);
  const [officePoints, setOfficePoints] = useState({
    tulsa: 0,
    stLouis: 0,
    dallas: 0,
    wichita: 0
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rocketImg = new Image();
    rocketImg.src = '/rocket.png';

    rocketImg.onload = () => {
      function animate() {
        // Clear canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Draw each office's rocket
        const offices = ['tulsa', 'stLouis', 'dallas', 'wichita'];
        offices.forEach((office, index) => {
          const yPos = 50 + (index * 100);  // Stack vertically
          const xPos = officePoints[office] * 2;  // Points = distance

          // Draw office label
          ctx.fillStyle = '#ffffff';
          ctx.font = '16px Arial';
          ctx.fillText(office.toUpperCase(), 10, yPos + 25);

          // Draw rocket
          ctx.drawImage(rocketImg, xPos + 100, yPos, 60, 60);

          // Draw track line
          ctx.strokeStyle = 'rgba(59, 130, 246, 0.3)';
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.moveTo(100, yPos + 30);
          ctx.lineTo(700, yPos + 30);
          ctx.stroke();
        });

        requestAnimationFrame(animate);
      }

      animate();
    };

  }, [officePoints]);

  return <canvas ref={canvasRef} width={800} height={500} />;
}
```

## Updating Rocket Position from Socket Data

```javascript
export default function Race() {
  const canvasRef = useRef(null);
  const [officePoints, setOfficePoints] = useState({
    tulsa: 0,
    stLouis: 0,
    dallas: 0,
    wichita: 0
  });

  useEffect(() => {
    // Socket connection (you'll add this)
    const socket = io('http://localhost:3001');

    socket.on('pointsUpdate', (data) => {
      // data = { office: 'tulsa', points: 150 }
      setOfficePoints(prev => ({
        ...prev,
        [data.office]: data.points
      }));
    });

    return () => socket.disconnect();
  }, []);

  // Canvas animation code here (same as above)
  // Rockets will automatically update when officePoints changes
}
```

## Adding Text Labels and Points Display

```javascript
// Inside your animate function:
ctx.fillStyle = '#ffffff';
ctx.font = '20px Arial';
ctx.textAlign = 'left';

offices.forEach((office, index) => {
  const yPos = 50 + (index * 100);
  const points = officePoints[office];

  // Office name
  ctx.fillText(office.toUpperCase(), 10, yPos + 30);

  // Points
  ctx.fillText(`${points} pts`, 10, yPos + 50);
});
```

## Making Rockets Smoothly Animate (Not Jumpy)

Instead of instantly jumping to new position, use interpolation:

```javascript
// Add this state for smooth positions
const smoothPositions = useRef({ tulsa: 0, stLouis: 0, dallas: 0, wichita: 0 });

// In your animate function:
offices.forEach((office, index) => {
  const targetX = officePoints[office] * 2;
  const currentX = smoothPositions.current[office];

  // Smoothly move towards target (10% each frame)
  smoothPositions.current[office] = currentX + (targetX - currentX) * 0.1;

  // Draw at smooth position
  ctx.drawImage(rocketImg, smoothPositions.current[office] + 100, yPos, 60, 60);
});
```

## Where to Get Rocket Images

### Free Image Resources:
1. **Emojis** - Use 🚀 directly (no download needed)
2. **Flaticon** - flaticon.com (free PNGs with attribution)
3. **Pexels/Unsplash** - Free stock images
4. **Create your own** - Use Figma/Canva to make simple rockets

### Where to Put Images in Next.js:
```
/public/rocket.png       <- Put your image here
/public/images/rocket.png <- Or in a subfolder
```

Then reference as:
```javascript
rocketImg.src = '/rocket.png';  // No 'public' in the path!
```

## Drawing Images - The Three Ways

```javascript
// 1. Draw at position (keeps original size)
ctx.drawImage(img, x, y);

// 2. Draw with custom size (most common for your project)
ctx.drawImage(img, x, y, width, height);

// 3. Crop and draw (advanced - crop from source image)
ctx.drawImage(img,
  sourceX, sourceY, sourceWidth, sourceHeight,  // Crop from here
  destX, destY, destWidth, destHeight           // Draw to here
);
```

## Quick Reference - Methods You'll Actually Use

```javascript
// Clear canvas
ctx.clearRect(0, 0, canvas.width, canvas.height);

// Draw image (rocket)
ctx.drawImage(img, x, y, width, height);

// Draw text (labels, points)
ctx.fillStyle = '#ffffff';
ctx.font = '20px Arial';
ctx.fillText('TULSA', x, y);

// Draw lines (race tracks)
ctx.strokeStyle = '#3b82f6';
ctx.lineWidth = 2;
ctx.beginPath();
ctx.moveTo(x1, y1);
ctx.lineTo(x2, y2);
ctx.stroke();

// Draw rectangles (backgrounds, UI elements)
ctx.fillStyle = 'rgba(59, 130, 246, 0.1)';
ctx.fillRect(x, y, width, height);
```

## Common Issues & Solutions

### Image doesn't show up
```javascript
// BAD - Image not loaded yet
const img = new Image();
img.src = '/rocket.png';
ctx.drawImage(img, 0, 0);  // ❌ Doesn't work - image not loaded!

// GOOD - Wait for load
const img = new Image();
img.src = '/rocket.png';
img.onload = () => {
  ctx.drawImage(img, 0, 0);  // ✅ Works!
};
```

### Rockets jump instead of smooth movement
Use interpolation (see "Making Rockets Smoothly Animate" section above)

### Canvas is blank/black
- Check canvas width/height are set
- Make sure you're calling draw commands inside `img.onload`
- Check if image path is correct (should be `/rocket.png` not `/public/rocket.png`)

### Animation runs too fast
- `requestAnimationFrame` runs at 60fps (this is correct)
- Adjust movement speed: `rocketX += 0.5` instead of `rocketX += 5`

## Coordinate System (Important!)

- **(0, 0)** is **top-left corner** (NOT bottom-left like in math)
- **X** increases going **right** →
- **Y** increases going **down** ↓

```
(0,0) ────────→ X
  │
  │
  │
  ↓
  Y
```

So if you want rocket at bottom: use large Y value like 300
If you want rocket at top: use small Y value like 50

## Next Steps for Your Project

1. **Get a rocket image** - Use emoji 🚀 or download PNG from Flaticon
2. **Put image in `/public/rocket.png`**
3. **Start with simple animation** - One rocket moving right
4. **Add multiple rockets** - One per office, stacked vertically
5. **Connect to socket** - Update positions based on points
6. **Add labels and tracks** - Office names, point counts, race lines
7. **Polish** - Smooth animation, styling, finish line
