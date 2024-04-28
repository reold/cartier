import { writable, get } from "svelte/store";
import { requests } from "./server";

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
});
export const CartierFile = writable({
  playlists: [] as BasicPlaylist[],
  tracks: [] as BasicTrack[],
  info: { type: "", version: 0 },
});

export const Socket = writable({ io: {}, loaded: false });

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
    CartierFile.set(JSON.parse(await readableCF.text()));

    CartierFile.subscribe(async (content) => {
      const writableCF = await opfs.handle.cartierFile.createWritable();
      await writableCF.write(JSON.stringify(content));
      await writableCF.close();
    });
  },

  initCartierFile: async () => {
    await useApp.setOPFSHandle();

    let opfs = get(OPFS);

    const readableCF = await opfs.handle.cartierFile.getFile();

    // create empty json cartier file
    if (readableCF.size == 0) {
      console.info("cartier file is empty!");

      const writableCF = await opfs.handle.cartierFile.createWritable();
      await writableCF.write(
        JSON.stringify({
          info: { type: "cartier-file", version: 1 },
          playlists: [],
          tracks: [],
        })
      );
      await writableCF.close();
    }

    await useApp.bufferCartierFile();
  },
  login: async (username: string) => {
    let data = await requests.getUserInfo(username);

    if (data["success"] == false) return false;

    AppState.set({ ...get(AppState), ...data["data"], logged: true });
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
};

// export const appState = writable(
//   import.meta.env.DEV
//     ? {
//         user: {
//           display_name: "Aadhi + Reold",
//           external_url: {
//             spotify: "https://open.spotify.com/user/krr5eq9z17bjfoidb38r5uik8",
//           },
//           href: "https://api.spotify.com/v1/users/krr5eq9z17bjfoidb38r5uik8",
//           id: "krr5eq9z17bjfoidb38r5uik8",
//           images: [
//             {
//               url: "https://i.scdn.co/image/ab67757000003b822d7900830e4a0481ce70fb26",
//               height: 64,
//               width: 64,
//             },
//             {
//               url: "https://i.scdn.co/image/ab6775700000ee852d7900830e4a0481ce70fb26",
//               height: 300,
//               width: 300,
//             },
//           ],
//           type: "user",
//           uri: "spotify:user:krr5eq9z17bjfoidb38r5uik8",
//           followers: { href: null, total: 2 },
//         },
//         playlists: {
//           href: "https://api.spotify.com/v1/users/krr5eq9z17bjfoidb38r5uik8/playlists?offset=0&limit=50",
//           items: [
//             {
//               collaborative: false,
//               description: "",
//               external_url: {
//                 spotify:
//                   "https://open.spotify.com/playlist/4DU3CC6QCnI6OOiPJFcRN8",
//               },
//               href: "https://api.spotify.com/v1/playlists/4DU3CC6QCnI6OOiPJFcRN8",
//               id: "4DU3CC6QCnI6OOiPJFcRN8",
//               images: [],
//               name: "Download",
//               owner: {
//                 display_name: "Aadhi + Reold",
//                 external_url: {
//                   spotify:
//                     "https://open.spotify.com/user/krr5eq9z17bjfoidb38r5uik8",
//                 },
//                 href: "https://api.spotify.com/v1/users/krr5eq9z17bjfoidb38r5uik8",
//                 id: "krr5eq9z17bjfoidb38r5uik8",
//                 type: "user",
//                 uri: "spotify:user:krr5eq9z17bjfoidb38r5uik8",
//               },
//               primary_color: null,
//               public: true,
//               snapshot_id:
//                 "NSw2OWMzNjA1MjA1MWJiNjYyYWNjNGQ3ZDU4Y2ZiYjUwYWZhYTBhOGM4",
//               tracks: {
//                 href: "https://api.spotify.com/v1/playlists/4DU3CC6QCnI6OOiPJFcRN8/tracks",
//                 total: 0,
//               },
//               type: "playlist",
//               uri: "spotify:playlist:4DU3CC6QCnI6OOiPJFcRN8",
//             },
//             {
//               collaborative: false,
//               description: "",
//               external_url: {
//                 spotify:
//                   "https://open.spotify.com/playlist/1qnxK0KItEJGZLA2xaFxl6",
//               },
//               href: "https://api.spotify.com/v1/playlists/1qnxK0KItEJGZLA2xaFxl6",
//               id: "1qnxK0KItEJGZLA2xaFxl6",
//               images: [
//                 {
//                   height: 640,
//                   url: "https://i.scdn.co/image/ab67616d0000b273a65d5101e0de4902bb49a821",
//                   width: 640,
//                 },
//               ],
//               name: "Feels good to be alive.",
//               owner: {
//                 display_name: "Aadhi + Reold",
//                 external_url: {
//                   spotify:
//                     "https://open.spotify.com/user/krr5eq9z17bjfoidb38r5uik8",
//                 },
//                 href: "https://api.spotify.com/v1/users/krr5eq9z17bjfoidb38r5uik8",
//                 id: "krr5eq9z17bjfoidb38r5uik8",
//                 type: "user",
//                 uri: "spotify:user:krr5eq9z17bjfoidb38r5uik8",
//               },
//               primary_color: null,
//               public: true,
//               snapshot_id:
//                 "Myw1ZmNlZWE0YTU5NThmNzQ0MGYxMmJlNDBmNzg2MjI4YjlkNjA5NTA4",
//               tracks: {
//                 href: "https://api.spotify.com/v1/playlists/1qnxK0KItEJGZLA2xaFxl6/tracks",
//                 total: 2,
//               },
//               type: "playlist",
//               uri: "spotify:playlist:1qnxK0KItEJGZLA2xaFxl6",
//             },
//             {
//               collaborative: false,
//               description: "",
//               external_url: {
//                 spotify:
//                   "https://open.spotify.com/playlist/59OOem6SoudC5hginqutgf",
//               },
//               href: "https://api.spotify.com/v1/playlists/59OOem6SoudC5hginqutgf",
//               id: "59OOem6SoudC5hginqutgf",
//               images: [
//                 {
//                   height: 640,
//                   url: "https://i.scdn.co/image/ab67616d0000b273324ec8c0ec39521ec28a2aa5",
//                   width: 640,
//                 },
//               ],
//               name: "Drops",
//               owner: {
//                 display_name: "Aadhi + Reold",
//                 external_url: {
//                   spotify:
//                     "https://open.spotify.com/user/krr5eq9z17bjfoidb38r5uik8",
//                 },
//                 href: "https://api.spotify.com/v1/users/krr5eq9z17bjfoidb38r5uik8",
//                 id: "krr5eq9z17bjfoidb38r5uik8",
//                 type: "user",
//                 uri: "spotify:user:krr5eq9z17bjfoidb38r5uik8",
//               },
//               primary_color: null,
//               public: true,
//               snapshot_id:
//                 "NSwxZjE0OTRlNTVhN2Q3MGFjYTUxY2IxZTM1YmE0YThlYmM0MTk3ODky",
//               tracks: {
//                 href: "https://api.spotify.com/v1/playlists/59OOem6SoudC5hginqutgf/tracks",
//                 total: 2,
//               },
//               type: "playlist",
//               uri: "spotify:playlist:59OOem6SoudC5hginqutgf",
//             },
//             {
//               collaborative: false,
//               description: "Best of 90s from Mollywood.\nCover: Shobana",
//               external_url: {
//                 spotify:
//                   "https://open.spotify.com/playlist/37i9dQZF1DX54H77RAFJQ9",
//               },
//               href: "https://api.spotify.com/v1/playlists/37i9dQZF1DX54H77RAFJQ9",
//               id: "37i9dQZF1DX54H77RAFJQ9",
//               images: [
//                 {
//                   height: null,
//                   url: "https://i.scdn.co/image/ab67706f00000003c5531deb072c05bf47d1b652",
//                   width: null,
//                 },
//               ],
//               name: "All out 90s Malayalam",
//               owner: {
//                 display_name: "Spotify",
//                 external_url: {
//                   spotify: "https://open.spotify.com/user/spotify",
//                 },
//                 href: "https://api.spotify.com/v1/users/spotify",
//                 id: "spotify",
//                 type: "user",
//                 uri: "spotify:user:spotify",
//               },
//               primary_color: null,
//               public: true,
//               snapshot_id:
//                 "MTY5NjQ4NzA2MCwwMDAwMDAwMDNmNzljMGU2ZGUxYWZmMmVkYmZhMjQ3MGYxM2FjODIw",
//               tracks: {
//                 href: "https://api.spotify.com/v1/playlists/37i9dQZF1DX54H77RAFJQ9/tracks",
//                 total: 100,
//               },
//               type: "playlist",
//               uri: "spotify:playlist:37i9dQZF1DX54H77RAFJQ9",
//             },
//             {
//               collaborative: false,
//               description: "",
//               external_url: {
//                 spotify:
//                   "https://open.spotify.com/playlist/0Kklyw1IKm9bsctYnUpDlf",
//               },
//               href: "https://api.spotify.com/v1/playlists/0Kklyw1IKm9bsctYnUpDlf",
//               id: "0Kklyw1IKm9bsctYnUpDlf",
//               images: [
//                 {
//                   height: null,
//                   url: "https://image-cdn-ak.spotifycdn.com/image/ab67706c0000bebb2006b029c8bae0700df3e1f6",
//                   width: null,
//                 },
//               ],
//               name: "Mohanlal old hits",
//               owner: {
//                 display_name: "Malavika",
//                 external_url: {
//                   spotify:
//                     "https://open.spotify.com/user/1knj6nfm5h6prahvvprla9ci6",
//                 },
//                 href: "https://api.spotify.com/v1/users/1knj6nfm5h6prahvvprla9ci6",
//                 id: "1knj6nfm5h6prahvvprla9ci6",
//                 type: "user",
//                 uri: "spotify:user:1knj6nfm5h6prahvvprla9ci6",
//               },
//               primary_color: null,
//               public: true,
//               snapshot_id:
//                 "NDcsNjQxYWM5NDE3ZmVkODFjYjFjZDBmODhjYzFjNzBiNGFiYzA3YTljMQ==",
//               tracks: {
//                 href: "https://api.spotify.com/v1/playlists/0Kklyw1IKm9bsctYnUpDlf/tracks",
//                 total: 40,
//               },
//               type: "playlist",
//               uri: "spotify:playlist:0Kklyw1IKm9bsctYnUpDlf",
//             },
//             {
//               collaborative: false,
//               description:
//                 "Best love songs of 1980s from Mollywood.\nCover: Chithram",
//               external_url: {
//                 spotify:
//                   "https://open.spotify.com/playlist/37i9dQZF1DX24Nux3gigVe",
//               },
//               href: "https://api.spotify.com/v1/playlists/37i9dQZF1DX24Nux3gigVe",
//               id: "37i9dQZF1DX24Nux3gigVe",
//               images: [
//                 {
//                   height: null,
//                   url: "https://i.scdn.co/image/ab67706f00000003aa419219a4594ff17aebbfbd",
//                   width: null,
//                 },
//               ],
//               name: "80s Love Malayalam",
//               owner: {
//                 display_name: "Spotify",
//                 external_url: {
//                   spotify: "https://open.spotify.com/user/spotify",
//                 },
//                 href: "https://api.spotify.com/v1/users/spotify",
//                 id: "spotify",
//                 type: "user",
//                 uri: "spotify:user:spotify",
//               },
//               primary_color: null,
//               public: true,
//               snapshot_id:
//                 "MTcwMDgyMTUzMSwwMDAwMDAwMDlkMmYzYWQ5Njk2OTAyMGM0OGMwZWQ3YjRhZGYxMjEw",
//               tracks: {
//                 href: "https://api.spotify.com/v1/playlists/37i9dQZF1DX24Nux3gigVe/tracks",
//                 total: 50,
//               },
//               type: "playlist",
//               uri: "spotify:playlist:37i9dQZF1DX24Nux3gigVe",
//             },
//             {
//               collaborative: false,
//               description: "different vibe? hopefully 🤞",
//               external_url: {
//                 spotify:
//                   "https://open.spotify.com/playlist/3n6lIykbh0n2OlwZWKQaWT",
//               },
//               href: "https://api.spotify.com/v1/playlists/3n6lIykbh0n2OlwZWKQaWT",
//               id: "3n6lIykbh0n2OlwZWKQaWT",
//               images: [
//                 {
//                   height: null,
//                   url: "https://image-cdn-ak.spotifycdn.com/image/ab67706c0000bebb021171825f4d28d1756556aa",
//                   width: null,
//                 },
//               ],
//               name: "Differential lock",
//               owner: {
//                 display_name: "Aadhi + Reold",
//                 external_url: {
//                   spotify:
//                     "https://open.spotify.com/user/krr5eq9z17bjfoidb38r5uik8",
//                 },
//                 href: "https://api.spotify.com/v1/users/krr5eq9z17bjfoidb38r5uik8",
//                 id: "krr5eq9z17bjfoidb38r5uik8",
//                 type: "user",
//                 uri: "spotify:user:krr5eq9z17bjfoidb38r5uik8",
//               },
//               primary_color: null,
//               public: true,
//               snapshot_id:
//                 "OCxhYmRiMDJkOWE3ZmRjZGFlNTM0NWIwMThmNWM2N2M0ZjQ2OTkxNzU2",
//               tracks: {
//                 href: "https://api.spotify.com/v1/playlists/3n6lIykbh0n2OlwZWKQaWT/tracks",
//                 total: 3,
//               },
//               type: "playlist",
//               uri: "spotify:playlist:3n6lIykbh0n2OlwZWKQaWT",
//             },
//             {
//               collaborative: false,
//               description: "",
//               external_url: {
//                 spotify:
//                   "https://open.spotify.com/playlist/2HKQbtCTJWoMKlZIVOKpBn",
//               },
//               href: "https://api.spotify.com/v1/playlists/2HKQbtCTJWoMKlZIVOKpBn",
//               id: "2HKQbtCTJWoMKlZIVOKpBn",
//               images: [
//                 {
//                   height: 640,
//                   url: "https://mosaic.scdn.co/640/ab67616d0000b273046cf5d6d31d4b796c075d2bab67616d0000b2739451e80ff0ec76b0b0e5f982ab67616d0000b2739969316c454fb52e20050598ab67616d0000b273b0a8dcfcdccf429541e50acf",
//                   width: 640,
//                 },
//                 {
//                   height: 300,
//                   url: "https://mosaic.scdn.co/300/ab67616d0000b273046cf5d6d31d4b796c075d2bab67616d0000b2739451e80ff0ec76b0b0e5f982ab67616d0000b2739969316c454fb52e20050598ab67616d0000b273b0a8dcfcdccf429541e50acf",
//                   width: 300,
//                 },
//                 {
//                   height: 60,
//                   url: "https://mosaic.scdn.co/60/ab67616d0000b273046cf5d6d31d4b796c075d2bab67616d0000b2739451e80ff0ec76b0b0e5f982ab67616d0000b2739969316c454fb52e20050598ab67616d0000b273b0a8dcfcdccf429541e50acf",
//                   width: 60,
//                 },
//               ],
//               name: "Sleep",
//               owner: {
//                 display_name: "Aadhi + Reold",
//                 external_url: {
//                   spotify:
//                     "https://open.spotify.com/user/krr5eq9z17bjfoidb38r5uik8",
//                 },
//                 href: "https://api.spotify.com/v1/users/krr5eq9z17bjfoidb38r5uik8",
//                 id: "krr5eq9z17bjfoidb38r5uik8",
//                 type: "user",
//                 uri: "spotify:user:krr5eq9z17bjfoidb38r5uik8",
//               },
//               primary_color: null,
//               public: true,
//               snapshot_id:
//                 "OSwxNWI5YTdkYzExNmE3NWFjMGUyMWVmNWQ3YjJiNDAwNDdiMDA3OGRk",
//               tracks: {
//                 href: "https://api.spotify.com/v1/playlists/2HKQbtCTJWoMKlZIVOKpBn/tracks",
//                 total: 5,
//               },
//               type: "playlist",
//               uri: "spotify:playlist:2HKQbtCTJWoMKlZIVOKpBn",
//             },
//             {
//               collaborative: false,
//               description: "",
//               external_url: {
//                 spotify:
//                   "https://open.spotify.com/playlist/5OSCmxV0KNtwqYyhrEFsqv",
//               },
//               href: "https://api.spotify.com/v1/playlists/5OSCmxV0KNtwqYyhrEFsqv",
//               id: "5OSCmxV0KNtwqYyhrEFsqv",
//               images: [
//                 {
//                   height: 640,
//                   url: "https://i.scdn.co/image/ab67616d0000b2736a2e7f7613210a6397e854f5",
//                   width: 640,
//                 },
//               ],
//               name: "Bodyguards",
//               owner: {
//                 display_name: "Aadhi + Reold",
//                 external_url: {
//                   spotify:
//                     "https://open.spotify.com/user/krr5eq9z17bjfoidb38r5uik8",
//                 },
//                 href: "https://api.spotify.com/v1/users/krr5eq9z17bjfoidb38r5uik8",
//                 id: "krr5eq9z17bjfoidb38r5uik8",
//                 type: "user",
//                 uri: "spotify:user:krr5eq9z17bjfoidb38r5uik8",
//               },
//               primary_color: null,
//               public: true,
//               snapshot_id:
//                 "Myw2OTE0ZTlhZGE4YmZkZTY5MDI4MDk3Yzc5ZGJkMjY1ZmRkZTQ1MWEw",
//               tracks: {
//                 href: "https://api.spotify.com/v1/playlists/5OSCmxV0KNtwqYyhrEFsqv/tracks",
//                 total: 2,
//               },
//               type: "playlist",
//               uri: "spotify:playlist:5OSCmxV0KNtwqYyhrEFsqv",
//             },
//             {
//               collaborative: false,
//               description: "25% extra delicious",
//               external_url: {
//                 spotify:
//                   "https://open.spotify.com/playlist/2SoJmrkzUQXm5SakZlQi2q",
//               },
//               href: "https://api.spotify.com/v1/playlists/2SoJmrkzUQXm5SakZlQi2q",
//               id: "2SoJmrkzUQXm5SakZlQi2q",
//               images: [
//                 {
//                   height: null,
//                   url: "https://image-cdn-ak.spotifycdn.com/image/ab67706c0000bebbb024ffdb78ee6d97b783904f",
//                   width: null,
//                 },
//               ],
//               name: "Gems —hindi",
//               owner: {
//                 display_name: "Aadhi + Reold",
//                 external_url: {
//                   spotify:
//                     "https://open.spotify.com/user/krr5eq9z17bjfoidb38r5uik8",
//                 },
//                 href: "https://api.spotify.com/v1/users/krr5eq9z17bjfoidb38r5uik8",
//                 id: "krr5eq9z17bjfoidb38r5uik8",
//                 type: "user",
//                 uri: "spotify:user:krr5eq9z17bjfoidb38r5uik8",
//               },
//               primary_color: null,
//               public: true,
//               snapshot_id:
//                 "MTAsNjI2Nzk0ZGY3OWQ4NmIyOTk2MzFiZTVkOTk4MmZiM2JmMWRhNzJmMw==",
//               tracks: {
//                 href: "https://api.spotify.com/v1/playlists/2SoJmrkzUQXm5SakZlQi2q/tracks",
//                 total: 5,
//               },
//               type: "playlist",
//               uri: "spotify:playlist:2SoJmrkzUQXm5SakZlQi2q",
//             },
//             {
//               collaborative: false,
//               description: "",
//               external_url: {
//                 spotify:
//                   "https://open.spotify.com/playlist/4WTuDCd1XnnlRvA5T3nzY3",
//               },
//               href: "https://api.spotify.com/v1/playlists/4WTuDCd1XnnlRvA5T3nzY3",
//               id: "4WTuDCd1XnnlRvA5T3nzY3",
//               images: [
//                 {
//                   height: 640,
//                   url: "https://i.scdn.co/image/ab67616d0000b273b6b1519a496272ce0557efdf",
//                   width: 640,
//                 },
//               ],
//               name: "Only legends understand.",
//               owner: {
//                 display_name: "Aadhi + Reold",
//                 external_url: {
//                   spotify:
//                     "https://open.spotify.com/user/krr5eq9z17bjfoidb38r5uik8",
//                 },
//                 href: "https://api.spotify.com/v1/users/krr5eq9z17bjfoidb38r5uik8",
//                 id: "krr5eq9z17bjfoidb38r5uik8",
//                 type: "user",
//                 uri: "spotify:user:krr5eq9z17bjfoidb38r5uik8",
//               },
//               primary_color: null,
//               public: true,
//               snapshot_id:
//                 "MixmZDVlYWRkNDE0ZmQ2ODQzNDU1ZjM1OWQ4Y2UwM2M4ZmNiMDQwMjg3",
//               tracks: {
//                 href: "https://api.spotify.com/v1/playlists/4WTuDCd1XnnlRvA5T3nzY3/tracks",
//                 total: 1,
//               },
//               type: "playlist",
//               uri: "spotify:playlist:4WTuDCd1XnnlRvA5T3nzY3",
//             },
//             {
//               collaborative: false,
//               description: "wanna journey in my dad&#x27;s suzuki?",
//               external_url: {
//                 spotify:
//                   "https://open.spotify.com/playlist/4sFsoEVDzg3UPb7OVqkeSa",
//               },
//               href: "https://api.spotify.com/v1/playlists/4sFsoEVDzg3UPb7OVqkeSa",
//               id: "4sFsoEVDzg3UPb7OVqkeSa",
//               images: [
//                 {
//                   height: null,
//                   url: "https://image-cdn-ak.spotifycdn.com/image/ab67706c0000bebbaa30d8e54b760a2d5a4f195c",
//                   width: null,
//                 },
//               ],
//               name: "Dad's Radio",
//               owner: {
//                 display_name: "Aadhi + Reold",
//                 external_url: {
//                   spotify:
//                     "https://open.spotify.com/user/krr5eq9z17bjfoidb38r5uik8",
//                 },
//                 href: "https://api.spotify.com/v1/users/krr5eq9z17bjfoidb38r5uik8",
//                 id: "krr5eq9z17bjfoidb38r5uik8",
//                 type: "user",
//                 uri: "spotify:user:krr5eq9z17bjfoidb38r5uik8",
//               },
//               primary_color: null,
//               public: true,
//               snapshot_id:
//                 "MTEsNzNlZDEyOTg2NDU1ZGU2OGJiMDRiZjA5ODgxYzAwYjgyZmU5Y2EwMg==",
//               tracks: {
//                 href: "https://api.spotify.com/v1/playlists/4sFsoEVDzg3UPb7OVqkeSa/tracks",
//                 total: 5,
//               },
//               type: "playlist",
//               uri: "spotify:playlist:4sFsoEVDzg3UPb7OVqkeSa",
//             },
//             {
//               collaborative: false,
//               description: "works all the time, I promise",
//               external_url: {
//                 spotify:
//                   "https://open.spotify.com/playlist/4f3fKAfVgRFMqFBYV6TDcf",
//               },
//               href: "https://api.spotify.com/v1/playlists/4f3fKAfVgRFMqFBYV6TDcf",
//               id: "4f3fKAfVgRFMqFBYV6TDcf",
//               images: [
//                 {
//                   height: null,
//                   url: "https://image-cdn-ak.spotifycdn.com/image/ab67706c0000bebbb69f90c663917889a7ca2f79",
//                   width: null,
//                 },
//               ],
//               name: "Free Refills",
//               owner: {
//                 display_name: "Aadhi + Reold",
//                 external_url: {
//                   spotify:
//                     "https://open.spotify.com/user/krr5eq9z17bjfoidb38r5uik8",
//                 },
//                 href: "https://api.spotify.com/v1/users/krr5eq9z17bjfoidb38r5uik8",
//                 id: "krr5eq9z17bjfoidb38r5uik8",
//                 type: "user",
//                 uri: "spotify:user:krr5eq9z17bjfoidb38r5uik8",
//               },
//               primary_color: null,
//               public: true,
//               snapshot_id:
//                 "MTIsZWJlMTZiZDFhYzcwZDNjMTNlZTEyZDc5YmEyNjM0NjhlMDU0Y2VhNQ==",
//               tracks: {
//                 href: "https://api.spotify.com/v1/playlists/4f3fKAfVgRFMqFBYV6TDcf/tracks",
//                 total: 5,
//               },
//               type: "playlist",
//               uri: "spotify:playlist:4f3fKAfVgRFMqFBYV6TDcf",
//             },
//             {
//               collaborative: false,
//               description: "relatable hits of my occasional genres",
//               external_url: {
//                 spotify:
//                   "https://open.spotify.com/playlist/1deMqexkz4JI2AAQM8qi0Q",
//               },
//               href: "https://api.spotify.com/v1/playlists/1deMqexkz4JI2AAQM8qi0Q",
//               id: "1deMqexkz4JI2AAQM8qi0Q",
//               images: [
//                 {
//                   height: null,
//                   url: "https://image-cdn-ak.spotifycdn.com/image/ab67706c0000bebb3a2f6e502c0dcd328c5525a8",
//                   width: null,
//                 },
//               ],
//               name: "Around you!",
//               owner: {
//                 display_name: "Aadhi + Reold",
//                 external_url: {
//                   spotify:
//                     "https://open.spotify.com/user/krr5eq9z17bjfoidb38r5uik8",
//                 },
//                 href: "https://api.spotify.com/v1/users/krr5eq9z17bjfoidb38r5uik8",
//                 id: "krr5eq9z17bjfoidb38r5uik8",
//                 type: "user",
//                 uri: "spotify:user:krr5eq9z17bjfoidb38r5uik8",
//               },
//               primary_color: null,
//               public: true,
//               snapshot_id:
//                 "MTcsZGE4OTk2ZmIzYzZhODI5NDUzZjg1ZWUyZDQyOWIxY2U0NDkzZDc0YQ==",
//               tracks: {
//                 href: "https://api.spotify.com/v1/playlists/1deMqexkz4JI2AAQM8qi0Q/tracks",
//                 total: 5,
//               },
//               type: "playlist",
//               uri: "spotify:playlist:1deMqexkz4JI2AAQM8qi0Q",
//             },
//             {
//               collaborative: false,
//               description: "",
//               external_url: {
//                 spotify:
//                   "https://open.spotify.com/playlist/3DhoYtbVYRvGSgfhLDXylK",
//               },
//               href: "https://api.spotify.com/v1/playlists/3DhoYtbVYRvGSgfhLDXylK",
//               id: "3DhoYtbVYRvGSgfhLDXylK",
//               images: [
//                 {
//                   height: 640,
//                   url: "https://i.scdn.co/image/ab67616d0000b2737295936765da92b757315645",
//                   width: 640,
//                 },
//               ],
//               name: "July Solstice",
//               owner: {
//                 display_name: "Aadhi + Reold",
//                 external_url: {
//                   spotify:
//                     "https://open.spotify.com/user/krr5eq9z17bjfoidb38r5uik8",
//                 },
//                 href: "https://api.spotify.com/v1/users/krr5eq9z17bjfoidb38r5uik8",
//                 id: "krr5eq9z17bjfoidb38r5uik8",
//                 type: "user",
//                 uri: "spotify:user:krr5eq9z17bjfoidb38r5uik8",
//               },
//               primary_color: null,
//               public: true,
//               snapshot_id:
//                 "NCwxOGQ1OTcyYzdlZGUwNDgyYmZlY2NmZGJiNWNjYzA3YTdhYzRmOTFi",
//               tracks: {
//                 href: "https://api.spotify.com/v1/playlists/3DhoYtbVYRvGSgfhLDXylK/tracks",
//                 total: 3,
//               },
//               type: "playlist",
//               uri: "spotify:playlist:3DhoYtbVYRvGSgfhLDXylK",
//             },
//             {
//               collaborative: false,
//               description:
//                 "Listen to short underrated songs which will play with your emotions",
//               external_url: {
//                 spotify:
//                   "https://open.spotify.com/playlist/13gMwZ8em4Na1sof5EIPoZ",
//               },
//               href: "https://api.spotify.com/v1/playlists/13gMwZ8em4Na1sof5EIPoZ",
//               id: "13gMwZ8em4Na1sof5EIPoZ",
//               images: [
//                 {
//                   height: null,
//                   url: "https://image-cdn-ak.spotifycdn.com/image/ab67706c0000bebbfb812c070d5223d60f8ed1a8",
//                   width: null,
//                 },
//               ],
//               name: "Dramatic Emotions",
//               owner: {
//                 display_name: "Aadhi + Reold",
//                 external_url: {
//                   spotify:
//                     "https://open.spotify.com/user/krr5eq9z17bjfoidb38r5uik8",
//                 },
//                 href: "https://api.spotify.com/v1/users/krr5eq9z17bjfoidb38r5uik8",
//                 id: "krr5eq9z17bjfoidb38r5uik8",
//                 type: "user",
//                 uri: "spotify:user:krr5eq9z17bjfoidb38r5uik8",
//               },
//               primary_color: null,
//               public: true,
//               snapshot_id:
//                 "MTUsNTcwMDYzYTY0MTFjNWQ1YTIxYzI1ZmJlNGRkYjY3NzA1NGI3ODE3OQ==",
//               tracks: {
//                 href: "https://api.spotify.com/v1/playlists/13gMwZ8em4Na1sof5EIPoZ/tracks",
//                 total: 6,
//               },
//               type: "playlist",
//               uri: "spotify:playlist:13gMwZ8em4Na1sof5EIPoZ",
//             },
//             {
//               collaborative: false,
//               description: "",
//               external_url: {
//                 spotify:
//                   "https://open.spotify.com/playlist/3kn7bPZDd8obw2U2utcCai",
//               },
//               href: "https://api.spotify.com/v1/playlists/3kn7bPZDd8obw2U2utcCai",
//               id: "3kn7bPZDd8obw2U2utcCai",
//               images: [
//                 {
//                   height: 640,
//                   url: "https://mosaic.scdn.co/640/ab67616d0000b2731590775ddd9a0a2b9a87dc6aab67616d0000b273b5dafe1c123b8f12f078fb29ab67616d0000b273e1ae9327732ecdfed4d1e9e8ab67616d0000b273e2a75e65f41e9a62078d583e",
//                   width: 640,
//                 },
//                 {
//                   height: 300,
//                   url: "https://mosaic.scdn.co/300/ab67616d0000b2731590775ddd9a0a2b9a87dc6aab67616d0000b273b5dafe1c123b8f12f078fb29ab67616d0000b273e1ae9327732ecdfed4d1e9e8ab67616d0000b273e2a75e65f41e9a62078d583e",
//                   width: 300,
//                 },
//                 {
//                   height: 60,
//                   url: "https://mosaic.scdn.co/60/ab67616d0000b2731590775ddd9a0a2b9a87dc6aab67616d0000b273b5dafe1c123b8f12f078fb29ab67616d0000b273e1ae9327732ecdfed4d1e9e8ab67616d0000b273e2a75e65f41e9a62078d583e",
//                   width: 60,
//                 },
//               ],
//               name: "Malayalam melody hits 💚💚",
//               owner: {
//                 display_name: "Siva",
//                 external_url: {
//                   spotify:
//                     "https://open.spotify.com/user/31vyyzi3vedzyhdvj6v3graqqccm",
//                 },
//                 href: "https://api.spotify.com/v1/users/31vyyzi3vedzyhdvj6v3graqqccm",
//                 id: "31vyyzi3vedzyhdvj6v3graqqccm",
//                 type: "user",
//                 uri: "spotify:user:31vyyzi3vedzyhdvj6v3graqqccm",
//               },
//               primary_color: null,
//               public: true,
//               snapshot_id:
//                 "NTUsMTljYmRmM2JjZWVlOGZmMzEyZGRhYjM0NTc3YWE4ZWVhYmU0ZDAxNw==",
//               tracks: {
//                 href: "https://api.spotify.com/v1/playlists/3kn7bPZDd8obw2U2utcCai/tracks",
//                 total: 51,
//               },
//               type: "playlist",
//               uri: "spotify:playlist:3kn7bPZDd8obw2U2utcCai",
//             },
//             {
//               collaborative: false,
//               description: "",
//               external_url: {
//                 spotify:
//                   "https://open.spotify.com/playlist/5cNp1xS22nNOwVtLMIm8og",
//               },
//               href: "https://api.spotify.com/v1/playlists/5cNp1xS22nNOwVtLMIm8og",
//               id: "5cNp1xS22nNOwVtLMIm8og",
//               images: [
//                 {
//                   height: null,
//                   url: "https://image-cdn-ak.spotifycdn.com/image/ab67706c0000bebbc4730d71ff76c5bc9268c082",
//                   width: null,
//                 },
//               ],
//               name: "DATA WING Soundtrack",
//               owner: {
//                 display_name: "Dan Vogt",
//                 external_url: {
//                   spotify: "https://open.spotify.com/user/12173541933",
//                 },
//                 href: "https://api.spotify.com/v1/users/12173541933",
//                 id: "12173541933",
//                 type: "user",
//                 uri: "spotify:user:12173541933",
//               },
//               primary_color: null,
//               public: true,
//               snapshot_id:
//                 "ODMsODA0NGRlNTNkOWFhNmJjMWUzOGE5ZDgzNjY0NGUwN2U4OGY0ZmEyNw==",
//               tracks: {
//                 href: "https://api.spotify.com/v1/playlists/5cNp1xS22nNOwVtLMIm8og/tracks",
//                 total: 38,
//               },
//               type: "playlist",
//               uri: "spotify:playlist:5cNp1xS22nNOwVtLMIm8og",
//             },
//             {
//               collaborative: false,
//               description: "=) and =( ",
//               external_url: {
//                 spotify:
//                   "https://open.spotify.com/playlist/3GFzRbM1yBzBRf9KrAJd7l",
//               },
//               href: "https://api.spotify.com/v1/playlists/3GFzRbM1yBzBRf9KrAJd7l",
//               id: "3GFzRbM1yBzBRf9KrAJd7l",
//               images: [
//                 {
//                   height: 640,
//                   url: "https://mosaic.scdn.co/640/ab67616d0000b27341e31d6ea1d493dd77933ee5ab67616d0000b2736ee651e65c3766d80e7fcab7ab67616d0000b27382a18aa0d3374049c6b78f6aab67616d0000b273e1d47c00ddecbfb810c807ed",
//                   width: 640,
//                 },
//                 {
//                   height: 300,
//                   url: "https://mosaic.scdn.co/300/ab67616d0000b27341e31d6ea1d493dd77933ee5ab67616d0000b2736ee651e65c3766d80e7fcab7ab67616d0000b27382a18aa0d3374049c6b78f6aab67616d0000b273e1d47c00ddecbfb810c807ed",
//                   width: 300,
//                 },
//                 {
//                   height: 60,
//                   url: "https://mosaic.scdn.co/60/ab67616d0000b27341e31d6ea1d493dd77933ee5ab67616d0000b2736ee651e65c3766d80e7fcab7ab67616d0000b27382a18aa0d3374049c6b78f6aab67616d0000b273e1d47c00ddecbfb810c807ed",
//                   width: 60,
//                 },
//               ],
//               name: "My Favs",
//               owner: {
//                 display_name: "Aadhi + Reold",
//                 external_url: {
//                   spotify:
//                     "https://open.spotify.com/user/krr5eq9z17bjfoidb38r5uik8",
//                 },
//                 href: "https://api.spotify.com/v1/users/krr5eq9z17bjfoidb38r5uik8",
//                 id: "krr5eq9z17bjfoidb38r5uik8",
//                 type: "user",
//                 uri: "spotify:user:krr5eq9z17bjfoidb38r5uik8",
//               },
//               primary_color: null,
//               public: true,
//               snapshot_id:
//                 "NSxiOTJiZjg5ZTIxNTBjZTNkNTA4OWQyZWMxZGJhMjQ2OTJlNWE5NzI3",
//               tracks: {
//                 href: "https://api.spotify.com/v1/playlists/3GFzRbM1yBzBRf9KrAJd7l/tracks",
//                 total: 43,
//               },
//               type: "playlist",
//               uri: "spotify:playlist:3GFzRbM1yBzBRf9KrAJd7l",
//             },
//           ],
//           limit: 50,
//           next: null,
//           offset: 0,
//           previous: null,
//           total: 19,
//         },
//         loggedIn: true,
//       }
//     : {
//         loggedIn: false,
//         user: {},
//         playlists: {},
//       }
// );
