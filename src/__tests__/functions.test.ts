import { describe, expect, it } from "vitest";
import { resize } from "../index";

describe("src.functions", () => {
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

  it("should resize width only, keeping aspect ratio", () => {
    const { resizedCanvas } = resize({
      canvas: originalCanvas,
      options: { width: newWidth },
    });
    expect(resizedCanvas?.width).toEqual(newWidth);
    expect(resizedCanvas?.height).toEqual(
      newWidth / (originalWidth / originalHeight),
    );
  });

  it("should resize height only, keeping aspect ratio", () => {
    const { resizedCanvas } = resize({
      canvas: originalCanvas,
      options: { height: newHeight },
    });
    expect(resizedCanvas?.height).toEqual(newHeight);
    expect(resizedCanvas?.width).toEqual(
      newHeight * (originalWidth / originalHeight),
    );
  });

  it("should resize both dimensions, keeping aspect ratio when dimensions match original ratio", () => {
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

  it("should handle null dimensions correctly", () => {
    const { resizedCanvas: resultWidthNull } = resize({
      canvas: originalCanvas,
      options: { width: null, height: newHeight },
    });
    expect(resultWidthNull?.width).toEqual(
      300 * (originalWidth / originalHeight),
    );
    expect(resultWidthNull?.height).toEqual(newHeight);

    const { resizedCanvas: resultHeightNull } = resize({
      canvas: originalCanvas,
      options: { width: newWidth, height: null },
    });
    expect(resultHeightNull?.width).toEqual(newWidth);
    expect(resultHeightNull?.height).toEqual(
      400 / (originalWidth / originalHeight),
    );
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
});
