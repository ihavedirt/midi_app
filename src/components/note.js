'use client'

export default function noteComponent({ note }) {
    const animationDuration = 1;

    return (
        <div 
            style={{
                position: 'absolute',
                top: 0,
                left: `${note.midi * 5}px`,
                width: '20px',
                height: `${note.duration * 200}px`,
                backgroundColor: 'red',
            }} 
        />
    );
}
