export default function formatDate(param: string): string {
  const date = new Date(param)
  date.setDate(date.getDate() + 1)

  const yyyy = date.getFullYear()
  const mm = String(date.getMonth() + 1).padStart(2, '0') // mês começa do 0
  const dd = String(date.getDate()).padStart(2, '0')

  const formatted = `${yyyy}-${mm}-${dd}`

  return formatted
}
