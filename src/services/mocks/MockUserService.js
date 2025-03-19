import { PHONE_NUMBER } from "../../constants/auth";
import UserService from "../UserService";

/**
 * Mock implementation of {@link UserService}.
 */
export default class MockUserService extends UserService {
	async signIn(phoneNumber, otpNumber) {
		console.log(phoneNumber, otpNumber);

		localStorage.setItem(PHONE_NUMBER, phoneNumber);
		// for development purpose.
		if (otpNumber === "123456") {
			localStorage.setItem("role", "admin");
			console.log("role: admin")
		}
		return true;
	}

	async signOut() {
    localStorage.removeItem(PHONE_NUMBER);
		localStorage.removeItem("role");
    return true;
	}
}