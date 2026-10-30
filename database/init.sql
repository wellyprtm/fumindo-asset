-- Create database
CREATE DATABASE asset_fumindo;

-- Move to database
\c asset_fumindo

-- create table
CREATE TABLE asset (
    asset_id SERIAL PRIMARY KEY,
    asset_name VARCHAR(150) NOT NULL,
    stock_quantity INT NOT NULL DEFAULT 0 CHECK (stock_quantity >= 0),
    category VARCHAR(20) NOT NULL CHECK (category IN ('Consumable', 'Non-Consumable'))
);
