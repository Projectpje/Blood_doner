/** @format */

import { action, observable } from "mobx";
import { persist } from "mobx-persist";

class UserStore {
  @persist @observable userName;
  @persist @observable emailId;
  @persist @observable isUserLoggedIn = false;
  @persist @observable userId;
  @persist @observable userType;
  @persist @observable bloodGroup;
  @persist @observable city;
  @persist @observable country;
  @persist @observable emailVerified;
  @persist @observable onboardingStep;
  @persist @observable phoneNumber;
  @persist @observable gender;
  @persist @observable firstTimeInstall = true;
  @persist @observable address = "";

  setUser(data) {
    this.userName = data.name;
    this.emailId = data.emailId;
    this.userId = data.uid;
    this.isUserLoggedIn = true;
    this.userType = data.userType;
    this.bloodGroup = data.bloodGroup;
    this.city = data.city;
    this.country = data.country;
    this.emailVerified = data.emailVerified;
    this.gender = data.gender;
    this.phoneNumber = data.phoneNumber;
    this.onboardingStep = data.onboardingStep;
    this.address = data?.completeAddress || data?.city;
  }

  clearData() {
    this.userName = null;
    this.emailId = null;
    this.userId = null;
    this.isUserLoggedIn = false;
    this.userType = null;
    this.bloodGroup = null;
    this.city = null;
    this.country = null;
    this.emailVerified = null;
    this.gender = null;
    this.phoneNumber = null;
    this.onboardingStep = null;
  }
}

export default UserStore;
