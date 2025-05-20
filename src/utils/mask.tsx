export function Mask(mask: string, rawValue: string): string {
  const digits = rawValue.replace(/\D/g, '')
  let maskedValue = ''
  let digitIndex = 0
  let hasDigit = false

  for (let i = 0; i < mask.length; i++) {
    const maskChar = mask[i]

    if (maskChar === '9') {
      if (digitIndex < digits.length) {
        maskedValue += digits[digitIndex]
        digitIndex++
        hasDigit = true
      } else {
        break
      }
    } else {
      // Só adiciona o caractere fixo se já houver algum dígito
      if (hasDigit) maskedValue += maskChar
    }
  }

  return maskedValue
}
