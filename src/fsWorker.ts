const getHandleFromPath: any = async (
  base: FileSystemDirectoryHandle,
  path: string
) => {
  if (path.includes("/")) {
    let dirName = path.split("/")[0];

    return await getHandleFromPath(
      await base.getDirectoryHandle(dirName),
      path.slice(dirName.length + 1)
    );
  } else {
    return await base.getFileHandle(path, { create: true });
  }
};

self.onmessage = async (
  event: MessageEvent<{
    mode: string;
    path: string;
    content: string | Blob;
    id: string;
  }>
) => {
  let { mode, path, content: src_content, id } = event.data;

  let content;

  if (typeof src_content == "string") {
    const textEncoder = new TextEncoder();
    content = textEncoder.encode(src_content);
  } else if (src_content instanceof Blob) {
    content = await src_content.arrayBuffer();
  }

  console.log(
    `[FS-WORKER]: ${mode} -ing\n${content?.slice(0, 50)}...\nto: ${path}`
  );

  let root = await navigator.storage.getDirectory();
  let handle: FileSystemFileHandle = await getHandleFromPath(root, path);

  switch (mode) {
    case "write":
      const syncHandle = await handle.createSyncAccessHandle();

      syncHandle.truncate(0);
      syncHandle.write(content);
      syncHandle.flush();

      syncHandle.close();
      break;

    default:
      break;
  }

  self.postMessage(id);
};

export {};
