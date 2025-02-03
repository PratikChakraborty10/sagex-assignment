<template>
    <v-app class="h-screen w-screen d-flex flex-column">
        <AppBar />  
        <v-main class="h-100 w-100 pt-16">
            <slot />
        </v-main>
    </v-app>
</template>
