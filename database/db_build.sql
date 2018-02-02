BEGIN;

    DROP TABLE IF EXISTS users CASCADE;

    CREATE TABLE users (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        email VARCHAR(100) UNIQUE NOT NULL,
        password VARCHAR(64) NOT NULL
    );
    
    DROP TABLE IF EXISTS groups CASCADE;
    
    CREATE TABLE groups (
        id SERIAL PRIMARY KEY,
        owner_id INTEGER REFERENCES users(id) ON DELETE CASCADE NOT NULL,
        name VARCHAR(100) NOT NULL,
        description VARCHAR(500),
        is_assigned BOOLEAN NOT NULL,
        deadline DATE NOT NULL,
        budget INTEGER
    );

    DROP TABLE IF EXISTS users_groups CASCADE;

    CREATE TABLE users_groups (
        user_id INTEGER REFERENCES groups(id) ON DELETE CASCADE NOT NULL,
        group_id INTEGER REFERENCES groups(id) ON DELETE CASCADE NOT NULL,
        CONSTRAINT users_groups_pkey PRIMARY KEY (user_id, group_id)
    );

COMMIT;
