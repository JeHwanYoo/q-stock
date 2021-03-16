import Axios from "axios";

async function queryCurrentMarketPrice(marketCode: string, type: "gukmun" | "yeongmun" | "unknown") {
  if (type === 'gukmun') {
    return await Axios.get(
      `http://asp1.krx.co.kr/servlet/krx.asp.XMLSise?code=${marketCode}`
    );
  } else if (type === 'yeongmun') {
    return await Axios.get(
      `http://asp1.krx.co.kr/servlet/krx.asp.XMLSiseEng?code=${marketCode}`
    );
  } else {
    return await Axios.get(
      `http://asp1.krx.co.kr/servlet/krx.asp.XMLSise?code=${marketCode}`
    );
  }
}

export { queryCurrentMarketPrice };
