CREATE TYPE order_status AS ENUM ('IN_PROGRESS', 'DONE', 'DELETED');

ALTER TABLE orders ADD COLUMN status order_status DEFAULT 'IN_PROGRESS';

UPDATE orders SET status = 'DONE' WHERE done = true AND deleted = false;
UPDATE orders SET status = 'DELETED' WHERE deleted = true;
UPDATE orders SET status = 'IN_PROGRESS' WHERE done = false AND deleted = false;

ALTER TABLE orders DROP COLUMN done;
ALTER TABLE orders DROP COLUMN deleted;
