export type ApiErrorMessage = {
  errorMessage?: string;
};

type RequestInviteResp = [true, string];
type RequestInviteRespError = [false, ApiErrorMessage | string];

export type RequestInviteApi = RequestInviteRespError | RequestInviteResp;

export const requestInviteApi = async (
  name: string,
  email: string
): Promise<RequestInviteApi> => {
  const url = "https://us-central1-blinkapp-684c1.cloudfunctions.net/fakeAuth";
  const resp = await fetch(url, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({ name, email }),
  });

  const data = await resp.text();
  const parsedData = safeJsonParse<ApiErrorMessage>(data);

  if (!resp.ok) {
    return [true, parsedData as string];
  }
  return [false, parsedData as ApiErrorMessage];
};

const safeJsonParse = <T>(str: string): string | T => {
  try {
    return JSON.parse(str);
  } catch (err) {
    return str;
  }
};
