import "regenerator-runtime/runtime.js";
import { encrypt, compareHash } from "../utils/bcrypt";

describe('Bcrypt service', () => {
    describe('Encrypt', () => {
        it('Should return a string', async () => {
            const pwdTest = '123456789'
            const hash = await encrypt(pwdTest)
            expect(typeof hash).toBe('string')
        })
    })

    describe('Compare hash', () => {
        it('Should compare correctly', async () => {
            const pwdTest = '123456789'
            const hash = await encrypt(pwdTest)
            const isValid = await compareHash(pwdTest, hash)
            expect(isValid).toBeTruthy();
        })
    })
})