let serverUrl: string;

if (import.meta.env.DEV) {
  serverUrl = "http://localhost:8000";
} else {
  serverUrl = "https://reold-cartier.glitch.me";
}

export const requests = {
  getRoot: async () => {
    let resp = await fetch(`${serverUrl}/`);

    return await resp.json();
  },
  getUserInfo: async (username: string) => {
    let resp = await fetch(`${serverUrl}/user?username=${username}`);

    return await resp.json();
  },
  getPlaylistInfo: async (id: string) => {
    let resp = await fetch(`${serverUrl}/playlist?id=${id}`);

    return await resp.json();
  },
  getDownloadPlaylist: async (link: string) => {
    let resp = await fetch(`${serverUrl}/download?link=${link}`);

    return await resp.json();
  },
  getDownloadTrack: async (
    link: string,
    unique_code: string = "",
    create: boolean = false
  ) => {
    let resp = await fetch(
      `${serverUrl}/track?link=${link}&unique_code=${unique_code}&create=${create}`
    );

    return await resp.json();
  },
  getStreamPlaylist: async (unique_code: string): Promise<[boolean, Blob]> => {
    let resp = await fetch(`${serverUrl}/stream?unique_code=${unique_code}`);

    return [await resp.ok, await resp.blob()];
  },
};
