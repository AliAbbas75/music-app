// import { useEffect, useRef } from "react";
// import useAudioStore from "@/store/audioStore";
// import { Button } from "@/components/ui/button";

// const AudioProcessor = () => {
//     const {
//         audioFile,
//         audioBuffer,
//         setAudioBuffer,
//         isPlaying,
//         setIsPlaying,
//         effects,
//     } = useAudioStore();
//     // 🧠 Rebuild graph when effects change during playback
//     useEffect(() => {
//         if (isPlaying) {
//             handleStop();
//             setTimeout(() => handlePlay(), 100);
//         }
//     }, [effects]);


//     const audioCtxRef = useRef(null);
//     const sourceRef = useRef(null);

//     // 🧩 Initialize & decode only if we have a valid File
//     useEffect(() => {
//         if (!audioFile || typeof audioFile.arrayBuffer !== "function") return;

//         const init = async () => {
//             try {
//                 if (!audioCtxRef.current) {
//                     audioCtxRef.current = new AudioContext();
//                 }

//                 const arrayBuffer = await audioFile.arrayBuffer();
//                 const decoded = await audioCtxRef.current.decodeAudioData(arrayBuffer);
//                 setAudioBuffer(decoded);
//             } catch (err) {
//                 console.error("Error decoding audio:", err);
//             }
//         };

//         init();

//         // Cleanup
//         return () => {
//             if (audioCtxRef.current) {
//                 audioCtxRef.current.close();
//                 audioCtxRef.current = null;
//             }
//             setIsPlaying(false);
//         };
//     }, [audioFile, setAudioBuffer, setIsPlaying]);

//     // 🎚️ Build filter/effect chain dynamically
//     const buildGraph = () => {
//         const ctx = audioCtxRef.current;
        
//         if (!ctx || !audioBuffer) return null;
        
//         const safeEffects = Array.isArray(effects) ? effects : [];
//         console.log("Applied effects:", safeEffects);

//         const source = ctx.createBufferSource();
//         source.buffer = audioBuffer;

//         let lastNode = source;

//         if (safeEffects.includes("echo")) {
//             const delay = ctx.createDelay(5.0);
//             delay.delayTime.value = 0.25;
//             lastNode.connect(delay);
//             lastNode = delay;
//         }

//         if (safeEffects.includes("reverb")) {
//             const convolver = ctx.createConvolver();
//             lastNode.connect(convolver);
//             lastNode = convolver;
//         }

//         if (safeEffects.includes("distortion")) {
//             const distortion = ctx.createWaveShaper();
//             const curve = new Float32Array(44100);
//             for (let i = 0; i < 44100; i++) {
//                 const x = (i * 2) / 44100 - 1;
//                 curve[i] = ((3 + 20) * x * 20 * Math.PI) / (Math.PI + 20 * Math.abs(x));
//             }
//             distortion.curve = curve;
//             distortion.oversample = "4x";
//             lastNode.connect(distortion);
//             lastNode = distortion;
//         }

//         if (safeEffects.includes("lowpass")) {
//             const biquad = ctx.createBiquadFilter();
//             biquad.type = "lowpass";
//             biquad.frequency.value = 1000;
//             lastNode.connect(biquad);
//             lastNode = biquad;
//         }

//         lastNode.connect(ctx.destination);
//         return source;
//     };

//     // ▶️ Play
//     const handlePlay = async () => {
//         if (!audioBuffer) {
//             console.warn("No decoded audio available");
//             return;
//         }

//         const ctx = audioCtxRef.current || new AudioContext();
//         if (ctx.state === "suspended") await ctx.resume();

//         const source = buildGraph();
//         if (!source) return;

//         sourceRef.current = source;
//         source.start();
//         setIsPlaying(true);

//         source.onended = () => {
//             setIsPlaying(false);
//             sourceRef.current = null;
//         };
//     };

//     // ⏹ Stop
//     const handleStop = () => {
//         if (sourceRef.current) {
//             try {
//                 sourceRef.current.stop();
//                 sourceRef.current.disconnect();
//             } catch (err) {
//                 console.warn("Source already stopped or invalid");
//             } finally {
//                 sourceRef.current = null;
//                 setIsPlaying(false);
//             }
//         }
//     };

//     // 🧠 Reset play state on mount (so reloading doesn’t keep playing=true)
//     useEffect(() => {
//         setIsPlaying(false);
//     }, [setIsPlaying]);

//     return (
//         <div className="flex items-center gap-4 mt-6">
//             <Button
//                 onClick={isPlaying ? handleStop : handlePlay}
//                 className={`rounded-xl px-6 py-3 ${isPlaying
//                     ? "bg-red-600 hover:bg-red-700"
//                     : "bg-blue-600 hover:bg-blue-700"
//                     } text-white`}
//             >
//                 {isPlaying ? "Stop" : "Play"}
//             </Button>
//         </div>
//     );
// };

// export default AudioProcessor;


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
  } = useAudioStore();

  const audioCtxRef = useRef(null);
  const sourceRef = useRef(null);

  // 🧩 Initialize audio and decode buffer
  useEffect(() => {
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
    if (!audioBuffer) {
      console.warn("No decoded audio available");
      return;
    }

    const source = buildGraph();
    if (!source) return;

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

  return (
    <div className="flex items-center gap-4 mt-6">
      <Button
        onClick={isPlaying ? handleStop : handlePlay}
        className={`rounded-xl px-6 py-3 ${
          isPlaying ? "bg-red-600 hover:bg-red-700" : "bg-blue-600 hover:bg-blue-700"
        } text-white`}
      >
        {isPlaying ? "Stop" : "Play"}
      </Button>
    </div>
  );
};

export default AudioProcessor;
