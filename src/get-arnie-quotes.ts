import { httpGet } from "./mock-http-interface";

const REAL_QUOTE = "Arnie Quote";
const NO_QUOTE = "FAILURE";

type TResult = { [REAL_QUOTE]: string } | { [NO_QUOTE]: string };

const getQuote = (url: string): Promise<TResult> =>
  httpGet(url).then((quote) =>
    quote.status === 200
      ? { [REAL_QUOTE]: JSON.parse(quote.body).message }
      : { [NO_QUOTE]: JSON.parse(quote.body).message }
  );

export const getArnieQuotes = async (urls: string[]): Promise<TResult[]> =>
  Promise.all(urls.map((url: string) => getQuote(url)));
