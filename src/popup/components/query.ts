import Axios from "axios";

async function queryCurrentMarketPrice(marketCode: string) {
  return await Axios.get(
    `http://asp1.krx.co.kr/servlet/krx.asp.XMLSise?code=${marketCode}`
  );
}

export { queryCurrentMarketPrice };
