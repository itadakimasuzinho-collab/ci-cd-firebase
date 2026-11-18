import "./style.css";

import { auth, db } from "./firebase.js";

import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword
} from "firebase/auth";

import {
  doc,
  setDoc
} from "firebase/firestore";

document.querySelector("#app").innerHTML = `
  <h1>Sistema CI/CD com Firebase</h1>

  <input id="email" type="email" placeholder="E-mail">

  <input id="password" type="password" placeholder="Senha">

  <button id="register">Cadastrar</button>

  <button id="login">Entrar</button>

  <p id="message"></p>
`;

const email = document.querySelector("#email");
const password = document.querySelector("#password");
const message = document.querySelector("#message");

document.querySelector("#register").addEventListener("click", async () => {
  try {
    const result = await createUserWithEmailAndPassword(
      auth,
      email.value,
      password.value
    );

    await setDoc(doc(db, "users", result.user.uid), {
      email: result.user.email,
      createdAt: new Date().toISOString()
    });

    message.textContent = "Cadastro realizado com sucesso!";
  } catch (error) {
    message.textContent = "Erro: " + error.message;
  }
});

document.querySelector("#login").addEventListener("click", async () => {
  try {
    await signInWithEmailAndPassword(
      auth,
      email.value,
      password.value
    );

    message.textContent = "Login realizado com sucesso!";
  } catch (error) {
    message.textContent = "Erro: " + error.message;
  }
});