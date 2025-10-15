import dayjs from 'dayjs';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.tz.setDefault('Asia/Tokyo');

export class Datetime {
  private _year: number;
  private _month: number;
  private _day: number;
  private _hours: number;
  private _minutes: number;
  private _seconds: number;

  constructor(
    year: number,
    month: number,
    day: number,
    hours: number,
    minutes: number,
    seconds: number
  ) {
    this._year = year;
    this._month = month;
    this._day = day;
    this._hours = hours;
    this._minutes = minutes;
    this._seconds = seconds;
  }

  get year(): number {
    return this._year;
  }

  get month(): number {
    return this._month;
  }

  get day(): number {
    return this._day;
  }

  get hours(): number {
    return this._hours;
  }

  get minutes(): number {
    return this._minutes;
  }

  get seconds(): number {
    return this._seconds;
  }

  public static serialize(datetimeString: string): Datetime {
    const dt = dayjs(datetimeString).tz();
    return new Datetime(
      dt.year(),
      dt.month() + 1,
      dt.date(),
      dt.hour(),
      dt.minute(),
      dt.second()
    );
  }

  public deserialize(): string {
    return dayjs
      .tz(
        `${this.year}-${String(this.month).padStart(2, '0')}-${String(
          this.day
        ).padStart(2, '0')}T${String(this.hours).padStart(2, '0')}:${String(
          this.minutes
        ).padStart(2, '0')}:${String(this.seconds).padStart(2, '0')}`
      )
      .toISOString();
  }

  public static now(): Datetime {
    const dt = dayjs().tz();
    return new Datetime(
      dt.year(),
      dt.month() + 1,
      dt.date(),
      dt.hour(),
      dt.minute(),
      dt.second()
    );
  }
}
