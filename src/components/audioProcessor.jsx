import { useEffect, useRef } from "react";
import useAudioStore from "@/store/audioStore";
import { Button } from "@/components/ui/button";

const AudioProcessor = () => {


    const {
        audioFile,
        audioBuffer,
        setAudioBuffer,
        isPlaying,
        setIsPlaying,
        effects,
        bpm,
        setExportHandler
    } = useAudioStore();

    const audioCtxRef = useRef(null);
    const sourceRef = useRef(null);
    // Set up export handler when component mounts or when audio/effects change
    useEffect(() => {
        if (audioBuffer && audioCtxRef.current) {
            setExportHandler( exportAudio);
        } else {
            setExportHandler(null);
        }
    }, [audioBuffer, effects, setExportHandler]);

    // 🧩 Initialize audio and decode buffer
    useEffect(() => {
        console.log("Audio file in Audio Processor: ",audioFile)
        if (!audioFile || typeof audioFile.arrayBuffer !== "function") return;

        const init = async () => {
            try {
                if (!audioCtxRef.current) {
                    audioCtxRef.current = new (window.AudioContext || window.webkitAudioContext)();
                }

                const arrayBuffer = await audioFile.arrayBuffer();
                const decoded = await audioCtxRef.current.decodeAudioData(arrayBuffer);
                setAudioBuffer(decoded);
            } catch (err) {
                console.error("Error decoding audio:", err);
            }
        };

        init();

        return () => {
            handleStop();
            if (audioCtxRef.current) {
                audioCtxRef.current.close();
                audioCtxRef.current = null;
            }
        };
    }, [audioFile]);


    // 🧠 Stop and rebuild audio graph when effects change during playback
    useEffect(() => {
        if (isPlaying) {
            handleStop();
            setTimeout(() => handlePlay(), 200);
        }
    }, [effects]);

    // 🎚️ Build dynamic graph safely
    const buildGraph = () => {
        const ctx = audioCtxRef.current;
        if (!ctx || !audioBuffer) return null;

        const safeEffects = Array.isArray(effects) ? effects : [];
        console.log("Applied effects:", safeEffects);

        const source = ctx.createBufferSource();
        source.buffer = audioBuffer;

        let lastNode = source;

        // ECHO
        if (safeEffects.includes("echo")) {
            const delay = ctx.createDelay(5.0);
            delay.delayTime.value = 0.25;
            const feedback = ctx.createGain();
            feedback.gain.value = 0.4;
            lastNode.connect(delay);
            delay.connect(feedback);
            feedback.connect(delay);
            lastNode = delay;
        }

        // REVERB (use fake impulse so we get sound)
        if (safeEffects.includes("reverb")) {
            const convolver = ctx.createConvolver();
            // simple impulse for demo
            const impulse = ctx.createBuffer(2, 0.5 * ctx.sampleRate, ctx.sampleRate);
            for (let c = 0; c < impulse.numberOfChannels; c++) {
                const channel = impulse.getChannelData(c);
                for (let i = 0; i < channel.length; i++) {
                    channel[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / channel.length, 2);
                }
            }
            convolver.buffer = impulse;
            lastNode.connect(convolver);
            lastNode = convolver;
        }

        // DISTORTION
        if (safeEffects.includes("distortion")) {
            const distortion = ctx.createWaveShaper();
            const curve = new Float32Array(44100);
            const amount = 20;
            for (let i = 0; i < 44100; i++) {
                const x = (i * 2) / 44100 - 1;
                curve[i] = ((3 + amount) * x * 20 * Math.PI) / (Math.PI + amount * Math.abs(x));
            }
            distortion.curve = curve;
            distortion.oversample = "4x";
            lastNode.connect(distortion);
            lastNode = distortion;
        }

        // LOWPASS
        if (safeEffects.includes("lowpass")) {
            const biquad = ctx.createBiquadFilter();
            biquad.type = "lowpass";
            biquad.frequency.value = 1000;
            lastNode.connect(biquad);
            lastNode = biquad;
        }

        // Final output
        lastNode.connect(ctx.destination);
        return source;
    };

    // ▶️ Play
    const handlePlay = async () => {
        const ctx = audioCtxRef.current || new AudioContext();
        audioCtxRef.current = ctx;

        if (ctx.state === "suspended") await ctx.resume();
        if (!audioBuffer) return console.warn("No decoded audio available");

        const source = buildGraph();
        if (!source) return;

        // 🎚️ Apply BPM scaling here
        source.playbackRate.value = bpm / 120; // adjust 120 as your base BPM reference

        sourceRef.current = source;
        source.start();
        setIsPlaying(true);

        source.onended = () => {
            setIsPlaying(false);
            sourceRef.current = null;
        };
    };

    // ⏹ Stop
    const handleStop = () => {
        if (sourceRef.current) {
            try {
                sourceRef.current.stop();
                sourceRef.current.disconnect();
            } catch (err) {
                console.warn("Source already stopped or invalid");
            } finally {
                sourceRef.current = null;
                setIsPlaying(false);
            }
        }
    };

    useEffect(() => {
        setIsPlaying(false);
    }, []);

    // Export function for generating the final audio file
    const exportAudio = async () => {
        try {
            if (!audioCtxRef?.current || !audioBuffer) {
                console.warn("No valid audio context or buffer");
                return null;
            }

            // Get current BPM and calculate playback speed
            const { bpm } = useAudioStore.getState();
            const baseBPM = 120; // reference tempo
            const speed = bpm ? bpm / baseBPM : 1;

            // Adjust length to prevent cutting off if slowed down
            const adjustedLength = Math.floor(audioBuffer.length / speed);

            // Create an OfflineAudioContext for rendering
            const offlineCtx = new OfflineAudioContext(
                audioBuffer.numberOfChannels,
                adjustedLength,
                audioBuffer.sampleRate
            );

            const source = offlineCtx.createBufferSource();
            source.buffer = audioBuffer;

            // Apply BPM scaling
            source.playbackRate.value = speed;

            // Apply effects
            let lastNode = source;
            const safeEffects = Array.isArray(effects) ? effects : [];

            if (safeEffects.includes("lowpass")) {
                const filter = offlineCtx.createBiquadFilter();
                filter.type = "lowpass";
                filter.frequency.value = 1000;
                lastNode.connect(filter);
                lastNode = filter;
            }

            if (safeEffects.includes("echo")) {
                const delay = offlineCtx.createDelay();
                delay.delayTime.value = 0.25;
                lastNode.connect(delay);
                lastNode = delay;
            }

            if (safeEffects.includes("distortion")) {
                const distortion = offlineCtx.createWaveShaper();
                const curve = new Float32Array(44100);
                const amount = 20;
                for (let i = 0; i < 44100; i++) {
                    const x = (i * 2) / 44100 - 1;
                    curve[i] = ((3 + amount) * x * 20 * Math.PI) / (Math.PI + amount * Math.abs(x));
                }
                distortion.curve = curve;
                distortion.oversample = "4x";
                lastNode.connect(distortion);
                lastNode = distortion;
            }

            lastNode.connect(offlineCtx.destination);
            source.start();

            // Render the audio
            const renderedBuffer = await offlineCtx.startRendering();

            // Convert to WAV blob
            const wavBlob = bufferToWave(renderedBuffer);

            // Log blob details
            console.log("Generated WAV blob:", {
                size: wavBlob.size,
                type: wavBlob.type
            });

            // Validate the blob
            if (!(wavBlob instanceof Blob)) {
                throw new Error("Failed to create WAV blob");
            }

            // Always use .wav extension and audio/wav MIME type for consistency
            const timestamp = new Date().getTime();
            const filename = `remix-${timestamp}.wav`;

            // Create File object with explicit WAV MIME type
            const remixFile = new File([wavBlob], filename, {
                type: 'audio/wav',
                lastModified: Date.now()
            });

            console.log("File to be exported: ",remixFile)

            // Validate the File object
            if (!(remixFile instanceof File) || remixFile.size === 0) {
                throw new Error("Failed to create valid audio file");
            }

            // Log file details for debugging
            console.log("✅ Audio export successful:", remixFile);

            return remixFile;
        } catch (err) {
            console.error("❌ Remix export failed:", err);
            throw err;
        }
    };

    // Helper to convert AudioBuffer → WAV Blob
    const bufferToWave = (abuffer) => {
        const numOfChan = abuffer.numberOfChannels,
            length = abuffer.length * numOfChan * 2 + 44,
            buffer = new ArrayBuffer(length),
            view = new DataView(buffer),
            channels = [],
            sampleRate = abuffer.sampleRate;
        let offset = 0;
        let pos = 0;

        const setUint16 = (data) => {
            view.setUint16(pos, data, true);
            pos += 2;
        };
        const setUint32 = (data) => {
            view.setUint32(pos, data, true);
            pos += 4;
        };

        // RIFF chunk descriptor
        setUint32(0x46464952);
        setUint32(length - 8);
        setUint32(0x45564157);

        // FMT sub-chunk
        setUint32(0x20746d66);
        setUint32(16);
        setUint16(1);
        setUint16(numOfChan);
        setUint32(sampleRate);
        setUint32(sampleRate * 2 * numOfChan);
        setUint16(numOfChan * 2);
        setUint16(16);

        // Data sub-chunk
        setUint32(0x61746164);
        setUint32(length - pos - 4);

        // Write interleaved data
        for (let i = 0; i < numOfChan; i++)
            channels.push(abuffer.getChannelData(i));

        while (pos < length) {
            for (let i = 0; i < numOfChan; i++) {
                let sample = Math.max(-1, Math.min(1, channels[i][offset]));
                view.setInt16(pos, sample < 0 ? sample * 0x8000 : sample * 0x7fff, true);
                pos += 2;
            }
            offset++;
        }

        return new Blob([buffer], { type: "audio/wav" });
    };


    return (
        <div className="flex items-center gap-4 mt-6">
            <Button
                onClick={isPlaying ? handleStop : handlePlay}
                className={`rounded-xl px-6 py-3 ${isPlaying ? "bg-red-600 hover:bg-red-700" : "bg-blue-600 hover:bg-blue-700"
                    } text-white`}
            >
                {isPlaying ? "Stop" : "Play"}
            </Button>
            
        </div>
    );
};


export default AudioProcessor;