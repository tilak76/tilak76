import React, { useEffect, useState, useRef } from "react";
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import { FaMicrophone, FaMicrophoneSlash, FaStop, FaMagic } from "react-icons/fa";
import "../styles/VoiceNav.css";
// Default Intro Audio
import userVoice from "../assets/Recording.m4a";

const VoiceNav = () => {
    // --- HOST & SETTINGS ---
    const [voicePitch, setVoicePitch] = useState(1.0);
    const [voiceRate, setVoiceRate] = useState(1.1); // Fast default
    const [voices, setVoices] = useState([]);
    const [selectedVoice, setSelectedVoice] = useState(null);
    const [showSettings, setShowSettings] = useState(false);

    // --- LOGIC STATE ---
    const [alwaysOn, setAlwaysOn] = useState(true);
    const [feedback, setFeedback] = useState("");
    const [lastCMD, setLastCMD] = useState(""); // Prevent echo loop

    // --- LIBRARY HOOK ---
    const {
        transcript,
        listening,
        resetTranscript,
        browserSupportsSpeechRecognition
    } = useSpeechRecognition();

    // --- INITIALIZATION ---
    useEffect(() => {
        // Load Voices
        const loadVoices = () => {
            const availVoices = window.speechSynthesis.getVoices();
            setVoices(availVoices);
            const preferred = availVoices.find(v => v.name.includes("Google US") || v.name.includes("Samantha") || v.lang === "en-US");
            if (preferred) setSelectedVoice(preferred);
        };
        loadVoices();
        window.speechSynthesis.onvoiceschanged = loadVoices;
    }, []);

    // --- SMART LISTENER (STREAMING) ---
    const lastLength = useRef(0);
    const isSpeakingRef = useRef(false); // Track if AI is talking

    useEffect(() => {
        if (!transcript) {
            lastLength.current = 0;
            return;
        }

        // ECHO CANCELLATION:
        // If the system is currently speaking, we assume any new input is just feedback/echo.
        // We fast-forward the cursor to ignore it.
        if (isSpeakingRef.current || window.speechSynthesis.speaking) {
            lastLength.current = transcript.length;
            return;
        }

        // CONTINUOUS CONSUME LOOP
        // We loop because multiple commands might arrive in one bulk update
        while (true) {
            const currentCursor = lastLength.current;
            const unprocessed = transcript.slice(currentCursor).toLowerCase();

            // Needs minimum length to be a command (optimization)
            if (unprocessed.length < 3) break;

            // Find FIRST occurrence of any intent
            // We need to find the *earliest* match in the string to preserve order
            const match = findEarliestMatch(unprocessed);

            if (match) {
                console.log("Detected:", match.id);

                // Execute
                executeAction(match.id);

                // Visual Feedback
                setFeedback(`🚀 ${match.id.toUpperCase()}`);
                setLastCMD(match.id);

                // ADVANCE CURSOR
                // Move past the matched key. 
                // match.index is relative to 'unprocessed'.
                // New Position = Old Position + Index of match + Length of match
                lastLength.current = currentCursor + match.index + match.key.length;
            } else {
                // No match found in current chunk.
                // We DO NOT advance cursor here. We wait for more characters to form a valid word.
                // Exception: If buffer is huge and no match, trim it to prevent memory issues.
                if (unprocessed.length > 200) {
                    lastLength.current = transcript.length; // Discard garbage
                }
                break; // Exit loop, wait for next render
            }
        }

    }, [transcript]);

    const findEarliestMatch = (text) => {
        const rules = [
            { id: "home", keys: ["home", "main menu", "top", "shuru"] },
            { id: "about", keys: ["about", "intro", "yourself", "kaun ho", "who are you"] },
            { id: "skills", keys: ["skill", "tech", "react", "program", "code"] },
            { id: "projects", keys: ["project", "work", "portfolio", "dikhao", "gallery"] },
            { id: "contact", keys: ["contact", "email", "phone", "call", "message"] },
            { id: "resume", keys: ["resume", "cv", "download", "biodata"] },
            { id: "time", keys: ["time", "samay", "clock"] },
            { id: "date", keys: ["date", "day", "calendar"] },
            { id: "stop", keys: ["stop", "chup", "shut", "pause"] },
            { id: "search", keys: ["search", "google", "dhundo"] }
        ];

        let bestMatch = null;

        rules.forEach(rule => {
            rule.keys.forEach(key => {
                const idx = text.indexOf(key);
                if (idx !== -1) {
                    // Update bestMatch if this one appears earlier
                    if (!bestMatch || idx < bestMatch.index) {
                        bestMatch = { id: rule.id, index: idx, key: key };
                    }
                }
            });
        });

        return bestMatch;
    };

    // Handle Always On Persistence
    useEffect(() => {
        if (alwaysOn && !listening) {
            try { SpeechRecognition.startListening({ continuous: true, language: 'en-US' }); } catch (e) { }
        }
    }, [alwaysOn, listening]);

    // --- ACTION EXECUTOR ---
    const executeAction = (intent) => {
        switch (intent) {
            case "home":
                scrollToSection("home");
                speak("Home.");
                break;
            case "about":
                scrollToSection("about");
                speak("About Me.", userVoice);
                break;
            case "skills":
                scrollToSection("skills");
                speak("My Skills.");
                break;
            case "projects":
                scrollToSection("projects");
                speak("My Projects.");
                break;
            case "contact":
                scrollToSection("contact");
                speak("Contact Me.");
                break;
            case "resume":
                window.open("https://drive.google.com/file/d/1J8UB7G6KX1cVWL4d_mGT6bEdwrU5pVHC/view", "_blank");
                speak("Resume.");
                break;
            case "time":
                speak(new Date().toLocaleTimeString());
                break;
            case "date":
                speak(new Date().toDateString());
                break;
            case "stop":
                window.speechSynthesis.cancel();
                break;
            case "search":
                speak("Opening Google.");
                window.open("https://google.com", "_blank");
                break;
            default:
                break;
        }
    };

    // --- CONTROLS ---
    const toggleListening = () => {
        if (listening) {
            SpeechRecognition.stopListening();
            setAlwaysOn(false);
            setFeedback("Stopped");
        } else {
            resetTranscript(); // Clear old buffer on fresh start
            lastLength.current = 0;
            SpeechRecognition.startListening({ continuous: true, language: 'en-US' });
            setFeedback("Listening...");
        }
    };

    if (!browserSupportsSpeechRecognition) {
        return null; // Or a backup UI
    }

    const scrollToSection = (id) => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: "smooth" });
    };

    // --- TTS ENGINE ---
    const speak = (text, audioObj) => {
        window.speechSynthesis.cancel(); // Stop previous

        if (audioObj) {
            const audio = new Audio(audioObj);
            audio.play().catch(e => speakTTS(text)); // Fallback
        } else {
            speakTTS(text);
        }
    };

    const speakTTS = (text) => {
        const utterance = new SpeechSynthesisUtterance(text);
        if (selectedVoice) utterance.voice = selectedVoice;
        utterance.rate = voiceRate;
        utterance.pitch = voicePitch;
        window.speechSynthesis.speak(utterance);
    };

    const truncate = (str, n) => {
        return (str.length > n) ? str.substr(0, n - 1) + '...' : str;
    };

    return (
        <div className="voice-nav-container">
            {/* Settings Modal */}
            {showSettings && (
                <div className="voice-settings glass-panel">
                    <h3><FaMagic /> AI Settings</h3>

                    <div className="setting-group" style={{ background: 'rgba(0,255,150,0.1)', padding: '15px', borderRadius: '10px', border: '1px solid #00b894' }}>
                        <label className="switch-label" style={{ display: 'flex', alignItems: 'center', cursor: 'pointer', fontSize: '1.1rem' }}>
                            <input
                                type="checkbox"
                                checked={alwaysOn}
                                onChange={(e) => {
                                    setAlwaysOn(e.target.checked);
                                    if (e.target.checked) SpeechRecognition.startListening({ continuous: true });
                                    else SpeechRecognition.stopListening();
                                }}
                                style={{ transform: 'scale(1.5)', marginRight: '15px', accentColor: '#00b894' }}
                            />
                            <div>
                                <strong style={{ color: '#fff' }}>Always On Mode</strong>
                                <p style={{ fontSize: '0.8rem', color: '#ccc', margin: 0 }}>Auto-restart. Never sleeps.</p>
                            </div>
                        </label>
                    </div>

                    <div className="setting-group">
                        <label>Speed: {voiceRate}x</label>
                        <input type="range" min="0.5" max="2" step="0.1" value={voiceRate} onChange={(e) => setVoiceRate(parseFloat(e.target.value))} />
                    </div>

                    <button className="close-btn" onClick={() => setShowSettings(false)}>Close</button>
                </div>
            )}

            {/* Visual Feedback */}
            {(listening || feedback) && (
                <div className={`voice-feedback ${alwaysOn ? 'pulsing' : ''}`}>
                    <div className="status-icon">
                        {listening ? (alwaysOn ? "🧠" : "🎤") : "💤"}
                    </div>
                    <div className="status-text">
                        {transcript ? `"${truncate(transcript, 25)}"` : (listening ? "Listening..." : "Paused")}
                    </div>
                    {feedback && <div className="transcript-text" style={{ color: '#00b894', marginTop: '5px' }}>{feedback}</div>}
                </div>
            )}

            {/* Main Toggle */}
            <div className="voice-controls">
                <button className="voice-settings-btn" onClick={() => setShowSettings(!showSettings)}>⚙️</button>
                <button
                    className={`voice-btn ${listening ? "listening" : ""} ${alwaysOn ? "always-on-active" : ""}`}
                    onClick={toggleListening}
                >
                    {listening ? <FaMicrophone /> : <FaMicrophoneSlash />}
                </button>
            </div>
        </div>
    );
};

export default VoiceNav;
