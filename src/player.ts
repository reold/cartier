import { CartierFile, OPFS } from "./store";
import { writable, get } from "svelte/store";

export type QueueTrack = {
  id: string;
  name: string;
};

// export const PlayerState = writable({
//   loaded: true, // DEV: change to false for production
//   queue: [] as QueueTrack[],
//   playback: {
//     handle: {} as HTMLAudioElement,
//     id: "",
//     name: "Alapuzha Pattanathil (from the beloved 90s movie unknown unknowinsit)",
//     playing: false,
//   },
// });

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

    playerstate.playback.handle.addEventListener("ended", () => {
      let playerstate = get(PlayerState);

      if (playerstate.queue.length > 0) {
        usePlayer.next();
        usePlayer.play();
      }
    });

    PlayerState.set(playerstate);
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
};
