declare module "@moefy-canvas/core" {
  export interface CanvasOptions {
    opacity?: number;
    zIndex?: number;
  }
}

declare module "@moefy-canvas/theme-popper" {
  import type { CanvasOptions } from "@moefy-canvas/core";

  export enum PopperShape {
    Star = "star",
    Circle = "circle",
  }

  export interface PopperConfig {
    shape?: PopperShape;
    size?: number;
    numParticles?: number;
  }

  export class Popper {
    constructor(config?: PopperConfig, canvasOptions?: CanvasOptions);
    mount(el: HTMLCanvasElement): void;
    unmount(): void;
  }
}