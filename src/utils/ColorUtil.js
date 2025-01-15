import * as CMYKColorUtil from './color/cmyk.js';
import * as HexColorUtil from './color/hex.js';
import * as RGBColorUtil from './color/rgb.js';

const ColorUtil = {
    cmyk: CMYKColorUtil,
    // cmykToGrayscale: CMYKColorUtil.toGrayscale,
    cmykToHex: CMYKColorUtil.toHex,
    // cmykToHsl: CMYKColorUtil.toHsl,
    // cmykToHsv: CMYKColorUtil.toHsv,
    cmykToRgb: CMYKColorUtil.toRgb,

    // grayscale: ColorGrayscaleUtil,
    // grayscaleToGrayscale: ColorGrayscaleUtil.toGrayscale,
    // grayscaleToHex: ColorGrayscaleUtil.toHex,
    // grayscaleToHsl: ColorGrayscaleUtil.toHsl,
    // grayscaleToHsv: ColorGrayscaleUtil.toHsv,
    // grayscaleToRgb: ColorGrayscaleUtil.toRgb,

    hex: HexColorUtil,
    hexToCmyk: HexColorUtil.toCmyk,
    // hexToGrayscale: HexColorUtil.toGrayscale,
    // hexToHsl: HexColorUtil.toHsl,
    // hexToHsv: HexColorUtil.toHsv,
    hexToRgb: HexColorUtil.toRgb,

    // hsl: ColorHslUtil,
    // hslToGrayscale: ColorHslUtil.toGrayscale,
    // hslToHex: ColorHslUtil.toHex,
    // hslToHsl: ColorHslUtil.toHsl,
    // hslToHsv: ColorHslUtil.toHsv,
    // hslToRgb: ColorHslUtil.toRgb,

    // hsv: ColorHsvUtil,
    // hsvToGrayscale: ColorHsvUtil.toGrayscale,
    // hsvToHex: ColorHsvUtil.toHex,
    // hsvToHsl: ColorHsvUtil.toHsl,
    // hsvToHsv: ColorHsvUtil.toHsv,
    // hsvToRgb: ColorHsvUtil.toRgb,

    rgb: RGBColorUtil,
    rgbToCmyk: RGBColorUtil.toCmyk,
    // rgbToGrayscale: RGBColorUtil.toGrayscale,
    rgbToHex: RGBColorUtil.toRgb,
    // rgbToHsl: RGBColorUtil.toHsl,
    // rgbToHsv: RGBColorUtil.toHsv
};
