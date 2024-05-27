from datetime import datetime, timedelta
import locale
locale.setlocale(locale.LC_TIME, 'ru_RU.UTF-8')
from babel.dates import format_date as babel_format_date


def format_date(date):
    today = datetime.now().date()
    tomorrow = today + timedelta(days=1)
    day_after_tomorrow = today + timedelta(days=2)

    if date.date() == tomorrow:
        return "завтра"
    elif date.date() == day_after_tomorrow:
        return "послезавтра"
    else:
        return babel_format_date(date, format='d MMMM', locale='ru_RU').capitalize()