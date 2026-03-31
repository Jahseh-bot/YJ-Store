import { MigrationInterface, QueryRunner } from 'typeorm'

export class InitialSchema1709294400000 implements MigrationInterface {
  name = 'InitialSchema1709294400000'

  public async up(queryRunner: QueryRunner): Promise<void> {
    // Create enum types
    await queryRunner.query(`
      CREATE TYPE "user_role_enum" AS ENUM ('user', 'seller', 'admin', 'super_admin')
    `)

    await queryRunner.query(`
      CREATE TYPE "product_status_enum" AS ENUM ('draft', 'pending', 'approved', 'rejected', 'on_sale', 'off_sale', 'violation')
    `)

    await queryRunner.query(`
      CREATE TYPE "order_status_enum" AS ENUM ('pending_payment', 'paid', 'processing', 'shipped', 'delivered', 'completed', 'cancelled', 'refunding', 'refunded', 'closed')
    `)

    await queryRunner.query(`
      CREATE TYPE "sku_status_enum" AS ENUM ('active', 'inactive')
    `)

    await queryRunner.query(`
      CREATE TYPE "pay_method_enum" AS ENUM ('wechat', 'alipay', 'card', 'wallet')
    `)

    await queryRunner.query(`
      CREATE TYPE "invoice_type_enum" AS ENUM ('none', 'electronic', 'paper')
    `)

    // Create users table
    await queryRunner.query(`
      CREATE TABLE "users" (
        "id" SERIAL PRIMARY KEY,
        "username" VARCHAR(50) NOT NULL,
        "email" VARCHAR(100) NOT NULL UNIQUE,
        "password_hash" VARCHAR(255) NOT NULL,
        "role" "user_role_enum" NOT NULL DEFAULT 'user',
        "first_name" VARCHAR(50),
        "last_name" VARCHAR(50),
        "phone" VARCHAR(20),
        "avatar_url" VARCHAR(500),
        "is_active" BOOLEAN NOT NULL DEFAULT true,
        "last_login_at" TIMESTAMP,
        "refresh_token" VARCHAR(500),
        "refresh_token_expires_at" TIMESTAMP,
        "created_at" TIMESTAMP NOT NULL DEFAULT now(),
        "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
        "deleted_at" TIMESTAMP
      )
      CREATE INDEX "idx_users_email" ON "users" ("email")
    `)

    // Create categories table (tree structure)
    await queryRunner.query(`
      CREATE TABLE "categories" (
        "id" SERIAL PRIMARY KEY,
        "category_name" VARCHAR(50) NOT NULL,
        "parent_id" INTEGER,
        "icon_url" VARCHAR(500),
        "description" VARCHAR(500),
        "sort" INTEGER NOT NULL DEFAULT 0,
        "is_active" BOOLEAN NOT NULL DEFAULT true,
        "is_show" BOOLEAN NOT NULL DEFAULT true,
        "level" INTEGER NOT NULL DEFAULT 1,
        "path" VARCHAR(255) NOT NULL DEFAULT '',
        "created_at" TIMESTAMP NOT NULL DEFAULT now(),
        "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
        "deleted_at" TIMESTAMP,
        CONSTRAINT "fk_categories_parent" FOREIGN KEY ("parent_id") REFERENCES "categories"("id") ON DELETE SET NULL
      )
      CREATE INDEX "idx_categories_parent_id" ON "categories" ("parent_id")
      CREATE INDEX "idx_categories_path" ON "categories" ("path")
    `)

    // Create brands table
    await queryRunner.query(`
      CREATE TABLE "brands" (
        "id" SERIAL PRIMARY KEY,
        "name" VARCHAR(100) NOT NULL,
        "logo_url" VARCHAR(500),
        "description" VARCHAR(1000),
        "is_active" BOOLEAN NOT NULL DEFAULT true,
        "created_at" TIMESTAMP NOT NULL DEFAULT now(),
        "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
        "deleted_at" TIMESTAMP
      )
    `)

    // Create freight_templates table
    await queryRunner.query(`
      CREATE TABLE "freight_templates" (
        "id" SERIAL PRIMARY KEY,
        "seller_id" INTEGER NOT NULL,
        "name" VARCHAR(100) NOT NULL,
        "dispatch_time" INTEGER NOT NULL DEFAULT 1,
        "is_free" BOOLEAN NOT NULL DEFAULT false,
        "free_condition" DECIMAL(10,2),
        "created_at" TIMESTAMP NOT NULL DEFAULT now(),
        "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
        "deleted_at" TIMESTAMP
      )
      CREATE INDEX "idx_freight_templates_seller_id" ON "freight_templates" ("seller_id")
    `)

    // Create freight_template_items table
    await queryRunner.query(`
      CREATE TABLE "freight_template_items" (
        "id" SERIAL PRIMARY KEY,
        "template_id" INTEGER NOT NULL,
        "region_ids" TEXT NOT NULL,
        "first_unit" INTEGER NOT NULL DEFAULT 1,
        "first_price" DECIMAL(10,2) NOT NULL DEFAULT 0,
        "continue_unit" INTEGER NOT NULL DEFAULT 1,
        "continue_price" DECIMAL(10,2) NOT NULL DEFAULT 0,
        "created_at" TIMESTAMP NOT NULL DEFAULT now(),
        CONSTRAINT "fk_freight_template_items_template" FOREIGN KEY ("template_id") REFERENCES "freight_templates"("id") ON DELETE CASCADE
      )
      CREATE INDEX "idx_freight_template_items_template_id" ON "freight_template_items" ("template_id")
    `)

    // Create products table
    await queryRunner.query(`
      CREATE TABLE "products" (
        "id" SERIAL PRIMARY KEY,
        "product_name" VARCHAR(200) NOT NULL,
        "subtitle" VARCHAR(500),
        "description" TEXT,
        "category_id" INTEGER NOT NULL,
        "brand_id" INTEGER,
        "brand_name" VARCHAR(100),
        "status" "product_status_enum" NOT NULL DEFAULT 'draft',
        "seller_id" INTEGER NOT NULL,
        "review_count" INTEGER NOT NULL DEFAULT 0,
        "review_score" DECIMAL(2,1) NOT NULL DEFAULT 0,
        "view_count" INTEGER NOT NULL DEFAULT 0,
        "sales_count" INTEGER NOT NULL DEFAULT 0,
        "is_deleted" BOOLEAN NOT NULL DEFAULT false,
        "freight_template_id" INTEGER,
        "seven_day_return" BOOLEAN NOT NULL DEFAULT true,
        "warranty_year" INTEGER NOT NULL DEFAULT 0,
        "detail_html" TEXT,
        "mobile_detail_html" TEXT,
        "created_at" TIMESTAMP NOT NULL DEFAULT now(),
        "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
        "deleted_at" TIMESTAMP,
        CONSTRAINT "fk_products_category" FOREIGN KEY ("category_id") REFERENCES "categories"("id"),
        CONSTRAINT "fk_products_brand" FOREIGN KEY ("brand_id") REFERENCES "brands"("id") ON DELETE SET NULL
      )
      CREATE INDEX "idx_products_category_id" ON "products" ("category_id")
      CREATE INDEX "idx_products_status" ON "products" ("status")
      CREATE INDEX "idx_products_seller_id" ON "products" ("seller_id")
    `)

    // Create skus table
    await queryRunner.query(`
      CREATE TABLE "skus" (
        "id" SERIAL PRIMARY KEY,
        "product_id" INTEGER NOT NULL,
        "sku_code" VARCHAR(100) NOT NULL UNIQUE,
        "barcode" VARCHAR(100),
        "specifications" JSONB,
        "price" DECIMAL(10,2) NOT NULL,
        "original_price" DECIMAL(10,2),
        "stock" INTEGER NOT NULL DEFAULT 0,
        "low_stock_warning" INTEGER NOT NULL DEFAULT 10,
        "sales_count" INTEGER NOT NULL DEFAULT 0,
        "weight" DECIMAL(8,2),
        "volume" DECIMAL(8,2),
        "status" "sku_status_enum" NOT NULL DEFAULT 'active',
        "images" JSONB,
        "created_at" TIMESTAMP NOT NULL DEFAULT now(),
        "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
        "deleted_at" TIMESTAMP,
        CONSTRAINT "fk_skus_product" FOREIGN KEY ("product_id") REFERENCES "products"("id") ON DELETE CASCADE
      )
      CREATE INDEX "idx_skus_product_id" ON "skus" ("product_id")
      CREATE INDEX "idx_skus_sku_code" ON "skus" ("sku_code")
    `)

    // Create product_images table
    await queryRunner.query(`
      CREATE TABLE "product_images" (
        "id" SERIAL PRIMARY KEY,
        "product_id" INTEGER NOT NULL,
        "image_url" VARCHAR(500) NOT NULL,
        "thumbnail_url" VARCHAR(500),
        "sort" INTEGER NOT NULL DEFAULT 0,
        "is_main" BOOLEAN NOT NULL DEFAULT false,
        "alt_text" VARCHAR(200),
        "created_at" TIMESTAMP NOT NULL DEFAULT now(),
        CONSTRAINT "fk_product_images_product" FOREIGN KEY ("product_id") REFERENCES "products"("id") ON DELETE CASCADE
      )
      CREATE INDEX "idx_product_images_product_id" ON "product_images" ("product_id")
    `)

    // Create addresses table
    await queryRunner.query(`
      CREATE TABLE "addresses" (
        "id" SERIAL PRIMARY KEY,
        "user_id" INTEGER NOT NULL,
        "receiver_name" VARCHAR(50) NOT NULL,
        "phone" VARCHAR(20) NOT NULL,
        "province" VARCHAR(20),
        "city" VARCHAR(20),
        "district" VARCHAR(20),
        "street" VARCHAR(200),
        "address" VARCHAR(500) NOT NULL,
        "postal_code" VARCHAR(10),
        "is_default" BOOLEAN NOT NULL DEFAULT false,
        "tag" VARCHAR(20),
        "created_at" TIMESTAMP NOT NULL DEFAULT now(),
        "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
        "deleted_at" TIMESTAMP,
        CONSTRAINT "fk_addresses_user" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE
      )
      CREATE INDEX "idx_addresses_user_id" ON "addresses" ("user_id")
    `)

    // Create cart_items table
    await queryRunner.query(`
      CREATE TABLE "cart_items" (
        "id" SERIAL PRIMARY KEY,
        "user_id" INTEGER NOT NULL,
        "product_id" INTEGER NOT NULL,
        "sku_id" INTEGER NOT NULL,
        "quantity" INTEGER NOT NULL DEFAULT 1,
        "is_selected" BOOLEAN NOT NULL DEFAULT true,
        "added_at" TIMESTAMP NOT NULL DEFAULT now(),
        "created_at" TIMESTAMP NOT NULL DEFAULT now(),
        "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
        "deleted_at" TIMESTAMP,
        CONSTRAINT "fk_cart_items_user" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE,
        CONSTRAINT "fk_cart_items_product" FOREIGN KEY ("product_id") REFERENCES "products"("id") ON DELETE CASCADE,
        CONSTRAINT "fk_cart_items_sku" FOREIGN KEY ("sku_id") REFERENCES "skus"("id") ON DELETE CASCADE
      )
      CREATE INDEX "idx_cart_items_user_id" ON "cart_items" ("user_id")
      CREATE INDEX "idx_cart_items_sku_id" ON "cart_items" ("sku_id")
      CREATE UNIQUE INDEX "uk_cart_items_user_sku" ON "cart_items" ("user_id", "sku_id")
    `)

    // Create orders table
    await queryRunner.query(`
      CREATE TABLE "orders" (
        "id" SERIAL PRIMARY KEY,
        "order_no" VARCHAR(32) NOT NULL UNIQUE,
        "user_id" INTEGER NOT NULL,
        "seller_id" INTEGER NOT NULL,
        "status" "order_status_enum" NOT NULL DEFAULT 'pending_payment',
        "total_amount" DECIMAL(12,2) NOT NULL,
        "freight_amount" DECIMAL(10,2) NOT NULL DEFAULT 0,
        "discount_amount" DECIMAL(10,2) NOT NULL DEFAULT 0,
        "point_deduction" DECIMAL(10,2) NOT NULL DEFAULT 0,
        "coupon_amount" DECIMAL(10,2) NOT NULL DEFAULT 0,
        "pay_amount" DECIMAL(12,2) NOT NULL,
        "pay_method" "pay_method_enum",
        "pay_time" TIMESTAMP,
        "delivery_time" TIMESTAMP,
        "receive_time" TIMESTAMP,
        "address_id" INTEGER NOT NULL,
        "receiver_name" VARCHAR(50) NOT NULL,
        "receiver_phone" VARCHAR(20) NOT NULL,
        "receiver_address" VARCHAR(500) NOT NULL,
        "buyer_remark" VARCHAR(500),
        "seller_remark" VARCHAR(500),
        "logistics_company" VARCHAR(100),
        "tracking_no" VARCHAR(50),
        "invoice_type" "invoice_type_enum" NOT NULL DEFAULT 'none',
        "invoice_title" VARCHAR(200),
        "invoice_content" VARCHAR(200),
        "tax_id" VARCHAR(50),
        "source" VARCHAR(20) NOT NULL DEFAULT 'web',
        "created_at" TIMESTAMP NOT NULL DEFAULT now(),
        "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
        "deleted_at" TIMESTAMP,
        CONSTRAINT "fk_orders_user" FOREIGN KEY ("user_id") REFERENCES "users"("id"),
        CONSTRAINT "fk_orders_address" FOREIGN KEY ("address_id") REFERENCES "addresses"("id")
      )
      CREATE INDEX "idx_orders_order_no" ON "orders" ("order_no")
      CREATE INDEX "idx_orders_user_id" ON "orders" ("user_id")
      CREATE INDEX "idx_orders_seller_id" ON "orders" ("seller_id")
      CREATE INDEX "idx_orders_status" ON "orders" ("status")
    `)

    // Create order_items table
    await queryRunner.query(`
      CREATE TABLE "order_items" (
        "id" SERIAL PRIMARY KEY,
        "order_id" INTEGER NOT NULL,
        "product_id" INTEGER NOT NULL,
        "sku_id" INTEGER NOT NULL,
        "product_name" VARCHAR(200) NOT NULL,
        "sku_specs" JSONB,
        "product_image" VARCHAR(500) NOT NULL,
        "price" DECIMAL(10,2) NOT NULL,
        "original_price" DECIMAL(10,2),
        "quantity" INTEGER NOT NULL,
        "subtotal" DECIMAL(10,2) NOT NULL,
        "discount_amount" DECIMAL(10,2) NOT NULL DEFAULT 0,
        "is_reviewed" BOOLEAN NOT NULL DEFAULT false,
        "created_at" TIMESTAMP NOT NULL DEFAULT now(),
        "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
        "deleted_at" TIMESTAMP,
        CONSTRAINT "fk_order_items_order" FOREIGN KEY ("order_id") REFERENCES "orders"("id") ON DELETE CASCADE,
        CONSTRAINT "fk_order_items_product" FOREIGN KEY ("product_id") REFERENCES "products"("id"),
        CONSTRAINT "fk_order_items_sku" FOREIGN KEY ("sku_id") REFERENCES "skus"("id")
      )
      CREATE INDEX "idx_order_items_order_id" ON "order_items" ("order_id")
    `)

    // Create refunds table
    await queryRunner.query(`
      CREATE TABLE "refunds" (
        "id" SERIAL PRIMARY KEY,
        "refund_no" VARCHAR(32) NOT NULL UNIQUE,
        "order_id" INTEGER NOT NULL,
        "order_no" VARCHAR(32) NOT NULL,
        "type" VARCHAR(20) NOT NULL,
        "status" VARCHAR(20) NOT NULL DEFAULT 'pending',
        "buyer_id" INTEGER NOT NULL,
        "seller_id" INTEGER NOT NULL,
        "product_id" INTEGER NOT NULL,
        "sku_id" INTEGER NOT NULL,
        "refund_amount" DECIMAL(10,2) NOT NULL,
        "actual_refund_amount" DECIMAL(10,2),
        "reason" VARCHAR(500) NOT NULL,
        "description" TEXT,
        "images" JSONB,
        "logistics_company" VARCHAR(100),
        "tracking_no" VARCHAR(50),
        "seller_reply" TEXT,
        "reject_reason" VARCHAR(500),
        "process_time" TIMESTAMP,
        "complete_time" TIMESTAMP,
        "created_at" TIMESTAMP NOT NULL DEFAULT now(),
        "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
        "deleted_at" TIMESTAMP,
        CONSTRAINT "fk_refunds_order" FOREIGN KEY ("order_id") REFERENCES "orders"("id")
      )
      CREATE INDEX "idx_refunds_refund_no" ON "refunds" ("refund_no")
      CREATE INDEX "idx_refunds_order_id" ON "refunds" ("order_id")
      CREATE INDEX "idx_refunds_buyer_id" ON "refunds" ("buyer_id")
      CREATE INDEX "idx_refunds_status" ON "refunds" ("status")
    `)

    // Create user_favorites table
    await queryRunner.query(`
      CREATE TABLE "user_favorites" (
        "id" SERIAL PRIMARY KEY,
        "user_id" INTEGER NOT NULL,
        "product_id" INTEGER NOT NULL,
        "created_at" TIMESTAMP NOT NULL DEFAULT now(),
        CONSTRAINT "fk_user_favorites_user" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE,
        CONSTRAINT "fk_user_favorites_product" FOREIGN KEY ("product_id") REFERENCES "products"("id") ON DELETE CASCADE
      )
      CREATE UNIQUE INDEX "uk_user_favorites_user_product" ON "user_favorites" ("user_id", "product_id")
      CREATE INDEX "idx_user_favorites_user_id" ON "user_favorites" ("user_id")
    `)

    // Create user_footprints table
    await queryRunner.query(`
      CREATE TABLE "user_footprints" (
        "id" SERIAL PRIMARY KEY,
        "user_id" INTEGER NOT NULL,
        "product_id" INTEGER NOT NULL,
        "visited_at" TIMESTAMP NOT NULL DEFAULT now(),
        "created_at" TIMESTAMP NOT NULL DEFAULT now(),
        CONSTRAINT "fk_user_footprints_user" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE,
        CONSTRAINT "fk_user_footprints_product" FOREIGN KEY ("product_id") REFERENCES "products"("id") ON DELETE CASCADE
      )
      CREATE INDEX "idx_user_footprints_user_id" ON "user_footprints" ("user_id")
    `)

    // Create reviews table
    await queryRunner.query(`
      CREATE TABLE "reviews" (
        "id" SERIAL PRIMARY KEY,
        "order_id" INTEGER NOT NULL,
        "order_item_id" INTEGER NOT NULL,
        "product_id" INTEGER NOT NULL,
        "user_id" INTEGER NOT NULL,
        "score" INTEGER NOT NULL,
        "content" TEXT,
        "images" JSONB,
        "video_url" VARCHAR(500),
        "is_anonymous" BOOLEAN NOT NULL DEFAULT false,
        "is_append" BOOLEAN NOT NULL DEFAULT false,
        "append_content" TEXT,
        "append_images" JSONB,
        "append_time" TIMESTAMP,
        "seller_reply" TEXT,
        "seller_reply_time" TIMESTAMP,
        "like_count" INTEGER NOT NULL DEFAULT 0,
        "created_at" TIMESTAMP NOT NULL DEFAULT now(),
        "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
        "deleted_at" TIMESTAMP,
        CONSTRAINT "fk_reviews_order_item" FOREIGN KEY ("order_item_id") REFERENCES "order_items"("id") ON DELETE CASCADE,
        CONSTRAINT "fk_reviews_product" FOREIGN KEY ("product_id") REFERENCES "products"("id"),
        CONSTRAINT "fk_reviews_user" FOREIGN KEY ("user_id") REFERENCES "users"("id")
      )
      CREATE INDEX "idx_reviews_product_id" ON "reviews" ("product_id")
      CREATE INDEX "idx_reviews_user_id" ON "reviews" ("user_id")
      CREATE INDEX "idx_reviews_order_item_id" ON "reviews" ("order_item_id")
    `)

    // Create coupons table
    await queryRunner.query(`
      CREATE TABLE "coupons" (
        "id" SERIAL PRIMARY KEY,
        "name" VARCHAR(100) NOT NULL,
        "type" VARCHAR(20) NOT NULL,
        "denomination" DECIMAL(10,2) NOT NULL,
        "min_amount" DECIMAL(10,2) NOT NULL DEFAULT 0,
        "max_discount" DECIMAL(10,2),
        "total_count" INTEGER NOT NULL,
        "remain_count" INTEGER NOT NULL,
        "per_limit" INTEGER NOT NULL DEFAULT 1,
        "receive_type" VARCHAR(20) NOT NULL DEFAULT 'manual',
        "start_time" TIMESTAMP NOT NULL,
        "end_time" TIMESTAMP NOT NULL,
        "valid_days" INTEGER,
        "scope_type" VARCHAR(20) NOT NULL DEFAULT 'all',
        "scope_ids" TEXT,
        "status" VARCHAR(20) NOT NULL DEFAULT 'pending',
        "created_at" TIMESTAMP NOT NULL DEFAULT now(),
        "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
        "deleted_at" TIMESTAMP
      )
      CREATE INDEX "idx_coupons_status" ON "coupons" ("status")
    `)

    // Create user_coupons table
    await queryRunner.query(`
      CREATE TABLE "user_coupons" (
        "id" SERIAL PRIMARY KEY,
        "user_id" INTEGER NOT NULL,
        "coupon_id" INTEGER NOT NULL,
        "order_id" INTEGER,
        "status" VARCHAR(20) NOT NULL DEFAULT 'unused',
        "receive_time" TIMESTAMP NOT NULL DEFAULT now(),
        "used_time" TIMESTAMP,
        "expire_time" TIMESTAMP NOT NULL,
        "created_at" TIMESTAMP NOT NULL DEFAULT now(),
        "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
        "deleted_at" TIMESTAMP,
        CONSTRAINT "fk_user_coupons_user" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE,
        CONSTRAINT "fk_user_coupons_coupon" FOREIGN KEY ("coupon_id") REFERENCES "coupons"("id") ON DELETE CASCADE
      )
      CREATE INDEX "idx_user_coupons_user_id" ON "user_coupons" ("user_id")
      CREATE INDEX "idx_user_coupons_status" ON "user_coupons" ("status")
    `)

    // Create activities table
    await queryRunner.query(`
      CREATE TABLE "activities" (
        "id" SERIAL PRIMARY KEY,
        "name" VARCHAR(200) NOT NULL,
        "type" VARCHAR(20) NOT NULL,
        "description" TEXT,
        "banner_url" VARCHAR(500),
        "start_time" TIMESTAMP NOT NULL,
        "end_time" TIMESTAMP NOT NULL,
        "enroll_start_time" TIMESTAMP,
        "enroll_end_time" TIMESTAMP,
        "rule_config" JSONB,
        "status" VARCHAR(20) NOT NULL DEFAULT 'pending',
        "created_at" TIMESTAMP NOT NULL DEFAULT now(),
        "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
        "deleted_at" TIMESTAMP
      )
      CREATE INDEX "idx_activities_status" ON "activities" ("status")
      CREATE INDEX "idx_activities_type" ON "activities" ("type")
    `)

    // Create activity_products table
    await queryRunner.query(`
      CREATE TABLE "activity_products" (
        "id" SERIAL PRIMARY KEY,
        "activity_id" INTEGER NOT NULL,
        "product_id" INTEGER NOT NULL,
        "sku_id" INTEGER NOT NULL,
        "activity_price" DECIMAL(10,2) NOT NULL,
        "stock" INTEGER NOT NULL,
        "sold_count" INTEGER NOT NULL DEFAULT 0,
        "max_per_user" INTEGER NOT NULL DEFAULT 1,
        "status" VARCHAR(20) NOT NULL DEFAULT 'pending',
        "created_at" TIMESTAMP NOT NULL DEFAULT now(),
        CONSTRAINT "fk_activity_products_activity" FOREIGN KEY ("activity_id") REFERENCES "activities"("id") ON DELETE CASCADE,
        CONSTRAINT "fk_activity_products_product" FOREIGN KEY ("product_id") REFERENCES "products"("id") ON DELETE CASCADE
      )
      CREATE INDEX "idx_activity_products_activity_id" ON "activity_products" ("activity_id")
      CREATE INDEX "idx_activity_products_product_id" ON "activity_products" ("product_id")
    `)

    // Create shops table
    await queryRunner.query(`
      CREATE TABLE "shops" (
        "id" SERIAL PRIMARY KEY,
        "user_id" INTEGER NOT NULL UNIQUE,
        "name" VARCHAR(100) NOT NULL,
        "logo_url" VARCHAR(500),
        "banner_url" VARCHAR(500),
        "description" VARCHAR(1000),
        "main_business" VARCHAR(200),
        "contact_phone" VARCHAR(20),
        "province" VARCHAR(20),
        "city" VARCHAR(20),
        "district" VARCHAR(20),
        "address" VARCHAR(500),
        "business_license_url" VARCHAR(500),
        "id_card_front_url" VARCHAR(500),
        "id_card_back_url" VARCHAR(500),
        "status" VARCHAR(20) NOT NULL DEFAULT 'pending',
        "review_score" DECIMAL(2,1) NOT NULL DEFAULT 0,
        "review_count" INTEGER NOT NULL DEFAULT 0,
        "total_sales" INTEGER NOT NULL DEFAULT 0,
        "created_at" TIMESTAMP NOT NULL DEFAULT now(),
        "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
        "deleted_at" TIMESTAMP,
        CONSTRAINT "fk_shops_user" FOREIGN KEY ("user_id") REFERENCES "users"("id")
      )
      CREATE INDEX "idx_shops_user_id" ON "shops" ("user_id")
      CREATE INDEX "idx_shops_status" ON "shops" ("status")
    `)

    // Create ad_positions table
    await queryRunner.query(`
      CREATE TABLE "ad_positions" (
        "id" SERIAL PRIMARY KEY,
        "name" VARCHAR(100) NOT NULL,
        "code" VARCHAR(50) NOT NULL UNIQUE,
        "width" INTEGER NOT NULL,
        "height" INTEGER NOT NULL,
        "description" VARCHAR(500),
        "is_active" BOOLEAN NOT NULL DEFAULT true,
        "created_at" TIMESTAMP NOT NULL DEFAULT now(),
        "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
        "deleted_at" TIMESTAMP
      )
    `)

    // Create ads table
    await queryRunner.query(`
      CREATE TABLE "ads" (
        "id" SERIAL PRIMARY KEY,
        "position_id" INTEGER NOT NULL,
        "name" VARCHAR(100) NOT NULL,
        "image_url" VARCHAR(500) NOT NULL,
        "link_type" VARCHAR(20) NOT NULL DEFAULT 'url',
        "link_url" VARCHAR(500),
        "link_product_id" INTEGER,
        "link_category_id" INTEGER,
        "start_time" TIMESTAMP NOT NULL,
        "end_time" TIMESTAMP NOT NULL,
        "sort" INTEGER NOT NULL DEFAULT 0,
        "click_count" INTEGER NOT NULL DEFAULT 0,
        "status" VARCHAR(20) NOT NULL DEFAULT 'pending',
        "created_at" TIMESTAMP NOT NULL DEFAULT now(),
        "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
        "deleted_at" TIMESTAMP,
        CONSTRAINT "fk_ads_position" FOREIGN KEY ("position_id") REFERENCES "ad_positions"("id") ON DELETE CASCADE
      )
      CREATE INDEX "idx_ads_position_id" ON "ads" ("position_id")
      CREATE INDEX "idx_ads_status" ON "ads" ("status")
    `)

    // Create messages table
    await queryRunner.query(`
      CREATE TABLE "messages" (
        "id" SERIAL PRIMARY KEY,
        "type" VARCHAR(20) NOT NULL DEFAULT 'chat',
        "sender_id" INTEGER NOT NULL,
        "sender_type" VARCHAR(20) NOT NULL,
        "receiver_id" INTEGER NOT NULL,
        "receiver_type" VARCHAR(20) NOT NULL,
        "content" TEXT NOT NULL,
        "msg_type" VARCHAR(20) NOT NULL DEFAULT 'text',
        "order_id" INTEGER,
        "is_read" BOOLEAN NOT NULL DEFAULT false,
        "read_time" TIMESTAMP,
        "created_at" TIMESTAMP NOT NULL DEFAULT now(),
        "deleted_at" TIMESTAMP
      )
      CREATE INDEX "idx_messages_sender" ON "messages" ("sender_id", "sender_type")
      CREATE INDEX "idx_messages_receiver" ON "messages" ("receiver_id", "receiver_type")
      CREATE INDEX "idx_messages_order_id" ON "messages" ("order_id")
    `)

    // Create notifications table
    await queryRunner.query(`
      CREATE TABLE "notifications" (
        "id" SERIAL PRIMARY KEY,
        "user_id" INTEGER NOT NULL,
        "type" VARCHAR(50) NOT NULL,
        "title" VARCHAR(200) NOT NULL,
        "content" TEXT NOT NULL,
        "data" JSONB,
        "is_read" BOOLEAN NOT NULL DEFAULT false,
        "read_time" TIMESTAMP,
        "created_at" TIMESTAMP NOT NULL DEFAULT now(),
        "deleted_at" TIMESTAMP,
        CONSTRAINT "fk_notifications_user" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE
      )
      CREATE INDEX "idx_notifications_user_id" ON "notifications" ("user_id")
      CREATE INDEX "idx_notifications_is_read" ON "notifications" ("is_read")
    `)

    // Create regions table
    await queryRunner.query(`
      CREATE TABLE "regions" (
        "id" SERIAL PRIMARY KEY,
        "name" VARCHAR(100) NOT NULL,
        "parent_id" INTEGER,
        "level" INTEGER NOT NULL DEFAULT 1,
        "code" VARCHAR(20),
        "created_at" TIMESTAMP NOT NULL DEFAULT now(),
        "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
        "deleted_at" TIMESTAMP
      )
      CREATE INDEX "idx_regions_parent_id" ON "regions" ("parent_id")
    `)

    // Create account_logs table
    await queryRunner.query(`
      CREATE TABLE "account_logs" (
        "id" SERIAL PRIMARY KEY,
        "user_id" INTEGER NOT NULL,
        "type" VARCHAR(50) NOT NULL,
        "amount" DECIMAL(12,2) NOT NULL,
        "balance_before" DECIMAL(12,2) NOT NULL,
        "balance_after" DECIMAL(12,2) NOT NULL,
        "order_id" INTEGER,
        "description" VARCHAR(500),
        "created_at" TIMESTAMP NOT NULL DEFAULT now(),
        CONSTRAINT "fk_account_logs_user" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE
      )
      CREATE INDEX "idx_account_logs_user_id" ON "account_logs" ("user_id")
      CREATE INDEX "idx_account_logs_type" ON "account_logs" ("type")
    `)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE IF EXISTS "account_logs"`)
    await queryRunner.query(`DROP TABLE IF EXISTS "regions"`)
    await queryRunner.query(`DROP TABLE IF EXISTS "notifications"`)
    await queryRunner.query(`DROP TABLE IF EXISTS "messages"`)
    await queryRunner.query(`DROP TABLE IF EXISTS "ads"`)
    await queryRunner.query(`DROP TABLE IF EXISTS "ad_positions"`)
    await queryRunner.query(`DROP TABLE IF EXISTS "shops"`)
    await queryRunner.query(`DROP TABLE IF EXISTS "activity_products"`)
    await queryRunner.query(`DROP TABLE IF EXISTS "activities"`)
    await queryRunner.query(`DROP TABLE IF EXISTS "user_coupons"`)
    await queryRunner.query(`DROP TABLE IF EXISTS "coupons"`)
    await queryRunner.query(`DROP TABLE IF EXISTS "reviews"`)
    await queryRunner.query(`DROP TABLE IF EXISTS "user_footprints"`)
    await queryRunner.query(`DROP TABLE IF EXISTS "user_favorites"`)
    await queryRunner.query(`DROP TABLE IF EXISTS "refunds"`)
    await queryRunner.query(`DROP TABLE IF EXISTS "order_items"`)
    await queryRunner.query(`DROP TABLE IF EXISTS "orders"`)
    await queryRunner.query(`DROP TABLE IF EXISTS "cart_items"`)
    await queryRunner.query(`DROP TABLE IF EXISTS "addresses"`)
    await queryRunner.query(`DROP TABLE IF EXISTS "product_images"`)
    await queryRunner.query(`DROP TABLE IF EXISTS "skus"`)
    await queryRunner.query(`DROP TABLE IF EXISTS "products"`)
    await queryRunner.query(`DROP TABLE IF EXISTS "freight_template_items"`)
    await queryRunner.query(`DROP TABLE IF EXISTS "freight_templates"`)
    await queryRunner.query(`DROP TABLE IF EXISTS "brands"`)
    await queryRunner.query(`DROP TABLE IF EXISTS "categories"`)
    await queryRunner.query(`DROP TABLE IF EXISTS "users"`)

    await queryRunner.query(`DROP TYPE IF EXISTS "invoice_type_enum"`)
    await queryRunner.query(`DROP TYPE IF EXISTS "pay_method_enum"`)
    await queryRunner.query(`DROP TYPE IF EXISTS "sku_status_enum"`)
    await queryRunner.query(`DROP TYPE IF EXISTS "order_status_enum"`)
    await queryRunner.query(`DROP TYPE IF EXISTS "product_status_enum"`)
    await queryRunner.query(`DROP TYPE IF EXISTS "user_role_enum"`)
  }
}
