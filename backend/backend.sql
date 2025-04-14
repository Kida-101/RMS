-- Users Table
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    full_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    role VARCHAR(50) CHECK (role IN ('CHEF', 'WAITER', 'STOREKEEPER', 'SUPERADMIN','CASHIER','KITCHEN_MANAGER','MANAGER','RECEPTION')) NOT NULL,
    password_hash VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    last_login TIMESTAMP
);

-- Third Party Table
CREATE TABLE third_party (
    id SERIAL PRIMARY KEY,
    company_name VARCHAR(255) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
-- Suppliers Table
CREATE TABLE suppliers (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    stock_type VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Supplier Contacts Table
CREATE TABLE supplier_contacts (
    id SERIAL PRIMARY KEY,
    supplier_id INTEGER NOT NULL REFERENCES suppliers(id) ON DELETE CASCADE,
    phone_number VARCHAR(20),
    email VARCHAR(100) UNIQUE,
    address TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Categories Table
CREATE TABLE categories (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) UNIQUE NOT NULL,
    icon VARCHAR(100)
);

-- Menu Items Table
CREATE TABLE menu_items (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    price DECIMAL(10, 2) NOT NULL CHECK (price >= 0),
    category_id INT REFERENCES categories(id) ON DELETE CASCADE,
    description TEXT,
    is_available BOOLEAN DEFAULT FALSE,
    image_url VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table Book Table
CREATE TABLE table_book (
    id SERIAL PRIMARY KEY,
    seats INT NOT NULL CHECK (seats > 0),
    table_number INT NOT NULL UNIQUE,
    is_booked BOOLEAN NOT NULL DEFAULT FALSE
);
-- Orders Table
CREATE TABLE orders (
    id SERIAL PRIMARY KEY,
    table_id INT REFERENCES table_book(id) ON DELETE SET NULL,
    status VARCHAR(20) NOT NULL DEFAULT 'pending' CHECK (status IN ('assigned', 'pending', 'ready', 'served')),
    order_type VARCHAR(20) DEFAULT 'Onsite' CHECK (order_type IN ('Online', 'Onsite', 'Third-Party')),
    served_time TIMESTAMP,
    assigned_time TIMESTAMP,
    special_instructions TEXT,
    started_cooking TIMESTAMP,
    chef_id INT REFERENCES users(id) ON DELETE SET NULL,
    waiter_id INT REFERENCES users(id) ON DELETE SET NULL,
    assigned_by INT REFERENCES users(id) ON DELETE SET NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    third_party_id INT REFERENCES third_party(id),
    CONSTRAINT third_party_rules CHECK (
        (order_type = 'Third-Party' AND third_party_id IS NOT NULL) OR
        (order_type != 'Third-Party' AND third_party_id IS NULL)
    ),
    CONSTRAINT waiter_rules CHECK (
        (order_type = 'Onsite' AND waiter_id IS NOT NULL) OR
        (order_type != 'Onsite' AND waiter_id IS NULL)
    )
);

-- Order Items Table
CREATE TABLE order_items (
    id SERIAL PRIMARY KEY,
    order_id INT NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
    menu_item_id INT NOT NULL REFERENCES menu_items(id) ON DELETE CASCADE,
    quantity INT NOT NULL DEFAULT 1 CHECK (quantity > 0),
    UNIQUE (order_id, menu_item_id)
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
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    order_id INT UNIQUE REFERENCES orders(id),
    status VARCHAR(20) DEFAULT 'Pending' CHECK (status IN ('Pending', 'Confirmed', 'Cancelled'))
);

-- Sales Table
CREATE TABLE sales (
    id SERIAL PRIMARY KEY,
    cashier_id INT REFERENCES users(id) ON DELETE SET NULL,
    total_amount DECIMAL(10, 2) NOT NULL,
    sale_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    order_id INT REFERENCES orders(id) ON DELETE SET NULL,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    is_paid BOOLEAN DEFAULT FALSE NOT NULL,
    payment_method VARCHAR(50),
    discount_amount DECIMAL(10, 2) DEFAULT 0
);

-- Stock Categories Table
CREATE TABLE stock_categories (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Subcategories Table
CREATE TABLE subcategories (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    category_id INTEGER NOT NULL REFERENCES stock_categories(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    UNIQUE (name, category_id)
);

-- Items Table (Inventory)-- Create the items table
CREATE TABLE items (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    category_id INTEGER REFERENCES stock_categories(id),  -- Reference to stock_categories
    subcategory_id INTEGER REFERENCES subcategories(id),  -- Reference to subcategories
    unit VARCHAR(20) NOT NULL,
    expiry_date DATE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    quantity INTEGER NOT NULL CHECK (quantity >= 0),
    received_date DATE DEFAULT CURRENT_DATE,
    status VARCHAR(20),  -- Status is set via triggers
    last_updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    -- Hierarchy constraint: either category or subcategory must be set, not both
    CONSTRAINT valid_hierarchy CHECK (
        (category_id IS NOT NULL AND subcategory_id IS NULL) OR
        (category_id IS NULL AND subcategory_id IS NOT NULL)
    )
);

-- Create the trigger function that updates the status column
CREATE OR REPLACE FUNCTION set_item_status() 
RETURNS TRIGGER AS $$
BEGIN
    -- Set the status based on expiry_date and quantity
    NEW.status := CASE 
        WHEN NEW.expiry_date < CURRENT_DATE THEN 'expired'
        WHEN NEW.quantity < 10 THEN 'low'
        ELSE 'normal'
    END;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger for INSERT (before insert, set the status)
CREATE TRIGGER before_insert_item
BEFORE INSERT ON items
FOR EACH ROW
EXECUTE FUNCTION set_item_status();

-- Trigger for UPDATE (before update, set the status)
CREATE TRIGGER before_update_item
BEFORE UPDATE ON items
FOR EACH ROW
EXECUTE FUNCTION set_item_status();

-- Create a unique partial index on name and category_id
-- Ensures uniqueness of item names for each category
CREATE UNIQUE INDEX unique_item_name_category
    ON items(name, category_id)
    WHERE category_id IS NOT NULL;

-- Create a unique partial index on name and subcategory_id
-- Ensures uniqueness of item names for each subcategory
CREATE UNIQUE INDEX unique_item_name_subcategory
    ON items(name, subcategory_id)
    WHERE subcategory_id IS NOT NULL;


-- Disposed Items Table
CREATE TABLE disposed_items (
    id SERIAL PRIMARY KEY,
    item_id INTEGER NOT NULL REFERENCES items(id),
    quantity INTEGER NOT NULL CHECK (quantity > 0),
    reason TEXT NOT NULL CHECK (reason IN ('expired', 'damaged', 'other')),
    disposed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    disposed_by INTEGER NOT NULL REFERENCES users(id) ON DELETE SET NULL
);
-- Stock Requests Table
CREATE TABLE stock_requests (
    id SERIAL PRIMARY KEY,
    item_id INTEGER NOT NULL REFERENCES items(id),
    quantity INTEGER NOT NULL CHECK (quantity > 0),
    requester_id INTEGER REFERENCES users(id) ON DELETE SET NULL,
    requested_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    approved_by INTEGER REFERENCES users(id) ON DELETE SET NULL,
    approved_at TIMESTAMP WITH TIME ZONE,
    approved BOOLEAN DEFAULT FALSE,
    status VARCHAR(20) CHECK (status IN ('pending', 'approved', 'rejected')) DEFAULT 'pending',
    fulfilled BOOLEAN DEFAULT FALSE,
    fulfilled_at TIMESTAMP,
    notes TEXT,
    CONSTRAINT fulfillment_rules CHECK (
        (fulfilled = TRUE AND approved = TRUE) OR
        (fulfilled = FALSE)
    )
);

-- Selection Options View
CREATE VIEW selection_options AS
SELECT 
    c.id AS category_id,
    c.name AS category_name,
    sc.id AS subcategory_id,
    sc.name AS subcategory_name,
    i.id AS item_id,
    i.name AS item_name,
    i.unit,
    i.expiry_date,
    CASE 
        WHEN i.subcategory_id IS NOT NULL THEN TRUE
        ELSE FALSE
    END AS is_subcategory_item
FROM items i
LEFT JOIN subcategories sc ON i.subcategory_id = sc.id
JOIN stock_categories c ON COALESCE(sc.category_id, i.category_id) = c.id
ORDER BY c.name, COALESCE(sc.name, ''), i.name;

-- Stock Summary View
CREATE VIEW stock_summary AS
SELECT 
    COUNT(*) AS total_items,
    SUM(quantity) AS total_quantity,
    SUM(CASE WHEN status = 'low' THEN 1 ELSE 0 END) AS low_stock_items,
    SUM(CASE WHEN status = 'expired' THEN 1 ELSE 0 END) AS expired_items,
    SUM(CASE WHEN status = 'normal' THEN 1 ELSE 0 END) AS normal_stock_items,
    (SELECT COUNT(*) FROM stock_requests WHERE approved = FALSE) AS pending_requests,
    (SELECT SUM(quantity) FROM disposed_items WHERE disposed_at >= CURRENT_DATE - INTERVAL '30 days') AS monthly_disposals
FROM items;
