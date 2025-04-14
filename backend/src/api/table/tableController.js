const pool = require("../../../database.js");

exports.getTables = async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM tables ORDER BY table_number"
    );
    res.json(result.rows);
  } catch (err) {
    console.error("Error fetching tables:", err);
    res.status(500).json({ message: "Server error" });
  }
};

exports.bookTables = async (req, res) => {
  const { selectedTables } = req.body;

  if (!Array.isArray(selectedTables) || selectedTables.length === 0) {
    return res.status(400).json({ message: "No tables selected for booking." });
  }

  const client = await pool.connect();
  try {
    await client.query("BEGIN");

    const updatePromises = selectedTables.map((tableNumber) =>
      client.query(
        "UPDATE tables SET is_booked = TRUE WHERE table_number = $1 RETURNING *",
        [tableNumber]
      )
    );

    const results = await Promise.all(updatePromises);
    await client.query("COMMIT");

    res.status(200).json({
      message: "Tables booked successfully!",
      bookedTables: results.map((r) => r.rows[0]),
    });
  } catch (err) {
    await client.query("ROLLBACK");
    console.error("Booking error:", err);
    res.status(500).json({ message: "Booking failed. Please try again." });
  } finally {
    client.release();
  }
};
