// Lista de nombres de artículos según el item_nameid
export const itemNames: Record<string, string> = {
  "id1": "nombre1",
  "id2": "nombre2",
  "id3": "nombre3",
};

// Base URL
export const baseURL =
  "https://ejemplo.com/market?item_nameid=";

export const headersFetch = {
  "Accept": "*/*",
  "Accept-Encoding": "gzip, deflate, br, zstd",
  "Accept-Language": "es-ES,es;q=0.9,en;q=0.8",
  "Cache-Control": "no-cache",
  "Connection": "keep-alive",
  "Host": "ejemplo.com",
  "Pragma": "no-cache",
  "Sec-Fetch-Dest": "empty",
  "Sec-Fetch-Mode": "cors",
  "Sec-Fetch-Site": "same-origin",
  "User-Agent":
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36",
  "X-Requested-With": "XMLHttpRequest",
  "sec-ch-ua":
    '"Chromium";v="130", "Google Chrome";v="130", "Not?A_Brand";v="99"',
  "sec-ch-ua-mobile": "?0",
  "sec-ch-ua-platform": '"Windows"',
};
