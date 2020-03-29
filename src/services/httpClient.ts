export const POKEMON_API_BASE_URL = "https://pokeapi.co/api/v2/";

async function get(endpoint: string) {
  const res = await fetch(`${POKEMON_API_BASE_URL}${endpoint}`, {
    headers: getRequestHeaders()
  });

  await checkHTTPError(res);
  return res;
}

function getRequestHeaders() {
  const headers = new Headers();
  headers.append("Content-Type", "application/json");

  return headers;
}

async function checkHTTPError(res: Response) {
  if (res.ok) {
    return;
  }

  let errText = await res.text();
  if (!errText) {
    errText = "No Error from server.";
  }

  throw new NetworkError(errText, res.status);
}

export class NetworkError {
  public name = "NetworkError";

  constructor(public message: string, public code: number) {
    this.message = `${code} - ${message}`;
  }
}

export default {
  get
};
