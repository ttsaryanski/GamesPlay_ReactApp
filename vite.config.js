import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

// https://vite.dev/config/
export default defineConfig({
    plugins: [
        react(),
        VitePWA({
            registerType: "autoUpdate",
            manifest: {
                name: "GamesPlay App",
                short_name: "GamesPlay",
                start_url: "/",
                display: "standalone",
                background_color: "#ffffff",
                theme_color: "#2c3e50",
            },
        }),
    ],
    base: "/",
    server: {
        historyApiFallback: true,
        //port: 3333,
    },
});
