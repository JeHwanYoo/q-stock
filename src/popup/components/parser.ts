interface StockModel {
  dailyStock: Array<DailyStock>;
  stockInfo: string;
}

/**
 * 1: 상한
 * 2: 상승
 * 3: 보합
 * 4: 하한
 * 5: 하락
 */
type UpOrDown = "1" | "2" | "3" | "4" | "5";

interface DailyStock {
  date: Date; // 일자
  dayEndPrice: BigInteger; // 종가
  dungrak: UpOrDown; // 등락
  debi: BigInteger; // 대비
  start: BigInteger; // 시가
  high: BigInteger; // 고가
  low: BigInteger; // 저가
  volum: BigInteger; // 거래량
  amount: BigInteger; // 거래대금
}

interface StockInfo {
  name: string; // 종목 이름
  price: BigInteger; // 현재 주가
  dungrak: UpOrDown; // 등락
  debi: BigInteger; // 대비
  prev: BigInteger; // 전날 종가
  volume: BigInteger; // 거래량
  money: BigInteger; // 거래대금
  start: BigInteger; // 시가
  high: BigInteger; // 고가
  low: BigInteger; // 저가
  up: BigInteger; // 상한가
  down: BigInteger; // 하한가
  face: BigInteger; // 액면가
  high52: BigInteger; // 52주 신고가
  low52: BigInteger; // 52주 신저가
  per: Float64Array; // per 수치
}
