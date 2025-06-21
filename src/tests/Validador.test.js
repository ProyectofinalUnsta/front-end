import { Validator } from "../utils/Validator.js";


import {  describe, expect, it } from "vitest";

describe('password validator', () => {


it('verificar que al introducir una contraseña demasiado corta nos devuelve un mensaje de error', () => {
   let response = Validator.password('hola1')
   expect(response.error).to.be.true
    expect(response.message).to.be.string
    expect(response.message).to.be.equal('La contraseña es demasiado corta')
})

it('verificar que al introducir una contraseña sin numeros nos devuelve un mensaje de error', () => {
   let response = Validator.password('hola')
   expect(response.error).to.be.true
    expect(response.message).to.be.string
    expect(response.message).to.be.equal('La contraseña debe contener al menos 1 numero')
})

it('verificar que al introducir una contraseña sin caracter mayuscula devuelve un mensaje de error', () => {
   let response = Validator.password('hola1423')
   expect(response.error).to.be.true
    expect(response.message).to.be.string
    expect(response.message).to.be.equal('La contraseña debe contener al menos 1 caracter mayuscula')
})

it('verificar que al introducir una contraseña sin caracteres minusculas devuelve un mensaje de error', () => {
   let response = Validator.password('HOLA1423')
   expect(response.error).to.be.true
    expect(response.message).to.be.string
    expect(response.message).to.be.equal('La contraseña debe contener al menos 1 caracter minuscula')
})

it('verificar que al introducir una contraseña sin caracter especial devuelve un mensaje de error', () => {
   let response = Validator.password('Hola1423')
   expect(response.error).to.be.true
    expect(response.message).to.be.string
    expect(response.message).to.be.equal('La contraseña debe contener al menos 1 caracteres especial [!"#%&-_+*¡¿]')
})

it('verificar que al introducir una contraseña valida nos devuelva un ok', () => {
   let response = Validator.password('Hola1423_')
   expect(response.error).to.be.false
    expect(response.message).to.be.string
    expect(response.message).to.be.equal('Todo Ok!')
})


})