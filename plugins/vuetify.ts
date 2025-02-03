// Import this after installing `@mdi/font` package
import '@mdi/font/css/materialdesignicons.css'

import 'vuetify/styles'
import { createVuetify } from 'vuetify'

const myCustomTheme = {
  dark: false, 
  colors: {
    primary: '#2323C8',    // Purple
    secondary: '#03dac6',  // Teal
    accent: '#ff4081',     // Pink
    success: '#4caf50',    // Green
    warning: '#fb8c00',    // Orange
    error: '#f44336',      // Red
    info: '#2196f3',       // Blue
  },
}

export default defineNuxtPlugin((app) => {
  const vuetify = createVuetify({
    theme: {
      defaultTheme: 'myCustomTheme', // Matches the key inside `themes`
      themes: {
        myCustomTheme, // Correctly assigned
      },
    },
  })
  app.vueApp.use(vuetify)
})
