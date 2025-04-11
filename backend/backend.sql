-- Users Table
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    full_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    role VARCHAR(50) NOT NULL,
    password_hash VARCHAR(100),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    last_login TIMESTAMP WITH TIME ZONE
);

-- Third Party Table
CREATE TABLE third_party (
    id SERIAL PRIMARY KEY,
    company_name VARCHAR(255) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Stock Categories Table
CREATE TABLE stock_categories (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Subcategories Table
CREATE TABLE subcategories (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    category_id INTEGER,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Suppliers Table
CREATE TABLE suppliers (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    stock_type VARCHAR(50),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Items Table (Inventory)
CREATE TABLE items (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    category_id INTEGER,
    subcategory_id INTEGER,
    unit VARCHAR(20) NOT NULL,
    expiry_date DATE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    quantity INTEGER NOT NULL,
    received_date DATE DEFAULT CURRENT_DATE,
    status VARCHAR(20),
    last_updated TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    supplier_id INTEGER,
    min_quantity INTEGER DEFAULT 10
);

-- Categories Table (menu categories)
CREATE TABLE categories (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) UNIQUE NOT NULL,
    icon VARCHAR(100)
);

-- Menu Items Table
CREATE TABLE menu_items (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    category_id INTEGER,
    description TEXT,
    is_available BOOLEAN DEFAULT FALSE,
    image_url VARCHAR(255),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Table Book Table
CREATE TABLE table_book (
    id SERIAL PRIMARY KEY,
    seats INT NOT NULL,
    table_number INT NOT NULL,
    is_booked BOOLEAN NOT NULL DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Orders Table
CREATE TABLE orders (
    id SERIAL PRIMARY KEY,
    table_id INTEGER,
    status VARCHAR(20) NOT NULL DEFAULT 'pending',
    order_type VARCHAR(20) DEFAULT 'Onsite',
    served_time TIMESTAMP WITH TIME ZONE,
    assigned_time TIMESTAMP WITH TIME ZONE,
    special_instructions TEXT,
    started_cooking TIMESTAMP WITH TIME ZONE,
    chef_id INTEGER,
    waiter_id INTEGER,
    assigned_by INTEGER,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    third_party_id INTEGER
);

-- Bookings Table
CREATE TABLE bookings (
    id SERIAL PRIMARY KEY,
    full_name VARCHAR(255) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    email VARCHAR(255),
    booking_date DATE NOT NULL,
    arrival_time TIME NOT NULL,
    finish_time TIME,
    party_size INT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    order_id INTEGER,
    status VARCHAR(20) DEFAULT 'Pending'
);

-- Order Items Table
CREATE TABLE order_items (
    id SERIAL PRIMARY KEY,
    order_id INTEGER NOT NULL,
    menu_item_id INTEGER NOT NULL,
    quantity INT NOT NULL DEFAULT 1,
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Sales Table
CREATE TABLE sales (
    id SERIAL PRIMARY KEY,
    cashier_id INTEGER,
    total_amount DECIMAL(10, 2) NOT NULL,
    sale_date TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    order_id INTEGER,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    is_paid BOOLEAN DEFAULT FALSE NOT NULL,
    payment_method VARCHAR(50),
    discount_amount DECIMAL(10, 2) DEFAULT 0
);

-- Stock Requests Table
CREATE TABLE stock_requests (
    id SERIAL PRIMARY KEY,
    item_id INTEGER NOT NULL,
    quantity INTEGER NOT NULL,
    requester_id INTEGER,
    requested_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    approved BOOLEAN DEFAULT FALSE,
    approved_by INTEGER,
    approved_at TIMESTAMP WITH TIME ZONE,
    status VARCHAR(20) DEFAULT 'pending',
    fulfilled BOOLEAN DEFAULT FALSE,
    fulfilled_at TIMESTAMP WITH TIME ZONE,
    notes TEXT
);

-- Disposed Items Table
CREATE TABLE disposed_items (
    id SERIAL PRIMARY KEY,
    item_id INTEGER NOT NULL,
    quantity INTEGER NOT NULL,
    reason TEXT NOT NULL,
    disposed_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    disposed_by INTEGER NOT NULL,
    notes TEXT
);

-- Inventory Transactions Table
CREATE TABLE inventory_transactions (
    id SERIAL PRIMARY KEY,
    item_id INTEGER NOT NULL,
    quantity_change INTEGER NOT NULL,
    transaction_type VARCHAR(50) NOT NULL,
    reference_id INTEGER,
    reference_type VARCHAR(50),
    performed_by INTEGER,
    transaction_date TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    notes TEXT
);

-- Add foreign key constraints
ALTER TABLE subcategories ADD CONSTRAINT fk_subcategories_category 
    FOREIGN KEY (category_id) REFERENCES stock_categories(id) ON DELETE CASCADE;

ALTER TABLE items ADD CONSTRAINT fk_items_category 
    FOREIGN KEY (category_id) REFERENCES stock_categories(id) ON DELETE SET NULL;
ALTER TABLE items ADD CONSTRAINT fk_items_subcategory 
    FOREIGN KEY (subcategory_id) REFERENCES subcategories(id) ON DELETE SET NULL;
ALTER TABLE items ADD CONSTRAINT fk_items_supplier 
    FOREIGN KEY (supplier_id) REFERENCES suppliers(id) ON DELETE SET NULL;

ALTER TABLE menu_items ADD CONSTRAINT fk_menu_items_category 
    FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE SET NULL;

ALTER TABLE orders ADD CONSTRAINT fk_orders_table 
    FOREIGN KEY (table_id) REFERENCES table_book(id) ON DELETE SET NULL;
ALTER TABLE orders ADD CONSTRAINT fk_orders_chef 
    FOREIGN KEY (chef_id) REFERENCES users(id) ON DELETE SET NULL;
ALTER TABLE orders ADD CONSTRAINT fk_orders_waiter 
    FOREIGN KEY (waiter_id) REFERENCES users(id) ON DELETE SET NULL;
ALTER TABLE orders ADD CONSTRAINT fk_orders_assigned_by 
    FOREIGN KEY (assigned_by) REFERENCES users(id) ON DELETE SET NULL;
ALTER TABLE orders ADD CONSTRAINT fk_orders_third_party 
    FOREIGN KEY (third_party_id) REFERENCES third_party(id) ON DELETE SET NULL;

ALTER TABLE bookings ADD CONSTRAINT fk_bookings_order 
    FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE SET NULL;

ALTER TABLE order_items ADD CONSTRAINT fk_order_items_order 
    FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE;
ALTER TABLE order_items ADD CONSTRAINT fk_order_items_menu_item 
    FOREIGN KEY (menu_item_id) REFERENCES menu_items(id) ON DELETE CASCADE;

ALTER TABLE sales ADD CONSTRAINT fk_sales_cashier 
    FOREIGN KEY (cashier_id) REFERENCES users(id) ON DELETE SET NULL;
ALTER TABLE sales ADD CONSTRAINT fk_sales_order 
    FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE SET NULL;

ALTER TABLE stock_requests ADD CONSTRAINT fk_stock_requests_item 
    FOREIGN KEY (item_id) REFERENCES items(id) ON DELETE CASCADE;
ALTER TABLE stock_requests ADD CONSTRAINT fk_stock_requests_requester 
    FOREIGN KEY (requester_id) REFERENCES users(id) ON DELETE SET NULL;
ALTER TABLE stock_requests ADD CONSTRAINT fk_stock_requests_approved_by 
    FOREIGN KEY (approved_by) REFERENCES users(id) ON DELETE SET NULL;

ALTER TABLE disposed_items ADD CONSTRAINT fk_disposed_items_item 
    FOREIGN KEY (item_id) REFERENCES items(id) ON DELETE CASCADE;
ALTER TABLE disposed_items ADD CONSTRAINT fk_disposed_items_user 
    FOREIGN KEY (disposed_by) REFERENCES users(id) ON DELETE SET NULL;

ALTER TABLE inventory_transactions ADD CONSTRAINT fk_inventory_transactions_item 
    FOREIGN KEY (item_id) REFERENCES items(id) ON DELETE CASCADE;
ALTER TABLE inventory_transactions ADD CONSTRAINT fk_inventory_transactions_user 
    FOREIGN KEY (performed_by) REFERENCES users(id) ON DELETE SET NULL;

-- Add check constraints
ALTER TABLE users ADD CONSTRAINT chk_users_role 
    CHECK (role IN ('CHEF', 'WAITER', 'STOREKEEPER', 'SUPERADMIN', 'CASHIER', 'KITCHEN_MANAGER', 'MANAGER', 'RECEPTION'));

ALTER TABLE items ADD CONSTRAINT chk_items_quantity 
    CHECK (quantity >= 0);
ALTER TABLE items ADD CONSTRAINT chk_items_hierarchy 
    CHECK ((category_id IS NOT NULL AND subcategory_id IS NULL) OR 
           (category_id IS NULL AND subcategory_id IS NOT NULL));

ALTER TABLE menu_items ADD CONSTRAINT chk_menu_items_price 
    CHECK (price >= 0);

ALTER TABLE table_book ADD CONSTRAINT chk_table_book_seats 
    CHECK (seats > 0);
ALTER TABLE table_book ADD CONSTRAINT uq_table_book_number 
    UNIQUE (table_number);

ALTER TABLE orders ADD CONSTRAINT chk_orders_status 
    CHECK (status IN ('assigned', 'pending', 'ready', 'served'));
ALTER TABLE orders ADD CONSTRAINT chk_orders_type 
    CHECK (order_type IN ('Online', 'Onsite', 'Third-Party'));
ALTER TABLE orders ADD CONSTRAINT chk_orders_third_party 
    CHECK ((order_type = 'Third-Party' AND third_party_id IS NOT NULL) OR
           (order_type != 'Third-Party' AND third_party_id IS NULL));
ALTER TABLE orders ADD CONSTRAINT chk_orders_waiter 
    CHECK ((order_type = 'Onsite' AND waiter_id IS NOT NULL) OR
           (order_type != 'Onsite' AND waiter_id IS NULL));

ALTER TABLE bookings ADD CONSTRAINT chk_bookings_status 
    CHECK (status IN ('Pending', 'Confirmed', 'Cancelled'));

ALTER TABLE order_items ADD CONSTRAINT chk_order_items_quantity 
    CHECK (quantity > 0);
ALTER TABLE order_items ADD CONSTRAINT uq_order_items 
    UNIQUE (order_id, menu_item_id);

ALTER TABLE stock_requests ADD CONSTRAINT chk_stock_requests_quantity 
    CHECK (quantity > 0);
ALTER TABLE stock_requests ADD CONSTRAINT chk_stock_requests_status 
    CHECK (status IN ('pending', 'approved', 'rejected'));
ALTER TABLE stock_requests ADD CONSTRAINT chk_stock_requests_fulfillment 
    CHECK ((fulfilled = TRUE AND approved = TRUE) OR (fulfilled = FALSE));

ALTER TABLE disposed_items ADD CONSTRAINT chk_disposed_items_quantity 
    CHECK (quantity > 0);
ALTER TABLE disposed_items ADD CONSTRAINT chk_disposed_items_reason 
    CHECK (reason IN ('expired', 'damaged', 'other'));

ALTER TABLE inventory_transactions ADD CONSTRAINT chk_inventory_transactions_type 
    CHECK (transaction_type IN ('purchase', 'disposal', 'adjustment', 'usage'));

-- Add unique constraints for items
CREATE UNIQUE INDEX idx_unique_item_name_category ON items (name, category_id) 
WHERE category_id IS NOT NULL;

CREATE UNIQUE INDEX idx_unique_item_name_subcategory ON items (name, subcategory_id) 
WHERE subcategory_id IS NOT NULL;

-- Add unique constraint for subcategories
ALTER TABLE subcategories ADD CONSTRAINT uq_subcategories_name_category 
    UNIQUE (name, category_id);

-- Function to calculate item status
CREATE OR REPLACE FUNCTION calculate_item_status(expiry_date DATE, quantity INTEGER)
RETURNS VARCHAR(20) AS $$
BEGIN
    IF expiry_date < CURRENT_DATE THEN
        RETURN 'expired';
    ELSIF quantity < 10 THEN
        RETURN 'low';
    ELSE
        RETURN 'normal';
    END IF;
END;
$$ LANGUAGE plpgsql;

-- Trigger to update status
CREATE OR REPLACE FUNCTION update_item_status()
RETURNS TRIGGER AS $$
BEGIN
    NEW.status := calculate_item_status(NEW.expiry_date, NEW.quantity);
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER item_status_trigger
BEFORE INSERT OR UPDATE OF expiry_date, quantity ON items
FOR EACH ROW
EXECUTE FUNCTION update_item_status();