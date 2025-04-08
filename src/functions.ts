/*!
 * Canvas HTML Image Resizer
 * Copyright(c) 2025 Evgeniy Budaev
 * MIT Licensed
 */

import type { TResizeImageCanvasProps, TResizeImageCanvasResponse } from "./types";

export function resize(props: TResizeImageCanvasProps): TResizeImageCanvasResponse {
  const canvas = props.canvas;
  const options = props?.options;

  const canvasContext = canvas.getContext("2d");
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

  // Calculate proportions if you need to maintain the aspect ratio
  if (keepAspectRatio) {
    const originalRatio = originalWidth / originalHeight;

    if (isWidth && !isHeight) {
      // Only width is passed - height is calculated
      newHeight = width / originalRatio;
    } else if (isHeight && !isWidth) {
      // Only height is passed - width is calculated
      newWidth = height * originalRatio;
    } else if (isWidth && isHeight) {
      // Both width and height are transferred - we adjust them to the constraint while maintaining proportions
      const targetRatio = width / height;
      if (originalRatio > targetRatio) {
        // The original is wider - we limit the width
        newHeight = width / originalRatio;
      } else {
        // The original is already - we limit the height
        newWidth = height * originalRatio;
      }
    }
  }

  // Create a new canvas with the given dimensions
  const resizedCanvas = document.createElement("canvas");
  resizedCanvas.width = newWidth ?? originalWidth;  // in case newWidth = undefined
  resizedCanvas.height = newHeight ?? originalHeight; // in case newHeight = undefined

  // Get 2D context for new canvas
  const ctx = resizedCanvas.getContext("2d");
  if (!ctx) return { resizedCanvas: null };
  ctx.imageSmoothingQuality = imageSmoothingQuality;

  // Draw an image
  ctx.drawImage(
    canvas,
    0,
    0,
    originalWidth,
    originalHeight,
    0,
    0,
    resizedCanvas.width,
    resizedCanvas.height,
  );

  return { resizedCanvas };
}