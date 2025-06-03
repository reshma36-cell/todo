// Import Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getFirestore, collection, addDoc, onSnapshot, deleteDoc, doc, updateDoc } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

// 🔥 Replace this with your own Firebase config
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT_ID.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const taskInput = document.getElementById("task-input");
const addBtn = document.getElementById("add-task");
const taskList = document.getElementById("task-list");

addBtn.addEventListener("click", async () => {
  const text = taskInput.value.trim();
  if (text) {
    await addDoc(collection(db, "tasks"), { text, completed: false });
    taskInput.value = "";
  }
});

// Real-time task rendering
onSnapshot(collection(db, "tasks"), (snapshot) => {
  taskList.innerHTML = "";
  snapshot.forEach((docSnap) => {
    const task = docSnap.data();
    const li = document.createElement("li");
    li.className = task.completed ? "completed" : "";

    li.innerHTML = `
      <span style="flex:1; cursor:pointer;">${task.text}</span>
      <button>Delete</button>
    `;
    li.querySelector("span").addEventListener("click", async () => {
  await updateDoc(doc(db, "tasks", docSnap.id), {
    completed: !task.completed
  });
});


    li.querySelector("span").addEventListener("click", async () => {
      await updateDoc(doc(db, "tasks", docSnap.id), {
        completed: !task.completed
      });
    });

    li.querySelector("button").addEventListener("click", async () => {
      await deleteDoc(doc(db, "tasks", docSnap.id));
    });

    taskList.appendChild(li);
  });
});
