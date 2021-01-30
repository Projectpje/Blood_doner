import { create, persist } from 'mobx-persist';
import { AsyncStorage } from 'react-native';
import UserStore from './UserStore';


const hydrate = create({
    storage: AsyncStorage,
    jsonify: true
});

class RootStore {
    userStore = new UserStore();

    constructor() {
        console.log("hydrating store");

        AsyncStorage.setItem("test", "test").then(() => {
            AsyncStorage.getItem("test").then(value => {
                console.log("value is", value);
            })
        })

        hydrate("userStore", this.userStore).then(result => {
            console.log("store hydrated", result);
        }).catch(error => {
            console.log("error is", error);
        });
    }
}


export const rootStore = new RootStore();