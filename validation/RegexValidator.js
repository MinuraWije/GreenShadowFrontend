export class RegexValidator {
    constructor() {
        this.nameRegex = /^[A-Za-z\s]+$/;
        //this.typeRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        this.typeRegex = /^[A-Za-z\s]+$/;
        this.statusRegex = /^[A-Za-z\s_]+$/;           // /^[A-Za-z\s]+$/

        this.vehicleCodeRegex = /^V\d{3}$/;
        this.licensePlateNumRegex = /^[A-Za-z0-9\s]+$/;
        this.categoryRegex = /^[A-Za-z0-9\s]+$/;
        this.fuelTypeRegex = /^[A-Za-z0-9\s]+$/;

        this.roleRegex = /^[A-Za-z0-9\s]+$/;
        this.designationRegex = /^[A-Za-z0-9\s]+$/;
        this.genderRegex = /^[A-Za-z0-9\s]+$/;
        this.joinedDateRegex = /^(0[1-9]|1[0-2])\/(0[1-9]|[12]\d|3[01])\/\d{4}$/;
        this.emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        this.dobRegex = /^(0[1-9]|1[0-2])\/(0[1-9]|[12]\d|3[01])\/\d{4}$/;
        this.addressRegex = /^[A-Za-z0-9\s]+$/;
        this.contactNumberRegex = /^[A-Za-z0-9\s]+$/;
    }
    //Equipment validation methods
    validateName(name) {
        return this.nameRegex.test(name);
    }

    validateType(type){
        return this.typeRegex.test(type);
    }
    validateStatus(status) {
        return this.statusRegex.test(status);
    }

    validateEquipment(name, type, status) {
        return {
            isNameValid: this.validateName(name),
            isTypeValid: this.validateType(type),
            isStatusValid: this.validateStatus(status),
            isValid: this.validateName(name) && this.validateType(type) && this.validateStatus(status)
        };
    }
    // Vehicle validation methods
    /*validateVehicleCode(vehicleCode) {
        return this.vehicleCodeRegex.test(vehicleCode);
    }*/

    validateLicensePlateNum(licensePlateNum) {
        return this.licensePlateNumRegex.test(licensePlateNum);
    }

    validateCategory(category) {
        return this.categoryRegex.test(category);
    }

    validateFuelType(fuelType) {
        return this.fuelTypeRegex.test(fuelType);
    }

    /*validateStatus(status) {
        return this.statusRegex.test(status);
    }*/

    validateVehicle(licensePlateNum, category, fuelType, status) {
        return {
            /*isVehicleCodeValid: this.validateVehicleCode(vehicleCode),*/
            isLicensePlateNumValid: this.validateLicensePlateNum(licensePlateNum),
            isCategoryValid: this.validateCategory(category),
            isFuelTypeValid: this.validateFuelType(fuelType),
            isStatusValid: this.validateStatus(status),
            isValid: /*this.validateVehicleCode(vehicleCode) &&*/ this.validateLicensePlateNum(licensePlateNum) && this.validateCategory(category) && this.validateFuelType(fuelType) && this.validateStatus(status)
        };
    }

    //Staff validation
    validateRole(role) {
        return this.roleRegex.test(role);
    }

    validateDesignation(designation) {
        return this.designationRegex.test(designation);
    }

    validateGender(gender) {
        return this.genderRegex.test(gender);
    }

    validateJoinedDate(joinedDate) {
        return this.joinedDateRegex.test(joinedDate);
    }

    validateEmail(email) {
        return this.emailRegex.test(email);
    }

    validateDob(dob) {
        return this.dobRegex.test(dob);
    }

    validateAddress(address) {
        return this.addressRegex.test(address);
    }

    validateContactNumber(contactNum) {
        return this.contactNumberRegex.test(contactNum);
    }

    validateStaff(staffId ,name , role, designation, gender, joinedDate, email, dob, address, contactNum) {
        return {
            /*isVehicleCodeValid: this.validateVehicleCode(vehicleCode),*/
            isNameValid: this.validateName(name),
            isRoleValid: this.validateRole(role),
            isDesignationValid: this.validateDesignation(designation),
            isGenderValid: this.validateGender(gender),
            isJoinedDateValid: this.validateJoinedDate(joinedDate),
            isEmailValid: this.validateEmail(email),
            isDobValid: this.validateDob(dob),
            isAddressValid: this.validateAddress(address),
            isContactNumberValid: this.validateContactNumber(contactNum),
            isValid: /*this.validateVehicleCode(vehicleCode) &&*/ this.validateName(name) && this.validateRole(role) &&
                this.validateDesignation(designation) && this.validateGender(gender) && this.validateJoinedDate(joinedDate)
                && this.validateEmail(email) && this.validateDob(dob) && this.validateAddress(address) && this.validateContactNumber(contactNum)
        };
    }

}

