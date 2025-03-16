import { PHONE_NUMBER } from "../../constants/auth";
import UserService from "../UserService";

/**
 * Mock implementation of {@link UserService}.
 */
export default class MockUserService extends UserService {
	async signIn(phoneNumber, otpNumber) {
		localStorage.setItem(PHONE_NUMBER, phoneNumber);
		return true;
	}

	async signOut() {
    localStorage.removeItem(PHONE_NUMBER);
    return true;
	}
}