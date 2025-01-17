import CMYKColorUtil from './color/cmyk.js';
import HexColorUtil from './color/hex.js';
import RGBColorUtil from './color/rgb.js';

export default {
    cmyk: CMYKColorUtil,
    // cmykToGrayscale: CMYKColorUtil.toGrayscale,
    cmykToHex: CMYKColorUtil.toHex,
    // cmykToHsl: CMYKColorUtil.toHsl,
    // cmykToHsv: CMYKColorUtil.toHsv,
    cmykToRgb: CMYKColorUtil.toRgb,

    // grayscale: GrayscaleColorUtil,
    // grayscaleToGrayscale: GrayscaleColorUtil.toGrayscale,
    // grayscaleToHex: GrayscaleColorUtil.toHex,
    // grayscaleToHsl: GrayscaleColorUtil.toHsl,
    // grayscaleToHsv: GrayscaleColorUtil.toHsv,
    // grayscaleToRgb: GrayscaleColorUtil.toRgb,

    hex: HexColorUtil,
    hexToCmyk: HexColorUtil.toCmyk,
    // hexToGrayscale: HexColorUtil.toGrayscale,
    // hexToHsl: HexColorUtil.toHsl,
    // hexToHsv: HexColorUtil.toHsv,
    hexToRgb: HexColorUtil.toRgb,

    // hsl: HSLColorUtil,
    // hslToGrayscale: HSLColorUtil.toGrayscale,
    // hslToHex: HSLColorUtil.toHex,
    // hslToHsl: HSLColorUtil.toHsl,
    // hslToHsv: HSLColorUtil.toHsv,
    // hslToRgb: HSLColorUtil.toRgb,

    // hsv: HSVColorUtil,
    // hsvToGrayscale: HSVColorUtil.toGrayscale,
    // hsvToHex: HSVColorUtil.toHex,
    // hsvToHsl: HSVColorUtil.toHsl,
    // hsvToHsv: HSVColorUtil.toHsv,
    // hsvToRgb: HSVColorUtil.toRgb,

    rgb: RGBColorUtil,
    rgbToCmyk: RGBColorUtil.toCmyk,
    // rgbToGrayscale: RGBColorUtil.toGrayscale,
    rgbToHex: RGBColorUtil.toRgb,
    // rgbToHsl: RGBColorUtil.toHsl,
    // rgbToHsv: RGBColorUtil.toHsv
};
