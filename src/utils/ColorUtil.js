var ColorUtil = {

    cmyk: ColorCmykUtil,
    cmykToGrayscale: ColorCmykUtil.toGrayscale,
    cmykToHex: ColorCmykUtil.toHex,
    cmykToHsl: ColorCmykUtil.toHsl,
    cmykToHsv: ColorCmykUtil.toHsv,
    cmykToRgb: ColorCmykUtil.toRgb,

    grayscale: undefined,

    hex: ColorHexUtil,
    hexToCmyk: ColorHexUtil.toCmyk,
    hexToGrayscale: ColorHexUtil.toGrayscale,
    hexToHsl: ColorHexUtil.toHsl,
    hexToHsv: ColorHexUtil.toHsv,
    hexToRgb: ColorHexUtil.toRgb,

    hsl: undefined,

    hsv: undefined,

    rgb: ColorRgbUtil,
    rgbToCmyk: ColorRgbUtil.toCmyk,
    rgbToGrayscale: ColorRgbUtil.toGrayscale,
    rgbToHex: ColorRgbUtil.toRgb,
    rgbToHsl: ColorRgbUtil.toHsl,
    rgbToHsv: ColorRgbUtil.toHsv

};