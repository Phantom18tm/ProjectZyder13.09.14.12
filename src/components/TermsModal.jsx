import { useEffect, useRef, useState } from 'react';
import { Play, Volume2, VolumeX, X } from 'lucide-react';
import { profile } from '../content';

export default function TermsModal({ close }) {
  const dialog = useRef(null);
  const video = useRef(null);
  const [muted, setMuted] = useState(false);
  const [needsPlay, setNeedsPlay] = useState(false);
  const [mediaError, setMediaError] = useState(false);

  useEffect(() => {
    const player = video.current;
    let cancelled = false;
    if (!dialog.current.open) dialog.current.showModal();
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    async function startVideo() {
      if (!player) return;
      try {
        await player.play();
      } catch (error) {
        if (cancelled) return;
        // Some browsers permit autoplay only when the media is muted.
        if (error.name === 'NotAllowedError') {
          player.muted = true;
          setMuted(true);
          try {
            await player.play();
            return;
          } catch {
            if (cancelled) return;
          }
        }
        if (!cancelled) setNeedsPlay(true);
      }
    }

    startVideo();
    return () => {
      cancelled = true;
      // Capture this instance so a late promise cannot affect a reopened popup.
      player?.pause();
      document.body.style.overflow = previousOverflow;
    };
  }, []);

  function closeDialog() {
    video.current?.pause();
    dialog.current.close();
  }

  async function playVideo() {
    try {
      await video.current.play();
      setNeedsPlay(false);
    } catch {
      setNeedsPlay(true);
    }
  }

  function toggleSound() {
    const player = video.current;
    const silent = player.muted || player.volume === 0;
    player.muted = !silent;
    if (silent && player.volume === 0) player.volume = 1;
    setMuted(player.muted);
  }

  return (
    <dialog
      ref={dialog}
      className="info-dialog"
      onClose={() => { video.current?.pause(); close(); }}
      onClick={(event) => { if (event.target === event.currentTarget) closeDialog(); }}
      aria-labelledby="info-dialog-title"
    >
      <div className="info-dialog-inner">
        <button className="dialog-close" onClick={closeDialog} aria-label="Close window"><X size={22}/></button>
        <p className="eyebrow">TERMS & CONDITIONS</p>
        <h2 id="info-dialog-title">Terms & conditions</h2>
        {profile.termsVideo ? (
          <>
            <video
              ref={video}
              src={profile.termsVideo}
              autoPlay
              controls
              playsInline
              preload="auto"
              aria-label="Terms and conditions video"
              onPlaying={() => setNeedsPlay(false)}
              onVolumeChange={(event) => setMuted(event.currentTarget.muted || event.currentTarget.volume === 0)}
              onError={() => setMediaError(true)}
            >
              {profile.termsCaptions && <track default kind="captions" src={profile.termsCaptions} srcLang="en" label="English"/>}
              Your browser does not support video playback.
            </video>
            {mediaError ? <p className="terms-media-message" role="alert">The video could not be loaded. <a href={profile.termsVideo}>Open video</a></p> : (
              <div className="terms-player-actions">
                <button className="terms-media-button" onClick={toggleSound}>{muted ? <VolumeX size={16}/> : <Volume2 size={16}/>} {muted ? 'Enable sound' : 'Mute video'}</button>
                {needsPlay && <button className="terms-media-button" onClick={playVideo}><Play size={16}/> Play video</button>}
              </div>
            )}
          </>
        ) : <p className="terms-media-message">No terms video has been provided.</p>}
      </div>
    </dialog>
  );
}
