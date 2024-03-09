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
    driver_id UUID NOT NULL,
    cover_uri VARCHAR(255),
    ip_address INET [],
    port INTEGER NOT NULL,
    protocol VARCHAR(255) NOT NULL,
    protocol_params JSONB NOT NULL,
    params JSONB NOT NULL,
    communication_settings JSONB NOT NULL,
    configuration JSONB NOT NULL,
    tags TEXT [] NOT NULL,
    -- 
    created_at TIMESTAMP WITHOUT TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITHOUT TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    -- 
    FOREIGN KEY (driver_id) REFERENCES drivers(id)
);

CREATE TABLE hmi (
    id UUID PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    cover_uri VARCHAR(255),
    owner_id UUID NOT NULL,
    variables UUID [],
    frontend_layout VARCHAR(255) NOT NULL,
    frontend_layout_settings JSONB NOT NULL,
    -- 
    created_at TIMESTAMP WITHOUT TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITHOUT TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    -- 
    FOREIGN KEY (owner_id) REFERENCES users(id)
);

CREATE TABLE variables (
    id UUID PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    hmi_id UUID NOT NULL,
    device_id UUID NOT NULL,
    protocol VARCHAR(255) NOT NULL,
    update_interval INTEGER NOT NULL,
    device_configuration_path TEXT NOT NULL,
    -- 
    created_at TIMESTAMP WITHOUT TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITHOUT TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    -- 
    FOREIGN KEY (hmi_id) REFERENCES hmi(id),
    FOREIGN KEY (device_id) REFERENCES devices(id) -- Assuming you have a devices table
);