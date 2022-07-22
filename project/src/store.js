import create from "zustand";

const useStore = create((set) => ({
  loggedIn: false,
  userPhoto: "",
  displayName: "",
  currentPostId: "",
  oldPostTitle: "",
  oldPostContent: "",
  search: "",
  toggleLoggedIn: (logStatus) =>
    set(() => ({
      loggedIn: logStatus,
    })),
  setUserPhoto: (userPhoto) =>
    set(() => ({
      userPhoto: userPhoto,
    })),
  setDisplayName: (displayName) =>
    set(() => ({
      displayName: displayName,
    })),
  setCurrentPostId: (currentPostId) =>
    set(() => ({
      currentPostId: currentPostId,
    })),
  setPostTitle: (postTitle) =>
    set(() => ({
      oldPostTitle: postTitle,
    })),
  setPostContent: (postContent) =>
    set(() => ({
      oldPostContent: postContent,
    })),
  setSearch: (search) =>
    set(() => ({
      search: search,
    })),
}));

export default useStore;
