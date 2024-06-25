import { CartierFile, OPFS } from "./store";
import { writable, get } from "svelte/store";

export type QueueTrack = {
  id: string;
  name: string;
};

export const PlayerState = writable({
  loaded: false,
  queue: [] as QueueTrack[],
  playback: {
    handle: {} as HTMLAudioElement,
    id: "",
    name: "",
    dur: 1,
    time: 0,
    playing: false,
  },
});

PlayerState.subscribe((playerstate) => {
  navigator.mediaSession.playbackState = playerstate.playback.playing
    ? "playing"
    : "paused";
});

export const usePlayer = {
  play: async () => {
    let playerstate = get(PlayerState);

    if (!playerstate.loaded) {
      playerstate.loaded = true;
    }

    playerstate.playback.playing = true;

    let opfs = get(OPFS);

    const trackFile = await (
      await opfs.handle.tracksDir.getFileHandle(
        `${playerstate.playback.id}.mp3`
      )
    ).getFile();
    const blobURL = URL.createObjectURL(trackFile);

    playerstate.playback.handle = new Audio(blobURL);
    playerstate.playback.handle.play();

    PlayerState.set(playerstate);
    usePlayer.mediaSession.loadSession();

    playerstate.playback.handle.addEventListener("loadeddata", () => {
      PlayerState.update((playerstate) => {
        playerstate.playback.dur = playerstate.playback.handle.duration;
        return playerstate;
      });
    });

    playerstate.playback.handle.addEventListener("timeupdate", () => {
      PlayerState.update((playerstate) => {
        playerstate.playback.time = playerstate.playback.handle.currentTime;
        return playerstate;
      });
    });

    const onEnd = () => {
      let playerstate = get(PlayerState);

      if (playerstate.queue.length > 0) {
        usePlayer.next();
        usePlayer.play();
      }
    };

    playerstate.playback.handle.addEventListener("ended", onEnd);

    navigator.mediaSession.setActionHandler("nexttrack", onEnd);
    navigator.mediaSession.setActionHandler("pause", usePlayer.pause);
    navigator.mediaSession.setActionHandler("play", usePlayer.resume);
  },

  pause: () => {
    let playerstate = get(PlayerState);

    playerstate.playback.handle.pause();
    playerstate.playback.playing = false;

    PlayerState.set(playerstate);
  },

  resume: () => {
    let playerstate = get(PlayerState);

    playerstate.playback.handle.play();
    playerstate.playback.playing = true;

    PlayerState.set(playerstate);
  },

  next: () => {
    let playerstate = get(PlayerState);

    let queueItem = playerstate.queue[0];

    if (!queueItem) {
      return false;
    }

    if (playerstate.playback.playing) {
      usePlayer.pause();
    }

    playerstate.playback.name = queueItem.name;
    playerstate.playback.id = queueItem.id;

    playerstate.queue.splice(0, 1);

    PlayerState.set(playerstate);

    return true;
  },

  queue: {
    addTrack: (id: string, insert: boolean = false) => {
      let playerstate = get(PlayerState);
      let cartierfile = get(CartierFile);

      for (let track of cartierfile.tracks) {
        if (track.id == id) {
          playerstate.queue = insert
            ? [{ id, name: track.name }, ...playerstate.queue]
            : [...playerstate.queue, { id, name: track.name }];

          break;
        }
      }

      PlayerState.set(playerstate);
    },
    addPlaylist: (id: string, insert: boolean = false) => {
      let cartierfile = get(CartierFile);

      const playlist = cartierfile.playlists.find(
        (playlist) => playlist.id == id
      );

      if (!playlist) return;
      if (insert) playlist.tracks.reverse();

      playlist.tracks.forEach((id) => {
        usePlayer.queue.addTrack(id, insert);
      });
    },
  },

  mediaSession: {
    loadSession: () => {
      let playerstate = get(PlayerState);

      navigator.mediaSession.metadata = new MediaMetadata({
        title: playerstate.playback.name,
      });
    },
  },
};
