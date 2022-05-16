type PixelTypedArray =
  | Int8Array
  | Uint8Array
  | Uint8ClampedArray
  | Int16Array
  | Uint16Array
  | Int32Array
  | Uint32Array
  | Float32Array
  | Float64Array;

type LercPixelType = "S8" | "U8" | "S16" | "U16" | "S32" | "U32" | "F32" | "F64";

interface BandStats {
  minValue: number;
  maxValue: number;
  dimStats?: {
    minValues: Float64Array;
    maxValues: Float64Array;
  };
}

interface LercHeaderInfo {
  version: number;
  dimCount: number;
  width: number;
  height: number;
  validPixelCount: number;
  bandCount: number;
  blobSize: number;
  maskCount: number;
  dataType: number;
  minValue: number;
  maxValue: number;
  maxZerror: number;
  statistics: BandStats[];
  bandCountWithNoData: number;
}

interface DecodeOptions {
  inputOffset?: number;
  returnPixelInterleavedDims?: boolean;
  noDataValue?: number;
  pixelType?: LercPixelType;
}

interface LercData {
  width: number;
  height: number;
  pixelType: LercPixelType;
  statistics: BandStats[];
  pixels: PixelTypedArray[];
  mask: Uint8Array;
  dimCount: number;
  bandMasks?: Uint8Array[];
}

export function load(options?: { locateFile?: (wasmFileName?: string, scriptDir?: string) => string }): Promise<void>;
export function isLoaded(): boolean;
export function decode(input: ArrayBuffer, options?: DecodeOptions): LercData;
export function getBlobInfo(input: ArrayBuffer, options?: { inputOffset?: number }): LercHeaderInfo;
export function getBandCount(input: ArrayBuffer | Uint8Array, options?: { inputOffset?: number }): number;
