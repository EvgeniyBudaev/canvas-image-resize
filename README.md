# canvas-image-resize

Changes the canvas size

## Installation

```bash
npm install canvas-image-resize
```

## Usage

1. Imports `canvas-image-resize`.

For ES Modules:

```ts
import { canvas } from "canvas-image-resize";
```

For CommonJS:

```ts
const { canvas } = require("canvas-image-resize");
```

2. Example of use.

```ts
const canvas = previewCanvasRef.current;
if (canvas) {
  setIsLoading(true);
  const { resizedCanvas } = resize({ canvas, options: { width: 640 } });
  if (!resizedCanvas) return setIsLoading(false);
  canvas.width = resizedCanvas.width;
  canvas.height = resizedCanvas.height;
  const ctx = canvas.getContext('2d');
  if (!ctx) return setIsLoading(false);
  ctx.drawImage(canvas, 0, 0);
  setIsLoading(false);
}

<>
  <canvas ref={previewCanvasRef} />
</>
```

## API

resize({ canvas, options })

Canvas

- canvas : canvas - An html5 canvas element to resize and draw from

Options

- height : number - New height of the canvas ex: 300
- width : number - New width of the canvas ex: 400
- keepAspectRatio : boolean - Flag to maintain proportions. Default: true
- imageSmoothingQuality : "low" | "medium" | "high" - Image smoothing quality. Default: "high"
-

## Example

<img src="./static/canvasOriginal.png" width="355" height="474" /><img src="./static/canvasResized.png" width="112" height="112" />

## License

MIT
