import { CartierFile, OPFS } from "./store";
import { writable, get } from "svelte/store";

export type QueueTrack = {
  id: string;
  name: string;
};

export const PlayerState = writable({
  queue: [] as QueueTrack[],
  playback: {
    handle: {} as HTMLAudioElement,
    id: "",
    name: "",
    playing: false,
  },
});

export const usePlayer = {
  play: async () => {
    let playerstate = get(PlayerState);

    if (!playerstate.playback.playing) {
      usePlayer.next();
      playerstate = get(PlayerState);
    } else {
      playerstate.playback.handle.pause();
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
  },

  pause: () => {
    let playerstate = get(PlayerState);

    playerstate.playback.handle.pause();
  },

  resume: () => {
    let playerstate = get(PlayerState);

    playerstate.playback.handle.play();
  },

  next: () => {
    let playerstate = get(PlayerState);

    let queueItem = playerstate.queue[0];
    playerstate.queue.splice(0, 1);

    playerstate.playback.name = queueItem.name;
    playerstate.playback.id = queueItem.id;

    PlayerState.set(playerstate);
  },

  queue: {
    addTrack: (id: string) => {
      let playerstate = get(PlayerState);
      let cartierfile = get(CartierFile);

      for (let track of cartierfile.tracks) {
        if (track.id == id) {
          playerstate.queue = [...playerstate.queue, { id, name: track.name }];
          break;
        }
      }

      PlayerState.set(playerstate);
    },
    addPlaylist: (id: string) => {
      let cartierfile = get(CartierFile);

      const playlist = cartierfile.playlists.find(
        (playlist) => playlist.id == id
      );

      if (!playlist) return;

      playlist.tracks.forEach((id) => {
        usePlayer.queue.addTrack(id);
      });
    },
  },
};
