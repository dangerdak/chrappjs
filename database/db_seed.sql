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

COMMIT;
