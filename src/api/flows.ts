import type { FlowsResponse } from "../components/interfaces/flow";
import { URL_API_AGENT } from "../utils/environments";


export const getFlows = async (): Promise<FlowsResponse> => {
  const response = await fetch(`${URL_API_AGENT}/flows-list`);
  
  if (!response.ok) {
    throw new Error(`Error ${response.status}: ${response.statusText}`);
  }

  const data: FlowsResponse = await response.json();
  return data;
};
