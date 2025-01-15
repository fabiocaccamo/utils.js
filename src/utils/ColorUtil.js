/** global: ColorCmykUtil */
/** global: ColorHexUtil */
/** global: ColorRgbUtil */

const ColorUtil = {
    cmyk: ColorCmykUtil,
    // cmykToGrayscale: ColorCmykUtil.toGrayscale,
    cmykToHex: ColorCmykUtil.toHex,
    // cmykToHsl: ColorCmykUtil.toHsl,
    // cmykToHsv: ColorCmykUtil.toHsv,
    cmykToRgb: ColorCmykUtil.toRgb,

    // grayscale: ColorGrayscaleUtil,
    // grayscaleToGrayscale: ColorGrayscaleUtil.toGrayscale,
    // grayscaleToHex: ColorGrayscaleUtil.toHex,
    // grayscaleToHsl: ColorGrayscaleUtil.toHsl,
    // grayscaleToHsv: ColorGrayscaleUtil.toHsv,
    // grayscaleToRgb: ColorGrayscaleUtil.toRgb,

    hex: ColorHexUtil,
    hexToCmyk: ColorHexUtil.toCmyk,
    // hexToGrayscale: ColorHexUtil.toGrayscale,
    // hexToHsl: ColorHexUtil.toHsl,
    // hexToHsv: ColorHexUtil.toHsv,
    hexToRgb: ColorHexUtil.toRgb,

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

    rgb: ColorRgbUtil,
    rgbToCmyk: ColorRgbUtil.toCmyk,
    // rgbToGrayscale: ColorRgbUtil.toGrayscale,
    rgbToHex: ColorRgbUtil.toRgb,
    // rgbToHsl: ColorRgbUtil.toHsl,
    // rgbToHsv: ColorRgbUtil.toHsv
};
