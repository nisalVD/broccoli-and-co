import { useState } from "react";
import {
  requestInviteApi,
  RequestInviteApi,
} from "./requestInviteApi";

export const useRequestInvite = () => {
  const [loading, setLoading] = useState(false);

  const requestInvite = async (
    name: string,
    email: string
  ): Promise<RequestInviteApi> => {
    setLoading(true);
    const resp = await requestInviteApi(name, email);
    setLoading(false);
    return resp;
  };

  return {
    loading,
    requestInvite,
  };
};
