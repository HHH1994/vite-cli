import {defineStore} from 'pinia';

export const useUserStore: StoreDefinition = defineStore('user', {
    state: () => ({
        userName: 'hws',
        userId: 1
    }),
    actions: {
        changeName() {
            this.userName = 'change hws'
        }
    }
})