type DateTimeParts = {
  day: number
  hour: number
  minute: number
  month: number
  second: number
  year: number
}

const saoPauloTimeZone = 'America/Sao_Paulo'

function getDateTimeParts(date: Date, timeZone: string): DateTimeParts {
  const parts = new Intl.DateTimeFormat('en-US', {
    day: '2-digit',
    hour: '2-digit',
    hourCycle: 'h23',
    minute: '2-digit',
    month: '2-digit',
    second: '2-digit',
    timeZone,
    year: 'numeric',
  }).formatToParts(date)

  const values = Object.fromEntries(
    parts
      .filter((part) => part.type !== 'literal')
      .map((part) => [part.type, Number(part.value)]),
  )

  return values as DateTimeParts
}

function zonedTimeToUTC(
  { day, hour, minute, month, second, year }: DateTimeParts,
  timeZone: string,
) {
  const utcGuess = new Date(Date.UTC(year, month - 1, day, hour, minute, second))
  const zonedParts = getDateTimeParts(utcGuess, timeZone)
  const zonedAsUTC = Date.UTC(
    zonedParts.year,
    zonedParts.month - 1,
    zonedParts.day,
    zonedParts.hour,
    zonedParts.minute,
    zonedParts.second,
  )
  const offset = zonedAsUTC - utcGuess.getTime()

  return new Date(utcGuess.getTime() - offset)
}

export function getStartOfTodayInSaoPauloISOString() {
  const today = getDateTimeParts(new Date(), saoPauloTimeZone)
  const startOfToday = zonedTimeToUTC(
    {
      ...today,
      hour: 0,
      minute: 0,
      second: 0,
    },
    saoPauloTimeZone,
  )

  return startOfToday.toISOString()
}
