import { describe, it, expect } from "vitest";

describe("Testes de configuração", () => {
  it("deve reconhecer uma configuração válida", () => {
    const config = {
      apiKey: "teste",
      authDomain: "teste.firebaseapp.com",
      projectId: "teste",
      appId: "123"
    };

    expect(config.apiKey).toBeTruthy();
    expect(config.authDomain).toContain("firebaseapp.com");
    expect(config.projectId).toBeTruthy();
    expect(config.appId).toBeTruthy();
  });
});