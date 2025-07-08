let onMIDIMessageCallback = null;

export function setMIDIMessageHandler(callback) {
  onMIDIMessageCallback = callback;
}

export async function setupMIDI() {
    if (!navigator.requestMIDIAccess) {
        // navigator.requestMIDIAccess returns from a promise a [MIDIAccess] object
        // This is to check if the browser will support MIDIAccess
        console.warn("Web MIDI API not supported in this browser.");
        return;
    }

    const midiAccess = await navigator.requestMIDIAccess();

    midiAccess.onstatechange = (event) => {
        // Print information about the MIDI controller connection
        console.log(event.port.name, event.port.manufacturer, event.port.state);
    };

    for (let input of midiAccess.inputs.values()) {
        input.onmidimessage = (msg) => {
            if (onMIDIMessageCallback) {
                onMIDIMessageCallback(msg);
            }
        }
    }
}