export function Mask(mask: string, rawValue: string): string {
  const digits = rawValue.replace(/\D/g, '')
  let maskedValue = ''
  let digitIndex = 0

  for (let i = 0; i < mask.length; i++) {
    const maskChar = mask[i]

    if (maskChar === '9') {
      if (digitIndex < digits.length) {
        maskedValue += digits[digitIndex]
        digitIndex++
      } else {
        break
      }
    } else {
      maskedValue += maskChar
    }
  }

  return maskedValue
}
