// ---------------------------
// 1) Tipos de getFlows (OPENAPI-LIKE)
// ---------------------------

export interface FlowsResponse {
  code: {
    http: number;
    message: string;
  };
  data: {
    flows: BackendFlow[];
  };
  meta: {
    timestamp: string;
  };
}

export interface BackendFlow {
  id: string;
  name: string;
  description: string;
  active: boolean;
  updatedAt: string;

  paths: Record<string, Record<string, BackendFlowMethod>>;
  components?: BackendFlowComponents;
}

export interface BackendFlowMethod {
  summary: string;
  description: string;
  operationId: string;

  security?: Array<Record<string, any>>;

  requestBody?: {
    required: boolean;
    content: {
      "application/json": {
        schema: BackendSchema;
      };
    };
  };

 responses: Record<string, BackendFlowResponse>;
}

export interface BackendFlowResponse {
  description: string;
  content?: {
    "application/json"?: {
      schema: BackendSchema;
    };
  };
}

export interface BackendSchema {
  type: string;
  properties?: Record<string, BackendSchemaProperty>;
  required?: string[];
}

export interface BackendSchemaProperty {
  type: string;
}

export interface BackendFlowComponents {
  securitySchemes?: Record<string, BackendSecurityScheme>;
}

export interface BackendSecurityScheme {
  type: string;
  in?: string;
  name?: string;
}

