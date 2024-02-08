import router from "@/router";
import { defineStore } from "pinia";

interface TaskContainer{
    uuid: string
    tasks: Task[]
}

interface Task{
    uuid: string
    type: string
    title: string
    body: any
}

const useContainersStore = defineStore('counters',{
    state: () =>{
        return {
            containers: [] as TaskContainer[]
        }
    },
    getters: {

    },
    actions: {
        async loadContainers() {
            const res = await fetch("http://home.local:9000/data", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem("token")}`
                }
            });

            if (res.status === 200) {
                const resData = await res.json()
                this.containers = resData.containers
                console.log(this.containers)
            }
            else {
                localStorage.removeItem("token")
                localStorage.removeItem("username")
                router.push("/login")
            }
        }
    }
})

export default useContainersStore;