<template>
    <Disclosure as="nav" class="bg-grey-xlight rounded-full max-w-fit px-6">
        <div class="mx-auto">
            <div class="flex items-center justify-arround h-14 gap-x-6">
                <!-- timer display -->
                <div class="text-grey-xdark">{{ hasWorked }}</div>
                <!-- action buttons -->
                <button v-if="!isOnline" class="bg-teal text-grey-xlight px-8 py-1 rounded-full"
                    @click="clockIn()">Entrar</button>
                <button v-if="isOnline" class="bg-grey text-grey-xlight px-8 py-1 rounded-full">Pausar</button>
                <button v-if="isOnline" class="bg-salmon text-grey-xlight px-8 py-1 rounded-full"
                    @click="clockOut()">Salir</button>
                <!-- employee dropdowns -->
                <div class="absolute flex items-center relative">
                    <Menu as="div" class="relative border-l-2 border-grey-light pl-6">
                        <div>
                            <!-- main employee dropdown button -->
                            <MenuButton class="flex items-center focus:outline-none">
                                <EmployeeAvatar v-bind:online="isOnline"
                                    v-bind:image="workEntryData.workEntryData.employee.avatar" />
                                <span class="ml-6 font-bold text-grey-xdark">
                                    {{ workEntryData.workEntryData.employee.firstName }}
                                    {{ workEntryData.workEntryData.employee.lastName }}
                                </span>
                                <ChevronDownIcon class="text-xs text-grey-xdark h-3 w-3 ml-2" />
                            </MenuButton>
                        </div>
                        <!-- main employee dropdown items -->
                        <transition>
                            <MenuItems
                                class="absolute right-0 mt-2 w-60 rounded-md shadow-lg py-1 bg-white text-center">
                                <MenuItem v-for="(item, index) in menuItems" :key="item.name" v-slot="{ active }">
                                <div class="border-grey-xlight" :class="{ 'border-b-2': index < menuItems.length - 1 }">
                                    <!-- secondary employee dropdown -->
                                    <a href="#"
                                        :class="[active ? 'bg-gray-100' : '', 'block px-4 py-3 text-sm relative']">
                                        <ChevronLeftIcon v-if="item.children"
                                            class="text-xs text-grey-xdark h-3 w-3 ml-2 absolute left-1 top-5" />
                                        <span>{{ item.name }}</span>
                                        <!-- secondary employee dropdown items -->
                                        <ul class="origin-top-right absolute top-0 mt-2 w-56 rounded-md shadow-lg bg-white w-60 dropdown-submenu"
                                            v-if="item.children">
                                            <li class="border-grey-xlight"
                                                v-for="( child, childIndex ) in item.children" :key="child.code"
                                                :class="{ 'bg-teal-light': childIndex % 2 !== 0, 'border-b-2': childIndex < item.children.length - 1 }">
                                                <a href="#" class="flex justify-between px-4 py-3 text-sm">
                                                    <div
                                                        class="h-8 w-8 rounded-full bg-grey-xlight text-grey-xdark inline-block ring-1 ring-grey py-1">
                                                        {{ child.code }}
                                                    </div>
                                                    <div>
                                                        <div>
                                                            <span class="font-bold text-grey-xdark">
                                                                {{ child.name }}
                                                            </span>
                                                            <span class="text-grey-xdark ml-3">
                                                                {{ workEntryData.workEntryData.employee.firstName }}
                                                                {{ workEntryData.workEntryData.employee.lastName }}
                                                            </span>
                                                        </div>
                                                        <div class="text-grey-light text-xs text-left">
                                                            Hoy llevas 00:00:00
                                                        </div>
                                                    </div>

                                                </a>
                                            </li>
                                        </ul>
                                    </a>
                                </div>
                                </MenuItem>
                            </MenuItems>
                        </transition>
                    </Menu>
                </div>
            </div>
        </div>
    </Disclosure>
</template>

<script>
import { Menu, MenuButton, MenuItems, MenuItem, Disclosure } from '@headlessui/vue'
import { ChevronLeftIcon, ChevronDownIcon } from '@heroicons/vue/outline'
import formatUtils from '../utils/format-utils'
import workEntryService from '../services/work-entry-service'
import EmployeeAvatar from './EmployeeAvatar.vue'

export default {
    name: 'TimerBar',
    components: {
        Menu,
        MenuButton,
        MenuItems,
        MenuItem,
        Disclosure,
        ChevronLeftIcon,
        ChevronDownIcon,
        EmployeeAvatar
    },
    data: () => ({
        hasWorked: "",
        isOnline: false,
        currentTime: 0,
        clock: -1,
        menuItems: [
            {
                name: "Mis cuentas",
                children: [{ name: "Sesame 1", code: "S1" }, { name: "Sesame 2", code: "S2" }]
            },
            {
                name: "Vista empleado"
            },
            {
                name: "Mi perfil"
            },
            {
                name: "Cerrar sesión"
            },
        ],
    }),
    props: {
        workEntryData: {
            type: Object,
            default: () => ({
                employee: {
                    id: "",
                    workStatus: "offline",
                    firstName: "",
                    lastName: "",
                    avatar: ""
                },
                startOn: 0,
            })
        }
    },
    methods: {
        clockIn() {
            const workEntryIn = {
                "employeeId": this.workEntryData.workEntryData.employee.id,
                "workEntryIn": {
                    "coordinates": {
                        "latitude": null,
                        "longitude": null
                    }
                }
            }
            workEntryService.clockIn(workEntryIn).then(() => {
                this.currentTime = 0
                formatUtils.formatTime(this.currentTime)
                this.startTimer()
            })
        },
        clockOut() {
            const workEntryOut = {
                "employeeId": this.workEntryData.workEntryData.employee.id,
                "workEntryOut": {
                    "coordinates": {
                        "latitude": null,
                        "longitude": null
                    }
                }
            }
            workEntryService.clockOut(workEntryOut).then(() => {
                this.stopTimer()
            })
        },
        startTimer() {
            this.isOnline = true
            this.clock = setInterval(() => {
                this.currentTime++
                this.hasWorked = formatUtils.formatTime(this.currentTime)
            }, 1000)
        },
        stopTimer() {
            clearInterval(this.clock)
            this.isOnline = false
        },
        isStatusOnline(status) {
            const statusCheck = {
                online: true,
                offline: false,
                paused: false
            }
            return (status in statusCheck) && statusCheck[status]
        }
    },
    mounted() {
        // to increment
        this.currentTime = this.workEntryData.workEntryData.startOn
        // to display
        this.hasWorked = formatUtils.formatTime(this.currentTime)

        const workStatus = this.workEntryData.workEntryData.employee.workStatus
        this.isOnline = this.isStatusOnline(workStatus)
        if (this.isOnline) {
            this.startTimer()
        }
    }
}
</script>

<style scoped>
/* @headlessui/vue does not support multilevel menu */
.dropdown-submenu {
    transform: translatex(0) scale(0)
}

a:hover>.dropdown-submenu {
    transform: translatex(-108%) scale(1)
}
</style>