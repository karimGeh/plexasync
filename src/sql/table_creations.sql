CREATE DATABASE plexasync;

CREATE ROLE admin WITH LOGIN PASSWORD 'admin' SUPERUSER CREATEDB CREATEROLE;

CREATE TABLE users (
    id UUID PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    email VARCHAR(255),
    full_name VARCHAR(255) NOT NULL DEFAULT '',
    role VARCHAR(255) NOT NULL DEFAULT 'user',
    avatar_uri VARCHAR(255) DEFAULT '',
    -- 
    created_at TIMESTAMP WITHOUT TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITHOUT TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    last_login TIMESTAMP WITHOUT TIME ZONE DEFAULT CURRENT_TIMESTAMP,
);

CREATE TABLE drivers (
    id UUID PRIMARY KEY,
    software_version VARCHAR(255) NOT NULL,
    hardware_version VARCHAR(255) NOT NULL,
    protocol VARCHAR(255) NOT NULL,
    default__protocol_params JSONB NOT NULL,
    device_params JSONB NOT NULL,
    default_communication_settings JSONB NOT NULL,
    configuration JSONB NOT NULL,
    tags TEXT [] NOT NULL,
    -- 
    created_at TIMESTAMP WITHOUT TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITHOUT TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE devices (
    id UUID PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    cover VARCHAR(255),
    ip_address VARCHAR(255) NOT NULL,
    tags TEXT [] NOT NULL,
    -- 
    created_at TIMESTAMP WITHOUT TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITHOUT TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE variables (
    id UUID PRIMARY KEY,
    device_id UUID NOT NULL,
    --
    name VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    tags TEXT [] NOT NULL,
    --
    scale_factor FLOAT NOT NULL,
    offset_factor FLOAT NOT NULL,
    unit VARCHAR(255) NOT NULL,
    port INTEGER NOT NULL,
    protocol VARCHAR(255) NOT NULL,
    protocol_params JSONB NOT NULL,
    -- 
    created_at TIMESTAMP WITHOUT TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITHOUT TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    -- 
    FOREIGN KEY (device_id) REFERENCES devices(id) -- Assuming you have a devices table
);

CREATE TABLE hmi (
    id UUID PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    cover VARCHAR(255),
    tags TEXT [] NOT NULL,
    --
    variables UUID [],
    frontend_layout VARCHAR(255) NOT NULL,
    -- 
    created_at TIMESTAMP WITHOUT TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITHOUT TIME ZONE DEFAULT CURRENT_TIMESTAMP
);