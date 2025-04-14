const db = require('../db'); // Your PostgreSQL client

const createMenuItem = async (req, res) => {
  const { name, price, category_id, description, image_url } = req.body;
  
  if (!name || !price || !category_id) {
    return res.status(400).json({ error: 'Missing required fields: name, price, category_id' });
  }

  try {
    // Verify category exists
    const categoryCheck = await db.query('SELECT id FROM categories WHERE id = $1', [category_id]);
    if (categoryCheck.rows.length === 0) {
      return res.status(400).json({ error: 'Invalid category ID' });
    }

    // Create menu item
    const result = await db.query(
      `INSERT INTO menu_items 
        (name, price, category_id, description, image_url) 
       VALUES ($1, $2, $3, $4, $5) 
       RETURNING *`,
      [name, price, category_id, description, image_url]
    );
    
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const updateMenuItem = async (req, res) => {
  const { id } = req.params;
  const updates = req.body;

  try {
    // Check item exists
    const itemCheck = await db.query('SELECT * FROM menu_items WHERE id = $1', [id]);
    if (itemCheck.rows.length === 0) {
      return res.status(404).json({ error: 'Menu item not found' });
    }

    // Validate category if provided
    if (updates.category_id) {
      const categoryCheck = await db.query('SELECT id FROM categories WHERE id = $1', [updates.category_id]);
      if (categoryCheck.rows.length === 0) {
        return res.status(400).json({ error: 'Invalid category ID' });
      }
    }

    // Build update query
    const existingItem = itemCheck.rows[0];
    const mergedItem = { ...existingItem, ...updates };

    const result = await db.query(
      `UPDATE menu_items 
       SET name = $1, price = $2, category_id = $3, description = $4, 
           image_url = $5, is_available = $6, updated_at = CURRENT_TIMESTAMP
       WHERE id = $7
       RETURNING *`,
      [
        mergedItem.name,
        mergedItem.price,
        mergedItem.category_id,
        mergedItem.description,
        mergedItem.image_url,
        mergedItem.is_available,
        id
      ]
    );

    res.json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const deleteMenuItem = async (req, res) => {
  const { id } = req.params;

  try {
    // Check existence
    const result = await db.query('DELETE FROM menu_items WHERE id = $1 RETURNING *', [id]);
    if (result.rowCount === 0) {
      return res.status(404).json({ error: 'Menu item not found' });
    }
    res.status(204).end();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const getCategories = async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM categories ORDER BY name');
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = {
  createMenuItem,
  updateMenuItem,
  deleteMenuItem,
  getCategories
};