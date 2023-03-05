export default function regexStringNumber(str: string) {
  const regexNumber = /^[\d|+]+(\.?\d{0,4})/g
  const ArrayOfNumbers = str.match(regexNumber)

  const res = ArrayOfNumbers?.join('')
  return res || ''
}