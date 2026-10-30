import DefaultTheme from "vitepress/theme";
import type { Theme } from "vitepress";
import "./custom.css";
import StepSimulator from "../components/StepSimulator.vue";
import PublishSimulator from "../components/backend/PublishSimulator.vue";
import RequestSimulator from "../components/backend/RequestSimulator.vue";
import DtoPlayground from "../components/backend/DtoPlayground.vue";
import MiddlewareOrder from "../components/backend/MiddlewareOrder.vue";

/** Globaalsed komponendid: markdownis saab kasutada `<PublishSimulator />` ilma impordita. */
export default {
    extends: DefaultTheme,
    enhanceApp({ app }) {
        app.component("StepSimulator", StepSimulator);
        app.component("PublishSimulator", PublishSimulator);
        app.component("RequestSimulator", RequestSimulator);
        app.component("DtoPlayground", DtoPlayground);
        app.component("MiddlewareOrder", MiddlewareOrder);
    },
} satisfies Theme;
