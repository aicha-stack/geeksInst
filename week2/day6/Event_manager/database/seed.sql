
DROP TABLE IF EXISTS tickets;
DROP TABLE IF EXISTS attendees;
DROP TABLE IF EXISTS events;
DROP TABLE IF EXISTS organizers;


CREATE TABLE organizers (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100),
    contact_info VARCHAR(100)
);


CREATE TABLE events (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100),
    date DATE,
    location VARCHAR(100),
    description TEXT,
    organizer_id INT REFERENCES organizers(id) ON DELETE CASCADE
);


CREATE TABLE attendees (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100),
    email VARCHAR(100),
    phone VARCHAR(20)
);


CREATE TABLE tickets (
    id SERIAL PRIMARY KEY,
    event_id INT REFERENCES events(id) ON DELETE CASCADE,
    attendee_id INT REFERENCES attendees(id) ON DELETE CASCADE
);


INSERT INTO organizers (name, contact_info) VALUES
('Alice', 'alice@email.com'),
('Bob', 'bob@email.com');

INSERT INTO events (name, date, location, description, organizer_id) VALUES
('Tech Conference', '2025-09-15', 'Casablanca', 'Annual tech meetup', 1),
('Music Festival', '2025-10-01', 'Rabat', 'Live music event', 2);

INSERT INTO attendees (name, email, phone) VALUES
('John Doe', 'john@mail.com', '0600000001'),
('Jane Smith', 'jane@mail.com', '0600000002');

INSERT INTO tickets (event_id, attendee_id) VALUES
(1,1),
(2,2);
