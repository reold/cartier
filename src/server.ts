if (import.meta.env.DEV) {
  window["cartier-server-url"] = "http://localhost:8000" as string;
} else {
  window["cartier-server-url"] = "https://reold-cartier.glitch.me" as string;
}

export const requests = {
  getRoot: async () => {
    let resp = await fetch(`${window["cartier-server-url"]}/`);

    return await resp.json();
  },
  getUserInfo: async (username: string) => {
    let resp = await fetch(
      `${window["cartier-server-url"]}/user?username=${username}`
    );

    return await resp.json();
  },
  getPlaylistInfo: async (id: string) => {
    let resp = await fetch(`${window["cartier-server-url"]}/playlist?id=${id}`);

    return await resp.json();
  },
  getDownloadPlaylist: async (link: string) => {
    let resp = await fetch(
      `${window["cartier-server-url"]}/download?link=${link}`
    );

    return await resp.json();
  },
  getDownloadStatus: async (id: string) => {
    let resp = await fetch(`${window["cartier-server-url"]}/status?key=${id}`);

    return await resp.json();
  },
  getDownloadTrack: async (
    link: string,
    key: string = "",
    create: boolean = false
  ) => {
    let resp = await fetch(
      `${window["cartier-server-url"]}/track?link=${link}&key=${key}&create=${create}`
    );

    return await resp.json();
  },
  getStreamPlaylist: async (key: string): Promise<[boolean, Blob, string]> => {
    let resp = await fetch(`${window["cartier-server-url"]}/stream?key=${key}`);

    return [
      await resp.ok,
      await resp.blob(),
      resp.headers.get("x-trackid") as string,
    ];
  },
};
