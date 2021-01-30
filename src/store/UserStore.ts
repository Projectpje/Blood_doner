import { action, observable } from 'mobx';
import { persist } from 'mobx-persist';

class UserStore {
    @persist @observable userName;
    @persist @observable emailId;
    @persist @observable isUserLoggedIn = false;
    @persist @observable userId;
    @persist @observable userType;
    @persist @observable bloodGroup;
    @persist @observable city;
    @persist @observable emailVerified;
    @persist @observable onboardingStep;
    @persist @observable phoneNumber;
    @persist @observable gender;

    setUser(data) {
        this.userName = data.name;
        this.emailId = data.emailId;
        this.userId = data.uid;
        this.isUserLoggedIn = true;
        this.userType = data.userType;
        this.bloodGroup = data.bloodGroup;
        this.city = data.city;
        this.emailVerified = data.emailVerified;
        this.gender = data.gender;
        this.phoneNumber = data.phoneNumber;
        this.onboardingStep = data.onboardingStep;

        console.log("set User", data, 
            this.userName,
            this.emailId
        )
    }
}

export default UserStore;