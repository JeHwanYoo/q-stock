interface StockModel {
  dailyStock: Array<DailyStock>;
  stockInfo: string;
}

/**
 * Dungrak
 * 1: 상한
 * 2: 상승
 * 3: 보합
 * 4: 하한
 * 5: 하락
 */

interface DailyStock {
  date: Date; // 일자
  dayEndPrice: number; // 종가
  dungrak: string; // 등락
  debi: number; // 대비
  start: number; // 시가
  high: number; // 고가
  low: number; // 저가
  volume: number; // 거래량
  amount: number; // 거래대금
}

interface StockInfo {
  code: string; // 종목 코드
  name: string; // 종목 이름
  price: number; // 현재 주가
  dungrak: string; // 등락
  debi: number; // 대비
  prev: number; // 전날 종가
  volume: number; // 거래량
  money: number; // 거래대금
  start: number; // 시가
  high: number; // 고가
  low: number; // 저가
  up: number; // 상한가
  down: number; // 하한가
  face: number; // 액면가
  high52: number; // 52주 신고가
  low52: number; // 52주 신저가
  per: number; // per 수치
  amount: number; // 상장주식주
}

export interface Stock {
  dailyStocks: DailyStock[],
  stockInfo: StockInfo,
}

const parser = new DOMParser();

function findAttribute(el: Element, attributeName: string) {
  return el.getAttribute(attributeName);
}

function toNumber(el: Element, attributeName: string) {
  return parseInt(findAttribute(el, attributeName).replace(/,/g, ""));
}

export function numberWithCommas(x: Number) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export function parseXMLToDOM(xml: string) {
  return parser.parseFromString(xml, "text/html");
}

export function parseXMLToModel(code: string, xml: string) {
  const dom = parseXMLToDOM(xml);
  const dailyStocks: Array<DailyStock> = [];
  const dsDOM = dom.querySelectorAll("DailyStock");

  dsDOM.forEach((el) => {
    // 날짜 파싱
    const _date = findAttribute(el, "day_Date");
    const _date_splits = _date.split("/");

    dailyStocks.push({
      date: new Date(
        parseInt(_date_splits[0]) + 2000,
        parseInt(_date_splits[1]) - 1,
        parseInt(_date_splits[2])
      ), // 일자
      dayEndPrice: toNumber(el, "day_EndPrice"), // 종가
      dungrak: findAttribute(el, "day_Dungrak"), // 등락
      debi: toNumber(el, "day_getDebi"), // 대비
      start: toNumber(el, "day_Start"), // 시가
      high: toNumber(el, "day_High"), // 고가
      low: toNumber(el, "day_Low"), // 저가
      volume: toNumber(el, "day_Volume"), // 거래량
      amount: toNumber(el, "day_getAmount"), // 거래대금
    });
  });

  const stockInfoElement = dom.querySelector("TBL_StockInfo");

  return {
    dailyStocks,
    stockInfo: {
      code,
      name: findAttribute(stockInfoElement, "JongName"),
      price: toNumber(stockInfoElement, "CurJuka"),
      dungrak: findAttribute(stockInfoElement, "DungRak"),
      debi: toNumber(stockInfoElement, "Debi"),
      prev: toNumber(stockInfoElement, "PrevJuka"),
      volume: toNumber(stockInfoElement, "Volume"),
      money: toNumber(stockInfoElement, "Money"),
      start: toNumber(stockInfoElement, "StartJuka"),
      high: toNumber(stockInfoElement, "HighJuka"),
      low: toNumber(stockInfoElement, "LowJuka"),
      up: toNumber(stockInfoElement, "UpJuka"),
      down: toNumber(stockInfoElement, "DownJuka"),
      face: toNumber(stockInfoElement, "FaceJuka"),
      high52: toNumber(stockInfoElement, "High52"),
      low52: toNumber(stockInfoElement, "Low52"),
      per: toNumber(stockInfoElement, "Per"),
      amount: toNumber(stockInfoElement, "Amount"),
    }
  };
}
