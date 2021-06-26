import { parseISO } from 'date-fns'

export const combineDateAndTime = (date: string, time: string): Date => {
  const newDate = parseISO(`${date}T${time}`)
  return newDate
}
