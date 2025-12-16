import type { OpenAPISchema } from "../components/FlowsManager";
import type { FlowsResponse, PatchFlowRequest, UpdateFlowRequest } from "../components/interfaces/flow";
import { URL_API_AGENT } from "../utils/environments";

export interface ApiCodeResponse {
  code: {
    http: number;
    message: string;
  };
}


export const getFlows = async (): Promise<FlowsResponse> => {
  const response = await fetch(`${URL_API_AGENT}/flows-list`);
  
  if (!response.ok) {
    throw new Error(`Error ${response.status}: ${response.statusText}`);
  }

  const data: FlowsResponse = await response.json();
  return data;
};


export const deleteFlowData = async (
  flowName: string,
  storedFlowRowKey: string
): Promise<ApiCodeResponse["code"]> => {
  const response = await fetch(`${URL_API_AGENT}/delete-flow`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      flowName,
      storedFlowRowKey
    })
  });

  if (!response.ok) {
    throw new Error(`Error ${response.status}: ${response.statusText}`);
  }

  const data: ApiCodeResponse = await response.json();

  return data.code;
};


export const createFlowData = async (
  schema: OpenAPISchema
): Promise<ApiCodeResponse["code"]> => {
  const response = await fetch(`${URL_API_AGENT}/create-flow`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(schema)
  });

  if (!response.ok) {
    throw new Error(`Error ${response.status}: ${response.statusText}`);
  }

  const data: ApiCodeResponse = await response.json();

  return data.code;
};

export const updateFlowData = async (
  payload: UpdateFlowRequest
): Promise<ApiCodeResponse["code"]> => {
  if (!payload.storedFlowRowKey) {
    throw new Error("storedFlowRowKey is required");
  }

  const response = await fetch(`${URL_API_AGENT}/update-flow`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error(`Error ${response.status}: ${response.statusText}`);
  }

  const data: ApiCodeResponse = await response.json();
  return data.code;
};


export const patchFlowData = async (
  payload: PatchFlowRequest
): Promise<ApiCodeResponse["code"]> => {
  if (!payload.storedFlowRowKey) {
    throw new Error("storedFlowRowKey is required");
  }

  const response = await fetch(`${URL_API_AGENT}/patch-flow`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error(`Error ${response.status}: ${response.statusText}`);
  }

  const data: ApiCodeResponse = await response.json();
  return data.code;
};
