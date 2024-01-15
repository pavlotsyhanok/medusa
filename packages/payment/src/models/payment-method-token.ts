import {
  BeforeCreate,
  Entity,
  OnInit,
  OptionalProps,
  PrimaryKey,
  Property,
} from "@mikro-orm/core"

import { generateEntityId } from "@medusajs/utils"

type OptionalPaymentMethodTokenProps =
  | "data"
  | "type_detail"
  | "description_detail"
  | "metadata"

@Entity({ tableName: "payment_method_token" })
export default class PaymentMethodToken {
  [OptionalProps]?: OptionalPaymentMethodTokenProps

  @PrimaryKey({ columnType: "text" })
  id: string

  @Property({ columnType: "text" })
  provider_id: string

  @Property({ columnType: "jsonb", nullable: true })
  data?: Record<string, unknown> | null

  @Property({ columnType: "text" })
  name: string

  @Property({ columnType: "text", nullable: true })
  type_detail: string | null

  @Property({ columnType: "text", nullable: true })
  description_detail: string | null

  @Property({ columnType: "jsonb", nullable: true })
  metadata?: Record<string, unknown> | null

  @BeforeCreate()
  onCreate() {
    this.id = generateEntityId(this.id, "paymt")
  }

  @OnInit()
  onInit() {
    this.id = generateEntityId(this.id, "paymt")
  }
}
