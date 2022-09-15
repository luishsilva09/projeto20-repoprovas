import { faker} from '@faker-js/faker'
export async function newUserData(){
    const password = faker.internet.password(8)
    const userData = {
            email:faker.internet.email(),
            password:password,
            repeatPassword: password
        }
    return userData
}
