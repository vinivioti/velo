import { db } from './playwright/support/database/database.ts';
async function test() {
  try {
    const res = await db.selectFrom('orders').select('order_number').execute();
    console.log("Connected! Orders:", res.length);
  } catch (err) {
    console.error("Query Error:", err.message);
  }
}
test();
