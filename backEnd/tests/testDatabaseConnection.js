// path/to/testRealtimeDatabaseFile.js
import { ref, set, get } from "firebase/database";
import { db } from "../../frontEnd/src/utils/firebase";


export async function testRealtimeDatabase() {
  try {
    // Writing test data
    await set(ref(db, "testConnection/"), {
      message: "Hello, Firebase!",
    });

    // Reading test data
    const snapshot = await get(ref(db, "testConnection/"));
    if (snapshot.exists()) {
      console.log("Data from Firebase:", snapshot.val());
    } else {
      console.log("No data available");
    }
  } catch (error) {
    console.error("Error testing Firebase Realtime Database:", error);
  }
}
