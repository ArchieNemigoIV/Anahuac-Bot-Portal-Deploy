import type { Flow, FlowBodyProperty, FlowEndpoint, FlowParameter, HttpMethod, ParamType } from "../components/FlowsManager";
import type {
  FlowsResponse,
  BackendFlowComponents,
  BackendSchemaProperty,
  BackendFlowResponse,
} from "../components/interfaces/flow";


export function transformGetFlowsResponseToFullFlow(data: FlowsResponse): Flow[] {
  return data.data.flows.map(flow => {
    const endpoints: FlowEndpoint[] = [];

    for (const path in flow.paths) {
      const methods = flow.paths[path];

      for (const method in methods) {
        const op = methods[method];

        // Body properties
        const bodyProperties: FlowBodyProperty[] = op.requestBody?.content?.["application/json"]?.schema?.properties
          ? Object.entries(op.requestBody.content["application/json"].schema.properties).map(
              ([name, schema]: [string, BackendSchemaProperty]) => ({
                id: crypto.randomUUID(),
                name,
                type: schema.type as ParamType,
                description: "",
                example: "",
              })
            )
          : [];

        // Parameters mínimos (empty si no hay path/query params)
        const parameters: FlowParameter[] = []; 

        // Responses
        const responses: BackendFlowResponse[] = Object.entries(op.responses || {}).map(([statusCode, resp]) => ({
          id: crypto.randomUUID(),
          statusCode,
          description: resp.description || "",
          properties: resp.content?.["application/json"]?.schema?.properties
            ? Object.entries(resp.content["application/json"].schema.properties).map(
                ([name, schema]: [string, BackendSchemaProperty]) => ({
                  id: crypto.randomUUID(),
                  name,
                  type: schema.type as ParamType,
                  description: "",
                  example: "",
                })
              )
            : [],
        }));

        endpoints.push({
          id: crypto.randomUUID(),
          name: op.summary || path,
          description: op.description || "",
          method: method.toUpperCase() as HttpMethod,
          path,
          parameters,
          bodyProperties,
          responses,
        });
      }
    }

    // Auth
    const auth: FlowAuth = detectAuth(flow.components);

    return {
      id: flow.id,
      name: flow.name || "",
      description: flow.description || "",
      baseUrl: "http://localhost:5173",
      auth,
      endpoints,
      createdAt: flow.updatedAt,
      updatedAt: flow.updatedAt,
    };
  });
}

function detectAuth(components?: BackendFlowComponents): FlowAuth {
  if (!components?.securitySchemes) return { type: "none" };

  if (components.securitySchemes.ApiKeyAuth) {
    return {
      type: "apiKey",
      apiKeyName: components.securitySchemes.ApiKeyAuth.name,
    };
  }

  if (components.securitySchemes.BearerAuth) {
    return {
      type: "bearer",
      bearerToken: "",
    };
  }

  return { type: "none" };
}
