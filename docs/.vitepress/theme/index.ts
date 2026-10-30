import DefaultTheme from "vitepress/theme";
import type { Theme } from "vitepress";
import "./custom.css";
import StepSimulator from "../components/StepSimulator.vue";
import PublishSimulator from "../components/backend/PublishSimulator.vue";
import RequestSimulator from "../components/backend/RequestSimulator.vue";
import DtoPlayground from "../components/backend/DtoPlayground.vue";
import MiddlewareOrder from "../components/backend/MiddlewareOrder.vue";
import SchemaExplorer from "../components/backend/SchemaExplorer.vue";
import MigrationLab from "../components/backend/MigrationLab.vue";
import TransactionSimulator from "../components/backend/TransactionSimulator.vue";
import AccessMatrix from "../components/backend/AccessMatrix.vue";
import SessionSimulator from "../components/backend/SessionSimulator.vue";
import OAuthSimulator from "../components/backend/OAuthSimulator.vue";
import SecuritySimulator from "../components/backend/SecuritySimulator.vue";

/** Globaalsed komponendid: markdownis saab kasutada `<PublishSimulator />` ilma impordita. */
export default {
    extends: DefaultTheme,
    enhanceApp({ app }) {
        app.component("StepSimulator", StepSimulator);
        app.component("PublishSimulator", PublishSimulator);
        app.component("RequestSimulator", RequestSimulator);
        app.component("DtoPlayground", DtoPlayground);
        app.component("MiddlewareOrder", MiddlewareOrder);
        app.component("SchemaExplorer", SchemaExplorer);
        app.component("MigrationLab", MigrationLab);
        app.component("TransactionSimulator", TransactionSimulator);
        app.component("AccessMatrix", AccessMatrix);
        app.component("SessionSimulator", SessionSimulator);
        app.component("OAuthSimulator", OAuthSimulator);
        app.component("SecuritySimulator", SecuritySimulator);
    },
} satisfies Theme;
