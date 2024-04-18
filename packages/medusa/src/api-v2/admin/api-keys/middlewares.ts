import * as QueryConfig from "./query-config"

import { MiddlewareRoute } from "../../../loaders/helpers/routing/types"
import { authenticate } from "../../../utils/authenticate-middleware"
import { validateAndTransformQuery } from "../../utils/validate-query"
import {
  AdminApiKeySalesChannel,
  AdminCreateApiKey,
  AdminGetApiKeyParams,
  AdminGetApiKeysParams,
  AdminRevokeApiKey,
  AdminUpdateApiKey,
} from "./validators"
import { validateAndTransformBody } from "../../utils/validate-body"
import { createBatchBody } from "../../utils/validators"

export const adminApiKeyRoutesMiddlewares: MiddlewareRoute[] = [
  {
    matcher: "/admin/api-keys*",
    middlewares: [authenticate("admin", ["bearer", "session"])],
  },
  {
    method: ["GET"],
    matcher: "/admin/api-keys",
    middlewares: [
      validateAndTransformQuery(
        AdminGetApiKeysParams,
        QueryConfig.listTransformQueryConfig
      ),
    ],
  },
  {
    method: ["GET"],
    matcher: "/admin/api-keys/:id",
    middlewares: [
      validateAndTransformQuery(
        AdminGetApiKeyParams,
        QueryConfig.retrieveTransformQueryConfig
      ),
    ],
  },
  {
    method: ["POST"],
    matcher: "/admin/api-keys",
    middlewares: [
      validateAndTransformBody(AdminCreateApiKey),
      validateAndTransformQuery(
        AdminGetApiKeyParams,
        QueryConfig.retrieveTransformQueryConfig
      ),
    ],
  },
  {
    method: ["POST"],
    matcher: "/admin/api-keys/:id",
    middlewares: [
      validateAndTransformBody(AdminUpdateApiKey),
      validateAndTransformQuery(
        AdminGetApiKeyParams,
        QueryConfig.retrieveTransformQueryConfig
      ),
    ],
  },
  {
    method: ["DELETE"],
    matcher: "/admin/api-keys/:id",
    middlewares: [],
  },
  {
    method: ["POST"],
    matcher: "/admin/api-keys/:id/revoke",
    middlewares: [
      validateAndTransformBody(AdminRevokeApiKey),
      validateAndTransformQuery(
        AdminGetApiKeyParams,
        QueryConfig.retrieveTransformQueryConfig
      ),
    ],
  },
  {
    method: ["POST"],
    matcher: "/admin/api-keys/:id/sales-channels/batch",
    middlewares: [
      validateAndTransformBody(
        createBatchBody(AdminApiKeySalesChannel, AdminApiKeySalesChannel)
      ),
      validateAndTransformQuery(
        AdminGetApiKeyParams,
        QueryConfig.retrieveTransformQueryConfig
      ),
    ],
  },
]
