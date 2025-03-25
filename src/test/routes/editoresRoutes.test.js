import app from "../../app.js"
import { beforeEach, afterEach, describe, it, expect } from "@jest/globals"

import request from "supertest"

let server

beforeEach(() => {
  const port = 3000
  server = app.listen(port)
})

afterEach(() => {
  server.close()
})

describe("GET em /editores", () => {
  it("Deve retornar uma lista de editores", async () => {
    const resposta = await request(app)
      .get("/editoras")
      .set("Accept", "application/json")
      .expect("content-type", /json/)
      .expect(200)

    expect(resposta.body[0].email).toEqual("e@e.com")
  })
})

let idResposta

describe("POST em /editoras", () => {
  it("Deve adicinar uma nova editora", async () => {
    const resposta = await request(app)
      .post("/editoras")
      .send({
        nome: "CDC",
        cidade: "Sao Paulo",
        email: "s@s.com",
      })
      .expect(201)
    idResposta = resposta.body.content.id
  })
})

describe("Delete em /editoras/id", () => {
  it("Deletar o recurso adicionado", async () => {
    await request(app).delete(`/editoras/${idResposta}`).expect(200)
  })
})

describe("GET em /editoras/id", () => {
  it("Deve retornar o recurso selecionado", async () => {
    await request(app).get(`/editoras/${idResposta}`).expect(200)
  })
})