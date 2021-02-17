class TaskRepository {
  constructor(dao) {
    this.dao = dao
  }

  createTable() {
    const sql = `
      CREATE TABLE IF NOT EXISTS donnee (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        dette TEXT,
        taskId INTEGER)`
    return this.dao.run(sql)
  }

  create(name, dette, taskId) {
    return this.dao.run(
      `INSERT INTO donnee (name, dette, taskId)
        VALUES (?, ?, ?)`,
      [name, dette, taskId])
  }

  update(task) {
    const { id, name, dette, taskId } = task
    return this.dao.run(
      `UPDATE donnee
      SET name = ?,
        dette = ?,
        taskId = ?
      WHERE id = ?`,
      [name, dette, taskId, id]
    )
  }

  delete(id) {
    return this.dao.run(
      `DELETE FROM donnee WHERE id = ?`,
      [id]
    )
  }

   getById(id) {
    return this.dao.get(
      `SELECT * FROM donnee WHERE id = ?`,
      [id])
  }

  getAll() {
    return this.dao.all(`SELECT * FROM donnee`)
  }
}

module.exports = TaskRepository;