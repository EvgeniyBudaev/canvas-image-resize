/*!
 * Canvas HTML Image Resizer
 * Copyright(c) 2025 Evgeniy Budaev
 * MIT Licensed
 */

import type {TResizeImageCanvasProps, TResizeImageCanvasResponse} from "./types";

export function resize(props: TResizeImageCanvasProps): TResizeImageCanvasResponse {
  const { canvas, options } = props;
  const contextType = options?.contextType ?? "2d";

  // We support both HTMLCanvasElement and OffscreenCanvas
  const isOffscreen = typeof OffscreenCanvas !== "undefined" && canvas instanceof OffscreenCanvas;
  const isRegularCanvas = canvas instanceof HTMLCanvasElement;

  if (!isOffscreen && !isRegularCanvas) {
    return { resizedCanvas: null };
  }

  const canvasContext = canvas.getContext(contextType);
  if (!canvasContext) return { resizedCanvas: null };

  const width = options?.width;
  const height = options?.height;
  const keepAspectRatio = options?.keepAspectRatio ?? true;
  const imageSmoothingQuality = options?.imageSmoothingQuality ?? "high";
  const originalWidth = canvas.width;
  const originalHeight = canvas.height;
  const isWidth = !!width;
  const isHeight = !!height;
  let newWidth = width;
  let newHeight = height;

  // Calculate proportions
  if (keepAspectRatio) {
    const originalRatio = originalWidth / originalHeight;

    if (isWidth && !isHeight) {
      newHeight = width! / originalRatio;
    } else if (isHeight && !isWidth) {
      newWidth = height! * originalRatio;
    } else if (isWidth && isHeight) {
      const targetRatio = width! / height!;
      if (originalRatio > targetRatio) {
        newHeight = width! / originalRatio;
      } else {
        newWidth = height! * originalRatio;
      }
    }
  }

  // If no new dimensions are specified, return the original canvas
  if (!newWidth && !newHeight) {
    return { resizedCanvas: canvas };
  }

  // Create a temporary canvas for scaling
  const tempCanvas = isOffscreen
    ? new OffscreenCanvas(newWidth ?? originalWidth, newHeight ?? originalHeight)
    : document.createElement("canvas");

  tempCanvas.width = newWidth ?? originalWidth;
  tempCanvas.height = newHeight ?? originalHeight;

  const ctx = tempCanvas.getContext(contextType);
  if (!ctx) return { resizedCanvas: null };

  if ("imageSmoothingQuality" in ctx) {
    ctx.imageSmoothingQuality = imageSmoothingQuality;
  }

  // Copy the image with scaling
  if ("drawImage" in ctx) {
    ctx.drawImage(
      canvas,
      0,
      0,
      originalWidth,
      originalHeight,
      0,
      0,
      tempCanvas.width,
      tempCanvas.height,
    );
  }

  // Update the dimensions of the original canvas
  canvas.width = tempCanvas.width;
  canvas.height = tempCanvas.height;

  // Copy back to the original canvas
  const destCtx = canvas.getContext(contextType);
  if (!destCtx) return { resizedCanvas: null };

  destCtx.drawImage(tempCanvas, 0, 0);

  return { resizedCanvas: canvas };
}
