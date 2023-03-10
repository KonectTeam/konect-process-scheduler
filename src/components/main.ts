import { GenericSketchComponentClass, KonectPlugin } from "konect-api-types-ts";

import { Component } from 'vue';

const popups = new Map<GenericSketchComponentClass, Component>();

const plugin: KonectPlugin = {
    components: [
    ],

    factories: [
    ],

    popup: popups,

    pluginInformation: {
        description: 'Components that simulate some process scheduling algorithms',
        name: 'Process Scheduler'
    }
};

export { plugin };