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
        owner_id INTEGER REFERENCES users(id),
        name VARCHAR(100) NOT NULL,
        description VARCHAR(500),
        is_assigned BOOLEAN NOT NULL,
        deadline DATE NOT NULL,
        budget INTEGER
    );

    DROP TABLE IF EXISTS users_groups CASCADE;

    CREATE TABLE  users_groups (
        user_id INTEGER REFERENCES users(id) ON UPDATE CASCADE ON DELETE CASCADE,
        group_id INTEGER REFERENCES groups(id) ON UPDATE CASCADE ON DELETE CASCADE,
        CONSTRAINT users_groups_pkey PRIMARY KEY (user_id, group_id)
    );

    INSERT INTO users VALUES
        (DEFAULT, 'sam', 'sam@gmail.com', '$2a$10$CEicRuoB3hvCnlDx9Of/deXIiRInjoRhYuC9VKdox7n0zVXMbzJb2');

    INSERT INTO groups VALUES
    (
        DEFAULT,
        (SELECT id FROM users WHERE email = 'sam@gmail.com'),
        'The best group evaaz',
        'This groups is better than all the others',
        false,
        to_date('2200-12-25', 'YYYY-MM-DD'),
        10
    );

    INSERT INTO users_groups VALUES
    (
        (SELECT id FROM users WHERE email = 'sam@gmail.com'),
        (SELECT id FROM groups WHERE name = 'The best group evaaz')
    );

COMMIT;
