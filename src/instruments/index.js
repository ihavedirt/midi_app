import {lazy} from 'react';

export const INSTRUMENTS = {
    PIANO: {
        name: "Piano",
        component: lazy(() => import('./Piano/Piano')),
        audioConfig: {

        }
    },/*
    GRAND_PIANO: {
        name: "Grand Piano",
        component: lazy(() => import('./GrandPiano/GrandPiano')),
        audioConfig: {

        }
    },
    SYNTH: {
        name: "Synth",
        component: lazy(() => import('./Synth/Synth')),
        audioConfig: {

        }
    },
    ELECTRIC_GUITAR: {
        name: "Electric Guitar",
        component: lazy(() => import('./ElectricGuitar/ElectricGuitar')),
        audioConfig: {

        }
    },
    BASS: {
        name: "Bass",
        component: lazy(() => import('./Bass/Bass')),
        audioConfig: {

        }
    },
    VIOLIN: {
        name: "Violin",
        component: lazy(() => import('./Violin/Violin')),
        audioConfig: {

        }
    },
    TRUMPET: {
        name: "Trumpet",
        component: lazy(() => import('./Trumpet/Trumpet')),
        audioConfig: {

        }
    }*/
};