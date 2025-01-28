import userMode from "./database/models/user.mode";
import { fakeUserData } from "./database/fixtures";
import { validateNotEmpty, validateMongoDuplicationError, validateStringEquality } from "./utils/test-utils/validators.utils";
import { dbConnect, dbDisconnect } from "./utils/test-utils/dbHandler.utils";


// Write fibonaaci seies
beforeAll(async () => dbConnect());
afterAll(async () => dbDisconnect());

describe('User Model Test Suite', () => {
    test('should validate saving a new student user successfully', async () => {
        const validStudentUser = new userMode({
            local: fakeUserData,
            role: fakeUserData.role,
        });
        const savedStudentUser = await validStudentUser.save();

        validateNotEmpty(savedStudentUser);

        validateStringEquality(savedStudentUser.role, fakeUserData.role);
        validateStringEquality(savedStudentUser.local.email, fakeUserData.email);
        validateStringEquality(
            savedStudentUser.local.username,
            fakeUserData.username
        );
        validateStringEquality(
            savedStudentUser.local.password,
            fakeUserData.password
        );
        validateStringEquality(
            savedStudentUser.local.firstName,
            fakeUserData.firstName
        );
        validateStringEquality(
            savedStudentUser.local.lastName,
            fakeUserData.lastName
        );
    });

    test('should validate MongoError duplicate error with code 11000', async () => {
        expect.assertions(4);
        const validStudentUser = new userMode({
            local: fakeUserData,
            role: fakeUserData.role,
        });

        try {
            await validStudentUser.save();
        } catch (error) {
            const { name, code } = error;
            validateMongoDuplicationError(name, code);
        }
    });
});