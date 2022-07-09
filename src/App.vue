<template>
  <TimerBar class="float-right" v-if="workEntryData != null" :workEntryData="{ workEntryData }" />
</template>

<script>
import TimerBar from './components/TimerBar.vue'
import workEntryService from './services/work-entry-service'

export default {
  name: 'App',
  data: () => ({
    employee: null,
    workEntryData: null
  }),
  components: {
    TimerBar
  },
  methods: {
    async getWorkEntryPage(page = 1) {
      const response = await workEntryService.getWorkEntries(page)
      return response.data
    },
    getCurrentTime(workEntries = []) {
      // find open entry to get current time
      let currentWorkEntry = workEntries.find(workEntry => !workEntry.workEntryOut)
      if (currentWorkEntry) {
        const started = new Date(currentWorkEntry.workEntryIn.date)
        const now = new Date()
        return (now.getTime() - started.getTime()) / 1000
      } else {
        return 0
      }
    },
    // get object with data to initialize the timer bar
    async getWorkEntryData() {
      let workEntriesPage = await this.getWorkEntryPage()
      // assuming that exists at least one work entry and all work entries belong to the same user
      this.employee = workEntriesPage.data[0].employee
      this.isOnline = this.employee.workStatus === "online"
      // assuming that the current open work entry is the first open work entry in the last page
      if (this.isOnline) {
        const lastPageIndex = workEntriesPage.meta.lastPage
        if (lastPageIndex != 1) {
          workEntriesPage = await this.getWorkEntryPage(lastPageIndex)
        }
      }
      return {
        employee: {
          id: this.employee.id,
          workStatus: this.employee.workStatus,
          firstName: this.employee.firstName,
          lastName: this.employee.lastName,
          avatar: "https://images.unsplash.com/photo-1628157588553-5eeea00af15c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=100&q=80"
        },
        startOn: this.getCurrentTime(workEntriesPage.data),
      }
    }
  },
  async mounted() {
    this.workEntryData = await this.getWorkEntryData()
  }
}
</script>

<style>
#app {
  font-family: 'PT Sans', Helvetica, Arial, sans-serif;
  letter-spacing: 1px;
}
</style>
