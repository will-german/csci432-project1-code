"use strict";

export default class FormValidator {

    /**
     * @param {string} str
     * @returns {boolean}
     */
    isEmpty(str) {
        return (!str);
    }

    /**
     * @param {string} str
     * @returns {boolean}
     */
    isEmail(str) {
        const regex = /[-A-Za-z0-9!#$%&'*+\/=?^_`{|}~]+(?:\.[-A-Za-z0-9!#$%&'*+\/=?^_`{|}~]+)*@(?:[A-Za-z0-9](?:[-A-Za-z0-9]*[A-Za-z0-9])?\.)+[A-Za-z0-9](?:[-A-Za-z0-9]*[A-Za-z0-9])?/;

        return regex.test(str);
    }

    /**
     * Test a user's password to be 8+ characters long, contain at least 1 digit, 1 uppercase letter, 1 lowercase letter, and 1 special character.
     * @param {string} str 
     * @returns {boolean}
     */
    isPassword(str) {
        const regex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;

        return regex.test(str);
    }

    /**
     * @param {*} str1 
     * @param {*} str2 
     * @returns {boolean}
     */
    isContains(str1, str2) {
        return str1.includes(str2);
    }

    /**
     * @param {string} str1
     * @param {string} str2
     * @returns {boolean}
     */
    isMatch(str1, str2) {
        return str1 === str2;
    }

}