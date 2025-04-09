import { describe, expect, it } from "vitest";
import { resize } from "../index";

describe("src.resize", () => {
  const originalWidth = 800;
  const originalHeight = 600;
  const originalCanvas = document.createElement("canvas");
  originalCanvas.width = originalWidth;
  originalCanvas.height = originalHeight;
  const newWidth = 400;
  const newHeight = 300;

  it("should return original size when no options provided", () => {
    const { resizedCanvas } = resize({ canvas: originalCanvas });
    expect(resizedCanvas?.width).toEqual(originalWidth);
    expect(resizedCanvas?.height).toEqual(originalHeight);
  });

  it("should return original size when empty options provided", () => {
    const { resizedCanvas } = resize({ canvas: originalCanvas, options: {} });
    expect(resizedCanvas?.width).toEqual(originalWidth);
    expect(resizedCanvas?.height).toEqual(originalHeight);
  });

  it("should resize width only", () => {
    const { resizedCanvas } = resize({
      canvas: originalCanvas,
      options: { width: newWidth },
    });
    expect(resizedCanvas?.width).toEqual(newWidth);
    expect(resizedCanvas?.height).toEqual(
      newWidth / (originalWidth / originalHeight),
    );
  });

  it("should resize height only", () => {
    const { resizedCanvas } = resize({
      canvas: originalCanvas,
      options: { height: newHeight },
    });
    expect(resizedCanvas?.height).toEqual(newHeight);
    expect(resizedCanvas?.width).toEqual(
      newHeight * (originalWidth / originalHeight),
    );
  });

  it("should resize width null", () => {
    const { resizedCanvas: resultWidthNull } = resize({
      canvas: originalCanvas,
      options: { width: null, height: newHeight },
    });
    expect(resultWidthNull?.width).toEqual(
      Math.floor(newHeight * (originalWidth / originalHeight)),
    );
    expect(resultWidthNull?.height).toEqual(newHeight);
  });

  it("should resize height null", () => {
    const { resizedCanvas: resultHeightNull } = resize({
      canvas: originalCanvas,
      options: { width: newWidth, height: null },
    });
    expect(resultHeightNull?.width).toEqual(newWidth);
    expect(resultHeightNull?.height).toEqual(
      Math.floor(newWidth / (originalWidth / originalHeight)),
    );
  });

  it("should resize width undefined", () => {
    const { resizedCanvas: resultWidthNull } = resize({
      canvas: originalCanvas,
      options: { width: undefined, height: newHeight },
    });
    expect(resultWidthNull?.width).toEqual(
      Math.floor(newHeight * (originalWidth / originalHeight)),
    );
    expect(resultWidthNull?.height).toEqual(newHeight);
  });

  it("should resize height undefined", () => {
    const { resizedCanvas: resultHeightNull } = resize({
      canvas: originalCanvas,
      options: { width: newWidth, height: undefined },
    });
    expect(resultHeightNull?.width).toEqual(newWidth);
    expect(resultHeightNull?.height).toEqual(
      Math.floor(newWidth / (originalWidth / originalHeight)),
    );
  });

  it("should resize both dimensions", () => {
    const { resizedCanvas } = resize({
      canvas: originalCanvas,
      options: { width: newWidth, height: newHeight },
    });
    expect(resizedCanvas?.width).toEqual(newWidth);
    expect(resizedCanvas?.height).toEqual(newHeight);
  });

  it("should ignore aspect ratio when keepAspectRatio is false", () => {
    const newWidth = 500;
    const newHeight = 500;
    const { resizedCanvas } = resize({
      canvas: originalCanvas,
      options: {
        width: newWidth,
        height: newHeight,
        keepAspectRatio: false,
      },
    });
    expect(resizedCanvas?.width).toEqual(newWidth);
    expect(resizedCanvas?.height).toEqual(newHeight);
  });

  it("should return null when canvas context cannot be created", () => {
    // Мокаем getContext чтобы вернуть null
    const mockCanvas = {
      ...originalCanvas,
      getContext: () => null,
    } as HTMLCanvasElement;
    const { resizedCanvas } = resize({
      canvas: mockCanvas,
      options: { width: 100 },
    });
    expect(resizedCanvas).toBeNull();
  });

  // Original canvas tests
  it("should original canvas return original size when no options provided", () => {
    const originalCanvas = document.createElement("canvas");
    originalCanvas.width = originalWidth;
    originalCanvas.height = originalHeight;
    resize({ canvas: originalCanvas });
    expect(originalCanvas.width).toEqual(originalWidth);
    expect(originalCanvas.height).toEqual(originalHeight);
  });

  it("should original canvas return original size when empty options provided", () => {
    const originalCanvas = document.createElement("canvas");
    originalCanvas.width = originalWidth;
    originalCanvas.height = originalHeight;
    resize({ canvas: originalCanvas, options: {} });
    expect(originalCanvas.width).toEqual(originalWidth);
    expect(originalCanvas.height).toEqual(originalHeight);
  });

  it("should original canvas resize width only", () => {
    const originalCanvas = document.createElement("canvas");
    originalCanvas.width = originalWidth;
    originalCanvas.height = originalHeight;
     resize({
      canvas: originalCanvas,
      options: { width: newWidth },
    });
    expect(originalCanvas.width).toEqual(newWidth);
    expect(originalCanvas.height).toEqual(
      newWidth / (originalWidth / originalHeight),
    );
  });

  it("should original canvas resize height only", () => {
    const originalCanvas = document.createElement("canvas");
    originalCanvas.width = originalWidth;
    originalCanvas.height = originalHeight;
    resize({
      canvas: originalCanvas,
      options: { height: newHeight },
    });
    expect(originalCanvas.height).toEqual(newHeight);
    expect(originalCanvas.width).toEqual(
      newHeight * (originalWidth / originalHeight),
    );
  });

  it("should original canvas resize width null", () => {
    const originalCanvas = document.createElement("canvas");
    originalCanvas.width = originalWidth;
    originalCanvas.height = originalHeight;
    resize({
      canvas: originalCanvas,
      options: { width: null, height: newHeight },
    });
    expect(originalCanvas.width).toEqual(
      Math.floor(newHeight * (originalWidth / originalHeight)),
    );
    expect(originalCanvas.height).toEqual(newHeight);
  });

  it("should original canvas resize height null", () => {
    const originalCanvas = document.createElement("canvas");
    originalCanvas.width = originalWidth;
    originalCanvas.height = originalHeight;
    resize({
      canvas: originalCanvas,
      options: { width: newWidth, height: null },
    });
    expect(originalCanvas.width).toEqual(newWidth);
    expect(originalCanvas.height).toEqual(
      Math.floor(newWidth / (originalWidth / originalHeight)),
    );
  });

  it("should original canvas resize width undefined", () => {
    const originalCanvas = document.createElement("canvas");
    originalCanvas.width = originalWidth;
    originalCanvas.height = originalHeight;
    resize({
      canvas: originalCanvas,
      options: { width: undefined, height: newHeight },
    });
    expect(originalCanvas.width).toEqual(
      Math.floor(newHeight * (originalWidth / originalHeight)),
    );
    expect(originalCanvas.height).toEqual(newHeight);
  });

  it("should original canvas resize height undefined", () => {
    const originalCanvas = document.createElement("canvas");
    originalCanvas.width = originalWidth;
    originalCanvas.height = originalHeight;
    resize({
      canvas: originalCanvas,
      options: { width: newWidth, height: undefined },
    });
    expect(originalCanvas.width).toEqual(newWidth);
    expect(originalCanvas.height).toEqual(
      Math.floor(newWidth / (originalWidth / originalHeight)),
    );
  });

  it("should original canvas resize both dimensions", () => {
    const originalCanvas = document.createElement("canvas");
    originalCanvas.width = originalWidth;
    originalCanvas.height = originalHeight;
    resize({
      canvas: originalCanvas,
      options: { width: newWidth, height: newHeight },
    });
    expect(originalCanvas.width).toEqual(newWidth);
    expect(originalCanvas.height).toEqual(newHeight);
  });

  it("should original canvas ignore aspect ratio when keepAspectRatio is false", () => {
    const newWidth = 500;
    const newHeight = 500;
    resize({
      canvas: originalCanvas,
      options: {
        width: newWidth,
        height: newHeight,
        keepAspectRatio: false,
      },
    });
    expect(originalCanvas.width).toEqual(newWidth);
    expect(originalCanvas.height).toEqual(newHeight);
  });
});
