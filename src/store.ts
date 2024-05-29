import { writable, get } from "svelte/store";
import { requests } from "./server";
import FsWorker from "./fsWorker?worker";
import { notify } from "./App.svelte";

export enum TabKind {
  PLAYLISTS,
  DOWNLOADED,
  SETTINGS,
  ACCOUNT,
}

type User = {
  display_name: string;
  id: string;
  images: { url: string; height: number; width: number }[];
  followers: number;
  external_url: string;
};

export type BasicPlaylist = {
  name: string;
  url: string;
  desc: string;
  owner: string;
  tracks: string[];
  id: string;
};

export type BasicTrack = {
  id: string;
  name: string;
  dependants: { id: string }[];
};

export type Playlist = {
  description: string;
  external_url: string;
  href: string;
  owner: {
    display_name: string;
    external_urls: { spotify: string };
    href: string;
    id: string;
    type: string;
    uri: string;
  };
  images: { url: string; width: number; height: number }[];
  id: string;
  url: string;
  name: string;
};

export const AppState = writable({
  logged: false,
  offline: true,
  user: {} as User,
  playlists: { downloaded: [] as BasicPlaylist[], all: [] as Playlist[] },
  view: {
    tab: TabKind.PLAYLISTS,
  },
});

export const OPFS = writable({
  handle: {
    root: {} as FileSystemDirectoryHandle,
    cartierFile: {} as FileSystemFileHandle,
    tracksDir: {} as FileSystemDirectoryHandle,
  },
  workerLock: undefined as undefined | Promise<void>,
});
export const CartierFile = writable({
  playlists: [] as BasicPlaylist[],
  tracks: [] as BasicTrack[],
  info: { type: "cartier-file", version: 1 },
  data: {},
});

export const Socket = writable({ io: {}, loaded: false });

export const useOPFS = {
  write: async (path: string, content: any) => {
    const worker = new FsWorker();

    worker.postMessage({
      mode: "write",
      path,
      content: content,
    });

    return new Promise<void>((resolve, reject) => {
      worker.addEventListener("message", () => {
        resolve();
      });
    });
  },
};

export const useApp = {
  setOPFSHandle: async () => {
    let newOPFS = get(OPFS);

    newOPFS.handle.root = await navigator.storage.getDirectory();
    newOPFS.handle.cartierFile = await newOPFS.handle.root.getFileHandle(
      "cartier.json",
      {
        create: true,
      }
    );
    newOPFS.handle.tracksDir = await newOPFS.handle.root.getDirectoryHandle(
      "tracks",
      { create: true }
    );

    OPFS.set(newOPFS);
  },

  bufferCartierFile: async () => {
    let opfs = get(OPFS);

    const readableCF = await opfs.handle.cartierFile.getFile();

    // create blank cartier file
    if (readableCF.size == 0) {
      await useOPFS.write("cartier.json", JSON.stringify(get(CartierFile)));
    } else {
      CartierFile.set(JSON.parse(await readableCF.text()));
    }

    CartierFile.subscribe(async (content) => {
      await useOPFS.write("cartier.json", JSON.stringify(content));
    });
  },

  initCartierFile: async () => {
    await useApp.setOPFSHandle();
    await useApp.bufferCartierFile();
  },
  login: async (
    userid: string = "",
    data: { success: boolean; data: any } | {} = {}
  ) => {
    if (Object.keys(data).length == 0) {
      data = await requests.getUserInfo(userid);
      if (data["success"] == false) return false;
      data = data["data"];

      let cartierfile = get(CartierFile);
      cartierfile.data = data;

      CartierFile.set(cartierfile);
    }

    AppState.set({ ...get(AppState), ...data, logged: true });
  },
  logout: async () => {
    localStorage.removeItem("cartier-userid");

    AppState.update((oldState) => {
      oldState["logged"] = false;
      oldState["playlists"] = { all: [], downloaded: [] };
      oldState["user"] = {} as User;

      return oldState;
    });
  },

  init: async () => {
    await useApp.initCartierFile();

    let appstate = get(AppState);
    let cartierfile = get(CartierFile);

    if (cartierfile.data && Object.keys(cartierfile.data).length > 0) {
      if (appstate.offline) {
        useApp.login("", cartierfile.data);
      } else {
        useApp.login(cartierfile.data.user.id);
      }
    }
  },
};
