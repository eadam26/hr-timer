<template>
    <div class="relative inline-block">
        <!-- framed avatar -->
        <img class="h-8 w-8 rounded-full" v-bind:src="image" alt="" />
        <!-- status indicator -->
        <span class="w-3 h-3 rounded-full absolute bottom-0.5 right-0"
            v-bind:class="{ 'bg-teal': online, 'bg-grey-light': !online }"></span>
    </div>
</template>

<script>
export default {
    name: 'EmployeeAvatar',
    props: {
        image: {
            type: String,
            default: ""
        },
        online: {
            type: Boolean,
            default: false
        }
    }
}
</script>