import authorizedApiService from "./authorized-api-service"

const workEntryPath = "/schedule/v1/work-entries"

const workEntryService = {
    getWorkEntries(page = 1) {
        const url = workEntryPath;
        const options = {
            params: {
                page: page
            }
        }
        return authorizedApiService.get(url, options)
    },
    clockIn(workEntry) {
        const url = workEntryPath + "/clock-in"
        return authorizedApiService.post(url, workEntry)
    },
    clockOut(workEntry) {
        const url = workEntryPath + "/clock-out"
        return authorizedApiService.post(url, workEntry)
    }
}

export default workEntryService