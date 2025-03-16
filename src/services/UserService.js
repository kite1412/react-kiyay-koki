  /**
 * @interface
 * 
 * Contract for user service.
 */
export default class UserService {
  /**
   * Sign in to the app.
   * @param {number} phoneNumber - the phone number used to sign in to app.
   * @param {number} otpNumber - otp code for account verification.
   * @returns {boolean} whether the sign in process is success or not.
   */
  async signIn(phoneNumber, otpNumber) {
    throw new Error("Not Implemented");
  }

  /**
   * Sign out of the app.
   * @returns {boolean} whether the sign out process is success or not.
   */
  async signOut() {
    throw new Error("Not Implemented");
  }
}