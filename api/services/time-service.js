const ApiError = require('../exceptions/api-error')

class TimeService {
  getTime(time) {   //20d
    const timeKeywords = {
      year: 'y',
      month: 'mo',
      day: 'd',
      hour: 'h',
      minute: 'm',
      second: 's',
      millisecond: 'ms'
    }
    const arrTimeKeywords = Object.values(timeKeywords)

    const [number] = time.split(new RegExp('[A-Za-z]')).filter(Number)  //20
    const [keyWord] = time.split(new RegExp('[0-9]')).filter(String)    //d

    const isValidKey = arrTimeKeywords.find(key => key === keyWord)   //daca coiencide time cu cheile obiectului
    const maxItemLength = arrTimeKeywords.getMaxItemLength();

    if (!(isValidKey && isValidKey.length < maxItemLength)) {
      throw ApiError.InternalCodeSyntax({ message: 'Invalid syntax parameter', parameter: { time } })
    }

    switch (isValidKey) {
      case timeKeywords.year:
        return number * 365 * 30 * 24 * 60 * 60 * 1000
      case timeKeywords.month:
        return number * 30 * 24 * 60 * 60 * 1000
      case timeKeywords.day:
        return number * 24 * 60 * 60 * 1000
      case timeKeywords.hour:
        return number * 60 * 60 * 1000
      case timeKeywords.minute:
        return number * 60 * 1000
      case timeKeywords.second:
        return number * 1000
      case timeKeywords.millisecond:
        return number
    }
  }
}

module.exports = new TimeService()