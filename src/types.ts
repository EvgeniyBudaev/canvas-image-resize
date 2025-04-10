export type TResizeImageCanvasOptions = {
  contextType?: "2d"; // Canvas context type
  height?: number | null | undefined;
  width?: number | null | undefined;
  keepAspectRatio?: boolean; // Flag to maintain proportions
  imageSmoothingQuality?: "low" | "medium" | "high"; // Image smoothing quality
};

export type TResizeImageCanvasProps = {
  canvas: HTMLCanvasElement;
  options?: TResizeImageCanvasOptions;
};

export type TResizeImageCanvasResponse = {
  resizedCanvas: HTMLCanvasElement | null;
};
