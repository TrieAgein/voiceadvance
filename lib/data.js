import pool from '../../lib/db';

export default async function handler(req, res) {
  const { rows } = await pool.query('SELECT NOW()');
  res.status(200).json(rows);
}
